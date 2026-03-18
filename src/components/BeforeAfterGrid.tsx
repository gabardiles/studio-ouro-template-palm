"use client";

import { useState } from "react";

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
      className="cursor-pointer overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md"
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
              <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] text-zinc-500">
                {item.location}
              </span>
            )}
            {item.duration && (
              <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] text-zinc-500">
                {item.duration}
              </span>
            )}
          </div>
        </div>
        <h3 className="mt-3 text-[15px] font-semibold leading-snug text-zinc-900">
          {item.title}
        </h3>
      </div>

      {/* Thin separator */}
      <div className="mx-5 h-px bg-zinc-100" />

      {/* Split content — stacked on mobile, side by side on sm+ */}
      <div className="grid sm:grid-cols-2">
        {/* FÖRE — muted */}
        <div className="px-5 py-4 sm:border-r sm:border-zinc-100">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            Före
          </p>
          <p
            className={`text-sm leading-relaxed text-zinc-500 transition-all duration-200 ${
              expanded ? "" : "line-clamp-3"
            }`}
          >
            {item.before}
          </p>
        </div>

        {/* EFTER — accented */}
        <div className="border-t border-zinc-100 px-5 py-4 sm:border-t-0">
          <p
            className="mb-2 text-[10px] font-bold uppercase tracking-widest"
            style={{ color: accentColor }}
          >
            Efter
          </p>
          <p
            className={`text-sm leading-relaxed text-zinc-700 transition-all duration-200 ${
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

  function handleFilterClick(cat: string | null) {
    setActiveCategory(cat);
    setExpandedTitle(null);
  }

  const filtered = activeCategory
    ? items.filter((i) => i.category === activeCategory)
    : items;

  return (
    <div className="mt-10">
      {/* Sticky filter bar — only shown when 2+ categories */}
      {showFilter && (
        <div className="sticky top-16 z-20 -mx-4 mb-8 border-b border-zinc-100 bg-white/95 px-4 py-3 backdrop-blur-sm sm:-mx-6 sm:px-6">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleFilterClick(null)}
              className="rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-150"
              style={
                activeCategory === null
                  ? { backgroundColor: accentColor, borderColor: accentColor, color: "white" }
                  : { borderColor: "#e4e4e7", color: "#52525b" }
              }
            >
              Alla
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleFilterClick(activeCategory === cat ? null : cat)}
                className="rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-150"
                style={
                  activeCategory === cat
                    ? { backgroundColor: accentColor, borderColor: accentColor, color: "white" }
                    : { borderColor: "#e4e4e7", color: "#52525b" }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={`grid gap-6 sm:grid-cols-2 xl:grid-cols-3 ${!showFilter ? "mt-8" : ""}`}>
        {filtered.map((item) => (
          <ProjectCard
            key={item.title}
            item={item}
            accentColor={accentColor}
            categoryColor={colorMap[item.category] ?? accentColor}
            expanded={expandedTitle === item.title}
            onToggle={() =>
              setExpandedTitle((prev) => (prev === item.title ? null : item.title))
            }
          />
        ))}
      </div>
    </div>
  );
}
