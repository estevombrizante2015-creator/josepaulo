"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { MobileMenu } from "@/components/Header/MobileMenu";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { hero } from "@/data/content";
import { mainNavigation, sections, siteConfig } from "@/data/site";
import { cn, whatsappHref } from "@/lib/utils";

const SPY_SECTIONS = [sections.inicio, ...mainNavigation.map((item) => item.section)];
const NO_SECTIONS: string[] = [];

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

/** Destaca no menu a seção visível na página inicial. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!ids.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of ids) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [ids]);

  return ids.length ? active : null;
}

/** Header transparente que ganha fundo e desfoque ao rolar (arquitetura.md §33). */
export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 24,
    () => false,
  );
  const activeSection = useActiveSection(pathname === "/" ? SPY_SECTIONS : NO_SECTIONS);

  return (
    <>
      <header
        className={cn(
          "tone-dark fixed inset-x-0 top-0 z-50 border-b text-fg transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled ? "border-line bg-ink/85 backdrop-blur-xl" : "border-transparent",
        )}
      >
        <Container className="flex h-18 items-center justify-between gap-8 lg:h-22">
          <Link href="/#inicio" aria-label={`${siteConfig.name} — Advocacia, página inicial`}>
            <Logo />
          </Link>

          <nav aria-label="Navegação principal" className="hidden lg:block">
            <ul className="flex items-center gap-8 xl:gap-10">
              {mainNavigation.map((item) => {
                const isActive = activeSection === item.section;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "location" : undefined}
                      className={cn(
                        "relative py-2 text-[0.66rem] font-semibold tracking-[0.22em] uppercase transition-colors duration-300 hover:text-fg",
                        isActive ? "text-fg" : "text-fg-muted",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-accent transition-transform duration-500 ease-editorial",
                          isActive ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <ButtonLink
                href={whatsappHref()}
                external
                variant="outline"
                size="sm"
                track="whatsapp_click"
                trackLocation="header"
              >
                {hero.primaryCta}
              </ButtonLink>
            </div>

            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              aria-label="Abrir menu"
              onClick={() => setMenuOpen(true)}
              className="-mr-2 flex size-11 items-center justify-center lg:hidden"
            >
              <span aria-hidden="true" className="relative block h-3 w-7">
                <span className="absolute top-0 left-0 h-px w-full bg-fg" />
                <span className="absolute right-0 bottom-0 h-px w-2/3 bg-fg" />
              </span>
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
