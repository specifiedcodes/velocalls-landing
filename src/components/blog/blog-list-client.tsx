"use client";

import React, { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import Fuse from "fuse.js";
import type { BlogPost } from "@/lib/blog";
import { PostCard } from "@/components/blog/post-card";
import { BlogSearchBar } from "@/components/blog/blog-search-bar";

interface BlogListClientProps {
  posts: BlogPost[];
  categories: string[];
  initialCategory?: string;
  initialQuery?: string;
}

export function BlogListClient({
  posts,
  categories,
  initialCategory,
  initialQuery,
}: BlogListClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [searchQuery, setSearchQuery] = useState(initialQuery ?? "");
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery ?? "");
  const [activeCategory, setActiveCategory] = useState<string | null>(
    initialCategory ?? null
  );

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: ["title", "excerpt", "tags"],
        threshold: 0.4,
        includeMatches: true,
        minMatchCharLength: 2,
      }),
    [posts]
  );

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Sync URL params
  useEffect(() => {
    const params = new URLSearchParams();

    if (debouncedQuery) {
      params.set("q", debouncedQuery);
    }

    if (activeCategory) {
      params.set("category", activeCategory.toLowerCase());
    }

    const paramStr = params.toString();
    const newUrl = paramStr ? `${pathname}?${paramStr}` : pathname;
    router.replace(newUrl, { scroll: false });
  }, [debouncedQuery, activeCategory, pathname, router]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    let results: BlogPost[];

    if (debouncedQuery.trim()) {
      results = fuse.search(debouncedQuery).map((r) => r.item);
    } else {
      results = posts;
    }

    if (activeCategory) {
      results = results.filter(
        (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    return results;
  }, [debouncedQuery, activeCategory, fuse, posts]);

  const handleCategoryClick = useCallback(
    (cat: string | null) => {
      setActiveCategory(cat);
    },
    []
  );

  return (
    <>
      {/* Search Bar */}
      <section className="pt-10">
        <div className="mx-auto max-w-4xl px-6">
          <BlogSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            inputRef={inputRef}
          />
        </div>
      </section>

      {/* Category Filter */}
      {categories.length > 1 && (
        <section className="pt-6">
          <div className="mx-auto max-w-4xl px-6">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleCategoryClick(null)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  !activeCategory
                    ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white"
                    : "bg-white/5 text-muted hover:text-foreground"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    activeCategory?.toLowerCase() === cat.toLowerCase()
                      ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white"
                      : "bg-white/5 text-muted hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6">
          {/* Results count */}
          <div aria-live="polite" aria-atomic="true">
          {(debouncedQuery || activeCategory) && filteredPosts.length > 0 && (
            <p className="text-sm text-muted mb-6">
              Showing {filteredPosts.length} of {posts.length} articles
            </p>
          )}

          {filteredPosts.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <p className="text-lg font-semibold text-foreground mb-2">
                No results found
              </p>
              <p className="text-muted">
                Try a different keyword or browse by category above.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredPosts.map((post) => (
                <PostCard
                  key={post.slug}
                  post={post}
                  searchQuery={debouncedQuery || undefined}
                />
              ))}
            </div>
          )}
          </div>
        </div>
      </section>
    </>
  );
}
