interface Props {
  index?: string;
  eyebrow: string;
  title: string;
  description?: string;
}

export function SectionHeader({ index, eyebrow, title, description }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-14 md:mb-20">
      <div className="md:col-span-4">
        <div className="flex items-baseline gap-4">
          {index && <span className="font-mono text-xs text-muted-foreground">{index}</span>}
          <p className="eyebrow">{eyebrow}</p>
        </div>
      </div>
      <div className="md:col-span-8">
        <h2 className="editorial text-4xl md:text-6xl lg:text-7xl">{title}</h2>
        {description && (
          <p className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
