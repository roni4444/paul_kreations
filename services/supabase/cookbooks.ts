// services/supabase/cookbooks.ts
// All staging.* reads/writes for the Cookbooks/Recipes admin feature.
// Server Actions and pages call into these functions — never query
// createHenstelSupabaseClient() directly anywhere else.

import { createHenstelSupabaseClient } from "./henstel-client";
import type {
  GeminiRecipe,
  RecipeSection,
  RecipeEditPayload,
  RecipeFixResponse,
} from "@/schemas/recipe";

export interface CookbookRow {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  difficulty_level: string | null;
  no_of_recipes: number;
  status: "draft" | "reviewed";
  created_at: string;
}

export interface RecipeRow {
  id: string;
  cookbook: string;
  title: string;
  description: string | null;
  prep_time: number | null;
  cook_time: number | null;
  servings: number | null;
  status: "draft" | "reviewed";
  ai_fixed: boolean;
  manually_edited_sections: RecipeSection[];
}

export interface RecipeDetail extends RecipeRow {
  ingredients: {
    id: string;
    name: string;
    quantity: number;
    unit: string;
    category: string;
  }[];
  instructions: {
    id: string;
    order: number;
    instruction: string;
    type: string;
    min_time: number;
    max_time: number | null;
  }[];
  utensils: { id: string; name: string }[];
  appliances: { id: string; name: string }[];
}

export async function listCookbooks(): Promise<CookbookRow[]> {
  const supabase = createHenstelSupabaseClient();
  const { data, error } = await supabase
    .schema("staging")
    .from("cookbooks")
    .select(
      "id, title, description, price, difficulty_level, no_of_recipes, status, created_at",
    )
    .order("created_at", { ascending: false });

  if (error) throw new Error(`listCookbooks: ${error.message}`);
  return data as CookbookRow[];
}

export async function getCookbook(id: string): Promise<CookbookRow | null> {
  const supabase = createHenstelSupabaseClient();
  const { data, error } = await supabase
    .schema("staging")
    .from("cookbooks")
    .select(
      "id, title, description, price, difficulty_level, no_of_recipes, status, created_at",
    )
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(`getCookbook: ${error.message}`);
  return data as CookbookRow | null;
}

export async function listRecipes(cookbookId: string): Promise<RecipeRow[]> {
  const supabase = createHenstelSupabaseClient();
  const { data, error } = await supabase
    .schema("staging")
    .from("cookbook_recipes")
    .select(
      "id, cookbook, title, description, prep_time, cook_time, servings, status, ai_fixed, manually_edited_sections",
    )
    .eq("cookbook", cookbookId)
    .order("created_at", { ascending: true });

  if (error) throw new Error(`listRecipes: ${error.message}`);
  return data as RecipeRow[];
}

export async function getRecipeDetail(
  recipeId: string,
): Promise<RecipeDetail | null> {
  const supabase = createHenstelSupabaseClient();
  const staging = supabase.schema("staging");

  const [recipeResult, ingredients, instructions, utensils, appliances] =
    await Promise.all([
      staging
        .from("cookbook_recipes")
        .select(
          "id, cookbook, title, description, prep_time, cook_time, servings, status, ai_fixed, manually_edited_sections",
        )
        .eq("id", recipeId)
        .maybeSingle(),
      staging
        .from("recipe_ingredients")
        .select("id, name, quantity, unit, category")
        .eq("recipe", recipeId),
      staging
        .from("recipe_instructions")
        .select('id, "order", instruction, type, min_time, max_time')
        .eq("recipe", recipeId)
        .order("order", { ascending: true }),
      staging.from("recipe_utensils").select("id, name").eq("recipe", recipeId),
      staging
        .from("recipe_appliances")
        .select("id, name")
        .eq("recipe", recipeId),
    ]);

  if (recipeResult.error)
    throw new Error(`getRecipeDetail: ${recipeResult.error.message}`);
  if (!recipeResult.data) return null;

  return {
    ...(recipeResult.data as RecipeRow),
    ingredients: ingredients.data ?? [],
    instructions: (instructions.data ?? []) as RecipeDetail["instructions"],
    utensils: utensils.data ?? [],
    appliances: appliances.data ?? [],
  };
}

