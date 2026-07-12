"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Chip } from "@/components/ui/Chip";
import { Hairline } from "@/components/ui/Hairline";
import { projects } from "@/content/projects";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

function WorkRow({ project }: { project: (typeof projects)[number] }) {
  const [open, setOpen] = useState(false);
  const panelId = `work-panel-${project.index}`;

  return (
    <div className="border-b border-line last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="grid w-full grid-cols-12 items-center gap-4 py-9 text-left transition-colors duration-180 hover:bg-white/[0.018]"
      >
        <span
          className={cn(
            "col-span-2 font-mono text-sm tabular-nums transition-colors duration-180 md:col-span-1",
            open ? "text-signal" : "text-faint",
          )}
        >
          {project.index}
        </span>

        <div className="col-span-10 md:col-span-4">
          <h3 className="font-display text-xl font-medium tracking-[-0.02em] text-bone md:text-2xl">
            {project.name}
          </h3>
          <p className="mt-1 text-sm text-mute">{project.descriptor}</p>
        </div>

        <div className="col-span-8 col-start-3 hidden flex-wrap gap-2 md:col-span-3 md:col-start-6 md:flex">
          {project.stack.slice(0, 4).map((tech) => (
            <Chip key={tech}>{tech}</Chip>
          ))}
        </div>

        <span className="col-span-8 hidden text-right font-mono text-sm text-bone md:col-span-3 md:col-start-9 md:block">
          {project.outcome}
        </span>

        <span className="col-span-2 flex justify-end md:col-span-1">
          <Plus
            size={18}
            strokeWidth={1.5}
            className={cn(
              "text-faint transition-transform duration-300 ease-[var(--ease-decisive)]",
              open && "rotate-45",
            )}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="pb-10">
              <Hairline className="mb-8" />
              <div className="grid gap-8 md:grid-cols-3">
                <div>
                  <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
                    The problem
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-mute">{project.problem}</p>
                </div>
                <div>
                  <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
                    The build
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-mute">{project.build}</p>
                </div>
                <div>
                  <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
                    The result
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-mute">{project.result}</p>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <Chip key={tech}>{tech}</Chip>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Work() {
  return (
    <Section id="work">
      <Eyebrow>04 — Selected work</Eyebrow>
      <h2 className="mt-4 font-display text-[clamp(2rem,3.5vw,3rem)] font-medium tracking-[-0.035em] text-bone">
        Systems I&apos;ve shipped.
      </h2>

      <div className="mt-12 border-t border-line">
        {projects.map((project) => (
          <WorkRow key={project.index} project={project} />
        ))}
      </div>
    </Section>
  );
}
