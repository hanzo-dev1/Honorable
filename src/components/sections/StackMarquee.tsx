import { stackRowA, stackRowB, type StackLogo } from "@/content/stack";
import { cn } from "@/lib/utils";

const EDGE_MASK =
  "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)";

function Tile({ logo }: { logo: StackLogo }) {
  const Icon = logo.Icon;
  return (
    <div
      className="group mx-2 flex h-14 w-14 shrink-0 items-center justify-center rounded-card border border-line bg-white/[0.02] transition-all duration-200 ease-[var(--ease-decisive)] hover:-translate-y-[3px] hover:border-line-hi"
      title={logo.name}
    >
      <Icon className="h-6 w-6 text-bone [filter:grayscale(1)_opacity(0.45)] transition-[filter] duration-200 ease-[var(--ease-decisive)] group-hover:[filter:grayscale(0)_opacity(1)]" />
    </div>
  );
}

function Row({
  logos,
  direction,
  duration,
}: {
  logos: StackLogo[];
  direction: "left" | "right";
  duration: string;
}) {
  const doubled = [...logos, ...logos];
  return (
    <div
      className="marquee-row motion-reduce:hidden relative overflow-hidden py-1"
      style={{ maskImage: EDGE_MASK, WebkitMaskImage: EDGE_MASK }}
    >
      <div
        className={cn(
          "marquee-track",
          direction === "left" ? "marquee-track--left" : "marquee-track--right",
        )}
        style={{ "--marquee-duration": duration } as React.CSSProperties}
      >
        {doubled.map((logo, i) => (
          <Tile key={`${logo.name}-${i}`} logo={logo} />
        ))}
      </div>
    </div>
  );
}

function StaticFallback() {
  const logos = [...stackRowA, ...stackRowB].slice(0, 12);
  return (
    <div className="hidden flex-wrap items-center justify-center gap-2 motion-reduce:flex">
      {logos.map((logo) => (
        <Tile key={logo.name} logo={logo} />
      ))}
    </div>
  );
}

export function StackMarquee() {
  return (
    <section className="border-y border-line py-12">
      <p className="mb-8 text-center font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-faint">
        THE STACK I DEPLOY ON
      </p>

      <div className="flex flex-col gap-4">
        <Row logos={stackRowA} direction="left" duration="70s" />
        <Row logos={stackRowB} direction="right" duration="85s" />
      </div>

      <StaticFallback />
    </section>
  );
}
