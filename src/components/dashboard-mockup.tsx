"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

/* -------------------------------------------------- */
/*  Animated metric counter                           */
/* -------------------------------------------------- */

function AnimatedMetric({
  value,
  suffix = "",
  prefix = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const end = value;
    const duration = 1500;
    const startTime = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplay(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

/* -------------------------------------------------- */
/*  Metric card (glass card with animated value)      */
/* -------------------------------------------------- */

function MetricCard({
  children,
  label,
  indicator,
  delay,
}: {
  children: React.ReactNode;
  label: string;
  indicator: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      className="glass-card p-3 md:p-4 flex flex-col gap-1"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-foreground md:text-xl">
          {children}
        </span>
        {indicator}
      </div>
      <span className="text-xs text-muted">{label}</span>
    </motion.div>
  );
}

/* -------------------------------------------------- */
/*  Call log row (stagger animation)                  */
/* -------------------------------------------------- */

function CallLogRow({
  number,
  status,
  duration,
  time,
  index,
}: {
  number: string;
  status: string;
  duration: string;
  time: string;
  index: number;
}) {
  return (
    <motion.div
      className="glass flex items-center justify-between rounded-lg px-3 py-2 md:px-4 md:py-3"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 1.5 + index * 0.2 }}
    >
      <div className="flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-success" />
        <span className="text-xs font-medium text-foreground md:text-sm">
          {number}
        </span>
      </div>
      <span className="text-xs text-muted hidden sm:inline">{status}</span>
      <span className="text-xs text-muted">{duration}</span>
      <span className="text-xs text-muted">{time}</span>
    </motion.div>
  );
}

/* -------------------------------------------------- */
/*  Animated SVG chart                                */
/* -------------------------------------------------- */

const CHART_LINE =
  "M0 80 C30 70, 60 65, 80 55 C100 45, 130 50, 160 40 C190 30, 210 35, 240 25 C270 15, 290 20, 320 15 C350 10, 370 18, 400 10";
const CHART_FILL =
  "M0 80 C30 70, 60 65, 80 55 C100 45, 130 50, 160 40 C190 30, 210 35, 240 25 C270 15, 290 20, 320 15 C350 10, 370 18, 400 10 L400 100 L0 100 Z";

function AnimatedChart() {
  return (
    <svg
      className="h-24 w-full md:h-32"
      viewBox="0 0 400 100"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Fill area – fades in after line draws */}
      <motion.path
        d={CHART_FILL}
        fill="url(#chart-gradient)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 2.2 }}
      />

      {/* Animated line drawing */}
      <motion.path
        d={CHART_LINE}
        stroke="#6366f1"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ pathLength: { duration: 2, ease: "easeInOut" }, opacity: { duration: 0.3 } }}
      />

      {/* End-of-line dot – appears after line finishes */}
      <motion.circle
        cx="400"
        cy="10"
        r="4"
        fill="#6366f1"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 2.1 }}
      />
      <motion.circle
        cx="400"
        cy="10"
        r="6"
        fill="#6366f1"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 0.3, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 2.1 }}
      />
    </svg>
  );
}

/* -------------------------------------------------- */
/*  Main dashboard mockup                             */
/* -------------------------------------------------- */

const callLogs = [
  { number: "+1 (555) 234-8901", status: "Connected", duration: "4:32", time: "2m ago" },
  { number: "+1 (555) 876-5432", status: "Connected", duration: "2:18", time: "5m ago" },
  { number: "+1 (555) 019-7654", status: "Connected", duration: "6:45", time: "8m ago" },
];

export default function DashboardMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative"
    >
      <div className="glass-panel overflow-hidden relative">
        {/* ---- Shimmer scan line ---- */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[1.5rem] z-10">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)",
              backgroundSize: "200% 100%",
              animation: "shimmer 4s ease-in-out infinite",
            }}
          />
        </div>

        {/* ---- Faux browser chrome ---- */}
        <div className="flex items-center gap-3 border-b border-glass-border px-4 py-3">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-400 opacity-60" />
            <div className="h-3 w-3 rounded-full bg-yellow-400 opacity-60" />
            <div className="h-3 w-3 rounded-full bg-green-400 opacity-60" />
          </div>
          <div className="glass-pill mx-auto flex-1 max-w-xs px-4 py-1 text-center">
            <span className="text-xs text-muted flex items-center justify-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              dashboard.velocalls.com
            </span>
          </div>
          <div className="w-[52px]" />
        </div>

        {/* ---- Dashboard content ---- */}
        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          {/* Metric cards row */}
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            <MetricCard
              label="Calls Today"
              delay={0.4}
              indicator={
                <svg
                  className="h-4 w-4 text-success"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 12V4M8 4L4 8M8 4L12 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            >
              <AnimatedMetric value={2847} />
            </MetricCard>

            <MetricCard
              label="Connect Rate"
              delay={0.55}
              indicator={
                <div className="h-2.5 w-2.5 rounded-full bg-blue-400" />
              }
            >
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                94.2%
              </motion.span>
            </MetricCard>

            <MetricCard
              label="Revenue"
              delay={0.7}
              indicator={
                <div className="flex items-end gap-0.5">
                  <div className="h-2 w-1 rounded-sm bg-purple-400 opacity-40" />
                  <div className="h-3 w-1 rounded-sm bg-purple-400 opacity-60" />
                  <div className="h-4 w-1 rounded-sm bg-purple-400 opacity-80" />
                  <div className="h-3.5 w-1 rounded-sm bg-purple-400" />
                  <div className="h-5 w-1 rounded-sm bg-purple-400" />
                </div>
              }
            >
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                $12.4K
              </motion.span>
            </MetricCard>
          </div>

          {/* Chart area */}
          <motion.div
            className="glass-card p-4 md:p-6"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-medium text-muted uppercase tracking-wider">
                Call Volume
              </span>
              <span className="text-xs text-muted">Last 7 days</span>
            </div>
            <AnimatedChart />
          </motion.div>

          {/* Call log rows */}
          <div className="space-y-2">
            <motion.div
              className="mb-2 flex items-center justify-between"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 1.3 }}
            >
              <span className="text-xs font-medium text-muted uppercase tracking-wider">
                Recent Calls
              </span>
            </motion.div>
            {callLogs.map((log, i) => (
              <CallLogRow
                key={log.number}
                number={log.number}
                status={log.status}
                duration={log.duration}
                time={log.time}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
