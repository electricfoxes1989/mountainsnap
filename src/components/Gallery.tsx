import type { PhotoDoc } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function formatDate(iso?: string) {
  if (!iso) return "";
  return dateFormatter.format(new Date(iso));
}

export function Gallery({ photos }: { photos: PhotoDoc[] }) {
  if (photos.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-border p-12 text-center text-muted">
        <p className="font-display font-bold text-xl text-foreground/80">
          Aucune photographie pour l&rsquo;instant.
        </p>
        <p className="mt-2 text-sm">Soyez la première personne à contribuer.</p>
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
                  alt={`Photographie déposée le ${formatDate(photo.takenAt)}`}
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
                  aria-label="Télécharger cette photographie"
                >
                  Télécharger ↓
                </a>
              </figcaption>
            </figure>
          </li>
        );
      })}
    </ul>
  );
}
