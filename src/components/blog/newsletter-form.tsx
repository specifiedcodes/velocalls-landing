"use client";

import { useState, useRef } from "react";
import { Loader2 } from "lucide-react";
import { trackEvent, BLOG_EVENTS } from "@/lib/analytics";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormState = "idle" | "loading" | "success" | "error";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const honeypotRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const trimmedEmail = email.trim();

    // Client-side validation
    if (!trimmedEmail || !EMAIL_REGEX.test(trimmedEmail)) {
      setState("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setState("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmedEmail,
          _hp: honeypotRef.current?.value ?? "",
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setState("success");
        setMessage(data.message);
        trackEvent(BLOG_EVENTS.CTA_CLICK, { cta_type: "newsletter_signup" });
      } else {
        setState("error");
        setMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setState("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  const isDisabled = state === "loading" || state === "success";

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          disabled={isDisabled}
          aria-label="Email address"
          className="flex-1 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--glass-card-border)",
          }}
        />

        {/* Honeypot field - hidden from humans */}
        <input
          ref={honeypotRef}
          type="text"
          name="_hp"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-9999px",
            width: "1px",
            height: "1px",
            overflow: "hidden",
          }}
        />

        <button
          type="submit"
          disabled={isDisabled}
          className="btn-primary !px-6 whitespace-nowrap inline-flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {state === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Subscribing...
            </>
          ) : state === "success" ? (
            "Subscribed!"
          ) : (
            "Subscribe"
          )}
        </button>
      </div>

      {/* Status messages */}
      <div aria-live="polite" aria-atomic="true">
        {message && (
          <p
            role="status"
            className={`text-sm mt-3 text-center ${
              state === "success" ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}
      </div>

      <p className="text-xs text-muted mt-3 text-center">
        No spam. Unsubscribe anytime.
      </p>
    </form>
  );
}
