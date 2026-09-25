import { Fragment } from "react";

/** Converte trechos entre *asteriscos* em itálico com a cor de destaque da seção. */
export function Emphasis({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/g).map((part, index) =>
        part.length > 2 && part.startsWith("*") && part.endsWith("*") ? (
          <em key={index} className="font-serif italic text-accent">
            {part.slice(1, -1)}
          </em>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </>
  );
}
