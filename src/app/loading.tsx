"use client";

import { useLocale } from "@/lib/i18n";

export default function Loading() {
  const { locale } = useLocale();
  return (
    <div className="flex min-h-svh items-center justify-center pt-16">
      <div className="flex flex-col items-center gap-4">
        <div className="size-8 animate-spin border-2 border-line border-t-accent" />
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-fg-3">
          {locale === "ar" ? "جارٍ التحميل" : "Loading"}
        </p>
      </div>
    </div>
  );
}
