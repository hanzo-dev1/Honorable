import { Mail } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { LeadFormTrigger } from "@/components/lead-form/LeadFormTrigger";
import { LinkedInLogo } from "@/components/logos/LinkedInLogo";
import { contact } from "@/lib/site";

const links = [
  { label: "Email", href: `mailto:${contact.email}`, Icon: Mail },
  { label: "LinkedIn", href: contact.linkedin, Icon: LinkedInLogo },
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
        <LeadFormTrigger className="inline-flex items-center justify-center gap-2 rounded-card bg-bone px-8 py-4 font-display text-sm font-medium text-void transition-colors duration-180 ease-decisive hover:bg-white">
          Book a call
        </LeadFormTrigger>
      </div>

      <div className="mt-16 flex items-center justify-center gap-4">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            aria-label={link.label}
            className="flex h-11 w-11 items-center justify-center rounded-card border border-line text-mute transition-all duration-180 ease-decisive hover:border-line-hi hover:text-signal"
          >
            <link.Icon className="h-4 w-4" />
          </a>
        ))}
      </div>
    </Section>
  );
}
