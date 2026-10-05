"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { ReactNode } from "react";
import { type PointerEvent, useRef } from "react";

export function HeroArt({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const pointerX = useSpring(useMotionValue(0), { stiffness: 90, damping: 22, mass: .6 });
  const pointerY = useSpring(useMotionValue(0), { stiffness: 90, damping: 22, mass: .6 });

  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType !== "mouse" || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - .5) * 18);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - .5) * 14);
  };

  return <div ref={ref} onPointerMove={move} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }} className="relative mx-auto w-full max-w-[680px] lg:-mr-12"><motion.div className="hero-art-inner" style={reducedMotion ? undefined : { x: pointerX, y: pointerY }}><div className="hero-art-glow" /><div className="hero-art-frame">{children}</div><div className="hero-orbit orbit-one" aria-hidden="true" /><div className="hero-orbit orbit-two" aria-hidden="true" /><div className="hero-caption" aria-hidden="true"><span className="h-2 w-2 rounded-full bg-cyan-300" /> CLOUD INFRASTRUCTURE <span className="text-slate-600">/</span> AUTOMATION</div></motion.div></div>;
}
