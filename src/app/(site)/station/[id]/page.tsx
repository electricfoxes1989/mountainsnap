import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllStations, getStationBySlug, getPhotosByStation } from "@/sanity/queries";
import { UploadForm } from "@/components/UploadForm";
import { Gallery } from "@/components/Gallery";
import { ContourLines } from "@/components/graphics/SectionDivider";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateStaticParams() {
  const stations = await getAllStations();
  return stations.map((s) => ({ id: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const station = await getStationBySlug(id);
  if (!station) return {};
  return {
    title: `Station n°${station.number} — ${station.name}`,
    description: station.description,
  };
}

export default async function StationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const station = await getStationBySlug(id);
  if (!station) notFound();

  const [photos, allStations] = await Promise.all([
    getPhotosByStation(station._id),
    getAllStations(),
  ]);

  return (
    <>
      {/* Mauve banner */}
      <div className="bg-mauve text-white text-center py-3">
        <p className="font-display font-extrabold tracking-wide text-sm md:text-base">
          MERCANTOUR · STATION N°{station.number}
        </p>
      </div>

      {/* Header */}
      <section className="relative overflow-hidden bg-surface">
        <ContourLines className="absolute inset-0 w-full h-full text-clay opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-12 pb-16 lg:pt-16 lg:pb-20">
          <div className="flex items-center gap-2 text-xs">
            <Link
              href="/"
              className="px-3 py-1 rounded-full bg-background ring-1 ring-border text-foreground/70 hover:text-primary transition-colors"
            >
              ← Retour
            </Link>
          </div>
          <h1 className="mt-8 font-display font-extrabold text-foreground text-4xl md:text-6xl">
            Station n°{station.number}
          </h1>
          <p className="mt-3 font-display font-bold text-primary text-2xl md:text-3xl">
            {station.name}
          </p>
          <p className="mt-2 text-mauve-dark text-sm md:text-base">
            {[station.location, station.altitude && `Altitude ${station.altitude}`, station.bearing && `Orientation ${station.bearing}`]
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
              Publier votre photographie
            </h2>
            <p className="mt-3 text-mauve-dark">
              Cadrez selon le repère du poste, puis déposez votre image.
            </p>
          </div>
          <UploadForm
            stationId={station._id}
            stationSlug={station.slug}
            stationName={station.name}
            stationNumber={station.number}
          />
        </div>
      </section>

      {/* Pedagogical text */}
      {station.pedagogicalText && (
        <section className="bg-mauve text-white">
          <div className="mx-auto max-w-3xl px-6 lg:px-10 py-12 md:py-16 text-center">
            <p className="font-display font-extrabold text-xl md:text-2xl mb-4">
              Phénomène observé
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
            ARCHIVE · STATION N°{station.number}
          </p>
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 md:py-20">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <h2 className="font-display font-extrabold text-primary text-3xl md:text-4xl">
              Photographies précédentes
            </h2>
            <p className="text-sm text-mauve-dark">
              {photos.length} photographie{photos.length > 1 ? "s" : ""} · ordre
              chronologique
            </p>
          </div>
          <Gallery photos={photos} />
        </div>
      </section>

      {/* Other stations */}
      <section className="bg-background py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="text-mauve-dark text-sm mb-6">
            Autres stations dans le Mercantour
          </p>
          <ul className="flex flex-wrap gap-3">
            {allStations
              .filter((s) => s._id !== station._id)
              .map((s) => (
                <li key={s._id}>
                  <Link
                    href={`/station/${s.slug}`}
                    className="px-5 py-3 rounded-full bg-surface ring-1 ring-border hover:ring-primary text-sm font-display font-bold text-foreground hover:text-primary transition-colors"
                  >
                    Station n°{s.number} · {s.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </>
  );
}
