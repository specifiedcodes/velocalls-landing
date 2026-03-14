import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { NewsletterForm } from "@/components/blog/newsletter-form";

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockReset();
});

describe("NewsletterForm", () => {
  it("renders email input and subscribe button", () => {
    render(<NewsletterForm />);
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /subscribe/i })).toBeInTheDocument();
  });

  it("shows validation error for empty email", async () => {
    render(<NewsletterForm />);
    fireEvent.click(screen.getByRole("button", { name: /subscribe/i }));
    expect(screen.getByText("Please enter a valid email address.")).toBeInTheDocument();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("shows validation error for invalid email", async () => {
    render(<NewsletterForm />);
    const input = screen.getByPlaceholderText("Enter your email");
    fireEvent.change(input, { target: { value: "notanemail" } });
    // Use fireEvent.submit to bypass native browser email validation in jsdom
    const form = input.closest("form")!;
    fireEvent.submit(form);
    expect(screen.getByText("Please enter a valid email address.")).toBeInTheDocument();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("shows success message after successful submission", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: "Thanks for subscribing!" }),
    });

    render(<NewsletterForm />);
    fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /subscribe/i }));

    await waitFor(() => {
      expect(screen.getByText("Thanks for subscribing!")).toBeInTheDocument();
    });
    expect(screen.getByText("Thanks for subscribing!")).toHaveClass("text-green-400");
  });

  it("shows error message on API failure", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ success: false, message: "Something went wrong. Please try again." }),
    });

    render(<NewsletterForm />);
    fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /subscribe/i }));

    await waitFor(() => {
      expect(screen.getByText("Something went wrong. Please try again.")).toBeInTheDocument();
    });
    expect(screen.getByText("Something went wrong. Please try again.")).toHaveClass("text-red-400");
  });

  it("honeypot field is present but visually hidden", () => {
    render(<NewsletterForm />);
    const honeypot = document.querySelector('input[name="_hp"]') as HTMLInputElement;
    expect(honeypot).toBeInTheDocument();
    expect(honeypot).toHaveAttribute("tabindex", "-1");
    expect(honeypot).toHaveAttribute("aria-hidden", "true");
    expect(honeypot.style.position).toBe("absolute");
    expect(honeypot.style.left).toBe("-9999px");
  });

  it("shows loading state during submission", async () => {
    let resolvePromise: (value: unknown) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    mockFetch.mockReturnValueOnce(promise);

    render(<NewsletterForm />);
    fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /subscribe/i }));

    await waitFor(() => {
      expect(screen.getByText("Subscribing...")).toBeInTheDocument();
    });
    expect(screen.getByRole("button")).toBeDisabled();

    // Resolve to clean up
    resolvePromise!({
      ok: true,
      json: async () => ({ success: true, message: "Thanks for subscribing!" }),
    });
  });

  it("disables form after successful subscription", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: "Thanks for subscribing!" }),
    });

    render(<NewsletterForm />);
    fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /subscribe/i }));

    await waitFor(() => {
      expect(screen.getByText("Subscribed!")).toBeInTheDocument();
    });
    expect(screen.getByPlaceholderText("Enter your email")).toBeDisabled();
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
