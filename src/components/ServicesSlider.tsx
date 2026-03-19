"use client";

/**
 * Client-only: horizontal card slider with scroll-snap.
 * Includes its own left-aligned heading row with prev/next arrows.
 * Used by Services when there are more than 3 services.
 */

import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ServiceIcon } from "./ServiceIcons";
import type { Service } from "@/types/client-config";

const CARD_GAP_PX = 24;

export function ServicesSlider({
  services,
  primaryColor,
  accentColor,
}: {
  services: readonly Service[];
  primaryColor: string;
  accentColor: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSlider, setIsSlider] = useState(false);
  const total = services.length;

  const updateActiveIndex = useCallback(() => {
    const el = scrollRef.current;
    if (!el || total === 0) return;
    const first = el.querySelector("[data-service-card]") as HTMLElement | null;
    if (!first) return;
    const cardWidth = first.offsetWidth;
    const step = cardWidth + CARD_GAP_PX;
    const index = Math.round(el.scrollLeft / step);
    setActiveIndex(Math.min(Math.max(0, index), total - 1));
  }, [total]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setIsSlider(el.scrollWidth > el.clientWidth);
      updateActiveIndex();
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [updateActiveIndex]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateActiveIndex, { passive: true });
    return () => el.removeEventListener("scroll", updateActiveIndex);
  }, [updateActiveIndex]);

  const goTo = (index: number) => {
    const el = scrollRef.current;
    const first = el?.querySelector("[data-service-card]") as HTMLElement | null;
    if (!el || !first) return;
    const cardWidth = first.offsetWidth;
    const step = cardWidth + CARD_GAP_PX;
    el.scrollTo({ left: index * step, behavior: "smooth" });
  };

  const prev = () => goTo(Math.max(activeIndex - 1, 0));
  const next = () => goTo(Math.min(activeIndex + 1, total - 1));

  return (
    <>
      {/* ── Header row: title left, arrows right ── */}
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-zinc-700 dark:text-zinc-400">
            Vad vi erbjuder
          </p>
          <h3 className="mt-2 text-3xl font-medium tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Våra tjänster
          </h3>
        </div>

        {isSlider && (
          <div className="flex shrink-0 items-center gap-3 pb-1">
            <span className="text-sm tabular-nums text-zinc-400">
              {String(activeIndex + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(total).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={prev}
              disabled={activeIndex === 0}
              aria-label="Föregående tjänst"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 transition-all hover:border-zinc-900 hover:text-zinc-900 disabled:opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-400 dark:hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={next}
              disabled={activeIndex === total - 1}
              aria-label="Nästa tjänst"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 transition-all hover:border-zinc-900 hover:text-zinc-900 disabled:opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-400 dark:hover:text-white"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* ── Scrollable cards ── */}
      <div className="mt-8 -mx-4 sm:-mx-6">
        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-1 sm:px-6 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {services.map((service) => (
            <Link
              key={service.slug}
              data-service-card
              href={`/tjanster/${service.slug}`}
              className="group w-[82vw] flex-none snap-start overflow-hidden rounded-lg border border-zinc-100 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 sm:w-[55vw] lg:w-[calc(33.333%-1rem)]"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                {service.heroImage ? (
                  <>
                    <Image
                      src={service.heroImage}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 82vw, (max-width: 1200px) 55vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </>
                ) : (
                  <div
                    className="absolute inset-0 transition-transform duration-300 group-hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor} 0%, #16213e 50%, ${accentColor}55 100%)`,
                    }}
                  />
                )}
                <div className="absolute top-3 left-3 flex h-10 w-10 items-center justify-center rounded-md bg-white/90 text-zinc-700 shadow-sm backdrop-blur-sm">
                  <ServiceIcon name={service.icon ?? ""} />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-zinc-900 dark:text-white">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{service.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-zinc-700 opacity-0 transition-opacity group-hover:opacity-100 dark:text-zinc-200">
                  Läs mer <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
