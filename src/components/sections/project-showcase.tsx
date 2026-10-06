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

const projectDefinitions = [
  {
    id: "docmark",
    name: "Docmark",
    subtitleKey: "docmarkSubtitle",
    descriptionKey: "docmarkBody",
    secondaryDescriptionKey: "docmarkSecondary",
    altKey: "docmarkAlt",
    technologies: ["Next.js", "TypeScript"],
    image: "/assets/docmark-macbook.png",
    imageWidth: 1536,
    imageHeight: 1024,
    isotype: "/assets/docmark-isotype.png",
    isotypeWidth: 1278,
    isotypeHeight: 1230,
    isotypeSurface: "paper",
    url: siteConfig.links.docmark,
    accent: "#60a5fa",
  },
  {
    id: "scrambletimer",
    name: "ScrambleTimer",
    subtitleKey: "scrambleTitle",
    descriptionKey: "scrambleBody",
    altKey: "scrambleAlt",
    technologies: ["Next.js", "TypeScript", "Firebase"],
    image: "/assets/scrambletimer-macbook.png",
    imageWidth: 1448,
    imageHeight: 1086,
    isotype: "/assets/scrambletimer-isotype.svg",
    isotypeWidth: 1024,
    isotypeHeight: 916,
    isotypeSurface: "none",
    url: siteConfig.links.scrambleTimer,
    accent: "#67e8f9",
  },
  {
    id: "integramath",
    name: "IntegraMath",
    subtitleKey: "mathTitle",
    descriptionKey: "mathBody",
    altKey: "mathAlt",
    technologies: ["Next.js", "TypeScript", "HeroUI"],
    image: "/assets/integramath-macbook.png",
    imageWidth: 1448,
    imageHeight: 1086,
    isotype: "/assets/integramath-isotype.png",
    isotypeWidth: 1100,
    isotypeHeight: 850,
    isotypeSurface: "none",
    url: siteConfig.links.integraMath,
    accent: "#38bdf8",
  },
] as const;

type Project = (typeof projectDefinitions)[number] & {
  subtitle: string;
  description: string;
  secondaryDescription?: string;
  alt: string;
};

function getLocalizedProjects(t: Content): Project[] {
  return projectDefinitions.map((project) => ({
    ...project,
    subtitle: t.projects[project.subtitleKey],
    description: t.projects[project.descriptionKey],
    secondaryDescription: "secondaryDescriptionKey" in project
      ? t.projects[project.secondaryDescriptionKey]
      : undefined,
    alt: t.projects[project.altKey],
  }));
}

const projectStops = [0, .29, .33, .37, .63, .67, .71, 1];
const projectOpacities = [
  [1, 1, 1, .5, 0, 0, 0, 0],
  [0, 0, 0, .5, 1, .5, 0, 0],
  [0, 0, 0, 0, 0, .5, 1, 1],
] as const;

export function ProjectShowcase({ t }: { t: Content }) {
  const section = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const projects = getLocalizedProjects(t);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const nextIndex = progress < .33 ? 0 : progress < .67 ? 1 : 2;
    setActiveIndex((currentIndex) => currentIndex === nextIndex ? currentIndex : nextIndex);
  });

  return <section id="projects" ref={section} className="projects-section dark-section relative">
    <div className="project-mobile container-shell section-space lg:hidden">
      <div className="mb-9"><Reveal><p className="section-kicker section-kicker-dark">04 / {t.projects.title}</p><h2 className="section-title mt-4">{t.projects.title}<span className="text-blue-400">.</span></h2><p className="section-lead">{t.projects.lead}</p></Reveal></div>
      <div className="grid gap-5">{projects.map((project, index) => <Reveal key={project.id} delay={index * .06}><ProjectCard project={project} index={index} total={projects.length} action={t.projects.view} /></Reveal>)}</div>
    </div>
    <div className="project-desktop hidden lg:block" style={{ height: "310vh" }}>
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <div className="container-shell relative z-10 flex flex-1 flex-col pt-28 pb-12">
          <div className="flex items-end justify-between gap-8">
            <div><p className="section-kicker section-kicker-dark">04 / {t.projects.title}</p><h2 className="section-title mt-4">{t.projects.title}<span className="text-blue-400">.</span></h2><p className="section-lead mt-2">{t.projects.lead}</p></div>
            <div className="mb-2 flex items-center gap-3 text-xs font-medium tracking-[.16em] text-slate-400"><span>{String(activeIndex + 1).padStart(2, "0")}</span><div className="flex gap-1.5">{projects.map((project, index) => <span key={project.id} className={`h-px w-7 transition-colors duration-300 ${index <= activeIndex ? "bg-blue-400" : "bg-white/15"}`} />)}</div><span>{String(projects.length).padStart(2, "0")}</span></div>
          </div>
          <div className="relative mt-8 min-h-0 flex-1 overflow-hidden rounded-[1.75rem] border border-white/[.09] bg-[#0e192a]">
            {projects.map((project, index) => <ProjectPanel key={project.id} project={project} index={index} total={projects.length} active={activeIndex === index} progress={scrollYProgress} reducedMotion={Boolean(reducedMotion)} action={t.projects.view} />)}
            <div className="absolute bottom-5 right-6 z-20 font-mono text-xs text-slate-500">SCROLL <span className="text-blue-300">↓</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>;
}

