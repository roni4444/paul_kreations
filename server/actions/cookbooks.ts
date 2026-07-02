// server/actions/cookbooks.ts
// Server Actions for the Cookbooks/Recipes admin feature. Every action
// starts with requireStaffAccess("henstel") — see services/staff.ts for
// why that's the real authorization boundary, not the calling page.

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as Sentry from "@sentry/nextjs";
import {
  cookbookFormSchema,
  recipeEditPayloadSchema,
  ALL_RECIPE_SECTIONS,
  type RecipeSection,
  type RecipeEditPayload,
} from "@/schemas/recipe";
import { requireStaffAccess } from "@/services/staff";
import * as cookbooksService from "@/services/supabase/cookbooks";
import {
  detectRecipeCount,
  parseRecipeBatch,
  fixRecipeSections,
} from "@/services/gemini/recipe-extraction";

export interface CookbookFormState {
  status: "idle" | "error";
  message?: string;
}

export async function createCookbookAction(
  _prevState: CookbookFormState,
  formData: FormData,
): Promise<CookbookFormState> {
  const staff = await requireStaffAccess("henstel");

  const parsed = cookbookFormSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
    difficultyLevel: formData.get("difficultyLevel"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Invalid input.",
    };
  }

  let cookbookId: string;
  try {
    cookbookId = await cookbooksService.createCookbook({
      title: parsed.data.title,
      description: parsed.data.description || undefined,
      price: parsed.data.price ? Number(parsed.data.price) : undefined,
      difficultyLevel: parsed.data.difficultyLevel || undefined,
      createdBy: staff.id,
    });
  } catch (err) {
    Sentry.captureException(err);
    return {
      status: "error",
      message: "Couldn't create the cookbook. Please try again.",
    };
  }

  revalidatePath("/admin/henstel/cookbooks");
  redirect(`/admin/henstel/cookbooks/${cookbookId}`);
}

export async function markCookbookReviewedAction(cookbookId: string) {
  await requireStaffAccess("henstel");
  await cookbooksService.setCookbookStatus(cookbookId, "reviewed");
  revalidatePath(`/admin/henstel/cookbooks/${cookbookId}`);
}

export async function deleteCookbookAction(cookbookId: string) {
  await requireStaffAccess("henstel");
  await cookbooksService.deleteCookbook(cookbookId);
  revalidatePath("/admin/henstel/cookbooks");
  redirect("/admin/henstel/cookbooks");
}

export async function markRecipeReviewedAction(
  recipeId: string,
  cookbookId: string,
) {
  await requireStaffAccess("henstel");
  await cookbooksService.setRecipeStatus(recipeId, "reviewed");
  revalidatePath(`/admin/henstel/cookbooks/${cookbookId}`);
}

export async function deleteRecipeAction(recipeId: string, cookbookId: string) {
  await requireStaffAccess("henstel");
  await cookbooksService.deleteRecipe(recipeId);
  revalidatePath(`/admin/henstel/cookbooks/${cookbookId}`);
}

function validatePdfFile(file: unknown): file is File {
  return (
    file instanceof File &&
    file.type === "application/pdf" &&
    file.size <= 20 * 1024 * 1024
  );
}

export interface DetectState {
  status: "detected" | "error";
  count?: number;
  message?: string;
}

/** Step 1: just count recipes — no extraction yet, so the user can
 * confirm before any Gemini extraction calls are spent. */
export async function detectRecipeCountAction(
  file: File,
): Promise<DetectState> {
  await requireStaffAccess("henstel");

  if (!validatePdfFile(file)) {
    return { status: "error", message: "Please choose a PDF file under 20MB." };
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const base64Pdf = Buffer.from(arrayBuffer).toString("base64");
    const count = await detectRecipeCount(base64Pdf, file.type);
    return { status: "detected", count };
  } catch (err) {
    Sentry.captureException(err);
    return {
      status: "error",
      message:
        err instanceof Error
          ? err.message
          : "Couldn't detect recipes in that PDF.",
    };
  }
}

export interface BatchResult {
  status: "done" | "error";
  savedInBatch?: number;
  skipped?: { title: string; error: string }[];
  message?: string;
}

/** Step 2, called once per batch by the client, sequentially (never in
 * parallel) — see app/admin/henstel/cookbooks/[id]/upload-pdf-flow.tsx.
 * Each call re-encodes the same File to base64; for typical cookbook PDF
 * sizes this is a small, acceptable cost for the simplicity of not
 * needing any server-side temporary storage between batches. */
