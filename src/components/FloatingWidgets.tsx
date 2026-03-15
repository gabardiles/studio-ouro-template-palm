"use client";

/**
 * FloatingWidgets – bottom-right stack of skill-gated floating UI.
 * Rendered on the homepage and subpages. Reads skills from client config.
 * Stacking order (bottom to top): chatbot, quote-flow.
 */

import { client } from "../../client.config";
import { QuoteFlow } from "./QuoteFlow";
import { ChatbotWidget } from "./ChatbotWidget";

const skills = client.skills ?? [];
const hasQuoteFlow = skills.includes("quote-flow") && (client.quoteFlow?.enabled !== false);
const hasChatbot = skills.includes("chatbot") || client.chatbot === true;

export function FloatingWidgets() {
  if (!hasQuoteFlow && !hasChatbot) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {hasQuoteFlow && (
        <QuoteFlow
          services={client.services.map((s) => s.title)}
          accentColor={client.brand.accentColor}
          primaryColor={client.brand.primaryColor}
          buttonLabel={client.quoteFlow?.buttonLabel}
          responseTime={client.quoteFlow?.responseTime}
          leadFormUrl={client.contact.leadFormUrl}
        />
      )}
      {hasChatbot && (
        <ChatbotWidget accentColor={client.brand.accentColor} />
      )}
    </div>
  );
}
