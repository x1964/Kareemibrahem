import Link from "next/link";
import type { ReactNode } from "react";
import { clsx } from "clsx";

type ButtonVariant = "primary" | "ghost" | "outline";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-white hover:bg-accent-hover border border-accent",
  ghost: "bg-surface text-fg border border-line hover:border-fg-3 hover:bg-surface-hover",
  outline: "bg-transparent text-fg-2 border border-line hover:text-fg hover:border-fg-3",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

type ButtonProps = {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
  /** Render as a plain anchor opening in a new tab. */
  external?: boolean;
  /** Trigger a file download. */
  download?: boolean;
};

export function Button({
  href,
  variant = "primary",
  className,
  children,
  external,
  download,
}: ButtonProps) {
  const cls = clsx(base, variants[variant], className);

  if (external || download || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={cls}
        {...(external || href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        {...(download ? { download: true } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
