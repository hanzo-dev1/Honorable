import { cn } from "@/lib/utils";

type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div className={cn("mx-auto max-w-310 px-6 md:px-10", className)} {...props}>
      {children}
    </div>
  );
}
