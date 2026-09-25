"use client";

import { useState } from "react";
import { MapPinIcon } from "@/components/ui/Icons";
import { track } from "@/lib/analytics";
import { addressLines, mapsEmbedSrc } from "@/lib/utils";

/**
 * Mapa da localização (arquitetura.md §29). O Google Maps só é incorporado
 * quando o visitante solicita: página mais leve e nenhum dado enviado a
 * terceiros sem ação do usuário (§45 e §47).
 */
export function LocationMap() {
  const [loaded, setLoaded] = useState(false);

  function loadMap() {
    setLoaded(true);
    track("map_click", { label: "carregar-mapa", location: "contato" });
  }

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden border border-line bg-graphite sm:aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[34rem]">
      {loaded ? (
        <iframe
          src={mapsEmbedSrc}
          title={`Mapa: ${addressLines.join(", ")}`}
          className="absolute inset-0 size-full [filter:grayscale(1)_invert(0.9)_contrast(0.9)]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <>
          <div aria-hidden="true" className="bg-blueprint absolute inset-0 opacity-70" />
          <svg
            aria-hidden="true"
            viewBox="0 0 400 300"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            stroke="currentColor"
            className="absolute inset-0 size-full text-paper/10 [&_*]:[vector-effect:non-scaling-stroke]"
          >
            <path d="M-10 190 C 90 170, 150 120, 230 118 S 360 90, 420 60" strokeWidth="6" />
            <path d="M120 -10 L 170 310" strokeWidth="3" />
            <path d="M-10 70 L 420 150" strokeWidth="2" />
            <path d="M300 -10 L 260 310" strokeWidth="2" />
          </svg>

          <div className="absolute top-[42%] left-1/2 -translate-1/2 text-accent">
            <span aria-hidden="true" className="animate-pulse-ring absolute inset-0 rounded-full border border-accent" />
            <span className="relative flex size-14 items-center justify-center rounded-full border border-accent/60 bg-ink/80 backdrop-blur-sm">
              <MapPinIcon className="size-6" />
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 bg-linear-to-t from-ink via-ink/90 to-transparent p-6 pt-24 md:p-8 md:pt-28">
            <div>
              <p className="type-eyebrow text-accent">Localização</p>
              <p className="mt-3 font-serif text-2xl text-fg">{addressLines[0]}</p>
              <p className="mt-1 text-sm text-fg-muted">{addressLines.slice(1).join(" · ")}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={loadMap}
                className="inline-flex h-12 items-center justify-center border border-fg/25 px-6 text-[0.6875rem] font-semibold tracking-[0.2em] text-fg uppercase transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                Carregar mapa
              </button>
              <p className="max-w-xs text-xs leading-snug text-fg-muted sm:text-right">
                O mapa é fornecido pelo Google e só é carregado após a sua solicitação.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
