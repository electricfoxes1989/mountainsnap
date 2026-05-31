import { getLiveStats } from "@/lib/stats";

const numberFormatter = new Intl.NumberFormat("fr-FR");

function fmt(n: number) {
  return numberFormatter.format(n);
}

export async function LiveStats({ className = "" }: { className?: string }) {
  const stats = await getLiveStats();

  const items = [
    {
      value: stats.daysSinceLaunch,
      label: stats.daysSinceLaunch === 1 ? "jour d'archive" : "jours d'archive",
      live: true,
    },
    {
      value: stats.photoCount,
      label:
        stats.photoCount === 1
          ? "photographie déposée"
          : "photographies déposées",
      live: true,
    },
    {
      value: stats.stationCount,
      label:
        stats.stationCount === 1
          ? "station active"
          : "stations actives",
    },
  ];

  return (
    <dl
      className={`grid grid-cols-3 gap-px rounded-3xl overflow-hidden bg-border/60 ring-1 ring-border ${className}`}
    >
      {items.map((it) => (
        <div
          key={it.label}
          className="bg-background px-5 py-6 sm:px-7 sm:py-7 flex flex-col"
        >
          <dt className="order-2 mt-2 text-xs sm:text-sm text-muted leading-snug">
            {it.label}
          </dt>
          <dd className="order-1 font-serif text-3xl sm:text-4xl lg:text-5xl text-primary leading-none flex items-baseline gap-2">
            {fmt(it.value)}
            {it.live && (
              <span
                className="inline-block w-1.5 h-1.5 rounded-full bg-warm animate-pulse"
                aria-label="en direct"
              />
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
