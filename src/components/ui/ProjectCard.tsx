"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { projectsAr } from "@/data/projects.ar";
import { ProjectVisual } from "./ProjectVisual";
import { Reveal } from "./Reveal";
import { clsx } from "clsx";
import { useLocale } from "@/lib/i18n";

const statusStyles: Record<Project["status"], string> = {
  Live: "border-accent/50 bg-accent/10 text-accent-hover",
  Beta: "border-sky-600/30 bg-sky-600/5 text-sky-700",
  "Early Access": "border-fuchsia-600/30 bg-fuchsia-600/5 text-fuchsia-700",
};

export function ProjectCard({ project, delay = 0 }: { project: Project; delay?: number }) {
  const { locale, t } = useLocale();
  const tr = locale === "ar" ? projectsAr[project.slug] : undefined;
  const statusLabels: Record<Project["status"], string> = locale === "ar"
    ? { Live: "مباشر", Beta: "تجريبي", "Early Access": "وصول مبكر" }
    : { Live: "Live", Beta: "Beta", "Early Access": "Early Access" };

  return (
    <Reveal delay={delay}>
      <Link
        href={`/projects/${project.slug}`}
        className="group block overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:border-fg-3/60 hover:shadow-[0_24px_60px_-30px_rgba(12,18,34,0.3)]"
        aria-label={`${locale === "ar" ? "عرض دراسة حالة" : "View case study"}: ${project.name}`}
      >
        <div className="overflow-hidden p-3 pb-0 sm:p-4 sm:pb-0">
          <ProjectVisual
            name={project.name}
            accent={project.accent}
            slug={project.slug}
            badge={locale === "ar" ? "عنصر توضيحي" : "Visual placeholder"}
            className="transition-transform duration-700 ease-out group-hover:scale-[1.015]"
          />
        </div>

        <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-start sm:justify-between sm:p-7">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-fg-3">{project.index}</span>
              <span
                className={clsx(
                  "rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em]",
                  statusStyles[project.status]
                )}
              >
                {statusLabels[project.status]}
              </span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-fg transition-colors group-hover:text-accent sm:text-3xl">
              {project.name}
            </h3>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.15em] text-fg-3">
              {tr?.tagline ?? project.tagline}
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-fg-2">
              {tr?.description ?? project.description}
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-start gap-4 sm:items-end">
            <ul className="flex flex-wrap gap-1.5 sm:justify-end">
              {project.tech.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-line bg-ink-2 px-2.5 py-1 font-mono text-[10px] text-fg-2"
                >
                  {tech}
                </li>
              ))}
            </ul>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-fg-2 transition-colors group-hover:text-accent">
              {t.work.view}
              <span className="inline-flex size-8 items-center justify-center rounded-full border border-line transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
