import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  getClientIp,
  checkReviewSubmissionRateLimit,
  recordReviewSubmission,
} from "@/lib/rateLimit";
import { validateReviewInput } from "@/lib/reviewValidation";
import { claimTokenAndSubmitReview, GENERIC_TOKEN_ERROR } from "@/lib/tokens";



export async function POST(req, { params }) {
  const ip = getClientIp(req);
  const rateLimit = checkReviewSubmissionRateLimit(ip);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        error: "Too many review submissions from your network. Please try again later.",
      },
      {
        status: 429,
        headers: { "Cache-Control": "no-store" },
      }
    );
  }

  try {
    const { token } = await params;
    const body = await req.json().catch(() => ({}));

    // Bot detection 1: Honeypot field (should remain completely empty)
    if (body.hp_field) {
      return NextResponse.json(
        { success: true, message: "Thank you for your feedback!" },
        { status: 200, headers: { "Cache-Control": "no-store" } }
      );
    }

    // Bot detection 2: Minimum fill time of 3 seconds
    const renderTime = Number(body.renderTime);
    if (!renderTime || Date.now() - renderTime < 3000) {
      return NextResponse.json(
        { success: true, message: "Thank you for your feedback!" },
        { status: 200, headers: { "Cache-Control": "no-store" } }
      );
    }

    // Input validation & sanitization
    const validation = validateReviewInput({
      name: body.name,
      role: body.role,
      company: body.company,
      rating: body.rating,
      text: body.text,
      consent: body.consent,
    });

    if (!validation.valid) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    // Claim token atomically & create review
    const result = await claimTokenAndSubmitReview({
      rawToken: token,
      reviewData: validation.data,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || GENERIC_TOKEN_ERROR },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    // Record submission for rate limiting
    recordReviewSubmission(ip);

    // Revalidate public pages
    revalidatePath("/");
    revalidatePath("/reviews");

    return NextResponse.json(
      {
        success: true,
        review: result.review,
      },
      {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      }
    );
  } catch (error) {
    console.error("[POST /api/review/[token]] Error:", error);
    return NextResponse.json(
      { error: GENERIC_TOKEN_ERROR },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
