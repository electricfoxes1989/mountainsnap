import Link from "next/link";
import { MountainLogo } from "./graphics/MountainLogo";

export function SiteHeader() {
  return (
    <header className="bg-foreground text-white sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-3 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-3 group"
          aria-label="Accueil MountainSnap"
        >
          <MountainLogo className="w-12 h-12 sm:w-14 sm:h-14 shrink-0" />
          <span className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-white">
            Mountainsnap
          </span>
        </Link>
        <nav
          aria-label="Navigation principale"
          className="flex items-center gap-1 sm:gap-3 text-sm sm:text-base font-display"
        >
          <Link
            href="/#mercantour"
            className="px-3 py-2 rounded-md text-white/90 hover:bg-white/10 hover:text-white transition-colors"
          >
            Mercantour
          </Link>
          <Link
            href="/#agung"
            className="px-3 py-2 rounded-md text-white/90 hover:bg-white/10 hover:text-white transition-colors"
          >
            Agung
          </Link>
          <Link
            href="/#ressources"
            className="px-3 py-2 rounded-md text-white/90 hover:bg-white/10 hover:text-white transition-colors"
          >
            Ressources
          </Link>
        </nav>
      </div>
    </header>
  );
}
