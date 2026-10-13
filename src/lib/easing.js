/**
 * Standard cubic-bezier and easing curves for GSAP and Framer Motion
 */
export const EASINGS = {
  // Award-winning smooth ease-out (expo/circ mix)
  smooth: [0.16, 1, 0.3, 1],
  // Snappy magnetic spring feel
  magnetic: [0.25, 1, 0.5, 1],
  // Dramatic showcase entrance
  entrance: [0.76, 0, 0.24, 1],
  // Smooth scroll lerp feel
  curtain: [0.87, 0, 0.13, 1],
  // Gentle ease in-out
  easeInOut: [0.65, 0, 0.35, 1],
};

export const GSAP_EASE = {
  smooth: "power4.out",
  expo: "expo.out",
  curtain: "power3.inOut",
  elastic: "elastic.out(1, 0.5)",
};
