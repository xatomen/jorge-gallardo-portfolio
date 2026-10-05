"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { ChevronDown, Globe2, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/src/config/site";
import { motionSystem } from "@/src/lib/motion";
import type { Locale } from "@/src/data/translations";

type NavLabels = { about: string; skills: string; projects: string; contact: string; menu: string };
const observedSectionIds = ["about", "expertise", "skills", "projects", "contact"];

export function Navbar({ locale, labels }: { locale: Locale; labels: NavLabels }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { scrollY } = useScroll();
  const reducedMotion = useReducedMotion();
  const sections = [
    { id: "about", label: labels.about },
    { id: "skills", label: labels.skills },
    { id: "projects", label: labels.projects },
    { id: "contact", label: labels.contact },
  ];

  useMotionValueEvent(scrollY, "change", (value) => {
    const nextScrolled = value > 48;
    setScrolled((current) => current === nextScrolled ? current : nextScrolled);
  });

  useEffect(() => {
    const sectionElements = observedSectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    if (!sectionElements.length) return;

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id === "expertise" ? "skills" : visible.target.id);
    }, { rootMargin: "-24% 0px -62% 0px", threshold: [0, 0.15, 0.35, 0.6] });

    sectionElements.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [scrollY]);

  const languageSelector = (
    <div className="relative">
      <button
        type="button"
        aria-label={locale === "es" ? "Idioma: español" : "Language: English"}
        aria-expanded={languageOpen}
        aria-haspopup="menu"
        onClick={() => setLanguageOpen((value) => !value)}
        onKeyDown={(event) => { if (event.key === "Escape") setLanguageOpen(false); }}
        className="focus-underline inline-flex min-h-10 items-center gap-2 rounded-full px-2.5 text-xs font-semibold text-white/85 transition-colors hover:bg-white/10 hover:text-white"
      >
        <Globe2 size={16} aria-hidden="true" />
        <span>{locale.toUpperCase()}</span>
        <Image src={locale === "es" ? "/assets/flags/es.svg" : "/assets/flags/us.svg"} alt="" aria-hidden="true" width={20} height={14} className="h-[14px] w-5 rounded-[2px] object-cover" />
        <ChevronDown size={13} aria-hidden="true" className={`transition-transform ${languageOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {languageOpen && (
          <motion.div
            role="menu"
            aria-label="Select language"
            initial={reducedMotion ? false : { opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : -4 }}
            transition={{ duration: reducedMotion ? 0 : motionSystem.duration.fast }}
            className="absolute right-0 top-full z-50 mt-2 min-w-40 rounded-xl border border-white/10 bg-[#0d1728]/95 p-1.5 text-sm shadow-xl backdrop-blur-lg"
          >
            <LanguageOption href="/es#home" flag="/assets/flags/es.svg" code="ES" name="Español" active={locale === "es"} onSelect={() => { setLanguageOpen(false); setMobileOpen(false); }} />
            <LanguageOption href="/en#home" flag="/assets/flags/us.svg" code="EN" name="English" active={locale === "en"} onSelect={() => { setLanguageOpen(false); setMobileOpen(false); }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5">
      <motion.nav
        layout
        aria-label="Main navigation"
        transition={{ layout: { duration: reducedMotion ? 0 : motionSystem.duration.normal, ease: motionSystem.ease.standard } }}
        className={`pointer-events-auto relative mx-auto flex h-[58px] items-center justify-between rounded-full px-4 sm:px-6 ${scrolled ? "max-w-[58rem] border border-white/[0.09] bg-[#09111f]/90 shadow-[0_12px_32px_rgba(0,0,0,.14)] backdrop-blur-xl" : "max-w-6xl border border-transparent bg-transparent"}`}
      >
        <Link href={`/${locale}#home`} scroll className="focus-underline shrink-0 rounded text-sm font-semibold tracking-tight text-white sm:text-base">{siteConfig.name}</Link>
        <div className="hidden items-center gap-1 md:flex lg:gap-2">
          {sections.map(({ id, label }) => (
            <a key={id} href={`#${id}`} aria-current={activeSection === id ? "location" : undefined} className={`focus-underline relative rounded-full px-3 py-2 text-[13px] transition-colors ${activeSection === id ? "text-white" : "text-slate-300 hover:text-white"}`}>
              {label}
              {activeSection === id && <motion.span layoutId="active-section" aria-hidden="true" className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-blue-400" transition={{ duration: reducedMotion ? 0 : motionSystem.duration.fast }} />}
            </a>
          ))}
          {languageSelector}
        </div>
        <button type="button" aria-label={labels.menu} aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => setMobileOpen((value) => !value)} className="focus-underline rounded-full p-2 text-white transition-colors hover:bg-white/10 md:hidden">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-navigation"
              initial={reducedMotion ? false : { opacity: 0, y: -7, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: reducedMotion ? 0 : -5, scale: 1 }}
              transition={{ duration: reducedMotion ? 0 : motionSystem.duration.fast, ease: motionSystem.ease.standard }}
              className="absolute inset-x-0 top-[calc(100%+8px)] flex flex-col rounded-2xl border border-white/10 bg-[#0d1728]/95 p-2 shadow-xl backdrop-blur-xl md:hidden"
            >
              {sections.map(({ id, label }) => (
                <a key={id} href={`#${id}`} aria-current={activeSection === id ? "location" : undefined} onClick={() => setMobileOpen(false)} className="focus-underline flex items-center justify-between rounded-xl px-3 py-3 text-sm text-slate-200 transition-colors hover:bg-white/[.07] hover:text-white">
                  {label}
                  {activeSection === id && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-blue-500" />}
                </a>
              ))}
              <div className="border-t border-white/10 px-2 pt-1">{languageSelector}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}

function LanguageOption({ href, flag, code, name, active, onSelect }: { href: string; flag: string; code: string; name: string; active: boolean; onSelect: () => void }) {
  return (
    <Link href={href} scroll onClick={onSelect} role="menuitem" aria-current={active ? "page" : undefined} className={`focus-underline flex items-center gap-2 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/[0.07] ${active ? "font-semibold text-blue-300" : "text-slate-200"}`}>
      <Image src={flag} alt="" aria-hidden="true" width={20} height={14} className="h-[14px] w-5 rounded-[2px] object-cover" />
      <span>{code}</span><span className="text-slate-400">{name}</span>
    </Link>
  );
}
