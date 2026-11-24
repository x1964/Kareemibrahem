export type ProjectStatus = "Live" | "Beta" | "Early Access";

export type ProjectBlock = {
  heading: string;
  body: string;
};

export type Project = {
  slug: string;
  index: string;
  name: string;
  tagline: string;
  description: string;
  status: ProjectStatus;
  website?: string;
  github?: string;
  tech: string[];
  features: string[];
  /** Per-project accent used only inside placeholder visuals. */
  accent: string;
  overview: ProjectBlock[];
  problem: ProjectBlock[];
  objectives: string[];
  responsibilities: string[];
};

export const projects: Project[] = [
  {
    slug: "narqa-academy",
    index: "01",
    name: "Narqa Academy",
    tagline: "A bilingual educational platform, built end-to-end for a client.",
    description:
      "A bilingual educational platform developed for a client — independently designed, built, and deployed in approximately 2.5 weeks.",
    status: "Live",
    website: "https://narqaacademy.com/",
    tech: ["Next.js", "React", "TypeScript", "Supabase"],
    features: [
      "Authentication and role-based access",
      "Course listings and detailed course pages",
      "Educational content library",
      "Blog",
      "Full Arabic and English support",
      "Administration dashboard",
      "Educational games section",
      "Meeting feature connecting students and teachers",
    ],
    accent: "#C5FF4A",
    overview: [
      {
        heading: "Overview",
        body: "Narqa Academy is a bilingual educational platform built for a client who needed a complete online learning presence — courses, content, community, and administration — delivered quickly and professionally.",
      },
      {
        heading: "Delivery",
        body: "I independently designed, developed, and deployed the entire platform in approximately 2.5 weeks, working across the full stack from the database schema to the final deployment.",
      },
    ],
    problem: [
      {
        heading: "The challenge",
        body: "The client needed a production-ready learning platform with real authentication, structured course content, and a polished public experience — in both Arabic and English — on a tight timeline.",
      },
      {
        heading: "Constraints",
        body: "Everything had to be delivered as a single coherent product: database design, authentication, bilingual routing, an admin dashboard for managing content, and a student-facing experience that felt premium rather than templated.",
      },
    ],
    objectives: [
      "Ship a complete, production-ready learning platform in roughly 2.5 weeks",
      "Support the platform fully in both Arabic and English",
      "Give administrators full control over courses, content, and the blog",
      "Connect students and teachers through a built-in meeting feature",
    ],
    responsibilities: [
      "Full product architecture and database schema design on Supabase",
      "Authentication and role-based access control",
      "Bilingual (Arabic/RTL + English) implementation across the app",
      "Course system: listings, details, and content delivery",
      "Blog and educational content library",
      "Administration dashboard for content management",
      "Educational games section",
      "Student–teacher meeting feature",
      "Deployment and production launch",
    ],
  },
  {
    slug: "edumind",
    index: "02",
    name: "EduMind",
    tagline: "An AI-powered study companion that learns from your own materials.",
    description:
      "An AI-powered educational platform that helps students learn directly from their own study materials — currently in beta.",
    status: "Beta",
    website: "https://edumindapp.vercel.app/",
    tech: ["Next.js", "React", "TypeScript", "Supabase", "Gemini API"],
    features: [
      "Document uploads",
      "AI-generated explanations",
      "Summaries",
      "Quizzes",
      "Mind maps",
      "Personalized learning experiences",
    ],
    accent: "#7DD3FC",
    overview: [
      {
        heading: "Overview",
        body: "EduMind is an AI-powered educational platform that lets students upload their own study materials and turn them into explanations, summaries, quizzes, and mind maps — a personalized learning experience generated from their actual coursework.",
      },
      {
        heading: "Status",
        body: "The product is currently in beta and under active development.",
      },
    ],
    problem: [
      {
        heading: "The problem",
        body: "Students have piles of PDFs, notes, and slides but generic AI tools don't understand their specific material. Turning dense documents into something studyable — explanations, quizzes, visual maps — is tedious and time-consuming.",
      },
      {
        heading: "The idea",
        body: "Upload your own study material and let AI generate a personalized learning layer on top of it: explanations in plain language, concise summaries, self-testing quizzes, and visual mind maps.",
      },
    ],
    objectives: [
      "Let students upload study documents and get AI-powered learning artifacts",
      "Generate explanations, summaries, quizzes, and mind maps from uploaded content",
      "Persist user materials and generated content securely",
      "Deliver a focused, distraction-free study experience",
    ],
    responsibilities: [
      "Product design and full-stack development",
      "Document upload and storage pipeline with Supabase",
      "Integration with the Gemini API for content generation",
      "Quiz, summary, and mind map generation flows",
      "Database schema and user data management",
    ],
  },
  {
    slug: "tribbly",
    index: "03",
    name: "Tribblly",
    tagline: "Discover people and build real-world communities around shared interests.",
    description:
      "An interest-based platform designed to help people discover others and build real-world communities — now in early access.",
    status: "Early Access",
    website: "https://triblly.vercel.app/",
    github: "https://github.com/x1964/appTribly",
    tech: ["Next.js", "React", "Supabase", "PostgreSQL"],
    features: [
      "Interest-based community discovery",
      "Profiles and interest matching",
      "Community spaces",
      "Real-world meetups oriented around shared interests",
    ],
    accent: "#F0ABFC",
    overview: [
      {
        heading: "Overview",
        body: "Tribblly is an interest-based platform designed to help people discover others who share their passions and turn online interest into real-world community.",
      },
      {
        heading: "Status",
        body: "The product is in early access and evolving based on early usage.",
      },
    ],
    problem: [
      {
        heading: "The problem",
        body: "Interest-based communities online are often noisy and shallow — hard to find people nearby who genuinely share a hobby, and harder still to turn that into real-world connection.",
      },
      {
        heading: "The idea",
        body: "A platform centered on interests rather than followers: discover people and communities around what you actually care about, with the goal of enabling real-world meetups.",
      },
    ],
    objectives: [
      "Make interest-based discovery the core of the product",
      "Let users build profiles around their interests",
      "Support community spaces around shared passions",
      "Lay the foundation for real-world meetup features",
    ],
    responsibilities: [
      "Product design and full-stack development",
      "Database design on Supabase with PostgreSQL",
      "Interest and matching data modeling",
      "Community and profile features",
      "Open-source codebase on GitHub",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return {
    prev: projects[(i - 1 + projects.length) % projects.length],
    next: projects[(i + 1) % projects.length],
  };
}
