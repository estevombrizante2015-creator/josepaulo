"use client";

import { useState } from "react";
import { FacebookIcon, LinkedinIcon, LinkIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { track } from "@/lib/analytics";

const buttonClasses =
  "flex size-11 items-center justify-center border border-line text-fg-muted transition-colors duration-300 hover:border-accent hover:text-accent";

/** Compartilhamento do artigo (arquitetura.md §24). */
export function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);

  const networks = [
    {
      id: "whatsapp",
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}`,
      Icon: WhatsAppIcon,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      Icon: LinkedinIcon,
    },
    {
      id: "facebook",
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      Icon: FacebookIcon,
    },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      track("article_share", { label: "copiar-link" });
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="type-eyebrow mr-2 text-fg-muted">Compartilhar</span>
      {networks.map(({ id, label, href, Icon }) => (
        <a
          key={id}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          data-track="article_share"
          data-track-label={id}
          className={buttonClasses}
        >
          <Icon className="size-4" />
          <span className="sr-only">Compartilhar no {label} (abre em nova aba)</span>
        </a>
      ))}
      <button type="button" onClick={copyLink} className={buttonClasses}>
        <LinkIcon className="size-4" />
        <span className="sr-only">Copiar link do artigo</span>
      </button>
      <span role="status" aria-live="polite" className="text-sm text-fg-muted">
        {copied ? "Link copiado" : ""}
      </span>
    </div>
  );
}
