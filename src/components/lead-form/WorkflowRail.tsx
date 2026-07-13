"use client";

import { useMemo } from "react";
import { type Answers, getStep, walkPath } from "./flow";
import { cn } from "@/lib/utils";

interface WorkflowRailProps {
  answers: Answers;
  currentId: string;
}

export function WorkflowRail({ answers, currentId }: WorkflowRailProps) {
  const ids = useMemo(() => walkPath(answers), [answers]);
  const isComplete = currentId === "thanks";
  const currentIndex = isComplete ? ids.length : ids.indexOf(currentId);

  return (
    <nav
      aria-hidden
      className={cn(
        "flex shrink-0 flex-row items-center gap-1.5 overflow-x-auto px-4 py-3 md:h-full md:w-10 md:flex-col md:overflow-visible md:px-0 md:py-8",
        isComplete && "rail-flash",
      )}
    >
      {ids.map((id, i) => {
        const step = getStep(id);
        const act = step?.act;
        const prevAct = i > 0 ? getStep(ids[i - 1])?.act : act;
        const newCluster = act !== prevAct;
        const state = i < currentIndex ? "answered" : i === currentIndex ? "current" : "upcoming";

        return (
          <div
            key={id}
            className={cn("flex flex-row items-center gap-1.5 md:flex-col", newCluster && i > 0 && "ml-2 md:ml-0 md:mt-2")}
            style={{ animationDelay: isComplete ? `${i * 40}ms` : undefined }}
          >
            {i > 0 && (
              <span className="relative h-px w-4 overflow-hidden bg-line md:h-4 md:w-px">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-full bg-signal transition-[width,height] duration-300 ease-decisive md:w-full",
                    i - 1 < currentIndex ? "w-full md:h-full" : "w-0 md:h-0",
                  )}
                />
              </span>
            )}
            <span className="relative flex h-2.5 w-2.5 items-center justify-center">
              {state === "current" && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-50" />
              )}
              <span
                className={cn(
                  "relative inline-flex h-2.5 w-2.5 rounded-full border",
                  state === "answered" && "border-signal bg-signal shadow-[0_0_6px_var(--color-signal)]",
                  state === "current" && "border-signal bg-void",
                  state === "upcoming" && "border-line bg-transparent",
                )}
              />
            </span>
          </div>
        );
      })}
    </nav>
  );
}