export async function createCookbook(input: {
  title: string;
  description?: string;
  price?: number;
  difficultyLevel?: string;
  createdBy: string;
}): Promise<string> {
  const supabase = createHenstelSupabaseClient();
  const { data, error } = await supabase
    .schema("staging")
    .from("cookbooks")
    .insert({
      title: input.title,
      description: input.description || null,
      price: input.price ?? null,
      difficulty_level: input.difficultyLevel || null,
      created_by: input.createdBy,
    })
    .select("id")
    .single();

  if (error) throw new Error(`createCookbook: ${error.message}`);
  return data.id as string;
}

export async function setCookbookStatus(
  id: string,
  status: "draft" | "reviewed",
) {
  const supabase = createHenstelSupabaseClient();
  const { error } = await supabase
    .schema("staging")
    .from("cookbooks")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(`setCookbookStatus: ${error.message}`);
}

export async function deleteCookbook(id: string) {
  const supabase = createHenstelSupabaseClient();
  const { error } = await supabase
    .schema("staging")
    .from("cookbooks")
    .delete()
    .eq("id", id);
  if (error) throw new Error(`deleteCookbook: ${error.message}`);
}

export async function setRecipeStatus(
  id: string,
  status: "draft" | "reviewed",
) {
  const supabase = createHenstelSupabaseClient();
  const { error } = await supabase
    .schema("staging")
    .from("cookbook_recipes")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(`setRecipeStatus: ${error.message}`);
}

export async function deleteRecipe(id: string) {
  const supabase = createHenstelSupabaseClient();
  const { error } = await supabase
    .schema("staging")
    .from("cookbook_recipes")
    .delete()
    .eq("id", id);
  if (error) throw new Error(`deleteRecipe: ${error.message}`);
}

export interface SaveResult {
  savedCount: number;
  skipped: { title: string; error: string }[];
}

/** Saves a batch of Gemini-extracted recipes into staging. Each recipe
 * is its own all-or-nothing unit: if any of its inserts (recipe row,
 * ingredients, instructions, utensils, appliances) fails, that one
 * recipe is rolled back and skipped, and the loop continues with the
 * next recipe. The error message and title are returned so the UI can
 * report exactly which recipes were skipped and why. */
