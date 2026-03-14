"use client";

import React from "react";

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function SearchHighlight({
  text,
  query,
}: {
  text: string;
  query: string;
}) {
  if (!query || !text) {
    return <>{text}</>;
  }

  const escaped = escapeRegExp(query.trim());
  if (!escaped) {
    return <>{text}</>;
  }

  const regex = new RegExp(`(${escaped})`, "gi");
  const parts = text.split(regex);
  const testRegex = new RegExp(`^${escaped}$`, "i");

  return (
    <>
      {parts.map((part, i) =>
        testRegex.test(part) ? (
          <mark
            key={i}
            className="bg-indigo-500/30 text-foreground rounded px-0.5"
          >
            {part}
          </mark>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
}
