/**
 * Sanitize text fields by removing HTML tags, control characters, and excess whitespace.
 */
export function sanitizeInput(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "") // Remove <script> tags and content
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "") // Remove <style> tags and content
    .replace(/<[^>]*>?/gm, "") // Strip any remaining HTML tags
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "") // Strip control characters
    .trim();
}

/**
 * Shared validation rules for reviews.
 * Returns { valid: boolean, errors: Record<string, string>, data: object }
 */
export function validateReviewInput({
  name = "",
  role = "",
  company = "",
  rating = 0,
  text = "",
  consent = false,
}) {
  const errors = {};

  const cleanName = sanitizeInput(name);
  const cleanRole = sanitizeInput(role);
  const cleanCompany = sanitizeInput(company);
  const cleanText = sanitizeInput(text);
  const numRating = Number(rating);

  // Name validation
  if (!cleanName) {
    errors.name = "Your name is required.";
  } else if (cleanName.length > 100) {
    errors.name = "Name must be 100 characters or fewer.";
  }

  // Role validation (optional)
  if (cleanRole && cleanRole.length > 100) {
    errors.role = "Role must be 100 characters or fewer.";
  }

  // Company validation (optional)
  if (cleanCompany && cleanCompany.length > 100) {
    errors.company = "Company must be 100 characters or fewer.";
  }

  // Rating validation
  if (!Number.isInteger(numRating) || numRating < 1 || numRating > 5) {
    errors.rating = "Please select a rating between 1 and 5 stars.";
  }

  // Text review validation
  if (!cleanText) {
    errors.text = "Please write a few words about your experience.";
  } else if (cleanText.length < 20) {
    errors.text = "Review must be at least 20 characters.";
  } else if (cleanText.length > 1000) {
    errors.text = "Review must be 1,000 characters or fewer.";
  }

  // Consent checkbox
  if (!consent) {
    errors.consent = "Please agree to have your review displayed publicly.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    data: {
      name: cleanName,
      role: cleanRole,
      company: cleanCompany,
      rating: numRating,
      text: cleanText,
      consent: Boolean(consent),
    },
  };
}
