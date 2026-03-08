"use client";

import { ArrowRight, Play, Phone, Zap } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { DASHBOARD_URL } from "@/lib/config";
import AnimatedCounter from "@/components/animated-counter";
import DashboardMockup from "@/components/dashboard-mockup";

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

const statsContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const statItemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function HeroSection() {
  const { scrollY } = useScroll();

  const textY = useTransform(scrollY, [0, 400], [0, -60]);
  const textOpacity = useTransform(scrollY, [0, 350], [1, 0]);
  const dashY = useTransform(scrollY, [0, 800], [0, -80]);
  const dashScale = useTransform(scrollY, [0, 600], [1, 0.95]);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* === LAYER 1: Aurora gradient blobs === */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Blob 1: Indigo — top left */}
        <div
          className="absolute rounded-full"
          style={{
            width: "800px",
            height: "800px",
            top: "-15%",
            left: "-10%",
            background:
              "radial-gradient(circle, rgba(99, 102, 241, 0.35) 0%, rgba(99, 102, 241, 0.08) 50%, transparent 70%)",
            filter: "blur(80px)",
            mixBlendMode: "screen",
            animation: "aurora-1 12s ease-in-out infinite",
          }}
        />
        {/* Blob 2: Violet — top right */}
        <div
          className="absolute rounded-full"
          style={{
            width: "700px",
            height: "700px",
            top: "5%",
            right: "-8%",
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(139, 92, 246, 0.06) 50%, transparent 70%)",
            filter: "blur(90px)",
            mixBlendMode: "screen",
            animation: "aurora-2 14s ease-in-out infinite",
            animationDelay: "-3s",
          }}
        />
        {/* Blob 3: Cyan — bottom center */}
        <div
          className="absolute rounded-full"
          style={{
            width: "650px",
            height: "650px",
            bottom: "0%",
            left: "20%",
            background:
              "radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, rgba(6, 182, 212, 0.05) 50%, transparent 70%)",
            filter: "blur(85px)",
            mixBlendMode: "screen",
            animation: "aurora-3 16s ease-in-out infinite",
            animationDelay: "-6s",
          }}
        />
        {/* Blob 4: Deep indigo — center */}
        <div
          className="absolute rounded-full"
          style={{
            width: "600px",
            height: "600px",
            top: "30%",
            left: "35%",
            background:
              "radial-gradient(circle, rgba(79, 70, 229, 0.2) 0%, rgba(79, 70, 229, 0.04) 50%, transparent 70%)",
            filter: "blur(100px)",
            mixBlendMode: "screen",
            animation: "aurora-1 18s ease-in-out infinite",
            animationDelay: "-9s",
          }}
        />
        {/* Blob 5: Violet-pink — bottom right */}
        <div
          className="absolute rounded-full"
          style={{
            width: "550px",
            height: "550px",
            bottom: "10%",
            right: "5%",
            background:
              "radial-gradient(circle, rgba(167, 139, 250, 0.2) 0%, rgba(167, 139, 250, 0.04) 50%, transparent 70%)",
            filter: "blur(75px)",
            mixBlendMode: "screen",
            animation: "aurora-2 20s ease-in-out infinite",
            animationDelay: "-12s",
          }}
        />
      </div>

      {/* === LAYER 2: Dot grid overlay === */}
      <div className="absolute inset-0 z-[1] bg-dot-grid opacity-40" />

      {/* === LAYER 3: Gradient overlay for readability === */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-background/70 via-background/30 to-background" />

      {/* === LAYER 4: Content === */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-20">
        {/* Text with scroll-linked parallax */}
        <motion.div style={{ y: textY, opacity: textOpacity }}>
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
              Route calls intelligently, bid in real-time, build visual IVR
              flows, and unlock AI-powered conversation intelligence. All in one
              platform.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <a
                href={`${DASHBOARD_URL}/register`}
                className="btn-primary text-base !px-8 !py-4"
              >
                Start Free Trial
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="#features"
                className="btn-secondary text-base !px-8 !py-4"
              >
                <Play className="h-4 w-4" />
                See Features
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Dashboard with scroll-linked parallax + floating cards + glow border */}
        <motion.div
          style={{ y: dashY, scale: dashScale }}
          className="mt-20 max-w-4xl mx-auto relative"
        >
          {/* Floating glass notification card: Call Connected (left) */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="absolute -left-8 top-8 z-20 hidden lg:block"
          >
            <div
              className="glass-card p-3 rounded-xl animate-float glow-box"
              style={{ animationDelay: "-1s" }}
            >
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                  <Phone className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    Call Connected
                  </p>
                  <p className="text-[10px] text-muted">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating glass notification card: Revenue +24% (right) */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="absolute -right-6 top-20 z-20 hidden lg:block"
          >
            <div
              className="glass-card p-3 rounded-xl animate-float glow-box"
              style={{ animationDelay: "-3s" }}
            >
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-400 to-violet-600 flex items-center justify-center">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    Revenue +24%
                  </p>
                  <p className="text-[10px] text-success">This month</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Dashboard with glowing border */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative rounded-[1.5rem] glow-border"
          >
            <DashboardMockup />
          </motion.div>
        </motion.div>

        {/* Stats row with staggered whileInView reveal */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={statsContainerVariants}
          className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-3xl mx-auto"
        >
          <motion.div
            variants={statItemVariants}
            className="glass rounded-2xl p-5 glow-box"
          >
            <AnimatedCounter end={50} suffix="M+" label="Calls Tracked" />
          </motion.div>
          <motion.div
            variants={statItemVariants}
            className="glass rounded-2xl p-5 glow-box"
          >
            <AnimatedCounter end={99} suffix=".9%" label="Uptime SLA" />
          </motion.div>
          <motion.div
            variants={statItemVariants}
            className="glass rounded-2xl p-5 glow-box"
          >
            <AnimatedCounter end={500} suffix="+" label="Businesses" />
          </motion.div>
          <motion.div
            variants={statItemVariants}
            className="glass rounded-2xl p-5 glow-box"
          >
            <AnimatedCounter
              end={200}
              prefix="<"
              suffix="ms"
              label="Routing Speed"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 z-[5] bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
