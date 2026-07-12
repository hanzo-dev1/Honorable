export const EASE = [0.16, 1, 0.3, 1] as const;

export const reveal = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

export const stagger = {
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

export const viewportOnce = { once: true, margin: "-80px" } as const;
