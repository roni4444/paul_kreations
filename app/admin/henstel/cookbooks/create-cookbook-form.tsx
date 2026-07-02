"use client";

import { useActionState } from "react";
import {
  createCookbookAction,
  type CookbookFormState,
} from "@/server/actions/cookbooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const initialState: CookbookFormState = { status: "idle" };

export function CreateCookbookForm() {
  const [state, formAction, isPending] = useActionState(
    createCookbookAction,
    initialState,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>New cookbook</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="title"
                className="font-mono text-xs tracking-wide text-[#8f6f6f] uppercase"
              >
                Title
              </Label>
              <Input
                id="title"
                name="title"
                required
                className="rounded-[4px] border-[#e3bebd]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="difficultyLevel"
                className="font-mono text-xs tracking-wide text-[#8f6f6f] uppercase"
              >
                Difficulty
              </Label>
              <Input
                id="difficultyLevel"
                name="difficultyLevel"
                placeholder="Easy / Medium / Hard"
                className="rounded-[4px] border-[#e3bebd]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="description"
              className="font-mono text-xs tracking-wide text-[#8f6f6f] uppercase"
            >
              Description
            </Label>
            <Input
              id="description"
              name="description"
              className="rounded-[4px] border-[#e3bebd]"
            />
          </div>

          <div className="flex max-w-[160px] flex-col gap-1.5">
            <Label
              htmlFor="price"
              className="font-mono text-xs tracking-wide text-[#8f6f6f] uppercase"
            >
              Price
            </Label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              className="rounded-[4px] border-[#e3bebd]"
            />
          </div>

          {state.status === "error" && (
            <p role="alert" className="text-sm text-[#9e0027]">
              {state.message}
            </p>
          )}

          <Button
            type="submit"
            disabled={isPending}
            className="h-9 w-fit rounded-[4px] bg-[#c41e3a] text-white hover:bg-[#9e0027]"
          >
            {isPending ? "Creating…" : "Create cookbook"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