export async function saveRecipesToStaging(
  cookbookId: string,
  recipes: GeminiRecipe[],
  createdBy: string,
): Promise<SaveResult> {
  const supabase = createHenstelSupabaseClient();
  const staging = supabase.schema("staging");
  let savedCount = 0;
  const skipped: { title: string; error: string }[] = [];

  for (const recipe of recipes) {
    // Track what got inserted for this recipe so we can roll it back
    // ourselves if a later child insert fails — Supabase doesn't expose
    // Postgres SAVEPOINTs over the REST API, so we orchestrate the
    // compensating delete in app code.
    let insertedRecipeId: string | null = null;

    try {
      const { data: recipeRow, error: recipeErr } = await staging
        .from("cookbook_recipes")
        .insert({
          cookbook: cookbookId,
          title: recipe.title,
          description: recipe.description || null,
          prep_time: recipe.prep_time ?? null,
          cook_time: recipe.cook_time ?? null,
          servings: recipe.servings ?? null,
          created_by: createdBy,
        })
        .select("id")
        .single();

      if (recipeErr || !recipeRow) {
        throw new Error(recipeErr?.message ?? "Insert returned no row");
      }
      insertedRecipeId = recipeRow.id as string;

      if (recipe.ingredients.length > 0) {
        const { error } = await staging.from("recipe_ingredients").insert(
          recipe.ingredients.map((ing) => ({
            recipe: insertedRecipeId,
            name: ing.name,
            quantity: ing.quantity,
            unit: ing.unit,
            category: ing.category,
          })),
        );
        if (error) throw new Error(`recipe_ingredients: ${error.message}`);
      }

      if (recipe.instructions.length > 0) {
        const { error } = await staging.from("recipe_instructions").insert(
          recipe.instructions.map((step, index) => ({
            recipe: insertedRecipeId,
            order: index + 1,
            instruction: step.step,
            type: step.type,
            min_time: step.time_min ?? 0,
            max_time: step.time_max && step.time_max > 0 ? step.time_max : null,
          })),
        );
        if (error) throw new Error(`recipe_instructions: ${error.message}`);
      }

      if (recipe.utensils.length > 0) {
        const { error } = await staging.from("recipe_utensils").insert(
          recipe.utensils.map((u) => ({
            recipe: insertedRecipeId,
            name: u.name,
          })),
        );
        if (error) throw new Error(`recipe_utensils: ${error.message}`);
      }

      if (recipe.appliances.length > 0) {
        const { error } = await staging.from("recipe_appliances").insert(
          recipe.appliances.map((a) => ({
            recipe: insertedRecipeId,
            name: a.name,
            brand: null,
            category: null,
          })),
        );
        if (error) throw new Error(`recipe_appliances: ${error.message}`);
      }

      savedCount++;
    } catch (err) {
      // Roll back this recipe's partial inserts. ON DELETE CASCADE on
      // every child table's FK to cookbook_recipes means deleting the
      // parent cleans up any children that did make it in.
      if (insertedRecipeId) {
        await staging
          .from("cookbook_recipes")
          .delete()
          .eq("id", insertedRecipeId);
      }
      skipped.push({
        title: recipe.title || "(untitled recipe)",
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  return { savedCount, skipped };
}

/** Loads full detail for every recipe in a cookbook in a fixed number of
 * queries (not N+1). Used by the cookbook detail page to render the
 * accordion. */
export async function listRecipeDetails(
  cookbookId: string,
): Promise<RecipeDetail[]> {
  const supabase = createHenstelSupabaseClient();
  const staging = supabase.schema("staging");

  const { data: recipes, error: recipesErr } = await staging
    .from("cookbook_recipes")
    .select(
      "id, cookbook, title, description, prep_time, cook_time, servings, status, ai_fixed, manually_edited_sections",
    )
    .eq("cookbook", cookbookId)
    .order("created_at", { ascending: true });

  if (recipesErr)
    throw new Error(`listRecipeDetails (recipes): ${recipesErr.message}`);
  const recipeRows = (recipes ?? []) as RecipeRow[];
  if (recipeRows.length === 0) return [];

  const recipeIds = recipeRows.map((r) => r.id);

  const [ingredients, instructions, utensils, appliances] = await Promise.all([
    staging
      .from("recipe_ingredients")
      .select("id, recipe, name, quantity, unit, category")
      .in("recipe", recipeIds),
    staging
      .from("recipe_instructions")
      .select('id, recipe, "order", instruction, type, min_time, max_time')
      .in("recipe", recipeIds)
      .order("order", { ascending: true }),
    staging
      .from("recipe_utensils")
      .select("id, recipe, name")
      .in("recipe", recipeIds),
    staging
      .from("recipe_appliances")
      .select("id, recipe, name")
      .in("recipe", recipeIds),
  ]);

  // Bucket child rows by recipe id, in a single pass per child table.
  function bucket<T extends { recipe: string }>(
    rows: T[] | null,
  ): Map<string, T[]> {
    const map = new Map<string, T[]>();
    for (const row of rows ?? []) {
      const list = map.get(row.recipe) ?? [];
      list.push(row);
      map.set(row.recipe, list);
    }
    return map;
  }

  const ingMap = bucket(
    ingredients.data as ({ recipe: string } & Record<string, unknown>)[] | null,
  );
  const insMap = bucket(
    instructions.data as
      | ({ recipe: string } & Record<string, unknown>)[]
      | null,
  );
  const utMap = bucket(
    utensils.data as ({ recipe: string } & Record<string, unknown>)[] | null,
  );
  const appMap = bucket(
    appliances.data as ({ recipe: string } & Record<string, unknown>)[] | null,
  );

  return recipeRows.map((recipe) => ({
    ...recipe,
    ingredients: (ingMap.get(recipe.id) ?? []).map((r) => ({
      id: r.id as string,
      name: r.name as string,
      quantity: r.quantity as number,
      unit: r.unit as string,
      category: r.category as string,
    })),
    instructions: (insMap.get(recipe.id) ?? []).map((r) => ({
      id: r.id as string,
      order: r.order as number,
      instruction: r.instruction as string,
      type: r.type as string,
      min_time: r.min_time as number,
      max_time: r.max_time as number | null,
    })),
    utensils: (utMap.get(recipe.id) ?? []).map((r) => ({
      id: r.id as string,
      name: r.name as string,
    })),
    appliances: (appMap.get(recipe.id) ?? []).map((r) => ({
      id: r.id as string,
      name: r.name as string,
    })),
  }));
}

// ── Section-level replace helpers ──────────────────────────────────────
// Used by both the manual edit path and the AI fix path — both always
// fully replace a section's child rows rather than diffing individual
// rows, same reasoning as saveRecipesToStaging: simpler and more robust
// than row-level diffing, and "section" is the unit of protection
// anyway (manually_edited_sections is per-section, not per-row).

async function replaceIngredients(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  staging: any,
  recipeId: string,
  ingredients: {
    name: string;
    quantity: number;
    unit: string;
    category: string;
  }[],
) {
  const { error: delErr } = await staging
    .from("recipe_ingredients")
    .delete()
    .eq("recipe", recipeId);
  if (delErr) throw new Error(`replaceIngredients (delete): ${delErr.message}`);
  if (ingredients.length > 0) {
    const { error } = await staging
      .from("recipe_ingredients")
      .insert(ingredients.map((i) => ({ recipe: recipeId, ...i })));
    if (error) throw new Error(`replaceIngredients (insert): ${error.message}`);
  }
}

async function replaceInstructions(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  staging: any,
  recipeId: string,
  instructions: {
    instruction: string;
    type: string;
    min_time: number;
    max_time: number | null;
  }[],
) {
  const { error: delErr } = await staging
    .from("recipe_instructions")
    .delete()
    .eq("recipe", recipeId);
  if (delErr)
    throw new Error(`replaceInstructions (delete): ${delErr.message}`);
  if (instructions.length > 0) {
    const { error } = await staging.from("recipe_instructions").insert(
      instructions.map((s, index) => ({
        recipe: recipeId,
        order: index + 1,
        instruction: s.instruction,
        type: s.type,
        min_time: s.min_time,
        max_time: s.max_time,
      })),
    );
    if (error)
      throw new Error(`replaceInstructions (insert): ${error.message}`);
  }
}

async function replaceNames(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  staging: any,
  table: "recipe_utensils" | "recipe_appliances",
  recipeId: string,
  names: { name: string }[],
) {
  const { error: delErr } = await staging
    .from(table)
    .delete()
    .eq("recipe", recipeId);
  if (delErr)
    throw new Error(`replaceNames (${table} delete): ${delErr.message}`);
  if (names.length > 0) {
    const { error } = await staging
      .from(table)
      .insert(names.map((n) => ({ recipe: recipeId, name: n.name })));
    if (error)
      throw new Error(`replaceNames (${table} insert): ${error.message}`);
  }
}

/** Applies a manual edit. `touchedSections` is supplied by the client —
 * tracked there as the staff member actually interacts with each
 * section's inputs, rather than diffed server-side after the fact
 * (value-equality diffing is fragile across form serialization: type
 * coercion, float precision, etc). Only touched sections are written;
 * untouched ones are left completely alone. manually_edited_sections
 * accumulates (union, not replace) — a section once protected stays
 * protected across multiple separate edits. */
export async function applyManualRecipeEdit(
  recipeId: string,
  payload: RecipeEditPayload,
  touchedSections: RecipeSection[],
): Promise<void> {
  const supabase = createHenstelSupabaseClient();
  const staging = supabase.schema("staging");

  if (touchedSections.includes("details")) {
    const { error } = await staging
      .from("cookbook_recipes")
      .update({
        title: payload.details.title,
        description: payload.details.description || null,
        prep_time: payload.details.prep_time ?? null,
        cook_time: payload.details.cook_time ?? null,
        servings: payload.details.servings ?? null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", recipeId);
    if (error)
      throw new Error(`applyManualRecipeEdit (details): ${error.message}`);
  }
  if (touchedSections.includes("ingredients")) {
    await replaceIngredients(staging, recipeId, payload.ingredients);
  }
  if (touchedSections.includes("instructions")) {
    await replaceInstructions(staging, recipeId, payload.instructions);
  }
  if (touchedSections.includes("utensils")) {
    await replaceNames(staging, "recipe_utensils", recipeId, payload.utensils);
  }
  if (touchedSections.includes("appliances")) {
    await replaceNames(
      staging,
      "recipe_appliances",
      recipeId,
      payload.appliances,
    );
  }

  if (touchedSections.length === 0) return;

  const { data: existing, error: fetchErr } = await staging
    .from("cookbook_recipes")
    .select("manually_edited_sections")
    .eq("id", recipeId)
    .single();
  if (fetchErr)
    throw new Error(
      `applyManualRecipeEdit (fetch sections): ${fetchErr.message}`,
    );

  const merged = Array.from(
    new Set([
      ...(existing?.manually_edited_sections ?? []),
      ...touchedSections,
    ]),
  );
  const { error: updateErr } = await staging
    .from("cookbook_recipes")
    .update({ manually_edited_sections: merged })
    .eq("id", recipeId);
  if (updateErr)
    throw new Error(
      `applyManualRecipeEdit (mark sections): ${updateErr.message}`,
    );
}

/** Applies a Fix with AI result. Only writes the sections present in
 * `fixed` (i.e. the ones that were actually requested — see
 * fixRecipeSections, which only ever asks for unprotected sections).
 * Does NOT touch manually_edited_sections — fixing is not editing.
 * Returns which sections were actually applied, for the UI to report. */
export async function applyAiFix(
  recipeId: string,
  fixed: RecipeFixResponse,
): Promise<RecipeSection[]> {
  const supabase = createHenstelSupabaseClient();
  const staging = supabase.schema("staging");
  const applied: RecipeSection[] = [];

  if (fixed.details) {
    const { error } = await staging
      .from("cookbook_recipes")
      .update({
        ...(fixed.details.title !== undefined
          ? { title: fixed.details.title }
          : {}),
        ...(fixed.details.description !== undefined
          ? { description: fixed.details.description || null }
          : {}),
        ...(fixed.details.prep_time !== undefined
          ? { prep_time: fixed.details.prep_time }
          : {}),
        ...(fixed.details.cook_time !== undefined
          ? { cook_time: fixed.details.cook_time }
          : {}),
        ...(fixed.details.servings !== undefined
          ? { servings: fixed.details.servings }
          : {}),
        ai_fixed: true,
        updated_at: new Date().toISOString(),
      })
      .eq("id", recipeId);
    if (error) throw new Error(`applyAiFix (details): ${error.message}`);
    applied.push("details");
  }

  if (fixed.ingredients) {
    await replaceIngredients(staging, recipeId, fixed.ingredients);
    applied.push("ingredients");
  }

  if (fixed.instructions) {
    await replaceInstructions(
      staging,
      recipeId,
      fixed.instructions.map((s) => ({
        instruction: s.step,
        type: s.type,
        min_time: s.time_min ?? 0,
        max_time: s.time_max && s.time_max > 0 ? s.time_max : null,
      })),
    );
    applied.push("instructions");
  }

  if (fixed.utensils) {
    await replaceNames(staging, "recipe_utensils", recipeId, fixed.utensils);
    applied.push("utensils");
  }

  if (fixed.appliances) {
    await replaceNames(
      staging,
      "recipe_appliances",
      recipeId,
      fixed.appliances,
    );
    applied.push("appliances");
  }

  // ai_fixed is set above only when "details" was applied — make sure
  // it still gets set if some other section(s) were fixed but details
  // wasn't among them.
  if (applied.length > 0 && !applied.includes("details")) {
    const { error } = await staging
      .from("cookbook_recipes")
      .update({ ai_fixed: true, updated_at: new Date().toISOString() })
      .eq("id", recipeId);
    if (error) throw new Error(`applyAiFix (mark ai_fixed): ${error.message}`);
  }

  return applied;
}
