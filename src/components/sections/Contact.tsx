"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Copy, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "./ContactForm";
import { FacebookIcon, GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { site } from "@/lib/site";
import { useLocale } from "@/lib/i18n";
import { clsx } from "clsx";

export function Contact() {
  const { locale, t } = useLocale();
  const emailServiceEnabled = Boolean(process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY);
  const [copied, setCopied] = useState(false);
  const isAr = locale === "ar";

  const labelCls = isAr
    ? "text-sm font-medium"
    : "font-mono text-[10px] uppercase tracking-[0.25em]";

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — the mailto link remains the fallback.
    }
  }

  return (
    <section
      id="contact"
      className="relative scroll-mt-20 border-t border-line py-24 sm:py-32"
      aria-labelledby="contact-heading"
    >
      <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
      <Container className="relative">
        <SectionHeading
          index="05"
          eyebrow={t.contact.eyebrow}
          title={t.contact.title}
        />

        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div className="flex flex-col gap-10">
            {/* Direct email */}
            <Reveal>
              <div>
                <p className={clsx(labelCls, "text-fg-3")}>{t.contact.email}</p>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-4">
                  <a
                    href={`mailto:${site.email}`}
                    className="group inline-flex items-center gap-3 break-all font-display text-2xl font-medium tracking-tight text-fg transition-colors hover:text-accent sm:text-3xl"
                  >
                    {site.email}
                    <ArrowUpRight className="size-6 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className={clsx(
                      "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                      copied
                        ? "border-accent/50 bg-accent/10 text-accent"
                        : "border-line bg-surface text-fg-2 hover:border-accent hover:text-accent"
                    )}
                    aria-live="polite"
                  >
                    {copied ? (
                      <Check className="size-4" aria-hidden="true" />
                    ) : (
                      <Copy className="size-4" aria-hidden="true" />
                    )}
                    {copied ? t.contact.copied : t.contact.copy}
                  </button>
                </div>
              </div>
            </Reveal>

            {/* Social links */}
            <Reveal delay={0.1}>
              <div>
                <p className={clsx(labelCls, "text-fg-3")}>{t.contact.elsewhere}</p>
                <ul className="mt-4 flex flex-wrap gap-3">
                  <li>
                    <a
                      href={site.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium text-fg-2 transition-all hover:border-accent/60 hover:text-fg hover:shadow-[0_10px_30px_-16px_rgba(20,92,255,0.4)]"
                    >
                      <LinkedinIcon className="size-4 text-fg-3 transition-colors group-hover:text-accent" />
                      LinkedIn
                      <ArrowUpRight className="size-3.5 text-fg-3 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent rtl:group-hover:-translate-x-0.5" />
                    </a>
                  </li>
                  <li>
                    <a
                      href={site.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium text-fg-2 transition-all hover:border-accent/60 hover:text-fg hover:shadow-[0_10px_30px_-16px_rgba(20,92,255,0.4)]"
                    >
                      <GithubIcon className="size-4 text-fg-3 transition-colors group-hover:text-accent" />
                      GitHub
                      <ArrowUpRight className="size-3.5 text-fg-3 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent rtl:group-hover:-translate-x-0.5" />
                    </a>
                  </li>
                  <li>
                    <a
                      href={site.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium text-fg-2 transition-all hover:border-accent/60 hover:text-fg hover:shadow-[0_10px_30px_-16px_rgba(20,92,255,0.4)]"
                    >
                      <InstagramIcon className="size-4 text-fg-3 transition-colors group-hover:text-accent" />
                      Instagram
                      <ArrowUpRight className="size-3.5 text-fg-3 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent rtl:group-hover:-translate-x-0.5" />
                    </a>
                  </li>
                  <li>
                    <a
                      href={site.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium text-fg-2 transition-all hover:border-accent/60 hover:text-fg hover:shadow-[0_10px_30px_-16px_rgba(20,92,255,0.4)]"
                    >
                      <FacebookIcon className="size-4 text-fg-3 transition-colors group-hover:text-accent" />
                      Facebook
                      <ArrowUpRight className="size-3.5 text-fg-3 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent rtl:group-hover:-translate-x-0.5" />
                    </a>
                  </li>
                </ul>
              </div>
            </Reveal>

            {/* Open-to card */}
            <Reveal delay={0.2}>
              <div className="flex items-start gap-4 rounded-2xl border border-accent/20 bg-accent/[0.04] p-5">
                <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Sparkles className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <p className={clsx(labelCls, "text-accent")}>{t.contact.openTo}</p>
                  <p className="mt-2 text-sm leading-relaxed text-fg-2">
                    {t.contact.openText}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.15}>
            <div className="rounded-2xl border border-line bg-surface p-6 shadow-[0_24px_60px_-36px_rgba(12,18,34,0.25)] sm:p-8">
              <p className={clsx(labelCls, "mb-6 text-fg-3")}>
                {t.contact.send}
              </p>
              <ContactForm emailServiceEnabled={emailServiceEnabled} />
              <div className="mt-6 border-t border-line pt-5">
                <Link
                  href="/start"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-fg-2 transition-colors hover:text-accent"
                >
                  {isAr ? "أو املأ استبيان سريع عن مشروعك" : "Or take the quick project questionnaire"}
                  <ArrowRight className="size-4 transition-transform group-hover:-translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
