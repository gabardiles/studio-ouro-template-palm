/**
 * Trust – certifications/memberships as pills with Lucide ShieldCheck icon.
 * All content from client.config.ts.
 */

import { ShieldCheck } from "lucide-react";
import { client } from "../../client.config";

export function Trust() {
  const { trust } = client;
  const hasCertifications = trust.certifications?.length > 0;
  const hasMemberships = trust.memberships?.length > 0;
  if (!hasCertifications && !hasMemberships) return null;

  return (
    <section className="py-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {hasCertifications &&
            trust.certifications.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
              >
                <ShieldCheck className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                {item}
              </span>
            ))}
          {hasMemberships &&
            trust.memberships.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
              >
                <ShieldCheck className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                {item}
              </span>
            ))}
        </div>
        {trust.insurance && (
          <p className="mt-5 text-center text-sm text-zinc-600 dark:text-zinc-400">
            {trust.insurance}
          </p>
        )}
      </div>
    </section>
  );
}
