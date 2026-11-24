"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { ScrollTrigger } from "@/lib/gsap";

export type Locale = "en" | "ar";

type Dictionary = {
  nav: { work: string; about: string; expertise: string; contact: string };
  hero: {
    volume: string;
    intro: string;
    lines: string[];
    description: string;
    work: string;
    talk: string;
    cv: string;
    badge: string;
    available: string;
    stack: string;
    scroll: string;
  };
  about: {
    eyebrow: string;
    title: ReactNode;
    paragraphs: string[];
    facts: { location: string; focus: string; education: string; languages: string };
    values: string[];
    quote: string;
  };
  work: { eyebrow: string; title: ReactNode; description: string; study: string; view: string };
  expertise: { eyebrow: string; title: ReactNode; description: string; note: string };
  journey: { eyebrow: string; title: ReactNode };
  contact: {
    eyebrow: string;
    title: ReactNode;
    elsewhere: string;
    openTo: string;
    openText: string;
    send: string;
    email: string;
    copy: string;
    copied: string;
  };
  footer: {
    navigate: string;
    work: string;
    contact: string;
    rights: string;
    top: string;
  };
  form: {
    name: string;
    namePlaceholder: string;
    email: string;
    message: string;
    messagePlaceholder: string;
    send: string;
    sending: string;
    sent: string;
    mailto: string;
    required: string;
    invalidEmail: string;
    failed: string;
    delivered: string;
    fallback: string;
    preferEmail: string;
  };
  project: {
    back: string;
    visit: string;
    stack: string;
    status: string;
    builtBy: string;
    objectives: string;
    responsibilities: string;
    features: string;
    previous: string;
    next: string;
    placeholder: string;
  };
  notFound: { code: string; title: string; body: string; back: string };
  toggle: string;
};

const en: Dictionary = {
  nav: { work: "Work", about: "About", expertise: "Expertise", contact: "Contact" },
  hero: {
    volume: "Portfolio — Vol. 01",
    intro: "Full-Stack Developer",
    lines: ["I build digital products", "that turn ideas", "into reality."],
    description: "Self-taught developer focused on modern web applications, thoughtful digital experiences, and AI-powered products.",
    work: "Explore Selected Work",
    talk: "Let's Talk",
    cv: "CV",
    badge: "Open to opportunities · Let's talk ·",
    available: "Available for new projects",
    stack: "Full-stack · Product · AI experiences",
    scroll: "Scroll to explore",
  },
  about: {
    eyebrow: "About",
    title: <>Self-taught, <span className="text-accent">product-minded</span>,<br className="hidden sm:block" /> always building.</>,
    paragraphs: [
      "I'm Kareem — a self-taught developer who has been building web applications since 2020. I learned by doing: shipping real products, breaking things, fixing them, and iterating until they worked.",
      "That path led me to full-stack engineering — designing databases, building APIs, and crafting interfaces that feel considered. I care about the whole product, not just the code: how it loads, how it reads, and whether it solves the problem.",
      "Recently that has meant AI-powered products — taking models like Gemini and turning them into study tools people can actually use. I continuously improve my technical depth while keeping a bias toward shipping.",
    ],
    facts: { location: "Location", focus: "Focus", education: "Education", languages: "Languages" },
    values: ["Egypt", "Full-stack web products", "Secondary school — class of 2028", "Arabic native · English B2"],
    quote: "The best way to learn is to build something real.",
  },
  work: {
    eyebrow: "Selected Work",
    title: <>Products I&apos;ve <span className="text-accent">designed</span> &amp; <span className="text-accent">built</span>.</>,
    description: "A selection of projects spanning client work, AI-powered products, and community platforms — each taken from idea to deployed product.",
    study: "Case study",
    view: "View project",
  },
  expertise: {
    eyebrow: "Technical Expertise",
    title: <>The tools I reach for, <span className="text-accent">and why.</span></>,
    description: "A practical stack refined through shipped products — deep enough to own a feature end-to-end, broad enough to choose the right tool.",
    note: "* Proficiency reflects hands-on product work — this is a working stack, not a list of every technology I've touched.",
  },
  journey: { eyebrow: "Journey & Education", title: <>How I got <span className="text-accent">here.</span></> },
  contact: {
    eyebrow: "Contact",
    title: <>Have an idea?<br /><span className="text-accent">Let&apos;s build it.</span></>,
    elsewhere: "Elsewhere",
    openTo: "Currently open to",
    openText: "Freelance projects, software engineering internships, and interesting collaborations.",
    send: "Send a message",
    email: "Email",
    copy: "Copy",
    copied: "Copied",
  },
  footer: { navigate: "Navigate", work: "Selected Work", contact: "Contact", rights: "All rights reserved.", top: "Back to top" },
  form: {
    name: "Name", namePlaceholder: "Your name", email: "Email", message: "Message",
    messagePlaceholder: "Tell me about the project, role, or opportunity…", send: "Send message",
    sending: "Sending…", sent: "Message sent — I'll reply soon.", mailto: "Your email client should open now.",
    required: "Please fill in all fields.", invalidEmail: "Please enter a valid email address.",
    failed: "Something went wrong. Please email me directly instead.", delivered: "Messages are delivered directly to my inbox.",
    fallback: "Email delivery isn't configured on this deployment — the form opens your email client instead.",
    preferEmail: "Prefer email?",
  },
  project: {
    back: "All work",
    visit: "Visit website",
    stack: "Stack",
    status: "Status",
    builtBy: "Built by",
    objectives: "Objectives",
    responsibilities: "My responsibilities",
    features: "Features",
    previous: "Previous",
    next: "Next",
    placeholder: "Placeholder visuals — replace with real screenshots when available.",
  },
  notFound: {
    code: "404",
    title: "This page doesn't exist.",
    body: "The link may be broken, or the page may have moved.",
    back: "Back to home",
  },
  toggle: "العربية",
};

