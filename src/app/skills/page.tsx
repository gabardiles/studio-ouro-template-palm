/**
 * Skills preview index – /skills
 * DEV ONLY: returns 404 in production builds.
 * Lists all available skills for isolated testing.
 */

import { notFound } from "next/navigation";
import Link from "next/link";
import { Wrench, FileText, MessageCircle, Calculator } from "lucide-react";

export default function SkillsIndexPage() {
  if (process.env.NODE_ENV !== "development") notFound();

  const skills = [
    {
      id: "quote-flow",
      label: "Quote Request Flow",
      description: "4-step modal wizard — service, location, timing, contact. POSTs lead to leadFormUrl.",
      icon: FileText,
      status: "live",
    },
    {
      id: "chatbot",
      label: "AI Chatbot",
      description: "Floating chat widget placeholder. Full AI integration TBD.",
      icon: MessageCircle,
      status: "placeholder",
    },
    {
      id: "rot-rut",
      label: "ROT/RUT Calculator",
      description: "Inline section after Services. Branded card with calculator + copy.",
      icon: Calculator,
      status: "live",
    },
  ];

  const statusColor: Record<string, string> = {
    live: "bg-emerald-100 text-emerald-700",
    placeholder: "bg-amber-100 text-amber-700",
    wip: "bg-zinc-100 text-zinc-600",
  };

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-2 flex items-center gap-2">
          <Wrench className="h-5 w-5 text-zinc-400" />
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Dev only</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Skills preview</h1>
        <p className="mt-2 text-zinc-500">
          This page is only accessible in development (<code className="rounded bg-zinc-200 px-1.5 py-0.5 text-xs">NODE_ENV=development</code>).
          It returns 404 in production.
        </p>

        {/* Skill cards */}
        <div className="mt-10 flex flex-col gap-4">
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <Link
                key={skill.id}
                href={`/skills/${skill.id}`}
                className="group flex items-start gap-5 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 transition group-hover:bg-zinc-900 group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-zinc-900">{skill.label}</p>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColor[skill.status]}`}>
                      {skill.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-500">{skill.description}</p>
                  <p className="mt-2 text-xs font-mono text-zinc-400">skills.includes("{skill.id}")</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
