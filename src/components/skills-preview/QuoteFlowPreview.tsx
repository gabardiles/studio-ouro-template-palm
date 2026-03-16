"use client";

/**
 * DEV PREVIEW: Renders QuoteFlow in an open modal state for easy editing.
 */

import { QuoteFlow } from "@/components/QuoteFlow";

export function QuoteFlowPreview(props: React.ComponentProps<typeof QuoteFlow>) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
        <strong>Preview mode:</strong> The floating button appears after scrolling 300px.
        Scroll down or edit <code className="rounded bg-amber-200 px-1">QuoteFlow.tsx</code> to iterate.
      </div>

      {/* Show the modal inline for easy editing */}
      <div className="overflow-hidden rounded-2xl shadow-2xl shadow-zinc-900/20">
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ backgroundColor: props.primaryColor }}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50">Steg 1 av 4</p>
            <p className="mt-0.5 text-base font-semibold text-white">Vad behöver du hjälp med?</p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex gap-1 bg-white px-6 pt-4">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className="h-1 flex-1 rounded-full"
              style={{ backgroundColor: s === 1 ? props.accentColor : "#e4e4e7" }}
            />
          ))}
        </div>

        {/* Step 1 chips */}
        <div className="bg-white px-6 py-6">
          <div className="flex flex-wrap gap-2">
            {[...props.services, "Annat"].map((s) => (
              <span
                key={s}
                className="rounded-full border px-4 py-2 text-sm font-medium"
                style={{ borderColor: "#e4e4e7", color: "#3f3f46" }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-zinc-100 bg-white px-6 py-4">
          <span className="text-sm text-zinc-300">Tillbaka</span>
          <span
            className="rounded-full px-5 py-2.5 text-sm font-bold text-white"
            style={{ backgroundColor: props.accentColor }}
          >
            Nästa →
          </span>
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-zinc-400">
        Live floating widget also active on this page — scroll down to see the button.
      </p>

      {/* Mount the real floating widget too */}
      <div className="fixed bottom-6 right-6 z-40">
        <QuoteFlow {...props} />
      </div>
    </div>
  );
}
