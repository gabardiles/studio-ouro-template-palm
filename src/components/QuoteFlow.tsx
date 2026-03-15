"use client";

/**
 * Quote Request Flow – 4-step modal wizard.
 * Visible when client.skills includes "quote-flow".
 * POSTs to client.contact.leadFormUrl on submit.
 */

import { useState, useEffect } from "react";
import { X, ArrowRight, ArrowLeft, Check, FileText } from "lucide-react";

type Step = 1 | 2 | 3 | 4 | "done";

interface FormData {
  service: string;
  location: string;
  timing: string;
  name: string;
  phone: string;
  message: string;
}

const TIMING_OPTIONS = [
  "Så snart som möjligt",
  "Inom en vecka",
  "Inom en månad",
  "Bara en fråga",
];

export function QuoteFlow({
  services,
  accentColor,
  primaryColor,
  buttonLabel,
  responseTime,
  leadFormUrl,
}: {
  services: string[];
  accentColor: string;
  primaryColor: string;
  buttonLabel?: string | null;
  responseTime?: string | null;
  leadFormUrl?: string | null;
}) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>({
    service: "",
    location: "",
    timing: "",
    name: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [visible, setVisible] = useState(false);

  // Show button after 300px scroll
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => {
    setOpen(false);
    // Reset after animation
    setTimeout(() => { setStep(1); setForm({ service: "", location: "", timing: "", name: "", phone: "", message: "" }); }, 300);
  };

  const canNext = () => {
    if (step === 1) return !!form.service;
    if (step === 2) return form.location.trim().length > 0;
    if (step === 3) return !!form.timing;
    if (step === 4) return form.name.trim().length > 0 && form.phone.trim().length > 0;
    return false;
  };

  const submit = async () => {
    setSubmitting(true);
    try {
      if (leadFormUrl) {
        await fetch(leadFormUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
    } catch (_) {
      // Fail silently — show confirmation regardless
    } finally {
      setSubmitting(false);
      setStep("done");
    }
  };

  const allServices = [...services, "Annat"];

  return (
    <>
      {/* Floating button */}
      <div
        className="flex flex-col items-end gap-3 transition-all duration-300"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(12px)", pointerEvents: visible ? "auto" : "none" }}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold text-white shadow-lg transition hover:scale-105 active:scale-95"
          style={{ backgroundColor: primaryColor }}
        >
          <FileText className="h-4 w-4" />
          {buttonLabel || "Få en offert"}
        </button>
      </div>

      {/* Backdrop + modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />

          {/* Modal */}
          <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl shadow-zinc-900/20">
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{ backgroundColor: primaryColor }}
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
                  {step !== "done" ? `Steg ${step} av 4` : "Klart!"}
                </p>
                <p className="mt-0.5 text-base font-semibold text-white">
                  {step === 1 && "Vad behöver du hjälp med?"}
                  {step === 2 && "Var befinner du dig?"}
                  {step === 3 && "När behöver du hjälp?"}
                  {step === 4 && "Dina kontaktuppgifter"}
                  {step === "done" && "Tack för din förfrågan!"}
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Stäng"
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/60 hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Progress bar */}
            {step !== "done" && (
              <div className="flex gap-1 px-6 pt-4">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className="h-1 flex-1 rounded-full transition-all duration-300"
                    style={{ backgroundColor: (step as number) >= s ? accentColor : "#e4e4e7" }}
                  />
                ))}
              </div>
            )}

            {/* Step content */}
            <div className="px-6 py-6">

              {/* Step 1 – service chips */}
              {step === 1 && (
                <div className="flex flex-wrap gap-2">
                  {allServices.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, service: s }))}
                      className="rounded-full border px-4 py-2 text-sm font-medium transition-all"
                      style={form.service === s
                        ? { backgroundColor: accentColor, borderColor: accentColor, color: "white" }
                        : { borderColor: "#e4e4e7", color: "#3f3f46" }
                      }
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Step 2 – location */}
              {step === 2 && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-700" htmlFor="qf-location">
                    Stad eller postnummer
                  </label>
                  <input
                    id="qf-location"
                    type="text"
                    autoFocus
                    value={form.location}
                    onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                    placeholder="t.ex. Göteborg eller 433 30"
                    className="w-full rounded-lg border border-zinc-200 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-transparent focus:outline-none focus:ring-2"
                    style={{ "--tw-ring-color": accentColor } as React.CSSProperties}
                    onKeyDown={(e) => e.key === "Enter" && canNext() && setStep(3)}
                  />
                </div>
              )}

              {/* Step 3 – timing */}
              {step === 3 && (
                <div className="flex flex-col gap-2">
                  {TIMING_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, timing: opt }))}
                      className="flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all"
                      style={form.timing === opt
                        ? { backgroundColor: `${accentColor}15`, borderColor: accentColor, color: "#18181b" }
                        : { borderColor: "#e4e4e7", color: "#3f3f46" }
                      }
                    >
                      <span
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all"
                        style={form.timing === opt
                          ? { borderColor: accentColor, backgroundColor: accentColor }
                          : { borderColor: "#d4d4d8" }
                        }
                      >
                        {form.timing === opt && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                      </span>
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {/* Step 4 – contact */}
              {step === 4 && (
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-zinc-700" htmlFor="qf-name">
                      Namn <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="qf-name"
                      type="text"
                      autoFocus
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Ditt namn"
                      className="w-full rounded-lg border border-zinc-200 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-transparent focus:outline-none focus:ring-2"
                      style={{ "--tw-ring-color": accentColor } as React.CSSProperties}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-zinc-700" htmlFor="qf-phone">
                      Telefon <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="qf-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      placeholder="07X-XXX XX XX"
                      className="w-full rounded-lg border border-zinc-200 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-transparent focus:outline-none focus:ring-2"
                      style={{ "--tw-ring-color": accentColor } as React.CSSProperties}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-zinc-700" htmlFor="qf-message">
                      Meddelande <span className="text-zinc-400 font-normal">(valfritt)</span>
                    </label>
                    <textarea
                      id="qf-message"
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="Berätta gärna mer om vad du behöver..."
                      className="w-full resize-none rounded-lg border border-zinc-200 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-transparent focus:outline-none focus:ring-2"
                      style={{ "--tw-ring-color": accentColor } as React.CSSProperties}
                    />
                  </div>
                </div>
              )}

              {/* Done */}
              {step === "done" && (
                <div className="py-4 text-center">
                  <div
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${accentColor}20` }}
                  >
                    <Check className="h-8 w-8" style={{ color: accentColor }} strokeWidth={2.5} />
                  </div>
                  <p className="text-base font-medium text-zinc-900">
                    Vi återkommer inom {responseTime || "2 timmar"}!
                  </p>
                  <p className="mt-2 text-sm text-zinc-500">
                    Vi har tagit emot din förfrågan och hör av oss så snart som möjligt.
                  </p>
                  <button
                    type="button"
                    onClick={close}
                    className="mt-6 rounded-full px-6 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
                    style={{ backgroundColor: accentColor }}
                  >
                    Stäng
                  </button>
                </div>
              )}
            </div>

            {/* Footer nav */}
            {step !== "done" && (
              <div className="flex items-center justify-between border-t border-zinc-100 px-6 py-4">
                <button
                  type="button"
                  onClick={() => step > 1 && setStep((s) => (s as number) - 1 as Step)}
                  disabled={step === 1}
                  className="flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition hover:text-zinc-900 disabled:opacity-0"
                >
                  <ArrowLeft className="h-4 w-4" /> Tillbaka
                </button>

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={() => canNext() && setStep((s) => (s as number) + 1 as Step)}
                    disabled={!canNext()}
                    className="flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-110 disabled:opacity-40"
                    style={{ backgroundColor: accentColor }}
                  >
                    Nästa <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={submit}
                    disabled={!canNext() || submitting}
                    className="flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-110 disabled:opacity-40"
                    style={{ backgroundColor: accentColor }}
                  >
                    {submitting ? "Skickar…" : "Skicka offertförfrågan"} <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
