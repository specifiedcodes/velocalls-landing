"use client";

import { Settings, UsersRound, BarChart3 } from "lucide-react";
import { motion, useInView } from "framer-motion";
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

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="section-padding relative overflow-hidden">
      {/* Ambient blob */}
      <div
        className="ambient-blob animate-blob-drift w-[400px] h-[400px] top-20 -right-48"
        style={{ background: "var(--blob-secondary)", animationDelay: "-3s" }}
      />

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
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Gradient timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/40 via-violet-500/40 to-cyan-500/40 hidden md:block" />

          <div className="space-y-8 md:space-y-12">
            {steps.map((step) => (
              <motion.div
                key={step.number}
                variants={stepVariants}
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
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
