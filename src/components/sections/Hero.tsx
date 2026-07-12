"use client";

import { motion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { projects } from "@/content/projects";

const nodes = [
  { id: "n1", x: 90, y: 220, color: "var(--accent)", pulse: false },
  { id: "n2", x: 300, y: 120, color: "var(--accent-secondary)", pulse: false },
  { id: "n3", x: 300, y: 320, color: "var(--accent-secondary)", pulse: false },
  { id: "n4", x: 540, y: 220, color: "var(--accent)", pulse: true },
  { id: "n5", x: 780, y: 110, color: "var(--accent-secondary)", pulse: false },
  { id: "n6", x: 780, y: 330, color: "var(--accent-secondary)", pulse: false },
  { id: "n7", x: 1010, y: 220, color: "var(--accent)", pulse: true },
];

const edges: [string, string][] = [
  ["n1", "n2"],
  ["n1", "n3"],
  ["n2", "n4"],
  ["n3", "n4"],
  ["n4", "n5"],
  ["n4", "n6"],
  ["n5", "n7"],
  ["n6", "n7"],
];

const nodeById = Object.fromEntries(nodes.map((n) => [n.id, n]));

function WorkflowGraph() {
  return (
    <svg
      viewBox="0 0 1100 440"
      fill="none"
      className="h-full w-full"
      style={{
        maskImage:
          "radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 85%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 85%)",
      }}
      aria-hidden="true"
    >
      {edges.map(([fromId, toId], i) => {
        const from = nodeById[fromId];
        const to = nodeById[toId];
        return (
          <motion.line
            key={`${fromId}-${toId}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="var(--border)"
            strokeWidth={1.5}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3 + i * 0.15, ease: "easeInOut" }}
          />
        );
      })}

      {nodes.map((node, i) => (
        <motion.g
          key={node.id}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            delay: 0.5 + i * 0.15,
            ease: "easeOut",
          }}
          style={{ transformOrigin: `${node.x}px ${node.y}px` }}
        >
          <rect
            x={node.x - 22}
            y={node.y - 16}
            width={44}
            height={32}
            rx={8}
            fill="var(--surface)"
            stroke={node.color}
            strokeWidth={1.5}
          />
          {node.pulse && (
            <motion.rect
              x={node.x - 22}
              y={node.y - 16}
              width={44}
              height={32}
              rx={8}
              fill={node.color}
              initial={{ opacity: 0.35 }}
              animate={{ opacity: [0.35, 0, 0.35] }}
              transition={{
                duration: 2.2,
                delay: 1.6 + i * 0.15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </motion.g>
      ))}
    </svg>
  );
}

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function Hero() {
  const stats = projects.map((p) => p.metrics[0]);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <WorkflowGraph />
      </div>

      <Container className="relative flex flex-col items-center text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          <motion.div variants={item}>
            <Badge>AI Automation Engineer · Lagos, NG</Badge>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-8 max-w-4xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-7xl"
          >
            I build <span className="gradient-word">systems</span> that run
            your business while you sleep.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-lg text-muted"
          >
            David Oganah — founder of SabiFlow. I design production-grade
            automation for revenue, operations, and customer workflows using
            n8n, GPT-4o, and the modern LLM stack.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Button href="#work" variant="primary">
              See recent work
            </Button>
            <Button href="#contact" variant="ghost">
              Book a call
            </Button>
          </motion.div>

          <motion.div
            variants={container}
            className="mt-16 grid grid-cols-2 gap-8 border-t border-border pt-8 sm:grid-cols-4"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={item}
                className="flex flex-col items-center gap-1"
              >
                <span className="font-display text-2xl text-foreground">
                  {stat.value}
                </span>
                <span className="text-center font-mono text-xs uppercase tracking-wider text-muted">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
