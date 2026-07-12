export interface LogLine {
  time: string;
  tag: string;
  detail: string;
  final?: boolean;
}

// A mock, not live data — a designed artefact of one real workflow.
export const systemLog: LogLine[] = [
  { time: "09:00:04", tag: "trigger", detail: "cron/hourly · WAT quiet-hours ok" },
  { time: "09:00:04", tag: "sheets", detail: "fetched 214 rows" },
  { time: "09:00:05", tag: "filter", detail: "12 loans due in 72h" },
  { time: "09:00:06", tag: "paystack", detail: "generated 12 payment links" },
  { time: "09:00:07", tag: "telegram", detail: "sent 12 · inline buttons attached" },
  { time: "09:00:09", tag: "gmail", detail: "sent 12 · HTML receipt template" },
  { time: "09:00:09", tag: "done", detail: "9.4s · 0 errors · ₦4.2M outstanding", final: true },
];
