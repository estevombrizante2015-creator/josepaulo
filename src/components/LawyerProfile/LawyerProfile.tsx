import { Container } from "@/components/ui/Container";
import { Pending } from "@/components/ui/Pending";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { profile } from "@/data/content";
import { sections, siteConfig, TO_FILL } from "@/data/site";

/** Perfil profissional e biografia (arquitetura.md §14, §15 e §39). */
export function LawyerProfile() {
  const credentials = [
    siteConfig.profession,
    siteConfig.oab,
    `${siteConfig.location.city} — ${siteConfig.location.state}`,
  ];

  return (
    <section
      id={sections.perfil}
      aria-labelledby="perfil-titulo"
      className="tone-dark relative overflow-hidden bg-graphite py-24 text-fg md:py-32 lg:py-40"
    >
      <Container className="grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Reveal className="lg:sticky lg:top-32">
            <figure className="group relative">
              <div
                aria-hidden="true"
                className="absolute -top-4 -right-4 size-full border border-accent/30 transition-transform duration-700 ease-editorial group-hover:translate-x-1 group-hover:-translate-y-1"
              />
              <PhotoFrame
                image={siteConfig.images.portrait}
                alt={`Retrato de ${siteConfig.fullName}`}
                placeholderLabel="Foto profissional"
                sizes="(min-width: 1024px) 34vw, 100vw"
                className="aspect-[4/5]"
                imageClassName="object-[50%_30%] transition duration-1000 ease-editorial group-hover:scale-[1.03] lg:grayscale lg:group-hover:grayscale-0"
              />
              <figcaption className="type-eyebrow mt-6 flex items-center gap-4 text-fg-muted">
                <span aria-hidden="true" className="h-px w-8 bg-accent" />
                {siteConfig.fullName}
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <SectionHeader
            index="003"
            label={profile.label}
            title={siteConfig.fullName}
            titleId="perfil-titulo"
            className="mb-10 md:mb-12"
          />

          <Reveal>
            <ul className="type-eyebrow flex flex-wrap items-center gap-x-5 gap-y-3 text-accent">
              {credentials.map((credential, index) => (
                <li key={credential} className="flex items-center gap-5">
                  {index > 0 && <span aria-hidden="true" className="h-3 w-px bg-line" />}
                  {credential}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 text-lg leading-relaxed text-fg-muted">
            {profile.summary ? <p>{profile.summary}</p> : <Pending />}
          </Reveal>

          <dl className="mt-12 grid border-t border-line sm:grid-cols-2 sm:gap-x-10">
            {profile.biography.map((item, index) => (
              <Reveal key={item.label} delay={(index % 2) * 0.08} className="border-b border-line py-5">
                <dt className="type-eyebrow text-fg-muted">{item.label}</dt>
                <dd className="mt-3 leading-relaxed text-fg">{item.value ?? <Pending label={TO_FILL} />}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
