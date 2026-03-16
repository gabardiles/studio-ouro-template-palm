"use client";

/**
 * DEV PREVIEW: Real QuoteFlow modal, open immediately via forceOpen prop.
 */

import { QuoteFlow } from "@/components/QuoteFlow";

export function QuoteFlowPreview(props: React.ComponentProps<typeof QuoteFlow>) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
        <strong>Preview:</strong> Fully interactive modal. Edit{" "}
        <code className="rounded bg-amber-200 px-1">QuoteFlow.tsx</code> to iterate.
      </div>
      <div className="fixed bottom-6 right-6 z-40">
        <QuoteFlow {...props} forceOpen />
      </div>
    </div>
  );
}
