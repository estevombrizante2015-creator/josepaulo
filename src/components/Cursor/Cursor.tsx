"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, [role='button'], summary, label, img, article, [data-cursor]";

/**
 * Cursor extremamente discreto (arquitetura.md §37): um anel que acompanha o
 * ponteiro e cresce sobre links, botões, cards e imagens. O cursor nativo é
 * mantido. Desabilitado em telas touch e com movimento reduzido.
 */
export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!ring || !finePointer || reducedMotion) return;

    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let frame = 0;
    let visible = false;

    const render = () => {
      x += (targetX - x) * 0.22;
      y += (targetY - y) * 0.22;
      ring.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame =
        Math.abs(targetX - x) > 0.1 || Math.abs(targetY - y) > 0.1 ? requestAnimationFrame(render) : 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      targetX = event.clientX;
      targetY = event.clientY;
      if (!visible) {
        visible = true;
        x = targetX;
        y = targetY;
        ring.dataset.visible = "true";
      }
      const target = event.target instanceof Element ? event.target.closest(INTERACTIVE) : null;
      ring.dataset.active = String(Boolean(target));
      if (!frame) frame = requestAnimationFrame(render);
    };

    const onPointerLeave = () => {
      visible = false;
      ring.dataset.visible = "false";
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      data-visible="false"
      data-active="false"
      className="pointer-events-none fixed top-0 left-0 z-[70] hidden [@media(hover:hover)_and_(pointer:fine)]:block"
    >
      <span className="block size-7 -translate-1/2 rounded-full border border-gold/50 opacity-0 transition-[opacity,scale,background-color,border-color] duration-300 ease-editorial in-data-[active=true]:scale-[1.8] in-data-[active=true]:border-gold/70 in-data-[active=true]:bg-gold/10 in-data-[visible=true]:opacity-100" />
    </div>
  );
}
