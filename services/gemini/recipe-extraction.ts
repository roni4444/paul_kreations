// services/gemini/recipe-extraction.ts
// Wraps Gemini's REST API for PDF recipe extraction — raw fetch, same
// approach the original Flutter admin app used (no new SDK dependency).
// Server-only: GEMINI_API_KEY never reaches the browser.
//
// Model: gemini-3.5-flash, fixed — not env-overridable to a different
// model by default the way the detect model is, per instruction to stop
// changing it. Thinking is controlled via thinkingLevel (not the
// thinkingBudget mechanism tried previously), set to "medium": enough
// reasoning depth to follow the 14 extraction rules accurately, without
// "high"'s documented tendency to expand and consume the whole output
// budget on Gemini 3.x models.

import {
  geminiRecipeArraySchema,
  recipeFixResponseSchema,
  ALL_RECIPE_SECTIONS,
  type GeminiRecipe,
  type RecipeSection,
  type RecipeFixResponse,
} from "@/schemas/recipe";

const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const DETECT_MODEL = process.env.GEMINI_MODEL_DETECT ?? "gemini-3.1-flash-lite";
const PARSE_MODEL = "gemini-3.5-flash";

const PARSE_THINKING_LEVEL = "medium";

// Adapted from the original Flutter app's GeminiService system prompt,
// with one addition: ingredient `category`, which our schema requires
// but wasn't in the prompt we had visibility into.
const SYSTEM_INSTRUCTION = `
You are extracting structured recipe data from a cookbook PDF.
1. Ingredients cannot be unitless. If an ingredient is a whole item, use "piece" as the unit.
2. "Salt to taste" must be converted to a measurable amount (e.g., quantity: 1, unit: "tsp").
3. Separate compound ingredients properly.
4. If an ingredient includes preparation instructions, the name should be just the ingredient, and the preparation should become its own "Prepare" instruction.
5. Every instruction must have a type from: Prepare, Cook, Mix, Serve, Wait.
6. All items mentioned in instructions MUST appear in the ingredients list.
7. Remove alternative names in parentheses; use sentence case.
8. Make all "optional" ingredients mandatory.
9. Assign each ingredient a category (e.g. Produce, Dairy & Eggs, Spices, Grains & Flour, Meat, Legumes, Condiments, Fresh Herbs).
10. Generate utensils and appliances from a standard kitchen list.
11. If servings is unspecified, estimate based on ingredient amounts.
12. All "Prepare" instructions must be at the top of the list.
13. Every instruction needs a time_min and time_max in minutes (use 0 for no upper bound).
14. Divide complex instructions into atomic steps.
`.trim();

// (recipeSchemaForGemini removed — see callGemini's comment on why we
// dropped responseSchema/responseMimeType for prompt-based JSON.)

interface CallGeminiOptions {
  jsonMode?: boolean;
  thinkingLevel?: "minimal" | "low" | "medium" | "high";
}

