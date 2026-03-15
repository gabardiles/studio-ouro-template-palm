"use client";

/**
 * Chatbot floating button – placeholder.
 * Visible when client.skills includes "chatbot".
 * Position is coordinated by FloatingWidgets parent.
 */

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export function ChatbotWidget({ accentColor }: { accentColor: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-end gap-3">
      {open && (
        <div className="w-80 rounded-2xl border border-zinc-200 bg-white shadow-2xl shadow-zinc-900/15">
          <div
            className="flex items-center justify-between rounded-t-2xl px-4 py-3"
            style={{ backgroundColor: accentColor }}
          >
            <span className="text-sm font-semibold text-white">Chatta med oss</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Stäng chatt"
              className="text-white/70 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex h-48 items-center justify-center p-6 text-center text-sm text-zinc-400">
            Chatten är snart tillgänglig.
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Stäng chatt" : "Öppna chatt"}
        className="flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition hover:scale-105 active:scale-95"
        style={{ backgroundColor: accentColor }}
      >
        {open
          ? <X className="h-6 w-6 text-white" />
          : <MessageCircle className="h-6 w-6 text-white" />
        }
      </button>
    </div>
  );
}
