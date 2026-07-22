import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllStations, getStationBySlug, getPhotosByStation } from "@/sanity/queries";
import { UploadForm } from "@/components/UploadForm";
import { Gallery } from "@/components/Gallery";
import { ContourLines } from "@/components/graphics/SectionDivider";
import { urlFor } from "@/sanity/image";
import { SITE_URL } from "@/lib/seo";
import { dict, isLang, locales, type Lang } from "@/lib/i18n";
import type { Metadata } from "next";

export const revalidate = 60;

type Props = { params: Promise<{ lang: string; id: string }> };

export async function generateStaticParams() {
  const stations = await getAllStations();
  return locales.flatMap((lang) =>
    stations.map((s) => ({ lang, id: s.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, id } = await params;
  if (!isLang(lang)) return {};
  const t = dict[lang];
  const station = await getStationBySlug(id, lang);
  if (!station) return {};
  const title = `${t.station(station.number)} — ${station.name}`;
  const description =
    station.description ?? t.stationMetaDescription(station.number, station.name);
  const canonical = `/${lang}/station/${station.slug}`;
  const ogImage = station.heroImage
    ? urlFor(station.heroImage as never)
        .width(1200)
        .height(630)
        .fit("crop")
        .quality(85)
        .url()
    : undefined;
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        fr: `/fr/station/${station.slug}`,
        en: `/en/station/${station.slug}`,
        id: `/id/station/${station.slug}`,
      },
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: `${SITE_URL}${canonical}`,
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : {}),
    },
    twitter: ogImage ? { images: [ogImage] } : undefined,
  };
}

export default async function StationPage({ params }: Props) {
  const { lang, id } = await params;
  if (!isLang(lang)) notFound();
  const t = dict[lang as Lang];

  const station = await getStationBySlug(id, lang);
  if (!station) notFound();

  const [photos, allStations] = await Promise.all([
    getPhotosByStation(station._id),
    getAllStations(lang),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: t.breadcrumbHome,
                item: `${SITE_URL}/${lang}`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: `${t.station(station.number)} — ${station.name}`,
                item: `${SITE_URL}/${lang}/station/${station.slug}`,
              },
            ],
          }),
        }}
      />
      {/* Mauve banner */}
      <div className="bg-mauve text-white text-center py-3">
        <p className="font-display font-extrabold tracking-wide text-sm md:text-base">
          {t.stationBanner(station.region, station.number)}
        </p>
      </div>

      {/* Header */}
      <section className="relative overflow-hidden bg-surface">
        <ContourLines className="absolute inset-0 w-full h-full text-clay opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-12 pb-16 lg:pt-16 lg:pb-20">
          <div className="flex items-center gap-2 text-xs">
            <Link
              href={`/${lang}`}
              className="px-3 py-1 rounded-full bg-background ring-1 ring-border text-foreground/70 hover:text-primary transition-colors"
            >
              {t.back}
            </Link>
          </div>
          <h1 className="mt-8 font-display font-extrabold text-foreground text-4xl md:text-6xl">
            {t.station(station.number)}
          </h1>
          <p className="mt-3 font-display font-bold text-primary text-2xl md:text-3xl">
            {station.name}
          </p>
          <p className="mt-2 text-mauve-dark text-sm md:text-base">
            {[
              station.location,
              station.altitude && `${t.altitudeLabel} ${station.altitude}`,
              station.bearing && `${t.bearingLabel} ${station.bearing}`,
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
          {station.description && (
            <p className="mt-6 max-w-2xl text-foreground/85 leading-relaxed">
              {station.description}
            </p>
          )}
        </div>
      </section>

      {/* Upload */}
      <section className="bg-background">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 py-16 md:py-20">
          <div className="text-center mb-8">
            <h2 className="font-display font-extrabold text-primary text-3xl md:text-4xl">
              {t.uploadHeading}
            </h2>
            <p className="mt-3 text-mauve-dark">{t.uploadSub}</p>
          </div>
          <UploadForm
            stationId={station._id}
            stationSlug={station.slug}
            stationNumber={station.number}
            lang={lang}
          />
        </div>
      </section>

      {/* Pedagogical text */}
      {station.pedagogicalText && (
        <section className="bg-mauve text-white">
          <div className="mx-auto max-w-3xl px-6 lg:px-10 py-12 md:py-16 text-center">
            <p className="font-display font-extrabold text-xl md:text-2xl mb-4">
              {t.pedagogicalBanner}
            </p>
            <p className="leading-relaxed text-white/90">
              {station.pedagogicalText}
            </p>
          </div>
        </section>
      )}

      {/* Gallery */}
      <section className="bg-surface">
        <div className="bg-mauve text-white text-center py-3">
          <p className="font-display font-extrabold tracking-wide text-sm md:text-base">
            {t.archiveBanner(station.number)}
          </p>
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 md:py-20">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <h2 className="font-display font-extrabold text-primary text-3xl md:text-4xl">
              {t.previousPhotos}
            </h2>
            <p className="text-sm text-mauve-dark">{t.photoCount(photos.length)}</p>
          </div>
          <Gallery photos={photos} lang={lang} />
        </div>
      </section>

      {/* Other stations */}
      <section className="bg-background py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="text-mauve-dark text-sm mb-6">{t.otherStations}</p>
          <ul className="flex flex-wrap gap-3">
            {allStations
              .filter((s) => s._id !== station._id)
              .map((s) => (
                <li key={s._id}>
                  <Link
                    href={`/${lang}/station/${s.slug}`}
                    className="px-5 py-3 rounded-full bg-surface ring-1 ring-border hover:ring-primary text-sm font-display font-bold text-foreground hover:text-primary transition-colors"
                  >
                    {t.station(s.number)} · {s.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </>
  );
}
