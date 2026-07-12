import {
  Check,
  MessageCircle,
  Receipt,
  Send,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { services } from "@/content/services";

const iconMap: Record<string, LucideIcon> = {
  Send,
  MessageCircle,
  Receipt,
  Workflow,
};

export function Services() {
  return (
    <Section id="services" eyebrow="02 — Services" title="What I actually build.">
      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service) => {
          const Icon = iconMap[service.icon] ?? Workflow;

          return (
            <div
              key={service.id}
              className="group rounded-2xl border border-border bg-surface/40 p-8 transition-colors duration-300 hover:border-accent/60"
            >
              <Icon className="h-6 w-6 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />

              <h3 className="mt-6 font-display text-xl text-foreground">
                {service.title}
              </h3>
              <p className="mt-3 text-sm text-muted">{service.description}</p>

              <div className="my-6 border-t border-border" />

              <ul className="space-y-2.5">
                {service.outcomes.map((outcome) => (
                  <li
                    key={outcome}
                    className="flex items-start gap-2 font-mono text-xs text-muted"
                  >
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
