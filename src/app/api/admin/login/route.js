import { NextResponse } from "next/server";
import {
  verifyAdminPassword,
  createAdminSessionToken,
  COOKIE_NAME,
  SESSION_DURATION_SECONDS,
  checkConfig,
} from "@/lib/adminAuth";
import {
  getClientIp,
  checkLoginRateLimit,
  recordLoginFailure,
  resetLoginRateLimit,
} from "@/lib/rateLimit";



export async function POST(req) {
  const { isConfigured, missing } = checkConfig();
  if (!isConfigured) {
    return NextResponse.json(
      {
        error: "Server is not configured. Missing required variables: " + missing.join(", "),
      },
      {
        status: 503,
        headers: { "Cache-Control": "no-store" },
      }
    );
  }

  const ip = getClientIp(req);
  const rateLimit = checkLoginRateLimit(ip);
  if (!rateLimit.allowed) {
    const minutes = Math.ceil(rateLimit.retryAfter / 60);
    return NextResponse.json(
      {
        error: `Too many failed login attempts. Please try again in ${minutes} minute${minutes > 1 ? "s" : ""}.`,
      },
      {
        status: 429,
        headers: { "Cache-Control": "no-store" },
      }
    );
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { password } = body;

    const isValid = verifyAdminPassword(password);
    if (!isValid) {
      // 500ms delay on failure
      await new Promise((r) => setTimeout(r, 500));
      recordLoginFailure(ip);

      return NextResponse.json(
        { error: "Incorrect password" },
        {
          status: 401,
          headers: { "Cache-Control": "no-store" },
        }
      );
    }

    // Success: clear rate limit record
    resetLoginRateLimit(ip);

    // Generate JWT
    const token = await createAdminSessionToken();

    const response = NextResponse.json(
      { success: true },
      {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      }
    );

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: SESSION_DURATION_SECONDS,
    });

    return response;
  } catch (error) {
    console.error("[POST /api/admin/login] Error:", error);
    return NextResponse.json(
      { error: "An error occurred during authentication" },
      {
        status: 500,
        headers: { "Cache-Control": "no-store" },
      }
    );
  }
}
