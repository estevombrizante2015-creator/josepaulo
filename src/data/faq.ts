export type FaqItem = {
  question: string;
  /** Resposta fornecida pelo escritório. Não inventar condições de atendimento (§22). */
  answer: string | null;
};

export const faq: FaqItem[] = [
  { question: "Preciso agendar um atendimento?", answer: null },
  { question: "Quais documentos devo levar?", answer: null },
  { question: "O atendimento pode ser realizado online?", answer: null },
  { question: "Como funciona a análise inicial?", answer: null },
  { question: "O escritório atende pessoas de outras cidades?", answer: null },
  { question: "Como acompanho meu caso?", answer: null },
];
