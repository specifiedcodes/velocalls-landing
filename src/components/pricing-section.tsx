"use client";

import { useState, useMemo } from "react";
import { ArrowRight, Phone, Radio, Mic, Brain, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DASHBOARD_URL } from "@/lib/config";

/* -------------------------------------------------- */
/*  Tier data — rates based on cumulative spend       */
/* -------------------------------------------------- */

type Mode = "platform" | "byoc";

interface Tier {
  label: string;
  rate: number; // % fee or cents/min
  min: number;
  max: number | null;
}

const PLATFORM_TIERS: Tier[] = [
  { label: "Starter", rate: 20, min: 0, max: 500 },
  { label: "Growth", rate: 15, min: 500, max: 2000 },
  { label: "Scale", rate: 10, min: 2000, max: 10000 },
  { label: "Enterprise", rate: 5, min: 10000, max: null },
];

const BYOC_TIERS: Tier[] = [
  { label: "Starter", rate: 2.0, min: 0, max: 10000 },
  { label: "Growth", rate: 1.5, min: 10000, max: 50000 },
  { label: "Scale", rate: 1.0, min: 50000, max: 200000 },
  { label: "Enterprise", rate: 0.5, min: 200000, max: null },
];

const ADDONS = [
  { name: "Recording", rate: "3¢/min", icon: Mic },
  { name: "Transcription", rate: "4¢/min", icon: MessageSquare },
  { name: "AI Summary", rate: "10¢/call", icon: Brain },
];

/* Slider stops — represent cumulative lifetime spend / minutes */
const PLATFORM_STOPS = [0, 100, 250, 500, 1000, 2000, 3500, 5000, 7500, 10000, 12500, 15000];
const BYOC_STOPS = [0, 2000, 5000, 10000, 25000, 50000, 100000, 150000, 200000, 250000, 300000];

/* -------------------------------------------------- */
/*  Helpers                                           */
/* -------------------------------------------------- */

function getCurrentTier(tiers: Tier[], value: number): Tier {
  for (let i = tiers.length - 1; i >= 0; i--) {
    if (value >= tiers[i].min) return tiers[i];
  }
  return tiers[0];
}

function formatCurrency(val: number): string {
  if (val >= 1000) return `$${(val / 1000).toFixed(val % 1000 === 0 ? 0 : 1)}K`;
  return `$${val.toLocaleString()}`;
}

function formatMinutes(val: number): string {
  if (val >= 1000) return `${(val / 1000).toFixed(val % 1000 === 0 ? 0 : 1)}K`;
  return val.toLocaleString();
}

/* -------------------------------------------------- */
/*  Tier step visualization                           */
/* -------------------------------------------------- */

