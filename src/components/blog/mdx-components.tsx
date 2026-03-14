import type { MDXComponents } from "mdx/types";

function Callout({
  type = "info",
  children,
}: {
  type?: "info" | "warning" | "tip";
  children: React.ReactNode;
}) {
  const styles = {
    info: "border-l-indigo-500 bg-indigo-500/5",
    warning: "border-l-amber-500 bg-amber-500/5",
    tip: "border-l-emerald-500 bg-emerald-500/5",
  };
  const icons = { info: "💡", warning: "⚠️", tip: "✅" };

  return (
    <div
      className={`my-6 rounded-r-lg border-l-4 p-4 ${styles[type]}`}
    >
      <span className="mr-2">{icons[type]}</span>
      {children}
    </div>
  );
}

function ComparisonTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="my-8 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="border border-white/10 bg-white/5 px-4 py-3 text-left font-semibold text-foreground"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="border border-white/10 px-4 py-3 text-muted"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function useMDXComponents(): MDXComponents {
  return {
    h1: (props) => (
      <h1
        className="mb-6 mt-12 text-3xl font-extrabold text-foreground sm:text-4xl"
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        className="mb-4 mt-10 text-2xl font-bold text-foreground sm:text-3xl"
        id={slugify(props.children as string)}
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="mb-3 mt-8 text-xl font-semibold text-foreground"
        id={slugify(props.children as string)}
        {...props}
      />
    ),
    p: (props) => (
      <p className="my-4 leading-relaxed text-muted" {...props} />
    ),
    a: (props) => (
      <a
        className="font-medium text-primary underline decoration-primary/30 underline-offset-2 transition-colors hover:text-primary-light hover:decoration-primary"
        target={props.href?.startsWith("http") ? "_blank" : undefined}
        rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
        {...props}
      />
    ),
    ul: (props) => (
      <ul className="my-4 list-disc space-y-2 pl-6 text-muted" {...props} />
    ),
    ol: (props) => (
      <ol className="my-4 list-decimal space-y-2 pl-6 text-muted" {...props} />
    ),
    li: (props) => <li className="leading-relaxed" {...props} />,
    blockquote: (props) => (
      <blockquote
        className="my-6 border-l-4 border-l-primary/50 pl-4 italic text-muted"
        {...props}
      />
    ),
    code: (props) => (
      <code
        className="rounded bg-white/10 px-1.5 py-0.5 text-sm font-mono text-foreground"
        {...props}
      />
    ),
    pre: (props) => (
      <pre
        className="my-6 overflow-x-auto rounded-lg border border-white/10 bg-white/5 p-4 text-sm"
        {...props}
      />
    ),
    img: (props) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className="my-8 w-full rounded-lg border border-white/10"
        alt={props.alt || ""}
        {...props}
      />
    ),
    hr: () => <hr className="my-10 border-white/10" />,
    table: (props) => (
      <div className="my-8 overflow-x-auto">
        <table className="w-full border-collapse text-sm" {...props} />
      </div>
    ),
    th: (props) => (
      <th
        className="border border-white/10 bg-white/5 px-4 py-3 text-left font-semibold text-foreground"
        {...props}
      />
    ),
    td: (props) => (
      <td className="border border-white/10 px-4 py-3 text-muted" {...props} />
    ),
    strong: (props) => (
      <strong className="font-semibold text-foreground" {...props} />
    ),
    Callout,
    ComparisonTable,
  };
}

function slugify(text: string): string {
  if (typeof text !== "string") return "";
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