const ar: Dictionary = {
  nav: { work: "الأعمال", about: "نبذة", expertise: "مهاراتي", contact: "تواصل" },
  hero: {
    volume: "ملف الأعمال — الإصدار ٠١",
    intro: "مطور واجهات خلفية وأمامية",
    lines: ["أبني منتجات رقمية", "تحوّل الأفكار", "إلى واقع."],
    description: "مطور تعلّمت العمل ذاتيًا، أركّز على بناء تطبيقات ويب حديثة وتجارب رقمية مدروسة ومنتجات مدعومة بالذكاء الاصطناعي.",
    work: "استكشف أعمالي",
    talk: "لنتحدث",
    cv: "السيرة",
    badge: "مستعد لفرص جديدة · لنتحدث ·",
    available: "متاح لمشاريع جديدة",
    stack: "تطوير متكامل · منتجات · ذكاء اصطناعي",
    scroll: "مرر للاستكشاف",
  },
  about: {
    eyebrow: "نبذة عني",
    title: <>مطور ذاتي، <span className="text-accent">تفكير منتجي</span>,<br className="hidden sm:block" /> وشغف دائم بالبناء.</>,
    paragraphs: [
      "أنا كريم، مطور تعلّمت العمل ذاتيًا وأبني تطبيقات الويب منذ عام 2020. تعلّمت بالممارسة: إطلاق منتجات حقيقية، تجربة الأخطاء، إصلاحها، والتحسين حتى تصبح جاهزة للاستخدام.",
      "قادني هذا الطريق إلى هندسة التطوير المتكامل، من تصميم قواعد البيانات وبناء واجهات APIs إلى صياغة تجربة مستخدم مدروسة. أهتم بالمنتج كاملًا، ليس بالكود فقط: سرعته، وضوحه، وقدرته على حل المشكلة.",
      "تطورت رحلتي مؤخرًا نحو المنتجات المدعومة بالذكاء الاصطناعي، وتحويل نماذج مثل Gemini إلى أدوات تعلم حقيقية. أواصل تطوير مهاراتي التقنية مع الحفاظ على عقلية التقدّم والإنجاز.",
    ],
    facts: { location: "الموقع", focus: "التخصص", education: "التعليم", languages: "اللغات" },
    values: ["مصر", "منتجات ويب متكاملة", "التعليم الثانوي — دفعة 2028", "العربية لغة أم · الإنجليزية B2"],
    quote: "أفضل طريقة للتعلّم هي بناء شيء حقيقي.",
  },
  work: {
    eyebrow: "أعمال مختارة",
    title: <>منتجات <span className="text-accent">صممتها</span> و<span className="text-accent">طورتها</span>.</>,
    description: "مجموعة من المشاريع في عملاء حقيقيين ومنتجات ذكاء اصطناعي ومنصات مجتمعية، بدأت من الفكرة ووصلت إلى إطلاق كامل.",
    study: "دراسة حالة",
    view: "عرض المشروع",
  },
  expertise: {
    eyebrow: "الخبرات التقنية",
    title: <>الأدوات التي أستخدمها، <span className="text-accent">ولماذا؟</span></>,
    description: "مكدس تقني عملي صقلته مشروعات حقيقية؛ واسع بما يكفي لاختيار الأدوات المناسبة، وعميق بما يكفي لإدارة الميزة كاملًا.",
    note: "* تعكس الخبرات العمل العملي على المنتجات، وليست قائمة بكل التقنيات التي جرّبتها.",
  },
  journey: { eyebrow: "الرحلة والتعليم", title: <>كيف وصلت إلى <span className="text-accent">هنا.</span></> },
  contact: {
    eyebrow: "تواصل معي",
    title: <>هل لديك فكرة؟<br /><span className="text-accent">لنحوّلها إلى واقع.</span></>,
    elsewhere: "روابط أخرى",
    openTo: "متاح حاليًا لـ",
    openText: "مشروعات الفريلانس، وتدريبات هندسة البرمجيات، والتعاونات المثيرة للاهتمام.",
    send: "أرسل رسالة",
    email: "البريد الإلكتروني",
    copy: "نسخ",
    copied: "تم النسخ",
  },
  footer: { navigate: "التنقل", work: "أعمال مختارة", contact: "تواصل", rights: "جميع الحقوق محفوظة.", top: "العودة للأعلى" },
  form: {
    name: "الاسم", namePlaceholder: "اسمك", email: "البريد الإلكتروني", message: "الرسالة",
    messagePlaceholder: "اخبرني عن المشروع أو الفرصة…", send: "إرسال الرسالة",
    sending: "جارٍ الإرسال…", sent: "تم إرسال الرسالة — سأرد قريبًا.", mailto: "سيتم فتح تطبيق البريد الآن.",
    required: "يرجى تعبئة جميع الحقول.", invalidEmail: "يرجى إدخال بريد إلكتروني صحيح.",
    failed: "حدث خطأ ما. يرجى مراسلتي عبر البريد مباشرة.", delivered: "يتم تسليم الرسائل مباشرة إلى بريدي.",
    fallback: "خدمة البريد غير مفعّلة في هذا النشر — سيقوم النموذج بفتح تطبيق البريد لديك.",
    preferEmail: "تفضل البريد؟",
  },
  project: {
    back: "كل الأعمال",
    visit: "زيارة الموقع",
    stack: "التقنيات",
    status: "الحالة",
    builtBy: "بواسطة",
    objectives: "الأهداف",
    responsibilities: "مسؤولياتي",
    features: "المميزات",
    previous: "السابق",
    next: "التالي",
    placeholder: "صور توضيحية مؤقتة — تُستبدل بلقطات حقيقية عند توفرها.",
  },
  notFound: {
    code: "٤٠٤",
    title: "الصفحة غير موجودة.",
    body: "قد يكون الرابط غير صحيح أو أن الصفحة انتقلت.",
    back: "العودة للرئيسية",
  },
  toggle: "English",
};

const DictionaryContext = createContext<{ locale: Locale; t: Dictionary; setLocale: (locale: Locale) => void } | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ar");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = window.localStorage.getItem("portfolio-locale");
      if (saved === "en" || saved === "ar") setLocaleState(saved);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    window.localStorage.setItem("portfolio-locale", locale);

    // Locale swap changes fonts, direction, and layout — recalculate
    // scroll-trigger positions once rendering settles.
    const raf = requestAnimationFrame(() => {
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    });
    return () => cancelAnimationFrame(raf);
  }, [locale]);

  function setLocale(value: Locale) {
    setLocaleState(value);
  }

  return (
    <DictionaryContext.Provider value={{ locale, t: locale === "ar" ? ar : en, setLocale }}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(DictionaryContext);
  if (!context) throw new Error("useLocale must be used within LocaleProvider");
  return context;
}
