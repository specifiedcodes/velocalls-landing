"use client";

import { Check, ArrowRight, Sparkles } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { DASHBOARD_URL } from "@/lib/config";

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "/mo",
    description: "Perfect for testing the waters",
    cta: "Get Started Free",
    ctaHref: `${DASHBOARD_URL}/register`,
    highlighted: false,
    features: [
      "100 calls/month",
      "1 campaign",
      "Basic IVR",
      "Email support",
      "5 phone numbers",
    ],
  },
  {
    name: "Professional",
    price: "$199",
    period: "/mo",
    description: "For growing call businesses",
    cta: "Start Free Trial",
    ctaHref: `${DASHBOARD_URL}/register`,
    highlighted: true,
    badge: "Most Popular",
    features: [
      "10,000 calls/month",
      "Unlimited campaigns",
      "Visual IVR builder",
      "Real-time bidding",
      "AI transcription",
      "Priority support",
      "50 phone numbers",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For high-volume operations",
    cta: "Contact Sales",
    ctaHref: "/contact",
    highlighted: false,
    features: [
      "Unlimited calls",
      "Unlimited campaigns",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantee",
      "SSO / SAML",
      "Unlimited phone numbers",
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="section-padding relative overflow-hidden">
      {/* Dot grid overlay */}
      <div className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />

      {/* Ambient blobs */}
      <div
        className="ambient-blob animate-blob-drift w-[500px] h-[500px] -top-32 -left-48"
        style={{ background: "var(--blob-primary)", animationDelay: "-4s" }}
      />
      <div
        className="ambient-blob animate-blob-drift w-[400px] h-[400px] -bottom-32 -right-48"
        style={{ background: "var(--blob-accent)", animationDelay: "-7s" }}
      />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial-[at_50%_50%] from-violet-500/8 via-transparent to-transparent pointer-events-none" />

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
            Pricing
          </span>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            Simple, Transparent{" "}
            <span className="gradient-text">Pricing</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Start free, scale as you grow. No hidden fees, no surprises.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-8 lg:grid-cols-3 items-start"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div
                className={cn(
                  "glass-card relative p-8 flex flex-col",
                  plan.highlighted &&
                    "gradient-border scale-105 shadow-lg shadow-indigo-500/10 bg-background glow-box"
                )}
              >
                {/* Popular Badge */}
                {plan.badge && (
                  <div className="absolute top-0 right-0 z-20 overflow-hidden rounded-bl-xl rounded-tr-[1rem]">
                    <div
                      className="gradient-primary flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white overflow-hidden relative"
                    >
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                          backgroundSize: "200% 100%",
                          animation: "shimmer-badge 3s infinite",
                        }}
                      />
                      <Sparkles className="h-3.5 w-3.5 relative z-10" />
                      <span className="relative z-10">{plan.badge}</span>
                    </div>
                  </div>
                )}

                {/* Content wrapper above gradient-border pseudo-element */}
                <div className="relative z-10 flex flex-col flex-1">
                  {/* Plan Name */}
                  <h3 className="text-lg font-semibold text-foreground">
                    {plan.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{plan.description}</p>

                  {/* Price */}
                  <div className="mt-6 mb-6">
                    <span className="text-4xl font-extrabold text-foreground">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-muted text-lg">{plan.period}</span>
                    )}
                  </div>

                  {/* CTA */}
                  <a
                    href={plan.ctaHref}
                    className={cn(
                      "w-full text-center mb-8",
                      plan.highlighted ? "btn-primary" : "btn-secondary"
                    )}
                  >
                    {plan.cta}
                    <ArrowRight className="h-4 w-4" />
                  </a>

                  {/* Features */}
                  <ul className="space-y-3 flex-1">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-muted"
                      >
                        <Check className="h-4 w-4 text-success mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
