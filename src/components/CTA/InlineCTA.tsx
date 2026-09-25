import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { whatsappHref } from "@/lib/utils";

/** Chamada discreta entre seções — sem aparência de publicidade (arquitetura.md §59). */
export function InlineCTA({ text, button, location }: { text: string; button: string; location: string }) {
  return (
    <Reveal className="mt-16 flex flex-col gap-6 border-t border-line pt-10 md:mt-20 md:flex-row md:items-center md:justify-between">
      <p className="max-w-xl font-serif text-2xl leading-snug text-fg italic md:text-[1.75rem]">{text}</p>
      <ButtonLink
        href={whatsappHref()}
        external
        variant="outline"
        icon={<WhatsAppIcon className="size-4" />}
        track="whatsapp_click"
        trackLocation={location}
      >
        {button}
      </ButtonLink>
    </Reveal>
  );
}
