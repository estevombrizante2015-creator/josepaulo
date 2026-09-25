import { InlineCTA } from "@/components/CTA/InlineCTA";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { howItWorks, inlineCtas } from "@/data/content";
import { sections } from "@/data/site";
import { ordinal } from "@/lib/utils";

/**
 * Processo de atendimento (arquitetura.md §19 e §20).
 * Linha horizontal no desktop e vertical no mobile, desenhada ao entrar na tela.
 */
export function Process() {
  return (
    <section
      id={sections.comoTrabalhamos}
      aria-labelledby="processo-titulo"
      className="tone-dark relative bg-ink py-24 text-fg md:py-32 lg:py-40"
    >
      <Container>
        <SectionHeader index="006" label={howItWorks.label} title={howItWorks.title} titleId="processo-titulo" />

        <div className="relative">
          <Reveal
            variant="line-x"
            duration={1.8}
            className="absolute inset-x-0 top-[0.375rem] hidden h-px origin-left bg-line lg:block"
          />
          <Reveal
            variant="line-y"
            duration={1.8}
            className="absolute top-2 bottom-2 left-[0.375rem] w-px origin-top bg-line lg:hidden"
          />

          <ol className="relative grid gap-12 lg:grid-cols-5 lg:gap-8">
            {howItWorks.steps.map((step, index) => (
              <li key={step.title}>
                <Reveal delay={index * 0.12} className="relative pl-10 lg:pl-0">
                  <span
                    aria-hidden="true"
                    className="absolute top-0 left-0 size-3 border border-accent bg-canvas lg:static lg:block"
                  />
                  <span className="block font-serif text-4xl leading-none text-accent lg:mt-10">{ordinal(index)}</span>
                  <h3 className="type-eyebrow mt-5 text-fg">{step.title}</h3>
                  <p className="mt-3 max-w-xs leading-relaxed text-fg-muted">{step.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <InlineCTA {...inlineCtas.howItWorks} location="como-trabalhamos" />
      </Container>
    </section>
  );
}
