"use client";

import { useLeadFormOverlay } from "./LeadFormProvider";

interface LeadFormTriggerProps {
  className?: string;
  children: React.ReactNode;
  onBeforeOpen?: () => void;
}

export function LeadFormTrigger({ className, children, onBeforeOpen }: LeadFormTriggerProps) {
  const { open } = useLeadFormOverlay();
  return (
    <button
      type="button"
      onClick={() => {
        onBeforeOpen?.();
        open();
      }}
      className={className}
    >
      {children}
    </button>
  );
}
