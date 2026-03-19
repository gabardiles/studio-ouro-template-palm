/**
 * Reviews – Google score banner + client testimonials.
 * Only rendered when client.reviews.show is true.
 */

import { Star, Quote } from "lucide-react";
import { client } from "../../client.config";

export function Reviews() {
  if (!client.reviews.show) return null;

  const { score: scoreVal, count, testimonials } = client.reviews;
  const score = scoreVal != null ? parseFloat(String(scoreVal)) : null;
  const fullStars = score != null ? Math.round(score) : 0;

  const scoreBanner = score != null && count != null ? (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${i <= fullStars ? "fill-amber-400 text-amber-400" : "fill-zinc-200 text-zinc-200 dark:fill-zinc-600 dark:text-zinc-600"}`}
          />
        ))}
      </div>
      <div className="text-center sm:text-left">
        <p className="text-2xl font-bold text-zinc-900 dark:text-white">
          {score}
          <span className="text-base font-normal text-zinc-600 dark:text-zinc-400"> / 5</span>
        </p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {count} omdömen på {client.reviews.platform}
        </p>
      </div>
    </div>
  ) : null;

  return (
    <section className="bg-zinc-100 py-14 dark:bg-zinc-800/50 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {scoreBanner && (client.reviews.url ? (
          <a
            href={client.reviews.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block transition hover:opacity-90"
          >
            {scoreBanner}
          </a>
        ) : (
          scoreBanner
        ))}

        {testimonials.length > 0 && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {testimonials.map((t) => (
              <blockquote
                key={t.name}
                className="relative rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900"
              >
                <Quote className="mb-3 h-5 w-5 text-zinc-400 dark:text-zinc-500" />
                <p className="leading-relaxed text-zinc-600 dark:text-zinc-300">
                  &ldquo;{t.text}&rdquo;
                </p>
                <footer className="mt-4 text-sm font-medium text-zinc-900 dark:text-white">
                  — {t.name}
                </footer>
              </blockquote>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
