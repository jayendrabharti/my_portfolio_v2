"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export const revalidateApp = async () => {
  revalidatePath("/", "layout");
};
