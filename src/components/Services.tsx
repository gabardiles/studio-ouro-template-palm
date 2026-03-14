/**
 * Services – cards with background image/gradient, icon overlay, and text.
 * Links to individual /tjanster/[slug] subpages. All content from client.config.ts.
 */

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { client } from "../../client.config";
import { ServiceIcon } from "./ServiceIcons";

export function Services() {
  return (
    <section id="tjanster" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-zinc-700">
          Vad vi erbjuder
        </h2>
        <h3 className="mt-3 text-center text-3xl font-medium tracking-tight text-zinc-900 sm:text-4xl">
          Våra tjänster
        </h3>
        <p className="mx-auto mt-4 max-w-xl text-center text-zinc-600">
          Vi erbjuder ett brett utbud av tjänster för hem och fastighet.
        </p>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {client.services.map((service) => (
            <Link
              key={service.slug}
              href={`/tjanster/${service.slug}`}
              className="group overflow-hidden rounded-lg border border-zinc-100 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Image / gradient area with icon overlay */}
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                {service.heroImage ? (
                  <>
                    <Image
                      src={service.heroImage}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </>
                ) : (
                  <>
                    <div
                      className="absolute inset-0 transition-transform duration-300 group-hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${client.brand.primaryColor} 0%, #16213e 50%, ${client.brand.accentColor}55 100%)`,
                      }}
                    />
                  </>
                )}
                {/* Icon badge in top-left corner */}
                <div className="absolute top-3 left-3 flex h-10 w-10 items-center justify-center rounded-md bg-white/90 text-zinc-700 shadow-sm backdrop-blur-sm">
                  <ServiceIcon name={service.icon ?? ''} />
                </div>
              </div>

              {/* Text content */}
              <div className="p-6">
                <h3 className="text-lg font-medium text-zinc-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  {service.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-zinc-700 opacity-0 transition-opacity group-hover:opacity-100">
                  Läs mer <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
