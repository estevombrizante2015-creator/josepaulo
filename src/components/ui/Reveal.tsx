"use client";

import { m, type Variants } from "motion/react";
import type { ReactNode } from "react";

const presets = {
  rise: { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } },
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  "line-x": { hidden: { scaleX: 0 }, visible: { scaleX: 1 } },
  "line-y": { hidden: { scaleY: 0 }, visible: { scaleY: 1 } },
} satisfies Record<string, Variants>;

type RevealProps = {
  children?: ReactNode;
  className?: string;
  variant?: keyof typeof presets;
  delay?: number;
  duration?: number;
};

/** Revela o conteúdo ao entrar na tela — fade, reveal e linhas (arquitetura.md §36). */
export function Reveal({ children, className, variant = "rise", delay = 0, duration }: RevealProps) {
  const isLine = variant === "line-x" || variant === "line-y";

  return (
    <m.div
      className={className}
      variants={presets[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: isLine ? 0.5 : 0.2 }}
      transition={{
        duration: duration ?? (isLine ? 1.4 : 0.9),
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </m.div>
  );
}
