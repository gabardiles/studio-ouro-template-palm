/**
 * Services – cards with background image/gradient, icon overlay, and text.
 * Links to individual /tjanster/[slug] subpages. All content from client.config.ts.
 */

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, PhoneCall } from "lucide-react";
import { client } from "../../client.config";
import { ServiceIcon } from "./ServiceIcons";
import { ServicesSlider } from "./ServicesSlider";
import { RotCalculator } from "./RotCalculator";

const showRotRut = client.skills?.includes("rot-rut") ?? false;

const ROT_BULLETS = [
  "Dra av 30% av arbetskostnaden direkt på skatten",
  "Upp till 50 000 kr per person och år",
  "Gäller arbete i och runt ditt hem",
  "Vi sköter all administration & rapportering till Skatteverket",
];

export function Services() {
  return (
    <section id="tjanster" className="bg-zinc-100 py-14 dark:bg-zinc-900/30 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {client.services.length > 3 ? (
          /* Slider with its own left-aligned heading + arrows */
          <ServicesSlider
            services={client.services}
            primaryColor={client.brand.primaryColor}
            accentColor={client.brand.accentColor}
          />
        ) : (
          /* Standard centered heading + grid for 3 or fewer */
          <>
          <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-zinc-700 dark:text-zinc-400">
            Vad vi erbjuder
          </h2>
          <h3 className="mt-3 text-center text-3xl font-medium tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Våra tjänster
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-center text-zinc-600 dark:text-zinc-400">
            Vi erbjuder ett brett utbud av tjänster för hem och fastighet.
          </p>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {client.services.map((service) => (
            <Link
              key={service.slug}
              href={`/tjanster/${service.slug}`}
              className="group overflow-hidden rounded-lg border border-zinc-100 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
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
                <h3 className="text-lg font-medium text-zinc-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {service.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-zinc-700 opacity-0 transition-opacity group-hover:opacity-100 dark:text-zinc-200">
                  Läs mer <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
          </div>
          </>
        )}

        {/* ROT/RUT Calculator — shown only when skill is enabled */}
        {showRotRut && (
          <div className="relative mt-20 overflow-hidden rounded-2xl">
            {/* Background */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${client.brand.primaryColor} 0%, #0d1f38 45%, #111827 100%)`,
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 20px,
                  rgba(255,255,255,0.8) 20px,
                  rgba(255,255,255,0.8) 21px
                )`,
              }}
            />
            <div
              className="absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-20 blur-3xl"
              style={{ backgroundColor: client.brand.accentColor }}
            />
            <div
              className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full opacity-10 blur-3xl"
              style={{ backgroundColor: client.brand.accentColor }}
            />

            {/* Content */}
            <div className="relative z-10 grid gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:gap-16 lg:p-16">
              {/* Copy */}
              <div className="flex flex-col justify-center">
                <span
                  className="mb-4 inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white"
                  style={{
                    backgroundColor: `${client.brand.accentColor}33`,
                    border: `1px solid ${client.brand.accentColor}55`,
                  }}
                >
                  ROT-avdrag
                </span>
                <h3 className="text-2xl font-semibold leading-snug text-white sm:text-3xl">
                  Spara pengar med ROT-avdrag
                </h3>
                <p className="mt-4 text-base leading-relaxed text-white/70">
                  Vi hjälper dig med ROT-avdrag på alla arbeten. Du kan dra av{" "}
                  <strong className="font-semibold text-white">
                    30% av arbetskostnaden
                  </strong>{" "}
                  direkt på skatten — upp till{" "}
                  <strong className="font-semibold text-white">
                    50 000 kr per person och år
                  </strong>
                  .
                </p>
                <a
                  href="https://www.skatteverket.se/privat/fastigheterochbostad/rotarbete.4.2e56d4ba1202f95012080002966.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-sm text-white/50 underline underline-offset-2 transition-colors hover:text-white/80"
                >
                  Läs mer om ROT-avdrag på Skatteverket.se
                </a>

                <ul className="mt-6 space-y-3">
                  {ROT_BULLETS.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2
                        className="mt-0.5 h-5 w-5 shrink-0"
                        style={{ color: client.brand.accentColor }}
                      />
                      <span className="text-sm leading-relaxed text-white/75">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                {client.contact.phone && (
                  <a
                    href={`tel:${client.contact.phone.replace(/\s/g, "")}`}
                    className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-[1.03] hover:shadow-xl active:scale-[0.98]"
                    style={{ backgroundColor: client.brand.accentColor }}
                  >
                    <PhoneCall className="h-4 w-4" />
                    Ring oss — vi räknar ut vad du sparar
                  </a>
                )}
              </div>

              {/* Calculator */}
              <div className="flex flex-col justify-center">
                <RotCalculator accentColor={client.brand.accentColor} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
