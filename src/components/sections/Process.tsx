"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { processSteps } from "@/content/process";

function PinnedProcess() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(processSteps.length - 1) * 100}%`],
  );
  const railWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      ref={sectionRef}
      className="relative hidden lg:block lg:motion-reduce:hidden!"
      style={{ height: `${processSteps.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <Container className="pointer-events-none absolute left-1/2 top-28 -translate-x-1/2">
          <Eyebrow>Process — how I work</Eyebrow>
        </Container>

        <motion.div className="flex h-full" style={{ x }}>
          {processSteps.map((step) => (
            <div
              key={step.numeral}
              className="relative flex h-full w-screen shrink-0 items-center justify-center px-10"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute font-mono text-[8rem] font-medium leading-none text-bone opacity-10"
              >
                {step.numeral}
              </span>
              <div className="relative max-w-lg">
                <h3 className="font-display text-4xl font-medium tracking-[-0.03em] text-bone">
                  {step.title}
                </h3>
                <p className="mt-5 text-[0.975rem] leading-relaxed text-mute">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="absolute inset-x-10 bottom-16 h-px bg-line md:inset-x-24">
          <motion.div className="h-full bg-signal" style={{ width: railWidth }} />
        </div>
      </div>
    </div>
  );
}

function VerticalProcess() {
  return (
    <div className="py-28 lg:hidden lg:motion-reduce:block!">
      <Container>
        <Eyebrow>Process — how I work</Eyebrow>
        <div className="relative mt-12 space-y-12 border-l border-line pl-8">
          {processSteps.map((step) => (
            <div key={step.numeral} className="relative">
              <span className="absolute -left-[calc(2rem+1px)] top-0 font-mono text-xs text-faint">
                {step.numeral}
              </span>
              <h3 className="font-display text-2xl font-medium tracking-[-0.02em] text-bone">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-mute">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export function Process() {
  return (
    <section id="process" className="border-t border-line">
      <PinnedProcess />
      <VerticalProcess />
    </section>
  );
}
