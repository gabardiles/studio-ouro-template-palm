/**
 * Blog placeholder – /blogg
 * Only active when client.pages.includes("blog").
 * Full AI-generated posts are a future feature.
 */

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { client } from "../../../client.config";
import { SubpageLayout } from "@/components/SubpageLayout";

export const metadata: Metadata = {
  title: `Blogg — ${client.brand.name}`,
  description: `Tips, råd och nyheter från ${client.brand.name}.`,
};

export default function BloggPage() {
  if (!client.pages.includes("blog")) notFound();

  return (
    <SubpageLayout backLabel="Tillbaka till startsidan">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="text-sm font-semibold uppercase tracking-widest text-zinc-500">
          Blogg
        </p>
        <h1 className="mt-3 text-3xl font-medium tracking-tight text-zinc-900 sm:text-4xl">
          Tips & råd från {client.brand.name}
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-zinc-600">
          Här kommer vi publicera artiklar, tips och nyheter. Kom tillbaka snart!
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse rounded-xl border border-zinc-200 bg-zinc-100 p-6"
            >
              <div className="mb-3 h-3 w-20 rounded bg-zinc-200" />
              <div className="h-5 w-3/4 rounded bg-zinc-200" />
              <div className="mt-3 space-y-2">
                <div className="h-3 rounded bg-zinc-200" />
                <div className="h-3 w-5/6 rounded bg-zinc-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </SubpageLayout>
  );
}
