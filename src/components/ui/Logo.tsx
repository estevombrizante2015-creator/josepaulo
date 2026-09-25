import { cn } from "@/lib/utils";

/**
 * Identidade provisória "JPG | ADVOCACIA" (arquitetura.md §6).
 * Substituir pelo logotipo oficial, sem alterações, caso exista.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3.5", className)}>
      <span className="font-serif text-[1.7rem] leading-none font-medium tracking-[0.06em] text-fg">
        JPG
      </span>
      <span aria-hidden="true" className="h-6 w-px bg-accent/70" />
      <span className="text-[0.625rem] leading-none font-semibold tracking-[0.36em] text-fg-muted uppercase">
        Advocacia
      </span>
    </span>
  );
}
