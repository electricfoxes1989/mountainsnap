import { MountainLogo } from "./graphics/MountainLogo";
import { getSiteSettings } from "@/sanity/queries";
import { dict, type Lang } from "@/lib/i18n";

const DEFAULT_SCIENCE_LINES = [
  "Université Paris 1 Panthéon-Sorbonne",
  "Laboratoire de Géographie Physique (UMR 8591)",
  "Parc national du Mercantour · CNRS",
];

export async function SiteFooter({ lang }: { lang: Lang }) {
  const t = dict[lang];
  const settings = await getSiteSettings(lang);
  const siteName = settings?.siteName ?? "Mountainsnap";
  const description = settings?.siteDescription ?? t.footerDescription;
  const scienceTitle = settings?.footerScienceTitle ?? t.footerScienceTitle;
  const scienceLines =
    settings?.footerScienceLines && settings.footerScienceLines.length > 0
      ? settings.footerScienceLines
      : DEFAULT_SCIENCE_LINES;
  const openDataTitle = settings?.footerOpenDataTitle ?? t.footerOpenDataTitle;
  const openDataText = settings?.footerOpenDataText ?? t.footerOpenDataText;
  const tagline = settings?.footerTagline ?? t.footerTagline;

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
