import { Container } from "@/components/ui/Container";
import { LagosClock } from "@/components/ui/LagosClock";

export function Footer() {
  return (
    <footer className="border-t border-line py-14">
      <Container className="flex flex-col items-center justify-between gap-4 font-mono text-[0.6875rem] text-faint md:flex-row">
        <span>© 2026 DAVID OGANAH · SABIFLOW TECHNOLOGIES LTD</span>
        <LagosClock />
      </Container>
    </footer>
  );
}
