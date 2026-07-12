import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title?: string;
}

export function Section({
  id,
  eyebrow,
  title,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section id={id} className={cn("py-24 md:py-32", className)} {...props}>
      <Container>
        {(eyebrow || title) && (
          <div className="mb-12 flex flex-col gap-4 md:mb-16">
            {eyebrow && <Badge>{eyebrow}</Badge>}
            {title && (
              <h2 className="font-display text-3xl font-medium tracking-tight text-foreground md:text-4xl">
                {title}
              </h2>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
