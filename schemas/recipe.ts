// schemas/recipe.ts
// Validates Gemini's structured output before it ever touches the
// database — responseSchema constrains the model, but external output
// is still external input, never trusted blindly. Also the cookbook
// creation form schema.

import { z } from "zod";

export const geminiIngredientSchema = z.object({
  name: z.string().min(1),
  quantity: z.number(),
  unit: z.string().min(1),
  category: z.string().min(1).default("Other"),
});

export const geminiInstructionSchema = z.object({
  step: z.string().min(1),
  type: z.enum(["Prepare", "Cook", "Mix", "Serve", "Wait"]),
  time_min: z.number().default(0),
  time_max: z.number().default(0),
});

export const geminiUtensilSchema = z.object({ name: z.string().min(1) });
export const geminiApplianceSchema = z.object({ name: z.string().min(1) });

export const geminiRecipeSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  prep_time: z.number().optional(),
  cook_time: z.number().optional(),
  servings: z.number().optional(),
  ingredients: z.array(geminiIngredientSchema).min(1),
  instructions: z.array(geminiInstructionSchema).min(1),
  utensils: z.array(geminiUtensilSchema).default([]),
  appliances: z.array(geminiApplianceSchema).default([]),
});

export const geminiRecipeArraySchema = z.array(geminiRecipeSchema);

export type GeminiRecipe = z.infer<typeof geminiRecipeSchema>;

export const cookbookFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(200),
  description: z.string().max(2000).optional().or(z.literal("")),
  price: z.string().optional().or(z.literal("")),
  difficultyLevel: z.string().max(50).optional().or(z.literal("")),
});

// ── Recipe sections, edit form, and AI-fix merge ──────────────────────────
//
// A recipe is split into 5 independently-editable, independently-AI-
// fixable sections. "details" groups the scalar fields together; the
// other 4 map directly to the child tables. manually_edited_sections on
// staging.cookbook_recipes accumulates which of these a staff member has
// touched — Fix with AI only ever asks Gemini to redo sections NOT in
// that list, so a manual edit is never silently overwritten by a
// subsequent AI fix.

export const recipeSectionSchema = z.enum([
  "details",
  "ingredients",
  "instructions",
  "utensils",
  "appliances",
]);
export type RecipeSection = z.infer<typeof recipeSectionSchema>;
export const ALL_RECIPE_SECTIONS: RecipeSection[] = [
  "details",
  "ingredients",
  "instructions",
  "utensils",
  "appliances",
];

export const recipeDetailsEditSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  prep_time: z.number().nonnegative().optional(),
  cook_time: z.number().nonnegative().optional(),
  servings: z.number().positive().optional(),
});

export const recipeIngredientEditSchema = z.object({
  name: z.string().min(1),
  quantity: z.number(),
  unit: z.string().min(1),
  category: z.string().min(1),
});

export const recipeInstructionEditSchema = z.object({
  instruction: z.string().min(1),
  type: z.enum(["Prepare", "Cook", "Mix", "Serve", "Wait"]),
  min_time: z.number().nonnegative(),
  max_time: z.number().nonnegative().nullable(),
});

export const recipeNameEditSchema = z.object({ name: z.string().min(1) });

/** Full submission from the recipe edit form — always contains every
 * section's current values; touchedSections (sent alongside, not part
 * of this schema) says which ones the form actually changed. */
export const recipeEditPayloadSchema = z.object({
  details: recipeDetailsEditSchema,
  ingredients: z.array(recipeIngredientEditSchema),
  instructions: z.array(recipeInstructionEditSchema),
  utensils: z.array(recipeNameEditSchema),
  appliances: z.array(recipeNameEditSchema),
});
export type RecipeEditPayload = z.infer<typeof recipeEditPayloadSchema>;

/** Gemini's response to a Fix with AI request — only the keys for the
 * sections that were actually asked for should be present. Uses the
 * same step/time_min/time_max naming as the original extraction schema
 * (geminiInstructionSchema) for consistency with how Gemini already
 * produces this shape; mapped to instruction/min_time/max_time at the
 * DB-write boundary, same as the original extraction save path. */
export const recipeFixResponseSchema = z.object({
  details: recipeDetailsEditSchema.partial().optional(),
  ingredients: z.array(geminiIngredientSchema).optional(),
  instructions: z.array(geminiInstructionSchema).optional(),
  utensils: z.array(geminiUtensilSchema).optional(),
  appliances: z.array(geminiApplianceSchema).optional(),
});
export type RecipeFixResponse = z.infer<typeof recipeFixResponseSchema>;
