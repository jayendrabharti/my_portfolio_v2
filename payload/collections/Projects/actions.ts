"use server";
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload";
import { revalidatePath, revalidateTag } from "next/cache";

export const revalidateProject: CollectionAfterChangeHook<any> = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === "published") {
      payload.logger.info(`Revalidating published project: ${doc.title}`);
      revalidatePath("/projects");
      revalidatePath("/");
      revalidateTag("projects-sitemap");
    }

    if (previousDoc?._status === "published" && doc._status !== "published") {
      payload.logger.info(
        `Revalidating unpublished project: ${previousDoc.title}`
      );
      revalidatePath("/projects");
      revalidatePath("/");
      revalidateTag("projects-sitemap");
    }
  }
  return doc;
};

export const revalidateProjectDelete: CollectionAfterDeleteHook<any> = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating deleted project: ${doc?.title}`);
    revalidatePath("/projects");
    revalidatePath("/");
    revalidateTag("projects-sitemap");
  }
  return doc;
};
