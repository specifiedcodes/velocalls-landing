import type { Metadata } from "next";
import { getAllPosts, getAllCategories } from "@/lib/blog";
import { PostCard } from "@/components/blog/post-card";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | VeloCalls",
  description:
    "Insights, guides, and industry news on call tracking, routing, pay-per-call, and contact center technology from the VeloCalls team.",
  openGraph: {
    title: "Blog | VeloCalls",
    description:
      "Insights, guides, and industry news on call tracking, routing, and contact center technology.",
    type: "website",
  },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const allPosts = getAllPosts();
  const categories = getAllCategories();

  const posts = category
    ? allPosts.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      )
    : allPosts;

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

      {/* Category Filter */}
      {categories.length > 1 && (
        <section className="pt-10">
          <div className="mx-auto max-w-4xl px-6">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/blog"
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  !category
                    ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white"
                    : "bg-white/5 text-muted hover:text-foreground"
                }`}
              >
                All
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/blog?category=${encodeURIComponent(cat.toLowerCase())}`}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    category?.toLowerCase() === cat.toLowerCase()
                      ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white"
                      : "bg-white/5 text-muted hover:text-foreground"
                  }`}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted text-lg">No posts found.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}

          {/* Newsletter CTA */}
          <div className="mt-16 glass-card p-8 sm:p-12 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Stay in the Loop
            </h2>
            <p className="text-muted mb-6 max-w-md mx-auto">
              Get the latest articles, guides, and industry insights delivered
              to your inbox every week.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--glass-card-border)",
                }}
              />
              <button
                type="button"
                className="btn-primary !px-6 whitespace-nowrap"
              >
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
