"use client";

import { useEffect, useState } from "react";

function formatLagos(date: Date) {
  return date.toLocaleTimeString("en-GB", {
    timeZone: "Africa/Lagos",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export function useLagosTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(formatLagos(new Date()));
    const interval = setInterval(() => setTime(formatLagos(new Date())), 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}
