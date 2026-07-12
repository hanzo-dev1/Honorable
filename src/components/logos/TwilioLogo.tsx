export function TwilioLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9.5" />
      <circle cx="9" cy="9" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="15" cy="9" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="9" cy="15" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="15" cy="15" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}
