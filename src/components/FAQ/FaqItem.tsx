"use client";

import { useId, useState } from "react";
import { Pending } from "@/components/ui/Pending";
import type { FaqItem as FaqEntry } from "@/data/faq";
import { cn, ordinal } from "@/lib/utils";

export function FaqItem({ item, index }: { item: FaqEntry; index: number }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const buttonId = `${id}-pergunta`;
  const panelId = `${id}-resposta`;

  return (
    <div className="border-b border-line">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((current) => !current)}
          className="group flex w-full items-baseline gap-5 py-7 text-left md:gap-8"
        >
          <span className="type-eyebrow w-6 shrink-0 text-accent">{ordinal(index)}</span>
          <span className="flex-1 font-serif text-[1.4rem] leading-snug text-fg transition-colors duration-300 group-hover:text-accent md:text-[1.65rem]">
            {item.question}
          </span>
          <span aria-hidden="true" className="relative mt-2 size-4 shrink-0 self-start">
            <span className="absolute top-1/2 left-0 h-px w-full bg-fg" />
            <span
              className={cn(
                "absolute top-0 left-1/2 h-full w-px bg-fg transition-transform duration-500 ease-editorial",
                open && "rotate-90",
              )}
            />
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        inert={!open}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-500 ease-editorial",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className="pb-8 pl-11 leading-relaxed text-fg-muted md:pl-14 md:text-lg">
            {item.answer ?? <Pending />}
          </div>
        </div>
      </div>
    </div>
  );
}
