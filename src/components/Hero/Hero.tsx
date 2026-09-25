import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Crosshair } from "@/components/ui/Decor";
import { Emphasis } from "@/components/ui/Emphasis";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { hero } from "@/data/content";
import { sections, siteConfig } from "@/data/site";
import { whatsappHref } from "@/lib/utils";

/**
 * Primeira tela (arquitetura.md §8 a §11).
 * Sequência de entrada em CSS — sem depender de JavaScript e sem loading:
 * fundo → linha horizontal → nome → título → descrição → CTA (≈1,5s).
 */
export function Hero() {
  const portrait = siteConfig.images.portrait;
  const ambientLight =
    portrait && typeof portrait !== "string" && portrait.blurDataURL
      ? `url(${portrait.blurDataURL})`
      : undefined;

  return (
    <section
      id={sections.inicio}
      aria-labelledby="hero-titulo"
      className="tone-dark relative isolate overflow-hidden bg-ink text-fg"
    >
      {/* 1. Fundo: iluminação cinematográfica + grade arquitetônica */}
      <div aria-hidden="true" className="animate-intro-fade absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_78%_18%,rgb(29_78_137/0.3),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_8%_100%,rgb(16_42_67/0.6),transparent_70%)]" />
        <div className="bg-blueprint absolute inset-0 opacity-35 [mask-image:radial-gradient(ellipse_70%_60%_at_60%_40%,black,transparent)]" />
        <div className="bg-grain absolute inset-0 opacity-[0.07] mix-blend-overlay" />
      </div>

      <Container className="relative grid min-h-svh grid-rows-[1fr_auto] lg:grid-cols-12 lg:gap-x-8">
        {/* Linha vertical (desktop) */}
        <span
          aria-hidden="true"
          className="animate-intro-line-y pointer-events-none col-start-8 row-[1/3] -ml-4 hidden w-px origin-top bg-linear-to-b from-transparent via-paper/15 to-paper/25 [animation-delay:250ms] lg:block"
        />

        <div className="row-start-1 flex flex-col justify-center pt-32 pb-14 lg:col-span-7 lg:col-start-1 lg:pt-40 lg:pb-20">
          <p className="type-eyebrow animate-intro-rise flex items-center gap-4 text-accent [animation-delay:300ms] lg:hidden">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            {siteConfig.location.city} — {siteConfig.location.state}
          </p>

          <h1 id="hero-titulo" className="mt-6 lg:mt-0">
            <span className="animate-intro-rise flex items-center gap-4 font-serif text-[2.35rem] leading-[1.05] tracking-[0.01em] uppercase [animation-delay:300ms] sm:text-6xl lg:font-sans lg:text-[0.72rem] lg:leading-normal lg:font-semibold lg:tracking-[0.3em] lg:text-fg-muted">
              <span aria-hidden="true" className="hidden h-px w-12 shrink-0 bg-accent lg:block" />
              {hero.name}
            </span>
            <span className="sr-only"> — </span>
            <span className="animate-intro-rise mt-5 block font-serif text-[1.8rem] leading-[1.15] text-fg/90 [animation-delay:420ms] sm:text-4xl lg:type-display lg:mt-8 lg:text-fg">
              <Emphasis text={hero.title} />
            </span>
          </h1>

          <p className="animate-intro-rise mt-7 max-w-xl text-base leading-relaxed text-fg-muted [animation-delay:560ms] md:text-lg">
            {hero.description}
          </p>

          <div className="animate-intro-rise mt-10 flex flex-col items-start gap-5 [animation-delay:700ms] sm:flex-row sm:items-center sm:gap-8">
            <ButtonLink
              href={whatsappHref()}
              external
              icon={<WhatsAppIcon className="size-4" />}
              track="whatsapp_click"
              trackLocation="hero"
            >
              {hero.primaryCta}
            </ButtonLink>
            <ButtonLink
              href={`/#${sections.escritorio}`}
              variant="text"
              arrow
              track="cta_click"
              trackLabel="conhecer-escritorio"
              trackLocation="hero"
            >
              {hero.secondaryCta}
            </ButtonLink>
          </div>
        </div>

        {/* Retrato (desktop). No mobile o hero prioriza leitura e CTA (§65). */}
        {portrait && (
          <div className="row-start-1 hidden items-center justify-center pt-40 pb-20 lg:col-span-5 lg:col-start-8 lg:flex">
            <div className="parallax w-full max-w-[25rem] [--parallax-distance:3.5rem]">
              <figure className="animate-intro-fade relative [animation-delay:200ms]">
                <div
                  aria-hidden="true"
                  className="absolute -inset-14 -z-10 bg-cover bg-center opacity-45 blur-3xl"
                  style={{ backgroundImage: ambientLight }}
                />
                <div aria-hidden="true" className="absolute -top-5 -right-5 size-full border border-accent/35" />
                <div className="relative aspect-[4/5] overflow-hidden bg-graphite">
                  <Image
                    src={portrait}
                    alt={`Retrato de ${siteConfig.fullName}`}
                    fill
                    sizes="(min-width: 1024px) 25rem, 1px"
                    loading="eager"
                    fetchPriority="high"
                    placeholder={typeof portrait === "string" ? "empty" : "blur"}
                    className="object-cover object-[50%_30%]"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-ink/65 via-ink/0 to-ink/10" />
                </div>
                <figcaption className="type-eyebrow mt-6 flex items-center gap-4 text-fg-muted">
                  <span>{siteConfig.profession}</span>
                  <span aria-hidden="true" className="h-px flex-1 bg-line" />
                  <span>{siteConfig.oab}</span>
                </figcaption>
              </figure>
            </div>
          </div>
        )}

        {/* Linha horizontal + faixa de informações */}
        <div className="relative col-span-full row-start-2 pb-24 lg:pb-10">
          <span
            aria-hidden="true"
            className="animate-intro-line-x absolute top-0 left-1/2 h-px w-screen -translate-x-1/2 bg-linear-to-r from-transparent via-paper/20 to-transparent [animation-delay:150ms]"
          />
          <span aria-hidden="true" className="absolute top-0 left-1/2 h-px w-screen -translate-x-1/2 overflow-hidden">
            <span className="animate-scan absolute inset-y-0 left-0 w-[30vw] bg-linear-to-r from-transparent via-gold/60 to-transparent [animation-delay:1.6s]" />
          </span>
          <div className="type-eyebrow animate-intro-fade flex items-center justify-between gap-6 pt-6 text-fg-muted [animation-delay:900ms]">
            <span>{siteConfig.oab}</span>
            <span className="hidden md:inline">{hero.keywords.join(" · ")}</span>
            <span className="hidden sm:inline">
              {siteConfig.location.city} — {siteConfig.location.state}
            </span>
          </div>
        </div>

        <Crosshair className="animate-intro-fade col-start-8 row-start-2 -mt-1.5 -ml-[1.375rem] hidden self-start [animation-delay:1.1s] lg:block" />
      </Container>
    </section>
  );
}
