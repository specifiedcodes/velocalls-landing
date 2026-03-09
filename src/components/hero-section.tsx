"use client";

import { ArrowRight, Play } from "lucide-react";
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
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
      {/* Subtle top glow — single clean gradient */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[140%] h-[70%]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, var(--hero-glow) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Content */}
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

        {/* Dashboard mockup with scroll parallax */}
        <motion.div
          style={{ y: dashY, scale: dashScale }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <DashboardMockup />
          </motion.div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={statsContainerVariants}
          className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-3xl mx-auto"
        >
          <motion.div variants={statItemVariants} className="glass rounded-2xl p-5">
            <AnimatedCounter end={50} suffix="M+" label="Calls Tracked" />
          </motion.div>
          <motion.div variants={statItemVariants} className="glass rounded-2xl p-5">
            <AnimatedCounter end={99} suffix=".9%" label="Uptime SLA" />
          </motion.div>
          <motion.div variants={statItemVariants} className="glass rounded-2xl p-5">
            <AnimatedCounter end={500} suffix="+" label="Businesses" />
          </motion.div>
          <motion.div variants={statItemVariants} className="glass rounded-2xl p-5">
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
