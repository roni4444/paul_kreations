"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { updateRecipeAction } from "@/server/actions/cookbooks";
import type { RecipeDetail } from "@/services/supabase/cookbooks";
import type { RecipeSection } from "@/schemas/recipe";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const INSTRUCTION_TYPES = ["Prepare", "Cook", "Mix", "Serve", "Wait"] as const;

interface IngredientRow {
  name: string;
  quantity: number;
  unit: string;
  category: string;
}
interface InstructionRow {
  instruction: string;
  type: (typeof INSTRUCTION_TYPES)[number];
  min_time: number;
  max_time: number | null;
}

function parseNameList(text: string): { name: string }[] {
  return text
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((name) => ({ name }));
}

export function RecipeEditForm({
  recipe,
  cookbookId,
  onSaved,
  onCancel,
}: {
  recipe: RecipeDetail;
  cookbookId: string;
  onSaved: () => void;
  onCancel: () => void;
}) {
  const [touched, setTouched] = useState<Set<RecipeSection>>(new Set());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description ?? "");
  const [prepTime, setPrepTime] = useState(recipe.prep_time?.toString() ?? "");
  const [cookTime, setCookTime] = useState(recipe.cook_time?.toString() ?? "");
  const [servings, setServings] = useState(recipe.servings?.toString() ?? "");

  const [ingredients, setIngredients] = useState<IngredientRow[]>(
    recipe.ingredients.map(({ name, quantity, unit, category }) => ({
      name,
      quantity,
      unit,
      category,
    })),
  );

  const [instructions, setInstructions] = useState<InstructionRow[]>(
    recipe.instructions.map(({ instruction, type, min_time, max_time }) => ({
      instruction,
      type: type as InstructionRow["type"],
      min_time,
      max_time,
    })),
  );

  const [utensilsText, setUtensilsText] = useState(
    recipe.utensils.map((u) => u.name).join(", "),
  );
  const [appliancesText, setAppliancesText] = useState(
    recipe.appliances.map((a) => a.name).join(", "),
  );

  function markTouched(section: RecipeSection) {
    setTouched((prev) => {
      if (prev.has(section)) return prev;
      const next = new Set(prev);
      next.add(section);
      return next;
    });
  }

  function updateIngredient(index: number, patch: Partial<IngredientRow>) {
    setIngredients((rows) =>
      rows.map((r, i) => (i === index ? { ...r, ...patch } : r)),
    );
    markTouched("ingredients");
  }
  function addIngredient() {
    setIngredients((rows) => [
      ...rows,
      { name: "", quantity: 0, unit: "", category: "" },
    ]);
    markTouched("ingredients");
  }
  function removeIngredient(index: number) {
    setIngredients((rows) => rows.filter((_, i) => i !== index));
    markTouched("ingredients");
  }

  function updateInstruction(index: number, patch: Partial<InstructionRow>) {
    setInstructions((rows) =>
      rows.map((r, i) => (i === index ? { ...r, ...patch } : r)),
    );
    markTouched("instructions");
  }
  function addInstruction() {
    setInstructions((rows) => [
      ...rows,
      { instruction: "", type: "Cook", min_time: 0, max_time: null },
    ]);
    markTouched("instructions");
  }
  function removeInstruction(index: number) {
    setInstructions((rows) => rows.filter((_, i) => i !== index));
    markTouched("instructions");
  }

  async function handleSave() {
    setSaving(true);
    setError(null);

    const payload = {
      details: {
        title,
        description: description || undefined,
        prep_time: prepTime ? Number(prepTime) : undefined,
        cook_time: cookTime ? Number(cookTime) : undefined,
        servings: servings ? Number(servings) : undefined,
      },
      ingredients,
      instructions,
      utensils: parseNameList(utensilsText),
      appliances: parseNameList(appliancesText),
    };

    const result = await updateRecipeAction(
      recipe.id,
      cookbookId,
      payload,
      Array.from(touched),
    );

    setSaving(false);
    if (result.status === "error") {
      setError(result.message ?? "Couldn't save changes.");
      return;
    }
    onSaved();
  }

  const inputClass = "rounded-[4px] border-[#e3bebd] text-sm";
  const labelClass = "font-mono text-xs tracking-wide text-[#8f6f6f] uppercase";

  return (
    <div className="flex flex-col gap-6">
      {/* Details */}
      <div className="flex flex-col gap-3">
        <p className={labelClass}>Details</p>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`title-${recipe.id}`} className={labelClass}>
            Title
          </Label>
          <Input
            id={`title-${recipe.id}`}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              markTouched("details");
            }}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`description-${recipe.id}`} className={labelClass}>
            Description
          </Label>
          <Input
            id={`description-${recipe.id}`}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              markTouched("details");
            }}
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col gap-1.5">
            <Label className={labelClass}>Prep (min)</Label>
            <Input
              type="number"
              value={prepTime}
              onChange={(e) => {
                setPrepTime(e.target.value);
                markTouched("details");
              }}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className={labelClass}>Cook (min)</Label>
            <Input
              type="number"
              value={cookTime}
              onChange={(e) => {
                setCookTime(e.target.value);
                markTouched("details");
              }}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className={labelClass}>Servings</Label>
            <Input
              type="number"
              value={servings}
              onChange={(e) => {
                setServings(e.target.value);
                markTouched("details");
              }}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Ingredients */}
      <div className="flex flex-col gap-2">
        <p className={labelClass}>Ingredients</p>
        {ingredients.map((ing, i) => (
          <div
            key={i}
            className="grid grid-cols-[1fr_70px_70px_1fr_28px] gap-2"
          >
            <Input
              placeholder="Name"
              value={ing.name}
              onChange={(e) => updateIngredient(i, { name: e.target.value })}
              className={inputClass}
            />
            <Input
              type="number"
              placeholder="Qty"
              value={ing.quantity}
              onChange={(e) =>
                updateIngredient(i, { quantity: Number(e.target.value) })
              }
              className={inputClass}
            />
            <Input
              placeholder="Unit"
              value={ing.unit}
              onChange={(e) => updateIngredient(i, { unit: e.target.value })}
              className={inputClass}
            />
            <Input
              placeholder="Category"
              value={ing.category}
              onChange={(e) =>
                updateIngredient(i, { category: e.target.value })
              }
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => removeIngredient(i)}
              aria-label="Remove ingredient"
              className="flex items-center justify-center rounded-[4px] text-[#9e0027] hover:bg-[#fff5f5]"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addIngredient}
          className="h-7 w-fit rounded-[4px]"
        >
          <Plus size={14} className="mr-1" /> Add ingredient
        </Button>
      </div>

      {/* Instructions */}
      <div className="flex flex-col gap-2">
        <p className={labelClass}>Instructions</p>
        {instructions.map((step, i) => (
          <div
            key={i}
            className="grid grid-cols-[1fr_110px_60px_60px_28px] gap-2"
          >
            <Input
              placeholder="Step"
              value={step.instruction}
              onChange={(e) =>
                updateInstruction(i, { instruction: e.target.value })
              }
              className={inputClass}
            />
            <select
              value={step.type}
              onChange={(e) =>
                updateInstruction(i, {
                  type: e.target.value as InstructionRow["type"],
                })
              }
              className="rounded-[4px] border border-[#e3bebd] bg-white px-2 text-sm"
            >
              {INSTRUCTION_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <Input
              type="number"
              placeholder="Min"
              value={step.min_time}
              onChange={(e) =>
                updateInstruction(i, { min_time: Number(e.target.value) })
              }
              className={inputClass}
            />
            <Input
              type="number"
              placeholder="Max"
              value={step.max_time ?? ""}
              onChange={(e) =>
                updateInstruction(i, {
                  max_time: e.target.value ? Number(e.target.value) : null,
                })
              }
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => removeInstruction(i)}
              aria-label="Remove instruction"
              className="flex items-center justify-center rounded-[4px] text-[#9e0027] hover:bg-[#fff5f5]"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addInstruction}
          className="h-7 w-fit rounded-[4px]"
        >
          <Plus size={14} className="mr-1" /> Add step
        </Button>
      </div>

      {/* Equipment */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <Label className={labelClass}>Utensils (comma separated)</Label>
          <Input
            value={utensilsText}
            onChange={(e) => {
              setUtensilsText(e.target.value);
              markTouched("utensils");
            }}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label className={labelClass}>Appliances (comma separated)</Label>
          <Input
            value={appliancesText}
            onChange={(e) => {
              setAppliancesText(e.target.value);
              markTouched("appliances");
            }}
            className={inputClass}
          />
        </div>
      </div>

      {error && (
        <p role="alert" className="text-sm text-[#9e0027]">
          {error}
        </p>
      )}

      {touched.size > 0 && (
        <p className="text-xs text-[#8f6f6f]">
          Changed: {Array.from(touched).join(", ")} — these sections will be
          protected from future Fix with AI runs.
        </p>
      )}

      <div className="flex gap-2">
        <Button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="h-8 rounded-[4px] bg-[#c41e3a] text-white hover:bg-[#9e0027]"
        >
          {saving ? "Saving…" : "Save changes"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={saving}
          className="h-8 rounded-[4px]"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
