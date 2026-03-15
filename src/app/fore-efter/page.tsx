/**
 * Before & After page – /fore-efter
 * Only active when client.pages.includes("before-after").
 * Text-only cards with category badges. Filter bar when 2+ categories.
 */

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { client } from "../../../client.config";
import { SubpageLayout } from "@/components/SubpageLayout";
import { BeforeAfterGrid } from "@/components/BeforeAfterGrid";

export const metadata: Metadata = {
  title: `Före & efter — ${client.brand.name}`,
  description: `Se exempel på vårt arbete — före och efter.`,
};

export default function BeforeAfterPage() {
  if (!client.pages.includes("before-after") || !client.beforeAfter) {
    notFound();
  }

  const { headline, intro, items } = client.beforeAfter;

  return (
    <SubpageLayout backLabel="Tillbaka till startsidan">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h1 className="text-3xl font-medium tracking-tight text-zinc-900 sm:text-4xl">
          {headline}
        </h1>
        {intro && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-600">
            {intro}
          </p>
        )}
        <BeforeAfterGrid items={items} accentColor={client.brand.accentColor} />
      </div>
    </SubpageLayout>
  );
}
