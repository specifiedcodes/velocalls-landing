"use client";

import { ArrowRight, Phone } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { DASHBOARD_URL } from "@/lib/config";

export default function CTABanner() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Dot grid overlay */}
      <div className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />

      {/* Ambient blobs */}
      <div
        className="ambient-blob animate-blob-drift w-[500px] h-[500px] -top-32 -left-40"
        style={{ background: "var(--blob-primary)", animationDelay: "-2s" }}
      />
      <div
        className="ambient-blob animate-blob-drift w-[400px] h-[400px] -bottom-24 -right-32"
        style={{ background: "var(--blob-secondary)", animationDelay: "-9s" }}
      />

      <div className="mx-auto max-w-5xl relative z-10">
        <motion.div
          ref={ref}
          style={{ scale }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-visible rounded-3xl"
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700" />

          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10 bg-grid" />

          {/* Glow effects */}
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-cyan-400/10 blur-3xl" />

          {/* Decorative floating notification - desktop only */}
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 translate-x-1/2 hidden xl:block">
            <div className="glass-card p-4 rounded-2xl animate-float" style={{ animationDelay: "-2s" }}>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-success/20 flex items-center justify-center">
                  <Phone className="h-4 w-4 text-success" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Call Connected!</p>
                  <p className="text-xs text-muted">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
              <Phone className="h-7 w-7 text-white" />
            </div>

            <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Ready to Transform Your
              <br />
              Call Business?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
              Join hundreds of businesses already using VeloCalls to track,
              route, and optimize their calls with AI-powered intelligence.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={`${DASHBOARD_URL}/register`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-indigo-700 transition-all duration-300 hover:bg-white/90 hover:shadow-lg hover:shadow-white/20 hover:-translate-y-0.5"
              >
                Start Your Free Trial
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5"
              >
                Talk to Sales
              </a>
            </div>

            <p className="mt-6 text-sm text-white/50">
              No credit card required. Free plan available.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
