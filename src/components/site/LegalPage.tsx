import { Link } from "@tanstack/react-router";

type Section = { heading: string; body: string };

type LegalPageProps = {
  eyebrow: string;
  title: string;
  updated: string;
  sections: Section[];
};

export default function LegalPage({ eyebrow, title, updated, sections }: LegalPageProps) {
  return (
    <main className="bg-paper text-ink">
      <section className="border-b border-ink/10">
        <div className="mx-auto max-w-4xl px-6 pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="text-xs uppercase tracking-[0.2em] text-ink/60">{eyebrow}</div>
          <h1 className="editorial mt-4 text-5xl leading-[0.95] md:text-7xl">{title}</h1>
          <p className="mt-6 text-sm text-ink/60">{updated}</p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
          <div className="space-y-10">
            {sections.map((s) => (
              <div key={s.heading}>
                <h2 className="editorial text-2xl md:text-3xl text-ink">{s.heading}</h2>
                <p className="mt-3 text-base leading-relaxed text-ink/75">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 border-t border-ink/10 pt-8 text-sm text-ink/60">
            <Link to="/" className="underline-offset-4 hover:underline">← Back to home</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
