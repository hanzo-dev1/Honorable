import dynamic from "next/dynamic";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { StackMarquee } from "@/components/sections/StackMarquee";
import { Proof } from "@/components/sections/Proof";
import { Work } from "@/components/sections/Work";
import { Capabilities } from "@/components/sections/Capabilities";
import { Operator } from "@/components/sections/Operator";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

// Code-split: the pinned-scroll useScroll/useTransform logic only
// matters once a visitor scrolls this far, so it doesn't belong in the
// initial JS payload.
const Process = dynamic(() =>
  import("@/components/sections/Process").then((mod) => mod.Process),
);

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <StackMarquee />
      <Proof />
      <Work />
      <Capabilities />
      <Process />
      <Operator />
      <Contact />
      <Footer />
    </main>
  );
}
