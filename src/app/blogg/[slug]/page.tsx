/**
 * Individual blog article page — /blogg/[slug]
 * Statically generated at build time from client.blog.posts.
 */

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { client } from "../../../../client.config";
import { SubpageLayout } from "@/components/SubpageLayout";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return (client.blog?.posts ?? []).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = (client.blog?.posts ?? []).find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.metaTitle || `${post.title} — ${client.brand.name}`,
    description: post.metaDescription || post.intro,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  if (!client.pages.includes("blog") || !client.blog) notFound();

  const post = client.blog.posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription || post.intro,
    author: {
      "@type": "Organization",
      name: client.brand.name,
    },
    publisher: {
      "@type": "Organization",
      name: client.brand.name,
    },
  };

  return (
    <SubpageLayout backLabel="Blogg" backHref="/blogg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        {/* Category + reading time */}
        <div className="flex items-center gap-3">
          {post.category && (
            <span
              className="rounded-full px-3 py-1 text-[11px] font-semibold text-white"
              style={{ backgroundColor: client.brand.accentColor }}
            >
              {post.category}
            </span>
          )}
          {post.readingTime && (
            <span className="text-[12px] text-zinc-400 dark:text-zinc-500">{post.readingTime}</span>
          )}
        </div>

        {/* Title */}
        <h1 className="mt-4 text-3xl font-medium tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
          {post.title}
        </h1>

        {/* Divider */}
        <div
          className="mt-6 h-1 w-16 rounded-full"
          style={{ backgroundColor: client.brand.accentColor }}
        />

        {/* Intro */}
        {post.intro && (
          <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
            {post.intro}
          </p>
        )}

        {/* Sections */}
        {post.sections.length > 0 && (
          <div className="mt-8 space-y-8">
            {post.sections.map((section, i) => (
              <div key={i}>
                {section.heading && (
                  <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                    {section.heading}
                  </h2>
                )}
                {section.body && (
                  <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-300">
                    {section.body}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* CTA footer */}
        <div
          className="mt-16 rounded-xl p-8 text-center"
          style={{ backgroundColor: `${client.brand.accentColor}10` }}
        >
          <p className="text-lg font-medium text-zinc-900 dark:text-white">
            Behöver du hjälp? Kontakta {client.brand.name}.
          </p>
          <a
            href="#kontakt"
            className="mt-4 inline-block rounded-lg px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: client.brand.accentColor }}
          >
            Kontakta oss
          </a>
        </div>
      </article>
    </SubpageLayout>
  );
}
