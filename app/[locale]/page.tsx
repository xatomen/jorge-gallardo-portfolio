import { notFound } from "next/navigation";
import { Footer } from "@/src/components/layout/footer";
import { Navbar } from "@/src/components/layout/navbar";
import { About, Contact, Expertise, Hero, Projects, Technologies } from "@/src/components/sections/portfolio";
import { translations, type Locale } from "@/src/data/translations";

export default async function PortfolioPage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (locale !== "en" && locale !== "es") notFound();
  const t = translations[locale as Locale];

  return <><Navbar locale={locale as Locale} labels={t.nav} /><main><Hero t={t} /><About t={t} /><Expertise t={t} /><Technologies t={t} /><Projects t={t} /><Contact t={t} /></main><Footer locale={locale as Locale} tagline={t.footer.tagline} rights={t.footer.rights} nav={t.nav} /></>;
}
