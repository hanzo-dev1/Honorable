"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Check, Copy, Mail, Send } from "lucide-react";
import { Section } from "@/components/ui/Section";

const email = "david@davidoganah.com";

const contactMethods = [
  {
    label: "Email",
    value: email,
    href: `mailto:${email}`,
    icon: Mail,
    copyable: true,
  },
  {
    label: "Telegram",
    value: "@davidoganah",
    href: "https://t.me/davidoganah",
    icon: Send,
    copyable: false,
  },
  {
    label: "Calendar",
    value: "Book a 20-min call",
    href: "https://cal.com/davidoganah",
    icon: Calendar,
    copyable: false,
  },
];

const checklist = [
  "What manual process is eating your time",
  "Which tools you already use",
  "Rough budget & timeline",
];

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Email address copied" : "Copy email address"}
      className="rounded-full border border-border p-2 text-muted transition-colors hover:border-accent/60 hover:text-accent"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-success" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </button>
  );
}

export function Contact() {
  return (
    <Section id="contact" eyebrow="06 — Contact">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="grid gap-12 md:grid-cols-2 md:gap-16"
      >
        <div>
          <h2 className="font-display text-4xl leading-[1.1] tracking-tight text-foreground md:text-5xl">
            Have a workflow that&apos;s costing you hours? Let&apos;s
            automate it.
          </h2>

          <div className="mt-10">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              return (
                <div
                  key={method.label}
                  className="flex items-center justify-between gap-4 border-b border-border py-4 last:border-0"
                >
                  <a
                    href={method.href}
                    target={method.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      method.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex items-center gap-3 font-mono text-sm text-foreground transition-colors hover:text-accent"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-accent" />
                    <span className="text-muted">{method.label}</span>
                    <span>{method.value}</span>
                  </a>
                  {method.copyable && <CopyButton value={method.value} />}
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-8">
          <h3 className="font-display text-xl text-foreground">
            What to include in your first message
          </h3>
          <ul className="mt-6 space-y-3">
            {checklist.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 font-mono text-sm text-muted"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      <div className="mt-16 border-t border-border pt-6 text-center font-mono text-xs uppercase tracking-wider text-muted">
        Response time: within 24 hours · WAT (GMT+1)
      </div>
    </Section>
  );
}
