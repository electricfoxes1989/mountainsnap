import { MountainLogo } from "./graphics/MountainLogo";
import { getSiteSettings } from "@/sanity/queries";

const DEFAULT_DESCRIPTION =
  "Une recherche participative sur l’évolution des paysages de montagne et les risques naturels associés — du Mercantour au Mont Agung.";
const DEFAULT_SCIENCE_LINES = [
  "Université Paris 1 Panthéon-Sorbonne",
  "Laboratoire de Géographie Physique (UMR 8591)",
  "Parc national du Mercantour · CNRS",
];
const DEFAULT_OPEN_DATA =
  "Les photographies déposées sont publiques et téléchargeables, dans l’esprit de la science participative.";

export async function SiteFooter() {
  const settings = await getSiteSettings();
  const siteName = settings?.siteName ?? "Mountainsnap";
  const description = settings?.siteDescription ?? DEFAULT_DESCRIPTION;
  const scienceTitle = settings?.footerScienceTitle ?? "Cadre scientifique";
  const scienceLines =
    settings?.footerScienceLines && settings.footerScienceLines.length > 0
      ? settings.footerScienceLines
      : DEFAULT_SCIENCE_LINES;
  const openDataTitle = settings?.footerOpenDataTitle ?? "Données ouvertes";
  const openDataText = settings?.footerOpenDataText ?? DEFAULT_OPEN_DATA;
  const tagline =
    settings?.footerTagline ?? "Mercantour, Alpes-Maritimes · Mont Agung, Bali";

  return (
    <footer className="bg-foreground text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12 grid gap-10 md:grid-cols-3 items-start">
        <div>
          <div className="flex items-center gap-3">
            <MountainLogo className="w-12 h-12" />
            <p className="font-display font-extrabold text-2xl">{siteName}</p>
          </div>
          <p className="mt-4 text-white/85 text-sm leading-relaxed max-w-xs">
            {description}
          </p>
        </div>
        <div className="text-sm text-white/85">
          <p className="font-display font-bold uppercase tracking-wider text-xs text-white mb-3">
            {scienceTitle}
          </p>
          {scienceLines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
        <div className="text-sm text-white/85">
          <p className="font-display font-bold uppercase tracking-wider text-xs text-white mb-3">
            {openDataTitle}
          </p>
          <p>{openDataText}</p>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-5 flex flex-col md:flex-row justify-between gap-2 text-xs text-white/70">
          <p>© {new Date().getFullYear()} {siteName}</p>
          <p>{tagline}</p>
        </div>
      </div>
    </footer>
  );
}
