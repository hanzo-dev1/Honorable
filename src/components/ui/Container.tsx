import { cn } from "@/lib/utils";

type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div className={cn("mx-auto max-w-6xl px-6", className)} {...props}>
      {children}
    </div>
  );
}
