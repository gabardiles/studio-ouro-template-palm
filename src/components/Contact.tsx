"use client";

/**
 * Contact – Google Maps embed, contact info rows, optional form.
 * All content from client.config.ts. Map: uses contact.mapUrl when set,
 * otherwise derives embed from seo.geo (lat/lng) so scraped geo data drives the map.
 * Each field renders only when not null or empty string.
 */

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, BellRing, Check } from "lucide-react";
import { client } from "../../client.config";

function hasValue(v: string | null | undefined): v is string {
  return v != null && v.trim() !== "";
}

/** Embed URL from config: explicit contact.mapUrl or derived from seo.geo (lat/lng). */
function getMapEmbedUrl(): string | null {
  if (hasValue(client.contact.mapUrl)) return client.contact.mapUrl;
  const { lat, lng } = client.seo.geo;
  if (lat && lng) return `https://www.google.com/maps?q=${lat},${lng}&z=14&output=embed`;
  return null;
}

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const mapUrl = getMapEmbedUrl();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="kontakt" className="bg-[var(--section-alt)] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-zinc-700 dark:text-zinc-400">
          Hör av dig
        </h2>
        <h3 className="mt-3 text-center text-3xl font-medium tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
          Kontakta oss
        </h3>

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column: map + contact info */}
          <div className="space-y-8">
            {/* Google Maps embed: contact.mapUrl or derived from seo.geo (scraped data) */}
            {mapUrl && (
              <div className="overflow-hidden rounded-lg border border-zinc-200 shadow-sm dark:border-zinc-700">
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="260"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Karta"
                  className="block w-full"
                />
              </div>
            )}

            {/* Contact rows */}
            <div className="space-y-5">
              {hasValue(client.contact.phone) && (
                <a
                  href={`tel:${client.contact.phone!.replace(/[\s-]/g, "")}`}
                  className="flex items-start gap-4 transition-colors hover:text-zinc-900 dark:hover:text-white"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Telefon</p>
                    <p className="text-xl font-semibold text-zinc-900 dark:text-white">{client.contact.phone}</p>
                  </div>
                </a>
              )}

              {hasValue(client.contact.email) && (
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">E-post</p>
                    <a href={`mailto:${client.contact.email}`} className="font-medium text-zinc-900 hover:text-zinc-700 dark:text-white dark:hover:text-zinc-300">
                      {client.contact.email}
                    </a>
                  </div>
                </div>
              )}

              {hasValue(client.contact.address) && (
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Adress</p>
                    <p className="font-medium text-zinc-900 dark:text-white">{client.contact.address}</p>
                  </div>
                </div>
              )}

              {hasValue(client.contact.hours) && (
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Öppettider</p>
                    <p className="font-medium text-zinc-900 dark:text-white">{client.contact.hours}</p>
                  </div>
                </div>
              )}

              {hasValue(client.contact.emergency) && (
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-[var(--accent)]"
                    style={{ backgroundColor: `${client.brand.accentColor}1a` }}
                  >
                    <BellRing className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Akut</p>
                    <p className="font-medium text-zinc-800 dark:text-zinc-200">{client.contact.emergency}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Form */}
          {client.contact.formEnabled && (
            <div className="rounded-lg border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                    <Check className="h-7 w-7" />
                  </div>
                  <p className="mt-4 text-lg font-medium text-zinc-900 dark:text-white">Tack för ditt meddelande!</p>
                  <p className="mt-1 text-zinc-600 dark:text-zinc-400">Vi återkommer så snart vi kan.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Namn</label>
                    <input
                      id="name" name="name" type="text" required
                      className="mt-1.5 w-full rounded-lg border-0 bg-zinc-100 px-4 py-3 text-zinc-900 placeholder:text-zinc-400 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)] dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500 dark:focus:bg-zinc-700"
                      placeholder="Ditt namn"
                    />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Telefon</label>
                      <input
                        id="phone" name="phone" type="tel"
                        className="mt-1.5 w-full rounded-lg border-0 bg-zinc-100 px-4 py-3 text-zinc-900 placeholder:text-zinc-400 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)] dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500 dark:focus:bg-zinc-700"
                        placeholder="070-000 00 00"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">E-post</label>
                      <input
                        id="email" name="email" type="email" required
                        className="mt-1.5 w-full rounded-lg border-0 bg-zinc-100 px-4 py-3 text-zinc-900 placeholder:text-zinc-400 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)] dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500 dark:focus:bg-zinc-700"
                        placeholder="din@email.se"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Meddelande</label>
                    <textarea
                      id="message" name="message" rows={4}
                      className="mt-1.5 w-full rounded-lg border-0 bg-zinc-100 px-4 py-3 text-zinc-900 placeholder:text-zinc-400 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)] dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500 dark:focus:bg-zinc-700"
                      placeholder="Beskriv ditt ärende..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-full bg-[var(--accent)] py-3.5 text-base font-bold text-white shadow-sm transition hover:brightness-110"
                  >
                    Skicka förfrågan
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
