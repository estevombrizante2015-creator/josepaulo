import { Container } from "@/components/ui/Container";
import { Pending } from "@/components/ui/Pending";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { about } from "@/data/content";
import { sections, siteConfig } from "@/data/site";
import { openingHoursSummary } from "@/lib/utils";

/** O escritório: foto + texto institucional (arquitetura.md §13). */
export function About() {
  const facts = [
    { label: "Localização", value: `${siteConfig.location.city} — ${siteConfig.location.state}` },
    { label: "Atendimento", value: openingHoursSummary() },
    { label: "Registro", value: siteConfig.oab },
  ];

  return (
    <section
      id={sections.escritorio}
      aria-labelledby="escritorio-titulo"
      className="tone-light relative bg-canvas py-24 text-fg md:py-32 lg:py-40"
    >
      <Container>
        <SectionHeader index="002" label={about.label} title={about.title} titleId="escritorio-titulo" />

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-6">
            <div className="relative">
              <div aria-hidden="true" className="absolute -bottom-4 -left-4 size-full border border-line" />
              <span aria-hidden="true" className="absolute top-1/2 -right-16 hidden h-px w-16 bg-line lg:block" />
              <PhotoFrame
                image={siteConfig.images.office}
                alt={`Escritório ${siteConfig.name} em ${siteConfig.location.city}`}
                placeholderLabel="Fotografia do escritório"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="aspect-[4/3]"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal>
              <h3 className="type-eyebrow text-accent">{about.subtitle}</h3>
            </Reveal>
            <Reveal delay={0.1} className="mt-6 space-y-5 text-lg leading-relaxed text-fg-muted">
              {about.paragraphs ? about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>) : <Pending />}
            </Reveal>

            <Reveal delay={0.2}>
              <dl className="mt-12 border-t border-line">
                {facts.map((fact) => (
                  <div key={fact.label} className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                    <dt className="type-eyebrow shrink-0 text-fg-muted">{fact.label}</dt>
                    <dd className="text-right font-serif text-xl text-fg">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
