import { defineQuery } from "next-sanity";
import { client } from "./client";

export type StationDoc = {
  _id: string;
  number: number;
  name: string;
  slug: string;
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

const allStationsQuery = defineQuery(`
  *[_type == "station"] | order(number asc) {
    _id, number, name, "slug": slug.current,
    location, altitude, bearing, description, pedagogicalText, heroImage
  }
`);

const stationBySlugQuery = defineQuery(`
  *[_type == "station" && slug.current == $slug][0] {
    _id, number, name, "slug": slug.current,
    location, altitude, bearing, description, pedagogicalText, heroImage
  }
`);

const photosByStationQuery = defineQuery(`
  *[_type == "photo" && station._ref == $stationId] | order(takenAt desc) {
    _id, takenAt, uploadedAt, image
  }
`);

const stationsWithPreviewQuery = defineQuery(`
  *[_type == "station"] | order(number asc) {
    _id, number, name, "slug": slug.current, altitude, location,
    "photos": *[_type == "photo" && station._ref == ^._id] | order(takenAt desc)[0...5] {
      _id, image, takenAt
    }
  }
`);

const photoCountQuery = defineQuery(`count(*[_type == "photo"])`);

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
  howItWorksImage?: unknown;
  howItWorksSteps?: { number: string; title: string; body?: string }[];
  agungTitle?: string;
  agungBody?: string;
  agungStatus?: string;
  contactName?: string;
  contactRole?: string;
  contactEmail?: string;
  contactAffiliation?: string;
};

const homePageQuery = defineQuery(`*[_type == "homePage"][0]`);

export async function getHomePage(): Promise<HomeDoc | null> {
  return client.fetch(homePageQuery, {}, { next: { revalidate: 60 } });
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

export async function getAllStations(): Promise<StationDoc[]> {
  return client.fetch(allStationsQuery, {}, { next: { revalidate: 60 } });
}

export async function getStationBySlug(
  slug: string
): Promise<StationDoc | null> {
  return client.fetch(stationBySlugQuery, { slug }, { next: { revalidate: 60 } });
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
