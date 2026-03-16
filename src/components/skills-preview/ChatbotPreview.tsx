"use client";

/**
 * DEV PREVIEW: Real ChatbotWidget, open immediately via forceOpen prop.
 */

import { ChatbotWidget } from "@/components/ChatbotWidget";

export function ChatbotPreview({ accentColor }: { accentColor: string }) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
        <strong>Preview:</strong> Widget open by default. Edit{" "}
        <code className="rounded bg-amber-200 px-1">ChatbotWidget.tsx</code> to build it out.
      </div>
      <div className="flex items-end justify-end">
        <ChatbotWidget accentColor={accentColor} forceOpen />
      </div>
    </div>
  );
}
