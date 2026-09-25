/** Eventos registrados pelo site (arquitetura.md §55). */
export type AnalyticsEvent =
  | "page_view"
  | "whatsapp_click"
  | "phone_click"
  | "map_click"
  | "cta_click"
  | "practice_area_open"
  | "article_open"
  | "article_share";

type EventParams = Record<string, string | undefined>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (command: "event", name: string, params?: EventParams) => void;
  }
}

/**
 * Envia um evento para o provedor de analytics configurado.
 *
 * Nenhum provedor é carregado por padrão (evita cookies de terceiros sem
 * necessidade — §47). Ao instalar Google Tag Manager ou GA4, os eventos
 * passam a ser enviados automaticamente via `dataLayer`/`gtag`.
 * Lembre-se de atualizar a Política de Privacidade e o CSP (next.config.ts).
 */
export function track(event: AnalyticsEvent, params: EventParams = {}) {
  if (typeof window === "undefined") return;

  window.dataLayer?.push({ event, ...params });
  window.gtag?.("event", event, params);

  if (process.env.NODE_ENV === "development") {
    console.info("[analytics]", event, params);
  }
}
