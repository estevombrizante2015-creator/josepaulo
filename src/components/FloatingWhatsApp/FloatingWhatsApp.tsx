"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { sections } from "@/data/site";
import { cn, whatsappHref } from "@/lib/utils";

/**
 * WhatsApp sempre à mão (arquitetura.md §27 e §49): barra fixa inferior no
 * mobile e botão flutuante no desktop. Na página inicial, aparece depois que
 * o visitante passa pelo hero, que já tem o próprio CTA.
 */
export function FloatingWhatsApp() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(sections.inicio);

    if (!hero) {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(([entry]) => setVisible(entry.intersectionRatio < 0.4), {
      threshold: [0, 0.4],
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      data-track="whatsapp_click"
      data-track-location="flutuante"
      inert={!visible}
      className={cn(
        "fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 flex h-14 items-center justify-center gap-3 border border-gold/40 bg-ink/95 px-6 text-paper shadow-[0_18px_40px_-12px_rgb(0_0_0/0.7)] backdrop-blur-md transition-[opacity,translate,border-color] duration-500 ease-editorial hover:border-gold lg:inset-x-auto lg:right-8 lg:bottom-8 lg:h-12 lg:px-5",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <WhatsAppIcon className="size-5 text-gold" />
      <span className="text-[0.6875rem] font-semibold tracking-[0.2em] uppercase">Falar pelo WhatsApp</span>
      <span className="sr-only">(abre em nova aba)</span>
    </a>
  );
}
