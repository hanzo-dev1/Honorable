export type Act = "IDENTITY" | "CONTEXT" | "THE WORK";

export type StepType =
  | "welcome"
  | "text"
  | "email"
  | "tel"
  | "choice"
  | "longtext"
  | "end";

export type ValidateKind = "email" | "phone" | "handle";

export interface ChoiceOption {
  key: string;
  value: string;
  label: string;
}

export type Answers = Record<string, string>;

export interface Step {
  id: string;
  type: StepType;
  act?: Act;
  required?: boolean;
  title?: string;
  helper?: string;
  placeholder?: string;
  validate?: ValidateKind;
  minLength?: number;
  options?: ChoiceOption[];
  cta?: string;
  /** Explicit branch resolver. Falls back to the next array entry when absent. */
  next?: (answers: Answers) => string;
}

export const FLOW: Step[] = [
  {
    id: "welcome",
    type: "welcome",
    title: "Let's see what we can automate.",
    helper: "Nine questions. About ninety seconds.",
    cta: "Start",
  },

  // ── ACT I · IDENTITY ──────────────────────────────
  {
    id: "name",
    type: "text",
    act: "IDENTITY",
    required: true,
    title: "First, who am I talking to?",
  },
  {
    id: "email",
    type: "email",
    act: "IDENTITY",
    required: true,
    title: "Where do I send the plan?",
    validate: "email",
  },
  {
    id: "channel",
    type: "choice",
    act: "IDENTITY",
    required: true,
    title: "Best way to reach you?",
    options: [
      { key: "A", value: "email", label: "Email — the one above" },
      { key: "B", value: "whatsapp", label: "WhatsApp" },
      { key: "C", value: "telegram", label: "Telegram" },
      { key: "D", value: "call", label: "Just call me" },
    ],
    next: (a) => {
      const v = a.channel;
      if (!v || v === "email") return "role";
      return `contact_${v}`;
    },
  },
  {
    id: "contact_whatsapp",
    type: "tel",
    act: "IDENTITY",
    required: true,
    title: "What's the number?",
    helper: "Include the country code.",
    placeholder: "+234 …",
    validate: "phone",
    next: () => "role",
  },
  {
    id: "contact_telegram",
    type: "text",
    act: "IDENTITY",
    required: true,
    title: "What's your handle?",
    placeholder: "@…",
    validate: "handle",
    next: () => "role",
  },
  {
    id: "contact_call",
    type: "tel",
    act: "IDENTITY",
    required: true,
    title: "What number should I ring?",
    helper: "Include the country code.",
    placeholder: "+234 …",
    validate: "phone",
    next: () => "role",
  },

  // ── ACT II · CONTEXT ──────────────────────────────
  {
    id: "role",
    type: "text",
    act: "CONTEXT",
    required: true,
    title: "What's your seat at the table?",
    helper: "Founder, ops lead, agency owner — whatever fits.",
  },
  {
    id: "has_company",
    type: "choice",
    act: "CONTEXT",
    required: true,
    title: "Do you have a company?",
    options: [
      { key: "A", value: "yes", label: "Yes" },
      { key: "B", value: "no", label: "Not yet — it's just me" },
    ],
    next: (a) => (a.has_company === "yes" ? "company" : "source"),
  },
  {
    id: "company",
    type: "text",
    act: "CONTEXT",
    required: true,
    title: "What's it called?",
    next: () => "source",
  },
  {
    id: "source",
    type: "choice",
    act: "CONTEXT",
    required: true,
    title: "Where did you find me?",
    options: [
      { key: "A", value: "linkedin", label: "LinkedIn" },
      { key: "B", value: "social", label: "Social — Instagram, TikTok, X" },
      { key: "C", value: "youtube", label: "YouTube" },
      { key: "D", value: "ai", label: "AI — ChatGPT, Claude, Perplexity" },
      { key: "E", value: "referral", label: "A friend told me" },
      { key: "F", value: "podcast", label: "Podcast" },
      { key: "G", value: "event", label: "Event" },
      { key: "H", value: "google", label: "Google" },
    ],
  },

  // ── ACT III · THE WORK ────────────────────────────
  {
    id: "budget",
    type: "choice",
    act: "THE WORK",
    required: true,
    title: "What are you working with?",
    options: [
      { key: "A", value: "lt150k", label: "Under ₦150k" },
      { key: "B", value: "150-500k", label: "₦150k – ₦500k" },
      { key: "C", value: "500k-1.5m", label: "₦500k – ₦1.5M" },
      { key: "D", value: "gt1.5m", label: "₦1.5M+" },
      { key: "E", value: "unsure", label: "Not sure — tell me what it should cost" },
    ],
  },
  {
    id: "bottleneck",
    type: "longtext",
    act: "THE WORK",
    required: true,
    title: "What do you want to automate?",
    helper: "The thing that eats your week. Be specific — it's the whole point.",
    minLength: 12,
  },
  {
    id: "experience",
    type: "choice",
    act: "THE WORK",
    required: true,
    title: "Have you automated anything before?",
    options: [
      { key: "A", value: "yes", label: "Yes — some of it works" },
      { key: "B", value: "no", label: "No. Starting from zero." },
    ],
    next: () => "thanks",
  },

  { id: "thanks", type: "end" },
];

const FLOW_BY_ID = new Map(FLOW.map((step) => [step.id, step]));

export function getStep(id: string): Step | undefined {
  return FLOW_BY_ID.get(id);
}

/** Explicit branch resolver when present, else the next array entry. */
export function resolveNext(id: string, answers: Answers): string {
  const idx = FLOW.findIndex((s) => s.id === id);
  const step = FLOW[idx];
  if (!step) return "thanks";
  if (step.next) return step.next(answers);
  return FLOW[idx + 1]?.id ?? "thanks";
}

const FIRST_QUESTION_ID = FLOW[1].id;

/** Walks the flow from the first real question to "thanks" given the answers
 * known so far, counting only steps actually on that path. Unanswered branch
 * points resolve to their default (shorter) path until answered, so this
 * naturally grows from 9 to up to 11 as the user actually branches. */
export function computeTotal(answers: Answers): number {
  let id = FIRST_QUESTION_ID;
  let count = 0;
  const seen = new Set<string>();
  while (id !== "thanks" && !seen.has(id)) {
    seen.add(id);
    count++;
    id = resolveNext(id, answers);
  }
  return count;
}

/** 1-based position of `currentId` along the same walked path. */
export function computeIndex(currentId: string, answers: Answers): number {
  let id = FIRST_QUESTION_ID;
  let index = 0;
  const seen = new Set<string>();
  while (id !== currentId && id !== "thanks" && !seen.has(id)) {
    seen.add(id);
    index++;
    id = resolveNext(id, answers);
  }
  return index + 1;
}

export const ACTS: Act[] = ["IDENTITY", "CONTEXT", "THE WORK"];

/** Ordered list of question ids on the path implied by `answers`, from the
 * first real question up to (not including) "thanks". Same walk as
 * computeTotal/computeIndex, but returns the ids for rendering the rail. */
export function walkPath(answers: Answers): string[] {
  let id = FIRST_QUESTION_ID;
  const ids: string[] = [];
  const seen = new Set<string>();
  while (id !== "thanks" && !seen.has(id)) {
    seen.add(id);
    ids.push(id);
    id = resolveNext(id, answers);
  }
  return ids;
}
