/**
 * Root layout – metadata, schema, and brand theme from client.config.ts.
 * Design tokens (fonts, colors, radius, mode) are applied as CSS variables.
 */

import type { Metadata } from "next";
import { client } from "../../client.config";
import { getLocalBusinessSchema, getFaqSchema } from "@/lib/schema";
import { ScrollToHash } from "@/components/ScrollToHash";
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
  const backgroundColor =
    client.brand.backgroundColor ||
    (mode === "dark" ? "#0a0a0a" : "#ffffff");
  const textColor =
    client.brand.textColor ||
    (mode === "dark" ? "#f5f5f5" : "#111111");

  const fontUrl = `https://fonts.googleapis.com/css2?family=${titleFont.replace(/ /g, "+")}:ital,wght@0,400;0,700;0,900;1,400&family=${bodyFont.replace(/ /g, "+")}:wght@300;400;500;600&display=swap`;

  const localBusinessSchema =
    client.schema.enabled && client.schema.localBusiness
      ? getLocalBusinessSchema()
      : null;
  const faqSchema =
    client.schema.enabled && client.schema.faqPage ? getFaqSchema() : null;

  return (
    <html
      lang={client.meta.language}
      data-mode={mode}
      style={
        {
          "--primary": primaryColor,
          "--accent": accentColor,
          "--color-primary": primaryColor,
          "--color-accent": accentColor,
          "--color-background": backgroundColor,
          "--color-text": textColor,
          "--font-display": `'${titleFont.replace(/'/g, "\\'")}', sans-serif`,
          "--font-body": `'${bodyFont.replace(/'/g, "\\'")}', sans-serif`,
          "--radius": radius,
          "--radius-sm": `calc(${radius} * 0.5)`,
          "--radius-lg": `calc(${radius} * 1.5)`,
        } as React.CSSProperties
      }
    >
      <head>
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
        {children}
      </body>
    </html>
  );
}
