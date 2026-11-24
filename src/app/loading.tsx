"use client";

import { useLocale } from "@/lib/i18n";

export default function Loading() {
  const { locale } = useLocale();
  const isAr = locale === "ar";

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-8 bg-ink px-6">
      {/* Wordmark */}
      <p className="font-display text-2xl font-medium tracking-tight text-fg sm:text-3xl" aria-hidden>
        {isAr ? (
          <>
            كريم <span className="text-accent">إبراهيم</span>
          </>
        ) : (
          <>
            KAREEM<span className="text-accent">.</span>IBRAHEM
          </>
        )}
      </p>

      {/* Sliding progress line */}
      <div className="h-px w-44 overflow-hidden bg-line sm:w-56" role="progressbar" aria-label={isAr ? "جارٍ التحميل" : "Loading"}>
        <div className="h-full w-1/3 animate-loading-bar bg-accent" />
      </div>

      <p className="text-sm text-fg-3">
        {isAr ? "جارٍ التحميل…" : "Loading…"}
      </p>
    </div>
  );
}
