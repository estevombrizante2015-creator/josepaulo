import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Emphasis } from "@/components/ui/Emphasis";

/** Abertura das páginas internas, com a mesma linguagem do hero principal. */
export function PageHero({ label, title, children }: { label: string; title: string; children?: ReactNode }) {
  return (
    <section className="tone-dark relative isolate overflow-hidden bg-ink pt-36 pb-16 text-fg md:pt-48 md:pb-24">
      <div aria-hidden="true" className="animate-intro-fade absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_70%_at_85%_0%,rgb(29_78_137/0.28),transparent_70%)]" />
        <div className="bg-blueprint absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      </div>
      <span
        aria-hidden="true"
        className="animate-intro-line-x absolute inset-x-0 bottom-0 h-px origin-left bg-line [animation-delay:150ms]"
      />

      <Container>
        <p className="type-eyebrow animate-intro-rise flex items-center gap-4 text-accent [animation-delay:250ms]">
          <span aria-hidden="true" className="h-px w-10 bg-accent" />
          {label}
        </p>
        <h1 className="type-display animate-intro-rise mt-8 max-w-[18ch] [animation-delay:380ms]">
          <Emphasis text={title} />
        </h1>
        {children ? (
          <div className="animate-intro-rise mt-8 max-w-2xl text-lg leading-relaxed text-fg-muted [animation-delay:520ms]">
            {children}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
