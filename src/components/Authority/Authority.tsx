import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { authority } from "@/data/content";
import { cn, ordinal } from "@/lib/utils";

/** Seção de autoridade, logo após o hero (arquitetura.md §12). */
export function Authority() {
  return (
    <section aria-labelledby="autoridade-titulo" className="tone-dark relative bg-ink py-24 text-fg md:py-32 lg:py-40">
      <Container>
        <SectionHeader index="001" label={authority.label} title={authority.title} titleId="autoridade-titulo" />

        <ul className="grid border-t border-line md:grid-cols-3">
          {authority.items.map((item, index) => (
            <li key={item.title} className="border-b border-line md:border-b-0 md:not-first:border-l">
              <Reveal delay={index * 0.1} className={cn("h-full py-10 md:px-8 md:py-12 lg:px-10", index === 0 && "md:pl-0")}>
                <span className="font-serif text-2xl text-accent italic">{ordinal(index)}</span>
                <h3 className="type-eyebrow mt-12 text-fg">{item.title}</h3>
                <p className="mt-4 max-w-xs leading-relaxed text-fg-muted">{item.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
