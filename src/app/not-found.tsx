import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Página não encontrada",
};

export default function NotFound() {
  return (
    <PageHero label="Erro 404" title="Página não *encontrada*">
      <p>O endereço acessado não existe ou foi alterado.</p>
      <div className="mt-10">
        <ButtonLink href="/" arrow>
          Voltar ao início
        </ButtonLink>
      </div>
    </PageHero>
  );
}
