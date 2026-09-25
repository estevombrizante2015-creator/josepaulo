import { InlineCTA } from "@/components/CTA/InlineCTA";
import { PracticeAreaCard } from "@/components/PracticeAreas/PracticeAreaCard";
import { Container } from "@/components/ui/Container";
import { Pending } from "@/components/ui/Pending";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { inlineCtas, practiceAreasSection } from "@/data/content";
import { activePracticeAreas } from "@/data/practiceAreas";
import { sections } from "@/data/site";
import { ordinal } from "@/lib/utils";

/**
 * Áreas de atuação (arquitetura.md §16 e §17).
 * Enquanto nenhuma área for confirmada pelo escritório, exibe apenas a
 * estrutura dos cards — nenhuma área é publicada sem confirmação.
 */
export function PracticeAreas() {
  const hasAreas = activePracticeAreas.length > 0;

  return (
    <section
      id={sections.atuacao}
      aria-labelledby="atuacao-titulo"
      className="tone-dark relative bg-ink py-24 text-fg md:py-32 lg:py-40"
    >
      <Container>
        <SectionHeader
          index="004"
          label={practiceAreasSection.label}
          title={practiceAreasSection.title}
          titleId="atuacao-titulo"
        />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {hasAreas
            ? activePracticeAreas.map((area, index) => (
                <li key={area.id}>
                  <Reveal delay={(index % 3) * 0.08} className="h-full">
                    <PracticeAreaCard area={area} number={ordinal(index)} />
                  </Reveal>
                </li>
              ))
            : Array.from({ length: practiceAreasSection.placeholderCount }, (_, index) => (
                <li key={index}>
                  <Reveal delay={index * 0.08} className="h-full">
                    <PlaceholderCard number={ordinal(index)} />
                  </Reveal>
                </li>
              ))}
        </ul>

        <InlineCTA {...inlineCtas.practiceAreas} location="atuacao" />
      </Container>
    </section>
  );
}

function PlaceholderCard({ number }: { number: string }) {
  return (
    <div className="flex h-full min-h-[23rem] flex-col border border-dashed border-line p-7 lg:p-9">
      <span className="font-serif text-2xl text-fg-muted">{number}</span>
      <p className="mt-auto pt-14 font-serif text-[1.9rem] leading-tight text-fg-muted">
        {practiceAreasSection.placeholderTitle}
      </p>
      <span aria-hidden="true" className="mt-5 block h-px w-10 bg-line" />
      <div className="pt-5">
        <Pending />
      </div>
    </div>
  );
}
