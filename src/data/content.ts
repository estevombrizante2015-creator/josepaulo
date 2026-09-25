/**
 * Textos institucionais da página inicial (arquitetura.md §8 a §28).
 *
 * - Trechos entre *asteriscos* aparecem em itálico, na cor de destaque.
 * - `null` indica conteúdo que depende de informação do escritório (§78).
 * - Todo o conteúdo deve ser revisado pelo escritório antes da publicação (§81).
 */

type TitledText = { title: string; text: string };
type PendingText = { title: string; text: string | null };

export const hero = {
  name: "Dr. José Paulo Genari Júnior",
  title: "Advocacia com *estratégia*, clareza e compromisso.",
  description:
    "Atendimento jurídico personalizado para compreender cada situação, avaliar os caminhos possíveis e orientar decisões com segurança.",
  primaryCta: "Agendar atendimento",
  secondaryCta: "Conhecer o escritório",
  keywords: ["Análise", "Estratégia", "Orientação"],
};

export const authority: { label: string; title: string; items: TitledText[] } = {
  label: "Atendimento",
  title: "Experiência para *decisões importantes*.",
  items: [
    {
      title: "Atendimento personalizado",
      text: "Cada caso deve ser analisado de acordo com suas particularidades.",
    },
    {
      title: "Estratégia jurídica",
      text: "Análise cuidadosa dos caminhos jurídicos aplicáveis.",
    },
    {
      title: "Proximidade",
      text: "Comunicação clara durante o atendimento.",
    },
  ],
};

export const about: {
  label: string;
  title: string;
  subtitle: string;
  paragraphs: string[] | null;
} = {
  label: "O Escritório",
  title: "Conheça o *escritório*",
  subtitle: "Sobre o escritório",
  // Texto institucional a ser elaborado com informações do advogado (§13).
  paragraphs: null,
};

export const profile: {
  label: string;
  summary: string | null;
  biography: { label: string; value: string | null }[];
} = {
  label: "Perfil profissional",
  summary: null, // TODO: AGUARDANDO INFORMAÇÃO DO CLIENTE
  // Nenhuma informação deve ser inventada (§15).
  biography: [
    { label: "Formação", value: null },
    { label: "Especializações", value: null },
    { label: "Experiência", value: null },
    { label: "Áreas de atuação", value: null },
    { label: "Trajetória profissional", value: null },
    { label: "Cursos", value: null },
    { label: "Instituições", value: null },
    { label: "Idiomas", value: null },
  ],
};

export const practiceAreasSection = {
  label: "Atuação",
  title: "Como podemos *ajudar*",
  cardCta: "Saiba mais",
  placeholderTitle: "Direito ________",
  placeholderCount: 3,
};

export const differentials: { label: string; title: string; items: TitledText[] } = {
  label: "Diferenciais",
  title: "Mais do que *orientação jurídica*.",
  items: [
    {
      title: "Análise",
      text: "Compreender o problema antes de definir os próximos passos.",
    },
    {
      title: "Estratégia",
      text: "Avaliar alternativas jurídicas possíveis.",
    },
    {
      title: "Clareza",
      text: "Explicar questões jurídicas de maneira compreensível.",
    },
    {
      title: "Acompanhamento",
      text: "Manter o cliente informado sobre o andamento de sua demanda.",
    },
  ],
};

export const howItWorks: { label: string; title: string; steps: TitledText[] } = {
  label: "Como trabalhamos",
  title: "Como *funciona*",
  steps: [
    { title: "Primeiro contato", text: "O cliente apresenta sua situação inicial." },
    { title: "Análise", text: "São avaliados documentos e informações relevantes." },
    { title: "Orientação", text: "São apresentados os caminhos juridicamente aplicáveis." },
    { title: "Estratégia", text: "Define-se a condução adequada, conforme o caso." },
    {
      title: "Acompanhamento",
      text: "O cliente recebe informações sobre a evolução da demanda.",
    },
  ],
};

export const transparency: { label: string; title: string; items: PendingText[] } = {
  label: "Transparência",
  title: "Informação e *transparência*.",
  // "Canais oficiais" é montado a partir de siteConfig.
  items: [
    { title: "Como funciona o atendimento", text: null },
    { title: "Documentos necessários", text: null },
    { title: "Comunicação", text: null },
    { title: "Acompanhamento", text: null },
    // Somente se o escritório desejar informar (§21). Remova o item caso contrário.
    { title: "Honorários", text: null },
  ],
};

export const articlesSection = {
  label: "Conteúdos",
  title: "Informação *jurídica*",
  cardLabel: "Artigo",
  readMore: "Leia mais",
  disclaimer:
    "As informações apresentadas possuem caráter exclusivamente informativo e não substituem a análise individualizada de um profissional.",
};

export const faqSection = {
  label: "Dúvidas",
  title: "Perguntas *frequentes*",
};

export const inlineCtas = {
  practiceAreas: {
    text: "Dúvidas sobre a sua situação? Converse com o escritório.",
    button: "Falar com o escritório",
  },
  howItWorks: {
    text: "O primeiro passo é apresentar a sua situação.",
    button: "Agendar atendimento",
  },
};

export const cta = {
  label: "Atendimento",
  title: "Precisa de orientação *jurídica*?",
  text: "Converse com o escritório e apresente sua situação para avaliar os próximos passos.",
  button: "Falar com o escritório",
};

export const contactSection = {
  label: "Contato",
  title: "Fale *conosco*",
};
