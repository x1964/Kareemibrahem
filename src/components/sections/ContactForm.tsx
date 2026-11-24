"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Loader2, MailWarning, Send } from "lucide-react";
import { site } from "@/lib/site";
import { useLocale } from "@/lib/i18n";

type Status = "idle" | "sending" | "success" | "error" | "mailto";

const inputCls =
  "w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-fg placeholder:text-fg-3 transition-colors focus:border-accent focus:outline-none";

export function ContactForm({ emailServiceEnabled }: { emailServiceEnabled: boolean }) {
  const { t } = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      setStatus("error");
      setError(t.form.required);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setError(t.form.invalidEmail);
      return;
    }

    if (!emailServiceEnabled) {
      // Fallback: open the visitor's mail client with a prefilled message.
      const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setStatus("mailto");
      return;
    }

    setStatus("sending");
    setError("");
    try {
      const formData = new FormData();
      formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "");
      formData.append("subject", `Portfolio inquiry from ${name}`);
      formData.append("from_name", name);
      formData.append("email", email);
      formData.append("message", message);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = (await res.json().catch(() => null)) as { success?: boolean } | null;
      if (!res.ok || !data?.success) throw new Error("Request failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
      setError(t.form.failed);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-fg-3">
            {t.form.name}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder={t.form.namePlaceholder}
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-fg-3">
            {t.form.email}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            spellCheck={false}
            placeholder="you@example.com"
            className={inputCls}
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-fg-3">
          {t.form.message}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder={t.form.messagePlaceholder}
          className={`${inputCls} resize-y`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="size-4" aria-hidden="true" />
          )}
          {status === "sending" ? t.form.sending : t.form.send}
        </button>

        {status === "success" && (
          <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-accent" role="status">
            <Check className="size-4" aria-hidden="true" /> {t.form.sent}
          </p>
        )}
        {status === "mailto" && (
          <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-fg-2" role="status">
            <MailWarning className="size-4" aria-hidden="true" /> {t.form.mailto}
          </p>
        )}
        {status === "error" && (
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>

      <p className="mt-1 font-mono text-[10px] leading-relaxed text-fg-3">
        {emailServiceEnabled
          ? t.form.delivered
          : t.form.fallback}
      </p>

      <a
        href={`mailto:${site.email}`}
        className="group mt-2 inline-flex w-fit items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-3 transition-colors hover:text-accent"
      >
        {t.form.preferEmail}
        <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    </form>
  );
}
