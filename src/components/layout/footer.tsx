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
  return <footer className="site-footer dark-section border-t border-white/[.07] py-8 sm:py-9"><div className="container-shell"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-center"><div className="max-w-sm"><Link href={`/${locale}#home`} className="focus-underline rounded text-base font-semibold tracking-tight text-white">Jorge Gallardo<span className="text-blue-400">.</span></Link><p className="mt-2 text-xs leading-5 text-slate-400">{tagline}</p></div><div className="flex flex-wrap items-center gap-x-8 gap-y-4"><nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-3 text-xs text-slate-400"><a href="#about" className="focus-underline rounded hover:text-white">{nav.about}</a><a href="#skills" className="focus-underline rounded hover:text-white">{nav.skills}</a><a href="#projects" className="focus-underline rounded hover:text-white">{nav.projects}</a><a href="#contact" className="focus-underline rounded hover:text-white">{nav.contact}</a></nav><div className="flex gap-4">{social.map(({ label, href, icon }) => <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer" className="focus-underline rounded-md text-lg text-slate-400 transition-colors hover:text-white"><i className={`${icon} technology-icon`} aria-hidden="true" /></a>)}</div></div></div><div className="mt-7 flex flex-col gap-2 border-t border-white/[.07] pt-4 text-[10px] text-slate-500 sm:flex-row sm:items-center sm:justify-between"><span>© {year} Jorge Gallardo. {rights}</span><span className="font-mono tracking-wide">DESIGNED & BUILT WITH CARE</span></div></div></footer>;
}
