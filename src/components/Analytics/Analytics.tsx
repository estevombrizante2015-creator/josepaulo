"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

/**
 * Registra page_view a cada navegação e os cliques em elementos marcados com
 * `data-track` (whatsapp_click, phone_click, map_click...) — arquitetura.md §55.
 * Usar delegação permite rastrear links renderizados no servidor.
 */
export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    track("page_view", { page_path: pathname });
  }, [pathname]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const element = event.target.closest<HTMLElement>("[data-track]");
      if (!element) return;
      const { track: name, trackLabel, trackLocation } = element.dataset;
      track(name as AnalyticsEvent, { label: trackLabel, location: trackLocation });
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
