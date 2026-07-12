import { cn } from "@/lib/utils";

type EyebrowProps = React.HTMLAttributes<HTMLParagraphElement>;

export function Eyebrow({ className, children, ...props }: EyebrowProps) {
  return (
    <p
      className={cn(
        "font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-faint",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
