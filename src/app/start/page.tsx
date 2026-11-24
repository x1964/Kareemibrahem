import type { Metadata } from "next";
import { StartExperience } from "@/components/sections/StartExperience";

export const metadata: Metadata = {
  title: "Start a project",
  description:
    "Tell me about your project — a few quick questions and I'll get back to you with the right approach.",
  alternates: { canonical: "/start" },
};

export default function StartPage() {
  return <StartExperience />;
}
