import { NextResponse } from "next/server";
import { requireAdmin, verifyAdminCsrf } from "@/lib/adminAuth";
import { createReviewToken, computeTokenStatus } from "@/lib/tokens";
import { connectDB } from "@/lib/db";
import ReviewToken from "@/models/ReviewToken";



export async function POST(req) {
  const auth = await requireAdmin(req);
  if (!auth.authenticated) {
    return NextResponse.json(
      { error: auth.error },
      { status: auth.status || 401, headers: { "Cache-Control": "no-store" } }
    );
  }

  if (!verifyAdminCsrf(req)) {
    return NextResponse.json(
      { error: "Forbidden: CSRF check failed" },
      { status: 403, headers: { "Cache-Control": "no-store" } }
    );
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { label = "", company = "" } = body;

    const { link, expiresAt } = await createReviewToken({
      label,
      company,
      req,
    });

    return NextResponse.json(
      {
        success: true,
        link,
        expiresAt: expiresAt.toISOString(),
      },
      {
        status: 201,
        headers: { "Cache-Control": "no-store" },
      }
    );
  } catch (error) {
    console.error("[POST /api/admin/tokens] Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create review token" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}

export async function GET(req) {
  const auth = await requireAdmin(req);
  if (!auth.authenticated) {
    return NextResponse.json(
      { error: auth.error },
      { status: auth.status || 401, headers: { "Cache-Control": "no-store" } }
    );
  }

  try {
    await connectDB();
    const tokens = await ReviewToken.find()
      .sort({ createdAt: -1 })
      .lean();

    const formatted = tokens.map((t) => ({
      id: t._id.toString(),
      label: t.label || "",
      company: t.company || "",
      createdAt: t.createdAt ? t.createdAt.toISOString() : null,
      expiresAt: t.expiresAt ? t.expiresAt.toISOString() : null,
      usedAt: t.usedAt ? t.usedAt.toISOString() : null,
      revokedAt: t.revokedAt ? t.revokedAt.toISOString() : null,
      status: computeTokenStatus(t),
    }));

    return NextResponse.json(
      { tokens: formatted },
      {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      }
    );
  } catch (error) {
    console.error("[GET /api/admin/tokens] Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch review tokens" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
