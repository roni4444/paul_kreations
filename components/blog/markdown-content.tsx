// components/blog/markdown-content.tsx
// Renders a post's Markdown. Used by both the public post page (server)
// and the admin editor preview (client), so it has no "use client" and no
// hooks — it works in either.
//
// react-markdown does NOT render raw HTML by default and strips unsafe URL
// schemes (javascript: etc.), so staff-authored Markdown can't inject
// script into the page. Images are intentionally not rendered in v1.
//
// remark-gfm adds tables, strikethrough, task lists and bare-URL links.
//
// Styling is mapped per element here rather than via a typography plugin,
// to avoid adding another dependency (PROJECT_RULES.md §7).

import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

const components: Components = {
  h1: ({ children }) => (
    <h2 className="mt-10 mb-3 text-2xl font-semibold text-[#111c2d]">
      {children}
    </h2>
  ),
  h2: ({ children }) => (
    <h2 className="mt-10 mb-3 text-2xl font-semibold text-[#111c2d]">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 mb-2 text-xl font-semibold text-[#111c2d]">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="mt-6 mb-2 text-base font-semibold text-[#111c2d]">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="my-4 text-base leading-7 text-[#2b3445]">{children}</p>
  ),
  a: ({ href, children }) => {
    const external = typeof href === "string" && /^https?:\/\//i.test(href);
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="text-[#c41e3a] underline underline-offset-2 hover:text-[#9e0027]"
      >
        {children}
      </a>
    );
  },
  ul: ({ children }) => (
    <ul className="my-4 list-disc space-y-1.5 pl-6 text-[#2b3445]">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 list-decimal space-y-1.5 pl-6 text-[#2b3445]">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-7">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-2 border-[#c41e3a] pl-4 text-[#5f5e5e] italic">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-8 border-[#e3bebd]" />,
  pre: ({ children }) => (
    <pre className="my-5 overflow-x-auto rounded-[4px] bg-[#111c2d] p-4 font-mono text-sm leading-6 text-[#f9f9ff]">
      {children}
    </pre>
  ),
  code: ({ className, children }) => (
    <code
      className={
        className
          ? `${className} font-mono`
          : "rounded-[4px] bg-[#ffdad9] px-1.5 py-0.5 font-mono text-[0.9em] text-[#9e0027]"
      }
    >
      {children}
    </code>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-[#111c2d]">{children}</strong>
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm text-[#2b3445]">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-[#fff5f5]">{children}</thead>,
  th: ({ children }) => (
    <th className="border border-[#e3bebd] px-3 py-2 font-semibold text-[#111c2d]">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-[#e3bebd] px-3 py-2 align-top">{children}</td>
  ),
  img: () => null,
};

export function MarkdownContent({ source }: { source: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {source}
    </ReactMarkdown>
  );
}
