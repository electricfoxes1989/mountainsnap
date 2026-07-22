import Link from "next/link";
import { MountainLogo } from "./graphics/MountainLogo";
import { getSiteSettings } from "@/sanity/queries";
import { dict, type Lang } from "@/lib/i18n";
import { LangSwitcher } from "./LangSwitcher";

// Nav hrefs are stored without a language prefix (e.g. "/#mercantour");
// prefix them with the active language at render time.
function localizeHref(href: string, lang: Lang) {
  return href.startsWith("/") ? `/${lang}${href === "/" ? "" : href}` : href;
}

export async function SiteHeader({ lang }: { lang: Lang }) {
  const t = dict[lang];
  const settings = await getSiteSettings(lang);
  const siteName = settings?.siteName ?? "Mountainsnap";
  const navLinks =
    settings?.navLinks && settings.navLinks.length > 0
      ? settings.navLinks
      : t.navFallback;

  return (
    <header className="bg-foreground text-white sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-3 flex items-center justify-between gap-4">
        <Link
          href={`/${lang}`}
          className="flex items-center gap-3 group"
          aria-label={t.homeAria(siteName)}
        >
          <MountainLogo className="w-12 h-12 sm:w-14 sm:h-14 shrink-0" />
          <span className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-white">
            {siteName}
          </span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <nav
            aria-label={t.navAria}
            className="flex items-center gap-1 sm:gap-3 text-sm sm:text-base font-display"
          >
            {navLinks.map((link) => (
              <Link
                key={`${link.label}-${link.href}`}
                href={localizeHref(link.href, lang)}
                className="px-3 py-2 rounded-md text-white/90 hover:bg-white/10 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <LangSwitcher lang={lang} ariaLabel={t.switcherAria} />
        </div>
      </div>
    </header>
  );
}
