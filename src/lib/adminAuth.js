import crypto from "crypto";
import { SignJWT, jwtVerify } from "jose";

export const COOKIE_NAME = "admin_session";
export const SESSION_DURATION_SECONDS = 8 * 60 * 60; // 8 hours

/**
 * Check if all required environment variables are set.
 * Returns { isConfigured: boolean, missing: string[] }
 */
export function checkConfig() {
  const missing = [];
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) {
    missing.push("MONGODB_URI (not set)");
  } else if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
    missing.push("MONGODB_URI (invalid scheme: must start with mongodb:// or mongodb+srv://)");
  }

  if (!process.env.ADMIN_PASSWORD) missing.push("ADMIN_PASSWORD");
  if (!process.env.ADMIN_SESSION_SECRET) missing.push("ADMIN_SESSION_SECRET");

  if (missing.length > 0) {
    console.error(
      `[Admin Config Alert] Missing or invalid required environment variable(s): ${missing.join(", ")}`
    );
    return { isConfigured: false, missing };
  }

  return { isConfigured: true, missing: [] };
}

/**
 * Constant-time password verification against ADMIN_PASSWORD.
 */
export function verifyAdminPassword(submittedPassword) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || typeof submittedPassword !== "string") {
    return false;
  }

  // Hash both to SHA-256 to guarantee buffers of equal length for timingSafeEqual
  const hashA = crypto.createHash("sha256").update(submittedPassword).digest();
  const hashB = crypto.createHash("sha256").update(adminPassword).digest();

  return crypto.timingSafeEqual(hashA, hashB);
}

/**
 * Get the secret key for signing admin session tokens.
 */
function getSecretKey() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not configured");
  }
  return new TextEncoder().encode(secret);
}

/**
 * Create a signed admin JWT session token.
 */
export async function createAdminSessionToken() {
  const secret = getSecretKey();
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(secret);
  return token;
}

/**
 * Verify a signed admin JWT token.
 */
export async function verifyAdminSessionToken(token) {
  if (!token) return null;
  try {
    const secret = getSecretKey();
    const { payload } = await jwtVerify(token, secret);
    if (payload.role !== "admin") return null;
    return payload;
  } catch {
    return null;
  }
}

/**
 * Server-side helper to require admin authentication.
 * Can accept a NextRequest or fall back to next/headers cookies().
 */
export async function requireAdmin(req = null) {
  const { isConfigured } = checkConfig();
  if (!isConfigured) {
    return { authenticated: false, error: "Server is not configured", status: 503 };
  }

  let token = null;
  if (req && req.cookies && typeof req.cookies.get === "function") {
    token = req.cookies.get(COOKIE_NAME)?.value;
  }

  if (!token) {
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      token = cookieStore.get(COOKIE_NAME)?.value;
    } catch {
      // In non-header contexts or edge cases
    }
  }

  if (!token) {
    return { authenticated: false, error: "Unauthorized", status: 401 };
  }

  const payload = await verifyAdminSessionToken(token);
  if (!payload) {
    return { authenticated: false, error: "Unauthorized", status: 401 };
  }

  return { authenticated: true, payload };
}

/**
 * Verify CSRF protection on mutating admin requests.
 */
export function verifyAdminCsrf(req) {
  const origin = req.headers.get("origin");
  if (!origin) {
    const referer = req.headers.get("referer");
    if (!referer) return false;
    try {
      const refUrl = new URL(referer);
      return isMatchingOrigin(refUrl.origin, req);
    } catch {
      return false;
    }
  }
  return isMatchingOrigin(origin, req);
}

function isMatchingOrigin(origin, req) {
  try {
    const originUrl = new URL(origin);
    const host = req.headers.get("host");
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

    // Check host match
    if (host) {
      const hostWithoutPort = host.split(":")[0];
      if (originUrl.host === host || originUrl.hostname === hostWithoutPort) {
        return true;
      }
    }

    // Check NEXT_PUBLIC_SITE_URL match
    if (siteUrl) {
      const configuredUrl = new URL(siteUrl);
      if (originUrl.origin === configuredUrl.origin) {
        return true;
      }
    }

    // Check req.nextUrl if present
    if (req.nextUrl && req.nextUrl.origin === originUrl.origin) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}
