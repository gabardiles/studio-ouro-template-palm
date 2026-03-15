/**
 * References – "Våra uppdrag" two-column premium accordion layout.
 * Left: stacked accordion list. Right: sticky image panel. All content from client.config.ts.
 * Hidden entirely when references array is empty.
 */

import { client } from "../../client.config";
import { ReferencesAccordion } from "@/components/ReferencesAccordion";

export function References() {
  if (!client.references || client.references.length === 0) return null;

  return (
    <section id="referenser" className="bg-[var(--section-alt)] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-zinc-500">
          Tidigare projekt
        </p>
        <h3 className="mt-2 text-3xl font-medium tracking-tight text-zinc-900 sm:text-4xl">
          Våra uppdrag
        </h3>

        <ReferencesAccordion
          references={client.references}
          primaryColor={client.brand.primaryColor}
          accentColor={client.brand.accentColor}
        />
      </div>
    </section>
  );
}
