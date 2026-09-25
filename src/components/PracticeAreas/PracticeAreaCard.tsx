"use client";

import { useId, useState } from "react";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/ui/Icons";
import { Pending } from "@/components/ui/Pending";
import { practiceAreasSection } from "@/data/content";
import type { PracticeArea } from "@/data/practiceAreas";
import { track } from "@/lib/analytics";
import { whatsappHref } from "@/lib/utils";

const revealed =
  "group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-within:grid-rows-[1fr] group-focus-within:opacity-100 group-data-[open=true]:grid-rows-[1fr] group-data-[open=true]:opacity-100";

/**
 * Desktop: ao passar o mouse, o card sobe, a borda dourada aparece, o número
 * muda, a descrição surge e a seta se movimenta. Mobile: ao tocar, expande (§17).
 * A altura mínima reserva espaço para a descrição e evita deslocar o layout.
 */
export function PracticeAreaCard({ area, number }: { area: PracticeArea; number: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const titleId = `${id}-titulo`;
  const panelId = `${id}-descricao`;

  function toggle() {
    const next = !open;
    setOpen(next);
    if (next) track("practice_area_open", { label: area.title });
  }

  return (
    <article
      data-open={open}
      className="group relative flex h-full min-h-[23rem] flex-col border border-line bg-graphite/50 p-7 transition duration-500 ease-editorial hover:-translate-y-1.5 hover:border-accent/60 data-[open=true]:border-accent/60 lg:p-9"
    >
      <div className="flex items-start justify-between">
        <span className="relative block h-[1.2em] overflow-hidden font-serif text-2xl leading-[1.2]">
          <span className="block text-fg-muted transition-transform duration-500 ease-editorial group-hover:-translate-y-full group-data-[open=true]:-translate-y-full">
            {number}
          </span>
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-full block text-accent italic transition-transform duration-500 ease-editorial group-hover:-translate-y-full group-data-[open=true]:-translate-y-full"
          >
            {number}
          </span>
        </span>
        <ArrowUpRightIcon className="size-5 text-fg-muted transition duration-500 ease-editorial group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent" />
      </div>

      <h3 id={titleId} className="mt-auto pt-14 font-serif text-[1.9rem] leading-tight text-fg">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={toggle}
          className="text-left after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-1 focus-visible:after:outline-offset-4 focus-visible:after:outline-accent"
        >
          {area.title}
        </button>
      </h3>

      <span
        aria-hidden="true"
        className="mt-5 block h-px w-10 origin-left bg-accent transition-transform duration-500 ease-editorial group-hover:scale-x-[2.5] group-data-[open=true]:scale-x-[2.5]"
      />

      <div
        id={panelId}
        role="region"
        aria-labelledby={titleId}
        className={`grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-editorial ${revealed}`}
      >
        <div className="overflow-hidden">
          <p className="pt-5 leading-relaxed text-fg-muted">{area.description ?? <Pending />}</p>
          <a
            href={whatsappHref(`Olá, Dr. José Paulo. Gostaria de informações sobre ${area.title}.`)}
            target="_blank"
            rel="noopener noreferrer"
            data-track="whatsapp_click"
            data-track-label={area.title}
            data-track-location="atuacao"
            className="relative z-10 mt-6 inline-flex items-center gap-3 text-[0.6875rem] font-semibold tracking-[0.2em] text-accent uppercase"
          >
            {practiceAreasSection.cardCta}
            <span className="sr-only"> sobre {area.title} pelo WhatsApp (abre em nova aba)</span>
            <ArrowRightIcon className="size-4 transition-transform duration-500 ease-editorial group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </article>
  );
}
