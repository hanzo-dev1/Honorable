export function PineconeLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2 8 6.5h8Z" />
      <path d="M12 6 7 11h10Z" opacity="0.85" />
      <path d="M12 10.4 5.5 16.2h13Z" opacity="0.7" />
      <rect x="11.1" y="16.6" width="1.8" height="5.4" rx="0.6" />
    </svg>
  );
}
