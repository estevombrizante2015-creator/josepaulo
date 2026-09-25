import { WhatsAppIcon } from "@/components/ui/Icons";
import { whatsappHref } from "@/lib/utils";

/**
 * WhatsApp sempre à mão (arquitetura.md §27 e §49): barra fixa inferior no
 * mobile e botão flutuante no desktop. Aparece após a abertura do hero.
 */
export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      data-track="whatsapp_click"
      data-track-location="flutuante"
      className="animate-intro-rise fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 flex h-14 items-center justify-center gap-3 border border-gold/40 bg-ink/95 px-6 text-paper shadow-[0_18px_40px_-12px_rgb(0_0_0/0.7)] backdrop-blur-md transition-colors duration-300 [animation-delay:1.6s] hover:border-gold lg:inset-x-auto lg:right-8 lg:bottom-8 lg:h-13"
    >
      <WhatsAppIcon className="size-5 text-gold" />
      <span className="text-[0.6875rem] font-semibold tracking-[0.2em] uppercase">Falar pelo WhatsApp</span>
      <span className="sr-only">(abre em nova aba)</span>
    </a>
  );
}
