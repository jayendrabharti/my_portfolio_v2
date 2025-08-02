"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export const revalidateProfile = async ({ req: { payload, context } }: any) => {
  if (!context?.disableRevalidate) {
    payload?.logger?.info("Revalidating profile global");
    revalidatePath("/", "layout");
    revalidateTag("profile");
  }
};
