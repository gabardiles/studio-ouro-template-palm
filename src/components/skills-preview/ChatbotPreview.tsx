"use client";

/**
 * DEV PREVIEW: Renders ChatbotWidget in isolation.
 */

import { ChatbotWidget } from "@/components/ChatbotWidget";

export function ChatbotPreview({ accentColor }: { accentColor: string }) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
        <strong>Preview mode:</strong> Chatbot is a placeholder. Edit{" "}
        <code className="rounded bg-amber-200 px-1">ChatbotWidget.tsx</code> to build it out.
      </div>

      <div className="flex items-end justify-end">
        <ChatbotWidget accentColor={accentColor} />
      </div>
    </div>
  );
}
