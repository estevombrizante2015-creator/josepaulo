import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Pending } from "@/components/ui/Pending";
import { siteConfig } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { addressLines, formatDate, ordinal, phoneDisplay } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Política de Privacidade",
  description: `Como o site do escritório ${siteConfig.name} trata informações pessoais, em conformidade com a LGPD.`,
  path: "/politica-de-privacidade",
});

const LAST_UPDATED = "2026-09-25";

/**
 * Política de privacidade (arquitetura.md §47).
 * Texto-base fiel ao funcionamento atual do site: sem formulário, sem login,
 * sem cookies próprios e com o mapa carregado somente sob demanda.
 * Atualize-o sempre que o site passar a coletar dados (formulário, analytics...).
 */
export default function PrivacyPolicyPage() {
  const policy: { title: string; content: ReactNode }[] = [
    {
      title: "Quem é o responsável",
      content: (
        <p>
          Este site é mantido por {siteConfig.fullName}, advogado inscrito na {siteConfig.oab}, com escritório
          na {addressLines.join(", ")}, responsável (controlador) pelos dados pessoais eventualmente tratados
          por meio dele.
        </p>
      ),
    },
    {
      title: "Quais dados o site coleta",
      content: (
        <>
          <p>
            O site é institucional: não possui cadastro, login, área do cliente ou formulário de contato, e não
            solicita que você informe dados pessoais.
          </p>
          <p>
            Como ocorre em qualquer site, o serviço de hospedagem pode registrar automaticamente dados técnicos
            de acesso — como endereço IP, data e horário, navegador utilizado e páginas visitadas — para fins de
            segurança e funcionamento.
          </p>
          <Pending label="TODO: confirmar o provedor de hospedagem e o prazo de guarda desses registros" />
        </>
      ),
    },
    {
      title: "Contato pelo WhatsApp e por telefone",
      content: (
        <>
          <p>
            Ao clicar em um botão de WhatsApp, você é direcionado ao aplicativo WhatsApp, serviço de terceiros
            que possui política de privacidade própria. As informações que você decidir compartilhar na conversa
            ou em uma ligação são utilizadas para responder à sua solicitação.
          </p>
          <p>
            Recomendamos não enviar documentos ou detalhes sensíveis no primeiro contato: o escritório orientará
            sobre a forma adequada de compartilhá-los.
          </p>
        </>
      ),
    },
    {
      title: "Mapa de localização",
      content: (
        <p>
          O mapa da seção de contato é fornecido pelo Google Maps e só é carregado quando você clica em
          “Carregar mapa”. A partir desse momento, o Google pode coletar dados conforme a sua própria política
          de privacidade. O botão “Como chegar” abre o Google Maps em uma nova aba.
        </p>
      ),
    },
    {
      title: "Cookies e métricas",
      content: (
        <>
          <p>Este site não utiliza cookies próprios nem ferramentas de publicidade ou rastreamento.</p>
          <Pending label="TODO: atualizar esta seção caso uma ferramenta de métricas de acesso seja adotada" />
        </>
      ),
    },
    {
      title: "Seus direitos",
      content: (
        <p>
          Nos termos do art. 18 da Lei nº 13.709/2018 (LGPD), você pode solicitar: a confirmação da existência
          de tratamento; o acesso aos dados; a correção de dados incompletos, inexatos ou desatualizados; a
          anonimização, o bloqueio ou a eliminação de dados desnecessários ou excessivos; a portabilidade; a
          informação sobre compartilhamentos; e a revogação do consentimento, quando aplicável.
        </p>
      ),
    },
    {
      title: "Segurança",
      content: (
        <p>
          O site é servido por conexão segura (HTTPS) e utiliza cabeçalhos de segurança que reduzem riscos como
          a incorporação indevida das páginas e o carregamento de conteúdos não autorizados.
        </p>
      ),
    },
    {
      title: "Como falar com o escritório",
      content: (
        <>
          <p>
            Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato pelo
            telefone/WhatsApp {phoneDisplay} ou diretamente no escritório.
          </p>
          {siteConfig.email ? (
            <p>E-mail: {siteConfig.email}</p>
          ) : (
            <Pending label="TODO: e-mail para solicitações relacionadas à LGPD" />
          )}
        </>
      ),
    },
    {
      title: "Alterações desta política",
      content: (
        <p>
          Esta política pode ser atualizada para refletir mudanças no site ou na legislação. A versão vigente
          estará sempre disponível nesta página, com a data da última atualização.
        </p>
      ),
    },
  ];

  return (
    <>
      <PageHero label="LGPD" title="Política de *Privacidade*">
        <p>
          Como este site trata informações pessoais, em conformidade com a Lei Geral de Proteção de Dados
          Pessoais (Lei nº 13.709/2018).
        </p>
      </PageHero>

      <section aria-label="Termos da política" className="tone-light bg-canvas py-20 text-fg md:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <aside className="lg:col-span-4">
            <div className="space-y-5 lg:sticky lg:top-32">
              <p className="type-eyebrow text-fg-muted">Última atualização</p>
              <p className="font-serif text-2xl">{formatDate(LAST_UPDATED)}</p>
              <Pending label="TODO: texto-base — revisar com o escritório antes da publicação (§81)" />
            </div>
          </aside>

          <ol className="space-y-14 lg:col-span-7 lg:col-start-6">
            {policy.map((item, index) => (
              <li key={item.title}>
                <h2 className="flex items-baseline gap-5 font-serif text-[1.9rem] leading-tight">
                  <span className="type-eyebrow text-accent">{ordinal(index)}</span>
                  {item.title}
                </h2>
                <div className="mt-5 space-y-4 text-lg leading-relaxed text-fg-muted">{item.content}</div>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
