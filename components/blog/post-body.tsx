// components/blog/post-body.tsx
// The post's Markdown, with in-article ads between its big sections when ads
// are enabled and the post is long enough (rules in lib/ads.ts and
// lib/markdown-sections.ts). Otherwise it is just the Markdown. Server
// component — the admin preview uses MarkdownContent directly, so staff
// never see ads while editing.

import { Fragment } from "react";
import { AdSlot } from "@/components/ads/ad-slot";
import { MarkdownContent } from "@/components/blog/markdown-content";
import { postQualifiesForAds } from "@/lib/ads";
import {
  planAdPositions,
  splitMarkdownSections,
} from "@/lib/markdown-sections";

export function PostBody({ source }: { source: string }) {
  if (!postQualifiesForAds(source)) {
    return <MarkdownContent source={source} />;
  }

  const sections = splitMarkdownSections(source);
  const adAfter = planAdPositions(sections);

  return (
    <>
      {sections.map((section, index) => (
        <Fragment key={index}>
          <MarkdownContent source={section.markdown} />
          {adAfter.has(index) && <AdSlot variant="in-article" />}
        </Fragment>
      ))}
    </>
  );
}
