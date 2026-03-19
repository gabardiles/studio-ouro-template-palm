"use client";

/**
 * Client-only: horizontal card slider with scroll-snap and dot pagination.
 * Pagination is shown only on mobile (when the list is scrollable).
 */

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

type RefItem = { title: string; description: string; image?: string | null };

const CARD_GAP_PX = 24;

export function ReferencesSlider({
  references,
  primaryColor,
  accentColor,
}: {
  references: readonly RefItem[];
  primaryColor: string;
  accentColor: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSlider, setIsSlider] = useState(false);

  const updateActiveIndex = useCallback(() => {
    const el = scrollRef.current;
    if (!el || references.length === 0) return;
    const first = el.querySelector("[data-ref-card]") as HTMLElement | null;
    if (!first) return;
    const cardWidth = first.offsetWidth;
    const step = cardWidth + CARD_GAP_PX;
    const leftPadding = 16; // spacer width on mobile
    const index = Math.round((el.scrollLeft - leftPadding) / step);
    setActiveIndex(Math.min(Math.max(0, index), references.length - 1));
  }, [references.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const canScroll = el.scrollWidth > el.clientWidth;
      setIsSlider(canScroll);
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
    const first = el?.querySelector("[data-ref-card]") as HTMLElement | null;
    if (!el || !first) return;
    const cardWidth = first.offsetWidth;
    const step = cardWidth + CARD_GAP_PX;
    const leftPadding = 16;
    el.scrollTo({ left: leftPadding + index * step, behavior: "smooth" });
  };

  return (
    <>
      <div className="-mx-4 sm:mx-0">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 scroll-smooth snap-x snap-mandatory pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0 sm:gap-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
        <div className="min-w-[16px] shrink-0 sm:hidden" aria-hidden />
        {references.map((ref) => (
          <article
            key={ref.title}
            data-ref-card
            className="group flex-shrink-0 w-[85vw] min-w-[280px] max-w-[380px] overflow-hidden rounded-lg border border-zinc-100 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg snap-start dark:border-zinc-800 dark:bg-zinc-900 sm:flex-1 sm:w-full"
          >
            {ref.image ? (
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <Image
                  src={ref.image}
                  alt={ref.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ) : (
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <div
                  className="absolute inset-0 transition-transform duration-300 group-hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor} 0%, #16213e 50%, ${accentColor}55 100%)`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <ImageIcon className="h-12 w-12 text-white/15" strokeWidth={1} />
                </div>
              </div>
            )}
            <div className="p-6">
              <h3 className="text-lg font-medium text-zinc-900 dark:text-white">{ref.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{ref.description}</p>
            </div>
          </article>
        ))}
        <div className="min-w-[16px] shrink-0 sm:hidden" aria-hidden />
        </div>
      </div>

      {references.length > 1 && isSlider && (
        <div
          className="mt-4 flex justify-center gap-2 sm:hidden"
          role="group"
          aria-label="Kortpaginering"
        >
          {references.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Gå till kort ${i + 1}${i === activeIndex ? ", valt" : ""}`}
              className="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full p-0 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
            >
              <span
                className="h-2.5 w-2.5 rounded-full transition-colors duration-200"
                style={{
                  backgroundColor: i === activeIndex ? "var(--accent)" : "#a1a1aa",
                }}
                aria-hidden
              />
            </button>
          ))}
        </div>
      )}
    </>
  );
}
