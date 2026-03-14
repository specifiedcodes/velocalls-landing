import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User } from "lucide-react";
import {
  getAuthorBySlug,
  getAllAuthorSlugs,
  getPostsByAuthor,
  getInitials,
} from "@/lib/blog";
import { PostCard } from "@/components/blog/post-card";

export async function generateStaticParams() {
  return getAllAuthorSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) return { title: "Author Not Found | VeloCalls" };

  const description =
    author.bio.length > 155
      ? `${author.bio.slice(0, 155)}...`
      : author.bio;

  return {
    title: `${author.name} - ${author.role} | VeloCalls Blog`,
    description,
    alternates: {
      canonical: `https://velocalls.com/blog/author/${slug}`,
    },
    openGraph: {
      title: `${author.name} | VeloCalls Blog`,
      description,
      type: "profile",
    },
    twitter: {
      card: "summary",
      title: `${author.name} | VeloCalls Blog`,
      description,
    },
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) notFound();

  const posts = getPostsByAuthor(slug);
  const initials = getInitials(author.name);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    worksFor: {
      "@type": "Organization",
      name: "VeloCalls",
      url: "https://velocalls.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
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

          {/* Avatar */}
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-3xl font-bold text-white">
            {initials || <User className="h-10 w-10" />}
          </div>

          <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            {author.name}
          </h1>
          <p className="mt-2 text-lg font-medium text-white/70">
            {author.role}
          </p>
          <p className="mt-6 text-base text-white/60 max-w-2xl mx-auto leading-relaxed">
            {author.bio}
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            {posts.length > 0
              ? `Articles by ${author.name} (${posts.length})`
              : `No articles by ${author.name} yet`}
          </h2>

          {posts.length > 0 ? (
            <div className="space-y-8">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="glass-card p-8 text-center">
              <p className="text-muted">
                This author hasn&apos;t published any articles yet. Check back
                soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
