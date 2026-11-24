"use client";

import { MapPin, Code2, GraduationCap, Languages } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { useLocale } from "@/lib/i18n";

export function About() {
  const { t } = useLocale();
  const facts = [
    { icon: MapPin, label: t.about.facts.location, value: t.about.values[0] },
    { icon: Code2, label: t.about.facts.focus, value: t.about.values[1] },
    { icon: GraduationCap, label: t.about.facts.education, value: t.about.values[2] },
    { icon: Languages, label: t.about.facts.languages, value: t.about.values[3] },
  ];
  return (
    <section id="about" className="relative scroll-mt-20 py-24 sm:py-32" aria-labelledby="about-heading">
      <Container>
        <SectionHeading index="01" eyebrow={t.about.eyebrow} title={t.about.title} />

        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div className="space-y-6">
            <Reveal>
              <p className="text-lg leading-relaxed text-fg sm:text-xl">
                {t.about.paragraphs[0]}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="leading-relaxed text-fg-2">
                {t.about.paragraphs[1]}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="leading-relaxed text-fg-2">
                {t.about.paragraphs[2]}
              </p>
            </Reveal>
          </div>

          <div>
            <Reveal delay={0.15} className="overflow-hidden rounded-2xl border border-line bg-surface">
              <dl className="divide-y divide-line">
                {facts.map((fact) => (
                  <div key={fact.label} className="flex items-center gap-4 px-5 py-4">
                    <fact.icon className="size-4 shrink-0 text-accent" aria-hidden="true" />
                    <dt className="w-24 shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-3">
                      {fact.label}
                    </dt>
                    <dd className="text-sm text-fg">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={0.25}>
              <blockquote className="mt-8 border-l-2 border-accent pl-5">
                <p className="font-display text-xl font-medium leading-snug text-fg">
                  &ldquo;{t.about.quote}&rdquo;
                </p>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
