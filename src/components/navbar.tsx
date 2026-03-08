"use client";

import { useState, useEffect } from "react";
import { Phone, Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { DASHBOARD_URL } from "@/lib/config";
import ThemeToggle from "@/components/theme-toggle";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const handleLinkClick = () => {
    setIsMobileOpen(false);
  };

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl">
      {/* Pill navbar */}
      <div
        className={cn(
          "transition-all duration-300",
          isScrolled ? "glass-pill-scrolled" : "glass-pill"
        )}
      >
        <nav className="flex items-center justify-between px-5 py-2.5">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
              <Phone className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-foreground tracking-tight">
              Velo<span className="gradient-text">Calls</span>
            </span>
          </a>

          {/* Desktop Links (center) */}
          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted transition-colors duration-200 hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Actions (right) */}
          <div className="hidden items-center gap-3 md:flex shrink-0">
            <ThemeToggle />
            <a
              href={`${DASHBOARD_URL}/register`}
              className="btn-primary !py-2 !px-5 !text-sm"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-surface md:hidden"
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          >
            {isMobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Menu - separate dropdown card below the pill */}
      <div
        className={cn(
          "md:hidden transition-all duration-300 ease-in-out",
          isMobileOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        <div className="absolute top-full left-0 right-0 mt-2 glass-card rounded-2xl p-4">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="block rounded-lg px-4 py-3 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div
            className="mt-3 flex items-center justify-between pt-3"
            style={{ borderTop: "1px solid var(--divider)" }}
          >
            <span className="text-sm text-muted">Theme</span>
            <ThemeToggle />
          </div>
          <div className="flex flex-col gap-3 pt-3">
            <a
              href={`${DASHBOARD_URL}/login`}
              className="btn-secondary !text-sm text-center"
            >
              Log In
            </a>
            <a
              href={`${DASHBOARD_URL}/register`}
              className="btn-primary !text-sm text-center"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
