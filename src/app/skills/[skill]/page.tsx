/**
 * Individual skill preview – /skills/[skill]
 * DEV ONLY: returns 404 in production builds.
 * Renders each skill in isolation with real config data.
 */

import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { client } from "../../../../client.config";
import { QuoteFlowPreview } from "@/components/skills-preview/QuoteFlowPreview";
import { ChatbotPreview } from "@/components/skills-preview/ChatbotPreview";
import { RotPreview } from "@/components/skills-preview/RotPreview";

const SKILL_LABELS: Record<string, string> = {
  "quote-flow": "Quote Request Flow",
  "chatbot": "AI Chatbot",
  "rot-rut": "ROT/RUT Calculator",
};

interface Props {
  params: Promise<{ skill: string }>;
}

export default async function SkillPreviewPage({ params }: Props) {
  if (process.env.NODE_ENV !== "development") notFound();

  const { skill } = await params;

  if (!SKILL_LABELS[skill]) notFound();

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Dev toolbar */}
      <div className="sticky top-0 z-50 flex items-center gap-4 border-b border-zinc-200 bg-white px-4 py-3 sm:px-6">
        <Link
          href="/skills"
          className="flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition hover:text-zinc-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Skills
        </Link>
        <span className="text-zinc-300">/</span>
        <span className="text-sm font-semibold text-zinc-900">{SKILL_LABELS[skill]}</span>
        <span className="ml-auto rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
          DEV PREVIEW
        </span>
      </div>

      {/* Skill preview */}
      <div className="px-4 py-12 sm:px-6">
        {skill === "quote-flow" && (
          <QuoteFlowPreview
            services={client.services.map((s) => s.title)}
            accentColor={client.brand.accentColor}
            primaryColor={client.brand.primaryColor}
            buttonLabel={client.quoteFlow?.buttonLabel}
            responseTime={client.quoteFlow?.responseTime}
            leadFormUrl={client.contact.leadFormUrl}
          />
        )}
        {skill === "chatbot" && (
          <ChatbotPreview accentColor={client.brand.accentColor} />
        )}
        {skill === "rot-rut" && (
          <RotPreview
            primaryColor={client.brand.primaryColor}
            accentColor={client.brand.accentColor}
            phone={client.contact.phone}
          />
        )}
      </div>
    </div>
  );
}
