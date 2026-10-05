"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { MotionValue } from "motion/react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { siteConfig } from "@/src/config/site";
import type { Locale } from "@/src/data/translations";
import { Reveal } from "@/src/components/motion/reveal";

type Content = (typeof import("@/src/data/translations").translations)[Locale];
const projects = [
  { name: "ScrambleTimer", subtitleKey: "scrambleTitle", descriptionKey: "scrambleBody", altKey: "scrambleAlt", image: "/assets/scrambletimer-macbook.png", technologies: ["Next.js", "TypeScript", "Firebase"], href: siteConfig.links.scrambleTimer },
  { name: "IntegraMath", subtitleKey: "mathTitle", descriptionKey: "mathBody", altKey: "mathAlt", image: "/assets/integramath-macbook.png", technologies: ["Next.js", "TypeScript", "HeroUI"], href: siteConfig.links.integraMath },
] as const;

export function ProjectShowcase({ t }: { t: Content }) {
  const section = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const labels = [t.projects.scrambleTitle, t.projects.mathTitle];
  const descriptions = [t.projects.scrambleBody, t.projects.mathBody];
  const alts = [t.projects.scrambleAlt, t.projects.mathAlt];

  return <section id="projects" ref={section} className="projects-section dark-section relative"><div className="project-mobile container-shell section-space lg:hidden"><div className="mb-9"><Reveal><p className="section-kicker section-kicker-dark">04 / {t.projects.title}</p><h2 className="section-title mt-4">{t.projects.title}<span className="text-blue-400">.</span></h2><p className="section-lead">{t.projects.lead}</p></Reveal></div><div className="grid gap-5">{projects.map((project, index) => <Reveal key={project.name} delay={index * .06}><ProjectCard project={project} subtitle={labels[index]} description={descriptions[index]} alt={alts[index]} index={index} action={t.projects.view} /></Reveal>)}</div></div>
    <div className="project-desktop hidden lg:block" style={{ height: "210vh" }}><div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden"><div className="container-shell relative z-10 flex flex-1 flex-col pt-28 pb-12"><div className="flex items-end justify-between gap-8"><div><p className="section-kicker section-kicker-dark">04 / {t.projects.title}</p><h2 className="section-title mt-4">{t.projects.title}<span className="text-blue-400">.</span></h2><p className="section-lead mt-2">{t.projects.lead}</p></div><div className="mb-2 flex items-center gap-3 text-xs font-medium tracking-[.16em] text-slate-400"><span>01</span><div className="h-px w-20 overflow-hidden bg-white/15"><motion.div className="h-full bg-blue-400" style={{ width: progressWidth }} /></div><span>02</span></div></div><div className="relative mt-8 min-h-0 flex-1 overflow-hidden rounded-[1.75rem] border border-white/[.09] bg-[#0e192a]">{projects.map((project, index) => <ProjectPanel key={project.name} project={project} subtitle={labels[index]} description={descriptions[index]} alt={alts[index]} index={index} action={t.projects.view} progress={scrollYProgress} reducedMotion={Boolean(reducedMotion)} />)}<div className="absolute bottom-5 right-6 z-20 font-mono text-xs text-slate-500">SCROLL <span className="text-blue-300">↓</span></div></div></div></div></div>
  </section>;
}

function ProjectCard({ project, subtitle, description, alt, index, action }: { project: (typeof projects)[number]; subtitle: string; description: string; alt: string; index: number; action: string }) {
  return <article className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#101b2b]"><div className="relative flex h-[235px] items-center justify-center overflow-hidden bg-[#111d2e] px-4 pt-4 sm:h-[300px]"><Image src={project.image} alt={alt} width={900} height={650} className="h-full w-full object-contain" sizes="(max-width: 640px) 90vw, 46vw" /></div><div className="p-6"><div className="flex items-center justify-between"><p className="text-[10px] font-semibold uppercase tracking-[.17em] text-blue-300">0{index + 1} / {subtitle}</p><span className="text-xs text-slate-500">{String(index + 1).padStart(2, "0")} <span className="text-slate-700">/ 02</span></span></div><h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">{project.name}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{description}</p><ProjectMeta project={project} action={action} /></div></article>;
}

function ProjectPanel({ project, subtitle, description, alt, index, action, progress, reducedMotion }: { project: (typeof projects)[number]; subtitle: string; description: string; alt: string; index: number; action: string; progress: MotionValue<number>; reducedMotion: boolean }) {
  const [isActive, setIsActive] = useState(index === 0);
  useMotionValueEvent(progress, "change", (value) => setIsActive(index === 0 ? value < .5 : value >= .5));
  const opacity = useTransform(progress, [0, .46, .5, .54, 1], index === 0 ? [1, 1, .5, 0, 0] : [0, 0, .5, 1, 1]);
  const x = useTransform(progress, [0, .46, .54, 1], index === 0 ? [0, 0, reducedMotion ? 0 : -30, reducedMotion ? 0 : -30] : [reducedMotion ? 0 : 46, reducedMotion ? 0 : 46, 0, 0]);
  const imageY = useTransform(progress, [0, .15, 1], index === 0 ? [0, 0, reducedMotion ? 0 : -8] : [reducedMotion ? 0 : 16, 0, 0]);
  return <motion.article aria-hidden={!isActive} inert={!isActive} className="absolute inset-0 grid grid-cols-[.84fr_1.16fr] items-center gap-4 px-10 py-9 xl:px-14" style={{ opacity: reducedMotion ? (isActive ? 1 : 0) : opacity, x: reducedMotion ? 0 : x, pointerEvents: isActive ? "auto" : "none" }}><div className="relative z-10 max-w-lg py-6"><p className="text-xs font-semibold uppercase tracking-[.18em] text-blue-300">0{index + 1} / {subtitle}</p><h3 className="mt-5 text-[clamp(2.3rem,4.5vw,4.8rem)] font-semibold leading-[.95] tracking-[-.065em] text-white">{project.name}<span className="text-blue-400">.</span></h3><p className="mt-5 max-w-md text-base leading-7 text-slate-300">{description}</p><ProjectMeta project={project} action={action} /><div className="mt-14 text-xs font-medium tracking-[.15em] text-slate-500">0{index + 1} <span className="text-slate-700">/ 02</span></div></div><motion.div className="relative flex h-full min-h-0 items-center justify-center" style={{ y: reducedMotion ? 0 : imageY }}><div className="absolute inset-[12%] rounded-full bg-blue-500/[.12] blur-[75px]" /><Image src={project.image} alt={alt} width={1000} height={700} className="relative max-h-full w-full object-contain drop-shadow-[0_30px_65px_rgba(0,0,0,.4)]" sizes="(max-width: 1280px) 55vw, 700px" /></motion.div></motion.article>;
}

function ProjectMeta({ project, action }: { project: (typeof projects)[number]; action: string }) {
  return <><ul className="mt-6 flex flex-wrap gap-2">{project.technologies.map((technology) => <li key={technology} className="rounded-full border border-white/10 bg-white/[.025] px-3 py-1.5 text-[11px] text-slate-300">{technology}</li>)}</ul>{project.href && <a href={project.href} target="_blank" rel="noopener noreferrer" className="focus-underline mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-300 transition hover:text-white">{action}<ArrowUpRight size={16} /></a>}</>;
}
