"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { BookCallLink } from "@/components/ui/BookCallLink";
import { SystemPanel } from "@/components/ui/SystemPanel";
import { reveal, stagger } from "@/lib/motion";

export function Hero() {
  return (
    <section className="relative flex min-h-[92svh] items-center pt-16">
      <Container className="w-full">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="grid gap-16 lg:grid-cols-12 lg:items-center"
        >
          <div className="lg:col-span-7">
            <motion.div variants={reveal} className="reveal-el">
              <Eyebrow>LAGOS, NG · BUILDING SINCE 2022</Eyebrow>
            </motion.div>

            <motion.h1
              variants={reveal}
              className="reveal-el mt-6 font-display text-[clamp(2.75rem,6.5vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.045em] text-bone"
            >
              I build the <span className="chrome-text">systems</span>
              <br />
              that run the work{" "}
              <span className="font-editorial italic tracking-[-0.02em] text-bone">
                nobody wants to do.
              </span>
            </motion.h1>

            <motion.p
              variants={reveal}
              className="reveal-el mt-8 max-w-[46ch] text-[0.975rem] leading-[1.65] text-mute"
            >
              Autonomous agents, RAG support desks, and end-to-end revenue
              automation — deployed on n8n, wired into the tools your team
              already lives in. Built to run unattended for months.
            </motion.p>

            <motion.div variants={reveal} className="reveal-el mt-10 flex flex-wrap items-center gap-4">
              <BookCallLink className="inline-flex items-center justify-center gap-2 rounded-card bg-bone px-6 py-3 font-display text-sm font-medium text-void transition-colors duration-180 ease-decisive hover:bg-white">
                Book a call
              </BookCallLink>
              <Button href="#work" variant="ghost">
                See the work
              </Button>
            </motion.div>
          </div>

          <motion.div variants={reveal} className="reveal-el lg:col-span-5">
            <SystemPanel />
            <p className="mt-4 font-mono text-xs text-faint">
              A real workflow. Runs hourly. Unattended since March.
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
