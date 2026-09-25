import Link from "next/link";
import { SocialLinks } from "@/components/Footer/SocialLinks";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { fullNavigation, siteConfig } from "@/data/site";
import { addressLines, phoneDisplay, phoneHref } from "@/lib/utils";

const currentYear = new Date().getFullYear();

/** Rodapé minimalista (arquitetura.md §32). */
export function Footer() {
  return (
    <footer className="tone-dark relative border-t border-line bg-ink pt-20 pb-28 text-fg lg:pt-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Link href="/#inicio" aria-label={`${siteConfig.name} — Advocacia, início`} className="inline-block">
              <Logo />
            </Link>
            <p className="mt-10 font-serif text-3xl leading-tight text-fg">{siteConfig.name}</p>
            <p className="type-eyebrow mt-3 text-fg-muted">
              Advocacia · {siteConfig.location.city} — {siteConfig.location.state}
            </p>
            <SocialLinks includeWhatsApp className="mt-8" />
          </div>

          <nav aria-label="Rodapé" className="lg:col-span-3 lg:col-start-7">
            <h2 className="type-eyebrow text-accent">Navegação</h2>
            <ul className="mt-6 space-y-3">
              {fullNavigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline text-fg-muted transition-colors hover:text-fg">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3 lg:col-start-10">
            <h2 className="type-eyebrow text-accent">Contato</h2>
            <address className="mt-6 leading-relaxed text-fg-muted not-italic">
              {addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <a
              href={phoneHref}
              className="link-underline mt-4 inline-block font-serif text-xl text-fg"
              data-track="phone_click"
              data-track-location="rodape"
            >
              {phoneDisplay}
            </a>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-line pt-8 text-xs text-fg-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {currentYear} {siteConfig.name}. Todos os direitos reservados.
          </p>
          <p className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>{siteConfig.oab}</span>
            <Link href="/politica-de-privacidade" className="link-underline transition-colors hover:text-fg">
              Política de Privacidade
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}
