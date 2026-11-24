"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Container } from "@/components/ui/Container";
import { projects } from "@/data/projects";
import { useLocale } from "@/lib/i18n";

export function SelectedWork() {
  const { t } = useLocale();
  const listRef = useRef<HTMLDivElement>(null);

  // Stacked-cards scroll effect: each card sticks below the navbar while the
  // next one slides over it, shrinking slightly — plus a subtle parallax on
  // the visual inside each card.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const scope = listRef.current;
      if (!scope) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-project-card]", scope);
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (next) {
          gsap.fromTo(
            card,
            { scale: 1 },
            {
              scale: 0.94,
              ease: "none",
              transformOrigin: "50% 0%",
              scrollTrigger: {
                trigger: next,
                start: "top bottom",
                end: "top 18%",
                scrub: 0.6,
              },
            }
          );
        }

        const visual = card.querySelector<HTMLElement>("[data-project-visual]");
        if (visual) {
          gsap.fromTo(
            visual,
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }
      });
    },
    { scope: listRef }
  );

  return (
    <section id="work" className="relative scroll-mt-20 py-24 sm:py-32" aria-labelledby="work-heading">
      <Container>
        <SectionHeading
          index="02"
          eyebrow={t.work.eyebrow}
          title={t.work.title}
          description={t.work.description}
        />

        <div ref={listRef} className="flex flex-col">
          {projects.map((project, i) => (
            <div
              key={project.slug}
              data-project-card
              className="sticky top-20 pb-8 sm:top-24 sm:pb-10"
            >
              <ProjectCard project={project} delay={i * 0.12} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
