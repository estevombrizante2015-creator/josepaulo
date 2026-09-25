import { Container } from "@/components/ui/Container";
import { Pending } from "@/components/ui/Pending";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { transparency } from "@/data/content";
import { sections } from "@/data/site";
import { addressLines, ordinal, phoneDisplay, phoneHref, whatsappHref } from "@/lib/utils";

/** Informação e transparência — sem promessas de resultado (arquitetura.md §21). */
export function Transparency() {
  const channelsIndex = transparency.items.length;

  return (
    <section
      id={sections.transparencia}
      aria-labelledby="transparencia-titulo"
      className="tone-dark relative bg-graphite py-24 text-fg md:py-32 lg:py-40"
    >
      <Container>
        <SectionHeader index="007" label={transparency.label} title={transparency.title} titleId="transparencia-titulo" />

        <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {transparency.items.map((item, index) => (
            <li key={item.title} className="bg-graphite">
              <Reveal delay={(index % 3) * 0.08} className="flex h-full flex-col p-8 lg:p-10">
                <span className="type-eyebrow text-accent">{ordinal(index)}</span>
                <h3 className="mt-8 font-serif text-2xl leading-snug text-fg">{item.title}</h3>
                <div className="mt-4 leading-relaxed text-fg-muted">{item.text ?? <Pending />}</div>
              </Reveal>
            </li>
          ))}

          <li className="bg-graphite">
            <Reveal delay={(channelsIndex % 3) * 0.08} className="flex h-full flex-col p-8 lg:p-10">
              <span className="type-eyebrow text-accent">{ordinal(channelsIndex)}</span>
              <h3 className="mt-8 font-serif text-2xl leading-snug text-fg">Canais oficiais</h3>
              <ul className="mt-4 space-y-2 leading-relaxed text-fg-muted">
                <li>
                  WhatsApp:{" "}
                  <a
                    href={whatsappHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-fg"
                    data-track="whatsapp_click"
                    data-track-location="transparencia"
                  >
                    {phoneDisplay}
                  </a>
                </li>
                <li>
                  Telefone:{" "}
                  <a
                    href={phoneHref}
                    className="link-underline text-fg"
                    data-track="phone_click"
                    data-track-location="transparencia"
                  >
                    {phoneDisplay}
                  </a>
                </li>
                <li>Endereço: {addressLines.slice(0, 3).join(", ")}</li>
              </ul>
            </Reveal>
          </li>
        </ul>
      </Container>
    </section>
  );
}
