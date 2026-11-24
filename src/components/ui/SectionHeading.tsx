import type { ReactNode } from "react";
import { clsx } from "clsx";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  className?: string;
};

export function SectionHeading({ index, eyebrow, title, description, className }: SectionHeadingProps) {
  return (
    <Reveal className={clsx("mb-14 sm:mb-20", className)}>
      <div className="flex items-baseline gap-4 border-b border-line pb-6">
        <span className="font-mono text-xs text-accent">{index}</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-fg-3">
          {eyebrow}
        </span>
      </div>
      <h2 className="mt-8 font-display text-4xl font-medium leading-[1.02] tracking-tight text-balance text-fg sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-2">{description}</p>
      ) : null}
    </Reveal>
  );
}
