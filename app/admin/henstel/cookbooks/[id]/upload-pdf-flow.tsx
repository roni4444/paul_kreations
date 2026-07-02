"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  detectRecipeCountAction,
  extractRecipeBatchAction,
} from "@/server/actions/cookbooks";
import { Button } from "@/components/ui/button";

const BATCH_SIZE = 5;

interface SkipEntry {
  title: string;
  error: string;
}

type FlowState =
  | { phase: "idle" }
  | { phase: "detecting" }
  | { phase: "confirming"; count: number }
  | {
      phase: "extracting";
      count: number;
      batchIndex: number;
      totalBatches: number;
      savedSoFar: number;
      skipped: SkipEntry[];
      batchErrors: string[];
    }
  | {
      phase: "done";
      count: number;
      savedTotal: number;
      skipped: SkipEntry[];
      batchErrors: string[];
    };

export function UploadPdfFlow({ cookbookId }: { cookbookId: string }) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [state, setState] = useState<FlowState>({ phase: "idle" });
  const [detectError, setDetectError] = useState<string | null>(null);

  async function handleDetect() {
    if (!file) return;
    setDetectError(null);
    setState({ phase: "detecting" });

    const result = await detectRecipeCountAction(file);
    if (result.status === "error") {
      setDetectError(result.message ?? "Couldn't detect recipes.");
      setState({ phase: "idle" });
      return;
    }
    setState({ phase: "confirming", count: result.count! });
  }

  async function handleConfirmExtraction() {
    if (!file || state.phase !== "confirming") return;
    const { count } = state;
    const totalBatches = Math.ceil(count / BATCH_SIZE);
    let savedSoFar = 0;
    const skipped: SkipEntry[] = [];
    const batchErrors: string[] = [];

    for (let i = 0; i < totalBatches; i++) {
      const batchStart = i * BATCH_SIZE + 1;
      const batchEnd = Math.min((i + 1) * BATCH_SIZE, count);

      setState({
        phase: "extracting",
        count,
        batchIndex: i + 1,
        totalBatches,
        savedSoFar,
        skipped: [...skipped],
        batchErrors: [...batchErrors],
      });

      // Sequential on purpose — awaited one at a time, never Promise.all.
      const result = await extractRecipeBatchAction(
        cookbookId,
        file,
        count,
        batchStart,
        batchEnd,
      );

      if (result.status === "error") {
        // Whole batch failed (Gemini error, PDF unreadable, etc) —
        // record the batch-level error but keep going with the next
        // batch instead of halting, as requested.
        batchErrors.push(
          `Batch ${i + 1} (recipes ${batchStart}-${batchEnd}): ${result.message}`,
        );
      } else {
        savedSoFar += result.savedInBatch ?? 0;
        if (result.skipped && result.skipped.length > 0) {
          skipped.push(...result.skipped);
        }
      }

      router.refresh();
    }

    setState({
      phase: "done",
      count,
      savedTotal: savedSoFar,
      skipped,
      batchErrors,
    });
  }

  function handleReset() {
    setFile(null);
    setState({ phase: "idle" });
    setDetectError(null);
  }

  return (
    <div className="flex flex-col gap-3">
      {state.phase === "idle" && (
        <>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="text-sm text-[#5f5e5e] file:mr-3 file:rounded-[4px] file:border file:border-[#e3bebd] file:bg-white file:px-3 file:py-1.5 file:text-sm"
          />
          {detectError && (
            <p role="alert" className="text-sm text-[#9e0027]">
              {detectError}
            </p>
          )}
          <Button
            type="button"
            onClick={handleDetect}
            disabled={!file}
            className="h-9 w-fit rounded-[4px] bg-[#c41e3a] text-white hover:bg-[#9e0027]"
          >
            Detect recipes
          </Button>
        </>
      )}

      {state.phase === "detecting" && (
        <p className="text-sm text-[#5f5e5e]">
          Detecting recipes in the document…
        </p>
      )}

      {state.phase === "confirming" && (
        <div className="rounded-[4px] border border-[#e3bebd] bg-[#fff5f5] px-4 py-3">
          <p className="text-sm text-[#111c2d]">
            Found <strong>{state.count}</strong> recipe
            {state.count === 1 ? "" : "s"} in this document — extraction will
            run in {Math.ceil(state.count / BATCH_SIZE)} batch
            {Math.ceil(state.count / BATCH_SIZE) === 1 ? "" : "es"} of up to{" "}
            {BATCH_SIZE} recipes each, one at a time.
          </p>
          <div className="mt-3 flex gap-2">
            <Button
              type="button"
              onClick={handleConfirmExtraction}
              className="h-8 rounded-[4px] bg-[#c41e3a] text-white hover:bg-[#9e0027]"
            >
              Start extraction
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="h-8 rounded-[4px]"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {state.phase === "extracting" && (
        <div className="rounded-[4px] border border-[#e3bebd] bg-[#fff5f5] px-4 py-3">
          <p className="text-sm text-[#111c2d]">
            Extracting batch {state.batchIndex} of {state.totalBatches}… (
            {state.savedSoFar} recipe{state.savedSoFar === 1 ? "" : "s"} saved
            so far
            {state.skipped.length > 0 && `, ${state.skipped.length} skipped`}
            {state.batchErrors.length > 0 &&
              `, ${state.batchErrors.length} batch error${state.batchErrors.length === 1 ? "" : "s"}`}
            )
          </p>
        </div>
      )}

      {state.phase === "done" && (
        <div className="flex flex-col gap-3">
          <div className="rounded-[4px] border border-[#e3bebd] bg-[#eaf3de] px-4 py-3">
            <p className="text-sm text-[#3b6d11]">
              Done — saved {state.savedTotal} of {state.count} detected recipes
              as drafts.
            </p>
          </div>

          {state.skipped.length > 0 && (
            <div className="rounded-[4px] border border-[#e3bebd] bg-[#fff5f5] px-4 py-3">
              <p className="font-mono text-xs tracking-wide text-[#8f6f6f] uppercase">
                Skipped recipes ({state.skipped.length})
              </p>
              <ul className="mt-2 flex flex-col gap-2 text-sm">
                {state.skipped.map((s, i) => (
                  <li key={i}>
                    <span className="font-medium text-[#111c2d]">
                      {s.title}
                    </span>
                    <span className="block text-[#9e0027]">{s.error}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {state.batchErrors.length > 0 && (
            <div className="rounded-[4px] border border-[#e3bebd] bg-[#fff5f5] px-4 py-3">
              <p className="font-mono text-xs tracking-wide text-[#8f6f6f] uppercase">
                Batch errors ({state.batchErrors.length})
              </p>
              <ul className="mt-2 flex flex-col gap-2 text-sm text-[#9e0027]">
                {state.batchErrors.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>
          )}

          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="h-8 w-fit rounded-[4px]"
          >
            Upload another PDF
          </Button>
        </div>
      )}
    </div>
  );
}
