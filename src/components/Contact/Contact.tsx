import { OpeningHours } from "@/components/Contact/OpeningHours";
import { SocialLinks } from "@/components/Footer/SocialLinks";
import { LocationMap } from "@/components/Map/LocationMap";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { NavigationIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { contactSection } from "@/data/content";
import { sections, siteConfig } from "@/data/site";
import { addressLines, directionsHref, phoneDisplay, phoneHref, whatsappHref } from "@/lib/utils";

/**
 * Contato + mapa (arquitetura.md §28 a §30 e §58):
 * como chegar, ligar e falar no WhatsApp lado a lado.
 */
export function Contact({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <section
      id={sections.contato}
      aria-labelledby={showHeader ? "contato-titulo" : undefined}
      aria-label={showHeader ? undefined : "Informações de contato"}
      className="tone-dark relative bg-ink py-24 text-fg md:py-32 lg:py-40"
    >
      <Container>
        {showHeader && (
          <SectionHeader index="010" label={contactSection.label} title={contactSection.title} titleId="contato-titulo" />
        )}

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-12 lg:col-span-5">
            <div className="grid gap-10 sm:grid-cols-2">
              <Reveal>
                <h3 className="type-eyebrow text-accent">Escritório</h3>
                <address className="mt-5 leading-relaxed not-italic">
                  <span className="block font-serif text-xl text-fg">{siteConfig.name}</span>
                  {addressLines.map((line) => (
                    <span key={line} className="block text-fg-muted">
                      {line}
                    </span>
                  ))}
                </address>
              </Reveal>

              <Reveal delay={0.08}>
                <h3 className="type-eyebrow text-accent">Contato</h3>
                <dl className="mt-5 space-y-4">
                  <div>
                    <dt className="text-sm text-fg-muted">Telefone</dt>
                    <dd>
                      <a
                        href={phoneHref}
                        className="link-underline font-serif text-xl text-fg"
                        data-track="phone_click"
                        data-track-location="contato"
                      >
                        {phoneDisplay}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-fg-muted">WhatsApp</dt>
                    <dd>
                      <a
                        href={whatsappHref()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline font-serif text-xl text-fg"
                        data-track="whatsapp_click"
                        data-track-location="contato"
                      >
                        {phoneDisplay}
                        <span className="sr-only"> (abre em nova aba)</span>
                      </a>
                    </dd>
                  </div>
                  {siteConfig.email && (
                    <div>
                      <dt className="text-sm text-fg-muted">E-mail</dt>
                      <dd>
                        <a href={`mailto:${siteConfig.email}`} className="link-underline font-serif text-xl text-fg">
                          {siteConfig.email}
                        </a>
                      </dd>
                    </div>
                  )}
                </dl>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <h3 className="type-eyebrow text-accent">Horário de atendimento</h3>
              <OpeningHours className="mt-4" />
            </Reveal>

            <Reveal delay={0.16} className="flex flex-wrap gap-3">
              <ButtonLink
                href={directionsHref}
                external
                variant="outline"
                icon={<NavigationIcon className="size-4" />}
                track="map_click"
                trackLabel="como-chegar"
                trackLocation="contato"
                className="px-5"
              >
                Como chegar
              </ButtonLink>
              <ButtonLink
                href={phoneHref}
                variant="outline"
                icon={<PhoneIcon className="size-4" />}
                track="phone_click"
                trackLocation="contato-botoes"
                className="px-5"
              >
                Ligar
              </ButtonLink>
              <ButtonLink
                href={whatsappHref()}
                external
                icon={<WhatsAppIcon className="size-4" />}
                track="whatsapp_click"
                trackLocation="contato-botoes"
                className="px-5"
              >
                Falar no WhatsApp
              </ButtonLink>
            </Reveal>

            <SocialLinks />
          </div>

          <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
            <LocationMap />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