async function callGemini(
  model: string,
  parts: object[],
  options: CallGeminiOptions = {},
): Promise<string> {
  const url = `${GEMINI_BASE_URL}/models/${model}:generateContent?key=${requireEnv("GEMINI_API_KEY")}`;

  // Note on JSON output: we use prompt-based JSON ("respond with valid
  // JSON only"), NOT responseMimeType + responseSchema, even though our
  // schema is well-defined. On Gemini 3.x, schema-constrained JSON mode
  // is widely reported to emit massive runs of whitespace/escape
  // padding, blowing up output token usage by 10-20x for the same actual
  // content. Prompt-based JSON works fine, and we still validate the
  // result with Zod (geminiRecipeArraySchema) downstream — so we lose
  // model-side constraint but keep full input validation safety.
  const body: Record<string, unknown> = {
    contents: [{ parts }],
    systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
    generationConfig: {
      ...(options.thinkingLevel
        ? { thinkingConfig: { thinkingLevel: options.thinkingLevel } }
        : {}),
      // No maxOutputTokens — per instruction, no output limit. With
      // schema-constrained mode dropped, output stays proportional to
      // actual content rather than ballooning.
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API error ${res.status}: ${errText}`);
  }

  const data = await res.json();
  const candidate = data?.candidates?.[0];
  const text: string | undefined = candidate?.content?.parts?.[0]?.text;
  const usage = data?.usageMetadata;

  if (candidate?.finishReason === "MAX_TOKENS") {
    throw new Error(
      `Gemini's response was cut off — thinking used ${usage?.thoughtsTokenCount ?? "an unknown number of"} tokens and output used ${usage?.candidatesTokenCount ?? "an unknown number of"} tokens before hitting the model's own internal ceiling. This indicates the model is generating malformed/runaway output rather than the expected JSON; reducing the batch size further may help, but the underlying cause is the model, not the prompt.`,
    );
  }

  if (!text) throw new Error("Gemini returned no content");
  return text;
}

function extractJson(text: string): unknown {
  let cleaned = text.trim();
  if (cleaned.startsWith("```json")) cleaned = cleaned.slice(7);
  else if (cleaned.startsWith("```")) cleaned = cleaned.slice(3);
  if (cleaned.endsWith("```")) cleaned = cleaned.slice(0, -3);
  return JSON.parse(cleaned.trim());
}

export async function detectRecipeCount(
  base64Pdf: string,
  mimeType: string,
): Promise<number> {
  const text = await callGemini(
    DETECT_MODEL,
    [
      { inlineData: { data: base64Pdf, mimeType } },
      {
        text: "Count the total number of distinct recipes in this document. Respond with only the number, no other text.",
      },
    ],
    { thinkingLevel: "minimal" }, // trivial counting task — no reasoning needed
  );
  const count = parseInt(text.trim().replace(/\D/g, ""), 10);
  if (Number.isNaN(count)) {
    throw new Error(
      `Could not parse a recipe count from Gemini's response: "${text}"`,
    );
  }
  return count;
}

/**
 * Extracts one batch of recipes — only those numbered `batchStart` through
 * `batchEnd` (1-indexed, inclusive), in document order — rather than the
 * whole document in one call. Calling this repeatedly for sequential
 * ranges (5 at a time, say) keeps each individual call's output small
 * enough to never approach the token ceiling, regardless of how many
 * recipes the source document has in total.
 */
export async function parseRecipeBatch(
  base64Pdf: string,
  mimeType: string,
  totalCount: number,
  batchStart: number,
  batchEnd: number,
): Promise<GeminiRecipe[]> {
  const rangeInstruction = `This document contains exactly ${totalCount} recipes in total, appearing in order from first to last. Extract ONLY recipes number ${batchStart} through ${batchEnd} (1-indexed, inclusive) — skip every recipe before number ${batchStart} and after number ${batchEnd}. Return exactly ${batchEnd - batchStart + 1} recipes, in the order they appear, following the system instructions exactly.

Respond with a JSON array (and nothing else — no prose, no markdown code fences, no preamble). Each element of the array is one recipe, matching this exact shape:
{
  "title": string,
  "description": string,
  "prep_time": number,
  "cook_time": number,
  "servings": number,
  "ingredients": [{ "name": string, "quantity": number, "unit": string, "category": string }],
  "instructions": [{ "step": string, "type": "Prepare" | "Cook" | "Mix" | "Serve" | "Wait", "time_min": number, "time_max": number }],
  "utensils": [{ "name": string }],
  "appliances": [{ "name": string }]
}

Use compact JSON — no unnecessary whitespace.`;

  const text = await callGemini(
    PARSE_MODEL,
    [{ inlineData: { data: base64Pdf, mimeType } }, { text: rangeInstruction }],
    {
      thinkingLevel: PARSE_THINKING_LEVEL,
    },
  );

  const raw = extractJson(text);
  const parsed = geminiRecipeArraySchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(
      `Gemini's output for recipes ${batchStart}-${batchEnd} didn't match the expected shape: ${parsed.error.message}`,
    );
  }
  return parsed.data;
}

export interface CurrentRecipeForFix {
  title: string;
  description: string | null;
  prep_time: number | null;
  cook_time: number | null;
  servings: number | null;
  ingredients: {
    name: string;
    quantity: number;
    unit: string;
    category: string;
  }[];
  instructions: {
    instruction: string;
    type: string;
    min_time: number;
    max_time: number | null;
  }[];
  utensils: { name: string }[];
  appliances: { name: string }[];
}

/**
 * Fix with AI for one recipe. Works from the recipe's CURRENT staging
 * data (text only — no PDF re-read, since the original document isn't
 * stored anywhere after extraction), and only asks Gemini to redo the
 * sections in `sectionsToFix`. Sections the staff member has manually
 * edited are passed along as read-only context (so Gemini understands
 * the whole recipe) but are explicitly marked off-limits, and the
 * response is only expected to contain keys for the requested sections —
 * this is what makes the merge behavior work: on a recipe with nothing
 * manually edited yet, sectionsToFix is all 5 sections, which is
 * functionally a full replace; once some sections are protected,
 * subsequent calls only ever touch what's left.
 */
export async function fixRecipeSections(
  currentRecipe: CurrentRecipeForFix,
  sectionsToFix: RecipeSection[],
): Promise<RecipeFixResponse> {
  if (sectionsToFix.length === 0) {
    return {};
  }

  const protectedSections = ALL_RECIPE_SECTIONS.filter(
    (s) => !sectionsToFix.includes(s),
  );

  const shapeLines = [
    sectionsToFix.includes("details") &&
      `"details": { "title": string, "description": string, "prep_time": number, "cook_time": number, "servings": number }`,
    sectionsToFix.includes("ingredients") &&
      `"ingredients": [{ "name": string, "quantity": number, "unit": string, "category": string }]`,
    sectionsToFix.includes("instructions") &&
      `"instructions": [{ "step": string, "type": "Prepare"|"Cook"|"Mix"|"Serve"|"Wait", "time_min": number, "time_max": number }]`,
    sectionsToFix.includes("utensils") && `"utensils": [{ "name": string }]`,
    sectionsToFix.includes("appliances") &&
      `"appliances": [{ "name": string }]`,
  ].filter(Boolean);

  const prompt = `
Below is a recipe previously extracted from a cookbook. Review and correct it according to the system instructions (the 14 rules).

Current recipe data (JSON):
${JSON.stringify(currentRecipe)}

${
  protectedSections.length > 0
    ? `The following sections were manually edited by a human and must NOT be changed — included above only as context, so you understand the full recipe: ${protectedSections.join(", ")}.\n`
    : ""
}Return corrected data ONLY for these sections: ${sectionsToFix.join(", ")}.

Respond with a single JSON object (no prose, no markdown fences) containing ONLY these top-level keys, each matching this exact shape:
${shapeLines.join("\n")}

Use compact JSON — no unnecessary whitespace.
`.trim();

  const text = await callGemini(PARSE_MODEL, [{ text: prompt }], {
    thinkingLevel: PARSE_THINKING_LEVEL,
  });

  const raw = extractJson(text);
  const parsed = recipeFixResponseSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(
      `Gemini's fix response didn't match the expected shape: ${parsed.error.message}`,
    );
  }
  return parsed.data;
}
