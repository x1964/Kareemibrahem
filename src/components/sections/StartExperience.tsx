"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Loader2, Send } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";
import { useLocale } from "@/lib/i18n";
import { clsx } from "clsx";

type Option = { value: string; en: string; ar: string };

const projectTypes: Option[] = [
  { value: "website", en: "Website", ar: "موقع تعريفي" },
  { value: "webapp", en: "Web application", ar: "تطبيق ويب" },
  { value: "saas", en: "SaaS platform", ar: "منصة SaaS" },
  { value: "ai", en: "AI-powered product", ar: "منتج بالذكاء الاصطناعي" },
  { value: "system", en: "Business system", ar: "سيستم أعمال" },
  { value: "mobile", en: "Mobile app", ar: "تطبيق موبايل" },
  { value: "other", en: "Something else", ar: "فكرة أخرى" },
];

const budgets: Option[] = [
  { value: "under-500", en: "Under $500", ar: "أقل من 500$" },
  { value: "500-2k", en: "$500 – $2,000", ar: "500$ – 2000$" },
  { value: "2k-5k", en: "$2,000 – $5,000", ar: "2000$ – 5000$" },
  { value: "5k-15k", en: "$5,000 – $15,000", ar: "5000$ – 15000$" },
  { value: "15k-plus", en: "$15,000+", ar: "أكتر من 15000$" },
  { value: "unsure", en: "Not sure yet", ar: "لسه مش متأكد" },
];

const timelines: Option[] = [
  { value: "asap", en: "As soon as possible", ar: "في أقرب وقت ممكن" },
  { value: "month", en: "Within a month", ar: "خلال شهر" },
  { value: "quarters", en: "1 – 3 months", ar: "خلال 1 – 3 شهور" },
  { value: "exploring", en: "Still exploring", ar: "لسه بدروس الفكرة" },
];

const stepTitles = [
  { en: "Your details", ar: "بياناتك" },
  { en: "Project type", ar: "نوع المشروع" },
  { en: "Budget", ar: "الميزانية التقريبية" },
  { en: "Timeline", ar: "الجدول الزمني" },
  { en: "The project", ar: "احكيلي عن المشروع" },
  { en: "Review & send", ar: "مراجعة وإرسال" },
];

const TOTAL_STEPS = stepTitles.length;

type FormValues = {
  name: string;
  email: string;
  whatsapp: string;
  type: string;
  budget: string;
  timeline: string;
  about: string;
};

const emptyValues: FormValues = {
  name: "",
  email: "",
  whatsapp: "",
  type: "",
  budget: "",
  timeline: "",
  about: "",
};

