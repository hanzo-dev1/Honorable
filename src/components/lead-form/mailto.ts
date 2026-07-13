import type { LeadPayload } from "./useLeadForm";
import { contact } from "@/lib/site";

export function buildMailtoHref(payload: LeadPayload): string {
  const lines = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Preferred channel: ${payload.channel} (${payload.handle})`,
    `Role: ${payload.role}`,
    `Company: ${payload.has_company ? payload.company : "—"}`,
    `Found via: ${payload.source}`,
    `Budget: ${payload.budget}`,
    `Automated before: ${payload.experience}`,
    "",
    "What they want to automate:",
    payload.bottleneck,
  ];

  const subject = `Automation enquiry — ${payload.name || "new lead"}`;
  const body = lines.join("\n");

  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
