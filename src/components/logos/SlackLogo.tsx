export function SlackLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <rect x="9.2" y="2" width="3" height="8" rx="1.5" />
      <rect x="14" y="9.2" width="8" height="3" rx="1.5" />
      <rect x="11.8" y="14" width="3" height="8" rx="1.5" />
      <rect x="2" y="11.8" width="8" height="3" rx="1.5" />
    </svg>
  );
}
