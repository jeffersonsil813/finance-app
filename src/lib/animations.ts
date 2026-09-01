export const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

export const FADE_IN_DURATION = 0.2;

export function fadeInTransition(index = 0) {
  return {
    duration: FADE_IN_DURATION,
    ease: "easeOut" as const,
    delay: index * FADE_IN_DURATION,
  };
}
