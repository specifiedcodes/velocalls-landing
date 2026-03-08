"use client";

import dynamic from "next/dynamic";
import { ArrowRight, Play } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
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

  // Smooth spring config for buttery parallax
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothScrollY = useSpring(scrollY, springConfig);

  // Text parallax -- fades and drifts up on scroll
  const textY = useTransform(smoothScrollY, [0, 400], [0, -60]);
  const textOpacity = useTransform(smoothScrollY, [0, 350], [1, 0]);

  // Dashboard parallax -- moves slower than scroll, scales down, flattens perspective
  const dashY = useTransform(smoothScrollY, [0, 800], [0, -100]);
  const dashScale = useTransform(smoothScrollY, [0, 600], [1, 0.92]);
  const dashRotateX = useTransform(smoothScrollY, [0, 600], [2, 0]);

  // Gradient orbs parallax -- each layer moves at a different rate for depth
  const orb1Y = useTransform(smoothScrollY, [0, 800], [0, -200]);
  const orb2Y = useTransform(smoothScrollY, [0, 800], [0, -120]);
  const orb3Y = useTransform(smoothScrollY, [0, 800], [0, -160]);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Three.js background */}
      <ThreeBackground />

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-background/30 to-background" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-background/40 via-transparent to-background/40" />

      {/* Scroll-linked gradient orbs */}
      <motion.div
        style={{ y: orb1Y }}
        className="absolute top-[-10%] left-[-15%] w-[700px] h-[700px] rounded-full pointer-events-none z-0"
      >
        <div
          className="w-full h-full rounded-full opacity-60 dark:mix-blend-screen"
          style={{
            background:
              "radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, rgba(99, 102, 241, 0.05) 50%, transparent 70%)",
          }}
        />
      </motion.div>

      <motion.div
        style={{ y: orb2Y }}
        className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none z-0"
      >
        <div
          className="w-full h-full rounded-full opacity-50 dark:mix-blend-screen"
          style={{
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.18) 0%, rgba(139, 92, 246, 0.04) 50%, transparent 70%)",
          }}
        />
      </motion.div>

      <motion.div
        style={{ y: orb3Y }}
        className="absolute top-[50%] left-[10%] w-[800px] h-[800px] rounded-full pointer-events-none z-0"
      >
        <div
          className="w-full h-full rounded-full opacity-40 dark:mix-blend-screen"
          style={{
            background:
              "radial-gradient(circle, rgba(79, 70, 229, 0.15) 0%, rgba(79, 70, 229, 0.03) 50%, transparent 70%)",
          }}
        />
      </motion.div>

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

        {/* Dashboard with scroll-linked parallax */}
        <motion.div
          style={{
            y: dashY,
            scale: dashScale,
            rotateX: dashRotateX,
          }}
          className="mt-16 max-w-4xl mx-auto [perspective:1200px]"
        >
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 1,
              delay: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
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
          className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-3xl mx-auto"
        >
          <motion.div variants={statItemVariants} className="glass rounded-2xl p-4">
            <AnimatedCounter end={50} suffix="M+" label="Calls Tracked" />
          </motion.div>
          <motion.div variants={statItemVariants} className="glass rounded-2xl p-4">
            <AnimatedCounter end={99} suffix=".9%" label="Uptime SLA" />
          </motion.div>
          <motion.div variants={statItemVariants} className="glass rounded-2xl p-4">
            <AnimatedCounter end={500} suffix="+" label="Businesses" />
          </motion.div>
          <motion.div variants={statItemVariants} className="glass rounded-2xl p-4">
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
      <div className="absolute bottom-0 left-0 right-0 h-32 z-[2] bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
