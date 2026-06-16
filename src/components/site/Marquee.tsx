interface Props { items: string[] }

export function Marquee({ items }: Props) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-border py-6">
      <div className="flex gap-12 animate-[marquee_40s_linear_infinite] whitespace-nowrap">
        {row.map((it, i) => (
          <span key={i} className="font-serif text-3xl md:text-4xl text-muted-foreground/70">
            {it} <span className="text-accent mx-6">✦</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  );
}
