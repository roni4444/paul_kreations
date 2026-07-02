"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { RecipeDetail } from "@/services/supabase/cookbooks";
import type { GlobalLookupNames } from "@/services/supabase/global-lookups";
import { isNewName } from "@/services/supabase/global-lookups";
import {
  markRecipeReviewedAction,
  deleteRecipeAction,
  fixRecipeWithAiAction,
} from "@/server/actions/cookbooks";
import { RecipeEditForm } from "./recipe-edit-form";

function NewBadge() {
  return (
    <span className="ml-1.5 rounded-[4px] bg-[#c41e3a] px-1.5 py-0.5 align-middle font-mono text-[10px] tracking-wide text-white uppercase">
      New
    </span>
  );
}

export function RecipePanel({
  recipe,
  cookbookId,
  lookups,
}: {
  recipe: RecipeDetail;
  cookbookId: string;
  lookups: GlobalLookupNames;
}) {
  const router = useRouter();
  const [mode, setMode] = useState<"view" | "edit">("view");
  const [fixing, setFixing] = useState(false);
  const [fixMessage, setFixMessage] = useState<string | null>(null);

  const metaParts = [
    recipe.servings ? `${recipe.servings} servings` : null,
    recipe.prep_time ? `${recipe.prep_time}m prep` : null,
    recipe.cook_time ? `${recipe.cook_time}m cook` : null,
  ].filter(Boolean);

  const protectedSections = recipe.manually_edited_sections;
  const allProtected = protectedSections.length === 5;

  async function handleFixWithAi() {
    setFixing(true);
    setFixMessage(null);

    const result = await fixRecipeWithAiAction(recipe.id, cookbookId);

    setFixing(false);
    if (result.status === "nothing_to_fix") {
      setFixMessage(result.message ?? "Nothing left to fix.");
      return;
    }
    if (result.status === "error") {
      setFixMessage(`Error: ${result.message}`);
      return;
    }
    setFixMessage(
      `Fixed: ${(result.fixedSections ?? []).join(", ")}.${
        protectedSections.length > 0
          ? ` (${protectedSections.join(", ")} protected — manually edited.)`
          : ""
      }`,
    );
    router.refresh();
  }

  if (mode === "edit") {
    return (
      <RecipeEditForm
        recipe={recipe}
        cookbookId={cookbookId}
        onSaved={() => {
          setMode("view");
          router.refresh();
        }}
        onCancel={() => setMode("view")}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {(recipe.description || metaParts.length > 0) && (
        <div>
          {recipe.description && (
            <p className="text-sm text-[#5f5e5e]">{recipe.description}</p>
          )}
          {metaParts.length > 0 && (
            <p className="mt-1 font-mono text-xs tracking-wide text-[#8f6f6f] uppercase">
              {metaParts.join(" · ")}
            </p>
          )}
        </div>
      )}

      {recipe.ingredients.length > 0 && (
        <div>
          <p className="font-mono text-xs tracking-wide text-[#8f6f6f] uppercase">
            Ingredients
          </p>
          <ul className="mt-1 text-sm text-[#111c2d]">
            {recipe.ingredients.map((ing) => (
              <li key={ing.id}>
                {ing.quantity} {ing.unit} {ing.name}
                <span className="text-[#8f6f6f]"> — {ing.category}</span>
                {isNewName(lookups.ingredientNames, ing.name) && <NewBadge />}
              </li>
            ))}
          </ul>
        </div>
      )}

      {recipe.instructions.length > 0 && (
        <div>
          <p className="font-mono text-xs tracking-wide text-[#8f6f6f] uppercase">
            Instructions
          </p>
          <ol className="mt-1 list-decimal pl-5 text-sm text-[#111c2d]">
            {recipe.instructions.map((step) => (
              <li key={step.id}>
                <span className="text-[#8f6f6f]">[{step.type}]</span>{" "}
                {step.instruction}
              </li>
            ))}
          </ol>
        </div>
      )}

      {(recipe.utensils.length > 0 || recipe.appliances.length > 0) && (
        <div>
          <p className="font-mono text-xs tracking-wide text-[#8f6f6f] uppercase">
            Equipment
          </p>
          <p className="mt-1 text-sm text-[#111c2d]">
            {recipe.utensils.map((u, i) => (
              <span key={u.id}>
                {i > 0 && ", "}
                {u.name}
                {isNewName(lookups.utensilNames, u.name) && <NewBadge />}
              </span>
            ))}
            {recipe.utensils.length > 0 && recipe.appliances.length > 0 && ", "}
            {recipe.appliances.map((a, i) => (
              <span key={a.id}>
                {i > 0 && ", "}
                {a.name}
                {isNewName(lookups.applianceNames, a.name) && <NewBadge />}
              </span>
            ))}
          </p>
        </div>
      )}

      {protectedSections.length > 0 && (
        <p className="text-xs text-[#8f6f6f]">
          Manually edited: {protectedSections.join(", ")} — protected from Fix
          with AI.
        </p>
      )}

      {fixMessage && <p className="text-sm text-[#5f5e5e]">{fixMessage}</p>}

      <div className="flex flex-wrap gap-2">
        {recipe.status !== "reviewed" && (
          <form
            action={markRecipeReviewedAction.bind(null, recipe.id, cookbookId)}
          >
            <Button
              type="submit"
              size="sm"
              className="h-7 rounded-[4px] bg-[#c41e3a] text-white hover:bg-[#9e0027]"
            >
              Mark reviewed
            </Button>
          </form>
        )}

        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => setMode("edit")}
          className="h-7 rounded-[4px]"
        >
          Edit
        </Button>

        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={handleFixWithAi}
          disabled={fixing || allProtected}
          title={
            allProtected ? "Every section has been manually edited" : undefined
          }
          className="h-7 rounded-[4px]"
        >
          <Sparkles size={13} className="mr-1" />
          {fixing ? "Fixing…" : "Fix with AI"}
        </Button>

        <form action={deleteRecipeAction.bind(null, recipe.id, cookbookId)}>
          <Button
            type="submit"
            size="sm"
            variant="outline"
            className="h-7 rounded-[4px]"
          >
            Delete
          </Button>
        </form>
      </div>
    </div>
  );
}
