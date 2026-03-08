"use client";

import { motion } from "framer-motion";

function MetricCard({
  value,
  label,
  indicator,
}: {
  value: string;
  label: string;
  indicator: React.ReactNode;
}) {
  return (
    <div className="glass-card p-3 md:p-4 flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-foreground md:text-xl">
          {value}
        </span>
        {indicator}
      </div>
      <span className="text-xs text-muted">{label}</span>
    </div>
  );
}

function CallLogRow({
  number,
  status,
  duration,
  time,
}: {
  number: string;
  status: string;
  duration: string;
  time: string;
}) {
  return (
    <div className="glass flex items-center justify-between rounded-lg px-3 py-2 md:px-4 md:py-3">
      <div className="flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-success" />
        <span className="text-xs font-medium text-foreground md:text-sm">
          {number}
        </span>
      </div>
      <span className="text-xs text-muted hidden sm:inline">{status}</span>
      <span className="text-xs text-muted">{duration}</span>
      <span className="text-xs text-muted">{time}</span>
    </div>
  );
}

export default function DashboardMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="animate-float"
      style={{ perspective: "1000px", transform: "rotateX(2deg) rotateY(-2deg)" }}
    >
      <div className="glass-panel overflow-hidden">
        {/* Faux browser chrome */}
        <div className="flex items-center gap-3 border-b border-glass-border px-4 py-3">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-400 opacity-60" />
            <div className="h-3 w-3 rounded-full bg-yellow-400 opacity-60" />
            <div className="h-3 w-3 rounded-full bg-green-400 opacity-60" />
          </div>
          <div className="glass-pill mx-auto flex-1 max-w-xs px-4 py-1 text-center">
            <span className="text-xs text-muted">app.velocalls.io/dashboard</span>
          </div>
          <div className="w-[52px]" />
        </div>

        {/* Dashboard content */}
        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          {/* Metric cards row */}
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            <MetricCard
              value="2,847"
              label="Calls Today"
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
            />
            <MetricCard
              value="94.2%"
              label="Connect Rate"
              indicator={
                <div className="h-2.5 w-2.5 rounded-full bg-blue-400" />
              }
            />
            <MetricCard
              value="$12.4K"
              label="Revenue"
              indicator={
                <div className="flex items-end gap-0.5">
                  <div className="h-2 w-1 rounded-sm bg-purple-400 opacity-40" />
                  <div className="h-3 w-1 rounded-sm bg-purple-400 opacity-60" />
                  <div className="h-4 w-1 rounded-sm bg-purple-400 opacity-80" />
                  <div className="h-3.5 w-1 rounded-sm bg-purple-400" />
                  <div className="h-5 w-1 rounded-sm bg-purple-400" />
                </div>
              }
            />
          </div>

          {/* Chart area */}
          <div className="glass-card p-4 md:p-6">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-medium text-muted uppercase tracking-wider">
                Call Volume
              </span>
              <span className="text-xs text-muted">Last 7 days</span>
            </div>
            <svg
              className="h-24 w-full md:h-32"
              viewBox="0 0 400 100"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id="chart-gradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Fill area under the line */}
              <path
                d="M0 80 C30 70, 60 65, 80 55 C100 45, 130 50, 160 40 C190 30, 210 35, 240 25 C270 15, 290 20, 320 15 C350 10, 370 18, 400 10 L400 100 L0 100 Z"
                fill="url(#chart-gradient)"
              />
              {/* Line */}
              <path
                d="M0 80 C30 70, 60 65, 80 55 C100 45, 130 50, 160 40 C190 30, 210 35, 240 25 C270 15, 290 20, 320 15 C350 10, 370 18, 400 10"
                stroke="#6366f1"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Dot at end of line */}
              <circle cx="400" cy="10" r="4" fill="#6366f1" />
              <circle cx="400" cy="10" r="6" fill="#6366f1" opacity="0.3" />
            </svg>
          </div>

          {/* Call log rows */}
          <div className="space-y-2">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium text-muted uppercase tracking-wider">
                Recent Calls
              </span>
            </div>
            <CallLogRow
              number="+1 (555) 234-8901"
              status="Connected"
              duration="4:32"
              time="2m ago"
            />
            <CallLogRow
              number="+1 (555) 876-5432"
              status="Connected"
              duration="2:18"
              time="5m ago"
            />
            <CallLogRow
              number="+1 (555) 019-7654"
              status="Connected"
              duration="6:45"
              time="8m ago"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
