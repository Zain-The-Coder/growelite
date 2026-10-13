import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * GrowElite brand Logo component.
 *
 * Automatically chooses:
 * - /logo-light.png on dark backgrounds (default for this dark theme)
 * - /logo.png on light backgrounds
 * - /logo-mark.png (or /logo-mark-light.png) for symbol-only
 *
 * @param {Object} props
 * @param {"light" | "dark"} [props.variant="light"]
 *   - "light" (or onDark={true}): white & gold logo for dark backgrounds
 *   - "dark" (or onLight={true}): navy & gold logo for light backgrounds
 * @param {boolean} [props.onDark] - Explicitly specify dark background
 * @param {boolean} [props.onLight] - Explicitly specify light background
 * @param {boolean} [props.markOnly=false] - Only render the icon/symbol mark
 * @param {number} [props.width=160] - Width in px
 * @param {number} [props.height] - Optional explicit height in px
 * @param {string} [props.className] - Additional styling classes
 * @param {boolean} [props.priority=false] - Priority loading flag for Next/image
 * @param {string} [props.alt="GrowElite - Digital Innovation"] - Image alt text
 */
export default function Logo({
  variant = "light",
  onDark,
  onLight,
  markOnly = false,
  width = 160,
  height,
  className = "",
  priority = false,
  alt = "GrowElite - Digital Innovation",
  ...props
}) {
  // Determine if logo is rendered on a dark or light background
  const isDarkBackground =
    onDark === true ||
    (onLight !== true && (variant === "light" || variant === "on-dark" || variant === "default"));

  if (markOnly) {
    const markSrc = isDarkBackground ? "/logo-mark-light.png" : "/logo-mark.png";
    const markWidth = width || 48;
    const markHeight = height || markWidth;

    return (
      <Image
        src={markSrc}
        alt={alt}
        width={markWidth}
        height={markHeight}
        priority={priority}
        className={cn("object-contain inline-block", className)}
        {...props}
      />
    );
  }

  const src = isDarkBackground ? "/logo-light.png" : "/logo.png";
  const naturalWidth = 503;
  const naturalHeight = 361;
  const calculatedHeight = height || Math.round(width * (naturalHeight / naturalWidth));

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={calculatedHeight}
      priority={priority}
      className={cn("object-contain inline-block", className)}
      style={{ aspectRatio: `${naturalWidth} / ${naturalHeight}` }}
      {...props}
    />
  );
}
