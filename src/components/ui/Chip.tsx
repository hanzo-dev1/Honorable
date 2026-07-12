import { cn } from "@/lib/utils";

interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  pill?: boolean;
}

export function Chip({ className, children, pill = false, ...props }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border border-line font-mono text-[0.6875rem] text-mute",
        pill ? "rounded-full px-3 py-1.5" : "rounded px-2 py-1",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
