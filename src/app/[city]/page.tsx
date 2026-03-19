/**
 * Individual city page – /[city]
 * Only active when client.pages.includes("locations").
 * Strong local SEO: city in <title>, <h1>, and first paragraph.
 */

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { client } from "../../../client.config";
import { SubpageLayout } from "@/components/SubpageLayout";
import { citySlug } from "@/lib/citySlug";

interface Props {
  params: Promise<{ city: string }>;
}

function findLocation(slug: string) {
  return client.locations?.items.find((loc) => citySlug(loc.city) === slug) ?? null;
}

export async function generateStaticParams() {
  if (!client.pages.includes("locations") || !client.locations) return [];
  return client.locations.items.map((loc) => ({ city: citySlug(loc.city) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const loc = findLocation(city);
  if (!loc) return {};
  return {
    title: `${loc.seo_title} — ${client.brand.name}`,
    description: loc.description,
  };
}

export default async function CityPage({ params }: Props) {
  const { city } = await params;

  if (!client.pages.includes("locations") || !client.locations) notFound();

  const loc = findLocation(city);
  if (!loc) notFound();

  return (
    <SubpageLayout backLabel="Alla områden">
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          {client.brand.name} i {loc.city}
        </p>
        <h1 className="mt-3 text-3xl font-medium tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
          {loc.seo_title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
          {loc.description}
        </p>
      </article>
    </SubpageLayout>
  );
}
