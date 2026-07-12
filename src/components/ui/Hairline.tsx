import { cn } from "@/lib/utils";

interface HairlineProps extends React.HTMLAttributes<HTMLDivElement> {
  vertical?: boolean;
}

export function Hairline({ vertical = false, className, ...props }: HairlineProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "bg-line",
        vertical ? "h-full w-px" : "h-px w-full",
        className,
      )}
      {...props}
    />
  );
}
