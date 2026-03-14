import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const CONTENT_DIR = path.join(process.cwd(), "src/content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tags: string[];
  author: Author;
  authorSlug: string;
  readTime: string;
  coverImage?: string;
  content: string;
}

export interface Author {
  name: string;
  role: string;
  slug: string;
  bio: string;
  avatar?: string;
}

export const AUTHORS: Record<string, Author> = {
  "velocalls-team": {
    name: "VeloCalls Team",
    slug: "velocalls-team",
    role: "Product & Engineering",
    bio: "The VeloCalls team brings together experts in call tracking, telephony, and performance marketing. We build tools that help businesses optimize their inbound call campaigns with intelligent routing, real-time analytics, and seamless carrier management.",
  },
  "alex-morgan": {
    name: "Alex Morgan",
    slug: "alex-morgan",
    role: "Head of Product",
    bio: "Alex leads product strategy at VeloCalls with over a decade of experience in SaaS and performance marketing platforms. Passionate about building intuitive tools that turn complex telephony workflows into simple, measurable outcomes for marketers and agencies.",
  },
  "jordan-lee": {
    name: "Jordan Lee",
    slug: "jordan-lee",
    role: "Engineering Lead",
    bio: "Jordan oversees the engineering team at VeloCalls, architecting scalable systems for real-time call routing, carrier integration, and analytics. With deep expertise in distributed systems and VoIP, Jordan ensures VeloCalls handles millions of calls reliably.",
  },
};

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      return getPostBySlug(slug);
    })
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);
  const authorKey = (data.author as string) || "velocalls-team";

  return {
    slug,
    title: data.title,
    excerpt: data.excerpt,
    date: data.date,
    category: data.category || "General",
    tags: data.tags || [],
    author: AUTHORS[authorKey] || AUTHORS["velocalls-team"],
    authorSlug: authorKey,
    readTime: stats.text,
    coverImage: data.coverImage,
    content,
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const cats = new Set(posts.map((p) => p.category));
  return Array.from(cats).sort();
}

export function getPostsByAuthor(authorSlug: string): BlogPost[] {
  return getAllPosts().filter((p) => p.authorSlug === authorSlug);
}

export function getAllAuthorSlugs(): string[] {
  return Object.keys(AUTHORS);
}

export function getAuthorBySlug(slug: string): Author | undefined {
  return AUTHORS[slug];
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getRelatedPosts(
  currentSlug: string,
  limit = 3
): BlogPost[] {
  const current = getPostBySlug(currentSlug);
  if (!current) return [];

  const all = getAllPosts().filter((p) => p.slug !== currentSlug);

  // Score by shared tags and same category
  const scored = all.map((post) => {
    let score = 0;
    if (post.category === current.category) score += 2;
    for (const tag of post.tags) {
      if (current.tags.includes(tag)) score += 1;
    }
    return { post, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.post);
}
