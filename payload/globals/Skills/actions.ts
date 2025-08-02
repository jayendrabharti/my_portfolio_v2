"use server";
import { revalidatePath, revalidateTag } from "next/cache";

export const revalidateSkills = async ({ req: { payload, context } }: any) => {
  if (!context?.disableRevalidate) {
    payload?.logger?.info("Revalidating skills global");
    revalidatePath("/", "layout");
    revalidateTag("skills");
  }
};
