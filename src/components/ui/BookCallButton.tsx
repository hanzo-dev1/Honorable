"use client";

import dynamic from "next/dynamic";
import { contact } from "@/lib/site";
import { cn } from "@/lib/utils";

const PopupButton = dynamic(
  () => import("@typeform/embed-react").then((mod) => mod.PopupButton),
  { ssr: false },
);

type BookCallButtonProps = {
  className?: string;
  children: React.ReactNode;
};

export function BookCallButton({ className, children }: BookCallButtonProps) {
  return (
    <PopupButton
      id={contact.typeformId}
      className={cn("cursor-pointer", className)}
    >
      {children}
    </PopupButton>
  );
}
