import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPostBySlug, getAllSlugs, getRelatedPosts } from "@/lib/blog";
import { useMDXComponents } from "@/components/blog/mdx-components";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { ShareButtons } from "@/components/blog/share-buttons";
import { PostCard } from "@/components/blog/post-card";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found | VeloCalls" };

  return {
    title: `${post.title} | VeloCalls Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 3);
  const components = useMDXComponents();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "VeloCalls",
      url: "https://velocalls.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="page-hero py-20 sm:py-28">
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <span className="inline-block rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-3 py-1 text-xs font-semibold text-white">
              {post.category}
            </span>
            <span className="text-xs text-white/60">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="text-xs text-white/60">{post.readTime}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl leading-tight">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            {post.excerpt}
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="text-sm">
              <p className="font-medium text-white">{post.author.name}</p>
              <p className="text-white/50">{post.author.role}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <TableOfContents content={post.content} />

          <article className="prose-blog">
            <MDXRemote
              source={post.content}
              components={components}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: "wrap" }],
                  ],
                },
              }}
            />
          </article>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-12 flex flex-wrap items-center gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/5 px-3 py-1 text-xs text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Share + CTA */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
            <ShareButtons title={post.title} slug={post.slug} />
          </div>

          {/* CTA */}
          <div className="mt-12 glass-card p-8 sm:p-10 text-center">
            <h3 className="text-xl font-bold text-foreground mb-3">
              Ready to try VeloCalls?
            </h3>
            <p className="text-muted mb-6 max-w-md mx-auto">
              Set up intelligent call tracking and routing in minutes. No credit
              card required.
            </p>
            <a href="https://dashboard.velocalls.com" className="btn-primary">
              Get Started Free
            </a>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="pb-16 sm:pb-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              Related Articles
            </h2>
            <div className="space-y-8">
              {related.map((rp) => (
                <PostCard key={rp.slug} post={rp} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
