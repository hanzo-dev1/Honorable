"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Section } from "@/components/ui/Section";

const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "We map your current workflow, surface the manual work, and identify the highest-leverage automations.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "I architect the system: which tools, which triggers, which fallbacks. You approve before I build.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Iterative delivery. You see working workflows in your own accounts within a week.",
  },
  {
    number: "04",
    title: "Handover",
    description:
      "Documentation, monitoring, and a 30-day support window. You own everything.",
  },
];

function Connector({
  dashOffset,
  orientation,
}: {
  dashOffset: ReturnType<typeof useTransform<number, number>>;
  orientation: "horizontal" | "vertical";
}) {
  if (orientation === "horizontal") {
    return (
      <svg
        className="hidden h-px flex-1 md:block"
        viewBox="0 0 100 2"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <motion.line
          x1={0}
          y1={1}
          x2={100}
          y2={1}
          stroke="var(--border)"
          strokeWidth={2}
          strokeDasharray="4 5"
          style={{ strokeDashoffset: dashOffset }}
        />
      </svg>
    );
  }

  return (
    <svg
      className="ml-[5px] h-8 w-px md:hidden"
      viewBox="0 0 2 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.line
        x1={1}
        y1={0}
        x2={1}
        y2={100}
        stroke="var(--border)"
        strokeWidth={2}
        strokeDasharray="4 5"
        style={{ strokeDashoffset: dashOffset }}
      />
    </svg>
  );
}

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 40%"],
  });
  const dashOffset = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <Section id="process" eyebrow="05 — Process" title="How I work.">
      <div ref={containerRef} className="grid gap-10 md:grid-cols-4">
        {steps.map((step, i) => (
          <div key={step.number} className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm text-accent">
                / {step.number}
              </span>
              {i < steps.length - 1 && (
                <Connector dashOffset={dashOffset} orientation="horizontal" />
              )}
            </div>

            <h3 className="font-display text-xl text-foreground">
              {step.title}
            </h3>
            <p className="text-sm text-muted">{step.description}</p>

            {i < steps.length - 1 && (
              <Connector dashOffset={dashOffset} orientation="vertical" />
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
