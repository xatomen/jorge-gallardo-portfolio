"use client";

import { motion, useReducedMotion, useScroll } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-blue-500"
      style={{ scaleX: reducedMotion ? 0 : scrollYProgress }}
    />
  );
}
