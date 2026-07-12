"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { systemLog } from "@/content/systemLog";

const CADENCE = 900;
const LOOP_PAUSE = 2400;

export function SystemPanel() {
  const reduced = useReducedMotion();
  const [visibleCount, setVisibleCount] = useState(reduced ? systemLog.length : 0);

  useEffect(() => {
    if (reduced) return;

    let timeout: ReturnType<typeof setTimeout>;

    function advance(count: number) {
      if (count > systemLog.length) {
        timeout = setTimeout(() => advance(0), LOOP_PAUSE);
        return;
      }
      setVisibleCount(count);
      timeout = setTimeout(() => advance(count + 1), CADENCE);
    }

    advance(0);
    return () => clearTimeout(timeout);
  }, [reduced]);

  return (
    <div className="rounded-card border border-line bg-surface">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="ml-2 font-mono text-xs text-faint">
          loan-reminder-engine.n8n
        </span>
      </div>

      <div className="min-h-[220px] px-4 py-5 font-mono text-[0.75rem] leading-relaxed tabular-nums">
        <AnimatePresence initial={false}>
          {systemLog.slice(0, visibleCount).map((line, i) => (
            <motion.div
              key={`${line.tag}-${i}`}
              initial={reduced ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={
                line.final
                  ? "mt-2 flex gap-3 border-t border-line pt-2 text-bone"
                  : "flex gap-3 text-mute"
              }
            >
              <span className="text-faint">{line.time}</span>
              <span className={line.final ? "text-signal" : "text-signal"}>
                {line.final ? "●" : "✓"}
              </span>
              <span className="w-20 shrink-0 text-bone">{line.tag}</span>
              <span className="text-mute">{line.detail}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
