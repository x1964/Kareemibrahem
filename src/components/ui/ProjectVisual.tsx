import { clsx } from "clsx";

type ProjectVisualProps = {
  name: string;
  accent: string;
  slug: string;
  className?: string;
  badge?: string;
};

/**
 * Abstract stand-in artwork for projects — a clean browser-window
 * skeleton, NOT an actual product screenshot.
 * Replace with real screenshots when available.
 */
export function ProjectVisual({ name, accent, slug, className, badge = "Visual placeholder" }: ProjectVisualProps) {
  return (
    <div
      className={clsx(
        "relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line bg-white",
        className
      )}
      dir="ltr"
      role="img"
      aria-label={`${name} — abstract placeholder visual, not a product screenshot`}
    >
      {/* Browser chrome */}
      <div className="absolute inset-x-0 top-0 z-10 flex h-10 items-center gap-2 border-b border-line bg-ink-2 px-4">
        <span className="size-2.5 rounded-full bg-[#FF5F57]" />
        <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="size-2.5 rounded-full bg-[#28C840]" />
        <span className="ms-4 h-5 flex-1 max-w-[240px] rounded-full border border-line bg-white px-3 font-mono text-[9px] leading-5 text-fg-3">
          {slug}.vercel.app
        </span>
      </div>

      {/* Skeleton page content */}
      <div className="absolute inset-0 pt-10">
        {/* Mini nav */}
        <div className="flex items-center justify-between border-b border-line px-6 py-3">
          <div className="h-2.5 w-16 rounded-full bg-fg/70" />
          <div className="flex gap-3">
            <div className="h-2 w-10 rounded-full bg-fg-3/50" />
            <div className="h-2 w-10 rounded-full bg-fg-3/50" />
            <div className="h-2 w-10 rounded-full bg-fg-3/50" />
          </div>
          <div className="h-5 w-14 rounded-full" style={{ background: accent }} />
        </div>

        {/* Hero block */}
        <div className="px-6 pt-8">
          <div className="h-3 w-24 rounded-full" style={{ background: accent }} />
          <div className="mt-3 h-5 w-4/5 rounded-full bg-fg/80" />
          <div className="mt-2 h-5 w-3/5 rounded-full bg-fg/80" />
          <div className="mt-2 h-5 w-2/5 rounded-full bg-fg-3/60" />
          <div className="mt-5 flex gap-3">
            <div className="h-8 w-28 rounded-full" style={{ background: accent }} />
            <div className="h-8 w-24 rounded-full border border-line" />
          </div>
        </div>

        {/* Card row */}
        <div className="grid grid-cols-3 gap-4 px-6 pt-8">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-xl border border-line bg-ink-2 p-3">
              <div className="h-16 rounded-lg bg-fg-3/25" />
              <div className="mt-3 h-2 w-3/4 rounded-full bg-fg-3/50" />
              <div className="mt-2 h-2 w-1/2 rounded-full bg-fg-3/35" />
            </div>
          ))}
        </div>
      </div>

      {/* Placeholder label — intentionally explicit */}
      <div className="absolute bottom-3 right-3 z-10 rounded-full border border-line bg-white/90 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-fg-3 backdrop-blur-sm">
        {badge}
      </div>
    </div>
  );
}
