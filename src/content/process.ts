export interface ProcessStep {
  numeral: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    numeral: "01",
    title: "Diagnose",
    description:
      "Map the workflow as it actually runs today — the spreadsheets, the copy-paste, the person who quietly holds it together. Find where automation pays for itself first.",
  },
  {
    numeral: "02",
    title: "Architect",
    description:
      "Design the system on paper before a single node gets built: triggers, data flow, failure modes, and exactly where a human stays in the loop.",
  },
  {
    numeral: "03",
    title: "Build",
    description:
      "Ship in n8n against real data from day one, not a demo environment. Weekly checkpoints, no black-box handoff at the end.",
  },
  {
    numeral: "04",
    title: "Hand Over",
    description:
      "You own the infrastructure, the keys, and the data outright. Documentation and a walkthrough included — no retainer required to keep it running.",
  },
];
