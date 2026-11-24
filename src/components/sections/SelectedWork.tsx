"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Container } from "@/components/ui/Container";
import { projects } from "@/data/projects";
import { useLocale } from "@/lib/i18n";

export function SelectedWork() {
  const { t } = useLocale();
  return (
    <section id="work" className="relative scroll-mt-20 py-24 sm:py-32" aria-labelledby="work-heading">
      <Container>
        <SectionHeading
          index="02"
          eyebrow={t.work.eyebrow}
          title={t.work.title}
          description={t.work.description}
        />

        <div className="flex flex-col gap-8 sm:gap-10">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} delay={i * 0.12} />
          ))}
        </div>
      </Container>
    </section>
  );
}
