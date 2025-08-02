"use server";
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload";
import { revalidatePath, revalidateTag } from "next/cache";

export const revalidateWorkExperience: CollectionAfterChangeHook<any> = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === "published") {
      payload.logger.info(
        `Revalidating published work experience: ${doc.companyName} - ${doc.position}`
      );
      revalidatePath("/");
      revalidateTag("work-experience");
    }

    if (previousDoc?._status === "published" && doc._status !== "published") {
      payload.logger.info(
        `Revalidating unpublished work experience: ${previousDoc.companyName} - ${previousDoc.position}`
      );
      revalidatePath("/");
      revalidateTag("work-experience");
    }
  }
  return doc;
};

export const revalidateWorkExperienceDelete: CollectionAfterDeleteHook<
  any
> = async ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(
      `Revalidating deleted work experience: ${doc?.companyName} - ${doc?.position}`
    );
    revalidatePath("/");
    revalidateTag("work-experience");
  }
  return doc;
};
