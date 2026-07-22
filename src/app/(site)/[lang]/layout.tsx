import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fraunces, Nunito, Outfit } from "next/font/google";
import { SITE_URL } from "@/lib/seo";
import { dict, isLang, locales, type Lang } from "@/lib/i18n";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "../../globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["italic"],
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const SITE_NAME = "MountainSnap";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = dict[lang];

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t.metaTitle,
      template: "%s · MountainSnap",
    },
    description: t.metaDescription,
    applicationName: SITE_NAME,
    keywords: [
      "MountainSnap",
      "science participative",
      "citizen science",
      "Mercantour",
      "photographie répétée",
      "repeat photography",
      "évolution des paysages",
      "risques naturels",
      "natural hazards",
      "géomorphologie",
      "Mont Agung",
      "Gunung Agung",
      "Bali",
    ],
    authors: [{ name: "MountainSnap" }],
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: t.ogLocale,
      url: `${SITE_URL}/${lang}`,
      title: t.metaTitle,
      description: t.metaDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: t.metaTitle,
      description: t.metaDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function SiteLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <html
      lang={lang}
      className={`${outfit.variable} ${nunito.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SiteHeader lang={lang as Lang} />
        <main className="flex-1 flex flex-col">{children}</main>
        <SiteFooter lang={lang as Lang} />
      </body>
    </html>
  );
}
