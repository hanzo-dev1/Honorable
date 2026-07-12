import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

type SectionProps = React.HTMLAttributes<HTMLElement>;

export function Section({ id, className, children, ...props }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("border-t border-line py-28 md:py-40", className)}
      {...props}
    >
      <Container>{children}</Container>
    </section>
  );
}
