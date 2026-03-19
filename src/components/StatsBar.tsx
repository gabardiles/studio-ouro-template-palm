"use client";

/**
 * Animated stats bar – each number counts from 0 to its value
 * when the bar scrolls into view. Handles suffixes like "+", "h", "%".
 */

import { useEffect, useRef, useState } from "react";

type Stat = { value: string; label: string };

/** Split "15+", "4.5", "2h", "120" into { prefix, num, suffix, decimals } */
function parse(raw: string) {
  const match = raw.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const [, prefix, numStr, suffix] = match;
  const num = parseFloat(numStr);
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return { prefix, num, suffix, decimals };
}

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function StatCounter({ value, label }: Stat) {
  const parsed = parse(value);
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(parsed ? "0" : value);
  const started = useRef(false);

  useEffect(() => {
    if (!parsed) return;

    const el = ref.current;
    if (!el) return;

    const DURATION = 1600;

    const run = () => {
      if (started.current) return;
      started.current = true;

      const start = performance.now();
      const tick = (now: number) => {
        const elapsed = now - start;
        const t = Math.min(elapsed / DURATION, 1);
        const eased = easeOut(t);
        const current = parsed.num * eased;
        setDisplay(current.toFixed(parsed.decimals));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { run(); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [parsed]);

  return (
    <div ref={ref} className="flex-1 basis-1/2 px-4 py-6 text-center sm:basis-0">
      <p className="text-2xl font-medium text-[var(--primary)] sm:text-3xl">
        {parsed ? `${parsed.prefix}${display}${parsed.suffix}` : value}
      </p>
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 sm:text-xs">
        {label}
      </p>
    </div>
  );
}

export function StatsBar({ stats }: { stats: readonly Stat[] }) {
  if (stats.length === 0) return null;
  return (
    <div className="mt-14 flex flex-wrap items-center divide-x divide-zinc-200 rounded-lg border border-zinc-200 bg-white dark:divide-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 sm:flex-nowrap">
      {stats.map((stat) => (
        <StatCounter key={stat.label} {...stat} />
      ))}
    </div>
  );
}