function TierSteps({
  tiers,
  activeTier,
  mode,
}: {
  tiers: Tier[];
  activeTier: Tier;
  mode: Mode;
}) {
  return (
    <div className="grid grid-cols-4 gap-3 md:gap-4">
      {tiers.map((tier) => {
        const isActive = tier.label === activeTier.label;
        const rangeLabel =
          mode === "platform"
            ? `${formatCurrency(tier.min)}${tier.max ? ` – ${formatCurrency(tier.max)}` : "+"}`
            : `${formatMinutes(tier.min)}${tier.max ? ` – ${formatMinutes(tier.max)}` : "+"} min`;

        return (
          <motion.div
            key={tier.label}
            animate={{
              scale: isActive ? 1 : 0.97,
              opacity: isActive ? 1 : 0.5,
            }}
            transition={{ duration: 0.3 }}
            className={cn(
              "rounded-xl p-3 md:p-4 text-center transition-colors",
              isActive ? "glass-card" : "border border-transparent"
            )}
          >
            <div className="text-[10px] md:text-xs text-muted font-medium mb-1">
              {tier.label}
            </div>
            <div
              className={cn(
                "text-xl md:text-2xl font-extrabold",
                isActive ? "text-primary" : "text-muted"
              )}
            >
              {mode === "platform" ? `${tier.rate}%` : `${tier.rate}¢`}
            </div>
            <div className="text-[10px] md:text-xs text-muted mt-1">
              {mode === "platform" ? "service fee" : "/min"}
            </div>
            <div className="text-[10px] md:text-xs text-muted mt-2 hidden sm:block">
              {rangeLabel}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------- */
/*  Main pricing section                              */
/* -------------------------------------------------- */

export default function PricingSection() {
  const [mode, setMode] = useState<Mode>("platform");
  const [sliderIndex, setSliderIndex] = useState(4);

  const stops = mode === "platform" ? PLATFORM_STOPS : BYOC_STOPS;
  const tiers = mode === "platform" ? PLATFORM_TIERS : BYOC_TIERS;
  const value = stops[sliderIndex] ?? stops[0];
  const currentTier = useMemo(() => getCurrentTier(tiers, value), [tiers, value]);

  // Calculate example monthly cost at this rate
  const { exampleCost, savingsPercent } = useMemo(() => {
    // Use a fixed example month ($1000 spend or 10000 min) to show rate impact
    if (mode === "platform") {
      const exampleSpend = 1000; // example $1K carrier cost in a month
      const fee = exampleSpend * (currentTier.rate / 100);
      const baseFee = exampleSpend * (PLATFORM_TIERS[0].rate / 100);
      const savings = currentTier.rate < PLATFORM_TIERS[0].rate
        ? Math.round((1 - fee / baseFee) * 100)
        : 0;
      return { exampleCost: fee, savingsPercent: savings };
    } else {
      const exampleMin = 10000;
      const cost = (exampleMin * currentTier.rate) / 100;
      const baseCost = (exampleMin * BYOC_TIERS[0].rate) / 100;
      const savings = currentTier.rate < BYOC_TIERS[0].rate
        ? Math.round((1 - cost / baseCost) * 100)
        : 0;
      return { exampleCost: cost, savingsPercent: savings };
    }
  }, [mode, currentTier]);

  return (
    <section id="pricing" className="section-padding relative overflow-hidden">
      <div className="mx-auto max-w-4xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm font-semibold uppercase tracking-widest text-primary mb-4">
            Pricing
          </span>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            Pay As You Go,{" "}
            <span className="gradient-text">Save As You Grow</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Pure usage-based pricing. Your rate drops automatically as your
            lifetime spend grows — and it never goes back up.
          </p>
        </motion.div>

        {/* Mode Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-10"
        >
          <div className="glass rounded-full p-1 inline-flex gap-1">
            <button
              onClick={() => {
                setMode("platform");
                setSliderIndex(4);
              }}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                mode === "platform"
                  ? "bg-primary text-white shadow-md"
                  : "text-muted hover:text-foreground"
              )}
            >
              <Phone className="h-4 w-4" />
              Managed Carriers
            </button>
            <button
              onClick={() => {
                setMode("byoc");
                setSliderIndex(3);
              }}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                mode === "byoc"
                  ? "bg-primary text-white shadow-md"
                  : "text-muted hover:text-foreground"
              )}
            >
              <Radio className="h-4 w-4" />
              Bring Your Own Carrier
            </button>
          </div>
        </motion.div>

        {/* Interactive Slider Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-6 md:p-10 rounded-2xl"
        >
          {/* Slider label */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-muted">
              {mode === "platform"
                ? "Your Lifetime Spend"
                : "Your Lifetime Minutes"}
            </span>
            <span className="text-lg md:text-xl font-bold text-foreground">
              {mode === "platform"
                ? formatCurrency(value)
                : `${value.toLocaleString()} min`}
              {value === stops[stops.length - 1] ? "+" : ""}
            </span>
          </div>

          {/* Range slider */}
          <div className="relative mb-8">
            <input
              type="range"
              min={0}
              max={stops.length - 1}
              value={sliderIndex}
              onChange={(e) => setSliderIndex(Number(e.target.value))}
              className="pricing-slider w-full"
            />
            {/* Tier threshold markers */}
            <div className="flex justify-between mt-2 px-0.5">
              {stops
                .filter(
                  (_, i) =>
                    i === 0 ||
                    i === stops.length - 1 ||
                    stops[i] ===
                      (mode === "platform" ? 500 : 10000) ||
                    stops[i] ===
                      (mode === "platform" ? 2000 : 50000) ||
                    stops[i] ===
                      (mode === "platform" ? 10000 : 200000)
                )
                .map((stop) => (
                  <span key={stop} className="text-[10px] text-muted">
                    {mode === "platform"
                      ? formatCurrency(stop)
                      : formatMinutes(stop)}
                    {stop === stops[stops.length - 1] ? "+" : ""}
                  </span>
                ))}
            </div>
          </div>

          {/* Result cards */}
          <div className="grid grid-cols-3 gap-3 md:gap-5 mb-8">
            <div className="text-center p-3 md:p-5 glass rounded-xl">
              <motion.div
                key={`rate-${currentTier.rate}`}
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-2xl md:text-3xl font-extrabold text-primary"
              >
                {mode === "platform"
                  ? `${currentTier.rate}%`
                  : `${currentTier.rate}¢`}
              </motion.div>
              <div className="text-xs text-muted mt-1">
                {mode === "platform" ? "Your Rate" : "Per Minute"}
              </div>
            </div>

            <div className="text-center p-3 md:p-5 glass rounded-xl">
              <motion.div
                key={`cost-${exampleCost}`}
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-2xl md:text-3xl font-extrabold text-foreground"
              >
                ${exampleCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </motion.div>
              <div className="text-xs text-muted mt-1">
                {mode === "platform"
                  ? "Fee on $1K spend"
                  : "Fee on 10K min"}
              </div>
            </div>

            <div className="text-center p-3 md:p-5 glass rounded-xl">
              <motion.div
                key={`save-${savingsPercent}`}
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "text-2xl md:text-3xl font-extrabold",
                  savingsPercent > 0 ? "text-emerald-500" : "text-muted"
                )}
              >
                {savingsPercent > 0 ? `${savingsPercent}%` : "—"}
              </motion.div>
              <div className="text-xs text-muted mt-1">
                Savings vs Starter
              </div>
            </div>
          </div>

          {/* Tier steps */}
          <TierSteps tiers={tiers} activeTier={currentTier} mode={mode} />
        </motion.div>

        {/* Add-ons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 glass-card rounded-2xl p-6 md:p-8"
        >
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
            Optional Add-ons
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {ADDONS.map(({ name, rate, icon: Icon }) => (
              <div key={name} className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {name}
                  </div>
                  <div className="text-xs text-muted">{rate}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <a
            href={`${DASHBOARD_URL}/register`}
            className="btn-primary text-base !px-8 !py-4"
          >
            Start Free — No Credit Card Required
            <ArrowRight className="h-5 w-5" />
          </a>
          <p className="text-sm text-muted mt-4">
            Your rate drops as your lifetime spend grows — and never goes back
            up.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
