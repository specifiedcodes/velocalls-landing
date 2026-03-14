import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the subscribers module before importing the route
vi.mock("@/lib/subscribers", () => ({
  addSubscriber: vi.fn(),
  hashIp: vi.fn(() => "mockedhash12345"),
}));

import { POST } from "@/app/api/newsletter/route";
import { addSubscriber } from "@/lib/subscribers";
import { NextRequest } from "next/server";

const mockedAddSubscriber = vi.mocked(addSubscriber);

function createRequest(
  body: Record<string, unknown>,
  ip: string = "127.0.0.1"
): NextRequest {
  return new NextRequest("http://localhost:3000/api/newsletter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe("POST /api/newsletter", () => {
  it("returns success for valid email", async () => {
    mockedAddSubscriber.mockReturnValue({
      success: true,
      message: "Thanks for subscribing!",
    });

    const res = await POST(createRequest({ email: "user@example.com" }));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.message).toBe("Thanks for subscribing!");
  });

  it("returns 400 for invalid email format", async () => {
    const res = await POST(createRequest({ email: "notvalid" }));
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.message).toBe("Please enter a valid email address.");
  });

  it("returns 400 for empty email", async () => {
    const res = await POST(createRequest({ email: "" }));
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.success).toBe(false);
  });

  it("returns success silently for honeypot submissions", async () => {
    const res = await POST(
      createRequest({ email: "bot@spam.com", _hp: "bot-filled-this" })
    );
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    // Ensure addSubscriber was NOT called for honeypot
    expect(mockedAddSubscriber).not.toHaveBeenCalled();
  });

  it("handles duplicate emails gracefully", async () => {
    mockedAddSubscriber.mockReturnValue({
      success: true,
      message: "You're already subscribed!",
    });

    const res = await POST(createRequest({ email: "dupe@example.com" }));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.message).toBe("You're already subscribed!");
  });

  it("rate limits excessive requests (6th request in 1 minute returns 429)", async () => {
    mockedAddSubscriber.mockReturnValue({
      success: true,
      message: "Thanks for subscribing!",
    });

    const testIp = `rate-limit-test-${Date.now()}`;

    // Make 5 successful requests
    for (let i = 0; i < 5; i++) {
      const res = await POST(
        createRequest({ email: `user${i}@example.com` }, testIp)
      );
      expect(res.status).toBe(200);
    }

    // 6th request should be rate limited
    const res = await POST(
      createRequest({ email: "user5@example.com" }, testIp)
    );
    const data = await res.json();

    expect(res.status).toBe(429);
    expect(data.success).toBe(false);
    expect(data.message).toContain("Too many requests");
  });
});
