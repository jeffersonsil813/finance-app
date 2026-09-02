export const fadeInUp = {
  initial: { opacity: 0, y: -12 },
  animate: { opacity: 1, y: 0 },
};

export const fadeInDown = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
};

export const fadeInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
};

export function fadeInTransition(index = 0, duration = 0.3) {
  return {
    duration: duration,
    ease: "easeOut" as const,
    delay: index * duration,
  };
}
