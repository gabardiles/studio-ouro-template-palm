/**
 * About – two-column layout: text + link left, image right.
 * Stats bar spans full container width below. All content from client.config.ts.
 */

import Link from "next/link";
import Image from "next/image";
import { ImageIcon, ArrowRight } from "lucide-react";
import { client } from "../../client.config";
import { StatsBar } from "./StatsBar";

export function About() {
  const { about } = client;

  return (
    <section id="om-oss" className="bg-[var(--section-alt)] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Two-column: text + image */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-zinc-700 dark:text-zinc-400">
              Om oss
            </h2>
            <h3 className="text-3xl font-medium leading-tight tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              {about.title}
            </h3>
            <p className="mt-5 text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
              {about.body}
            </p>
            {about.secondaryBody && (
              <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
                {about.secondaryBody}
              </p>
            )}

            <Link
              href="/om-oss"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-[var(--accent)]/30 transition hover:brightness-110"
            >
              Läs mer om oss <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="flex items-center justify-center">
            {about.image ? (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-zinc-100 shadow-lg dark:bg-zinc-800">
                <Image
                  src={about.image}
                  alt={about.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            ) : (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-lg">
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(135deg, ${client.brand.primaryColor} 0%, #16213e 60%, ${client.brand.accentColor}66 100%)` }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <ImageIcon className="h-20 w-20 text-white/20" strokeWidth={1} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats bar – animated count-up on scroll */}
        <StatsBar stats={about.stats} />
      </div>
    </section>
  );
}
