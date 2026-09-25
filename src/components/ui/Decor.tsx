import { cn } from "@/lib/utils";

/**
 * Linhas inspiradas em plantas arquitetônicas: estrutura + organização +
 * precisão (arquitetura.md §67). Puramente decorativo.
 */
export function ArchitecturalPlan({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 420"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      focusable="false"
      className={cn("[&_*]:[vector-effect:non-scaling-stroke]", className)}
    >
      <rect x="0.5" y="0.5" width="639" height="419" />
      <path d="M0.5 170.5H250.5V0.5" />
      <path d="M250.5 170.5V419.5" />
      <path d="M250.5 280.5H639.5" />
      <path d="M450.5 280.5V419.5" />
      <path d="M450.5 0.5V120.5" />
      <path d="M250.5 120.5H330.5" />
      <path d="M390.5 120.5H450.5" />
      <path d="M330.5 120.5A60 60 0 0 1 390.5 180.5" strokeDasharray="2 6" />
      <path d="M90.5 280.5H170.5M130.5 240.5V320.5" />
      <path d="M560.5 50.5H600.5M580.5 30.5V70.5" />
      <circle cx="250.5" cy="170.5" r="3" />
      <circle cx="450.5" cy="280.5" r="3" />
    </svg>
  );
}

/** Cruzamento de linhas: estrutura + precisão + estratégia (§10). */
export function Crosshair({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("relative size-3", className)}>
      <span className="absolute inset-0 border border-accent bg-canvas" />
      <span className="absolute inset-[3px] bg-accent/70" />
    </span>
  );
}
