/**
 * Locations hub – /omraden
 * Only active when client.pages.includes("locations").
 * Lists all cities with links to individual city pages.
 */

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { client } from "../../../client.config";
import { SubpageLayout } from "@/components/SubpageLayout";
import { citySlug } from "@/lib/citySlug";

export const metadata: Metadata = {
  title: `Områden vi servar — ${client.brand.name}`,
  description: `${client.brand.name} utför arbeten i hela regionen. Se alla städer vi är verksamma i.`,
};

export default function OmradenPage() {
  if (!client.pages.includes("locations") || !client.locations) {
    notFound();
  }

  const { headline, intro, items } = client.locations;

  return (
    <SubpageLayout backLabel="Tillbaka till startsidan">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h1 className="text-3xl font-medium tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
          {headline}
        </h1>
        {intro && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">{intro}</p>
        )}

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((loc) => (
            <Link
              key={loc.city}
              href={`/${citySlug(loc.city)}`}
              className="group flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-6 py-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900"
            >
              <span className="font-medium text-zinc-900 group-hover:text-[var(--primary)] dark:text-white">
                {loc.city}
              </span>
              <ArrowRight className="h-4 w-4 text-zinc-400 transition group-hover:translate-x-0.5 group-hover:text-[var(--accent)] dark:text-zinc-500" />
            </Link>
          ))}
        </div>
      </div>
    </SubpageLayout>
  );
}
