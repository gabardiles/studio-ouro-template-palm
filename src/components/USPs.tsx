/**
 * USPs – two-column card layout: heading left, checklist right.
 * Dynamic gradient background built from brand.primaryColor + brand.accentColor.
 */

import { Check } from "lucide-react";
import { client } from "../../client.config";

export function USPs() {
  const { primaryColor, accentColor } = client.brand;

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Card with dynamic gradient */}
        <div className="relative overflow-hidden rounded-2xl">
          {/* Base gradient from brand colors */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${primaryColor} 0%, #0d1a16 55%, ${primaryColor}cc 100%)`,
            }}
          />
          {/* Accent glow – upper-right corner */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 75% 20%, ${accentColor}55 0%, transparent 55%)`,
            }}
          />
          {/* Subtle noise texture overlay for depth */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

          {/* Content – true 2-col, both sides start at same height */}
          <div className="relative z-10 grid gap-10 px-8 py-12 sm:px-12 sm:py-14 lg:grid-cols-2 lg:items-start lg:gap-20">

            {/* Left – label + title + body */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                Trygga val
              </p>
              <h3 className="mt-4 text-3xl font-medium leading-tight tracking-tight text-white sm:text-4xl">
                Varför välja oss?
              </h3>
              <p className="mt-5 leading-relaxed text-white/55">
                Vi levererar hög kvalitet, tydlig kommunikation och ett resultat
                du kan vara stolt över — varje gång.
              </p>
            </div>

            {/* Right – checklist */}
            <ul className="space-y-5">
              {client.usps.map((usp) => (
                <li key={usp.title} className="flex items-start gap-4">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${accentColor}33` }}
                  >
                    <Check
                      className="h-3 w-3"
                      style={{ color: accentColor }}
                      strokeWidth={2.5}
                    />
                  </span>
                  <div>
                    <p className="font-medium leading-snug text-white">{usp.title}</p>
                    {usp.description && (
                      <p className="mt-1 text-sm leading-relaxed text-white/55">
                        {usp.description}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
