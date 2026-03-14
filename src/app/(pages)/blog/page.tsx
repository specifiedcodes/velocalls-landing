import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllPosts, getAllCategories } from "@/lib/blog";
import { BlogListClient } from "@/components/blog/blog-list-client";
import { NewsletterForm } from "@/components/blog/newsletter-form";

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
  twitter: {
    card: "summary_large_image",
    title: "Blog | VeloCalls",
    description:
      "Insights, guides, and industry news on call tracking, routing, and contact center technology.",
  },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category, q } = await searchParams;
  const allPosts = getAllPosts();
  const categories = getAllCategories();

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

      {/* Search + Category Filter + Post List (Client) */}
      <Suspense fallback={null}>
        <BlogListClient
          posts={allPosts}
          categories={categories}
          initialCategory={category}
          initialQuery={q}
        />
      </Suspense>

      {/* Newsletter CTA */}
      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="glass-card p-8 sm:p-12 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Stay in the Loop
            </h2>
            <p className="text-muted mb-6 max-w-md mx-auto">
              Get the latest articles, guides, and industry insights delivered
              to your inbox every week.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
}
