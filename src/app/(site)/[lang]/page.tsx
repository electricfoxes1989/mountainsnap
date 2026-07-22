import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getStationsWithPreview,
  getHomePage,
  getPublications,
  getPartners,
  getSiteSettings,
  type StationWithPreview,
} from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { ContourLines } from "@/components/graphics/SectionDivider";
import { LiveStats } from "@/components/LiveStats";
import { SITE_URL } from "@/lib/seo";
import { dict, isLang, type Lang } from "@/lib/i18n";
import type { Metadata } from "next";

export const revalidate = 60;

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = dict[lang];
  const home = await getHomePage(lang);
  const title = t.metaTitle;
  const description = home?.heroTagline ?? t.metaDescription;
  const ogImage = home?.heroImage
    ? urlFor(home.heroImage as never)
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
      canonical: `/${lang}`,
      languages: { fr: "/fr", en: "/en", id: "/id" },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}`,
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : {}),
    },
    twitter: ogImage ? { images: [ogImage] } : undefined,
  };
}

const FALLBACK_HERO =
  "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=2400&q=80";
const FALLBACK_HOW =
  "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1600&q=80";

function paragraphs(text?: string): string[] {
  if (!text) return [];
  return text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function StationBand({
  stations,
  lang,
}: {
  stations: StationWithPreview[];
  lang: Lang;
}) {
  const t = dict[lang];
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 md:py-24 space-y-10">
      {stations.length === 0 && (
        <p className="text-center text-mauve-dark">{t.stationsEmpty}</p>
      )}
      {stations.map((s) => (
        <article key={s._id} className="grid lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-3">
            <h3 className="font-display font-extrabold text-foreground text-3xl md:text-4xl">
              {t.station(s.number)}
            </h3>
            <p className="mt-1 text-mauve-dark text-sm">
              {[s.name, s.altitude].filter(Boolean).join(" · ")}
            </p>
            <Link
              href={`/${lang}/station/${s.slug}`}
              className="mt-5 inline-flex items-center justify-center bg-primary text-white font-display font-bold px-7 py-3 rounded-full hover:bg-primary/90 transition-colors"
            >
              {t.uploadCta}
            </Link>
          </div>
          <div className="lg:col-span-9 grid grid-cols-3 sm:grid-cols-5 gap-2">
            {Array.from({ length: 5 }).map((_, i) => {
              const photo = s.photos?.[i];
              return (
                <Link
                  key={photo?._id ?? i}
                  href={`/${lang}/station/${s.slug}`}
                  className="aspect-square rounded-md ring-1 ring-border overflow-hidden bg-gradient-to-br from-clay/30 via-mauve/20 to-primary/30 block"
                >
                  {photo && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={urlFor(photo.image as never)
                        .width(300)
                        .height(300)
                        .fit("crop")
                        .quality(70)
                        .url()}
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </article>
      ))}
    </div>
  );
}

export default async function Home({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = dict[lang as Lang];

  const [stations, home, publications, partners, settings] = await Promise.all([
    getStationsWithPreview(),
    getHomePage(lang),
    getPublications(),
    getPartners(),
    getSiteSettings(lang),
  ]);

  const mercantourStations = stations.filter((s) => s.region !== "agung");
  const agungStations = stations.filter((s) => s.region === "agung");

  const heroTitle = home?.heroTitle ?? "MountainSnap";
  const heroTagline = home?.heroTagline ?? t.metaDescription;
  const heroImage = home?.heroImage
    ? urlFor(home.heroImage as never).width(2400).quality(85).url()
    : FALLBACK_HERO;
  const heroCtaPrimary = home?.heroCtaPrimary ?? t.uploadCta;
  const heroCtaSecondary = home?.heroCtaSecondary ?? "";

  const projectTitle = home?.projectTitle ?? "";
  const projectParas = paragraphs(home?.projectBody);
  const projectImage = home?.projectImage
    ? urlFor(home.projectImage as never).width(1600).quality(85).url()
    : null;

  const howImage = home?.howItWorksImage
    ? urlFor(home.howItWorksImage as never).width(1600).quality(85).url()
    : FALLBACK_HOW;
  const howSteps =
    home?.howItWorksSteps && home.howItWorksSteps.length === 3
      ? home.howItWorksSteps
      : [];

  const agungTitle = home?.agungTitle ?? "";
  const agungBody = home?.agungBody ?? "";
  const agungStatus = home?.agungStatus ?? "";

  const contactName = settings?.contactName ?? "Anna Minnema";
  const contactRole = settings?.contactRole ?? "";
  const contactEmail = settings?.contactEmail ?? "Anna.minnema@univ-paris1.fr";
  const contactAffiliation = settings?.contactAffiliation ?? "";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
                url: SITE_URL,
                name: "MountainSnap",
                inLanguage: lang,
                description: heroTagline,
              },
              {
                "@type": "Organization",
                "@id": `${SITE_URL}/#organization`,
                name: "MountainSnap",
                url: SITE_URL,
                description: heroTagline,
              },
            ],
          }),
        }}
      />
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <Image
          src={heroImage}
          alt={heroTitle}
          fill
          priority
          sizes="100vw"
          className="object-cover -z-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-mauve/40 via-black/30 to-black/65 -z-10" />
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 md:py-32 lg:py-44 text-center">
          <h1 className="font-display font-extrabold text-white text-5xl md:text-7xl lg:text-8xl tracking-tight">
            {heroTitle}
          </h1>
          <p className="mt-6 mx-auto max-w-3xl font-italic-serif text-white/95 text-lg md:text-2xl leading-snug whitespace-pre-line">
            {heroTagline}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="#mercantour"
              className="font-display font-semibold inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full text-sm md:text-base hover:bg-primary/90 transition-colors"
            >
              {heroCtaPrimary}
              <span aria-hidden>→</span>
            </Link>
            {heroCtaSecondary && (
              <Link
                href="#projet"
                className="font-display font-semibold inline-flex items-center gap-2 bg-white/10 ring-1 ring-white/40 backdrop-blur-sm text-white px-8 py-4 rounded-full text-sm md:text-base hover:bg-white/20 transition-colors"
              >
                {heroCtaSecondary}
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-background py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <LiveStats lang={lang} />
        </div>
      </section>

      {/* Partners */}
      {partners.length > 0 && (
        <section className="bg-surface py-10 border-y border-border/60">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <p className="text-center text-xs uppercase tracking-[0.3em] text-mauve-dark mb-6">
              {t.partnersHeading}
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {partners.map((p) => {
                const label = (
                  <span
                    className="font-display font-bold text-foreground/70 hover:text-primary text-sm md:text-base"
                    title={p.name}
                  >
                    {p.shortName}
                  </span>
                );
                return (
                  <li key={p._id}>
                    {p.url ? (
                      <a href={p.url} target="_blank" rel="noopener noreferrer">
                        {label}
                      </a>
                    ) : (
                      label
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      {/* Project intro */}
      <section id="projet" className="relative bg-surface overflow-hidden">
        <ContourLines className="absolute -bottom-10 -left-20 w-[700px] h-[400px] text-clay opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-5xl px-6 lg:px-10 py-20 md:py-28 text-center">
          <h2 className="font-display font-extrabold text-primary text-3xl md:text-5xl leading-tight whitespace-pre-line">
            {projectTitle}
          </h2>
          {projectParas.length > 0 && (
            <div className="mt-10 mx-auto max-w-3xl space-y-6 font-italic-serif text-lg md:text-xl text-primary/90 leading-relaxed">
              {projectParas.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}
          {projectImage && (
            <div className="mt-14 mx-auto max-w-4xl aspect-[16/9] rounded-2xl overflow-hidden ring-1 ring-border relative">
              <Image
                src={projectImage}
                alt={t.projectImageAlt}
                fill
                sizes="(min-width: 1024px) 56rem, 100vw"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-background py-20 md:py-28 relative overflow-hidden">
        <ContourLines className="absolute -right-20 -top-10 w-[700px] h-[400px] text-clay opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-5 aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-border bg-mauve/10 relative">
              <Image
                src={howImage}
                alt={t.howImageAlt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <ol className="lg:col-span-7 grid sm:grid-cols-3 gap-6">
              {howSteps.map((step) => (
                <li key={step.number}>
                  <div className="w-14 h-14 rounded-2xl bg-foreground text-white font-display font-extrabold text-2xl flex items-center justify-center">
                    {step.number}
                  </div>
                  <h3 className="mt-5 font-display font-extrabold text-primary text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-mauve-dark leading-relaxed text-sm md:text-base">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Mercantour stations */}
      <section id="mercantour" className="bg-surface">
        <div className="bg-mauve text-white text-center py-3">
          <p className="font-display font-extrabold tracking-wide text-sm md:text-base">
            {t.stationsBannerMercantour}
          </p>
        </div>
        <StationBand stations={mercantourStations} lang={lang} />
        <div className="bg-mauve text-white text-center py-3 mt-2">
          <p className="font-display font-extrabold tracking-wide text-xs md:text-sm">
            {t.pedagogicalBanner}
          </p>
        </div>
      </section>

      {/* Agung — Indonesia section */}
      <section id="agung" className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-mauve-dark">
            {t.intlExtension}
          </p>
          <h2 className="mt-3 font-display font-extrabold text-primary text-3xl md:text-5xl">
            {agungTitle}
          </h2>
          <p className="mt-6 mx-auto max-w-2xl font-italic-serif text-lg md:text-xl text-foreground/80 leading-relaxed whitespace-pre-line">
            {agungBody}
          </p>
          {agungStations.length === 0 && agungStatus && (
            <p className="mt-8 inline-block font-display font-bold uppercase tracking-wider text-xs px-4 py-2 rounded-full bg-mauve/15 text-mauve-dark">
              {agungStatus}
            </p>
          )}
        </div>
        {agungStations.length > 0 && (
          <div className="mt-14 bg-surface">
            <div className="bg-mauve text-white text-center py-3">
              <p className="font-display font-extrabold tracking-wide text-sm md:text-base">
                {t.stationsBannerAgung}
              </p>
            </div>
            <StationBand stations={agungStations} lang={lang} />
          </div>
        )}
      </section>

      {/* Resources */}
      <section
        id="ressources"
        className="bg-surface py-20 md:py-28 relative overflow-hidden"
      >
        <ContourLines className="absolute inset-0 w-full h-full text-clay opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-5xl px-6 lg:px-10 grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="font-display font-extrabold text-primary text-3xl md:text-4xl">
              {t.publicationsHeading}
            </h2>
            {publications.length > 0 ? (
              <ul className="mt-6 space-y-3 list-disc list-inside text-foreground/85 leading-relaxed">
                {publications.map((p) => (
                  <li key={p._id}>
                    {p.url ? (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {p.title}
                      </a>
                    ) : (
                      p.title
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-6 text-mauve-dark italic">{t.publicationsEmpty}</p>
            )}
          </div>
          <div>
            <h2 className="font-display font-extrabold text-primary text-3xl md:text-4xl">
              {t.contactHeading}
            </h2>
            <p className="mt-6 text-foreground/85">
              {contactName}
              {contactRole && ` — ${contactRole}`}
            </p>
            <a
              href={`mailto:${contactEmail}`}
              className="mt-2 inline-block font-display font-bold text-primary hover:underline"
            >
              {contactEmail}
            </a>
            {contactAffiliation && (
              <p className="mt-6 text-sm text-mauve-dark whitespace-pre-line">
                {contactAffiliation}
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
