"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/nav-links";
import { useActiveSection } from "@/lib/useActiveSection";
import { cn } from "@/lib/utils";
import { BookCallLink } from "@/components/ui/BookCallLink";

const sectionIds = navLinks.map((link) => link.href.replace("#", ""));

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-line bg-void/70 backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-310 items-center justify-between px-6 md:px-10">
        <a href="#" className="flex items-center gap-3">
          <span className="font-mono text-xs font-medium tracking-[0.22em] text-bone">
            DAVID OGANAH
          </span>
          <span className="hidden h-3 w-px bg-line md:block" />
          <span className="hidden font-mono text-xs text-faint md:block">
            AI AUTOMATION ENGINEER
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = active === id;
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-1 font-mono text-[0.6875rem] uppercase tracking-[0.14em] transition-colors duration-180",
                  isActive ? "text-bone" : "text-faint hover:text-mute",
                )}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-0 -bottom-1 h-px bg-signal"
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-[0.6875rem] text-mute">
            <span className="relative flex h-[5px] w-[5px]">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60 [animation-duration:3s]" />
              <span className="relative inline-flex h-[5px] w-[5px] rounded-full bg-signal" />
            </span>
            AVAILABLE — Q3 2026
          </span>
          <BookCallLink className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-bone transition-colors duration-180 hover:text-signal">
            Book a call →
          </BookCallLink>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="text-bone lg:hidden"
        >
          {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-16 z-40 flex flex-col bg-void/95 backdrop-blur-2xl lg:hidden"
          >
            <nav className="flex flex-1 flex-col items-start justify-center gap-8 px-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-3xl font-medium tracking-tight text-bone"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <div className="border-t border-line px-8 py-8">
              <BookCallLink
                onClick={() => setMobileOpen(false)}
                className="font-mono text-xs uppercase tracking-[0.14em] text-bone"
              >
                Book a call →
              </BookCallLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
