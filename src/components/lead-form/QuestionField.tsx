"use client";

import { forwardRef } from "react";
import type { Step } from "./flow";
import { cn } from "@/lib/utils";

interface QuestionFieldProps {
  step: Step;
  value: string;
  onChange: (v: string) => void;
  onChoiceSelect: (value: string) => void;
  error: string | null;
}

export const QuestionField = forwardRef<HTMLElement, QuestionFieldProps>(function QuestionField(
  { step, value, onChange, onChoiceSelect, error },
  ref,
) {
  const errorId = `${step.id}-error`;

  if (step.type === "choice" && step.options) {
    const focusTargetKey = step.options.find((o) => o.value === value)?.key ?? step.options[0]?.key;
    return (
      <div>
        <div role="radiogroup" aria-label={step.title} className="flex flex-col gap-2.5">
          {step.options.map((opt) => {
            const selected = value === opt.value;
            return (
              <button
                key={opt.key}
                ref={opt.key === focusTargetKey ? (ref as React.Ref<HTMLButtonElement>) : undefined}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => onChoiceSelect(opt.value)}
                className={cn(
                  "group flex w-full items-center gap-4 rounded-choice border pl-4 pr-4 py-3.5 text-left transition-all duration-180 ease-decisive",
                  selected
                    ? "border-l-2 border-l-signal bg-signal-dim border-line pl-[14px]"
                    : "border-line hover:border-line-hi hover:bg-white/[0.03]",
                )}
              >
                <span
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-chip border font-mono text-[0.8125rem] transition-colors duration-180",
                    selected
                      ? "border-signal bg-signal text-void"
                      : "border-line text-faint group-hover:border-line-hi group-hover:bg-white/[0.06] group-hover:text-mute",
                  )}
                >
                  {opt.key}
                </span>
                <span className="text-[1.125rem] font-medium text-bone">{opt.label}</span>
              </button>
            );
          })}
        </div>
        {error && (
          <p id={errorId} role="alert" className="mt-3 text-sm text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }

  if (step.type === "longtext") {
    return (
      <div>
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={step.placeholder}
          rows={3}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={!!error}
          className={cn(
            "w-full resize-none border-0 border-b bg-transparent pb-3 font-editorial text-[1.75rem] leading-tight text-bone outline-none transition-colors duration-180 placeholder:text-faint",
            error ? "border-red-400" : "border-line focus:border-signal",
          )}
        />
        {error && (
          <p id={errorId} role="alert" className="mt-2 text-sm text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }

  const inputType = step.type === "email" ? "email" : step.type === "tel" ? "tel" : "text";
  const autoComplete = step.type === "email" ? "email" : step.type === "tel" ? "tel" : "off";

  return (
    <div>
      <input
        ref={ref as React.Ref<HTMLInputElement>}
        type={inputType}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={step.placeholder}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={!!error}
        autoComplete={autoComplete}
        className={cn(
          "w-full border-0 border-b bg-transparent pb-3 font-editorial text-[1.75rem] text-bone outline-none transition-colors duration-180 placeholder:text-faint",
          error ? "border-red-400" : "border-line focus:border-signal",
        )}
      />
      {error && (
        <p id={errorId} role="alert" className="mt-2 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
});
