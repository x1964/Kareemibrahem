"use client";

import {
  AppWindow,
  Database,
  Server,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { skillCategories } from "@/data/skills";
import { useLocale } from "@/lib/i18n";

const categoryIcons: LucideIcon[] = [AppWindow, Server, Database, Wrench, Sparkles];

const categoryNames = {
  en: ["Frontend", "Backend", "Database", "Tools", "Additional"],
  ar: ["واجهة المستخدم", "الخادم", "قواعد البيانات", "الأدوات", "مهارات إضافية"],
} as const;

export function Expertise() {
  const { locale, t } = useLocale();
  const names = categoryNames[locale];
  const isAr = locale === "ar";
  const labelCls = isAr
    ? "text-sm font-medium"
    : "font-mono text-[10px] uppercase tracking-[0.2em]";

  return (
    <section
      id="expertise"
      className="relative scroll-mt-20 border-y border-line bg-ink-2 py-24 sm:py-32"
      aria-labelledby="expertise-heading"
    >
      <Container>
        <SectionHeading
          index="03"
          eyebrow={t.expertise.eyebrow}
          title={t.expertise.title}
          description={t.expertise.description}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, i) => {
            const Icon = categoryIcons[i];
            return (
              <Reveal key={cat.title} delay={i * 0.07} className={i === 4 ? "sm:col-span-2 lg:col-span-1" : undefined}>
                <div className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_20px_50px_-28px_rgba(20,92,255,0.35)]">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-[10px] text-fg-3">{cat.index}</span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-medium tracking-tight text-fg">
                    {names[i]}
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-line bg-ink-2 px-3 py-1.5 font-mono text-[11px] text-fg-2 transition-colors group-hover:border-accent/30"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.15}>
          <p className={`${labelCls} mt-8 max-w-2xl leading-relaxed text-fg-3`}>
            {t.expertise.note}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
