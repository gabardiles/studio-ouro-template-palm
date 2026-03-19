"use client";

/**
 * Premium two-column References layout.
 * Left: stacked accordion list — click to expand description.
 * Right: sticky image panel that crossfades on selection.
 *        If a reference has multiple images, the panel becomes a slider.
 */

import { useState, useEffect } from "react";
import Image from "next/image";
import { ImageIcon, ChevronDown, ArrowLeft, ArrowRight } from "lucide-react";

type RefItem = {
  title: string;
  description: string;
  image?: string | null;
  images?: string[] | null;
  imageCaptions?: string[] | null;
};

/** Normalise single image / images array into one list */
function getImages(ref: RefItem): string[] {
  if (ref.images && ref.images.length > 0) return ref.images;
  if (ref.image) return [ref.image];
  return [];
}

export function ReferencesAccordion({
  references,
  primaryColor,
  accentColor,
}: {
  references: readonly RefItem[];
  primaryColor: string;
  accentColor: string;
}) {
  const [active, setActive] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);

  // Reset image index when switching reference
  useEffect(() => { setImgIndex(0); }, [active]);

  if (references.length === 0) return null;

  const activeImages = getImages(references[active]);
  const hasMultipleImages = activeImages.length > 1;

  const prevImg = () => setImgIndex((i) => (i - 1 + activeImages.length) % activeImages.length);
  const nextImg = () => setImgIndex((i) => (i + 1) % activeImages.length);

  return (
    <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-16">

      {/* ── Left – accordion list ───────────────────── */}
      <div role="list">
        {references.map((ref, i) => {
          const isActive = i === active;
          return (
            <div
              key={ref.title}
              role="listitem"
              className="border-b border-zinc-200 last:border-b-0 dark:border-zinc-700"
            >
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-expanded={isActive}
                className="group flex w-full items-start gap-5 py-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
              >
                {/* Accent indicator bar */}
                <span
                  className="mt-1 h-5 w-[3px] shrink-0 rounded-full transition-all duration-300"
                  style={{ backgroundColor: isActive ? accentColor : "transparent" }}
                  aria-hidden
                />

                {/* Title + description */}
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-lg font-medium leading-snug transition-colors duration-300 ${
                      isActive
                        ? "text-zinc-900 dark:text-white"
                        : "text-zinc-500 dark:text-zinc-400"
                    }`}
                  >
                    {ref.title}
                  </p>

                  <div
                    className="overflow-hidden transition-all duration-500 ease-in-out"
                    style={{ maxHeight: isActive ? "300px" : "0px" }}
                  >
                    <p className="mt-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                      {ref.description}
                    </p>
                  </div>
                </div>

                {/* Chevron */}
                <ChevronDown
                  className="mt-1 h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-300"
                  style={{ transform: isActive ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>
            </div>
          );
        })}
      </div>

      {/* ── Right – image panel ─────────────────────── */}
      <div className="order-first lg:order-last lg:sticky lg:top-28">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl shadow-zinc-900/10">

          {/* Reference crossfade layers */}
          {references.map((ref, i) => {
            const imgs = getImages(ref);
            const isActiveRef = i === active;
            return (
              <div
                key={ref.title}
                aria-hidden={!isActiveRef}
                className="absolute inset-0 transition-all duration-500 ease-in-out"
                style={{
                  opacity: isActiveRef ? 1 : 0,
                  transform: isActiveRef ? "scale(1)" : "scale(1.04)",
                  zIndex: isActiveRef ? 10 : 0,
                  pointerEvents: isActiveRef ? "auto" : "none",
                }}
              >
                {imgs.length > 0 ? (
                  <>
                    {/* Image slides within this reference */}
                    {imgs.map((src, j) => (
                      <div
                        key={src}
                        className="absolute inset-0 transition-opacity duration-400 ease-in-out"
                        style={{ opacity: isActiveRef && j === imgIndex ? 1 : 0 }}
                      >
                        <Image
                          src={src}
                          alt={`${ref.title} – bild ${j + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 55vw"
                          priority={i === 0 && j === 0}
                        />
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor} 0%, #0d1a16 55%, ${accentColor}55 100%)`,
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ImageIcon className="h-16 w-16 text-white/10" strokeWidth={1} />
                    </div>
                  </>
                )}

                {/* Bottom gradient + caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  {ref.imageCaptions?.[isActiveRef ? imgIndex : 0] && (
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
                      {ref.imageCaptions[isActiveRef ? imgIndex : 0]}
                    </p>
                  )}
                  <p className="mt-1.5 text-xl font-medium text-white leading-snug">
                    {ref.title}
                  </p>
                </div>
              </div>
            );
          })}

          {/* ── Image slider controls (only when active ref has multiple images) ── */}
          {hasMultipleImages && (
            <>
              {/* Prev / Next arrows */}
              <button
                type="button"
                onClick={prevImg}
                aria-label="Föregående bild"
                className="absolute left-3 top-1/2 z-20 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50 focus:outline-none"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={nextImg}
                aria-label="Nästa bild"
                className="absolute right-3 top-1/2 z-20 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50 focus:outline-none"
              >
                <ArrowRight className="h-4 w-4" />
              </button>

              {/* Dot indicators – top right */}
              <div className="absolute right-4 top-4 z-20 flex gap-1.5">
                {activeImages.map((_, j) => (
                  <button
                    key={j}
                    type="button"
                    onClick={() => setImgIndex(j)}
                    aria-label={`Bild ${j + 1}`}
                    className="flex h-5 w-5 items-center justify-center focus:outline-none"
                  >
                    <span
                      className="block rounded-full transition-all duration-300"
                      style={{
                        width: j === imgIndex ? "18px" : "6px",
                        height: "6px",
                        backgroundColor: j === imgIndex ? "#ffffff" : "rgba(255,255,255,0.4)",
                      }}
                    />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
