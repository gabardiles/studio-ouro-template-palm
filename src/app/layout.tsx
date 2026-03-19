/**
 * Root layout – metadata, schema, and brand theme from client.config.ts.
 * Design tokens (fonts, colors, radius, mode) are applied as CSS variables.
 *
 * IMPORTANT: --color-background and --color-text are NOT set as inline styles.
 * Inline styles beat any CSS rule, which would prevent .dark from overriding them.
 * Instead, they live purely in globals.css (:root defaults + [data-mode="dark"]/.dark overrides).
 * Custom brand bg/text colors are injected via a <style> tag so dark mode CSS still wins.
 */

import type { Metadata } from "next";
import { client } from "../../client.config";
import { getLocalBusinessSchema, getFaqSchema } from "@/lib/schema";
import { ScrollToHash } from "@/components/ScrollToHash";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const radiusMap = {
  none: "0px",
  subtle: "4px",
  rounded: "8px",
  soft: "16px",
  pill: "999px",
} as const;

const baseUrl = client.meta.domain ? `https://${client.meta.domain}` : null;

export const metadata: Metadata = {
  title: {
    default: client.meta.title,
    template: `%s — ${client.brand.name}`,
  },
  description: client.meta.description,
  ...(baseUrl && {
    metadataBase: new URL(baseUrl),
    alternates: { canonical: baseUrl },
  }),
  openGraph: {
    title: client.meta.title,
    description: client.meta.description,
    type: "website",
    ...(baseUrl && { url: baseUrl }),
    locale: "sv_SE",
  },
  other: {
    "geo.region": "SE-M",
    "geo.placename": client.seo.geo.city,
    "geo.position": `${client.seo.geo.lat};${client.seo.geo.lng}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const radius =
    radiusMap[(client.brand.radius as keyof typeof radiusMap) ?? "soft"] ?? radiusMap.soft;
  const titleFont = client.brand.titleFont ?? "Funnel Display";
  const bodyFont = client.brand.bodyFont ?? "Funnel Sans";
  const mode = (client.brand.mode ?? "light") as "light" | "dark";
  const primaryColor = client.brand.primaryColor;
  const accentColor = client.brand.accentColor;

  // Custom brand light-mode colors (non-empty means the portal explicitly set them).
  // Injected via <style> so they sit at stylesheet specificity, NOT inline style —
  // this way [data-mode="dark"] / .dark in globals.css can still override them.
  const customLightBg = client.brand.backgroundColor || null;
  const customLightText = client.brand.textColor || null;

  const fontUrl = `https://fonts.googleapis.com/css2?family=${titleFont.replace(/ /g, "+")}:ital,wght@0,400;0,700;0,900;1,400&family=${bodyFont.replace(/ /g, "+")}:wght@300;400;500;600&display=swap`;

  const localBusinessSchema =
    client.schema.enabled && client.schema.localBusiness
      ? getLocalBusinessSchema()
      : null;
  const faqSchema =
    client.schema.enabled && client.schema.faqPage ? getFaqSchema() : null;

  // Synchronous no-flash script — only toggles the .dark class and data-mode attribute.
  // CSS does the rest via [data-mode="dark"]/.dark rules in globals.css.
  const noFlashScript = `(function(){try{var s=localStorage.getItem('site-theme');var m=s||'${mode}';var h=document.documentElement;if(m==='dark'){h.classList.add('dark');h.setAttribute('data-mode','dark');}else{h.classList.remove('dark');h.setAttribute('data-mode','light');}}catch(e){}})();`;

  return (
    <html
      lang={client.meta.language}
      data-mode={mode}
      suppressHydrationWarning
      style={
        {
          "--primary": primaryColor,
          "--accent": accentColor,
          "--color-primary": primaryColor,
          "--color-accent": accentColor,
          // Note: --color-background and --color-text are intentionally NOT here.
          // They live in CSS so that .dark / [data-mode="dark"] can override them.
          "--font-display": `'${titleFont.replace(/'/g, "\\'")}', sans-serif`,
          "--font-body": `'${bodyFont.replace(/'/g, "\\'")}', sans-serif`,
          "--radius": radius,
          "--radius-sm": `calc(${radius} * 0.5)`,
          "--radius-lg": `calc(${radius} * 1.5)`,
        } as React.CSSProperties
      }
    >
      <head>
        {/* No-flash theme script — runs synchronously before paint */}
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
        {/* Custom brand light-mode colors injected at stylesheet specificity */}
        {(customLightBg || customLightText) && (
          <style dangerouslySetInnerHTML={{
            __html: `:root{${customLightBg ? `--color-background:${customLightBg};` : ""}${customLightText ? `--color-text:${customLightText};` : ""}}`
          }} />
        )}
        <link href={fontUrl} rel="stylesheet" />
      </head>
      <body className="antialiased">
        {localBusinessSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(localBusinessSchema),
            }}
          />
        )}
        {faqSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(faqSchema),
            }}
          />
        )}
        <ScrollToHash />
        <ThemeProvider defaultMode={mode}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
