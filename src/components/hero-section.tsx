"use client";

import dynamic from "next/dynamic";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import { DASHBOARD_URL } from "@/lib/config";
import AnimatedCounter from "@/components/animated-counter";
import DashboardMockup from "@/components/dashboard-mockup";

const ThreeBackground = dynamic(
  () => import("@/components/three-background"),
  { ssr: false }
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Three.js background */}
      <ThreeBackground />

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-background/30 to-background" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-background/40 via-transparent to-background/40" />

      {/* Ambient blobs */}
      <div
        className="ambient-blob animate-blob-drift w-[500px] h-[500px] top-20 -left-40"
        style={{ background: "var(--blob-primary)" }}
      />
      <div
        className="ambient-blob animate-blob-drift w-[400px] h-[400px] top-40 -right-32"
        style={{ background: "var(--blob-secondary)", animationDelay: "-4s" }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-20">
        {/* Top: Text content - centered */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8 inline-block">
            <div className="glass inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium text-muted">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
              Now with AI-Powered Conversation Intelligence
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Intelligent Call Tracking
            <br />
            <span className="gradient-text">for Growing Businesses</span>
          </motion.h1>

          {/* Subline */}
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl"
          >
            Route calls intelligently, bid in real-time, build visual IVR flows,
            and unlock AI-powered conversation intelligence. All in one platform.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a href={`${DASHBOARD_URL}/register`} className="btn-primary text-base !px-8 !py-4">
              Start Free Trial
              <ArrowRight className="h-5 w-5" />
            </a>
            <a href="#features" className="btn-secondary text-base !px-8 !py-4">
              <Play className="h-4 w-4" />
              See Features
            </a>
          </motion.div>
        </motion.div>

        {/* Dashboard Mockup - below text content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <DashboardMockup />
        </motion.div>

        {/* Stats row with AnimatedCounter in glass pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-3xl mx-auto"
        >
          <div className="glass rounded-2xl p-4">
            <AnimatedCounter end={50} suffix="M+" label="Calls Tracked" />
          </div>
          <div className="glass rounded-2xl p-4">
            <AnimatedCounter end={99} suffix=".9%" label="Uptime SLA" />
          </div>
          <div className="glass rounded-2xl p-4">
            <AnimatedCounter end={500} suffix="+" label="Businesses" />
          </div>
          <div className="glass rounded-2xl p-4">
            <AnimatedCounter end={200} prefix="<" suffix="ms" label="Routing Speed" />
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-[2] bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
