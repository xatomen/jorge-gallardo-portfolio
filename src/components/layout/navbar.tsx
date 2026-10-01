"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown, Globe2, Menu, X } from "lucide-react";
import type { Locale } from "@/src/data/translations";
import { siteConfig } from "@/src/config/site";

type Props = { locale: Locale; labels: { about: string; skills: string; projects: string; contact: string; menu: string } };

export function Navbar({ locale, labels }: Props) {
  const [open, setOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const items = [["about", labels.about], ["expertise", labels.skills], ["projects", labels.projects], ["contact", labels.contact]];
  const languageSelector = (
    <div className="relative ml-2">
      <button type="button" aria-label={locale === "es" ? "Idioma: español" : "Language: English"} aria-expanded={languageOpen} aria-haspopup="menu" onClick={() => setLanguageOpen(!languageOpen)} onKeyDown={(event) => { if (event.key === "Escape") setLanguageOpen(false); }} className="focus-underline inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 md:text-white md:hover:bg-white/10">
        <Globe2 size={17} aria-hidden="true" />
        <span>{locale.toUpperCase()}</span>
        <Image src={locale === "es" ? "/assets/flags/es.svg" : "/assets/flags/us.svg"} alt="" aria-hidden="true" width={20} height={14} className="h-[14px] w-5 rounded-[2px] object-cover" />
        <ChevronDown size={14} aria-hidden="true" className={`transition-transform ${languageOpen ? "rotate-180" : ""}`} />
      </button>
      {languageOpen && <div role="menu" aria-label="Select language" className="absolute right-0 top-full z-30 mt-2 min-w-40 rounded-xl bg-white p-1.5 text-sm shadow-xl">
        <Link role="menuitem" href="/es#home" scroll={true} aria-current={locale === "es" ? "page" : undefined} onClick={() => { setLanguageOpen(false); setOpen(false); }} className={`focus-underline flex items-center gap-2 rounded-lg px-3 py-2.5 transition hover:bg-slate-50 ${locale === "es" ? "font-semibold text-blue-600" : "text-slate-700"}`}><Image src="/assets/flags/es.svg" alt="" aria-hidden="true" width={20} height={14} className="h-[14px] w-5 rounded-[2px] object-cover" /><span>ES</span><span className="text-slate-500">Español</span></Link>
        <Link role="menuitem" href="/en#home" scroll={true} aria-current={locale === "en" ? "page" : undefined} onClick={() => { setLanguageOpen(false); setOpen(false); }} className={`focus-underline flex items-center gap-2 rounded-lg px-3 py-2.5 transition hover:bg-slate-50 ${locale === "en" ? "font-semibold text-blue-600" : "text-slate-700"}`}><Image src="/assets/flags/us.svg" alt="" aria-hidden="true" width={20} height={14} className="h-[14px] w-5 rounded-[2px] object-cover" /><span>EN</span><span className="text-slate-500">English</span></Link>
      </div>}
    </div>
  );
  const links = (
    <>
      {items.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="focus-underline rounded-md px-2 py-2 text-sm text-slate-600 transition-colors hover:text-blue-600">{label}</a>)}
      {languageSelector}
    </>
  );
  return <header className="absolute inset-x-0 top-0 z-20 border-b border-white/10"><nav aria-label="Main navigation" className="container-shell flex h-[76px] items-center justify-between"><Link href={`/${locale}#home`} scroll={true} className="focus-underline rounded text-base font-semibold tracking-tight text-white">{siteConfig.name}</Link><div className="hidden items-center gap-3 md:flex">{links}</div><button type="button" aria-label={labels.menu} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)} className="focus-underline rounded-lg p-2 text-white hover:bg-white/10 md:hidden">{open ? <X size={22} /> : <Menu size={22} />}</button>{open && <div id="mobile-navigation" className="absolute inset-x-4 top-[68px] flex flex-col rounded-xl bg-white p-3 shadow-xl md:hidden">{items.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="focus-underline rounded-lg px-3 py-3 text-sm text-slate-700 hover:bg-slate-50">{label}</a>)}{languageSelector}</div>}</nav></header>;
}
