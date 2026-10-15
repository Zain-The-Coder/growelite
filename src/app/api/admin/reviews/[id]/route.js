import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin, verifyAdminCsrf } from "@/lib/adminAuth";
import { connectDB } from "@/lib/db";
import Review from "@/models/Review";



export async function PATCH(req, { params }) {
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
    const body = await req.json().catch(() => ({}));
    await connectDB();

    const existing = await Review.findById(id);
    if (!existing) {
      return NextResponse.json(
        { error: "Review not found" },
        { status: 404, headers: { "Cache-Control": "no-store" } }
      );
    }

    const nextPublished =
      typeof body.published === "boolean" ? body.published : !existing.published;

    existing.published = nextPublished;
    await existing.save();

    // Revalidate public pages
    revalidatePath("/");
    revalidatePath("/reviews");

    return NextResponse.json(
      { success: true, published: existing.published },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("[PATCH /api/admin/reviews/[id]] Error:", error);
    return NextResponse.json(
      { error: "Failed to update review" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}

export async function DELETE(req, { params }) {
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

    const deleted = await Review.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { error: "Review not found" },
        { status: 404, headers: { "Cache-Control": "no-store" } }
      );
    }

    // Revalidate public pages
    revalidatePath("/");
    revalidatePath("/reviews");

    return NextResponse.json(
      { success: true },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("[DELETE /api/admin/reviews/[id]] Error:", error);
    return NextResponse.json(
      { error: "Failed to delete review" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
