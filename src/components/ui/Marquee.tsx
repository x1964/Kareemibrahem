const items = [
  "Next.js",
  "React",
  "TypeScript",
  "Supabase",
  "PostgreSQL",
  "Tailwind CSS",
  "Node.js",
  "Gemini API",
  "Git",
  "Vercel",
];

/** Infinite tech-stack marquee strip — pure CSS, pauses on hover. */
export function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-line bg-ink-2 py-5" dir="ltr">
      <div className="animate-marquee flex w-max items-center hover:[animation-play-state:paused]">
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-8 pe-8 font-mono text-[11px] uppercase tracking-[0.3em] text-fg-3"
          >
            {item}
            <span aria-hidden className="text-accent">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
