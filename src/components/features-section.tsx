"use client";

import {
  Phone,
  DollarSign,
  Brain,
  Radio,
  Users,
  ShieldCheck,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { LucideIcon } from "lucide-react";

const features = [
  {
    icon: Phone,
    title: "Smart Call Routing",
    description:
      "Route calls based on geography, time, buyer bids, and custom rules with our visual IVR builder.",
    gradient: "from-indigo-500 to-violet-500",
  },
  {
    icon: DollarSign,
    title: "Real-Time Bidding",
    description:
      "Let buyers compete for calls in real-time auctions. Maximize revenue with intelligent bid management.",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: Brain,
    title: "AI Conversation Intelligence",
    description:
      "Automatic transcription, sentiment analysis, call summarization, and AMD detection powered by AI.",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: Radio,
    title: "Multi-Carrier Support",
    description:
      "Connect multiple carriers with automatic failover, health monitoring, and cost-based routing.",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    icon: Users,
    title: "Publisher & Buyer Portals",
    description:
      "Self-service portals for publishers and buyers with real-time analytics, disputes, and volume caps.",
    gradient: "from-indigo-500 to-cyan-500",
  },
  {
    icon: ShieldCheck,
    title: "Compliance Built-In",
    description:
      "Federal DNC scrubbing, TCPA calling hours, consent verification, and state litigator lists.",
    gradient: "from-emerald-500 to-cyan-500",
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

function FeatureIcon({ index }: { index: number }) {
  const Icon: LucideIcon = features[index].icon;
  return <Icon className="h-6 w-6 text-white" />;
}

function RoutingDiagram() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="h-3 w-3 rounded-full bg-indigo-400" />
      <div className="h-8 w-px bg-gradient-to-b from-indigo-400 to-violet-400" />
      <div className="flex gap-6">
        <div className="h-3 w-3 rounded-full bg-violet-400" />
        <div className="h-3 w-3 rounded-full bg-violet-400" />
        <div className="h-3 w-3 rounded-full bg-violet-400" />
      </div>
    </div>
  );
}

function CarrierStatusBars() {
  return (
    <div className="space-y-2">
      {["Twilio", "Telnyx", "Bandwidth"].map((name) => (
        <div
          key={name}
          className="glass rounded-lg px-3 py-2 flex items-center justify-between"
        >
          <span className="text-xs text-muted">{name}</span>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs text-emerald-500">Healthy</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ComplianceBadges() {
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-4">
      {["TCPA", "DNC", "GDPR", "SOC2"].map((badge) => (
        <span
          key={badge}
          className="glass rounded-full px-3 py-1 text-xs font-medium text-primary"
        >
          {badge}
        </span>
      ))}
    </div>
  );
}

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="features"
      className="section-padding relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold uppercase tracking-widest text-primary mb-4">
            Features
          </span>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            Everything You Need to{" "}
            <span className="gradient-text">Run Your Contact Center</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            From intelligent routing to AI-powered analytics, VeloCalls gives
            you the tools to maximize every call.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Card 0: Smart Call Routing — col-span-2 horizontal */}
          <motion.div
            variants={cardVariants}
            className="col-span-1 sm:col-span-2"
          >
            <div className="glass-card p-8 h-full flex flex-row items-center gap-6">
              <div className="flex-1">
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${features[0].gradient} shadow-lg`}
                >
                  <FeatureIcon index={0} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {features[0].title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {features[0].description}
                </p>
              </div>
              <div className="hidden sm:block w-48 shrink-0">
                <RoutingDiagram />
              </div>
            </div>
          </motion.div>

          {/* Card 1: Real-Time Bidding */}
          <motion.div variants={cardVariants} className="col-span-1">
            <div className="glass-card p-8 h-full flex flex-col">
              <div
                className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${features[1].gradient} shadow-lg`}
              >
                <FeatureIcon index={1} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {features[1].title}
              </h3>
              <p className="text-sm leading-relaxed text-muted flex-1">
                {features[1].description}
              </p>
            </div>
          </motion.div>

          {/* Card 2: AI Intelligence */}
          <motion.div variants={cardVariants} className="col-span-1">
            <div className="glass-card p-8 h-full flex flex-col">
              <div
                className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${features[2].gradient} shadow-lg`}
              >
                <FeatureIcon index={2} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {features[2].title}
              </h3>
              <p className="text-sm leading-relaxed text-muted flex-1">
                {features[2].description}
              </p>
            </div>
          </motion.div>

          {/* Card 3: Multi-Carrier — col-span-2 horizontal */}
          <motion.div
            variants={cardVariants}
            className="col-span-1 sm:col-span-2"
          >
            <div className="glass-card p-8 h-full flex flex-row items-center gap-6">
              <div className="flex-1">
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${features[3].gradient} shadow-lg`}
                >
                  <FeatureIcon index={3} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {features[3].title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {features[3].description}
                </p>
              </div>
              <div className="hidden sm:block w-48 shrink-0">
                <CarrierStatusBars />
              </div>
            </div>
          </motion.div>

          {/* Card 4: Publisher Portals */}
          <motion.div variants={cardVariants} className="col-span-1">
            <div className="glass-card p-8 h-full flex flex-col">
              <div
                className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${features[4].gradient} shadow-lg`}
              >
                <FeatureIcon index={4} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {features[4].title}
              </h3>
              <p className="text-sm leading-relaxed text-muted flex-1">
                {features[4].description}
              </p>
            </div>
          </motion.div>

          {/* Card 5: Compliance — fills remaining 2 cols beside Card 4 */}
          <motion.div
            variants={cardVariants}
            className="col-span-1 sm:col-span-2 lg:col-span-2"
          >
            <div className="glass-card p-8 h-full flex flex-col items-center text-center">
              <div
                className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${features[5].gradient} shadow-lg`}
              >
                <FeatureIcon index={5} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {features[5].title}
              </h3>
              <p className="text-sm leading-relaxed text-muted max-w-lg">
                {features[5].description}
              </p>
              <ComplianceBadges />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
