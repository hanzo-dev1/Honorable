import { Section } from "@/components/ui/Section";
import { stack } from "@/content/stack";

export function Stack() {
  return (
    <Section id="stack" eyebrow="03 — Stack" title="The tools I reach for.">
      <div className="divide-y divide-border border-y border-border">
        {stack.map((group) => (
          <div
            key={group.category}
            className="flex flex-col gap-4 py-6 md:flex-row md:items-center md:gap-8"
          >
            <span className="font-mono text-sm uppercase tracking-wider text-muted md:w-40 md:shrink-0">
              {group.category}
            </span>
            <div className="flex flex-1 flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
