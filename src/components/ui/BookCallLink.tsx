import { contact } from "@/lib/site";

interface BookCallLinkProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export function BookCallLink({ className, children, onClick }: BookCallLinkProps) {
  return (
    <a
      href={contact.calendly}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={className}
    >
      {children}
    </a>
  );
}
