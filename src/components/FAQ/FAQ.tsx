import { FaqItem } from "@/components/FAQ/FaqItem";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { faqSection } from "@/data/content";
import { faq } from "@/data/faq";
import { sections } from "@/data/site";

/** Perguntas frequentes — respostas preenchidas pelo escritório (arquitetura.md §22). */
export function FAQ() {
  return (
    <section id={sections.faq} aria-labelledby="faq-titulo" className="tone-light relative bg-canvas text-fg">
      <Container>
        <div className="grid gap-12 border-t border-line py-24 md:py-32 lg:grid-cols-12 lg:gap-8 lg:py-40">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHeader index="009" label={faqSection.label} title={faqSection.title} titleId="faq-titulo" className="mb-0" />
            </div>
          </div>

          <Reveal className="border-t border-line lg:col-span-7 lg:col-start-6">
            {faq.map((item, index) => (
              <FaqItem key={item.question} item={item} index={index} />
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
