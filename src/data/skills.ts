export type SkillCategory = {
  index: string;
  title: string;
  note?: string;
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    index: "01",
    title: "Frontend",
    items: ["JavaScript", "TypeScript", "React", "Next.js", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    index: "02",
    title: "Backend",
    items: ["Node.js (via Next.js)", "PHP", "REST APIs", "Authentication"],
  },
  {
    index: "03",
    title: "Database",
    items: ["Supabase", "PostgreSQL", "MySQL", "SQL"],
  },
  {
    index: "04",
    title: "Tools",
    items: ["Git", "GitHub", "Vercel", "VS Code"],
  },
  {
    index: "05",
    title: "Additional",
    items: ["AI API Integration", "Application Security", "Automated Testing"],
  },
];
