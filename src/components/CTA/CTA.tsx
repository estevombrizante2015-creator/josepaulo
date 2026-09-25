import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Emphasis } from "@/components/ui/Emphasis";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { cta } from "@/data/content";
import { phoneDisplay, phoneHref, whatsappHref } from "@/lib/utils";

/** CTA principal: "Precisa de orientação jurídica?" (arquitetura.md §26). */
export function CTA() {
  return (
    <section aria-labelledby="cta-titulo" className="tone-dark relative isolate overflow-hidden bg-ink py-28 text-fg md:py-40 lg:py-48">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(160deg,var(--color-navy)_0%,var(--color-ink)_78%)]" />
        <div className="bg-blueprint absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_70%)]" />
        <span className="absolute top-0 left-1/2 h-full w-px bg-linear-to-b from-transparent via-paper/15 to-transparent" />
        <span className="absolute top-1/2 left-0 h-px w-full bg-linear-to-r from-transparent via-paper/15 to-transparent" />
        <span className="absolute top-1/2 left-1/2 -translate-1/2 font-serif text-[30vw] leading-none text-transparent select-none [-webkit-text-stroke:1px_rgb(247_247_245/0.05)]">
          JPG
        </span>
        <div className="bg-grain absolute inset-0 opacity-[0.06] mix-blend-overlay" />
      </div>

      <Container className="text-center">
        <Reveal>
          <p className="type-eyebrow inline-flex items-center gap-4 text-accent">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            {cta.label}
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 id="cta-titulo" className="type-display mx-auto mt-8 max-w-[16ch]">
            <Emphasis text={cta.title} />
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-fg-muted">{cta.text}</p>
        </Reveal>
        <Reveal delay={0.3} className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8">
          <ButtonLink
            href={whatsappHref()}
            external
            icon={<WhatsAppIcon className="size-4" />}
            track="whatsapp_click"
            trackLocation="cta-final"
          >
            {cta.button}
          </ButtonLink>
          <ButtonLink
            href={phoneHref}
            variant="text"
            icon={<PhoneIcon className="size-4" />}
            track="phone_click"
            trackLocation="cta-final"
          >
            {phoneDisplay}
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
