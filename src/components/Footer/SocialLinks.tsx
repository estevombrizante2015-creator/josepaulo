import type { ComponentType, SVGProps } from "react";
import {
  ArticleIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  WhatsAppIcon,
} from "@/components/ui/Icons";
import { activeSocialLinks, type SocialNetwork } from "@/data/social";
import { cn, whatsappHref } from "@/lib/utils";

const icons: Record<SocialNetwork, ComponentType<SVGProps<SVGSVGElement>>> = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  linkedin: LinkedinIcon,
  jusbrasil: ArticleIcon,
};

const itemClasses =
  "flex size-11 items-center justify-center border border-line text-fg-muted transition-colors duration-300 hover:border-accent hover:text-accent";

/** Somente perfis oficiais confirmados + WhatsApp (arquitetura.md §31). */
export function SocialLinks({ className, includeWhatsApp = false }: { className?: string; includeWhatsApp?: boolean }) {
  if (!activeSocialLinks.length && !includeWhatsApp) return null;

  return (
    <ul className={cn("flex flex-wrap gap-3", className)} aria-label="Redes sociais">
      {activeSocialLinks.map((link) => {
        const Icon = icons[link.network];
        return (
          <li key={link.network}>
            <a href={link.url} target="_blank" rel="noopener noreferrer" className={itemClasses}>
              <Icon className="size-[1.15rem]" />
              <span className="sr-only">{link.label} (abre em nova aba)</span>
            </a>
          </li>
        );
      })}
      {includeWhatsApp && (
        <li>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className={itemClasses}
            data-track="whatsapp_click"
            data-track-location="rodape"
          >
            <WhatsAppIcon className="size-[1.1rem]" />
            <span className="sr-only">WhatsApp (abre em nova aba)</span>
          </a>
        </li>
      )}
    </ul>
  );
}
