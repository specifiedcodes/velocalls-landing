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
      "500 minutes/month",
      "5 campaigns",
      "10 phone numbers",
      "2 team members",
      "Basic IVR builder",
      "RTB engine",
      "Webhooks",
    ],
  },
  {
    name: "Growth",
    price: "$199",
    period: "/mo",
    description: "For growing call businesses",
    cta: "Start Free Trial",
    ctaHref: `${DASHBOARD_URL}/register`,
    highlighted: true,
    badge: "Most Popular",
    features: [
      "5,000 minutes/month",
      "25 campaigns",
      "50 phone numbers",
      "10 team members",
      "AI conversation intelligence",
      "Advanced analytics",
      "Ad platform integrations",
      "Multi-carrier (2)",
      "Priority support",
    ],
  },
  {
    name: "Pro",
    price: "$499",
    period: "/mo",
    description: "For high-volume operations",
    cta: "Start Free Trial",
    ctaHref: `${DASHBOARD_URL}/register`,
    highlighted: false,
    features: [
      "15,000 minutes/month",
      "Unlimited campaigns",
      "Unlimited phone numbers",
      "50 team members",
      "Everything in Growth",
      "SSO / SAML",
      "Custom YAML carriers",
      "Unlimited carriers",
      "200 concurrent calls",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For networks & resellers",
    cta: "Contact Sales",
    ctaHref: "/contact",
    highlighted: false,
    features: [
      "Unlimited minutes",
      "Unlimited everything",
      "Dedicated account manager",
      "SLA guarantee (99.9%)",
      "White-label offering",
      "Custom integrations",
      "Unlimited concurrent calls",
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
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
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-start"
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
                  "relative p-6 md:p-7 flex flex-col rounded-2xl",
                  plan.highlighted
                    ? "shadow-lg shadow-indigo-500/10"
                    : "glass-card"
                )}
                style={
                  plan.highlighted
                    ? {
                        background: "var(--bg)",
                        border: "2px solid rgba(99, 102, 241, 0.4)",
                      }
                    : undefined
                }
              >
                {/* Popular Badge */}
                {plan.badge && (
                  <div className="absolute top-0 right-0 z-20 overflow-hidden rounded-bl-xl rounded-tr-[1rem]">
                    <div className="gradient-primary flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white overflow-hidden relative">
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                          backgroundSize: "200% 100%",
                          animation: "shimmer-badge 3s infinite",
                        }}
                      />
                      <Sparkles className="h-3 w-3 relative z-10" />
                      <span className="relative z-10">{plan.badge}</span>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="relative z-10 flex flex-col flex-1">
                  {/* Plan Name */}
                  <h3 className="text-lg font-semibold text-foreground">
                    {plan.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{plan.description}</p>

                  {/* Price */}
                  <div className="mt-5 mb-5">
                    <span className="text-3xl md:text-4xl font-extrabold text-foreground">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-muted text-base md:text-lg">
                        {plan.period}
                      </span>
                    )}
                  </div>

                  {/* CTA */}
                  <a
                    href={plan.ctaHref}
                    className={cn(
                      "w-full text-center mb-6",
                      plan.highlighted ? "btn-primary" : "btn-secondary"
                    )}
                  >
                    {plan.cta}
                    <ArrowRight className="h-4 w-4" />
                  </a>

                  {/* Features */}
                  <ul className="space-y-2.5 flex-1">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-sm text-muted"
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

        {/* Usage note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center text-sm text-muted mt-10"
        >
          All plans include overage protection. Usage beyond included minutes
          billed at competitive per-minute rates.
          <br />
          Annual billing saves ~17%. 14-day free trial on Growth & Pro plans.
        </motion.p>
      </div>
    </section>
  );
}
