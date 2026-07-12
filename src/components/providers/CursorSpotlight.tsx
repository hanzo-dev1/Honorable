"use client";

import { useEffect, useRef } from "react";

export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (mq.matches || isTouch) {
      if (ref.current) ref.current.style.display = "none";
      return;
    }

    function onMove(e: PointerEvent) {
      target.current = { x: e.clientX, y: e.clientY };
    }

    function tick() {
      current.current.x += (target.current.x - current.current.x) * 0.12;
      current.current.y += (target.current.y - current.current.y) * 0.12;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${current.current.x - 250}px, ${current.current.y - 250}px, 0)`;
      }
      frame.current = requestAnimationFrame(tick);
    }

    window.addEventListener("pointermove", onMove);
    frame.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 hidden h-125 w-125 rounded-full motion-reduce:hidden! md:block"
      style={{
        background:
          "radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 70%)",
      }}
    />
  );
}
