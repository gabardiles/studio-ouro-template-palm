/**
 * Blog listing page — /blogg
 * Only active when client.pages.includes("blog") and client.blog is populated.
 * Renders a 2-col grid of article cards linking to /blogg/[slug].
 */

import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { client } from "../../../client.config";
import { SubpageLayout } from "@/components/SubpageLayout";

export const metadata: Metadata = {
  title: `Blogg — ${client.brand.name}`,
  description: `Tips, råd och nyheter från ${client.brand.name}.`,
};

export default function BloggPage() {
  if (!client.pages.includes("blog") || !client.blog || client.blog.posts.length === 0) {
    notFound();
  }

  const { headline, intro, posts } = client.blog;

  return (
    <SubpageLayout backLabel="Tillbaka till startsidan">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h1 className="text-3xl font-medium tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
          {headline}
        </h1>
        {intro && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
            {intro}
          </p>
        )}

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blogg/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900"
            >
              {/* Top accent bar in brand color */}
              <div
                className="h-1 w-full shrink-0"
                style={{ backgroundColor: client.brand.accentColor }}
              />

              <div className="flex flex-1 flex-col p-6">
                {/* Category + reading time */}
                <div className="flex items-center gap-2">
                  {post.category && (
                    <span
                      className="rounded-full px-3 py-1 text-[11px] font-semibold text-white"
                      style={{ backgroundColor: client.brand.accentColor }}
                    >
                      {post.category}
                    </span>
                  )}
                  {post.readingTime && (
                    <span className="text-[11px] text-zinc-400">
                      {post.readingTime}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h2 className="mt-3 text-[17px] font-semibold leading-snug text-zinc-900 group-hover:text-zinc-700 dark:text-white dark:group-hover:text-zinc-200">
                  {post.title}
                </h2>

                {/* Intro excerpt */}
                {post.intro && (
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                    {post.intro}
                  </p>
                )}

                {/* CTA */}
                <p
                  className="mt-4 text-[13px] font-medium transition-colors"
                  style={{ color: client.brand.accentColor }}
                >
                  Läs mer →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SubpageLayout>
  );
}
