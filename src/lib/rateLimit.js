/**
 * In-memory rate limiter.
 *
 * NOTE: On serverless environments (e.g. Vercel), this in-memory Map is
 * per-instance / best-effort. It can be seamlessly swapped with a distributed
 * store (such as Upstash Redis or MongoDB) as scaling demands.
 */

const loginAttempts = new Map();
const reviewSubmissions = new Map();

/**
 * Extract client IP from Next.js request headers.
 */
export function getClientIp(req) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "127.0.0.1";
}

/**
 * Check if the IP has exceeded login attempt limits.
 * Limit: 5 failed attempts per IP per 15 minutes.
 */
export function checkLoginRateLimit(ip) {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxAttempts = 5;

  const record = loginAttempts.get(ip);
  if (!record) {
    return { allowed: true };
  }

  // Clear if expired
  if (now - record.firstAttemptAt > windowMs) {
    loginAttempts.delete(ip);
    return { allowed: true };
  }

  if (record.count >= maxAttempts) {
    const retryAfter = Math.ceil((record.firstAttemptAt + windowMs - now) / 1000);
    return { allowed: false, retryAfter };
  }

  return { allowed: true };
}

/**
 * Record a login failure for the given IP.
 */
export function recordLoginFailure(ip) {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;

  const record = loginAttempts.get(ip);
  if (!record || now - record.firstAttemptAt > windowMs) {
    loginAttempts.set(ip, { count: 1, firstAttemptAt: now });
  } else {
    record.count += 1;
  }
}

/**
 * Reset login failure count for the given IP (on successful login).
 */
export function resetLoginRateLimit(ip) {
  loginAttempts.delete(ip);
}

/**
 * Check if the IP has exceeded review submission limits.
 * Limit: 10 submissions per IP per hour.
 */
export function checkReviewSubmissionRateLimit(ip) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxSubmissions = 10;

  const record = reviewSubmissions.get(ip);
  if (!record) {
    return { allowed: true };
  }

  if (now - record.firstSubmissionAt > windowMs) {
    reviewSubmissions.delete(ip);
    return { allowed: true };
  }

  if (record.count >= maxSubmissions) {
    const retryAfter = Math.ceil((record.firstSubmissionAt + windowMs - now) / 1000);
    return { allowed: false, retryAfter };
  }

  return { allowed: true };
}

/**
 * Record a successful review submission for rate limiting.
 */
export function recordReviewSubmission(ip) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;

  const record = reviewSubmissions.get(ip);
  if (!record || now - record.firstSubmissionAt > windowMs) {
    reviewSubmissions.set(ip, { count: 1, firstSubmissionAt: now });
  } else {
    record.count += 1;
  }
}
