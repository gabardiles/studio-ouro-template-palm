"use client";

/**
 * Sticky header – logo/brand name, nav anchors, subpage dropdowns, CTA.
 * Hides on scroll down, reappears on scroll up. All content from client.config.ts.
 */

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { client } from "../../client.config";
import { getPrimaryCtaHref } from "@/lib/cta";
import { ThemeToggle } from "./ThemeToggle";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const serviceLinks = client.services.map((s) => ({
  label: s.title,
  href: `/tjanster/${s.slug}`,
}));

const showBeforeAfter = client.pages.includes("before-after");
const showBlog = client.pages.includes("blog") && !!client.blog?.posts?.length;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isHome = pathname === "/";

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      setHidden(y > 80 && y > lastY);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled
          ? "bg-white/95 shadow-md backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:bg-zinc-900/95 dark:supports-[backdrop-filter]:bg-zinc-900/80"
          : "bg-white dark:bg-zinc-900"
      }`}
      id="toppen"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-[72px] sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
          {client.brand.logo ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element -- logo may be SVG or external URL */}
              <img
                src={client.brand.logo}
                alt={client.brand.name}
                className="h-8 w-auto"
              />
            </>
          ) : (
            <span className="font-display font-bold text-xl">
              {client.brand.name}
            </span>
          )}
        </Link>

        {/* ── Desktop nav ─────────────────────────────── */}
        <nav className="hidden items-center gap-7 lg:flex">
          {/* Tjänster dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setServicesOpen(!servicesOpen)}
              aria-expanded={servicesOpen}
              aria-label="Tjänster – visa undermeny"
              className="flex cursor-pointer items-center gap-1 text-[15px] font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              Tjänster
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
              />
            </button>

            {servicesOpen && (
              <div className="absolute left-1/2 top-full mt-3 w-60 -translate-x-1/2 rounded-lg border border-zinc-100 bg-white p-2 shadow-xl dark:border-zinc-700 dark:bg-zinc-900">
                <Link
                  href="/#tjanster"
                  className="block rounded-md px-3 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-50 dark:text-white dark:hover:bg-zinc-800"
                  onClick={() => {
                    setServicesOpen(false);
                    if (isHome) scrollToId("tjanster");
                  }}
                >
                  Alla tjänster
                </Link>
                <div className="my-1 border-t border-zinc-100 dark:border-zinc-700" />
                {serviceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-md px-3 py-2.5 text-sm text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
                    onClick={() => setServicesOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/om-oss"
            className="text-[15px] font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            Om oss
          </Link>
          {showBeforeAfter && (
            <Link
              href="/fore-efter"
              className="text-[15px] font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              Före &amp; efter
            </Link>
          )}
          {showBlog && (
            <Link
              href="/blogg"
              className="text-[15px] font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              Blogg
            </Link>
          )}
          <Link
            href="/#referenser"
            className="text-[15px] font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            onClick={() => isHome && scrollToId("referenser")}
          >
            Referenser
          </Link>
          <Link
            href="/#faq"
            className="text-[15px] font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            onClick={() => isHome && scrollToId("faq")}
          >
            FAQ
          </Link>
          <Link
            href="/#kontakt"
            className="text-[15px] font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            onClick={() => isHome && scrollToId("kontakt")}
          >
            Kontakt
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <a
            href={getPrimaryCtaHref()}
            className="hidden items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 lg:inline-flex"
          >
            <Phone className="h-4 w-4" />
            {client.hero.cta.primary.text}
          </a>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-md text-zinc-600 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 lg:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Meny"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* ── Mobile nav ─────────────────────────────── */}
      {open && (
        <div className="border-t border-zinc-100 bg-white px-4 pb-6 pt-4 dark:border-zinc-700 dark:bg-zinc-900 lg:hidden">
          <nav className="flex flex-col gap-1">
            {/* Tjänster accordion */}
            <button
              type="button"
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              aria-expanded={mobileServicesOpen}
              aria-label="Tjänster – visa undermeny"
              className="flex w-full cursor-pointer items-center justify-between rounded-md px-3 py-3 text-[15px] font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              Tjänster
              <ChevronDown
                className={`h-4 w-4 text-zinc-400 transition-transform duration-200 dark:text-zinc-500 ${mobileServicesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {mobileServicesOpen && (
              <div className="ml-3 flex flex-col gap-0.5 border-l-2 border-zinc-100 pl-3 dark:border-zinc-700">
                <Link
                  href="/#tjanster"
                  className="rounded-md px-3 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-800"
                  onClick={() => {
                    setOpen(false);
                    if (isHome) scrollToId("tjanster");
                  }}
                >
                  Alla tjänster
                </Link>
                {serviceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-md px-3 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}

            <Link
              href="/om-oss"
              className="rounded-md px-3 py-3 text-[15px] font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-800"
              onClick={() => setOpen(false)}
            >
              Om oss
            </Link>
            {showBeforeAfter && (
              <Link
                href="/fore-efter"
                className="rounded-md px-3 py-3 text-[15px] font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-800"
                onClick={() => setOpen(false)}
              >
                Före &amp; efter
              </Link>
            )}
            {showBlog && (
              <Link
                href="/blogg"
                className="rounded-md px-3 py-3 text-[15px] font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-800"
                onClick={() => setOpen(false)}
              >
                Blogg
              </Link>
            )}
            <Link
              href="/#referenser"
              className="rounded-md px-3 py-3 text-[15px] font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-800"
              onClick={() => {
                setOpen(false);
                if (isHome) scrollToId("referenser");
              }}
            >
              Referenser
            </Link>
            <Link
              href="/#faq"
              className="rounded-md px-3 py-3 text-[15px] font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-800"
              onClick={() => {
                setOpen(false);
                if (isHome) scrollToId("faq");
              }}
            >
              FAQ
            </Link>
            <Link
              href="/#kontakt"
              className="rounded-md px-3 py-3 text-[15px] font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-800"
              onClick={() => {
                setOpen(false);
                if (isHome) scrollToId("kontakt");
              }}
            >
              Kontakt
            </Link>
          </nav>
          <a
            href={getPrimaryCtaHref()}
            className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white"
            onClick={() => setOpen(false)}
          >
            <Phone className="h-4 w-4" />
            {client.hero.cta.primary.text}
          </a>
        </div>
      )}
    </header>
  );
}
