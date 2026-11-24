export const site = {
  name: "Kareem Ibrahem",
  firstName: "Kareem",
  lastName: "Ibrahem",
  role: "Full-Stack Developer",
  location: "Egypt",
  email: "kareemelsha3sha3y@gmail.com",
  linkedin: "https://www.linkedin.com/in/kereemibrahem",
  github: "https://github.com/x1964",
  instagram: "https://www.instagram.com/kareem_ibrahem19",
  facebook: "https://www.facebook.com/kareem.ibrahim.408913/",
  cvPath: "/resume.pdf",
  description:
    "Full-stack developer building modern web applications, SaaS products, and AI-powered experiences.",
} as const;

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Contact", href: "#contact" },
] as const;

export const sectionIds = ["work", "about", "expertise", "contact"] as const;
