import { servicesData } from "@/data/services";
import { budgetOptions } from "@/data/contactForm";

// List of all valid service slugs
export const validServiceSlugs = servicesData.map((s) => s.slug);

// Standard RFC 5322 simplified email regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex: only digits, spaces, +, -, (, )
const PHONE_REGEX = /^[0-9+\-()\s]*$/;

/**
 * Sanitizes headers by stripping Carriage Return and Line Feed
 */
export function sanitizeHeader(str = "") {
  return String(str).replace(/[\r\n]/g, " ").trim();
}

/**
 * Escape HTML special characters to prevent XSS in email bodies
 */
export function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Validates contact form data.
 * Can be run on client (field-by-field or all) and server.
 *
 * @param {Object} data - Form data
 * @returns {{ isValid: boolean, errors: Object }}
 */
export function validateContactForm(data = {}) {
  const errors = {};

  // 1. Name: 2 to 100 chars
  const name = typeof data.name === "string" ? data.name.trim() : "";
  if (!name) {
    errors.name = "Please enter your name.";
  } else if (name.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  } else if (name.length > 100) {
    errors.name = "Name cannot exceed 100 characters.";
  }

  // 2. Email: valid email, max 254 chars
  const email = typeof data.email === "string" ? data.email.trim() : "";
  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (email.length > 254) {
    errors.email = "Email cannot exceed 254 characters.";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  // 3. Phone: optional, max 30 chars, only digits, spaces, +, -, (, )
  if (data.phone && typeof data.phone === "string") {
    const phone = data.phone.trim();
    if (phone.length > 30) {
      errors.phone = "Phone number cannot exceed 30 characters.";
    } else if (!PHONE_REGEX.test(phone)) {
      errors.phone = "Phone contains invalid characters (digits, +, -, () only).";
    }
  }

  // 4. Company: optional, max 100 chars
  if (data.company && typeof data.company === "string") {
    const company = data.company.trim();
    if (company.length > 100) {
      errors.company = "Company name cannot exceed 100 characters.";
    }
  }

  // 5. Services: array of known slugs only
  if (data.services) {
    if (!Array.isArray(data.services)) {
      errors.services = "Services must be an array.";
    } else {
      const invalid = data.services.filter((s) => !validServiceSlugs.includes(s));
      if (invalid.length > 0) {
        errors.services = `Invalid service selected: ${invalid.join(", ")}`;
      }
    }
  }

  // 6. Budget: optional, must be one of allowed options
  if (data.budget && typeof data.budget === "string" && data.budget.trim() !== "") {
    const budget = data.budget.trim();
    if (!budgetOptions.includes(budget)) {
      errors.budget = "Please select a valid budget tier.";
    }
  }

  // 7. Message: required, 10 to 2000 chars
  const message = typeof data.message === "string" ? data.message.trim() : "";
  if (!message) {
    errors.message = "Please write a message about your project.";
  } else if (message.length < 10) {
    errors.message = "Message must be at least 10 characters.";
  } else if (message.length > 2000) {
    errors.message = "Message cannot exceed 2000 characters.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