export async function extractRecipeBatchAction(
  cookbookId: string,
  file: File,
  totalCount: number,
  batchStart: number,
  batchEnd: number,
): Promise<BatchResult> {
  const staff = await requireStaffAccess("henstel");

  if (!validatePdfFile(file)) {
    return { status: "error", message: "Please choose a PDF file under 20MB." };
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const base64Pdf = Buffer.from(arrayBuffer).toString("base64");

    const recipes = await parseRecipeBatch(
      base64Pdf,
      file.type,
      totalCount,
      batchStart,
      batchEnd,
    );
    const { savedCount, skipped } = await cookbooksService.saveRecipesToStaging(
      cookbookId,
      recipes,
      staff.id,
    );

    revalidatePath(`/admin/henstel/cookbooks/${cookbookId}`);
    return { status: "done", savedInBatch: savedCount, skipped };
  } catch (err) {
    Sentry.captureException(err);
    return {
      status: "error",
      message:
        err instanceof Error
          ? err.message
          : `Batch (recipes ${batchStart}-${batchEnd}) failed.`,
    };
  }
}

export interface UpdateRecipeState {
  status: "ok" | "error";
  message?: string;
}

/** Saves a manual edit. touchedSections is tracked client-side (see
 * recipe-edit-form.tsx) as the staff member actually interacts with
 * each section, not diffed here — more reliable than re-deriving intent
 * from value equality after form serialization. */
export async function updateRecipeAction(
  recipeId: string,
  cookbookId: string,
  payload: RecipeEditPayload,
  touchedSections: RecipeSection[],
): Promise<UpdateRecipeState> {
  await requireStaffAccess("henstel");

  const parsed = recipeEditPayloadSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Invalid recipe data.",
    };
  }

  try {
    await cookbooksService.applyManualRecipeEdit(
      recipeId,
      parsed.data,
      touchedSections,
    );
    revalidatePath(`/admin/henstel/cookbooks/${cookbookId}`);
    return { status: "ok" };
  } catch (err) {
    Sentry.captureException(err);
    return {
      status: "error",
      message: err instanceof Error ? err.message : "Couldn't save changes.",
    };
  }
}

export interface FixWithAiState {
  status: "ok" | "nothing_to_fix" | "error";
  message?: string;
  fixedSections?: RecipeSection[];
}

/** Fix with AI. Replaces on first invocation (nothing is protected yet,
 * so all 5 sections are "to fix"); merges on every invocation after a
 * manual edit (only the unprotected sections are sent to Gemini, and
 * only those are written back) — see fixRecipeSections and applyAiFix
 * for where that actually happens. */
export async function fixRecipeWithAiAction(
  recipeId: string,
  cookbookId: string,
): Promise<FixWithAiState> {
  await requireStaffAccess("henstel");

  try {
    const recipe = await cookbooksService.getRecipeDetail(recipeId);
    if (!recipe) {
      return { status: "error", message: "Recipe not found." };
    }

    const sectionsToFix = ALL_RECIPE_SECTIONS.filter(
      (s) => !recipe.manually_edited_sections.includes(s),
    );

    if (sectionsToFix.length === 0) {
      return {
        status: "nothing_to_fix",
        message:
          "Every section has been manually edited — nothing left for AI to fix.",
      };
    }

    const fixed = await fixRecipeSections(
      {
        title: recipe.title,
        description: recipe.description,
        prep_time: recipe.prep_time,
        cook_time: recipe.cook_time,
        servings: recipe.servings,
        ingredients: recipe.ingredients.map(
          ({ name, quantity, unit, category }) => ({
            name,
            quantity,
            unit,
            category,
          }),
        ),
        instructions: recipe.instructions.map(
          ({ instruction, type, min_time, max_time }) => ({
            instruction,
            type,
            min_time,
            max_time,
          }),
        ),
        utensils: recipe.utensils.map(({ name }) => ({ name })),
        appliances: recipe.appliances.map(({ name }) => ({ name })),
      },
      sectionsToFix,
    );

    const fixedSections = await cookbooksService.applyAiFix(recipeId, fixed);

    revalidatePath(`/admin/henstel/cookbooks/${cookbookId}`);
    return { status: "ok", fixedSections };
  } catch (err) {
    Sentry.captureException(err);
    return {
      status: "error",
      message: err instanceof Error ? err.message : "Fix with AI failed.",
    };
  }
}
