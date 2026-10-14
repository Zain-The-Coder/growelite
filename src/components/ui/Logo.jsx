import Image from "next/image";
import { cn } from "@/lib/utils";
import { logo as logoConfig } from "@/data/site";

/**
 * GrowElite Logo component.
 *
 * Files in /public:
 *  - /logo.png      -> Full logo (symbol + GrowElite + tagline) for dark backgrounds
 *  - /logo-mark.png -> Symbol only
 *
 * @param {string}  [variant]        - Optional variant identifier ('full' | 'light' | 'mark')
 * @param {boolean} [markOnly=false] - Render only the crest symbol
 * @param {number}  [width=80]       - Display width in px (height follows the real aspect ratio)
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
  const isMark = markOnly || variant === "mark";
  const config = isMark ? logoConfig.mark : logoConfig.full;

  const src = config.src;
  const naturalWidth = config.width;
  const naturalHeight = config.height;

  // Intrinsic height based on actual aspect ratio if not explicitly passed
  const calculatedHeight = height ?? Math.round(width * (naturalHeight / naturalWidth));

  // Display size. If only width is given, height follows the image's real ratio with height: auto.
  const displayStyle = height
    ? { width, height }
    : { width, height: "auto" };

  return (
    <Image
      src={src}
      alt={alt}
      width={naturalWidth}
      height={naturalHeight}
      quality={100}
      priority={priority}
      sizes={`${width}px`}
      className={cn("object-contain inline-block select-none max-w-none", className)}
      style={{ ...displayStyle, ...style }}
      {...props}
    />
  );
}