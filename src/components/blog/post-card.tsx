import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

export function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className="glass-card p-8 sm:p-10 group">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="inline-block rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-3 py-1 text-xs font-semibold text-white">
          {post.category}
        </span>
        <span className="text-xs text-muted">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        <span className="text-xs text-muted">{post.readTime}</span>
      </div>
      <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors sm:text-2xl">
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h2>
      <p className="text-muted leading-relaxed mb-4">{post.excerpt}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted">{post.author.name}</span>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-light transition-colors"
        >
          Read More
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
