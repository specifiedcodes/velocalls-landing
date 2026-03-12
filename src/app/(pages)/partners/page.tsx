import type { Metadata } from "next";
import { ArrowRight, Handshake, TrendingUp, Headphones, Gift } from "lucide-react";

export const metadata: Metadata = {
  title: "Partners | VeloCalls",
  description:
    "Join the VeloCalls Partner Program. Earn commissions, access exclusive resources, and grow your business with us.",
};

const benefits = [
  {
    icon: TrendingUp,
    title: "Generous Revenue Share",
    description:
      "Earn up to 25% recurring commission on every customer you refer. Our competitive payout structure rewards your success as your referrals grow.",
  },
  {
    icon: Headphones,
    title: "Dedicated Partner Support",
    description:
      "Get a dedicated partner manager, priority technical support, and direct access to our engineering team for custom integration needs.",
  },
  {
    icon: Gift,
    title: "Co-Marketing Opportunities",
    description:
      "Joint webinars, case studies, blog features, and co-branded content. We invest in promoting our partners alongside VeloCalls.",
  },
  {
    icon: Handshake,
    title: "Exclusive Resources",
    description:
      "Access partner-only training, sales enablement materials, demo environments, and early access to new features before public release.",
  },
];

const partnerTypes = [
  {
    title: "Referral Partners",
    description:
      "Performance marketing agencies, consultants, and industry experts who recommend VeloCalls to their clients. Earn commissions on every successful referral with no minimum commitments.",
  },
  {
    title: "Technology Partners",
    description:
      "CRM providers, analytics platforms, ad networks, and other technology companies that integrate with VeloCalls. Build deeper product integrations and access our partner API.",
  },
  {
    title: "Reseller Partners",
    description:
      "Agencies and platforms that white-label or resell VeloCalls as part of their offering. Get volume pricing, custom branding options, and dedicated account management.",
  },
];

export default function PartnersPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="page-hero py-20 sm:py-28">
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
            Partner with VeloCalls
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            Join our partner ecosystem and grow your business alongside the leading call tracking platform.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Partner <span className="gradient-text">Benefits</span>
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="glass-card p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Partnership <span className="gradient-text">Types</span>
          </h2>
          <div className="space-y-6">
            {partnerTypes.map((type) => (
              <div key={type.title} className="glass-card p-8">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {type.title}
                </h3>
                <p className="text-muted leading-relaxed">
                  {type.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Partners Placeholder */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Trusted by Leading Companies
          </h2>
          <p className="text-muted mb-12 max-w-xl mx-auto">
            Our partners include performance marketing agencies, technology platforms, and contact centers
            across North America and Europe.
          </p>
          <div className="glass-card p-12">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center justify-items-center">
              {["Partner A", "Partner B", "Partner C", "Partner D"].map((name) => (
                <div
                  key={name}
                  className="flex h-16 w-32 items-center justify-center rounded-lg text-sm font-medium text-muted"
                  style={{ background: 'var(--surface)' }}
                >
                  {name}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted mt-8">
              Partner logos will be displayed here. Interested in being featured? Join our program.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="glass-card p-8 sm:p-12">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Ready to Partner?
            </h2>
            <p className="text-muted mb-6 max-w-md mx-auto">
              Fill out our partner application and our team will get back to you within 48 hours.
            </p>
            <a
              href="mailto:partners@velocalls.com?subject=Partner Program Application"
              className="btn-primary"
            >
              Apply to Partner Program
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
