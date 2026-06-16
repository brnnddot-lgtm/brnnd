import { useEffect, useState } from "react";
import { z } from "zod";
import { useServerFn } from "@tanstack/react-start";
import { submitDemoLead } from "@/lib/leads.functions";

const BOOK_EVENT = "brnnd:open-book-demo";

export function openBookDemo() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(BOOK_EVENT));
}

const schema = z.object({
  email: z.string().trim().email("Enter a valid business email").max(255),
  name: z.string().trim().min(1, "Full name is required").max(120),
  size: z.string().min(1, "Select a company size"),
  company: z.string().trim().min(1, "Company name is required").max(120),
});

const sizes = ["1–10", "11–50", "51–200", "201–500", "501–1000", "1000+"];

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

export function BookDemoModal() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [values, setValues] = useState({ email: "", name: "", size: "", company: "" });
  const submit = useServerFn(submitDemoLead);

  useEffect(() => {
    const handler = () => {
      setSubmitted(false);
      setErrors({});
      setServerError(null);
      setOpen(true);
    };
    window.addEventListener(BOOK_EVENT, handler);
    return () => window.removeEventListener(BOOK_EVENT, handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  function onChange<K extends keyof typeof values>(k: K, v: string) {
    setValues((prev) => ({ ...prev, [k]: v }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setSubmitting(true);
    try {
      await submit({
        data: {
          email: parsed.data.email,
          name: parsed.data.name,
          company: parsed.data.company,
          size: parsed.data.size,
          source: typeof window !== "undefined" ? window.location.pathname : undefined,
        },
      });
      setSubmitted(true);
      setValues({ email: "", name: "", size: "", company: "" });
    } catch (err) {
      console.error(err);
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Book a demo"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
        onClick={() => setOpen(false)}
      />

      <button
        onClick={() => setOpen(false)}
        aria-label="Close"
        className="absolute top-5 right-5 md:top-8 md:right-8 z-[101] h-11 w-11 rounded-full bg-paper text-ink border border-foreground/10 hover:scale-105 transition-transform flex items-center justify-center"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" stroke="currentColor" strokeWidth="1.75" fill="none">
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
      </button>

      <div
        className="relative w-full max-w-2xl rounded-2xl bg-paper text-ink shadow-2xl p-8 md:p-12 animate-[modalUp_0.35s_cubic-bezier(0.22,1,0.36,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        {submitted ? (
          <div className="text-center py-10">
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-foreground/55 mb-6">
              [ Thank you ]
            </p>
            <h2 className="editorial text-3xl md:text-5xl leading-[1.05]">
              We'll be in touch <em className="italic font-serif">within one business day.</em>
            </h2>
            <button
              onClick={() => setOpen(false)}
              className="btn-ink mt-10"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-3xl md:text-4xl text-center leading-tight">
              <em className="italic font-serif">Book a demo</em>{" "}
              <span className="font-sans">with our experts</span>
            </h2>

            <form onSubmit={onSubmit} className="mt-9 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5" noValidate>
              <Field
                label="Business email"
                error={errors.email}
              >
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your business email"
                  value={values.email}
                  onChange={(e) => onChange("email", e.target.value)}
                  className={inputCls(!!errors.email)}
                />
              </Field>

              <Field label="Full name" error={errors.name}>
                <input
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your full name"
                  value={values.name}
                  onChange={(e) => onChange("name", e.target.value)}
                  className={inputCls(!!errors.name)}
                />
              </Field>

              <Field label="Company size" error={errors.size}>
                <div className="relative">
                  <select
                    value={values.size}
                    onChange={(e) => onChange("size", e.target.value)}
                    className={`${inputCls(!!errors.size)} appearance-none pr-10 ${values.size ? "" : "text-foreground/50"}`}
                  >
                    <option value="">Select the size of your company</option>
                    {sizes.map((s) => (
                      <option key={s} value={s} className="text-foreground">{s}</option>
                    ))}
                  </select>
                  <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-3 w-3 text-foreground/50" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 4.5l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Field>

              <Field label="Company name" error={errors.company}>
                <input
                  type="text"
                  autoComplete="organization"
                  placeholder="Enter your company name"
                  value={values.company}
                  onChange={(e) => onChange("company", e.target.value)}
                  className={inputCls(!!errors.company)}
                />
              </Field>

              <div className="md:col-span-2 flex flex-col items-end gap-3 mt-2">
                {serverError && (
                  <span className="text-[12px] text-[oklch(0.65_0.2_25)] self-start">{serverError}</span>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-full bg-ink text-paper px-7 py-3.5 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Submitting…" : "Book a demo"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes modalUp { from { opacity: 0; transform: translateY(16px) scale(0.98) } to { opacity: 1; transform: translateY(0) scale(1) } }
      `}</style>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block font-mono text-[10px] tracking-[0.22em] uppercase text-foreground/60 mb-2">
        {label}
      </span>
      {children}
      {error && (
        <span className="block mt-1.5 text-[12px] text-[oklch(0.65_0.2_25)]">{error}</span>
      )}
    </label>
  );
}

function inputCls(hasError: boolean) {
  return `w-full rounded-full border bg-paper px-5 py-3.5 text-[14px] text-foreground placeholder:text-foreground/45 outline-none transition-colors ${
    hasError
      ? "border-[oklch(0.65_0.2_25)] focus:border-[oklch(0.65_0.2_25)]"
      : "border-foreground/15 focus:border-foreground/40"
  }`;
}
