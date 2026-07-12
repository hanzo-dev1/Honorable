"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const NUMERIC_PATTERN = /(\d+(?:\.\d+)?)/;

function splitValue(value: string) {
  const match = value.match(NUMERIC_PATTERN);
  if (!match || match.index === undefined) {
    return { prefix: "", number: 0, decimals: 0, suffix: value };
  }
  const prefix = value.slice(0, match.index);
  const suffix = value.slice(match.index + match[0].length);
  const decimals = match[0].includes(".") ? match[0].split(".")[1].length : 0;
  return { prefix, number: parseFloat(match[0]), decimals, suffix };
}

const EASE_OUT = (t: number) => 1 - Math.pow(1 - t, 3);

export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { prefix, number, decimals, suffix } = splitValue(value);
  const [display, setDisplay] = useState(prefix + number.toFixed(decimals) + suffix);

  useEffect(() => {
    if (!inView) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(value);
      return;
    }

    const duration = 1400;
    let start: number | null = null;
    let frame: number;

    function step(timestamp: number) {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const current = number * EASE_OUT(progress);
      setDisplay(prefix + current.toFixed(decimals) + suffix);
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      } else {
        setDisplay(value);
      }
    }

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
