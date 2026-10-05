"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

type Technology = { readonly name: string; readonly icon: string };

export function TechnologyRail({ group, label, reverse, duration }: { group: readonly Technology[]; label: string; reverse: boolean; duration: number }) {
  const container = useRef<HTMLDivElement>(null);
  const isInView = useInView(container, { once: false, margin: "80px 0px" });
  const reducedMotion = useReducedMotion();
  const tracks = reducedMotion ? [0] : [0, 1];

  return <div ref={container} className="tech-rail-shell" aria-label={`${label}: ${group.map(({ name }) => name).join(", ")}`}><div className="container-shell"><p className="mb-2 pl-2 text-[10px] font-semibold uppercase tracking-[.18em] text-slate-400 sm:hidden">{label}</p></div><div className="tech-rail-mask"><motion.div className="tech-rail-track flex w-max gap-3 py-2 sm:gap-4" initial={false} animate={isInView && !reducedMotion ? { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] } : { x: 0 }} transition={isInView && !reducedMotion ? { x: { duration, repeat: Infinity, ease: "linear" } } : { duration: 0 }} style={{ willChange: isInView && !reducedMotion ? "transform" : "auto" }}>
      {tracks.map((copy) => <ul key={copy} aria-hidden={copy === 1 || undefined} className="flex shrink-0 gap-3 sm:gap-4">{group.map(({ name, icon }) => <li key={`${copy}-${name}`} className="tech-chip group flex min-w-[154px] items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 shadow-[0_5px_18px_rgba(15,23,42,.035)] sm:min-w-[190px] sm:gap-4 sm:px-5 sm:py-4"><Image src={icon} alt="" aria-hidden="true" width={30} height={30} className="h-7 w-7 shrink-0 object-contain transition-transform duration-300 group-hover:scale-110 sm:h-8 sm:w-8" /><span className="whitespace-nowrap text-xs font-medium text-slate-700 sm:text-sm">{name}</span><span className="ml-auto hidden text-[9px] font-semibold uppercase tracking-widest text-slate-300 sm:block">{label}</span></li>)}</ul>)}
    </motion.div></div></div>;
}
