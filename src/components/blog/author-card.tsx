import Link from "next/link";
import { User } from "lucide-react";
import type { Author } from "@/lib/blog";
import { getInitials } from "@/lib/blog";

export function AuthorCard({
  author,
  linked = true,
}: {
  author: Author;
  linked?: boolean;
}) {
  const initials = getInitials(author.name);

  const content = (
    <div className="flex items-center gap-3 group/author">
      {/* Avatar */}
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-sm font-bold text-white">
        {initials || <User className="h-5 w-5" />}
      </div>
      {/* Info */}
      <div className="text-sm">
        <p className="font-medium text-white group-hover/author:text-primary transition-colors">
          {author.name}
        </p>
        <p className="text-white/50">{author.role}</p>
      </div>
    </div>
  );

  if (!linked) return content;

  return (
    <Link
      href={`/blog/author/${author.slug}`}
      className="inline-block"
      aria-label={`View profile of ${author.name}`}
    >
      {content}
    </Link>
  );
}
