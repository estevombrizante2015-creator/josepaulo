import Image from "next/image";
import { Pending } from "@/components/ui/Pending";
import type { SiteImage } from "@/data/site";
import { cn } from "@/lib/utils";

type PhotoFrameProps = {
  image: SiteImage | null;
  alt: string;
  /** Descrição exibida enquanto a fotografia não é fornecida. */
  placeholderLabel: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
};

/** Fotografia real ou, na ausência dela, uma moldura arquitetônica com aviso de pendência. */
export function PhotoFrame({ image, alt, placeholderLabel, sizes, className, imageClassName }: PhotoFrameProps) {
  return (
    <div className={cn("relative overflow-hidden bg-surface", className)}>
      {image ? (
        <Image
          src={image}
          alt={alt}
          fill
          sizes={sizes}
          placeholder={typeof image === "string" ? "empty" : "blur"}
          className={cn("object-cover", imageClassName)}
        />
      ) : (
        <div className="bg-blueprint absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
          <CropMarks />
          <span className="type-eyebrow text-fg-muted">{placeholderLabel}</span>
          <Pending />
        </div>
      )}
    </div>
  );
}

function CropMarks() {
  const mark = "absolute size-5 border-accent/60";
  return (
    <span aria-hidden="true">
      <span className={cn(mark, "top-4 left-4 border-t border-l")} />
      <span className={cn(mark, "top-4 right-4 border-t border-r")} />
      <span className={cn(mark, "bottom-4 left-4 border-b border-l")} />
      <span className={cn(mark, "right-4 bottom-4 border-r border-b")} />
    </span>
  );
}
