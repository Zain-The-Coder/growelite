import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { connectDB } from "@/lib/db";
import Review from "@/models/Review";



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
    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .lean();

    const formatted = reviews.map((r) => ({
      id: r._id.toString(),
      name: r.name,
      role: r.role || "",
      company: r.company || "",
      rating: r.rating,
      text: r.text,
      published: Boolean(r.published),
      createdAt: r.createdAt ? r.createdAt.toISOString() : null,
      tokenId: r.tokenId ? r.tokenId.toString() : null,
    }));

    return NextResponse.json(
      { reviews: formatted },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("[GET /api/admin/reviews] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
