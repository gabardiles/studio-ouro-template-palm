/**
 * About subpage – /om-oss
 * Extended content from client.config.ts about.sections.
 */

import type { Metadata } from "next";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { client } from "../../../client.config";
import { SubpageLayout } from "@/components/SubpageLayout";
import { StatsBar } from "@/components/StatsBar";

export const metadata: Metadata = {
  title: `${client.about.pageTitle} — ${client.brand.name}`,
  description: client.about.pageDescription,
};

export default function AboutPage() {
  const { about } = client;

  return (
    <SubpageLayout backLabel="Startsida">
      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Hero area */}
        <p className="text-sm font-semibold uppercase tracking-widest text-zinc-700 dark:text-zinc-400">
          Om oss
        </p>
        <h1 className="mt-2 text-3xl font-medium tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
          {about.pageTitle}
        </h1>
      </article>

      {/* Hero image – full container width */}
      <div className="mx-auto mt-8 max-w-6xl px-4 sm:px-6">
        {about.image ? (
          <div className="relative aspect-[2/1] w-full overflow-hidden rounded-lg bg-zinc-100 shadow-lg dark:bg-zinc-800">
            <Image
              src={about.image}
              alt={about.pageTitle}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1152px"
              priority
            />
          </div>
        ) : (
          <div className="relative aspect-[2/1] w-full overflow-hidden rounded-lg shadow-lg">
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(135deg, ${client.brand.primaryColor} 0%, #16213e 60%, ${client.brand.accentColor}66 100%)` }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <ImageIcon className="h-16 w-16 text-white/20" strokeWidth={1} />
            </div>
          </div>
        )}
      </div>

      <article className="mx-auto max-w-4xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 sm:pb-20">
        {/* Intro */}
        <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
          {about.body}
        </p>
        {about.secondaryBody && (
          <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
            {about.secondaryBody}
          </p>
        )}

        {/* Stats bar – animated count-up on scroll */}
        <StatsBar stats={about.stats} />

        {/* Extended sections */}
        <div className="mt-14 space-y-10">
          {about.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-xl font-medium text-zinc-900 dark:text-white sm:text-2xl">
                {section.heading}
              </h2>
              <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-300">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </article>
    </SubpageLayout>
  );
}
