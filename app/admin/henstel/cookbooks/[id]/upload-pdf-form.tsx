"use client";

import { useActionState } from "react";
import {
  uploadPdfAction,
  type UploadPdfState,
} from "@/server/actions/cookbooks";
import { Button } from "@/components/ui/button";

const initialState: UploadPdfState = { status: "idle" };

export function UploadPdfForm({ cookbookId }: { cookbookId: string }) {
  const [state, formAction, isPending] = useActionState(
    uploadPdfAction,
    initialState,
  );

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <input type="hidden" name="cookbookId" value={cookbookId} />
      <input
        type="file"
        name="file"
        accept="application/pdf"
        required
        className="text-sm text-[#5f5e5e] file:mr-3 file:rounded-[4px] file:border file:border-[#e3bebd] file:bg-white file:px-3 file:py-1.5 file:text-sm"
      />

      {state.status === "error" && (
        <p role="alert" className="text-sm text-[#9e0027]">
          {state.message}
        </p>
      )}
      {state.status === "done" && (
        <p className="text-sm text-[#3b6d11]">
          Detected {state.detectedCount}, saved {state.savedCount} recipe
          {state.savedCount === 1 ? "" : "s"} as drafts.
        </p>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="h-9 w-fit rounded-[4px] bg-[#c41e3a] text-white hover:bg-[#9e0027]"
      >
        {isPending
          ? "Detecting and parsing… this can take a minute"
          : "Upload and extract recipes"}
      </Button>
    </form>
  );
}
