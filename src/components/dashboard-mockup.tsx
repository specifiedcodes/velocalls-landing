"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  LayoutDashboard,
  Megaphone,
  Phone,
  Settings,
  Radio,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CheckCircle,
  Percent,
  Headphones,
  type LucideIcon,
} from "lucide-react";

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
      const eased = 1 - Math.pow(1 - progress, 3);
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
/*  Stat card matching real dashboard pattern          */
/* -------------------------------------------------- */

function StatCard({
  icon: Icon,
  label,
  children,
  trend,
  delay,
}: {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
  trend?: { value: number; direction: "up" | "down" };
  delay: number;
}) {
  return (
    <motion.div
      className="glass-card rounded-lg p-2.5 md:p-3 flex flex-col gap-1"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] md:text-xs text-muted font-medium">
          {label}
        </span>
        <Icon className="h-3 w-3 md:h-3.5 md:w-3.5 text-muted opacity-60" />
      </div>
      <span className="text-sm font-bold text-foreground md:text-base">
        {children}
      </span>
      {trend && (
        <span
          className={`flex items-center gap-0.5 text-[9px] md:text-[10px] ${
            trend.direction === "up" ? "text-emerald-500" : "text-red-500"
          }`}
        >
          {trend.direction === "up" ? (
            <TrendingUp className="h-2.5 w-2.5" />
          ) : (
            <TrendingDown className="h-2.5 w-2.5" />
          )}
          {trend.direction === "up" ? "+" : "-"}
          {trend.value}% vs yesterday
        </span>
      )}
    </motion.div>
  );
}

/* -------------------------------------------------- */
/*  CSS Bar chart (matches real dashboard)            */
/* -------------------------------------------------- */

const barData = [32, 45, 28, 62, 51, 73, 68, 55, 82, 76, 90, 65];

