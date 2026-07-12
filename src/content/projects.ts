export interface Metric {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  problem: string;
  solution: string;
  stack: string[];
  metrics: Metric[];
  year: number;
}

export const projects: Project[] = [
  {
    slug: "sabicollect",
    title: "SabiCollect",
    tagline: "B2B receivables recovery, on autopilot.",
    problem:
      "B2B companies lose weeks of cash flow chasing overdue invoices manually across email, WhatsApp, and spreadsheets, with no visibility into who's about to default.",
    solution:
      "SabiCollect centralizes receivables into automated reminder and escalation sequences, tracks payment status via webhook confirmation, and surfaces risk before invoices go delinquent.",
    stack: [
      "Next.js",
      "n8n",
      "Supabase",
      "PostgreSQL",
      "Paystack",
      "WhatsApp API",
    ],
    metrics: [
      { label: "Recovery rate lift", value: "+38%" },
      { label: "Manual follow-up time", value: "-70%" },
      { label: "Invoices tracked", value: "12,000+" },
    ],
    year: 2025,
  },
  {
    slug: "loan-management-system",
    title: "Loan Management System",
    tagline: "Three n8n workflows running an entire loan desk.",
    problem:
      "A lending operation needed repayment reminders, fraud-aware payment confirmation, and loan applications handled without hiring a full ops team.",
    solution:
      "Built three interlocking n8n workflows: automated repayment reminders, webhook-driven payment confirmation with fraud detection, and a Telegram voice-intake bot that captures loan applications hands-free.",
    stack: ["n8n", "Telegram Bot API", "GPT-4o", "PostgreSQL", "Paystack"],
    metrics: [
      { label: "Workflows in production", value: "3" },
      { label: "Applications auto-processed", value: "90%+" },
      { label: "Fraud flags caught pre-disbursement", value: "100%" },
    ],
    year: 2025,
  },
  {
    slug: "cold-outreach-engine",
    title: "Cold Outreach Engine",
    tagline: "A 17-node workflow that writes and tests its own subject lines.",
    problem:
      "Generic cold email blasts were getting ignored, and manually A/B testing subject lines across campaigns didn't scale.",
    solution:
      "A 17-node n8n workflow personalizes every message with GPT-4o-mini, sends through rotating Gmail accounts, and runs an epsilon-greedy bandit to continuously shift traffic toward winning subject lines.",
    stack: ["n8n", "GPT-4o-mini", "Gmail API", "Google Sheets"],
    metrics: [
      { label: "Workflow nodes", value: "17" },
      { label: "Open rate improvement", value: "+24%" },
      { label: "Subject lines tested per campaign", value: "8+" },
    ],
    year: 2024,
  },
  {
    slug: "sabiflow-agency",
    title: "SabiFlow Agency",
    tagline: "The automation studio behind the systems.",
    problem:
      "Clients needed a single operator who could design, build, and maintain automation systems end-to-end, not just hand off a workflow diagram.",
    solution:
      "SabiFlow Agency packages automation strategy, n8n/AI engineering, and ongoing maintenance into one engagement, with SabiCollect and the loan and outreach systems as proof of delivery.",
    stack: ["n8n", "Next.js", "OpenAI", "Supabase", "Twilio"],
    metrics: [
      { label: "Systems shipped", value: "10+" },
      { label: "Client retention", value: "90%+" },
      { label: "Avg. time to first workflow", value: "< 2 weeks" },
    ],
    year: 2024,
  },
];
