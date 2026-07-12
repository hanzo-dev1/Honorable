import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { capabilities } from "@/content/capabilities";

export function Capabilities() {
  return (
    <Section id="capabilities">
      <Eyebrow>Capabilities</Eyebrow>
      <h2 className="mt-4 font-display text-[clamp(2rem,3.5vw,3rem)] font-medium tracking-[-0.035em] text-bone">
        What I build.
      </h2>

      <div className="mt-12 border-t border-line">
        {capabilities.map((capability) => {
          const Icon = capability.icon;
          return (
            <div
              key={capability.name}
              className="group relative grid grid-cols-12 items-start gap-4 border-b border-line py-9 last:border-b-0"
            >
              <span className="absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-signal transition-transform duration-[240ms] ease-[var(--ease-decisive)] group-hover:scale-y-100" />

              <div className="col-span-12 pl-4 md:col-span-4">
                <Icon size={16} strokeWidth={1.5} className="text-faint" />
                <h3 className="mt-3 font-display text-[1.35rem] font-medium tracking-[-0.02em] text-bone">
                  {capability.name}
                </h3>
              </div>

              <p className="col-span-11 col-start-2 line-clamp-2 text-sm leading-relaxed text-mute md:col-span-5 md:col-start-5">
                {capability.description}
              </p>

              <span className="col-span-11 col-start-2 font-mono text-[0.6875rem] text-faint md:col-span-3 md:col-start-10 md:text-right">
                {capability.engagement}
              </span>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
