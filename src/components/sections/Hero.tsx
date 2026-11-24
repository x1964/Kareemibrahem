"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowDown, ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { site } from "@/lib/site";
import { scrollToHash } from "@/lib/scroll";
import { Magnetic } from "@/components/ui/Magnetic";
import { useLocale } from "@/lib/i18n";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { locale, t } = useLocale();
  const isAr = locale === "ar";
  const headlineLines = t.hero.lines;

  // Arabic script is connected: letter-spacing and uppercase break it,
  // so small labels only get tracking/uppercase in English.
  const labelStyle = isAr
    ? "text-sm font-medium"
    : "font-mono text-[11px] font-medium uppercase tracking-[0.18em]";

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        "[data-hero-fade]",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 },
        0.15
      )
        .fromTo(
          "[data-hero-line] > span",
          { yPercent: 115 },
          { yPercent: 0, duration: 1.15, stagger: 0.12 },
          0.3
        )
        .fromTo(
          "[data-hero-portrait]",
          { scale: 1.08 },
          { scale: 1, duration: 1.6, ease: "power3.out" },
          0.2
        )
        .fromTo(
          "[data-hero-frame]",
          { opacity: 0, x: isAr ? 16 : -16, y: 16 },
          { opacity: 1, x: 0, y: 0, duration: 1.1 },
          0.6
        );
    },
    { scope: ref }
  );

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-svh flex-col overflow-hidden pt-16 lg:pt-[72px]"
      aria-label={isAr ? "المقدمة" : "Introduction"}
    >
      {/* Soft blue ambient glow */}
      <div className="pointer-events-none absolute -top-32 -end-[10%] h-[560px] w-[560px] rounded-full bg-accent/[0.07] blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-[20%] -start-[10%] h-[480px] w-[480px] rounded-full bg-accent/[0.04] blur-[140px]" />

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="grid items-center gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          {/* Left: copy */}
          <div className="relative isolate">
            {/* Availability pill */}
            <div data-hero-fade className="mb-8">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-2 text-sm text-fg-2 shadow-sm">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent" />
                </span>
                {t.hero.available}
              </span>
            </div>

            {/* Name + role */}
            <div data-hero-fade className="mb-6 flex items-center gap-3">
              <span aria-hidden className="h-px w-10 bg-accent max-sm:bg-white/40" />
              <p className={`${labelStyle} text-accent max-sm:text-white/70`}>
                <span className="text-fg max-sm:text-white">{site.name}</span>
                <span className="mx-2 text-fg-3 max-sm:text-white/40" aria-hidden>
                  /
                </span>
                {isAr ? "مطوّر متكامل" : site.role}
              </p>
            </div>

            <div className="relative">
              {/* Large circular portrait backdrop — phones only, headline sits on it */}
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 -z-10 size-[130vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full sm:hidden"
              >
                <Image
                  src="/images/portrait.webp"
                  alt=""
                  fill
                  sizes="130vw"
                  className="object-cover object-[center_20%]"
                />
              </div>

              <div className="flex items-center gap-5 lg:block lg:gap-0">
                {/* Circular portrait beside the headline — tablets only */}
                <div className="hidden size-24 shrink-0 self-start overflow-hidden rounded-full border border-line bg-surface shadow-[0_16px_36px_-16px_rgba(12,18,34,0.35)] ring-2 ring-accent/15 sm:block sm:size-28 lg:hidden">
                  <Image
                    src="/images/portrait.webp"
                    alt=""
                    fill
                    sizes="112px"
                    className="object-cover object-[center_20%]"
                    aria-hidden
                  />
                </div>

              <h1 className="min-w-0 flex-1 font-display text-[11.5vw] font-medium leading-[1.18] tracking-[-0.01em] text-fg [text-wrap:balance] max-sm:text-white sm:text-[7.5vw] lg:flex-none lg:text-[4.4rem] xl:text-[5.2rem]">
              {headlineLines.map((line, i) => (
                <span
                  key={line}
                  data-hero-line
                  className="block overflow-hidden pb-2"
                >
                  <span className="block will-change-transform">
                    {i === headlineLines.length - 1 ? (
                      isAr ? (
                        <>
                          <span className="text-fg max-sm:text-white">إلى </span>
                          <span className="text-accent max-sm:text-[#9db9ff]">واقع.</span>
                        </>
                      ) : (
                        <>
                          <span className="text-fg max-sm:text-white">into </span>
                          <span className="text-accent max-sm:text-[#9db9ff]">reality.</span>
                        </>
                      )
                    ) : (
                      line
                    )}
                  </span>
                </span>
              ))}
              </h1>
              </div>

            <p
              data-hero-fade
              className="mt-8 max-w-xl text-lg leading-relaxed text-fg-2 max-sm:text-white/80 sm:text-xl sm:leading-relaxed"
            >
              {t.hero.description}
            </p>
            </div>

            {/* Actions */}
            <div
              className="mt-10 flex flex-wrap items-center gap-3"
              data-hero-fade
            >
              <Magnetic>
                <button
                  type="button"
                  onClick={() => scrollToHash("#work")}
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-medium text-white shadow-[0_12px_30px_-12px] shadow-accent/60 transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {t.hero.work}
                  <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
                </button>
              </Magnetic>
              <Magnetic>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHash("#contact");
                  }}
                  className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface px-7 py-4 text-sm font-medium text-fg transition-colors hover:border-fg-3 hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {t.hero.talk}
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 rtl:-scale-x-100" />
                </a>
              </Magnetic>
              <a
                href={site.cvPath}
                download="Kareem-Ibrahem-CV.pdf"
                className="group inline-flex items-center gap-1.5 px-3 py-4 text-sm font-medium text-fg-2 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent max-sm:text-white/80 max-sm:hover:text-white"
              >
                {t.hero.cv}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
              </a>
            </div>
          </div>

          {/* Right: portrait — desktop only; smaller screens use the circular treatments above */}
          <div data-hero-fade className="hidden justify-center lg:flex lg:justify-end">
            <div className="relative w-full max-w-[360px]">
              {/* Offset outline frame behind the portrait */}
              <div
                data-hero-frame
                aria-hidden
                className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl border border-accent/40 rtl:-translate-x-4"
              />

              <div className="animate-float relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_30px_70px_-30px_rgba(12,18,34,0.3)]">
                <div data-hero-portrait className="absolute inset-0">
                  <Image
                    src="/images/portrait.webp"
                    alt={
                      isAr
                        ? "صورة شخصية لكريم إبراهيم"
                        : "Portrait of Kareem Ibrahem"
                    }
                    fill
                    sizes="(max-width: 1024px) 85vw, 360px"
                    className="object-cover object-top"
                    priority
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-fg/10" />
              </div>

              {/* Location badge */}
              <div className="absolute -bottom-5 start-5 inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-sm font-medium text-fg shadow-lg">
                <MapPin className="size-4 text-accent" aria-hidden />
                {site.location}
                <span aria-hidden className="h-3.5 w-px bg-line" />
                <span className="text-fg-2">{isAr ? "مطور متكامل" : "Full-Stack"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom meta strip */}
        <div
          data-hero-fade
          className="mt-20 grid grid-cols-2 items-center gap-4 border-t border-line pt-6 text-fg-3 sm:grid-cols-3"
        >
          <span className={labelStyle}>{t.hero.stack}</span>
          <span className={`${labelStyle} hidden text-center sm:inline`}>
            {t.hero.scroll}
          </span>
          <span className={`${labelStyle} text-end`}>
            {isAr ? "منذ 2020" : "Est. 2020"}
          </span>
        </div>
      </div>
    </section>
  );
}