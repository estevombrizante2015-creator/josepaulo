export type PracticeArea = {
  id: string;
  title: string;
  /** Breve descrição revisada pelo escritório. */
  description: string | null;
  /** Somente áreas confirmadas pelo escritório podem ficar ativas (§16). */
  active: boolean;
};

/**
 * Áreas de atuação (§53). A numeração exibida (01, 02...) segue a ordem das
 * áreas ativas.
 *
 * Os itens abaixo são apenas os exemplos estruturais do §16 e estão todos
 * desativados: NÃO publicar uma área sem confirmação do escritório.
 */
export const practiceAreas: PracticeArea[] = [
  { id: "civil", title: "Direito Civil", description: null, active: false },
  { id: "familia", title: "Direito de Família", description: null, active: false },
  { id: "trabalhista", title: "Direito Trabalhista", description: null, active: false },
  { id: "previdenciario", title: "Direito Previdenciário", description: null, active: false },
  { id: "criminal", title: "Direito Criminal", description: null, active: false },
  { id: "empresarial", title: "Direito Empresarial", description: null, active: false },
  { id: "consumidor", title: "Direito do Consumidor", description: null, active: false },
  { id: "contratual", title: "Direito Contratual", description: null, active: false },
];

export const activePracticeAreas = practiceAreas.filter((area) => area.active);
