"use client";

import { useLagosTime } from "@/lib/useLagosTime";

export function LagosClock() {
  const time = useLagosTime();

  return (
    <span className="tabular-nums">
      LAGOS {time ?? "--:--:--"}
    </span>
  );
}
