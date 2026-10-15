import crypto from "crypto";
import { connectDB } from "./db.js";
import ReviewToken from "../models/ReviewToken.js";
import Review from "../models/Review.js";

export const GENERIC_TOKEN_ERROR =
  "This link is invalid, has expired, or has already been used.";

/**
 * Hash raw token with SHA-256 into hex string.
 */
export function hashToken(rawToken) {
  if (typeof rawToken !== "string") return "";
  return crypto.createHash("sha256").update(rawToken).digest("hex");
}

/**
 * Generate a cryptographically secure 32-byte base64url string.
 */
export function generateRawToken() {
  return crypto.randomBytes(32).toString("base64url");
}

/**
 * Resolve the public base URL for review links.
 */
export function getBaseUrl(req = null) {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, "");
  }
  if (req) {
    const origin = req.headers.get("origin");
    if (origin) return origin.replace(/\/+$/, "");

    const host = req.headers.get("host");
    if (host) {
      const proto =
        req.headers.get("x-forwarded-proto") ||
        (process.env.NODE_ENV === "production" ? "https" : "http");
      return `${proto}://${host}`.replace(/\/+$/, "");
    }

    if (req.nextUrl && req.nextUrl.origin) {
      return req.nextUrl.origin.replace(/\/+$/, "");
    }
  }
  return "https://growelite.digital";
}

/**
 * Create a new one-time review token.
 * Returns { rawToken, link, expiresAt }
 */
export async function createReviewToken({ label = "", company = "", req = null }) {
  await connectDB();

  const ttlHours = parseFloat(process.env.TOKEN_TTL_HOURS || "72");
  const expiresAt = new Date(Date.now() + ttlHours * 60 * 60 * 1000);

  const rawToken = generateRawToken();
  const tokenHash = hashToken(rawToken);

  await ReviewToken.create({
    tokenHash,
    label: label.trim().slice(0, 100),
    company: company.trim().slice(0, 100),
    expiresAt,
  });

  const baseUrl = getBaseUrl(req);
  const link = `${baseUrl}/review/${rawToken}`;

  return {
    rawToken,
    link,
    expiresAt,
  };
}

/**
 * Validate a token without consuming it (used when the review page loads).
 */
export async function inspectToken(rawToken) {
  if (!rawToken || typeof rawToken !== "string") {
    return { valid: false, error: GENERIC_TOKEN_ERROR };
  }

  await connectDB();
  const tokenHash = hashToken(rawToken);
  const now = new Date();

  const tokenDoc = await ReviewToken.findOne({
    tokenHash,
    usedAt: null,
    revokedAt: null,
    expiresAt: { $gt: now },
  }).lean();

  if (!tokenDoc) {
    return { valid: false, error: GENERIC_TOKEN_ERROR };
  }

  return {
    valid: true,
    token: {
      id: tokenDoc._id.toString(),
      label: tokenDoc.label || "",
      company: tokenDoc.company || "",
      expiresAt: tokenDoc.expiresAt.toISOString(),
    },
  };
}

/**
 * Atomically claim token and save review.
 * Follows atomic claim -> review creation -> reference save -> rollback on error.
 */
export async function claimTokenAndSubmitReview({ rawToken, reviewData }) {
  if (!rawToken || typeof rawToken !== "string") {
    return { success: false, error: GENERIC_TOKEN_ERROR };
  }

  await connectDB();
  const tokenHash = hashToken(rawToken);
  const now = new Date();

  // 1. Atomic claim
  const claimedToken = await ReviewToken.findOneAndUpdate(
    {
      tokenHash,
      usedAt: null,
      revokedAt: null,
      expiresAt: { $gt: now },
    },
    { $set: { usedAt: now } },
    { new: true }
  );

  if (!claimedToken) {
    return { success: false, error: GENERIC_TOKEN_ERROR };
  }

  // 2. Create the Review document
  let createdReview = null;
  try {
    createdReview = await Review.create({
      name: reviewData.name,
      role: reviewData.role || "",
      company: reviewData.company || "",
      rating: reviewData.rating,
      text: reviewData.text,
      published: true,
      tokenId: claimedToken._id,
    });

    // 3. Link review back to token
    claimedToken.reviewId = createdReview._id;
    await claimedToken.save();

    return {
      success: true,
      review: {
        id: createdReview._id.toString(),
        name: createdReview.name,
        rating: createdReview.rating,
      },
    };
  } catch (error) {
    console.error("[claimTokenAndSubmitReview] Review creation failed:", error);
    // 4. Best-effort rollback: release token so user doesn't lose access on DB error
    try {
      await ReviewToken.updateOne(
        { _id: claimedToken._id },
        { $set: { usedAt: null, reviewId: null } }
      );
    } catch (rollbackError) {
      console.error("[claimTokenAndSubmitReview] Rollback failed:", rollbackError);
    }

    return {
      success: false,
      error: "An unexpected error occurred while saving your review. Please try again.",
    };
  }
}

/**
 * Compute the display status of a token document.
 */
export function computeTokenStatus(tokenDoc) {
  if (tokenDoc.revokedAt) return "revoked";
  if (tokenDoc.usedAt) return "used";
  if (new Date(tokenDoc.expiresAt) <= new Date()) return "expired";
  return "active";
}
