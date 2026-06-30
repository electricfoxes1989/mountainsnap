import type { Metadata } from "next";
import { Fraunces, Nunito, Outfit } from "next/font/google";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";

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
const DEFAULT_TITLE =
  "MountainSnap — Photographier l'évolution des paysages du Mercantour";
const DEFAULT_DESCRIPTION =
  "Un projet de recherche participative dans le Mercantour. Photographiez les paysages depuis des points d'observation fixes pour suivre leur évolution dans le temps.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s · MountainSnap",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "MountainSnap",
    "science participative",
    "Mercantour",
    "photographie répétée",
    "évolution des paysages",
    "risques naturels",
    "géomorphologie",
    "Mont Agung",
  ],
  authors: [{ name: "MountainSnap" }],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "fr_FR",
    url: SITE_URL,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${outfit.variable} ${nunito.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
