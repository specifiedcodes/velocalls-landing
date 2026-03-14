import { NextRequest, NextResponse } from "next/server";
import { addSubscriber, hashIp } from "@/lib/subscribers";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// In-memory rate limiting: IP -> array of timestamps
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5;
const MAX_TRACKED_IPS = 10_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) ?? [];

  // Remove entries outside the window
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  // If no recent timestamps, clean up the entry entirely
  if (recent.length === 0 && rateLimitMap.has(ip)) {
    rateLimitMap.delete(ip);
  }

  if (recent.length >= RATE_LIMIT_MAX) {
    rateLimitMap.set(ip, recent);
    return true;
  }

  // Evict oldest entries if map is too large
  if (rateLimitMap.size >= MAX_TRACKED_IPS && !rateLimitMap.has(ip)) {
    const firstKey = rateLimitMap.keys().next().value;
    if (firstKey !== undefined) {
      rateLimitMap.delete(firstKey);
    }
  }

  recent.push(now);
  rateLimitMap.set(ip, recent);
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    // Parse body first, return 400 for malformed JSON
    let body: { email?: string; _hp?: string };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid request body." },
        { status: 400 }
      );
    }

    const { email, _hp } = body;

    // Honeypot check before rate limiting - don't let bots consume quota
    if (_hp) {
      return NextResponse.json({ success: true, message: "Thanks for subscribing!" });
    }

    // Rate limit check
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Validate email
    if (!email || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const ipHash = hashIp(ip);
    const result = addSubscriber(email, ipHash);

    return NextResponse.json(result, { status: result.success ? 200 : 500 });
  } catch {
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
