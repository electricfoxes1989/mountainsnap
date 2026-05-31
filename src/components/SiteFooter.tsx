import { MountainLogo } from "./graphics/MountainLogo";

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12 grid gap-10 md:grid-cols-3 items-start">
        <div>
          <div className="flex items-center gap-3">
            <MountainLogo className="w-12 h-12" />
            <p className="font-display font-extrabold text-2xl">Mountainsnap</p>
          </div>
          <p className="mt-4 text-white/85 text-sm leading-relaxed max-w-xs">
            Une recherche participative sur l&rsquo;évolution des paysages de
            montagne et les risques naturels associés — du Mercantour au Mont
            Agung.
          </p>
        </div>
        <div className="text-sm text-white/85">
          <p className="font-display font-bold uppercase tracking-wider text-xs text-white mb-3">
            Cadre scientifique
          </p>
          <p>Université Paris 1 Panthéon-Sorbonne</p>
          <p>Laboratoire de Géographie Physique (UMR 8591)</p>
          <p>Parc national du Mercantour · CNRS</p>
        </div>
        <div className="text-sm text-white/85">
          <p className="font-display font-bold uppercase tracking-wider text-xs text-white mb-3">
            Données ouvertes
          </p>
          <p>
            Les photographies déposées sont publiques et téléchargeables, dans
            l&rsquo;esprit de la science participative.
          </p>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-5 flex flex-col md:flex-row justify-between gap-2 text-xs text-white/70">
          <p>© {new Date().getFullYear()} MountainSnap</p>
          <p>Mercantour, Alpes-Maritimes · Mont Agung, Bali</p>
        </div>
      </div>
    </footer>
  );
}
