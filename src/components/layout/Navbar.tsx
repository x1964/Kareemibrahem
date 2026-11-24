"use client";

import { useEffect, useState } from "react";
import { useScroll, motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight, Download } from "lucide-react";
import { clsx } from "clsx";
import { navLinks, site, sectionIds } from "@/lib/site";
import { scrollToHash } from "@/lib/scroll";
import { Magnetic } from "@/components/ui/Magnetic";
import { useLocale } from "@/lib/i18n";

type ActiveSection = (typeof sectionIds)[number] | null;

export function Navbar() {
  const { locale, t, setLocale } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<ActiveSection>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // Hide on scroll down (past the hero), reveal on scroll up.
      setHidden(!open && y > 480 && y > last);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id as ActiveSection);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    setOpen(false);
    // Wait for the menu close transition before scrolling.
    setTimeout(() => scrollToHash(href), open ? 350 : 0);
  }

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent"
        style={{ scaleX: scrollYProgress }}
      />
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-50 transition-[transform,colors] duration-300",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
          scrolled || open
            ? "border-b border-line bg-ink/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav
          className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:h-[72px] lg:px-12"
          aria-label="Primary"
        >
          <a
            href="#top"
            onClick={(e) => handleNavClick(e, "#top")}
            className="font-display text-sm font-semibold tracking-[0.08em] text-fg focus-visible:outline-2 focus-visible:outline-accent"
          >
            {locale === "ar" ? (
              <>
                كريم <span className="text-accent">إبراهيم</span>
              </>
            ) : (
              <>
                KAREEM<span className="text-accent">.</span>IBRAHEM
              </>
            )}
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link, i) => {
              const labels = [t.nav.work, t.nav.about, t.nav.expertise, t.nav.contact];
              const isActive = active === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    aria-current={isActive ? "true" : undefined}
                    className={clsx(
                      "group relative text-sm font-medium transition-colors",
                      isActive ? "text-accent" : "text-fg-2 hover:text-fg"
                    )}
                  >
                    {labels[i]}
                    <span
                      className={clsx(
                        "absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-accent transition-all duration-300",
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setLocale(locale === "en" ? "ar" : "en")}
              className="inline-flex h-10 items-center justify-center rounded-full border border-line px-4 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-2 transition-colors hover:border-accent hover:text-accent"
              aria-label={locale === "en" ? "Switch to Arabic" : "Switch to English"}
            >
              {t.toggle}
            </button>
            <Magnetic>
              <a
                href={site.cvPath}
                download="Kareem-Ibrahem-CV.pdf"
                className="hidden items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover sm:inline-flex"
              >
                <Download className="size-3.5" aria-hidden="true" />
                {locale === "ar" ? "تحميل السيرة" : "Download CV"}
              </a>
            </Magnetic>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? (locale === "ar" ? "إغلاق القائمة" : "Close menu") : (locale === "ar" ? "فتح القائمة" : "Open menu")}
              className="inline-flex size-10 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-fg-3"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col justify-between overscroll-contain bg-ink-2 px-6 pb-10 pt-24 lg:hidden"
          >
            <nav aria-label="Mobile">
              <ul className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: locale === "ar" ? 24 : -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.4 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="group flex items-baseline gap-4 py-3"
                    >
                      <span className="font-mono text-xs text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-4xl font-medium tracking-tight text-fg transition-colors group-hover:text-accent">
                        {[t.nav.work, t.nav.about, t.nav.expertise, t.nav.contact][i]}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex flex-col gap-4"
            >
              <a
                href={site.cvPath}
                download="Kareem-Ibrahem-CV.pdf"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-medium text-white"
              >
                <Download className="size-4" aria-hidden="true" />
                {locale === "ar" ? "تحميل السيرة" : "Download CV"}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-5 py-3.5 text-sm font-medium text-fg"
              >
                {site.email}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
