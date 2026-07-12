export interface Service {
  id: string;
  title: string;
  description: string;
  outcomes: string[];
  icon: string;
}

export const services: Service[] = [
  {
    id: "cold-outreach-systems",
    title: "Cold Outreach Systems",
    description:
      "Sends cold email at scale across rotating mailboxes without tripping spam filters. Every message is personalized by AI and guarded by deliverability checks before it ever reaches an inbox.",
    outcomes: [
      "Multi-mailbox rotation with warmup-safe sending limits",
      "GPT-4o-mini personalization per lead, not per template",
      "Bounce, spam-trap, and reputation monitoring built in",
    ],
    icon: "Send",
  },
  {
    id: "ai-voice-chat-agents",
    title: "AI Voice & Chat Agents",
    description:
      "Captures inbound leads and support requests directly from Telegram and WhatsApp, no app download required. GPT-4o extracts structured data from free-form voice and text, escalating to a human the moment a conversation needs judgment.",
    outcomes: [
      "Voice-note transcription and structured field extraction",
      "Context-aware handoff to a human when confidence drops",
      "Single intake pipeline across Telegram and WhatsApp",
    ],
    icon: "MessageCircle",
  },
  {
    id: "receivables-payment-automation",
    title: "Receivables & Payment Automation",
    description:
      "Turns Paystack and Stripe webhooks into a live view of who owes what, automatically. Suspicious payment patterns get flagged before they become chargebacks, while reminder sequences chase down late invoices without manual follow-up.",
    outcomes: [
      "Real-time payment confirmation from webhook events",
      "Rule-based fraud flags on anomalous transactions",
      "Automated reminder cadence tied to invoice age",
    ],
    icon: "Receipt",
  },
  {
    id: "internal-ops-automation",
    title: "Internal Ops Automation",
    description:
      "Wires together the tools a team already uses — Sheets, CRMs, Slack, email — into n8n workflows that move data without copy-paste. Built for teams that need reliability over cleverness, with clear failure alerts instead of silent drops.",
    outcomes: [
      "Two-way sync between Sheets and CRM records",
      "Slack alerts on workflow failure, not silent drops",
      "Custom triggers for approvals, escalations, reporting",
    ],
    icon: "Workflow",
  },
];
