import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, getAdjacentProjects, projects } from "@/data/projects";
import { ProjectArticle } from "@/components/projects/ProjectArticle";
import { site } from "@/lib/site";

export const instant = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} — Case Study`,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.name} — ${site.name}`,
      description: project.description,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);

  return <ProjectArticle project={project} prev={prev} next={next} />;
}
