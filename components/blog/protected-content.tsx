"use client";

// components/blog/protected-content.tsx
// Discourages casual copying of a post: no text selection, no right-click
// menu, no copy/cut/drag. This is a deterrent only — the text is still in
// the page source, in reader mode and in screenshots, and it cannot be made
// truly un-copyable. Links, buttons and the ads inside still work normally;
// ads are left alone on purpose.

import type { ClipboardEvent, DragEvent, MouseEvent, ReactNode } from "react";

function inAd(target: EventTarget | null): boolean {
  return target instanceof Element && target.closest("aside") !== null;
}

export function ProtectedContent({ children }: { children: ReactNode }) {
  return (
    <div
      className="select-none [-webkit-touch-callout:none]"
      onContextMenu={(e: MouseEvent) => {
        if (!inAd(e.target)) e.preventDefault();
      }}
      onCopy={(e: ClipboardEvent) => e.preventDefault()}
      onCut={(e: ClipboardEvent) => e.preventDefault()}
      onDragStart={(e: DragEvent) => e.preventDefault()}
    >
      {children}
    </div>
  );
}
