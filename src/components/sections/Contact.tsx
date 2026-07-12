import { Section } from "@/components/ui/Section";
import { BookCallButton } from "@/components/ui/BookCallButton";
import { contact } from "@/lib/site";

const links = [
  { label: "Email", href: `mailto:${contact.email}` },
  { label: "LinkedIn", href: contact.linkedin },
  { label: "GitHub", href: contact.github },
];

export function Contact() {
  return (
    <Section id="contact" className="text-center">
      <h2 className="mx-auto max-w-4xl text-[clamp(2.5rem,5vw,4.25rem)] font-medium leading-[1.05] tracking-[-0.03em] text-bone">
        Let&apos;s find out what&apos;s{" "}
        <span className="font-editorial italic tracking-[-0.02em]">
          worth automating.
        </span>
      </h2>

      <div className="mt-10 flex justify-center">
        <BookCallButton className="inline-flex items-center justify-center gap-2 rounded-card bg-bone px-8 py-4 font-display text-sm font-medium text-void transition-colors duration-180 ease-decisive hover:bg-white">
          Book a call
        </BookCallButton>
      </div>

      <div className="mx-auto mt-16 flex max-w-md flex-col divide-y divide-line border-y border-line">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="flex items-center justify-center py-4 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-mute transition-colors duration-180 hover:text-signal"
          >
            {link.label}
          </a>
        ))}
      </div>
    </Section>
  );
}
