import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/src/data/translations";

const validLocales: Locale[] = ["en", "es"];

export function generateStaticParams() {
  return validLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!validLocales.includes(locale as Locale)) return {};
  const isSpanish = locale === "es";
  const description = isSpanish
    ? "Portfolio de Jorge Gallardo, DevOps Engineer especializado en cloud, automatización, CI/CD e Infrastructure as Code."
    : "Portfolio of Jorge Gallardo, a DevOps Engineer focused on cloud infrastructure, automation, CI/CD and Infrastructure as Code.";
  return {
    title: "Jorge Gallardo | DevOps Engineer",
    description,
    alternates: { canonical: `/${locale}`, languages: { en: "/en", es: "/es" } },
    openGraph: { title: "Jorge Gallardo | DevOps Engineer", description, type: "website", locale: isSpanish ? "es_CL" : "en_US", alternateLocale: isSpanish ? "en_US" : "es_CL" },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!validLocales.includes(locale as Locale)) notFound();
  return <div lang={locale}>{children}</div>;
}
