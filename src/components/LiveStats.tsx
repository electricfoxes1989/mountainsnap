import { getLiveStats } from "@/lib/stats";
import { dict, type Lang } from "@/lib/i18n";

export async function LiveStats({
  lang,
  className = "",
}: {
  lang: Lang;
  className?: string;
}) {
  const t = dict[lang];
  const stats = await getLiveStats();
  const numberFormatter = new Intl.NumberFormat(t.dateLocale);

  const items = [
    {
      value: stats.daysSinceLaunch,
      label: t.statsDays(stats.daysSinceLaunch),
      live: true,
    },
    {
      value: stats.photoCount,
      label: t.statsPhotos(stats.photoCount),
      live: true,
    },
    {
      value: stats.stationCount,
      label: t.statsStations(stats.stationCount),
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
            {numberFormatter.format(it.value)}
            {it.live && (
              <span
                className="inline-block w-1.5 h-1.5 rounded-full bg-warm animate-pulse"
                aria-label={t.liveAria}
              />
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
