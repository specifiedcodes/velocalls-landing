"use client";

/**
 * Testimonials Section
 *
 * Displays customer testimonials on the landing page.
 * Testimonials are managed in the centralized data file:
 * /src/lib/testimonials-data.ts
 *
 * To update testimonials, edit the data file - no component changes needed.
 *
 * Based on Story 19.1: Landing Page
 * Deferred Item #41: Testimonials from CMS
 */

import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { getTestimonials } from "@/lib/testimonials-data";

// Load testimonials from centralized data file
const testimonials = getTestimonials();

export default function TestimonialsSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold uppercase tracking-widest text-primary mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            Trusted by{" "}
            <span className="gradient-text">Industry Leaders</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            See what contact center operators and marketing teams say about VeloCalls.
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 md:grid md:grid-cols-3 md:overflow-visible md:snap-none md:pb-0">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="snap-center shrink-0 w-[85vw] sm:w-[60vw] md:w-auto"
            >
              <div className="glass-card relative p-8 h-full flex flex-col">
                {/* Decorative quote mark */}
                <span className="absolute top-4 right-4 text-6xl font-serif text-primary/5 leading-none select-none pointer-events-none">&ldquo;</span>
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm leading-relaxed text-muted flex-1 mb-6">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid var(--divider)' }}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-sm font-bold text-white">
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-muted">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