function BarChart() {
  const max = Math.max(...barData);
  return (
    <motion.div
      className="glass-card p-3 md:p-4"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <div className="mb-2.5 flex items-center justify-between">
        <span className="text-[10px] md:text-xs font-medium text-muted uppercase tracking-wider">
          Call Volume
        </span>
        <span className="text-[10px] md:text-xs text-muted">Last 7 days</span>
      </div>
      <div className="flex items-end gap-1 h-16 md:h-24">
        {barData.map((val, i) => (
          <motion.div
            key={i}
            className="flex-1 flex flex-col items-center justify-end h-full"
          >
            <motion.div
              className="w-full rounded-t bg-primary/70 hover:bg-primary transition-colors min-h-[2px]"
              initial={{ height: 0 }}
              whileInView={{ height: `${(val / max) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.0 + i * 0.05 }}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------- */
/*  Mini leaderboard table (Top Campaigns)            */
/* -------------------------------------------------- */

const campaigns = [
  { name: "Solar Leads", calls: 342, revenue: "$4,280", rate: "18.2%" },
  { name: "Insurance Quotes", calls: 218, revenue: "$2,890", rate: "15.6%" },
  { name: "Home Services", calls: 187, revenue: "$2,150", rate: "12.8%" },
];

function LeaderboardTable() {
  return (
    <motion.div
      className="glass-card p-3 md:p-4"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 1.2 }}
    >
      <span className="text-[10px] md:text-xs font-medium text-muted uppercase tracking-wider">
        Top Campaigns
      </span>
      <div className="mt-2 space-y-1.5">
        {/* Header */}
        <div className="flex items-center gap-2 text-[9px] md:text-[10px] text-muted uppercase tracking-wider pb-1 border-b border-glass-border">
          <span className="flex-1">Campaign</span>
          <span className="w-12 text-right hidden sm:block">Calls</span>
          <span className="w-14 text-right">Revenue</span>
          <span className="w-12 text-right hidden md:block">Conv%</span>
        </div>
        {campaigns.map((c, i) => (
          <motion.div
            key={c.name}
            className="flex items-center gap-2 text-[10px] md:text-xs py-1"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 1.4 + i * 0.15 }}
          >
            <span className="flex-1 text-foreground font-medium truncate">
              {c.name}
            </span>
            <span className="w-12 text-right text-muted hidden sm:block">
              {c.calls}
            </span>
            <span className="w-14 text-right text-foreground font-medium">
              {c.revenue}
            </span>
            <span className="w-12 text-right text-emerald-500 hidden md:block">
              {c.rate}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------- */
/*  Mini sidebar (icon-only, decorative)              */
/* -------------------------------------------------- */

const sidebarItems = [
  { icon: LayoutDashboard, active: true },
  { icon: Megaphone, active: false },
  { icon: Phone, active: false },
  { icon: Radio, active: false },
  { icon: Headphones, active: false },
  { icon: Settings, active: false },
];

function MiniSidebar() {
  return (
    <div className="hidden sm:flex flex-col items-center w-11 md:w-12 shrink-0 border-r border-glass-border py-3 gap-1">
      {/* Logo */}
      <div className="flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 mb-3">
        <Phone className="h-3.5 w-3.5 md:h-4 md:w-4 text-white" />
      </div>
      {/* Nav icons */}
      {sidebarItems.map(({ icon: Icon, active }, i) => (
        <div
          key={i}
          className={`flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-lg transition-colors ${
            active
              ? "bg-primary/10 text-primary"
              : "text-muted hover:text-foreground"
          }`}
        >
          <Icon className="h-3.5 w-3.5 md:h-4 md:w-4" />
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------- */
/*  Mini header bar with live indicators              */
/* -------------------------------------------------- */

function MiniHeader() {
  return (
    <motion.div
      className="flex items-center gap-3 md:gap-4 border-b border-glass-border px-3 py-2"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <div className="flex items-center gap-1.5">
        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] md:text-xs text-emerald-500 font-medium">
          12 Live
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <Phone className="h-2.5 w-2.5 text-primary" />
        <span className="text-[10px] md:text-xs text-muted">847 Today</span>
      </div>
      <div className="flex items-center gap-1.5 hidden sm:flex">
        <Headphones className="h-2.5 w-2.5 text-primary" />
        <span className="text-[10px] md:text-xs text-muted">6 Agents</span>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <div className="glass rounded-full px-2 py-0.5 text-[10px] text-emerald-500 font-medium hidden md:block">
          $1,240.50
        </div>
        <div className="h-5 w-5 md:h-6 md:w-6 rounded-full bg-gradient-to-br from-indigo-400 to-violet-400 flex items-center justify-center">
          <span className="text-[8px] md:text-[9px] text-white font-bold">
            RP
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------- */
/*  Main dashboard mockup                             */
/* -------------------------------------------------- */

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
        {/* Shimmer scan line */}
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

        {/* Faux browser chrome */}
        <div className="flex items-center gap-3 border-b border-glass-border px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400 opacity-60" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-400 opacity-60" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-400 opacity-60" />
          </div>
          <div className="glass-pill mx-auto flex-1 max-w-xs px-4 py-1 text-center">
            <span className="text-[10px] md:text-xs text-muted flex items-center justify-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              dashboard.velocalls.com
            </span>
          </div>
          <div className="w-[42px]" />
        </div>

        {/* Dashboard layout: sidebar + main */}
        <div className="flex">
          <MiniSidebar />

          {/* Main content area */}
          <div className="flex-1 min-w-0">
            <MiniHeader />

            <div className="p-3 md:p-4 space-y-3 md:space-y-4">
              {/* 4 KPI stat cards matching real dashboard */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                <StatCard
                  icon={Phone}
                  label="Calls Today"
                  delay={0.4}
                  trend={{ value: 12.3, direction: "up" }}
                >
                  <AnimatedMetric value={2847} />
                </StatCard>

                <StatCard
                  icon={DollarSign}
                  label="Revenue Today"
                  delay={0.5}
                  trend={{ value: 8.7, direction: "up" }}
                >
                  <AnimatedMetric value={12} prefix="$" suffix=".4K" />
                </StatCard>

                <StatCard
                  icon={CheckCircle}
                  label="Conversions"
                  delay={0.6}
                  trend={{ value: 5.2, direction: "up" }}
                >
                  <AnimatedMetric value={428} />
                </StatCard>

                <StatCard
                  icon={Percent}
                  label="Conv. Rate"
                  delay={0.7}
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                  >
                    15.0%
                  </motion.span>
                </StatCard>
              </div>

              {/* Bar chart */}
              <BarChart />

              {/* Top campaigns table */}
              <LeaderboardTable />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
