"use client";

import { useEffect, useRef, useCallback } from "react";
import { trackEvent, trackEventBeacon, BLOG_EVENTS } from "@/lib/analytics";

interface BlogAnalyticsProps {
  slug: string;
  category: string;
}

/**
 * Invisible client component that tracks blog post engagement:
 * - Scroll depth (25%, 50%, 75%, 100%)
 * - Reading time (seconds on page, fired on leave)
 * - CTA clicks ("Get Started Free" button via delegated data-analytics-cta)
 *
 * Renders nothing — purely side-effect based.
 */
export function BlogAnalytics({ slug, category }: BlogAnalyticsProps) {
  const firedDepths = useRef(new Set<number>());
  const startTime = useRef(0);
  const totalSeconds = useRef(0);
  const isVisible = useRef(true);
  const lastVisibleAt = useRef(0);
  const readTimeFired = useRef(false);
  const scrollRaf = useRef<number | null>(null);

  // ── Helpers ──────────────────────────────────────────────────────
  const meta = useCallback(
    (extra?: Record<string, string | number>) => ({
      slug,
      category,
      ...extra,
    }),
    [slug, category],
  );

  const accumulateTime = useCallback(() => {
    if (isVisible.current && lastVisibleAt.current > 0) {
      totalSeconds.current += Math.floor(
        (Date.now() - lastVisibleAt.current) / 1000,
      );
      lastVisibleAt.current = Date.now();
    }
  }, []);

  // ── Scroll depth tracking (throttled via rAF) ─────────────────
  useEffect(() => {
    const thresholds = [25, 50, 75, 100];
    let ticking = false;

    function checkScrollDepth() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const pct = Math.min(100, Math.round((scrollTop / docHeight) * 100));

      for (const threshold of thresholds) {
        if (pct >= threshold && !firedDepths.current.has(threshold)) {
          firedDepths.current.add(threshold);
          trackEvent(BLOG_EVENTS.SCROLL_DEPTH, meta({ depth: threshold }));
        }
      }
      ticking = false;
    }

    function handleScroll() {
      if (!ticking) {
        ticking = true;
        scrollRaf.current = requestAnimationFrame(checkScrollDepth);
      }
    }

    // Use passive listener for performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollRaf.current !== null) {
        cancelAnimationFrame(scrollRaf.current);
      }
    };
  }, [meta]);

  // ── Reading time tracking ────────────────────────────────────────
  useEffect(() => {
    startTime.current = Date.now();
    lastVisibleAt.current = Date.now();
    isVisible.current = true;
    readTimeFired.current = false;

    function fireReadTime() {
      if (readTimeFired.current) return;
      accumulateTime();
      if (totalSeconds.current > 0) {
        readTimeFired.current = true;
        trackEventBeacon(
          BLOG_EVENTS.READ_TIME,
          meta({ seconds: totalSeconds.current }),
        );
      }
    }

    function handleVisibilityChange() {
      if (document.visibilityState === "hidden") {
        isVisible.current = false;
        fireReadTime();
      } else {
        isVisible.current = true;
        lastVisibleAt.current = Date.now();
        // Allow re-firing after the user returns and leaves again
        readTimeFired.current = false;
      }
    }

    function handleBeforeUnload() {
      fireReadTime();
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [meta, accumulateTime]);

  // ── CTA click tracking (delegated) ──────────────────────────────
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-analytics-cta]",
      );
      if (!target) return;
      const ctaType = target.getAttribute("data-analytics-cta") ?? "unknown";
      trackEvent(BLOG_EVENTS.CTA_CLICK, meta({ cta_type: ctaType }));
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [meta]);

  return null;
}
