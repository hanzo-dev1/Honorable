import { Section } from "@/components/ui/Section";
import { CountUp } from "@/components/ui/CountUp";
import { metrics } from "@/content/metrics";

export function Proof() {
  return (
    <Section id="proof" className="!py-16 md:!py-20">
      <div className="grid grid-cols-2 divide-x divide-y divide-line sm:grid-cols-4 sm:divide-y-0">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex flex-col gap-2 px-6 py-8 text-center">
            <CountUp
              value={metric.value}
              className="font-mono text-[clamp(2rem,4vw,3.25rem)] tabular-nums text-bone"
            />
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
              {metric.label}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}
