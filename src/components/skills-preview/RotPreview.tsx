/**
 * DEV PREVIEW: Renders the ROT/RUT block in isolation.
 * Reuses the same markup as Services.tsx so edits there are reflected here.
 */

import { CheckCircle2, PhoneCall } from "lucide-react";
import { RotCalculator } from "@/components/RotCalculator";

const ROT_BULLETS = [
  "Dra av 30% av arbetskostnaden direkt på skatten",
  "Upp till 50 000 kr per person och år",
  "Gäller arbete i och runt ditt hem",
  "Vi sköter all administration & rapportering till Skatteverket",
];

export function RotPreview({
  primaryColor,
  accentColor,
  phone,
}: {
  primaryColor: string;
  accentColor: string;
  phone?: string | null;
}) {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
        <strong>Preview mode:</strong> Edit the ROT block in{" "}
        <code className="rounded bg-amber-200 px-1">Services.tsx</code> — this preview reflects those changes.
      </div>

      <div className="relative overflow-hidden rounded-2xl">
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, #0d1f38 45%, #111827 100%)` }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.8) 20px, rgba(255,255,255,0.8) 21px)`,
          }}
        />
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-20 blur-3xl" style={{ backgroundColor: accentColor }} />
        <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: accentColor }} />

        <div className="relative z-10 grid gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:gap-16 lg:p-16">
          <div className="flex flex-col justify-center">
            <span
              className="mb-4 inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white"
              style={{ backgroundColor: `${accentColor}33`, border: `1px solid ${accentColor}55` }}
            >
              ROT-avdrag
            </span>
            <h3 className="text-2xl font-semibold leading-snug text-white sm:text-3xl">
              Spara pengar med ROT-avdrag
            </h3>
            <p className="mt-4 text-base leading-relaxed text-white/70">
              Vi hjälper dig med ROT-avdrag på alla arbeten. Du kan dra av{" "}
              <strong className="font-semibold text-white">30% av arbetskostnaden</strong>{" "}
              direkt på skatten — upp till{" "}
              <strong className="font-semibold text-white">50 000 kr per person och år</strong>.
            </p>
            <ul className="mt-6 space-y-3">
              {ROT_BULLETS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" style={{ color: accentColor }} />
                  <span className="text-sm leading-relaxed text-white/75">{item}</span>
                </li>
              ))}
            </ul>
            {phone && (
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-[1.03] hover:shadow-xl"
                style={{ backgroundColor: accentColor }}
              >
                <PhoneCall className="h-4 w-4" />
                Ring oss — vi räknar ut vad du sparar
              </a>
            )}
          </div>
          <div className="flex flex-col justify-center">
            <RotCalculator accentColor={accentColor} />
          </div>
        </div>
      </div>
    </div>
  );
}
