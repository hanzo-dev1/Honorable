import type { Step } from "./flow";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9\s()-]{7,}$/;
const HANDLE_RE = /^@?[a-zA-Z0-9_]{2,}$/;

export function validateStep(step: Step, value: string): string | null {
  const trimmed = value.trim();

  if (step.type === "choice") {
    return trimmed ? null : "Pick one to continue.";
  }

  if (step.required && !trimmed) {
    return "This one's required.";
  }

  if (step.type === "longtext" && step.minLength && trimmed.length < step.minLength) {
    return `A little more detail — ${step.minLength} characters minimum.`;
  }

  switch (step.validate) {
    case "email":
      return EMAIL_RE.test(trimmed) ? null : "Doesn't look like a valid email.";
    case "phone":
      return PHONE_RE.test(trimmed) ? null : "Include the country code, digits only otherwise.";
    case "handle":
      return HANDLE_RE.test(trimmed) ? null : "Just the handle — letters, numbers, underscores.";
    default:
      return null;
  }
}
