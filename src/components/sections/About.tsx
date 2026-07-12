import { Section } from "@/components/ui/Section";

const facts = [
  { label: "Currently", value: "Building SabiCollect" },
  { label: "Based in", value: "Lagos, Nigeria (WAT)" },
  { label: "Working with", value: "4 clients across FinTech & B2B SaaS" },
  { label: "Open to", value: "Freelance contracts & retainers" },
];

export function About() {
  return (
    <Section id="about" eyebrow="01 — About">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <p className="font-display text-2xl leading-relaxed text-foreground md:text-3xl">
          I&apos;m David. I&apos;ve spent the last two years turning fragile
          manual workflows into resilient automated systems — the kind that
          survive weekends, holidays, and the one person who used to run
          them. My work sits at the intersection of AI, integrations, and
          revenue operations.
        </p>

        <dl className="space-y-6">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="flex flex-col gap-1 border-b border-border pb-5 last:border-0 last:pb-0"
            >
              <dt className="font-mono text-xs uppercase tracking-wider text-muted">
                {fact.label}
              </dt>
              <dd className="font-mono text-sm text-foreground">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