export function StartExperience() {
  const { locale } = useLocale();
  const isAr = locale === "ar";
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const emailServiceEnabled = Boolean(process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY);
  const labelCls = isAr ? "text-sm font-medium" : "font-mono text-[10px] uppercase tracking-[0.25em]";
  const BackArrow = isAr ? ArrowRight : ArrowLeft;
  const NextArrow = isAr ? ArrowLeft : ArrowRight;

  const pick = (key: keyof FormValues) => (v: string) =>
    setValues((prev) => ({ ...prev, [key]: v }));

  const optionLabel = (o: Option) => (isAr ? o.ar : o.en);

  function stepValid(): boolean {
    if (step === 0) {
      return (
        values.name.trim().length > 1 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())
      );
    }
    if (step === 1) return Boolean(values.type);
    if (step === 2) return Boolean(values.budget);
    if (step === 3) return Boolean(values.timeline);
    if (step === 4) return values.about.trim().length >= 10;
    return true;
  }

  function next() {
    if (!stepValid()) return;
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
    setStatus("idle");
  }

  function reviewRows(): { label: string; value: string }[] {
    const type = projectTypes.find((o) => o.value === values.type);
    const budget = budgets.find((o) => o.value === values.budget);
    const timeline = timelines.find((o) => o.value === values.timeline);
    return [
      { label: isAr ? "الاسم" : "Name", value: values.name },
      { label: isAr ? "البريد" : "Email", value: values.email },
      ...(values.whatsapp
        ? [{ label: isAr ? "واتساب" : "WhatsApp", value: values.whatsapp }]
        : []),
      { label: isAr ? "نوع المشروع" : "Project type", value: type ? optionLabel(type) : "—" },
      { label: isAr ? "الميزانية" : "Budget", value: budget ? optionLabel(budget) : "—" },
      { label: isAr ? "الجدول" : "Timeline", value: timeline ? optionLabel(timeline) : "—" },
      { label: isAr ? "الوصف" : "About", value: values.about },
    ];
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "sending") return;

    const type = projectTypes.find((o) => o.value === values.type);
    const budget = budgets.find((o) => o.value === values.budget);
    const timeline = timelines.find((o) => o.value === values.timeline);

    const lines = [
      isAr ? "طلب مشروع جديد — من صفحة /start" : "New project inquiry — via /start",
      "",
      `${isAr ? "الاسم" : "Name"}: ${values.name}`,
      `${isAr ? "البريد" : "Email"}: ${values.email}`,
      values.whatsapp ? `${isAr ? "واتساب" : "WhatsApp"}: ${values.whatsapp}` : null,
      "",
      `${isAr ? "نوع المشروع" : "Project type"}: ${type ? optionLabel(type) : "—"}`,
      `${isAr ? "الميزانية" : "Budget"}: ${budget ? optionLabel(budget) : "—"}`,
      `${isAr ? "الجدول الزمني" : "Timeline"}: ${timeline ? optionLabel(timeline) : "—"}`,
      "",
      `${isAr ? "عن المشروع" : "About the project"}:`,
      values.about,
    ].filter(Boolean);

    const message = lines.join("\n");

    if (!emailServiceEnabled) {
      const subject = encodeURIComponent(
        `${isAr ? "طلب مشروع" : "Project inquiry"} — ${values.name}`
      );
      const body = encodeURIComponent(message);
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setStatus("success");
      return;
    }

    const formData = new FormData();
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "");
    formData.append(
      "subject",
      `${isAr ? "طلب مشروع" : "Project inquiry"} — ${values.name}`
    );
    formData.append("from_name", values.name);
    formData.append("email", values.email);
    formData.append("message", message);

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = (await res.json().catch(() => null)) as { success?: boolean } | null;
      if (!res.ok || !data?.success) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const inputCls =
    "w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-fg placeholder:text-fg-3 transition-colors focus:border-accent focus:outline-none";

  const optionBtnCls = (selected: boolean) =>
    clsx(
      "flex items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-start text-sm font-medium transition-all",
      selected
        ? "border-accent bg-accent/[0.06] text-fg shadow-[0_8px_24px_-14px_rgba(20,92,255,0.4)]"
        : "border-line bg-surface text-fg-2 hover:border-fg-3/60 hover:text-fg"
    );

  return (
    <section className="relative min-h-svh pt-16 sm:pt-20 lg:pt-[72px]">
      <Container className="py-12 sm:py-16">
        <Reveal>
          <Link
            href="/#contact"
            className="group inline-flex items-center gap-2 text-sm font-medium text-fg-3 transition-colors hover:text-accent"
          >
            <BackArrow className="size-4 transition-transform group-hover:-translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            {isAr ? "العودة" : "Back"}
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <p className={clsx(labelCls, "mt-8 text-accent")}>
            {isAr ? "ابدأ مشروعك" : "Start your project"}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-[1.1] tracking-tight text-fg sm:text-5xl lg:text-6xl">
            {isAr ? "خلّينا نبدأ من فكرتك." : "Let's start from your idea."}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-fg-2">
            {isAr
              ? "موقع، تطبيق، أو سيستم — احكيلي محتاج إيه، وهنشوف أنسب حل سوا. ٥ خطوات سريعة وبس."
              : "A website, app, or system — tell me what you need and we'll find the right fit together. Five quick steps."}
          </p>
        </Reveal>

        <Reveal delay={0.12} className="mt-12">
          <div className="mx-auto max-w-2xl">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-sm text-fg-3">
                <span className={labelCls}>
                  {isAr ? `خطوة ${step + 1} من ${TOTAL_STEPS}` : `Step ${step + 1} of ${TOTAL_STEPS}`}
                </span>
                <span className={labelCls}>{stepTitles[step][isAr ? "ar" : "en"]}</span>
              </div>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-line">
                <div
                  className="h-full rounded-full bg-accent transition-all duration-500"
                  style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
                />
              </div>
            </div>

            <form
              onSubmit={onSubmit}
              className="rounded-3xl border border-line bg-surface p-6 shadow-[0_30px_80px_-40px_rgba(12,18,34,0.2)] sm:p-10"
            >
              {status === "success" ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <span className="inline-flex size-14 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Check className="size-7" aria-hidden="true" />
                  </span>
                  <h2 className="mt-6 font-display text-2xl font-medium text-fg">
                    {isAr ? "وصلني طلبك" : "Got your request"}
                  </h2>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-fg-2">
                    {isAr
                      ? emailServiceEnabled
                        ? "هراجع التفاصيل وأرد عليك في أقرب وقت."
                        : "فتح تطبيق البريد عندك — ابعت الرسالة وهرجعلك."
                      : emailServiceEnabled
                        ? "I'll review the details and get back to you shortly."
                        : "Your email client should open — send it and I'll reply."}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setValues(emptyValues);
                      setStep(0);
                      setStatus("idle");
                    }}
                    className="mt-8 rounded-full border border-line px-6 py-3 text-sm font-medium text-fg-2 transition-colors hover:border-accent hover:text-accent"
                  >
                    {isAr ? "طلب جديد" : "New request"}
                  </button>
                </div>
              ) : step === TOTAL_STEPS - 1 ? (
                /* Review */
                <div>
                  <h2 className="font-display text-2xl font-medium tracking-tight text-fg">
                    {stepTitles[step][isAr ? "ar" : "en"]}
                  </h2>
                  <dl className="mt-6 space-y-4">
                    {reviewRows().map((row) => (
                      <div
                        key={row.label}
                        className="rounded-xl border border-line bg-ink-2/60 px-4 py-3"
                      >
                        <dt className={clsx(labelCls, "text-fg-3")}>{row.label}</dt>
                        <dd className="mt-1 whitespace-pre-line text-sm leading-relaxed text-fg">
                          {row.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  {status === "error" && (
                    <p className="mt-4 text-sm text-red-600" role="alert">
                      {isAr
                        ? "حصل خطأ — جرب تاني أو ابعتلي على الإيميل مباشرة."
                        : "Something went wrong — try again or email me directly."}
                    </p>
                  )}
                  <div className="mt-8 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={back}
                      className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium text-fg-2 transition-colors hover:border-fg-3"
                    >
                      <BackArrow className="size-4 rtl:-scale-x-100" />
                      {isAr ? "رجوع" : "Back"}
                    </button>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
                    >
                      {status === "sending" ? (
                        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                      ) : (
                        <Send className="size-4" aria-hidden="true" />
                      )}
                      {status === "sending"
                        ? isAr
                          ? "جارٍ الإرسال…"
                          : "Sending…"
                        : isAr
                          ? "ابعت طلبي"
                          : "Send my request"}
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="font-display text-2xl font-medium tracking-tight text-fg">
                    {stepTitles[step][isAr ? "ar" : "en"]}
                  </h2>

                  <div className="mt-6">
                    {step === 0 && (
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="sq-name" className={clsx(labelCls, "mb-2 block text-fg-3")}>
                            {isAr ? "الاسم" : "Name"}
                          </label>
                          <input
                            id="sq-name"
                            type="text"
                            required
                            autoComplete="name"
                            value={values.name}
                            onChange={(e) => setValues((p) => ({ ...p, name: e.target.value }))}
                            placeholder={isAr ? "اسمك بالكامل" : "Your full name"}
                            className={inputCls}
                          />
                        </div>
                        <div>
                          <label htmlFor="sq-email" className={clsx(labelCls, "mb-2 block text-fg-3")}>
                            {isAr ? "البريد الإلكتروني" : "Email"}
                          </label>
                          <input
                            id="sq-email"
                            type="email"
                            required
                            autoComplete="email"
                            inputMode="email"
                            value={values.email}
                            onChange={(e) => setValues((p) => ({ ...p, email: e.target.value }))}
                            placeholder="you@example.com"
                            className={inputCls}
                          />
                        </div>
                        <div>
                          <label htmlFor="sq-whatsapp" className={clsx(labelCls, "mb-2 block text-fg-3")}>
                            {isAr ? "رقم الواتساب (اختياري)" : "WhatsApp number (optional)"}
                          </label>
                          <input
                            id="sq-whatsapp"
                            type="tel"
                            autoComplete="tel"
                            inputMode="tel"
                            value={values.whatsapp}
                            onChange={(e) => setValues((p) => ({ ...p, whatsapp: e.target.value }))}
                            placeholder={isAr ? "مع كود الدولة، مثلاً +20…" : "+1 555 000 0000"}
                            className={inputCls}
                          />
                        </div>
                      </div>
                    )}

                    {step === 1 && (
                      <OptionGrid
                        options={projectTypes}
                        selected={values.type}
                        onPick={pick("type")}
                        optionLabel={optionLabel}
                        cls={optionBtnCls}
                      />
                    )}
                    {step === 2 && (
                      <OptionGrid
                        options={budgets}
                        selected={values.budget}
                        onPick={pick("budget")}
                        optionLabel={optionLabel}
                        cls={optionBtnCls}
                      />
                    )}
                    {step === 3 && (
                      <OptionGrid
                        options={timelines}
                        selected={values.timeline}
                        onPick={pick("timeline")}
                        optionLabel={optionLabel}
                        cls={optionBtnCls}
                      />
                    )}
                    {step === 4 && (
                      <div>
                        <label htmlFor="sq-about" className={clsx(labelCls, "mb-2 block text-fg-3")}>
                          {isAr ? "إيه اللي محتاجه بالظبط؟" : "What do you need exactly?"}
                        </label>
                        <textarea
                          id="sq-about"
                          required
                          rows={6}
                          value={values.about}
                          onChange={(e) => setValues((p) => ({ ...p, about: e.target.value }))}
                          placeholder={
                            isAr
                              ? "الفكرة، الهدف، أي تفاصيل مهمة…"
                              : "The idea, the goal, any important details…"
                          }
                          className={clsx(inputCls, "resize-y leading-relaxed")}
                        />
                      </div>
                    )}
                  </div>

                  <div className="mt-8 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={back}
                      disabled={step === 0}
                      className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium text-fg-2 transition-colors hover:border-fg-3 disabled:opacity-40"
                    >
                      <BackArrow className="size-4 rtl:-scale-x-100" />
                      {isAr ? "رجوع" : "Back"}
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      disabled={!stepValid()}
                      className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {isAr ? "التالي" : "Next"}
                      <NextArrow className="size-4 transition-transform group-hover:-translate-x-0.5 rtl:rotate-180 rtl:group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              )}
            </form>

            <p className="mt-6 text-center text-xs leading-relaxed text-fg-3">
              {isAr
                ? "بياناتك بتتستخدم للتواصل بخصوص مشروعك بس."
                : "Your details are only used to reach you about your project."}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function OptionGrid({
  options,
  selected,
  onPick,
  optionLabel,
  cls,
}: {
  options: Option[];
  selected: string;
  onPick: (v: string) => void;
  optionLabel: (o: Option) => string;
  cls: (selected: boolean) => string;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2" role="radiogroup">
      {options.map((o) => {
        const isSelected = selected === o.value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onPick(o.value)}
            className={cls(isSelected)}
          >
            <span>{optionLabel(o)}</span>
            <span
              className={clsx(
                "inline-flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                isSelected ? "border-accent bg-accent text-white" : "border-line"
              )}
            >
              {isSelected && <Check className="size-3" aria-hidden="true" />}
            </span>
          </button>
        );
      })}
    </div>
  );
}
