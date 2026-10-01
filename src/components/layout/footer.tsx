import Link from "next/link";
import { siteConfig } from "@/src/config/site";
import type { Locale } from "@/src/data/translations";

type Props = { locale: Locale; tagline: string; rights: string; nav: { about: string; skills: string; projects: string; contact: string } };

export function Footer({ locale, tagline, rights, nav }: Props) {
  const year = new Date().getFullYear();
  const social = [
    { label: "LinkedIn", href: siteConfig.links.linkedin, icon: "devicon-linkedin-plain colored" },
    { label: "GitHub", href: siteConfig.links.github, icon: "devicon-github-original" },
  ];
  return <footer className="dark-section border-t border-white/10 py-10"><div className="container-shell"><div className="flex flex-col justify-between gap-8 md:flex-row"><div className="max-w-sm"><Link href={`/${locale}`} className="focus-underline rounded text-base font-semibold text-white">Jorge Gallardo</Link><p className="mt-1 text-sm text-slate-300">DevOps Engineer</p><p className="mt-3 text-sm leading-6 text-slate-400">{tagline}</p></div><div className="flex flex-col gap-5 sm:flex-row sm:gap-12"><nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-300"><a href="#about" className="focus-underline rounded hover:text-white">{nav.about}</a><a href="#expertise" className="focus-underline rounded hover:text-white">{nav.skills}</a><a href="#projects" className="focus-underline rounded hover:text-white">{nav.projects}</a><a href="#contact" className="focus-underline rounded hover:text-white">{nav.contact}</a></nav><div className="flex gap-4">{social.map(({ label, href, icon }) => <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer" className="focus-underline rounded-md text-slate-400 transition-colors hover:text-white"><i className={`${icon} technology-icon`} aria-hidden="true" /></a>)}</div></div></div><div className="mt-9 border-t border-white/10 pt-5 text-xs text-slate-500">© {year} Jorge Gallardo. {rights}</div></div></footer>;
}
