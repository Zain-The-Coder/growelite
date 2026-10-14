/**
 * Submits contact form data to /api/contact and returns standard result.
 *
 * @param {Object} formData
 * @returns {Promise<{ ok: boolean, errors?: Object, message?: string }>}
 */
export async function submitContact(formData) {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json().catch(() => null);

    if (res.ok) {
      return { ok: true };
    }

    // 400 Validation Error
    if (res.status === 400) {
      return {
        ok: false,
        errors: data?.errors || {},
        message: data?.message || "Please check the highlighted fields above.",
      };
    }

    // 429 Rate Limit
    if (res.status === 429) {
      return {
        ok: false,
        message:
          data?.message ||
          "Too many messages sent. Please wait a few minutes before trying again.",
      };
    }

    // 502 Bad Gateway / Upstream delivery failure
    if (res.status === 502) {
      return {
        ok: false,
        message:
          data?.message ||
          "Unable to deliver message right now. Please reach us directly via email.",
      };
    }

    // 500 Internal Server Error
    return {
      ok: false,
      message:
        data?.message ||
        "An unexpected server error occurred. Please try again or email us directly.",
    };
  } catch (err) {
    // Network failure (offline, DNS, timeout)
    return {
      ok: false,
      message:
        "Network connection failed. Please check your internet connection and try again.",
    };
  }
}
