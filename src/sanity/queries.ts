import { defineQuery } from "next-sanity";
import { client } from "./client";
import type { Lang, Region } from "@/lib/i18n";

// Localized fields are stored as { fr, en, id } objects in Sanity.
// The `string(field)` arm keeps queries working while content is still in the
// old plain-string (French) shape — pre-migration documents resolve to their
// original French value for every language.
const loc = (field: string) =>
  `"${field}": coalesce(${field}[$lang], ${field}.fr, string(${field}))`;

export type StationDoc = {
  _id: string;
  number: number;
  name: string;
  slug: string;
  region: Region;
  location?: string;
  altitude?: string;
  bearing?: string;
  description?: string;
  pedagogicalText?: string;
  heroImage?: unknown;
};

export type PhotoDoc = {
  _id: string;
  takenAt: string;
  uploadedAt?: string;
  image: unknown;
};

const STATION_FIELDS = `
  _id, number, name, "slug": slug.current,
  "region": coalesce(region, "mercantour"),
  location, altitude,
  ${loc("bearing")},
  ${loc("description")},
  ${loc("pedagogicalText")},
  heroImage
`;

const allStationsQuery = defineQuery(`
  *[_type == "station"] | order(number asc) { ${STATION_FIELDS} }
`);

const stationBySlugQuery = defineQuery(`
  *[_type == "station" && slug.current == $slug][0] { ${STATION_FIELDS} }
`);

const photosByStationQuery = defineQuery(`
  *[_type == "photo" && station._ref == $stationId && status == "approved"] | order(takenAt desc) {
    _id, takenAt, uploadedAt, image
  }
`);

const stationsWithPreviewQuery = defineQuery(`
  *[_type == "station"] | order(number asc) {
    _id, number, name, "slug": slug.current, altitude, location,
    "region": coalesce(region, "mercantour"),
    "photos": *[_type == "photo" && station._ref == ^._id && status == "approved"] | order(takenAt desc)[0...5] {
      _id, image, takenAt
    }
  }
`);

const photoCountQuery = defineQuery(`count(*[_type == "photo" && status == "approved"])`);

export type StationWithPreview = StationDoc & { photos: PhotoDoc[] };

export async function getStationsWithPreview(): Promise<StationWithPreview[]> {
  return client.fetch(stationsWithPreviewQuery, {}, { next: { revalidate: 60 } });
}

// — Home page singleton
export type HomeDoc = {
  heroTitle?: string;
  heroTagline?: string;
  heroImage?: unknown;
  heroCtaPrimary?: string;
  heroCtaSecondary?: string;
  projectTitle?: string;
  projectBody?: string;
  projectImage?: unknown;
  howItWorksImage?: unknown;
  howItWorksSteps?: { number: string; title: string; body?: string }[];
  agungTitle?: string;
  agungBody?: string;
  agungStatus?: string;
};

const homePageQuery = defineQuery(`*[_type == "homePage"][0]{
  heroTitle,
  ${loc("heroTagline")},
  heroImage,
  ${loc("heroCtaPrimary")},
  ${loc("heroCtaSecondary")},
  ${loc("projectTitle")},
  ${loc("projectBody")},
  projectImage,
  howItWorksImage,
  "howItWorksSteps": howItWorksSteps[]{
    number,
    ${loc("title")},
    ${loc("body")}
  },
  ${loc("agungTitle")},
  ${loc("agungBody")},
  ${loc("agungStatus")}
}`);

export async function getHomePage(lang: Lang): Promise<HomeDoc | null> {
  return client.fetch(homePageQuery, { lang }, { next: { revalidate: 60 } });
}

// — Site settings singleton (global chrome: nav, footer, contact)
export type SiteSettings = {
  siteName?: string;
  siteDescription?: string;
  navLinks?: { label: string; href: string }[];
  footerScienceTitle?: string;
  footerScienceLines?: string[];
  footerOpenDataTitle?: string;
  footerOpenDataText?: string;
  footerTagline?: string;
  contactName?: string;
  contactRole?: string;
  contactEmail?: string;
  contactAffiliation?: string;
};

const siteSettingsQuery = defineQuery(`*[_type == "siteSettings"][0]{
  siteName,
  ${loc("siteDescription")},
  "navLinks": navLinks[]{ ${loc("label")}, href },
  ${loc("footerScienceTitle")},
  footerScienceLines,
  ${loc("footerOpenDataTitle")},
  ${loc("footerOpenDataText")},
  ${loc("footerTagline")},
  contactName,
  ${loc("contactRole")},
  contactEmail,
  contactAffiliation
}`);

export async function getSiteSettings(lang: Lang): Promise<SiteSettings | null> {
  return client.fetch(siteSettingsQuery, { lang }, { next: { revalidate: 60 } });
}

// — Publications
export type Publication = { _id: string; title: string; url?: string };

const publicationsQuery = defineQuery(`
  *[_type == "publication"] | order(order asc, _createdAt asc) { _id, title, url }
`);

export async function getPublications(): Promise<Publication[]> {
  return client.fetch(publicationsQuery, {}, { next: { revalidate: 60 } });
}

// — Partners
export type Partner = {
  _id: string;
  name: string;
  shortName: string;
  url?: string;
  logo?: unknown;
};

const partnersQuery = defineQuery(`
  *[_type == "partner"] | order(order asc, _createdAt asc) {
    _id, name, shortName, url, logo
  }
`);

export async function getPartners(): Promise<Partner[]> {
  return client.fetch(partnersQuery, {}, { next: { revalidate: 60 } });
}

export async function getAllStations(lang: Lang = "fr"): Promise<StationDoc[]> {
  return client.fetch(allStationsQuery, { lang }, { next: { revalidate: 60 } });
}

export async function getStationBySlug(
  slug: string,
  lang: Lang
): Promise<StationDoc | null> {
  return client.fetch(stationBySlugQuery, { slug, lang }, { next: { revalidate: 60 } });
}

export async function getPhotosByStation(
  stationId: string
): Promise<PhotoDoc[]> {
  return client.fetch(
    photosByStationQuery,
    { stationId },
    { next: { revalidate: 30 } }
  );
}

export async function getPhotoCount(): Promise<number> {
  return client.fetch(photoCountQuery, {}, { next: { revalidate: 60 } });
}
