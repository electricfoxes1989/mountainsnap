import type { MetadataRoute } from "next";
import { getAllStations } from "@/sanity/queries";
import { SITE_URL } from "@/lib/seo";
import { locales } from "@/lib/i18n";

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const stations = await getAllStations();

  const languages = (path: string) =>
    Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}${path}`]));

  const homeRoutes: MetadataRoute.Sitemap = locales.map((lang) => ({
    url: `${SITE_URL}/${lang}`,
    changeFrequency: "weekly",
    priority: 1,
    alternates: { languages: languages("") },
  }));

  const stationRoutes: MetadataRoute.Sitemap = locales.flatMap((lang) =>
    stations.map((s) => ({
      url: `${SITE_URL}/${lang}/station/${s.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      alternates: { languages: languages(`/station/${s.slug}`) },
    }))
  );

  return [...homeRoutes, ...stationRoutes];
}
