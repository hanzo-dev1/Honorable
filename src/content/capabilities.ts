import type { LucideIcon } from "lucide-react";
import { Bot, Banknote, Database, Workflow } from "lucide-react";

export interface Capability {
  name: string;
  icon: LucideIcon;
  description: string;
  engagement: string;
}

export const capabilities: Capability[] = [
  {
    name: "Autonomous Agents",
    icon: Bot,
    description:
      "Agents that qualify leads, book calls, and answer support with your data. Not chatbots — they take actions.",
    engagement: "Typical engagement: 2–4 weeks",
  },
  {
    name: "Revenue Automation",
    icon: Banknote,
    description:
      "Invoicing, dunning, reconciliation, and collections. The money workflows nobody wants to own.",
    engagement: "Typical engagement: 2–4 weeks",
  },
  {
    name: "RAG & Knowledge Systems",
    icon: Database,
    description:
      "Your docs, your tone, vector-indexed. Answers grounded in what's actually true.",
    engagement: "Typical engagement: 2–4 weeks",
  },
  {
    name: "Systems Integration",
    icon: Workflow,
    description:
      "n8n pipelines that make your existing tools behave like one product.",
    engagement: "Typical engagement: 2–4 weeks",
  },
];
