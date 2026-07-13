"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { LeadFormOverlay } from "./LeadFormOverlay";

interface LeadFormContextValue {
  open: () => void;
}

const LeadFormContext = createContext<LeadFormContextValue | null>(null);

export function LeadFormProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <LeadFormContext.Provider value={{ open }}>
      {children}
      <LeadFormOverlay isOpen={isOpen} onClose={close} />
    </LeadFormContext.Provider>
  );
}

export function useLeadFormOverlay() {
  const ctx = useContext(LeadFormContext);
  if (!ctx) {
    throw new Error("useLeadFormOverlay must be used within a LeadFormProvider");
  }
  return ctx;
}
