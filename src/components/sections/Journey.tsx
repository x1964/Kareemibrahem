"use client";

import { GraduationCap, Languages, Rocket, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { useLocale } from "@/lib/i18n";

export function Journey() {
  const { locale, t } = useLocale();
  const milestones = locale === "ar"
    ? [
        { icon: Sparkles, period: "2020", title: "البداية", body: "بدأت تعلّم تطوير الويب ذاتيًا: HTML وCSS وJavaScript، ثم توسّعت تدريجيًا في الأطر البرمجية والواجهات الخلفية." },
        { icon: Rocket, period: "الحالي", title: "إطلاق منتجات حقيقية", body: "نفّذت منصة Narqa Academy التعليمية ثنائية اللغة عميلًا، وأعمل حاليًا على EduMind للأدوات الذكية وTribblly للمجتمعات." },
        { icon: GraduationCap, period: "2028", title: "التعليم", body: "أدرس التعليم الثانوي العام في مصر، ومتوقع التخرج عام 2028. التعلّم الأساسي لدي قائم على البناء والتطبيق العملي." },
        { icon: Languages, period: "اللغات", title: "العربية · الإنجليزية", body: "العربية — لغة أم. الإنجليزية — مستوى B2، أستخدمها يوميًا في البرمجة والتوثيق والتعاون الدولي." },
      ]
    : [
        { icon: Sparkles, period: "2020", title: "The beginning", body: "Started teaching myself web development — HTML, CSS, JavaScript — by building small projects and gradually going deeper into frameworks and backends." },
        { icon: Rocket, period: "Present", title: "Shipping real products", body: "Delivered Narqa Academy — a full bilingual educational platform — for a client, and I'm now building EduMind (AI-powered study tools) and Tribblly (interest-based communities)." },
        { icon: GraduationCap, period: "2028", title: "Education", body: "General Secondary Education in Egypt, expected graduation 2028. My learning happens primarily through building." },
        { icon: Languages, period: "Languages", title: "Arabic · English", body: "Arabic — native. English — B2 (self-assessed), used daily for documentation, code, and international collaboration." },
      ];
  return (
    <section id="journey" className="scroll-mt-20 py-24 sm:py-32" aria-labelledby="journey-heading">
      <Container>
        <SectionHeading
          index="04"
          eyebrow={t.journey.eyebrow}
          title={t.journey.title}
        />

        <ol className="relative border-s border-line">
          {milestones.map((m, i) => (
            <li key={m.title} className="group relative pb-14 ps-8 last:pb-0 sm:ps-12">
              <span className="absolute -start-[5px] top-1.5 size-2.5 rounded-full border border-accent bg-ink transition-colors group-hover:bg-accent" />
              <Reveal delay={i * 0.12}>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  <m.icon className="size-5 text-accent" aria-hidden="true" />
                  <span className="font-mono text-xs text-accent">{m.period}</span>
                  <h3 className="font-display text-xl font-medium tracking-tight text-fg sm:text-2xl">
                    {m.title}
                  </h3>
                </div>
                <p className="mt-3 max-w-2xl leading-relaxed text-fg-2">{m.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
