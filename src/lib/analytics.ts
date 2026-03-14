/**
 * Lightweight analytics helper for JustAnalytics custom events.
 *
 * JustAnalytics tracker.js is loaded globally via layout.tsx and exposes
 * `window.ja(action, eventName, metadata)` for custom event tracking.
 *
 * All calls are non-blocking (fire-and-forget) and guarded for SSR safety.
 */

// ─── Event name constants ────────────────────────────────────────────
export const BLOG_EVENTS = {
  SCROLL_DEPTH: "blog_scroll_depth",
  CTA_CLICK: "blog_cta_click",
  READ_TIME: "blog_read_time",
} as const;

// ─── Type augmentation for the global ja function ────────────────────
declare global {
  interface Window {
    ja?: (
      action: string,
      eventName: string,
      metadata?: Record<string, string | number>,
    ) => void;
  }
}

// ─── Core trackEvent helper ──────────────────────────────────────────

/**
 * Fire a custom analytics event via JustAnalytics.
 * Safe to call during SSR (no-ops) and never throws.
 */
export function trackEvent(
  eventName: string,
  metadata?: Record<string, string | number>,
): void {
  try {
    if (typeof window !== "undefined" && typeof window.ja === "function") {
      window.ja("event", eventName, metadata);
    }
  } catch {
    // fire-and-forget — never block the UI
  }
}

/**
 * Fire an analytics event that survives page unload.
 * Uses `navigator.sendBeacon` when available, falling back to `window.ja`.
 * Intended for `beforeunload` / `visibilitychange` handlers where a
 * regular XHR/fetch may be cancelled by the browser.
 */
export function trackEventBeacon(
  eventName: string,
  metadata?: Record<string, string | number>,
): void {
  try {
    if (typeof window === "undefined") return;

    // Prefer sendBeacon for reliability during page teardown
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      const payload = JSON.stringify({ event: eventName, ...metadata });
      // JustAnalytics ingestion endpoint follows the site-id pattern
      const siteId =
        document.querySelector<HTMLScriptElement>("script[data-site-id]")
          ?.dataset.siteId;
      if (siteId) {
        navigator.sendBeacon(
          `https://analytics.velocalls.com/api/event`,
          new Blob([payload], { type: "application/json" }),
        );
        return;
      }
    }

    // Fallback to standard tracker
    if (typeof window.ja === "function") {
      window.ja("event", eventName, metadata);
    }
  } catch {
    // fire-and-forget — never block the UI
  }
}
