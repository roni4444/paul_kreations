import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getRecipeDetail, type RecipeRow } from "@/services/supabase/cookbooks";
import {
  markRecipeReviewedAction,
  deleteRecipeAction,
} from "@/server/actions/cookbooks";

export async function RecipeCard({
  recipe,
  cookbookId,
}: {
  recipe: RecipeRow;
  cookbookId: string;
}) {
  const detail = await getRecipeDetail(recipe.id);
  if (!detail) return null;

  const metaParts = [
    detail.servings ? `${detail.servings} servings` : null,
    detail.prep_time ? `${detail.prep_time}m prep` : null,
    detail.cook_time ? `${detail.cook_time}m cook` : null,
  ].filter(Boolean);

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>{detail.title}</CardTitle>
          {metaParts.length > 0 && (
            <CardDescription className="mt-1">
              {metaParts.join(" · ")}
            </CardDescription>
          )}
        </div>
        <span
          className={`shrink-0 rounded-[4px] px-2 py-1 font-mono text-xs tracking-wide uppercase ${
            detail.status === "reviewed"
              ? "bg-[#eaf3de] text-[#3b6d11]"
              : "bg-[#fff5f5] text-[#9e0027]"
          }`}
        >
          {detail.status}
        </span>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {detail.ingredients.length > 0 && (
          <div>
            <p className="font-mono text-xs tracking-wide text-[#8f6f6f] uppercase">
              Ingredients
            </p>
            <ul className="mt-1 text-sm text-[#111c2d]">
              {detail.ingredients.map((ing) => (
                <li key={ing.id}>
                  {ing.quantity} {ing.unit} {ing.name}
                  <span className="text-[#8f6f6f]"> — {ing.category}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {detail.instructions.length > 0 && (
          <div>
            <p className="font-mono text-xs tracking-wide text-[#8f6f6f] uppercase">
              Instructions
            </p>
            <ol className="mt-1 list-decimal pl-5 text-sm text-[#111c2d]">
              {detail.instructions.map((step) => (
                <li key={step.id}>
                  <span className="text-[#8f6f6f]">[{step.type}]</span>{" "}
                  {step.instruction}
                </li>
              ))}
            </ol>
          </div>
        )}

        {(detail.utensils.length > 0 || detail.appliances.length > 0) && (
          <div>
            <p className="font-mono text-xs tracking-wide text-[#8f6f6f] uppercase">
              Equipment
            </p>
            <p className="mt-1 text-sm text-[#111c2d]">
              {[
                ...detail.utensils.map((u) => u.name),
                ...detail.appliances.map((a) => a.name),
              ].join(", ")}
            </p>
          </div>
        )}

        <div className="flex gap-2">
          {detail.status !== "reviewed" && (
            <form
              action={markRecipeReviewedAction.bind(
                null,
                recipe.id,
                cookbookId,
              )}
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
      </CardContent>
    </Card>
  );
}
