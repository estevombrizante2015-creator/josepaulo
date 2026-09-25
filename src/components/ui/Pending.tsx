import { TODO } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Sinaliza visualmente um conteúdo que depende de informação do escritório
 * (arquitetura.md §78). Deve desaparecer antes da publicação.
 */
export function Pending({ label = TODO, className }: { label?: string; className?: string }) {
  return (
    <span
      data-pending=""
      className={cn(
        "inline-flex max-w-full items-center gap-2.5 border border-dashed border-accent/60 px-3 py-1.5 font-mono text-[0.68rem] leading-snug tracking-wide text-accent",
        className,
      )}
    >
      <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent/80" />
      {label}
    </span>
  );
}
