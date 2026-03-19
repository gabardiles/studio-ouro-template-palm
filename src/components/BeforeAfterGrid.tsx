"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface Item {
  title: string;
  category: string;
  location?: string;
  duration?: string;
  before: string;
  after: string;
}

const CATEGORY_COLORS = [
  "#3b82f6", "#10b981", "#f59e0b", "#ef4444",
  "#8b5cf6", "#06b6d4", "#ec4899", "#84cc16",
];

const CARD_GAP_PX = 24;

function ProjectCard({
  item,
  accentColor,
  categoryColor,
  expanded,
  onToggle,
}: {
  item: Item;
  accentColor: string;
  categoryColor: string;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      onClick={onToggle}
      className="cursor-pointer overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900"
    >
      {/* Header: category badge + metadata chips + title */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          {item.category && (
            <span
              className="rounded-full px-3 py-1 text-[11px] font-semibold text-white"
              style={{ backgroundColor: categoryColor }}
            >
              {item.category}
            </span>
          )}
          <div className="ml-auto flex flex-wrap items-center gap-1.5">
            {item.location && (
              <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                {item.location}
              </span>
            )}
            {item.duration && (
              <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                {item.duration}
              </span>
            )}
          </div>
        </div>
        <h3 className="mt-3 text-[15px] font-semibold leading-snug text-zinc-900 dark:text-white">
          {item.title}
        </h3>
      </div>

      {/* Thin separator */}
      <div className="mx-5 h-px bg-zinc-100 dark:bg-zinc-800" />

      {/* Split content — stacked on mobile, side by side on sm+ */}
      <div className="grid sm:grid-cols-2">
        {/* FÖRE — muted */}
        <div className="px-5 py-4 sm:border-r sm:border-zinc-100 dark:sm:border-zinc-800">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            Före
          </p>
          <p
            className={`text-sm leading-relaxed text-zinc-500 transition-all duration-200 dark:text-zinc-400 ${
              expanded ? "" : "line-clamp-3"
            }`}
          >
            {item.before}
          </p>
        </div>

        {/* EFTER — accented */}
        <div className="border-t border-zinc-100 px-5 py-4 sm:border-t-0 dark:border-zinc-800">
          <p
            className="mb-2 text-[10px] font-bold uppercase tracking-widest"
            style={{ color: accentColor }}
          >
            Efter
          </p>
          <p
            className={`text-sm leading-relaxed text-zinc-700 transition-all duration-200 dark:text-zinc-300 ${
              expanded ? "" : "line-clamp-3"
            }`}
          >
            {item.after}
          </p>
        </div>
      </div>

      {/* Expand / collapse toggle */}
      <div className="flex justify-end px-5 pb-4 pt-1">
        <span
          className="text-[12px] font-medium transition-colors"
          style={{ color: accentColor }}
        >
          {expanded ? "Visa mindre ↑" : "Läs mer →"}
        </span>
      </div>
    </div>
  );
}

export function BeforeAfterGrid({
  items,
  accentColor,
}: {
  items: Item[];
  accentColor: string;
}) {
  const categories = Array.from(new Set(items.map((i) => i.category))).filter(Boolean);
  const colorMap = Object.fromEntries(
    categories.map((c, i) => [c, CATEGORY_COLORS[i % CATEGORY_COLORS.length]]),
  );
  const showFilter = categories.length >= 2;

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedTitle, setExpandedTitle] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSlider, setIsSlider] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const updateActiveIndex = useCallback(() => {
    const el = scrollRef.current;
    if (!el || items.length === 0) return;
    const first = el.querySelector("[data-ba-card]") as HTMLElement | null;
    if (!first) return;
    const cardWidth = first.offsetWidth;
    const step = cardWidth + CARD_GAP_PX;
    const leftPadding = 16;
    const index = Math.round((el.scrollLeft - leftPadding) / step);
    setActiveIndex(Math.min(Math.max(0, index), items.length - 1));
  }, [items.length]);

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

  function goTo(index: number) {
    const el = scrollRef.current;
    const first = el?.querySelector("[data-ba-card]") as HTMLElement | null;
    if (!el || !first) return;
    const cardWidth = first.offsetWidth;
    const step = cardWidth + CARD_GAP_PX;
    const leftPadding = 16;
    el.scrollTo({ left: leftPadding + index * step, behavior: "smooth" });
  }

  function handleFilterClick(cat: string | null) {
    setActiveCategory(cat);
    setExpandedTitle(null);
    setActiveIndex(0);
    scrollRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  }

  const filtered = activeCategory
    ? items.filter((i) => i.category === activeCategory)
    : items;

  return (
    <div className="mt-10">
      {/* Sticky filter bar — only shown when 2+ categories */}
      {showFilter && (
        <div className="sticky top-16 z-20 -mx-4 mb-8 border-b border-zinc-100 bg-white/95 px-4 py-3 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/95 sm:-mx-6 sm:px-6">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleFilterClick(null)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-150 ${
                activeCategory === null
                  ? "text-white"
                  : "border-zinc-200 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
              }`}
              style={activeCategory === null ? { backgroundColor: accentColor, borderColor: accentColor } : undefined}
            >
              Alla
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleFilterClick(activeCategory === cat ? null : cat)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-150 ${
                  activeCategory === cat
                    ? "text-white"
                    : "border-zinc-200 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
                }`}
                style={activeCategory === cat ? { backgroundColor: accentColor, borderColor: accentColor } : undefined}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Slider on mobile, 2-col grid on desktop */}
      <div className={`-mx-4 sm:mx-0 ${!showFilter ? "mt-8" : ""}`}>
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0"
        >
          <div className="min-w-[16px] shrink-0 sm:hidden" aria-hidden />
          {filtered.map((item) => (
            <div
              key={item.title}
              data-ba-card
              className="w-[85vw] min-w-[280px] max-w-[480px] shrink-0 snap-start sm:w-full sm:max-w-none sm:shrink"
            >
              <ProjectCard
                item={item}
                accentColor={accentColor}
                categoryColor={colorMap[item.category] ?? accentColor}
                expanded={expandedTitle === item.title}
                onToggle={() =>
                  setExpandedTitle((prev) => (prev === item.title ? null : item.title))
                }
              />
            </div>
          ))}
          <div className="min-w-[16px] shrink-0 sm:hidden" aria-hidden />
        </div>
      </div>

      {/* Dot pagination — mobile only, shown when scrollable */}
      {filtered.length > 1 && isSlider && (
        <div
          className="mt-4 flex justify-center gap-2 sm:hidden"
          role="group"
          aria-label="Kortpaginering"
        >
          {filtered.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Gå till kort ${i + 1}${i === activeIndex ? ", valt" : ""}`}
              className="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full p-0 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              <span
                className="h-2.5 w-2.5 rounded-full transition-colors duration-200"
                style={{
                  backgroundColor: i === activeIndex ? accentColor : "#a1a1aa",
                }}
                aria-hidden
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
