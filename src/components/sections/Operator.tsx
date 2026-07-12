import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";

const facts = [
  "BASED IN LAGOS, NG",
  "WORKING WITH TEAMS IN NG · UK · US",
  "RESPONDS WITHIN 24H",
];

export function Operator() {
  return (
    <Section id="operator">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-5">
          {/* TODO(david): swap for a real portrait via next/image — aspect-[4/5], grayscale by default, hover:grayscale-0 over 500ms */}
          <div className="group flex aspect-[4/5] items-center justify-center rounded-card border border-line bg-surface">
            <span className="chrome-text font-display text-6xl font-medium grayscale transition-all duration-500 group-hover:grayscale-0">
              DO
            </span>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Eyebrow>Operator</Eyebrow>
          <p className="mt-6 max-w-[52ch] text-lg leading-[1.65] text-mute">
            I&apos;m David. I build automation systems for companies that
            have outgrown spreadsheets but can&apos;t justify a full
            engineering team. Most of my work runs on n8n — agents, RAG
            pipelines, revenue workflows — wired into the tools a business
            already uses. I ship in weeks, not quarters, and I hand over
            systems you own outright: your infrastructure, your keys, your
            data. No black boxes, no retainer hostage situations.
          </p>

          <div className="mt-8 flex flex-col gap-2">
            {facts.map((fact) => (
              <span key={fact} className="font-mono text-[0.6875rem] tracking-[0.1em] text-faint">
                {fact}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
