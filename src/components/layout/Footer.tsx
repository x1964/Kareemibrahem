"use client";

import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { site, navLinks } from "@/lib/site";
import { scrollToHash } from "@/lib/scroll";
import { projects } from "@/data/projects";
import { FacebookIcon, GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { Container } from "@/components/ui/Container";
import { CurrentYear } from "@/components/ui/CurrentYear";
import { useLocale } from "@/lib/i18n";

export function Footer() {
  const { locale, t } = useLocale();
  const isAr = locale === "ar";
  return (
    <footer className="border-t border-line bg-ink-2">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-fg-3">
              {isAr ? "ملف الأعمال" : "Portfolio"}
            </p>
            <p className="mt-3 font-display text-4xl font-medium leading-none tracking-tight text-fg sm:text-5xl">
              {locale === "ar" ? (
                <>
                  كريم <span className="text-accent">إبراهيم</span>
                </>
              ) : (
                <>
                  KAREEM<span className="text-accent">.</span>IBRAHEM
                </>
              )}
            </p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-fg-2">
              {site.description}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="inline-flex size-10 items-center justify-center rounded-full border border-line text-fg-2 transition-colors hover:border-accent hover:text-accent"
              >
                <GithubIcon className="size-4" />
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="inline-flex size-10 items-center justify-center rounded-full border border-line text-fg-2 transition-colors hover:border-accent hover:text-accent"
              >
                <LinkedinIcon className="size-4" />
              </a>
              <a
                href={`mailto:${site.email}`}
                aria-label="Send email"
                className="inline-flex size-10 items-center justify-center rounded-full border border-line text-fg-2 transition-colors hover:border-accent hover:text-accent"
              >
                <ArrowUpRight className="size-4" />
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram profile"
                className="inline-flex size-10 items-center justify-center rounded-full border border-line text-fg-2 transition-colors hover:border-accent hover:text-accent"
              >
                <InstagramIcon className="size-4" />
              </a>
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook profile"
                className="inline-flex size-10 items-center justify-center rounded-full border border-line text-fg-2 transition-colors hover:border-accent hover:text-accent"
              >
                <FacebookIcon className="size-4" />
              </a>
            </div>
          </div>

          <nav aria-label="Footer">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-fg-3">{t.footer.navigate}</p>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link, i) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-fg-2 transition-colors hover:text-accent"
                  >
                    {[t.nav.work, t.nav.about, t.nav.expertise, t.nav.contact][i]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Projects">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-fg-3">
              {t.footer.work}
            </p>
            <ul className="mt-5 space-y-3">
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="text-sm text-fg-2 transition-colors hover:text-accent"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-fg-3">{t.footer.contact}</p>
            <ul className="mt-5 space-y-3 text-sm text-fg-2">
              <li>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-accent">
                  {site.email}
                </a>
              </li>
              <li>{site.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
          <p className="font-mono text-[11px] text-fg-3">
            © <CurrentYear /> {site.name}. {t.footer.rights}
          </p>
          <button
            type="button"
            onClick={() => scrollToHash("#top")}
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-fg-3 transition-colors hover:text-accent"
          >
            {t.footer.top}
            <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-1" />
          </button>
        </div>

        {/* Giant signature wordmark */}
        <div
          className="pointer-events-none mt-16 select-none overflow-hidden sm:mt-20"
          aria-hidden="true"
        >
          <p className="footer-wordmark text-center font-display text-[18vw] font-medium leading-[0.95] tracking-[-0.02em] sm:text-[15vw] lg:text-[10rem]">
            {isAr ? "كريم إبراهيم" : "KAREEM IBRAHEM"}
          </p>
        </div>
      </Container>
    </footer>
  );
}
