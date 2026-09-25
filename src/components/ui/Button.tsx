import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRightIcon } from "@/components/ui/Icons";
import type { AnalyticsEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "text";
type Size = "md" | "sm";

type ButtonLinkProps = Omit<ComponentProps<"a">, "href"> & {
  href: string;
  variant?: Variant;
  /** Não se aplica à variante "text". */
  size?: Size;
  icon?: ReactNode;
  arrow?: boolean;
  /** Abre em nova aba (WhatsApp, mapas...). */
  external?: boolean;
  track?: AnalyticsEvent;
  trackLabel?: string;
  trackLocation?: string;
};

const variantClasses: Record<Variant, string> = {
  primary:
    "isolate overflow-hidden bg-fg text-canvas before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-gold before:transition-transform before:duration-500 before:ease-editorial hover:text-ink hover:before:scale-x-100 focus-visible:text-ink focus-visible:before:scale-x-100",
  outline: "border border-fg/25 text-fg hover:border-accent hover:text-accent focus-visible:border-accent",
  text: "py-2 text-fg hover:text-accent",
};

const sizeClasses: Record<Size, string> = {
  md: "h-13 px-7",
  sm: "h-11 px-5",
};

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  icon,
  arrow = false,
  external = false,
  track,
  trackLabel,
  trackLocation,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const classes = cn(
    "group relative inline-flex shrink-0 items-center justify-center gap-3 text-[0.6875rem] font-semibold tracking-[0.2em] uppercase transition-colors duration-300",
    variantClasses[variant],
    variant !== "text" && sizeClasses[size],
    className,
  );

  const trackingAttributes = track
    ? { "data-track": track, "data-track-label": trackLabel, "data-track-location": trackLocation }
    : {};

  const content = (
    <>
      {icon}
      <span className={cn(variant === "text" && "link-underline pb-1")}>{children}</span>
      {arrow && (
        <ArrowRightIcon className="size-4 transition-transform duration-500 ease-editorial group-hover:translate-x-1" />
      )}
      {external && <span className="sr-only"> (abre em nova aba)</span>}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...trackingAttributes}
        {...props}
      >
        {content}
      </a>
    );
  }

  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={classes} {...trackingAttributes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} {...trackingAttributes} {...props}>
      {content}
    </a>
  );
}
