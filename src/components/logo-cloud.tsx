"use client";

import { motion } from "framer-motion";

const companies = [
  "PeakLeads",
  "CallScale",
  "NexGen Media",
  "TeleConnect",
  "DataRing",
  "MediaForce",
];

export default function LogoCloud() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="glass rounded-2xl max-w-5xl mx-auto px-8 py-6">
        <p className="text-center text-sm font-medium uppercase tracking-wider text-muted mb-6">
          Trusted by 500+ businesses
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:flex-nowrap md:justify-between">
          {companies.map((name) => (
            <span
              key={name}
              className="text-lg font-semibold text-muted/40 hover:text-muted/80 transition-all duration-300 cursor-default select-none whitespace-nowrap"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
