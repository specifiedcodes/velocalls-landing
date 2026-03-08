"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What is call tracking?",
    answer:
      "Call tracking is a technology that attributes inbound phone calls to specific marketing channels, campaigns, and keywords. VeloCalls assigns unique phone numbers to your campaigns so you can see exactly which ads, pages, or sources are driving calls \u2014 giving you full visibility into your ROI.",
  },
  {
    question: "How does real-time bidding work?",
    answer:
      "When a call comes in, VeloCalls runs an instant auction among eligible buyers based on your routing rules. Buyers submit bids, and the highest qualifying bid wins the call. The entire process happens in under 200ms, ensuring zero delay for callers while maximizing your revenue per call.",
  },
  {
    question: "Can I use my own phone numbers?",
    answer:
      "Yes. You can port existing phone numbers into VeloCalls or use numbers from our inventory. We support local, toll-free, and vanity numbers across all US area codes with multi-carrier support for maximum reliability.",
  },
  {
    question: "What carriers do you support?",
    answer:
      "VeloCalls integrates with major carriers including Twilio, Telnyx, Bandwidth, and SignalWire. You can connect multiple carriers simultaneously for automatic failover, cost optimization, and geographic routing preferences.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Absolutely. Our Starter plan is completely free and includes 100 calls per month, 1 campaign, basic IVR, and 5 phone numbers. No credit card required. When you are ready to scale, upgrade to Professional or Enterprise at any time.",
  },
  {
    question: "How does AI transcription work?",
    answer:
      "Every call is automatically transcribed using state-of-the-art speech recognition. Our AI then analyzes the transcript for sentiment, key topics, and conversation quality. You get summaries, keyword extraction, and quality scorecards \u2014 all without manual review.",
  },
  {
    question: "Do you support compliance?",
    answer:
      "Yes, compliance is built into every layer. VeloCalls includes Federal DNC list scrubbing, TCPA calling hour enforcement, consent verification tracking, state-specific litigator lists, and complete audit trails. Stay compliant without additional tools.",
  },
  {
    question: "Can I integrate with my existing tools?",
    answer:
      "VeloCalls offers a comprehensive REST API, webhooks for real-time events, and native integrations with popular CRMs, analytics platforms, and ad networks including Google Ads, Facebook Ads, HubSpot, Salesforce, and more. Our API documentation includes code examples in all major languages.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="glass-card overflow-hidden">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors"
        style={{ background: 'transparent' }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--faq-hover-bg)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        aria-expanded={isOpen}
      >
        <span className="text-sm font-semibold text-foreground pr-4">
          {question}
        </span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-muted shrink-0 transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, scale: 0.97 }}
            animate={{ height: "auto", opacity: 1, scale: 1 }}
            exit={{ height: 0, opacity: 0, scale: 0.97 }}
            transition={{
              height: { type: "spring", stiffness: 500, damping: 40 },
              opacity: { duration: 0.25 },
              scale: { duration: 0.2 },
            }}
          >
            <div className="px-6 pb-5 text-sm leading-relaxed text-muted pt-4" style={{ borderTop: '1px solid var(--divider)' }}>
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding relative overflow-hidden">
      {/* Dot grid overlay */}
      <div className="absolute inset-0 bg-dot-grid opacity-15 pointer-events-none" />

      {/* Ambient blob */}
      <div
        className="ambient-blob animate-blob-drift w-[400px] h-[400px] bottom-0 -left-32"
        style={{ background: "var(--blob-primary)", animationDelay: "-6s" }}
      />

      <div className="mx-auto max-w-4xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold uppercase tracking-widest text-primary mb-4">
            FAQ
          </span>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            Frequently Asked{" "}
            <span className="gradient-text">Questions</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Everything you need to know about VeloCalls.
          </p>
          {/* Gradient accent line */}
          <div className="h-px w-24 mx-auto mt-8 bg-gradient-to-r from-transparent via-primary to-transparent" />
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-3"
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
