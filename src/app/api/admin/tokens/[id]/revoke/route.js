import { NextResponse } from "next/server";
import { requireAdmin, verifyAdminCsrf } from "@/lib/adminAuth";
import { connectDB } from "@/lib/db";
import ReviewToken from "@/models/ReviewToken";



export async function POST(req, { params }) {
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
    const { id } = await params;
    await connectDB();

    const updated = await ReviewToken.findOneAndUpdate(
      { _id: id, revokedAt: null, usedAt: null },
      { $set: { revokedAt: new Date() } },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { error: "Token not found, already used, or already revoked" },
        { status: 404, headers: { "Cache-Control": "no-store" } }
      );
    }

    return NextResponse.json(
      { success: true },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("[POST /api/admin/tokens/[id]/revoke] Error:", error);
    return NextResponse.json(
      { error: "Failed to revoke token" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
