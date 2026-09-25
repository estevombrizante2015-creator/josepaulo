import type { StaticImageData } from "next/image";
import fotoPerfil from "@/assets/images/fotoperfil.jpg";

/**
 * Marcadores de conteúdo pendente (arquitetura.md §15 e §78).
 * Nunca substitua por conteúdo fictício: use somente informações
 * fornecidas ou aprovadas pelo escritório.
 */
export const TODO = "TODO: AGUARDANDO INFORMAÇÃO DO CLIENTE";
export const TO_FILL = "[CONTEÚDO A SER PREENCHIDO]";

export type Weekday =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type SiteImage = StaticImageData | string;

export type SiteConfig = {
  name: string;
  fullName: string;
  profession: string;
  oab: string;
  url: string;
  location: { city: string; state: string; country: string };
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  /** Somente dígitos, com DDI e DDD. */
  phone: string;
  email: string | null;
  whatsapp: { number: string; message: string };
  /** Link do perfil no Google Business. Sem ele, os links de mapa usam o endereço. */
  googleBusinessUrl: string | null;
  /** "HH:MM-HH:MM" ou "closed". */
  openingHours: Record<Weekday, string>;
  images: { portrait: SiteImage | null; office: SiteImage | null };
};

export const siteConfig: SiteConfig = {
  name: "Dr. José Paulo Genari",
  fullName: "Dr. José Paulo Genari Júnior",
  profession: "Advogado",
  oab: "OAB/SP 421.704",

  // Domínio ainda não definido (§57): configure NEXT_PUBLIC_SITE_URL em produção.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  location: {
    city: "Mogi Guaçu",
    state: "SP",
    country: "Brasil",
  },

  address: {
    street: "Av. Maria Rodrigues",
    number: "22",
    neighborhood: "Chácara Gonçalo",
    city: "Mogi Guaçu",
    state: "SP",
    zipCode: "13840-082",
  },

  phone: "5519998757670",
  email: null, // TODO: AGUARDANDO INFORMAÇÃO DO CLIENTE

  whatsapp: {
    number: "5519998757670",
    // O texto pode ser ajustado pelo escritório (§27).
    message: "Olá, Dr. José Paulo. Gostaria de informações sobre atendimento jurídico.",
  },

  googleBusinessUrl: null,

  // Horário informado (§30).
  openingHours: {
    monday: "09:00-18:00",
    tuesday: "09:00-18:00",
    wednesday: "09:00-18:00",
    thursday: "09:00-18:00",
    friday: "09:00-18:00",
    saturday: "closed",
    sunday: "closed",
  },

  images: {
    portrait: fotoPerfil,
    office: null, // TODO: fotografias do escritório (§40)
  },
};

/** Âncoras das seções da página inicial. */
export const sections = {
  inicio: "inicio",
  escritorio: "escritorio",
  perfil: "perfil",
  atuacao: "atuacao",
  diferenciais: "diferenciais",
  comoTrabalhamos: "como-trabalhamos",
  transparencia: "transparencia",
  conteudos: "conteudos",
  faq: "perguntas-frequentes",
  contato: "contato",
} as const;

export type NavItem = { label: string; href: string; section: string };

const navItem = (label: string, section: string): NavItem => ({
  label,
  href: `/#${section}`,
  section,
});

/** Menu do desktop (§33). */
export const mainNavigation: NavItem[] = [
  navItem("O Escritório", sections.escritorio),
  navItem("Atuação", sections.atuacao),
  navItem("Como trabalhamos", sections.comoTrabalhamos),
  navItem("Conteúdos", sections.conteudos),
  navItem("Contato", sections.contato),
];

/** Menu completo, usado no mobile (§7 e §34). */
export const fullNavigation: NavItem[] = [
  navItem("Início", sections.inicio),
  navItem("O Escritório", sections.escritorio),
  navItem("Atuação", sections.atuacao),
  navItem("Diferenciais", sections.diferenciais),
  navItem("Como trabalhamos", sections.comoTrabalhamos),
  navItem("Conteúdos", sections.conteudos),
  navItem("Contato", sections.contato),
];
