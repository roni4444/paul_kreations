import { notFound } from "next/navigation";
import { getCookbook, listRecipeDetails } from "@/services/supabase/cookbooks";
import { getGlobalLookupNames } from "@/services/supabase/global-lookups";
import { UploadPdfFlow } from "./upload-pdf-flow";
import { RecipeAccordion } from "./recipe-accordion";
import { RecipePanel } from "./recipe-panel";
import {
  markCookbookReviewedAction,
  deleteCookbookAction,
} from "@/server/actions/cookbooks";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Cookbook" };

export default async function CookbookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cookbook = await getCookbook(id);
  if (!cookbook) notFound();

  const [recipes, lookups] = await Promise.all([
    listRecipeDetails(id),
    getGlobalLookupNames(),
  ]);

  return (
    <div className="mx-auto max-w-[760px] px-6 py-16">
      <p className="font-mono text-xs tracking-wide text-[#8f6f6f] uppercase">
        Henstel admin — cookbook
      </p>
      <div className="mt-1 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#111c2d]">
            {cookbook.title}
          </h1>
          {cookbook.description && (
            <p className="mt-1 text-sm text-[#5f5e5e]">
              {cookbook.description}
            </p>
          )}
        </div>
        <span
          className={`shrink-0 rounded-[4px] px-2 py-1 font-mono text-xs tracking-wide uppercase ${
            cookbook.status === "reviewed"
              ? "bg-[#eaf3de] text-[#3b6d11]"
              : "bg-[#fff5f5] text-[#9e0027]"
          }`}
        >
          {cookbook.status}
        </span>
      </div>

      <div className="mt-4 flex gap-3">
        {cookbook.status !== "reviewed" && (
          <form action={markCookbookReviewedAction.bind(null, cookbook.id)}>
            <Button
              type="submit"
              className="h-8 rounded-[4px] bg-[#c41e3a] text-white hover:bg-[#9e0027]"
            >
              Mark cookbook reviewed
            </Button>
          </form>
        )}
        <form action={deleteCookbookAction.bind(null, cookbook.id)}>
          <Button type="submit" variant="outline" className="h-8 rounded-[4px]">
            Delete cookbook
          </Button>
        </form>
      </div>

      <div className="mt-10">
        <h2 className="text-sm font-semibold text-[#111c2d]">Upload a PDF</h2>
        <p className="mt-1 text-sm text-[#5f5e5e]">
          Gemini detects and extracts every recipe in the document.
        </p>
        <div className="mt-4">
          <UploadPdfFlow cookbookId={cookbook.id} />
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-sm font-semibold text-[#111c2d]">
          Recipes ({recipes.length})
        </h2>
        <p className="mt-1 text-sm text-[#5f5e5e]">
          Tap a recipe to expand. Others collapse automatically.
        </p>
        <div className="mt-4">
          {recipes.length > 0 ? (
            <RecipeAccordion
              recipes={recipes}
              panels={recipes.map((recipe) => (
                <RecipePanel
                  key={recipe.id}
                  recipe={recipe}
                  cookbookId={cookbook.id}
                  lookups={lookups}
                />
              ))}
            />
          ) : (
            <p className="text-sm text-[#5f5e5e]">
              No recipes yet — upload a PDF above.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
