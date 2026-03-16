/**
 * Footer – brand, tagline, nav, certifications, reviews, social, copyright.
 * All content from client.config.ts. Social icons from Lucide.
 */

import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import { client } from "../../client.config";

const baseNavItems = [
  { label: "Tjänster", href: "/#tjanster" },
  { label: "Om oss", href: "/om-oss" },
  { label: "Referenser", href: "/#referencer" },
  { label: "FAQ", href: "/#faq" },
  { label: "Kontakt", href: "/#kontakt" },
];

const navItems = client.pages.includes("before-after")
  ? [
      baseNavItems[0],
      baseNavItems[1],
      { label: "Före & efter", href: "/fore-efter" },
      ...baseNavItems.slice(2),
    ]
  : baseNavItems;

export function Footer() {
  const currentYear = new Date().getFullYear();
  const showCerts = client.footer.showCertifications && client.trust.certifications?.length > 0;
  const showReviews = client.footer.showReviews && client.reviews.show;
  const hasSocial = client.social.facebook || client.social.instagram;

  return (
    <footer
      className="text-zinc-300"
      style={{ backgroundColor: `color-mix(in srgb, ${client.brand.primaryColor} 60%, black)` }}
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xl font-bold text-white">{client.brand.name}</p>
            {client.footer.tagline && (
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-zinc-300">
                {client.footer.tagline}
              </p>
            )}
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-zinc-200 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {(showCerts || showReviews || hasSocial) && (
          <div className="mt-10 flex flex-col items-start gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
            {(showCerts || showReviews) && (
              <div className="flex flex-wrap gap-2">
                {showCerts &&
                  client.trust.certifications.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300"
                    >
                      {c}
                    </span>
                  ))}
                {showReviews && (
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300">
                    ★ {client.reviews.score} · {client.reviews.platform}
                  </span>
                )}
              </div>
            )}
            {hasSocial && (
              <div className="flex gap-3">
                {client.social.facebook && (
                  <a
                    href={client.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 transition hover:bg-white/10 hover:text-white"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                )}
                {client.social.instagram && (
                  <a
                    href={client.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 transition hover:bg-white/10 hover:text-white"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                )}
              </div>
            )}
          </div>
        )}

        <div className="mt-10 border-t border-white/10 pt-8">
          <p className="text-sm text-zinc-400">
            © {currentYear} {client.brand.name}. Alla rättigheter förbehållna.
          </p>
        </div>
      </div>
    </footer>
  );
}

