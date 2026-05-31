import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { services } from "@/data/services";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a demo — Brnnd" },
      { name: "description", content: "Book a 30-minute intro call with a Brnnd partner. Pick a time that works for you." },
      { property: "og:title", content: "Book a demo — Brnnd" },
      { property: "og:description", content: "Book a 30-minute intro call with a Brnnd partner." },
      { property: "og:url", content: "https://brnnd.com/book" },
    ],
  links: [{ rel: "canonical", href: "https://brnnd.com/book" }],
  }),
  validateSearch: (search: Record<string, unknown>) => ({
    service: typeof search.service === "string" ? search.service : undefined,
  }),
  component: BookPage,
});

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30",
];

const DURATIONS = [
  { id: "15", label: "15 min", sub: "Quick intro" },
  { id: "30", label: "30 min", sub: "Standard demo" },
  { id: "45", label: "45 min", sub: "Deep dive" },
];

type Step = "when" | "who" | "done";

function getNextBusinessDays(count: number): Date[] {
  const days: Date[] = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  while (days.length < count) {
    d.setDate(d.getDate() + 1);
    const day = d.getDay();
    if (day !== 0 && day !== 6) days.push(new Date(d));
  }
  return days;
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function BookPage() {
  const { service: serviceSlug } = Route.useSearch();
  const initialService = services.find((s) => s.slug === serviceSlug);

  const [step, setStep] = useState<Step>("when");
  const [duration, setDuration] = useState("30");
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [topic, setTopic] = useState<string>(initialService?.title ?? "");
  const [confirmation, setConfirmation] = useState<{
    name: string; date: Date; time: string; duration: string;
  } | null>(null);

  const days = useMemo(() => getNextBusinessDays(10), []);
  const canContinue = date && time;

  return (
    <main className="bg-background text-foreground">
      <section className="container-edge pt-16 md:pt-28 pb-10">
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.22em] text-foreground/60 mb-6">
          <Link to="/" className="hover:text-foreground transition-colors">[ Home ]</Link>
          <span>/</span>
          <span>Book a demo</span>
        </div>
        <h1 className="editorial text-5xl md:text-7xl lg:text-8xl max-w-5xl leading-[0.92]">
          Book a <em className="italic font-serif text-accent">30-minute</em> intro with a partner.
        </h1>
        <p className="mt-8 max-w-xl text-foreground/70 text-base md:text-lg">
          No sales pitch. A real conversation about your brief, your team, and how we'd help.
          Pick a time below — you'll get a calendar invite within minutes.
        </p>
      </section>

      <section className="container-edge pb-24 md:pb-36">
        {/* STEP INDICATOR */}
        <div className="flex items-center gap-4 mb-12 text-sm">
          <StepDot n={1} label="When" active={step === "when"} done={step !== "when"} />
          <div className="h-px flex-1 max-w-[80px] bg-foreground/15" />
          <StepDot n={2} label="Details" active={step === "who"} done={step === "done"} />
          <div className="h-px flex-1 max-w-[80px] bg-foreground/15" />
          <StepDot n={3} label="Confirmed" active={step === "done"} done={false} />
        </div>

        {step === "when" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* LEFT: meeting summary */}
            <aside className="lg:col-span-4 space-y-8 lg:border-r lg:border-border lg:pr-10">
              <div>
                <p className="eyebrow mb-3">Meeting</p>
                <h2 className="font-serif italic text-3xl mb-3">Intro with a partner</h2>
                <p className="text-sm text-foreground/65 leading-relaxed">
                  A working session, not a pitch. We'll talk through your goals, what's blocking you,
                  and whether we're the right fit.
                </p>
              </div>
              <div>
                <p className="eyebrow mb-3">Length</p>
                <div className="grid grid-cols-3 gap-2">
                  {DURATIONS.map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setDuration(d.id)}
                      className={`rounded-xl border p-3 text-left transition-colors ${
                        duration === d.id
                          ? "border-foreground bg-foreground text-background"
                          : "border-border hover:border-foreground/50"
                      }`}
                    >
                      <p className="font-medium text-sm">{d.label}</p>
                      <p className={`text-xs mt-0.5 ${duration === d.id ? "text-background/70" : "text-foreground/55"}`}>
                        {d.sub}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="eyebrow mb-3">Location</p>
                <p className="text-sm">Google Meet — link emailed on confirmation.</p>
              </div>
              <div>
                <p className="eyebrow mb-3">Timezone</p>
                <p className="text-sm">{Intl.DateTimeFormat().resolvedOptions().timeZone}</p>
              </div>
            </aside>

            {/* RIGHT: calendar + slots */}
            <div className="lg:col-span-8">
              <p className="eyebrow mb-4">Pick a date</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-10">
                {days.map((d) => {
                  const selected = date?.toDateString() === d.toDateString();
                  return (
                    <button
                      key={d.toISOString()}
                      type="button"
                      onClick={() => { setDate(d); setTime(null); }}
                      className={`rounded-xl border p-4 text-left transition-colors ${
                        selected
                          ? "border-foreground bg-foreground text-background"
                          : "border-border hover:border-foreground/50 hover:bg-bone"
                      }`}
                    >
                      <p className={`text-[10px] uppercase tracking-wider ${selected ? "text-background/60" : "text-foreground/55"}`}>
                        {d.toLocaleDateString("en-US", { weekday: "short" })}
                      </p>
                      <p className="font-serif text-2xl mt-1">{d.getDate()}</p>
                      <p className={`text-xs mt-0.5 ${selected ? "text-background/70" : "text-foreground/55"}`}>
                        {d.toLocaleDateString("en-US", { month: "short" })}
                      </p>
                    </button>
                  );
                })}
              </div>

              {date && (
                <>
                  <p className="eyebrow mb-4">Pick a time — {formatDate(date)}</p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 mb-10">
                    {TIME_SLOTS.map((t) => {
                      const selected = time === t;
                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTime(t)}
                          className={`rounded-full border py-3 text-sm font-medium transition-colors ${
                            selected
                              ? "border-foreground bg-foreground text-background"
                              : "border-border hover:border-foreground/50"
                          }`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              <div className="flex items-center justify-between pt-6 border-t border-border">
                <p className="text-sm text-foreground/60">
                  {canContinue
                    ? <>Selected: <span className="font-medium text-foreground">{formatDate(date!)}</span> at <span className="font-medium text-foreground">{time}</span> · {duration} min</>
                    : "Pick a date and time to continue."}
                </p>
                <button
                  type="button"
                  disabled={!canContinue}
                  onClick={() => setStep("who")}
                  className="btn-ink disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Continue →
                </button>
              </div>
            </div>
          </div>
        )}

        {step === "who" && date && time && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <aside className="lg:col-span-4 space-y-6 lg:border-r lg:border-border lg:pr-10">
              <div>
                <p className="eyebrow mb-3">Your meeting</p>
                <h2 className="font-serif italic text-3xl">Intro with a partner</h2>
              </div>
              <SummaryRow label="When" value={`${formatDate(date)} · ${time}`} />
              <SummaryRow label="Length" value={`${duration} minutes`} />
              <SummaryRow label="Location" value="Google Meet" />
              <button
                type="button"
                onClick={() => setStep("when")}
                className="text-sm underline underline-offset-4 text-foreground/65 hover:text-foreground transition-colors"
              >
                ← Change time
              </button>
            </aside>

            <div className="lg:col-span-8">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget as HTMLFormElement;
                  const name = (form.elements.namedItem("name") as HTMLInputElement).value;
                  setConfirmation({ name, date, time, duration });
                  setStep("done");
                }}
                className="space-y-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <BookField label="Your name" name="name" required />
                  <BookField label="Work email" name="email" type="email" required />
                  <BookField label="Company" name="company" required />
                  <BookField label="Role" name="role" />
                </div>

                <div>
                  <label htmlFor="topic" className="eyebrow block mb-3">What should we focus on?</label>
                  <select
                    id="topic"
                    name="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full bg-transparent border-b border-foreground/40 focus:border-foreground outline-none py-3 text-lg appearance-none cursor-pointer"
                  >
                    <option value="">Choose a service…</option>
                    {services.map((s) => (
                      <option key={s.slug} value={s.title}>{s.title}</option>
                    ))}
                    <option value="General intro">General intro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="notes" className="eyebrow block mb-3">Anything we should know? (optional)</label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    placeholder="Stage, timelines, the problem you're solving…"
                    className="w-full bg-transparent border-b border-foreground/40 focus:border-foreground outline-none py-3 font-serif text-xl placeholder:text-muted-foreground/50"
                  />
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-border">
                  <p className="text-xs text-foreground/55 max-w-sm">
                    By booking, you agree to receive a calendar invite at the email above. We never share your details.
                  </p>
                  <button type="submit" className="btn-ink">Confirm booking →</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {step === "done" && confirmation && (
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent text-accent-foreground mb-8 text-2xl">✓</div>
            <p className="eyebrow mb-6">[ Confirmed ]</p>
            <h2 className="editorial text-4xl md:text-6xl mb-6 leading-[1]">
              You're booked, <em className="italic font-serif">{confirmation.name.split(" ")[0]}</em>.
            </h2>
            <p className="text-foreground/70 text-lg mb-10">
              We'll see you on <span className="font-medium text-foreground">{formatDate(confirmation.date)}</span> at{" "}
              <span className="font-medium text-foreground">{confirmation.time}</span> ({confirmation.duration} min).
              A calendar invite with the Google Meet link is on its way.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link to="/" className="btn-ghost">Back to home</Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

function StepDot({ n, label, active, done }: { n: number; label: string; active: boolean; done: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${active ? "text-foreground" : done ? "text-foreground/70" : "text-foreground/40"}`}>
      <span className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-medium ${
        active ? "border-foreground bg-foreground text-background"
        : done ? "border-foreground/40 bg-foreground/10"
        : "border-foreground/25"
      }`}>
        {done ? "✓" : n}
      </span>
      <span className="text-xs font-mono uppercase tracking-[0.18em]">{label}</span>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="eyebrow mb-1">{label}</p>
      <p className="text-foreground">{value}</p>
    </div>
  );
}

function BookField({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow block mb-3">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full bg-transparent border-b border-foreground/40 focus:border-foreground outline-none py-2 text-lg"
      />
    </div>
  );
}
