import type { MetadataRoute } from "next";
import { getAllStations } from "@/sanity/queries";
import { SITE_URL } from "@/lib/seo";

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const stations = await getAllStations();

  const stationRoutes: MetadataRoute.Sitemap = stations.map((s) => ({
    url: `${SITE_URL}/station/${s.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...stationRoutes,
  ];
}
