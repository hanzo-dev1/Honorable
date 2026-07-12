export interface Metric {
  value: string;
  label: string;
}

// TODO(david): replace with numbers you can defend in a sales call.
// Fabricated metrics are the fastest way to lose an enterprise deal.
// If you don't have four, ship three — three real numbers beat four invented ones.
export const metrics: Metric[] = [
  { value: "NGN 18M+", label: "Recovered via automation" },
  { value: "40+", label: "Workflows shipped" },
  { value: "99.2%", label: "Uptime across deploys" },
  { value: "<30 days", label: "To first value" },
];
