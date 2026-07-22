import type { PhotoDoc } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { dict, type Lang } from "@/lib/i18n";

export function Gallery({ photos, lang }: { photos: PhotoDoc[]; lang: Lang }) {
  const t = dict[lang];
  const dateFormatter = new Intl.DateTimeFormat(t.dateLocale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formatDate = (iso?: string) =>
    iso ? dateFormatter.format(new Date(iso)) : "";

  if (photos.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-border p-12 text-center text-muted">
        <p className="font-display font-bold text-xl text-foreground/80">
          {t.galleryEmptyTitle}
        </p>
        <p className="mt-2 text-sm">{t.galleryEmptyBody}</p>
      </div>
    );
  }

  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {photos.map((photo) => {
        const thumb = urlFor(photo.image as never)
          .width(800)
          .height(600)
          .fit("crop")
          .quality(80)
          .url();
        const full = urlFor(photo.image as never).quality(90).url();
        return (
          <li key={photo._id} className="group">
            <figure>
              <div className="aspect-[4/3] relative overflow-hidden rounded-2xl ring-1 ring-border/60 bg-surface">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumb}
                  alt={t.photoAlt(formatDate(photo.takenAt))}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-background/90 text-xs text-foreground/80 backdrop-blur-sm">
                  {formatDate(photo.takenAt)}
                </div>
              </div>
              <figcaption className="mt-3 flex justify-end text-sm">
                <a
                  href={`${full}?dl=`}
                  className="text-primary hover:underline whitespace-nowrap"
                  aria-label={t.downloadAria}
                >
                  {t.download}
                </a>
              </figcaption>
            </figure>
          </li>
        );
      })}
    </ul>
  );
}
