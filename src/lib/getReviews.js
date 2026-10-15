import { connectDB } from "./db.js";
import Review from "../models/Review.js";

/**
 * Fetch published reviews with count and average rating.
 * Guaranteed never to throw, returning empty fallback values if DB is offline.
 *
 * @param {object} options
 * @param {number} [options.limit=0] - 0 means all published reviews
 * @returns {Promise<{ reviews: Array, count: number, average: number }>}
 */
export async function getReviews({ limit = 0 } = {}) {
  try {
    if (!process.env.MONGODB_URI) {
      return { reviews: [], count: 0, average: 0 };
    }

    await connectDB();

    const query = { published: true };
    const count = await Review.countDocuments(query);

    if (count === 0) {
      return { reviews: [], count: 0, average: 0 };
    }

    let cursor = Review.find(query).sort({ createdAt: -1 }).lean();
    if (limit > 0) {
      cursor = cursor.limit(limit);
    }
    const docs = await cursor.exec();

    // Aggregate average rating across all published reviews
    const stats = await Review.aggregate([
      { $match: { published: true } },
      { $group: { _id: null, avgRating: { $avg: "$rating" } } },
    ]);

    const rawAvg = stats.length > 0 ? stats[0].avgRating : 0;
    const average = Number((Math.round(rawAvg * 10) / 10).toFixed(1));

    const reviews = docs.map((doc) => ({
      id: doc._id.toString(),
      name: doc.name,
      role: doc.role || "",
      company: doc.company || "",
      rating: doc.rating,
      text: doc.text,
      createdAt: doc.createdAt ? doc.createdAt.toISOString() : null,
    }));

    return {
      reviews,
      count,
      average,
    };
  } catch (error) {
    console.error("[getReviews] Failed to fetch reviews:", error.message);
    return { reviews: [], count: 0, average: 0 };
  }
}
