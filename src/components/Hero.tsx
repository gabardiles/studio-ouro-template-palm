/**
 * Hero – full viewport, left-aligned editorial layout.
 * Gradient or image background from config. All icons from Lucide.
 */

import Image from "next/image";
import { BadgeCheck, ArrowRight } from "lucide-react";
import { client } from "../../client.config";
import { getPrimaryCtaHref } from "@/lib/cta";

export function Hero() {
  const { hero } = client;

  return (
    <section id="hem" className="relative flex min-h-[min(100dvh,920px)] max-h-[920px] flex-col justify-end overflow-hidden">
      {/* Background – pointer-events-none so they don't block scroll/click */}
      {hero.image ? (
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image src={hero.image} alt={hero.headline} fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </div>
      ) : (
        <>
          <div
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background: `linear-gradient(135deg, ${client.brand.primaryColor} 0%, #16213e 40%, #1a3a4a 70%, ${client.brand.primaryColor} 100%)`,
            }}
          />
          <div className="pointer-events-none absolute inset-0 z-0 opacity-30" style={{ background: `radial-gradient(ellipse at 70% 50%, ${client.brand.accentColor}44 0%, transparent 60%)` }} />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent" />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-24 pt-40 sm:px-6 sm:pb-28 md:pb-32">
        {/* Label line */}
        <div className="flex items-center gap-2">
          <BadgeCheck className="h-4 w-4 text-white/50" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
            {hero.badge ?? client.brand.name}
          </span>
        </div>

        {/* Headline */}
        <h1 className="mt-6 max-w-3xl break-words text-4xl font-medium leading-[1.05] tracking-tight text-white hyphens-auto sm:text-5xl md:text-6xl lg:text-7xl">
          {hero.headline}
        </h1>

        {/* Bottom row: preamble left, CTAs right */}
        <div className="mt-10 flex flex-col gap-8 sm:mt-14 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-md text-base leading-relaxed text-white/70 sm:text-lg">
            {hero.subheadline}
          </p>

          <div className="flex flex-col items-center gap-4">
            <a
              href={hero.cta.secondary.href}
              className="inline-flex items-center justify-center rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-white transition hover:border-white hover:bg-white/10"
            >
              {hero.cta.secondary.text}
            </a>
            <a
              href={getPrimaryCtaHref()}
              className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-white/70 transition hover:text-white"
            >
              {hero.cta.primary.text} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
