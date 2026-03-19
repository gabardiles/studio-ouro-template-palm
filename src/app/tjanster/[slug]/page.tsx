/**
 * Dynamic service subpage – /tjanster/[slug]
 *
 * Layout:
 *   1. Hero – contained banner with gradient/image bg, centered title + preamble + CTAs
 *   2. Two alternating text+image blocks
 *   3. Highlights – bulleted card grid
 *   4. CTA banner (from SubpageLayout)
 *   5. Comments section
 * All content from client.config.ts. Statically generated via generateStaticParams.
 */

import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ImageIcon, Phone, CheckCircle } from "lucide-react";
import { client } from "../../../../client.config";
import { SubpageLayout } from "@/components/SubpageLayout";
import { getPrimaryCtaHref } from "@/lib/cta";
import { ServiceIcon } from "@/components/ServiceIcons";
import { ServiceFAQ } from "@/components/ServiceFAQ";

type Props = { params: Promise<{ slug: string }> };

function getService(slug: string) {
  return client.services.find((s) => s.slug === slug);
}

export function generateStaticParams() {
  return client.services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.pageTitle} — ${client.brand.name}`,
    description: service.pageDescription,
  };
}

function SectionPlaceholder({ className }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-lg ${className ?? ""}`}>
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${client.brand.primaryColor} 0%, #16213e 60%, ${client.brand.accentColor}66 100%)`,
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <ImageIcon className="h-16 w-16 text-white/15" strokeWidth={1} />
      </div>
    </div>
  );
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <SubpageLayout backLabel="Alla tjänster">
      {/* ───── Hero banner (contained, not full-width) ───── */}
      <section className="px-4 pt-8 sm:px-6">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-lg">
          {/* Background */}
          {service.heroImage ? (
            <>
              <Image
                src={service.heroImage}
                alt={service.pageTitle}
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1152px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
            </>
          ) : (
            <>
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(160deg, ${client.brand.primaryColor} 0%, #16213e 45%, ${client.brand.primaryColor} 100%)`,
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent" />
              <div
                className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
                style={{ background: client.brand.accentColor }}
              />
            </>
          )}

          {/* Content */}
          <div className="relative z-10 px-6 py-20 text-center sm:px-12 sm:py-28 md:py-32">
            <div className="mx-auto flex items-center justify-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white/10 text-white backdrop-blur-sm">
                <ServiceIcon name={service.icon ?? ''} />
              </div>
              <span className="text-sm font-semibold uppercase tracking-widest text-white/70">
                Tjänst
              </span>
            </div>

            <h1 className="mx-auto mt-5 max-w-2xl break-words text-3xl font-medium leading-tight tracking-tight text-white hyphens-auto sm:text-4xl md:text-5xl">
              {service.pageTitle}
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/80">
              {service.preamble}
            </p>

            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href={getPrimaryCtaHref()}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-[var(--accent)]/30 transition hover:brightness-110"
              >
                <Phone className="h-5 w-5" />
                {client.hero.cta.primary.text}
              </a>
              <Link
                href="/#kontakt"
                className="inline-flex items-center justify-center rounded-full border-2 border-white/30 bg-white/5 px-7 py-3.5 text-base font-bold text-white backdrop-blur-sm transition hover:border-white/60 hover:bg-white/10"
              >
                Skicka förfrågan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Alternating sections ───── */}
      {service.sections.map((section, i) => {
        const imageLeft = i % 2 === 0;
        type SectionWithOptionalImage = { heading: string; body: string; readonly image?: string | null };
        const sectionImage: string | null = (section as SectionWithOptionalImage)?.image ?? null;
        const imageBlock = sectionImage ? (
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-zinc-100 shadow-md dark:bg-zinc-800">
            <Image
              src={sectionImage}
              alt={section.heading}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        ) : (
          <SectionPlaceholder className="aspect-[4/3] w-full shadow-md" />
        );
        const textBlock = (
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-medium tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              {section.heading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
              {section.body}
            </p>
          </div>
        );

        return (
          <section
            key={section.heading}
            className={i % 2 === 0 ? "bg-[var(--section-alt)] py-16 sm:py-24" : "py-16 sm:py-24"}
          >
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                {imageLeft ? (
                  <>
                    {imageBlock}
                    {textBlock}
                  </>
                ) : (
                  <>
                    {textBlock}
                    {imageBlock}
                  </>
                )}
              </div>
            </div>
          </section>
        );
      })}

      {/* ───── Highlights card grid ───── */}
      {service.highlights.length > 0 && (
        <section className="bg-[var(--section-alt)] py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-center text-2xl font-medium tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              Det här ingår
            </h2>
            <div className="mt-12 flex flex-wrap justify-center gap-6">
              {service.highlights.map((item) => (
                <div
                  key={item.title}
                  className="flex w-full gap-4 rounded-lg border border-zinc-100 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                >
                  <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-[var(--accent)]" />
                  <div>
                    <h3 className="font-medium text-zinc-900 dark:text-white">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───── Service-specific FAQ ───── */}
      {service.faq.length > 0 && (
        <>
          <ServiceFAQ items={service.faq} />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: service.faq.map((f) => ({
                  "@type": "Question",
                  name: f.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: f.answer,
                  },
                })),
              }),
            }}
          />
        </>
      )}
    </SubpageLayout>
  );
}
