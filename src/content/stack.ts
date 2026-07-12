export type StackCategory =
  | "Automation"
  | "AI/LLM"
  | "Backend"
  | "Comms"
  | "Data";

export interface StackGroup {
  category: StackCategory;
  items: string[];
}

export const stack: StackGroup[] = [
  {
    category: "Automation",
    items: ["n8n", "Zapier", "Make"],
  },
  {
    category: "AI/LLM",
    items: ["OpenAI GPT-4o", "Claude", "LangChain"],
  },
  {
    category: "Backend",
    items: ["Node.js", "TypeScript", "Supabase", "PostgreSQL"],
  },
  {
    category: "Comms",
    items: ["Twilio", "WATI (WhatsApp)", "Telegram Bot API", "Gmail API"],
  },
  {
    category: "Data",
    items: ["Google Sheets", "Airtable", "Paystack", "Stripe"],
  },
];
