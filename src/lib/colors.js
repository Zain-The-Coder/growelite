/**
 * Three.js / Canvas theme color helper.
 * Reads CSS custom properties with getComputedStyle when in browser,
 * falling back to the brand hex values:
 *   --color-primary:    #af8339 (Gold)
 *   --color-secondary:  #54677b (Slate Blue)
 *   --color-background: #17181a (Near-black)
 */

export const THEME_COLORS = {
  primary: "#af8339",
  secondary: "#54677b",
  background: "#17181a",
  primaryLight: "#d4a259",
  navyDark: "#101112",
};

export function getThemeColors() {
  if (typeof window === "undefined") {
    return THEME_COLORS;
  }

  const computed = getComputedStyle(document.documentElement);
  const primary = computed.getPropertyValue("--color-primary").trim() || THEME_COLORS.primary;
  const secondary = computed.getPropertyValue("--color-secondary").trim() || THEME_COLORS.secondary;
  const background = computed.getPropertyValue("--color-background").trim() || THEME_COLORS.background;
  const primaryLight = computed.getPropertyValue("--color-primary-light").trim() || THEME_COLORS.primaryLight;
  const navyDark = computed.getPropertyValue("--color-navy-dark").trim() || THEME_COLORS.navyDark;

  return {
    primary,
    secondary,
    background,
    primaryLight,
    navyDark,
  };
}
