import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | VeloCalls",
  description:
    "Insights, guides, and industry news from the VeloCalls team on call tracking, routing, and performance marketing.",
};

const posts = [
  {
    title: "The Ultimate Guide to Pay-Per-Call Marketing in 2026",
    excerpt:
      "Pay-per-call marketing continues to be one of the highest-converting channels for advertisers. Learn how to build, optimize, and scale your pay-per-call campaigns with modern tools and strategies.",
    date: "January 15, 2026",
    category: "Guide",
    readTime: "12 min read",
    slug: "#",
  },
  {
    title: "How AI Transcription Is Revolutionizing Call Quality Assurance",
    excerpt:
      "Manual call review is a thing of the past. Discover how AI-powered transcription and sentiment analysis are helping businesses monitor 100% of their calls and uncover hidden insights.",
    date: "January 8, 2026",
    category: "AI & Technology",
    readTime: "8 min read",
    slug: "#",
  },
  {
    title: "Real-Time Bidding for Calls: A Complete Technical Overview",
    excerpt:
      "Real-time bidding (RTB) for phone calls works differently than digital ad RTB. We break down the architecture, auction mechanics, and optimization strategies that power modern call marketplaces.",
    date: "December 20, 2025",
    category: "Engineering",
    readTime: "15 min read",
    slug: "#",
  },
  {
    title: "TCPA Compliance in 2026: What Call Marketers Need to Know",
    excerpt:
      "Regulations around telemarketing and call tracking are evolving rapidly. Stay ahead of compliance requirements with our comprehensive guide to TCPA, state-level regulations, and DNC list management.",
    date: "December 12, 2025",
    category: "Compliance",
    readTime: "10 min read",
    slug: "#",
  },
];

export default function BlogPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="page-hero py-20 sm:py-28">
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
            Blog
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            Insights, guides, and industry news from the VeloCalls team.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.title} className="glass-card p-8 sm:p-10 group">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="inline-block rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-3 py-1 text-xs font-semibold text-white">
                    {post.category}
                  </span>
                  <span className="text-xs text-muted">{post.date}</span>
                  <span className="text-xs text-muted">{post.readTime}</span>
                </div>
                <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors sm:text-2xl">
                  <a href={post.slug}>{post.title}</a>
                </h2>
                <p className="text-muted leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <a
                  href={post.slug}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-light transition-colors"
                >
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </a>
              </article>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="mt-16 glass-card p-8 sm:p-12 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Stay in the Loop
            </h2>
            <p className="text-muted mb-6 max-w-md mx-auto">
              Get the latest articles, guides, and industry insights delivered to your inbox every week.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
                style={{ background: 'var(--surface)', border: '1px solid var(--glass-card-border)' }}
              />
              <button type="button" className="btn-primary !px-6 whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-muted mt-3">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
