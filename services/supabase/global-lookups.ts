// services/supabase/global-lookups.ts
// Reads chef.global_ingredients / global_kitchen_appliances / global_
// utensils — used only to flag names in a recipe that don't exist in
// these tables yet ("new" badge in the review UI). Read-only: adding to
// these tables is a manual step the owner does personally (see the
// original Phase 2 planning conversation) — this code never writes to
// them.
//
// Requires the `chef` schema to also be exposed over the API (Settings →
// API → Exposed schemas), same requirement as `staging` was for 2a/2b.

import { createHenstelSupabaseClient } from "./henstel-client";

export interface GlobalLookupNames {
  ingredientNames: string[];
  applianceNames: string[];
  utensilNames: string[];
}

function normalize(name: string): string {
  return name.trim().toLowerCase();
}

export async function getGlobalLookupNames(): Promise<GlobalLookupNames> {
  const supabase = createHenstelSupabaseClient();
  const chef = supabase.schema("chef");

  const [ingredients, appliances, utensils] = await Promise.all([
    chef.from("global_ingredients").select("ingredient"),
    chef.from("global_kitchen_appliances").select("appliance"),
    chef.from("global_utensils").select("utensil_name"),
  ]);

  if (ingredients.error) {
    throw new Error(
      `getGlobalLookupNames (ingredients): ${ingredients.error.message}`,
    );
  }
  if (appliances.error) {
    throw new Error(
      `getGlobalLookupNames (appliances): ${appliances.error.message}`,
    );
  }
  if (utensils.error) {
    throw new Error(
      `getGlobalLookupNames (utensils): ${utensils.error.message}`,
    );
  }

  return {
    ingredientNames: (ingredients.data ?? []).map((r) =>
      normalize(r.ingredient as string),
    ),
    applianceNames: (appliances.data ?? []).map((r) =>
      normalize(r.appliance as string),
    ),
    utensilNames: (utensils.data ?? []).map((r) =>
      normalize(r.utensil_name as string),
    ),
  };
}

export function isNewName(list: string[], name: string): boolean {
  return !list.includes(normalize(name));
}
