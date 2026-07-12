"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { projects } from "@/content/projects";

export function Work() {
  return (
    <Section id="work" eyebrow="04 — Selected Work" title="Systems I've shipped.">
      <div className="flex flex-col gap-8">
        {projects.map((project, i) => {
          const metrics = [
            ...project.metrics,
            { label: "Shipped", value: String(project.year) },
          ].slice(0, 4);

          return (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
              className="group rounded-3xl border border-border p-8 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[0_20px_50px_-20px_rgba(255,107,44,0.25)] md:p-10"
            >
              <div className="flex flex-col gap-10 md:flex-row md:justify-between">
                <div className="md:w-[58%]">
                  <span className="font-mono text-xs uppercase tracking-wider text-muted">
                    {project.year}
                  </span>
                  <h3 className="mt-3 font-display text-3xl text-foreground md:text-4xl">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-muted">{project.tagline}</p>

                  <div className="mt-8 space-y-5">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-wider text-accent">
                        Problem
                      </p>
                      <p className="mt-2 text-sm text-muted">
                        {project.problem}
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-xs uppercase tracking-wider text-accent-secondary">
                        Solution
                      </p>
                      <p className="mt-2 text-sm text-muted">
                        {project.solution}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-surface p-6 md:w-[38%]">
                  <div className="grid grid-cols-2 gap-6">
                    {metrics.map((metric) => (
                      <div key={metric.label} className="flex flex-col gap-1">
                        <span className="font-display text-3xl text-foreground">
                          {metric.value}
                        </span>
                        <span className="font-mono text-xs uppercase tracking-wider text-muted">
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
}
