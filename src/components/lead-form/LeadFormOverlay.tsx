"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronUp, X } from "lucide-react";
import { computeIndex, getStep } from "./flow";
import { useLeadForm, buildPayload, type LeadPayload } from "./useLeadForm";
import { buildMailtoHref } from "./mailto";
import { QuestionField } from "./QuestionField";
import { WorkflowRail } from "./WorkflowRail";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { cn } from "@/lib/utils";

const EXIT_MS = 420;
const EXIT_ACT_MS = 600;
const CHOICE_ADVANCE_DELAY = 250;

interface LeadFormOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

type Phase = "idle" | "exit" | "enter";

export function LeadFormOverlay({ isOpen, onClose }: LeadFormOverlayProps) {
  const form = useLeadForm();
  const reducedMotion = usePrefersReducedMotion();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const fieldRef = useRef<HTMLElement>(null);
  const welcomeButtonRef = useRef<HTMLButtonElement>(null);

  const [displayedId, setDisplayedId] = useState(form.currentId);
  const [phase, setPhase] = useState<Phase>("idle");
  const [isActChange, setIsActChange] = useState(false);
  const [draft, setDraft] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [eyebrowChars, setEyebrowChars] = useState(0);
  const [visible, setVisible] = useState(false);

  const choiceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const submittedRef = useRef(false);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const displayedStep = getStep(displayedId) ?? getStep("welcome")!;

  // ── open / close ────────────────────────────────────────────────
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      previouslyFocused.current = document.activeElement as HTMLElement;
      form.reset();
      setDisplayedId("welcome");
      setPhase("idle");
      submittedRef.current = false;
      setHoneypot("");
      if (!dialog.open) dialog.showModal();
      requestAnimationFrame(() => setVisible(true));
      document.body.style.overflow = "hidden";
    } else {
      setVisible(false);
      document.body.style.overflow = "";
      const t = setTimeout(() => {
        if (dialog.open) dialog.close();
        previouslyFocused.current?.focus?.();
      }, reducedMotion ? 0 : 200);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleDialogClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // ── step transition choreography ───────────────────────────────
  useEffect(() => {
    if (form.currentId === displayedId) return;

    const prevAct = getStep(displayedId)?.act;
    const nextAct = getStep(form.currentId)?.act;
    const actChange = prevAct !== nextAct;

    if (reducedMotion) {
      setDisplayedId(form.currentId);
      setPhase("idle");
      return;
    }

    setIsActChange(actChange);
    setPhase("exit");
    const t = setTimeout(
      () => {
        setDisplayedId(form.currentId);
        setPhase("enter");
      },
      actChange ? EXIT_ACT_MS : EXIT_MS,
    );
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.currentId]);

  useEffect(() => {
    if (phase !== "enter") return;
    const t = setTimeout(() => setPhase("idle"), reducedMotion ? 0 : 420);
    return () => clearTimeout(t);
  }, [phase, reducedMotion]);

  // ── draft rehydration + autofocus per step ─────────────────────
  useEffect(() => {
    setDraft(form.answers[displayedId] ?? "");
    const t = setTimeout(() => {
      if (displayedStep.type === "welcome") {
        welcomeButtonRef.current?.focus();
      } else if (fieldRef.current) {
        fieldRef.current.focus();
      } else {
        // No dedicated field (e.g. the "end" screen) — keep focus inside
        // the dialog so it never falls back to the unmounted previous
        // field's parent and escapes the modal's keydown handler.
        dialogRef.current?.focus();
      }
    }, reducedMotion ? 0 : 30);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayedId]);

  // ── eyebrow typing effect on act change ─────────────────────────
  useEffect(() => {
    const act = displayedStep.act;
    if (!act) return;
    if (!isActChange || phase !== "enter" || reducedMotion) {
      setEyebrowChars(act.length);
      return;
    }
    setEyebrowChars(0);
    let i = 0;
    const step = Math.max(20, Math.floor(400 / act.length));
    const interval = setInterval(() => {
      i++;
      setEyebrowChars(i);
      if (i >= act.length) clearInterval(interval);
    }, step);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayedId, phase]);

  // ── submission ──────────────────────────────────────────────────
  const [payload, setPayload] = useState<LeadPayload | null>(null);

  const submitForm = useCallback(async () => {
    form.dispatch({ type: "SUBMITTING" });
    const built = buildPayload(form.answers, form.path, form.startedAt);
    setPayload(built);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...built, honeypot }),
      });
      if (!res.ok) throw new Error("submit_failed");
      form.dispatch({ type: "SUBMITTED" });
    } catch {
      form.dispatch({ type: "SUBMIT_FAILED" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.answers, form.path, form.startedAt, honeypot]);

  useEffect(() => {
    if (displayedId === "thanks" && form.status === "active" && !submittedRef.current) {
      submittedRef.current = true;
      submitForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayedId, form.status]);

  // ── commit / choice select ──────────────────────────────────────
  const commitCurrentValue = useCallback(() => {
    if (phase === "exit") return;
    form.advance(draft);
  }, [draft, form, phase]);

  const handleChoiceSelect = useCallback(
    (value: string) => {
      if (phase === "exit") return;
      setDraft(value);
      if (choiceTimeout.current) clearTimeout(choiceTimeout.current);
      choiceTimeout.current = setTimeout(
        () => form.advance(value),
        reducedMotion ? 0 : CHOICE_ADVANCE_DELAY,
      );
    },
    [form, phase, reducedMotion],
  );

  useEffect(() => () => {
    if (choiceTimeout.current) clearTimeout(choiceTimeout.current);
  }, []);

  // ── keyboard ─────────────────────────────────────────────────────
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (phase === "exit") {
        e.preventDefault();
        return;
      }

      if (e.key === "Tab" && e.shiftKey) {
        if (form.path.length > 1) {
          e.preventDefault();
          form.back();
        }
        return;
      }

      if (e.key === "Enter") {
        if (displayedStep.type === "longtext") {
          if (e.metaKey || e.ctrlKey) {
            e.preventDefault();
            commitCurrentValue();
          }
          return;
        }
        if (displayedStep.type !== "choice") {
          e.preventDefault();
          commitCurrentValue();
        }
        return;
      }

      if (displayedStep.type === "choice" && displayedStep.options) {
        const key = e.key.toUpperCase();
        const option = displayedStep.options.find((o) => o.key === key);
        if (option) {
          e.preventDefault();
          handleChoiceSelect(option.value);
        }
      }
    },
    [phase, displayedStep, commitCurrentValue, handleChoiceSelect, form],
  );

  const index =
    displayedId === "welcome"
      ? 0
      : displayedId === "thanks"
        ? form.total
        : computeIndex(displayedId, form.answers);
  const showProgress = displayedStep.type !== "welcome" && displayedStep.type !== "end";
  const progressPct =
    displayedId === "thanks" ? 100 : Math.min(100, Math.round(((index - 1) / Math.max(form.total, 1)) * 100));

  const stepAnimClass = cn(
    phase === "exit" && (isActChange ? "step-exit-act" : "step-exit"),
    phase === "enter" && (isActChange ? "step-enter-act" : "step-enter"),
  );

  return (
    <dialog
      ref={dialogRef}
      tabIndex={-1}
      onClose={handleDialogClose}
      onCancel={handleDialogClose}
      onKeyDown={handleKeyDown}
      aria-label="Get in touch"
      className={cn(
        "m-0 h-full max-h-none w-full max-w-none border-0 bg-transparent p-0 text-bone",
        "backdrop:bg-void/85 backdrop:backdrop-blur-md",
        "transition-opacity duration-200",
        visible ? "opacity-100" : "opacity-0",
      )}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-card border border-line text-mute transition-colors duration-180 hover:border-line-hi hover:text-bone md:right-8 md:top-8"
      >
        <X size={18} strokeWidth={1.5} />
      </button>

      {/* Honeypot — visually hidden, real users never see or fill this. */}
      <div className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Leave this field empty
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>

      <div className="flex h-full w-full flex-col md:flex-row">
        <WorkflowRail answers={form.answers} currentId={form.currentId} />

        <div className="relative flex flex-1 flex-col overflow-y-auto">
          {showProgress && (
            <div className="absolute inset-x-0 top-0 h-px w-full bg-line">
              <div
                className="h-full bg-signal transition-[width] duration-300 ease-decisive"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          )}

          <div
            aria-live="polite"
            className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-6 py-20 md:px-10"
          >
            {showProgress && (
              <div className="mb-6 flex items-center justify-between">
                {displayedStep.act ? (
                  <span
                    className={cn(
                      "font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-faint",
                      isActChange && phase === "enter" && eyebrowChars < displayedStep.act.length && "eyebrow-caret",
                    )}
                  >
                    {displayedStep.act.slice(0, eyebrowChars || displayedStep.act.length)}
                  </span>
                ) : (
                  <span />
                )}
                <span className="font-mono text-xs tabular-nums text-faint">
                  {String(index).padStart(2, "0")} / {String(form.total).padStart(2, "0")}
                </span>
              </div>
            )}

            <div key={displayedId} className={stepAnimClass}>
              {displayedStep.type === "welcome" && (
                <div>
                  <h1 className="font-editorial text-[clamp(2rem,4.5vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-bone">
                    {displayedStep.title}
                  </h1>
                  {displayedStep.helper && (
                    <p className="mt-4 text-base text-mute">{displayedStep.helper}</p>
                  )}
                  <button
                    ref={welcomeButtonRef}
                    type="button"
                    onClick={commitCurrentValue}
                    className="chrome-button mt-10 rounded-card px-8 py-3.5 font-display text-sm font-medium text-void"
                  >
                    {displayedStep.cta ?? "Start"}
                  </button>
                  <p className="mt-4 font-mono text-xs text-faint">press Enter ↵</p>
                </div>
              )}

              {displayedStep.type === "end" && (
                <ThanksPanel
                  status={form.status}
                  experience={form.answers.experience}
                  payload={payload}
                  onRetry={submitForm}
                  onClose={onClose}
                />
              )}

              {displayedStep.type !== "welcome" && displayedStep.type !== "end" && (
                <div>
                  <h2
                    className={cn(
                      "font-editorial text-[clamp(2rem,4.5vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-bone",
                      phase === "exit" && "chroma-pulse",
                    )}
                  >
                    {displayedStep.title}
                  </h2>
                  {displayedStep.helper && (
                    <p className="mt-3 max-w-prose text-base text-mute">{displayedStep.helper}</p>
                  )}

                  <div className="mt-8">
                    <QuestionField
                      ref={fieldRef}
                      step={displayedStep}
                      value={draft}
                      onChange={setDraft}
                      onChoiceSelect={handleChoiceSelect}
                      error={form.error}
                    />
                  </div>

                  {displayedStep.type !== "choice" && (
                    <div className="mt-8 flex items-center gap-4">
                      <button
                        type="button"
                        onClick={commitCurrentValue}
                        className="chrome-button rounded-card px-6 py-3 font-display text-sm font-medium text-void"
                      >
                        OK
                      </button>
                      <span className="font-mono text-xs text-faint">
                        {displayedStep.type === "longtext" ? "press ⌘/Ctrl + Enter" : "press Enter ↵"}
                      </span>
                    </div>
                  )}
                  {displayedStep.type === "choice" && (
                    <p className="mt-6 font-mono text-xs text-faint">
                      press A–{String.fromCharCode(64 + (displayedStep.options?.length ?? 1))} to select
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {form.path.length > 1 && displayedStep.type !== "end" && (
            <button
              type="button"
              onClick={form.back}
              aria-label="Back to previous question"
              className="absolute bottom-8 left-6 flex h-9 w-9 items-center justify-center rounded-card border border-line text-mute transition-colors duration-180 hover:border-line-hi hover:text-bone md:left-10"
            >
              <ChevronUp size={16} strokeWidth={1.5} />
            </button>
          )}
        </div>
      </div>
    </dialog>
  );
}

function ThanksPanel({
  status,
  experience,
  payload,
  onRetry,
  onClose,
}: {
  status: string;
  experience: string | undefined;
  payload: LeadPayload | null;
  onRetry: () => void;
  onClose: () => void;
}) {
  if (status === "submitting") {
    return (
      <div>
        <h2 className="font-editorial text-[clamp(2rem,4.5vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-bone">
          Sending it over…
        </h2>
        <div className="chrome-button mt-8 h-1 w-40 rounded-full" data-loading="true" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div>
        <h2 className="font-editorial text-[clamp(2rem,4.5vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-bone">
          That didn&apos;t send.
        </h2>
        <p className="mt-4 max-w-prose text-base text-mute">
          Nothing&apos;s lost — your answers are still right here. Try again, or send it straight
          to my inbox instead.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={onRetry}
            className="chrome-button rounded-card px-6 py-3 font-display text-sm font-medium text-void"
          >
            Retry
          </button>
          {payload && (
            <a
              href={buildMailtoHref(payload)}
              className="font-mono text-xs uppercase tracking-[0.14em] text-mute transition-colors duration-180 hover:text-signal"
            >
              Email it instead →
            </a>
          )}
        </div>
      </div>
    );
  }

  const copy =
    experience === "yes"
      ? "Good. You already know what breaks. I'll come back within 24 hours with something specific — not a brochure."
      : "Then you're about to get a lot of your week back. I'll come back within 24 hours with the smallest thing worth building first.";

  return (
    <div>
      <h2 className="font-editorial text-[clamp(2rem,4.5vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-bone">
        {copy}
      </h2>
      <button
        type="button"
        onClick={onClose}
        className="mt-10 font-mono text-xs uppercase tracking-[0.14em] text-mute transition-colors duration-180 hover:text-signal"
      >
        ← Back to work
      </button>
    </div>
  );
}
