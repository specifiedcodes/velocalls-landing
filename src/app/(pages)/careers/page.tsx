import type { Metadata } from "next";
import { MapPin, Briefcase, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers | VeloCalls",
  description:
    "Join the VeloCalls team and help us build the future of intelligent call tracking and routing.",
};

const openPositions = [
  {
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "Remote (US)",
    type: "Full-time",
    description:
      "Build and scale our core call tracking platform using TypeScript, React, NestJS, and PostgreSQL. You will work on real-time systems processing millions of calls.",
  },
  {
    title: "AI/ML Engineer",
    department: "AI Team",
    location: "Remote (US)",
    type: "Full-time",
    description:
      "Develop and improve our AI transcription pipeline, sentiment analysis models, and conversation intelligence features. Experience with speech-to-text and NLP required.",
  },
  {
    title: "Product Designer",
    department: "Product",
    location: "Remote (US)",
    type: "Full-time",
    description:
      "Design intuitive interfaces for complex telephony workflows, including our visual IVR builder, real-time analytics dashboards, and publisher/buyer portals.",
  },
  {
    title: "Account Executive - Mid Market",
    department: "Sales",
    location: "New York, NY / Remote",
    type: "Full-time",
    description:
      "Drive new business by selling VeloCalls to mid-market performance marketing agencies and contact centers. 3+ years of SaaS sales experience required.",
  },
];

const perks = [
  "Competitive salary + equity",
  "100% remote-friendly",
  "Unlimited PTO",
  "Health, dental, and vision insurance",
  "$2,000 annual learning budget",
  "Latest equipment of your choice",
  "Quarterly team offsites",
  "401(k) with company match",
];

export default function CareersPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="page-hero py-20 sm:py-28">
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
            Careers at VeloCalls
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            Help us build the future of intelligent call tracking. Join a fast-growing team that
            values innovation, ownership, and impact.
          </p>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="glass-card p-8 sm:p-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Why VeloCalls?
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              We are a team of builders who love solving hard problems. Our platform processes
              millions of calls, makes real-time routing decisions in under 200ms, and uses AI to
              extract insights from every conversation. If you want to work on challenging technical
              problems with a talented, supportive team, you belong here.
            </p>
            <p className="text-muted leading-relaxed mb-6">
              We believe great work happens when people have autonomy, clear goals, and the right
              tools. Our culture is built on trust, transparency, and a genuine passion for building
              products that our customers love.
            </p>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Perks &amp; Benefits
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {perks.map((perk) => (
                <div key={perk} className="flex items-center gap-2 text-sm text-muted">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  {perk}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-foreground text-center mb-4">
            Open <span className="gradient-text">Positions</span>
          </h2>
          <p className="text-center text-muted mb-12 max-w-xl mx-auto">
            Don&apos;t see a role that fits? Send us your resume at{" "}
            <a href="mailto:careers@velocalls.com" className="text-primary hover:text-primary-light transition-colors">
              careers@velocalls.com
            </a>
            .
          </p>
          <div className="space-y-6">
            {openPositions.map((position) => (
              <div key={position.title} className="glass-card p-8 group">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="inline-flex items-center gap-1 text-xs text-muted">
                        <Briefcase className="h-3 w-3" />
                        {position.department}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-muted">
                        <MapPin className="h-3 w-3" />
                        {position.location}
                      </span>
                      <span className="rounded-full px-2.5 py-0.5 text-xs font-medium text-primary" style={{ background: 'var(--surface)' }}>
                        {position.type}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted">
                      {position.description}
                    </p>
                  </div>
                  <a
                    href={`mailto:careers@velocalls.com?subject=Application: ${position.title}`}
                    className="btn-primary !py-2.5 !px-5 !text-sm whitespace-nowrap self-start"
                  >
                    Apply Now
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="glass-card p-8 sm:p-12">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Not Ready to Apply?
            </h2>
            <p className="text-muted mb-6 max-w-md mx-auto">
              Follow us on LinkedIn to stay updated on new positions, company news, and industry insights.
            </p>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Follow on LinkedIn
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
