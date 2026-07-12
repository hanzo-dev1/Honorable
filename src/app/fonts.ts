import { Inter_Tight, Instrument_Serif, JetBrains_Mono } from "next/font/google";

export const display = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const editorial = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-editorial",
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});
