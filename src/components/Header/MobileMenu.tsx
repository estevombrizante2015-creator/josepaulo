"use client";

import { AnimatePresence, m } from "motion/react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CloseIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";
import { fullNavigation, siteConfig } from "@/data/site";
import { ordinal, phoneDisplay, whatsappHref } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Menu fullscreen do mobile (arquitetura.md §34). Mantém o foco dentro do
 * menu, fecha com Esc e bloqueia a rolagem da página enquanto aberto.
 */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    closeRef.current?.focus();

    const focusable = () =>
      Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    const desktop = window.matchMedia("(min-width: 64rem)");
    const onViewportChange = (event: MediaQueryListEvent) => {
      if (event.matches) onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onViewportChange);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onViewportChange);
      root.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          ref={panelRef}
          id="menu-mobile"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="tone-dark fixed inset-0 z-[60] flex flex-col bg-ink text-fg lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease }}
        >
          <div aria-hidden="true" className="bg-blueprint pointer-events-none absolute inset-0 opacity-30" />

          <Container className="relative flex h-18 shrink-0 items-center justify-between">
            <Link href="/#inicio" onClick={onClose} aria-label={`${siteConfig.name} — Advocacia, página inicial`}>
              <Logo />
            </Link>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Fechar menu"
              className="-mr-2 flex size-11 items-center justify-center"
            >
              <CloseIcon className="size-6" />
            </button>
          </Container>

          <nav aria-label="Menu principal" className="relative flex-1 overflow-y-auto">
            <Container>
              <ol className="mt-4 border-t border-line">
                {fullNavigation.map((item, index) => (
                  <m.li
                    key={item.href}
                    className="border-b border-line"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + index * 0.05, duration: 0.5, ease }}
                  >
                    <Link href={item.href} onClick={onClose} className="flex items-baseline gap-5 py-4">
                      <span className="w-6 text-[0.62rem] font-semibold tracking-[0.2em] text-accent">
                        {ordinal(index)}
                      </span>
                      <span className="font-serif text-[2rem] leading-tight">{item.label}</span>
                    </Link>
                  </m.li>
                ))}
              </ol>
            </Container>
          </nav>

          <Container className="relative shrink-0 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <ButtonLink
              href={whatsappHref()}
              external
              icon={<WhatsAppIcon className="size-4" />}
              track="whatsapp_click"
              trackLocation="menu-mobile"
              className="w-full"
            >
              Falar conosco
            </ButtonLink>
            <p className="type-eyebrow mt-5 flex justify-between gap-4 text-fg-muted">
              <span>{phoneDisplay}</span>
              <span>{siteConfig.oab}</span>
            </p>
          </Container>
        </m.div>
      )}
    </AnimatePresence>
  );
}
