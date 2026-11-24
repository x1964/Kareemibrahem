"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { projectsAr } from "@/data/projects.ar";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { site } from "@/lib/site";
import { useLocale } from "@/lib/i18n";
import { clsx } from "clsx";

const statusStyles: Record<Project["status"], string> = {
  Live: "border-accent/50 bg-accent/10 text-accent-hover",
  Beta: "border-sky-600/30 bg-sky-600/5 text-sky-700",
  "Early Access": "border-fuchsia-600/30 bg-fuchsia-600/5 text-fuchsia-700",
};

export function ProjectArticle({
  project,
  prev,
  next,
}: {
  project: Project;
  prev: Project;
  next: Project;
}) {
  const { locale, t } = useLocale();
  const isAr = locale === "ar";
  const tr = isAr ? projectsAr[project.slug] : undefined;

  const tagline = tr?.tagline ?? project.tagline;
  const description = tr?.description ?? project.description;
  const overview = tr?.overview ?? project.overview;
  const problem = tr?.problem ?? project.problem;
  const objectives = tr?.objectives ?? project.objectives;
  const responsibilities = tr?.responsibilities ?? project.responsibilities;
  const features = tr?.features ?? project.features;

  const statusLabels: Record<Project["status"], string> = isAr
    ? { Live: "مباشر", Beta: "تجريبي", "Early Access": "وصول مبكر" }
    : { Live: "Live", Beta: "Beta", "Early Access": "Early Access" };

  const labelCls = isAr
    ? "text-sm font-medium"
    : "font-mono text-[11px] uppercase tracking-[0.25em]";

  return (
    <article className="pt-16 lg:pt-[72px]">
      <Container className="py-14 sm:py-20">
        <Reveal>
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 text-sm font-medium text-fg-3 transition-colors hover:text-accent"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            {t.project.back}
          </Link>
        </Reveal>

        {/* Header */}
        <header className="mt-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-fg-3">{project.index}</span>
                <span
                  className={clsx(
                    "rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em]",
                    statusStyles[project.status]
                  )}
                >
                  {statusLabels[project.status]}
                </span>
              </div>
              <h1 className="mt-5 font-display text-5xl font-medium tracking-tight text-fg sm:text-6xl lg:text-7xl">
                {project.name}
              </h1>
              <p className="mt-4 max-w-xl text-lg font-normal text-fg-2 sm:text-xl">
                {tagline}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-3">
              {project.website && (
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
                >
                  {t.project.visit}
                  <ArrowUpRight className="size-4" />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 text-sm font-medium text-fg transition-colors hover:border-fg-3 hover:bg-surface-hover"
                >
                  <GithubIcon className="size-4" />
                  GitHub
                </a>
              )}
            </div>
          </Reveal>
        </header>

        {/* Meta strip */}
        <Reveal delay={0.15}>
          <dl className="mt-14 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-line bg-surface p-5">
              <dt className={clsx(labelCls, "text-fg-3")}>{t.project.stack}</dt>
              <dd className="mt-3 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-line bg-ink-2 px-2.5 py-1 font-mono text-[10px] text-fg-2"
                  >
                    {tech}
                  </span>
                ))}
              </dd>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-5">
              <dt className={clsx(labelCls, "text-fg-3")}>{t.project.status}</dt>
              <dd className="mt-3 text-sm text-fg">{statusLabels[project.status]}</dd>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-5">
              <dt className={clsx(labelCls, "text-fg-3")}>{t.project.builtBy}</dt>
              <dd className="mt-3 text-sm text-fg">
                {site.name} — {isAr ? "مطوّر متكامل" : site.role}
              </dd>
            </div>
          </dl>
        </Reveal>

        {/* Visual placeholders */}
        <Reveal delay={0.1} className="mt-14">
          <div className="grid gap-6 lg:grid-cols-2">
            <ProjectVisual
              name={project.name}
              accent={project.accent}
              slug={project.slug}
              badge={isAr ? "عنصر توضيحي" : "Visual placeholder"}
            />
            <ProjectVisual
              name={project.name}
              accent={project.accent}
              slug={`${project.slug}-alt`}
              badge={isAr ? "عنصر توضيحي" : "Visual placeholder"}
              className="hidden lg:block"
            />
          </div>
          <p className="mt-3 text-sm text-fg-3">{t.project.placeholder}</p>
        </Reveal>

        {/* Description */}
        <Reveal className="mt-14">
          <p className="max-w-3xl text-lg leading-relaxed text-fg">{description}</p>
        </Reveal>

        {/* Body */}
        <div className="mt-20 grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div className="space-y-14">
            {overview.map((block) => (
              <Reveal key={block.heading}>
                <section>
                  <h2 className={clsx(labelCls, "text-accent")}>{block.heading}</h2>
                  <p className="mt-4 text-lg leading-relaxed text-fg">{block.body}</p>
                </section>
              </Reveal>
            ))}

            {problem.map((block) => (
              <Reveal key={block.heading}>
                <section>
                  <h2 className={clsx(labelCls, "text-accent")}>{block.heading}</h2>
                  <p className="mt-4 leading-relaxed text-fg-2">{block.body}</p>
                </section>
              </Reveal>
            ))}
          </div>

          <div className="space-y-10">
            <Reveal>
              <section>
                <h2 className={clsx(labelCls, "text-fg-3")}>{t.project.objectives}</h2>
                <ul className="mt-4 space-y-3">
                  {objectives.map((o) => (
                    <li key={o} className="flex gap-3 text-sm leading-relaxed text-fg-2">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                      {o}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            <Reveal delay={0.08}>
              <section>
                <h2 className={clsx(labelCls, "text-fg-3")}>{t.project.responsibilities}</h2>
                <ul className="mt-4 space-y-3">
                  {responsibilities.map((r) => (
                    <li key={r} className="flex gap-3 text-sm leading-relaxed text-fg-2">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-fg-3" />
                      {r}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            <Reveal delay={0.16}>
              <section>
                <h2 className={clsx(labelCls, "text-fg-3")}>{t.project.features}</h2>
                <ul className="mt-4 space-y-3">
                  {features.map((f) => (
                    <li key={f} className="flex gap-3 text-sm leading-relaxed text-fg-2">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-fg-3" />
                      {f}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          </div>
        </div>

        {/* Prev / next */}
        <nav
          aria-label={isAr ? "المزيد من المشاريع" : "More projects"}
          className="mt-24 grid gap-4 sm:grid-cols-2"
        >
          <Link
            href={`/projects/${prev.slug}`}
            className="group rounded-2xl border border-line bg-surface p-6 transition-all hover:border-accent/50 hover:shadow-[0_16px_40px_-24px_rgba(20,92,255,0.25)] sm:p-8"
          >
            <span className="inline-flex items-center gap-2 text-sm text-fg-3">
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              {t.project.previous}
            </span>
            <span className="mt-3 block font-display text-2xl font-medium tracking-tight text-fg transition-colors group-hover:text-accent">
              {prev.name}
            </span>
          </Link>
          <Link
            href={`/projects/${next.slug}`}
            className="group rounded-2xl border border-line bg-surface p-6 text-right transition-all hover:border-accent/50 hover:shadow-[0_16px_40px_-24px_rgba(20,92,255,0.25)] sm:p-8"
          >
            <span className="inline-flex items-center gap-2 text-sm text-fg-3">
              {t.project.next}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
            </span>
            <span className="mt-3 block font-display text-2xl font-medium tracking-tight text-fg transition-colors group-hover:text-accent">
              {next.name}
            </span>
          </Link>
        </nav>
      </Container>
    </article>
  );
}
