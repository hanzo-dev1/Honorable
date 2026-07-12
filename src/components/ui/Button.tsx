import { cn } from "@/lib/utils";

type ButtonVariant = "solid" | "ghost" | "text";

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
  "inline-flex items-center justify-center gap-2 font-display text-sm font-medium transition-all duration-[180ms] ease-[var(--ease-decisive)] disabled:pointer-events-none disabled:opacity-50";

const variantStyles: Record<ButtonVariant, string> = {
  solid: "rounded-card bg-bone px-6 py-3 text-void hover:bg-white",
  ghost:
    "rounded-card border border-line px-6 py-3 text-bone hover:border-line-hi",
  text: "gap-1.5 text-bone hover:text-signal",
};

export function Button({ variant = "solid", className, href, ...props }: ButtonProps) {
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
