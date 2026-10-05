export const motionSystem = {
  duration: {
    fast: 0.18,
    normal: 0.3,
    reveal: 0.56,
    showcase: 0.7,
  },
  ease: {
    standard: [0.22, 1, 0.36, 1] as const,
    out: [0.16, 1, 0.3, 1] as const,
  },
  stagger: 0.08,
} as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionSystem.duration.reveal, ease: motionSystem.ease.standard },
  },
};

export const staggerChildren = {
  hidden: {},
  visible: { transition: { staggerChildren: motionSystem.stagger } },
};
