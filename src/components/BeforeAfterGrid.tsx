"use client";

/**
 * Before & After grid with optional category filter.
 * Shows filter bar only when 2+ distinct categories exist.
 */

import { useState } from "react";

interface Item {
  title: string;
  description: string;
  category: string;
}

const CATEGORY_COLORS = [
  "#3b82f6", "#10b981", "#f59e0b", "#ef4444",
  "#8b5cf6", "#06b6d4", "#ec4899", "#84cc16",
];

export function BeforeAfterGrid({
  items,
  accentColor,
}: {
  items: Item[];
  accentColor: string;
}) {
  const categories = Array.from(new Set(items.map((i) => i.category))).filter(Boolean);
  const colorMap = Object.fromEntries(categories.map((c, i) => [c, CATEGORY_COLORS[i % CATEGORY_COLORS.length]]));
  const showFilter = categories.length >= 2;

  const [active, setActive] = useState<string | null>(null);
  const filtered = active ? items.filter((i) => i.category === active) : items;

  return (
    <div className="mt-10">
      {showFilter && (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActive(null)}
            className="rounded-full border px-4 py-2 text-sm font-medium transition-all"
            style={active === null
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
              onClick={() => setActive(cat === active ? null : cat)}
              className="rounded-full border px-4 py-2 text-sm font-medium transition-all"
              style={active === cat
                ? { backgroundColor: accentColor, borderColor: accentColor, color: "white" }
                : { borderColor: "#e4e4e7", color: "#52525b" }
              }
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"
          >
            {item.category && (
              <span
                className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold text-white"
                style={{ backgroundColor: colorMap[item.category] ?? accentColor }}
              >
                {item.category}
              </span>
            )}
            <h3 className="text-base font-medium text-zinc-900">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
