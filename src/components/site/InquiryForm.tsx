import { useState } from "react";

const budgets = ["< $10K", "$10K — $25K", "$25K — $75K", "$75K +"];
const defaultServices = [
  "Brand Strategy",
  "Website",
  "Design System",
  "Social System",
  "Rebrand",
  "Other",
];

export type InquiryFormProps = {
  /** Pre-selected service tag (e.g. the current service page title). */
  defaultService?: string;
  /** Override the service tags shown. */
  serviceOptions?: string[];
  /** Visual variant: light surface (default) or dark surface (for inline sections). */
  variant?: "light" | "dark";
  /** Compact layout (single column, smaller spacing) for inline placement. */
  compact?: boolean;
};

export function InquiryForm({
  defaultService,
  serviceOptions,
  variant = "light",
  compact = false,
}: InquiryFormProps) {
  const options = serviceOptions ?? (defaultService
    ? Array.from(new Set([defaultService, ...defaultServices]))
    : defaultServices);

  const [picked, setPicked] = useState<string[]>(
    defaultService ? [defaultService] : []
  );
  const [sent, setSent] = useState(false);

  const toggle = (s: string) =>
    setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  const isDark = variant === "dark";
  const inputLine = isDark
    ? "border-white/30 focus:border-white text-white placeholder:text-white/40"
    : "border-foreground/40 focus:border-foreground placeholder:text-muted-foreground/50";
  const tagIdle = isDark
    ? "border-white/30 text-white hover:border-white"
    : "border-foreground/30 hover:border-foreground";
  const tagActive = isDark
    ? "bg-white text-foreground border-white"
    : "bg-foreground text-background border-foreground";

  if (sent) {
    return (
      <div className={`border ${isDark ? "border-white/20" : "border-border"} p-10 md:p-12 text-center rounded-2xl`}>
        <p className={`eyebrow mb-6 ${isDark ? "text-white/70" : ""}`}>[ Sent ]</p>
        <h3 className={`editorial text-3xl md:text-4xl ${isDark ? "text-white" : ""}`}>
          Thank you. We'll be in touch within 24 hours.
        </h3>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // Routes into the same workflow as the /contact form.
        setSent(true);
      }}
      className={compact ? "space-y-8" : "space-y-12"}
    >
      <div className={`grid grid-cols-1 ${compact ? "md:grid-cols-2" : "md:grid-cols-2"} gap-6 md:gap-8`}>
        <Field label="Your name" name="name" dark={isDark} required />
        <Field label="Company" name="company" dark={isDark} />
        <Field label="Email" name="email" type="email" dark={isDark} required />
        <Field label="Website (optional)" name="site" dark={isDark} />
      </div>

      <div>
        <label className={`eyebrow block mb-4 ${isDark ? "text-white/70" : ""}`}>
          What are you looking for?
        </label>
        <div className="flex flex-wrap gap-2">
          {options.map((s) => (
            <button
              type="button"
              key={s}
              onClick={() => toggle(s)}
              className={`border rounded-full px-4 py-2 text-sm transition-colors ${
                picked.includes(s) ? tagActive : tagIdle
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className={`eyebrow block mb-4 ${isDark ? "text-white/70" : ""}`}>Budget</label>
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-px ${isDark ? "bg-white/15" : "bg-border"} border ${isDark ? "border-white/15" : "border-border"} rounded-lg overflow-hidden`}>
          {budgets.map((b) => (
            <label
              key={b}
              className={`${isDark ? "bg-[oklch(0.22_0.03_165)] text-white hover:bg-[oklch(0.26_0.03_165)]" : "bg-background hover:bg-bone"} p-4 text-sm flex items-center gap-3 cursor-pointer`}
            >
              <input type="radio" name="budget" value={b} className="accent-foreground" />
              {b}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="brief" className={`eyebrow block mb-3 ${isDark ? "text-white/70" : ""}`}>
          Tell us about your project
        </label>
        <textarea
          id="brief"
          name="brief"
          rows={compact ? 4 : 5}
          required
          placeholder="Stage, timeline, current state of the brand…"
          className={`w-full bg-transparent border-b outline-none py-3 font-serif text-xl md:text-2xl ${inputLine}`}
        />
      </div>

      <button
        type="submit"
        className={
          isDark
            ? "inline-flex items-center rounded-full bg-[oklch(0.88_0.16_125)] text-[oklch(0.2_0.04_160)] px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
            : "btn-ink"
        }
      >
        Send brief →
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  dark = false,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  dark?: boolean;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className={`eyebrow block mb-3 ${dark ? "text-white/70" : ""}`}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className={`w-full bg-transparent border-b outline-none py-2 text-lg ${
          dark
            ? "border-white/30 focus:border-white text-white placeholder:text-white/40"
            : "border-foreground/40 focus:border-foreground"
        }`}
      />
    </div>
  );
}