function ProjectCard({ project, index, total, action }: { project: Project; index: number; total: number; action: string }) {
  return <article className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#101b2b]">
    <div className="flex items-center gap-3 p-5 pb-3">
      <ProjectLogo project={project} size="mobile" />
      <div className="min-w-0"><h3 className="text-lg font-semibold tracking-tight text-white">{project.name}</h3><p className="mt-0.5 text-xs leading-5 text-slate-400">{project.subtitle}</p></div>
      <span className="ml-auto self-start font-mono text-[11px] text-slate-500">{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
    </div>
    <div className="relative flex h-[220px] items-center justify-center overflow-hidden px-3 sm:h-[300px] sm:px-5">
      <Image src={project.image} alt={project.alt} width={project.imageWidth} height={project.imageHeight} className="relative h-full w-full object-contain" sizes="(max-width: 640px) 92vw, 46vw" />
    </div>
    <div className="px-5 pb-6 pt-3"><p className="text-sm leading-6 text-slate-300">{project.description}</p>{project.secondaryDescription && <p className="mt-3 text-xs leading-5 text-slate-400">{project.secondaryDescription}</p>}<ProjectMeta project={project} action={action} /></div>
  </article>;
}

function ProjectPanel({ project, index, total, active, progress, reducedMotion, action }: { project: Project; index: number; total: number; active: boolean; progress: MotionValue<number>; reducedMotion: boolean; action: string }) {
  const opacityValues = projectOpacities[index].map<number>((value) => value);
  const opacity = useTransform(progress, projectStops, opacityValues);
  const position = index === 0 ? [0, 0, 0, -14, -22, -22, -22, -22]
    : index === 1 ? [18, 18, 14, 0, 0, -14, -22, -22]
      : [22, 22, 22, 14, 0, 0, 0, 0];
  const x = useTransform(progress, projectStops, position);
  const scale = useTransform(opacity, [0, 1], [.96, 1]);
  const y = useTransform(opacity, [0, 1], [9, 0]);
  const imageY = useTransform(progress, [0, .33, .67, 1], index === 0 ? [0, 0, -7, -7] : index === 1 ? [10, 0, 0, -7] : [10, 10, 0, 0]);

  return <motion.article aria-hidden={!active} inert={!active} className="absolute inset-0 grid grid-cols-[.84fr_1.16fr] items-center gap-4 px-10 py-9 xl:px-14" style={{ opacity: reducedMotion ? (active ? 1 : 0) : opacity, x: reducedMotion ? 0 : x, scale: reducedMotion ? 1 : scale, pointerEvents: active ? "auto" : "none" }}>
    <div className="relative z-10 max-w-lg py-6">
      <p className="font-mono text-xs font-medium tracking-[.16em] text-blue-300">{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</p>
      <motion.div className="mt-5 flex items-center gap-4" style={{ opacity: reducedMotion ? (active ? 1 : 0) : opacity, y: reducedMotion ? 0 : y, scale: reducedMotion ? 1 : scale }}>
        <ProjectLogo project={project} size="desktop" />
        <div className="min-w-0"><h3 className="text-[clamp(2rem,3.8vw,4rem)] font-semibold leading-[.95] tracking-[-.065em] text-white">{project.name}<span className="text-blue-400">.</span></h3><p className="mt-2 text-sm font-medium text-slate-300">{project.subtitle}</p></div>
      </motion.div>
      <p className="mt-5 max-w-md text-base leading-7 text-slate-300">{project.description}</p>
      {project.secondaryDescription && <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">{project.secondaryDescription}</p>}
      <ProjectMeta project={project} action={action} />
    </div>
    <motion.div className="relative flex h-full min-h-0 items-center justify-center" style={{ y: reducedMotion ? 0 : imageY }}>
      <div className="absolute inset-[12%] rounded-full opacity-[.11] blur-[70px]" style={{ backgroundColor: project.accent }} />
      <Image src={project.image} alt={project.alt} width={project.imageWidth} height={project.imageHeight} className="relative max-h-full w-full object-contain drop-shadow-[0_28px_55px_rgba(0,0,0,.38)]" sizes="(max-width: 1280px) 55vw, 700px" />
    </motion.div>
  </motion.article>;
}

function ProjectLogo({ project, size }: { project: Project; size: "mobile" | "desktop" }) {
  const dimensions = size === "mobile" ? "h-10 w-10" : "h-14 w-14";
  const frame = project.isotypeSurface === "paper" ? "rounded-xl border border-white/15 bg-slate-50 p-1.5" : "";
  return <span className={`relative flex shrink-0 items-center justify-center ${dimensions} ${frame}`}>
    <Image src={project.isotype} alt="" aria-hidden="true" width={project.isotypeWidth} height={project.isotypeHeight} className="h-full w-full object-contain" sizes={size === "mobile" ? "40px" : "56px"} />
  </span>;
}

function ProjectMeta({ project, action }: { project: Project; action: string }) {
  return <><ul className="mt-6 flex flex-wrap gap-2">{project.technologies.map((technology) => <li key={technology} className="rounded-full border border-white/10 bg-white/[.025] px-3 py-1.5 text-[11px] text-slate-300">{technology}</li>)}</ul>{project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className="focus-underline mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-300 transition hover:text-white">{action}<ArrowUpRight size={16} /></a>}</>;
}
