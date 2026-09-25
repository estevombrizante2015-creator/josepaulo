export type SocialNetwork = "instagram" | "facebook" | "linkedin" | "jusbrasil";

export type SocialLink = {
  network: SocialNetwork;
  label: string;
  url: string | null;
};

/**
 * Perfis oficiais (§31). Não criar links fictícios: preencha `url` somente
 * com perfis confirmados pelo escritório. O WhatsApp vem de siteConfig.
 */
export const socialLinks: SocialLink[] = [
  { network: "instagram", label: "Instagram", url: null },
  { network: "facebook", label: "Facebook", url: null },
  { network: "linkedin", label: "LinkedIn", url: null },
  { network: "jusbrasil", label: "Jusbrasil", url: null },
];

export const activeSocialLinks = socialLinks.filter(
  (link): link is SocialLink & { url: string } => Boolean(link.url),
);
