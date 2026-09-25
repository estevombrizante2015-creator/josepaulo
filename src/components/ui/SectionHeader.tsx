import type { ReactNode } from "react";
import { Emphasis } from "@/components/ui/Emphasis";
import { Reveal } from "@/components/ui/Reveal";

type SectionHeaderProps = {
  /** Numeração editorial ("Nº 002"). Apenas elemento visual (§38, §66). */
  index: string;
  label: string;
  title: string;
  titleId: string;
  /** Substitui o espaçamento inferior padrão ("mb-14 md:mb-20"). */
  className?: string;
  children?: ReactNode;
};

export function SectionHeader({ index, label, title, titleId, className, children }: SectionHeaderProps) {
  return (
    <header className={className ?? "mb-14 md:mb-20"}>
      <div className="type-eyebrow flex items-center gap-4">
        <span className="text-accent">Nº {index}</span>
        <span className="text-fg-muted">{label}</span>
        <Reveal variant="line-x" className="h-px flex-1 origin-left bg-line" />
      </div>
      <Reveal delay={0.1}>
        <h2 id={titleId} className="type-title mt-8 max-w-[20ch] text-fg">
          <Emphasis text={title} />
        </h2>
      </Reveal>
      {children ? (
        <Reveal delay={0.2}>
          <div className="mt-6 max-w-2xl text-base leading-relaxed text-fg-muted md:text-lg">{children}</div>
        </Reveal>
      ) : null}
    </header>
  );
}
