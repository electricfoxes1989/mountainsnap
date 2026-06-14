import Link from "next/link";
import { MountainLogo } from "./graphics/MountainLogo";
import { getSiteSettings } from "@/sanity/queries";

const DEFAULT_NAV = [
  { label: "Mercantour", href: "/#mercantour" },
  { label: "Agung", href: "/#agung" },
  { label: "Ressources", href: "/#ressources" },
];

export async function SiteHeader() {
  const settings = await getSiteSettings();
  const siteName = settings?.siteName ?? "Mountainsnap";
  const navLinks =
    settings?.navLinks && settings.navLinks.length > 0
      ? settings.navLinks
      : DEFAULT_NAV;

  return (
    <header className="bg-foreground text-white sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-3 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-3 group"
          aria-label={`Accueil ${siteName}`}
        >
          <MountainLogo className="w-12 h-12 sm:w-14 sm:h-14 shrink-0" />
          <span className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-white">
            {siteName}
          </span>
        </Link>
        <nav
          aria-label="Navigation principale"
          className="flex items-center gap-1 sm:gap-3 text-sm sm:text-base font-display"
        >
          {navLinks.map((link) => (
            <Link
              key={`${link.label}-${link.href}`}
              href={link.href}
              className="px-3 py-2 rounded-md text-white/90 hover:bg-white/10 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
