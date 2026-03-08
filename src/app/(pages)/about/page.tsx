import type { Metadata } from "next";
import { Target, Zap, Users, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | VeloCalls",
  description:
    "Learn about VeloCalls, our mission to transform the call tracking industry, and the team behind the platform.",
};

const values = [
  {
    icon: Target,
    title: "Customer Obsession",
    description:
      "Every feature we build starts with a customer problem. We listen, understand, and deliver solutions that make a real difference in our customers' businesses.",
  },
  {
    icon: Zap,
    title: "Relentless Innovation",
    description:
      "We push the boundaries of what call tracking can do. From AI-powered transcription to real-time bidding, we bring enterprise capabilities to businesses of every size.",
  },
  {
    icon: Users,
    title: "Transparency",
    description:
      "We believe in honest pricing, clear communication, and open relationships. No hidden fees, no surprises, and no black-box algorithms.",
  },
  {
    icon: Heart,
    title: "Quality First",
    description:
      "We never cut corners. Every call is routed with sub-200ms latency, every recording is crystal clear, and every feature is thoroughly tested before release.",
  },
];

const team = [
  {
    name: "Alex Morgan",
    role: "CEO & Co-Founder",
    bio: "Former VP of Engineering at a leading call analytics company. 15+ years in telecommunications and SaaS.",
    initials: "AM",
  },
  {
    name: "Priya Sharma",
    role: "CTO & Co-Founder",
    bio: "Previously built real-time systems at AWS. Expert in distributed systems, telephony, and AI/ML infrastructure.",
    initials: "PS",
  },
  {
    name: "Marcus Johnson",
    role: "VP of Product",
    bio: "10+ years building performance marketing tools. Passionate about creating intuitive products for complex workflows.",
    initials: "MJ",
  },
  {
    name: "Sarah Kim",
    role: "VP of Engineering",
    bio: "Full-stack engineering leader with deep expertise in voice/telephony systems and scalable cloud architecture.",
    initials: "SK",
  },
  {
    name: "David Chen",
    role: "Head of AI",
    bio: "PhD in Natural Language Processing. Previously led speech recognition research at a major tech company.",
    initials: "DC",
  },
  {
    name: "Rachel Torres",
    role: "VP of Customer Success",
    bio: "Dedicated to ensuring every customer achieves their goals. Background in performance marketing and account management.",
    initials: "RT",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="page-hero py-20 sm:py-28">
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
            About VeloCalls
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            We are on a mission to make intelligent call tracking accessible to every business.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="glass-card p-8 sm:p-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Our Mission
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              VeloCalls was founded with a simple belief: every business deserves access to the same
              powerful call tracking and routing technology that was previously only available to
              large enterprises with massive budgets and dedicated engineering teams.
            </p>
            <p className="text-muted leading-relaxed mb-6">
              The call tracking industry has been dominated by complex, expensive platforms that
              require weeks of setup and ongoing technical support. We set out to change that by
              building a platform that combines enterprise-grade features with consumer-grade
              simplicity.
            </p>
            <p className="text-muted leading-relaxed">
              Today, VeloCalls powers over 50 million calls for 500+ businesses worldwide. Our
              platform handles everything from intelligent routing and real-time bidding to
              AI-powered conversation intelligence, all with an intuitive interface that anyone
              can learn in minutes.
            </p>
          </div>
        </div>
      </section>

      {/* Founding Story */}
      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-3xl px-6">
          <div className="glass-card p-8 sm:p-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Our Story
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              VeloCalls was born in 2023 when our founders, Alex and Priya, were working at a
              performance marketing agency and experienced firsthand the frustrations of existing
              call tracking platforms. Long setup times, unreliable routing, opaque pricing, and
              lack of modern features like AI transcription were holding their business back.
            </p>
            <p className="text-muted leading-relaxed mb-6">
              They decided to build the platform they wished existed: one that combined the power
              of enterprise telephony with the elegance of modern SaaS. Within six months, they had
              a working prototype. Within a year, they had their first 100 customers.
            </p>
            <p className="text-muted leading-relaxed">
              Today, VeloCalls is a growing team of engineers, product managers, and customer
              success specialists based across the United States. We are backed by leading venture
              capital firms and are committed to building the future of call intelligence.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Our <span className="gradient-text">Values</span>
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {values.map((value) => (
              <div key={value.title} className="glass-card p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500">
                  <value.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-foreground text-center mb-4">
            Meet the <span className="gradient-text">Team</span>
          </h2>
          <p className="text-center text-muted mb-12 max-w-xl mx-auto">
            A passionate team of engineers, product builders, and customer advocates working
            to revolutionize call tracking.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <div key={member.name} className="glass-card p-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-xl font-bold text-white">
                  {member.initials}
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="text-sm text-primary font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-sm leading-relaxed text-muted">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
