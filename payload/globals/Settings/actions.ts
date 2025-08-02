"use server";
import { revalidatePath, revalidateTag } from "next/cache";

export const revalidateSettings = async ({
  req: { payload, context },
}: any) => {
  if (!context?.disableRevalidate) {
    payload?.logger?.info("Revalidating settings global");
    revalidatePath("/", "layout");
    revalidateTag("settings");
  }
};
