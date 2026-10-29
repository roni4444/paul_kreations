// lib/markdown-sections.ts
// Splits a post's Markdown into sections at "## " headings and decides which
// sections an in-article ad follows. Pure functions, no React.

import {
  countWords,
  MAX_ADS_PER_POST,
  MIN_WORDS_AFTER_AD,
  MIN_WORDS_BETWEEN_ADS,
} from "@/lib/ads";

export interface MarkdownSection {
  markdown: string;
  words: number;
}

/** Splits at level-2 headings (the post's "big sections"), ignoring "## "
 * inside fenced code blocks. The text before the first heading is the
 * intro; each later section starts with its own heading line. */
export function splitMarkdownSections(source: string): MarkdownSection[] {
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  const chunks: string[][] = [[]];
  let inFence = false;

  for (const line of lines) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    if (!inFence && /^##\s+\S/.test(line) && chunks[chunks.length - 1].length) {
      chunks.push([]);
    }
    chunks[chunks.length - 1].push(line);
  }

  // A "---" rule just before a heading belongs with that heading, so an ad
  // inserted between sections sits above the rule, not below it.
  for (let i = 0; i < chunks.length - 1; i++) {
    const chunk = chunks[i];
    let end = chunk.length;
    while (end > 0 && chunk[end - 1].trim() === "") end--;
    if (end > 0 && /^(-{3,}|\*{3,}|_{3,})$/.test(chunk[end - 1].trim())) {
      const rule = chunk.splice(end - 1);
      chunks[i + 1] = [...rule, ...chunks[i + 1]];
    }
  }

  return chunks
    .map((chunk) => chunk.join("\n"))
    .filter((markdown) => markdown.trim() !== "")
    .map((markdown) => ({ markdown, words: countWords(markdown) }));
}

/** Indexes of sections that an in-article ad should follow.
 *
 * An ad goes after a section's end once at least MIN_WORDS_BETWEEN_ADS words
 * have been read since the previous ad (or since the start), so the first
 * screen is ad-free and ads are never crowded together. No ad after the last
 * section (the closing display ad covers that) or when too little text
 * remains. One slot is always kept for that closing ad. */
export function planAdPositions(sections: MarkdownSection[]): Set<number> {
  const positions = new Set<number>();
  const maxInArticle = MAX_ADS_PER_POST - 1;
  let sinceLastAd = 0;

  const remainingAfter = (i: number) =>
    sections.slice(i + 1).reduce((sum, s) => sum + s.words, 0);

  for (let i = 0; i < sections.length - 1; i++) {
    sinceLastAd += sections[i].words;
    if (
      sinceLastAd >= MIN_WORDS_BETWEEN_ADS &&
      remainingAfter(i) >= MIN_WORDS_AFTER_AD &&
      positions.size < maxInArticle
    ) {
      positions.add(i);
      sinceLastAd = 0;
    }
  }
  return positions;
}
