import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "ghost" | "link";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  className?: string;
}

type ButtonAsButton = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsAnchor = ButtonBaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const baseStyles =
  "inline-flex items-center justify-center gap-2 font-sans text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "rounded-full px-6 py-3 bg-gradient-to-b from-[#ff8a4c] to-accent text-white shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset,0_8px_20px_-6px_rgba(255,107,44,0.55)] hover:brightness-110 active:brightness-95",
  ghost:
    "rounded-full px-6 py-3 border border-border text-foreground hover:border-accent/60 hover:text-accent",
  link: "rounded-none bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat px-0 py-0 text-foreground transition-[background-size] duration-300 ease-out hover:bg-[length:100%_1px]",
};

export function Button({ variant = "primary", className, href, ...props }: ButtonProps) {
  const classes = cn(baseStyles, variantStyles[variant], className);

  if (href !== undefined) {
    return (
      <a
        href={href}
        className={classes}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      />
    );
  }

  return (
    <button
      className={classes}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    />
  );
}
