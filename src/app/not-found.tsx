"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLocale } from "@/lib/i18n";

export default function NotFound() {
  const { t } = useLocale();

  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-6 pt-16 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">{t.notFound.code}</p>
      <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-fg sm:text-5xl">
        {t.notFound.title}
      </h1>
      <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg-2">{t.notFound.body}</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 text-sm font-medium text-fg transition-colors hover:border-fg-3 hover:bg-surface-hover"
      >
        <ArrowLeft className="size-4 rtl:-scale-x-100" />
        {t.notFound.back}
      </Link>
    </div>
  );
}
