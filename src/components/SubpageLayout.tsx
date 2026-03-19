/**
 * Shared layout for subpages – back link, header/footer, and CTA banner.
 * Keeps subpages consistent with the one-pager shell.
 */

import Link from "next/link";
import { ArrowLeft, Phone } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingWidgets } from "./FloatingWidgets";
import { client } from "../../client.config";
import { getPrimaryCtaHref } from "@/lib/cta";

export function SubpageLayout({
  children,
  backLabel = "Tillbaka",
  backHref = "/",
}: {
  children: React.ReactNode;
  backLabel?: string;
  backHref?: string;
}) {
  return (
    <>
      <Header />
      <main>
        {/* Back link */}
        <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </Link>
        </div>

        {children}

        {/* CTA banner */}
        <section
          className="relative overflow-hidden py-14 sm:py-16"
          style={{ backgroundColor: client.brand.primaryColor }}
        >
          {/* Animated blobs */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            {/* Bright primary blob – top left drift */}
            <div
              className="absolute -top-24 left-[5%] h-[420px] w-[420px] rounded-full"
              style={{
                backgroundColor: client.brand.primaryColor,
                filter: "blur(72px) brightness(1.6)",
                opacity: 0.65,
                animation: "cta-blob-1 11s ease-in-out infinite",
              }}
            />
            {/* Accent glow blob – top right */}
            <div
              className="absolute -top-10 right-[8%] h-[300px] w-[300px] rounded-full"
              style={{
                backgroundColor: client.brand.accentColor,
                filter: "blur(80px)",
                opacity: 0.28,
                animation: "cta-blob-2 14s ease-in-out infinite",
              }}
            />
            {/* Dark depth blob – bottom center */}
            <div
              className="absolute -bottom-28 left-[30%] h-[460px] w-[460px] rounded-full"
              style={{
                backgroundColor: "rgba(0,0,0,0.6)",
                filter: "blur(90px)",
                opacity: 0.55,
                animation: "cta-blob-3 9s ease-in-out infinite",
              }}
            />
          </div>

          <div className="relative z-10 mx-auto max-w-2xl px-4 text-center sm:px-6">
            <h2 className="text-2xl font-medium text-white sm:text-3xl">
              Redo att komma igång?
            </h2>
            <p className="mt-3 text-zinc-300">
              Kontakta oss för en kostnadsfri offert – vi återkommer inom 2 timmar.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href={getPrimaryCtaHref()}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-[var(--accent)]/30 transition hover:brightness-110"
              >
                <Phone className="h-5 w-5" />
                {client.hero.cta.primary.text}
              </a>
              <Link
                href="/#kontakt"
                className="inline-flex items-center justify-center rounded-full border-2 border-white/30 bg-white/5 px-7 py-3.5 text-base font-bold text-white backdrop-blur-sm transition hover:border-white/60 hover:bg-white/10"
              >
                Skicka förfrågan
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWidgets />
    </>
  );
}
