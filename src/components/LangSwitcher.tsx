"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Lang } from "@/lib/i18n";

// FR | EN | ID toggle — swaps the language segment while staying on the same page.
export function LangSwitcher({ lang, ariaLabel }: { lang: Lang; ariaLabel: string }) {
  const pathname = usePathname() ?? `/${lang}`;
  const rest = pathname.replace(/^\/(fr|en|id)(?=\/|$)/, "");

  return (
    <div
      aria-label={ariaLabel}
      className="flex items-center rounded-full bg-white/10 ring-1 ring-white/25 p-0.5 text-xs font-display font-bold"
    >
      {locales.map((locale) => (
        <Link
          key={locale}
          href={`/${locale}${rest}` || `/${locale}`}
          aria-current={locale === lang ? "true" : undefined}
          className={`px-2.5 py-1 rounded-full uppercase tracking-wider transition-colors ${
            locale === lang
              ? "bg-white text-foreground"
              : "text-white/80 hover:text-white"
          }`}
        >
          {locale}
        </Link>
      ))}
    </div>
  );
}
