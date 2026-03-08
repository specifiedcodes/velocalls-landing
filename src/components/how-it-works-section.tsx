"use client";

import { Settings, UsersRound, BarChart3 } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    icon: Settings,
    title: "Set Up Your Campaign",
    description:
      "Configure routing rules, assign phone numbers, and build your IVR flow with our visual drag-and-drop builder.",
    color: "from-indigo-500 to-violet-500",
  },
  {
    number: "02",
    icon: UsersRound,
    title: "Connect Buyers & Publishers",
    description:
      "Onboard traffic sources and buyers. Set up real-time bidding, volume caps, and payout rules.",
    color: "from-violet-500 to-purple-500",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Track & Optimize",
    description:
      "Monitor calls in real-time, analyze AI transcriptions, review quality scorecards, and scale what works.",
    color: "from-cyan-500 to-blue-500",
  },
];

function StepCard({
  step,
  index,
  scrollYProgress,
}: {
  step: (typeof steps)[number];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const cardX = useTransform(
    scrollYProgress,
    [0.1 + index * 0.2, 0.3 + index * 0.2],
    [-40, 0]
  );
  const cardOpacity = useTransform(
    scrollYProgress,
    [0.1 + index * 0.2, 0.3 + index * 0.2],
    [0, 1]
  );

  return (
    <motion.div
      style={{ x: cardX, opacity: cardOpacity }}
      className="relative flex gap-6 md:gap-10 items-start"
    >
      {/* Step number on the timeline */}
      <div className="relative z-10 shrink-0">
        <div className="hidden md:flex h-16 w-16 items-center justify-center">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} shadow-lg`}
          >
            <step.icon className="h-6 w-6 text-white" />
          </div>
        </div>
        {/* Mobile icon */}
        <div className="md:hidden flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg">
          <step.icon className="h-5 w-5 text-white" />
        </div>
      </div>

      {/* Card */}
      <div className="glass-card p-6 md:p-8 flex-1">
        <div className="flex items-center gap-3 mb-3">
          <span className="gradient-text text-3xl font-extrabold md:text-4xl">
            {step.number}
          </span>
          <h3 className="text-xl font-semibold text-foreground">
            {step.title}
          </h3>
        </div>
        <p className="text-sm leading-relaxed text-muted">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function HowItWorksSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Dot grid overlay */}
      <div className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />

      {/* Ambient blobs */}
      <div
        className="ambient-blob animate-blob-drift w-[450px] h-[450px] -top-24 -right-32"
        style={{ background: "var(--blob-secondary)", animationDelay: "-3s" }}
      />
      <div
        className="ambient-blob animate-blob-drift w-[400px] h-[400px] bottom-0 -left-40"
        style={{ background: "var(--blob-primary)", animationDelay: "-8s" }}
      />

      {/* Subtle gradient glow behind timeline */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[700px] bg-radial-[at_50%_50%] from-indigo-500/8 via-transparent to-transparent pointer-events-none" />

      <div className="mx-auto max-w-5xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold uppercase tracking-widest text-primary mb-4">
            How It Works
          </span>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            Up and Running in{" "}
            <span className="gradient-text">Three Simple Steps</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Get started in minutes, not months. Our platform makes it easy to
            launch, connect, and optimize.
          </p>
        </motion.div>

        {/* Vertical Timeline */}
        <div className="relative">
          {/* Scroll-linked gradient timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px hidden md:block overflow-hidden">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-indigo-500/40 via-violet-500/40 to-cyan-500/40"
            />
          </div>

          <div className="space-y-8 md:space-y-12">
            {steps.map((step, index) => (
              <StepCard
                key={step.number}
                step={step}
                index={index}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
