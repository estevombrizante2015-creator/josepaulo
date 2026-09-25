import { Container } from "@/components/ui/Container";
import { ArchitecturalPlan } from "@/components/ui/Decor";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { differentials } from "@/data/content";
import { sections } from "@/data/site";
import { ordinal } from "@/lib/utils";

/** "Mais do que orientação jurídica." — quatro pilares (arquitetura.md §18). */
export function Differentials() {
  return (
    <section
      id={sections.diferenciais}
      aria-labelledby="diferenciais-titulo"
      className="tone-dark relative isolate overflow-hidden bg-navy py-24 text-fg md:py-32 lg:py-40"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_100%_0%,rgb(29_78_137/0.4),transparent_70%)]" />
        <ArchitecturalPlan className="absolute -right-32 -bottom-10 w-[44rem] text-paper/[0.07] md:-right-16" />
        <div className="bg-grain absolute inset-0 opacity-[0.05] mix-blend-overlay" />
      </div>

      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeader
              index="005"
              label={differentials.label}
              title={differentials.title}
              titleId="diferenciais-titulo"
              className="mb-0 md:mb-0"
            />
          </div>
        </div>

        <ol className="border-t border-line lg:col-span-6 lg:col-start-7">
          {differentials.items.map((item, index) => (
            <li key={item.title} className="border-b border-line">
              <Reveal className="grid grid-cols-[4.5rem_1fr] gap-6 py-10 md:grid-cols-[6.5rem_1fr] md:py-12">
                <span className="font-serif text-5xl leading-none text-accent md:text-6xl">{ordinal(index)}</span>
                <div>
                  <h3 className="type-eyebrow text-fg">{item.title}</h3>
                  <p className="mt-4 max-w-md text-lg leading-relaxed text-fg-muted">{item.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
