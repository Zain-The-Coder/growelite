import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  validateContactForm,
  sanitizeHeader,
} from "@/lib/contactValidation";
import {
  generateTeamNotificationEmail,
  generateVisitorAutoReplyEmail,
} from "@/lib/emailTemplates";
import { contact } from "@/data/site";

export const runtime = "nodejs";

// In-memory rate limiting map: ip -> Array of timestamps
// NOTE: On distributed serverless runtimes this in-memory store is per-instance / best-effort.
// In high-scale production, replace with Upstash Redis or durable key-value store.
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_SUBMISSIONS_PER_WINDOW = 5;

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_SUBMISSIONS_PER_WINDOW) {
    rateLimitMap.set(ip, validTimestamps);
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

export async function POST(request) {
  try {
    // Determine client IP
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown-ip";

    // 1. Rate Limiting Check
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Too many submissions received. Please wait a few minutes before trying again.",
        },
        { status: 429 }
      );
    }

    // 2. Parse JSON Payload
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { ok: false, message: "Invalid request payload." },
        { status: 400 }
      );
    }

    const {
      name,
      email,
      phone,
      company,
      services,
      budget,
      message,
      sourceUrl,
      website_hp, // Honeypot field
      renderTimestamp,
    } = body || {};

    // 3. Anti-Spam (a): Honeypot
    // If the invisible honeypot field is filled, return silent success
    if (website_hp) {
      return NextResponse.json({ ok: true });
    }

    // Anti-Spam (b): Timing check
    // If submission happened in under 3000ms (3 seconds) from render, treat as bot
    if (renderTimestamp && typeof renderTimestamp === "number") {
      const elapsed = Date.now() - renderTimestamp;
      if (elapsed < 3000) {
        return NextResponse.json({ ok: true });
      }
    }

    // 4. Server-Side Validation
    const validation = validateContactForm({
      name,
      email,
      phone,
      company,
      services,
      budget,
      message,
    });

    if (!validation.isValid) {
      return NextResponse.json(
        {
          ok: false,
          errors: validation.errors,
          message: "Please correct the form errors.",
        },
        { status: 400 }
      );
    }

    // 5. Check RESEND_API_KEY
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json(
        {
          ok: false,
          message:
            "Our email service is temporarily unavailable. Please reach us directly at " +
            (contact?.email || "hello@growelite.digital"),
        },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    // Sender and Destination Addresses
    const toEmail =
      process.env.CONTACT_TO_EMAIL || contact?.email || "hello@growelite.digital";
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL || "GrowElite <onboarding@resend.dev>";

    const submittedAt = new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "America/New_York",
    });

    const safeNameHeader = sanitizeHeader(name);
    const firstService =
      Array.isArray(services) && services.length > 0
        ? ` - ${sanitizeHeader(services[0])}`
        : "";

    // 6. Send Email 1: Team Notification
    const teamContent = generateTeamNotificationEmail({
      name,
      email,
      phone,
      company,
      services,
      budget,
      message,
      sourceUrl,
      submittedAt,
    });

    const teamEmailResult = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: sanitizeHeader(
        `New project inquiry from ${safeNameHeader}${firstService}`
      ),
      html: teamContent.html,
      text: teamContent.text,
    });

    if (teamEmailResult.error) {
      console.error(
        "Resend failed to deliver team notification:",
        teamEmailResult.error
      );
      return NextResponse.json(
        {
          ok: false,
          message:
            "Unable to deliver inquiry right now. Please contact us directly at " +
            toEmail,
        },
        { status: 502 }
      );
    }

    // 7. Send Email 2: Auto-reply Confirmation to Visitor
    try {
      const visitorContent = generateVisitorAutoReplyEmail({
        name,
        services,
        message,
      });

      const visitorEmailResult = await resend.emails.send({
        from: fromEmail,
        to: [email],
        subject: "We received your message | GrowElite",
        html: visitorContent.html,
        text: visitorContent.text,
      });

      if (visitorEmailResult.error) {
        console.warn(
          "Auto-reply confirmation warning:",
          visitorEmailResult.error
        );
      }
    } catch (visitorErr) {
      // Non-blocking: If the visitor's auto-reply fails, inquiry is still safely logged
      console.warn("Visitor auto-reply failed to send:", visitorErr);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Unexpected error in contact route handler:", error);
    return NextResponse.json(
      {
        ok: false,
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
