"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { motionSystem } from "@/src/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 1, y: reducedMotion ? 0 : 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reducedMotion ? 0 : motionSystem.duration.reveal, delay: reducedMotion ? 0 : delay, ease: motionSystem.ease.standard }}
    >
      {children}
    </motion.div>
  );
}
