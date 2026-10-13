import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * GrowElite Logo component.
 *
 * Files expected in /public:
 *  - /logo-light.png  -> for dark backgrounds (default)
 *  - /logo.png        -> for light backgrounds (variant="dark" or "on-light")
 *  - /logo-mark.png   -> symbol only (markOnly)
 *
 * @param {boolean} [markOnly=false] - Render only the symbol
 * @param {number}  [width=320]      - Display width in px (height follows the real aspect ratio)
 * @param {number}  [height]         - Optional explicit display height in px
 * @param {string}  [className]      - Extra classes
 * @param {boolean} [priority=false] - Preload (use in Navbar and Preloader)
 */
export default function Logo({
  variant,
  markOnly = false,
  width = 80,
  height,
  className = "",
  priority = false,
  alt = "GrowElite - Digital Innovation",
  style,
  ...props
}) {
  const isLightBackground = variant === "dark" || variant === "on-light";

  const src = markOnly
    ? "/logo-mark.png"
    : isLightBackground
      ? "/logo.png"
      : "/logo.png";

  // Display size. If only width is given, height follows the image's real ratio.
  const displayStyle = height
    ? { width, height }
    : { width, height: "auto" };

  return (
    <Image
      src={src}
      alt={alt}
      // Intrinsic size hint only. Real ratio comes from the file itself
      // because CSS height is "auto", so the logo is never stretched.
      width={width}
      height={height ?? width}
      quality={100}
      priority={priority}
      sizes={`${width}px`}
      className={cn("object-contain inline-block select-none max-w-none", className)}
      style={{ ...displayStyle, ...style }}
      {...props}
    />
  );
}