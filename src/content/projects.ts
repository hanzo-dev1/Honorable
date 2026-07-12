export interface Project {
  index: string;
  name: string;
  descriptor: string;
  stack: string[];
  outcome: string;
  problem: string;
  build: string;
  result: string;
}

// TODO(david): the outcome metrics below must be numbers you can defend
// in a sales call. Replace or delete anything you can't stand behind.
export const projects: Project[] = [
  {
    index: "01",
    name: "SabiCollect",
    descriptor: "B2B receivables recovery, on autopilot",
    stack: ["n8n", "GPT-4o", "Paystack", "Sheets"],
    outcome: "Cuts DSO by 40%",
    problem:
      "B2B companies lose weeks of cash flow chasing overdue invoices manually across email, WhatsApp, and spreadsheets, with no visibility into who's about to default.",
    build:
      "Centralized receivables into automated reminder and escalation sequences, tracked payment status via Paystack webhook confirmation, and surfaced risk before invoices went delinquent.",
    result:
      "Recovery rate lift of 38%, manual follow-up time cut 70% across 12,000+ tracked invoices.",
  },
  {
    index: "02",
    name: "SabiDesk",
    descriptor: "RAG support agent across WhatsApp + Telegram",
    stack: ["Supabase pgvector", "OpenAI", "WATI"],
    outcome: "<2s median reply",
    problem:
      "Support volume outgrew a two-person team, and canned replies couldn't handle policy questions grounded in the company's actual documentation.",
    build:
      "Indexed the knowledge base into Supabase pgvector, wired retrieval-augmented replies through OpenAI, and deployed across WhatsApp and Telegram with the same conversation memory.",
    result:
      "Median reply time under 2 seconds, with escalation to a human only when confidence drops below threshold.",
  },
  {
    index: "03",
    name: "Sabi Front-Desk",
    descriptor: "Autonomous lead qualification + booking",
    stack: ["Gemini", "Calendar", "Telegram"],
    outcome: "24/7, zero staff",
    problem:
      "Inbound leads arrived at all hours and sat unqualified for days before anyone followed up, costing the client its best-fit prospects.",
    build:
      "An agent that qualifies leads against a scoring rubric, answers objections from a grounded knowledge base, and books directly into Calendar without a human in the loop.",
    result:
      "Full-time coverage with zero added headcount and qualified leads booked within minutes of first contact.",
  },
  {
    index: "04",
    name: "Loan Reminder Engine",
    descriptor: "Duration-aware collections for a lender",
    stack: ["n8n", "Paystack", "Gmail", "Telegram"],
    outcome: "Unattended since March",
    problem:
      "A lending operation needed repayment reminders and fraud-aware payment confirmation handled without hiring a full ops team.",
    build:
      "Three interlocking n8n workflows: automated repayment reminders scaled to days-past-due, webhook-driven payment confirmation with fraud detection, and receipt delivery over Gmail and Telegram.",
    result:
      "Running unattended since March with zero missed reminder cycles and 100% of fraud flags caught pre-disbursement.",
  },
  {
    index: "05",
    name: "Cold Outreach Engine",
    descriptor: "Persona-scored outbound at volume",
    stack: ["GPT-4o-mini", "Gmail", "Sheets"],
    outcome: "17-node pipeline",
    problem:
      "Generic cold email blasts were getting ignored, and manually A/B testing subject lines across campaigns didn't scale.",
    build:
      "A 17-node n8n workflow personalizes every message with GPT-4o-mini, sends through rotating Gmail accounts, and runs an epsilon-greedy bandit to shift traffic toward winning subject lines.",
    result:
      "Open rate improved 24% with 8+ subject line variants tested per campaign, no manual intervention.",
  },
];
