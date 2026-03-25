"use server";
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload";
import { revalidatePath, revalidateTag } from "next/cache";

export const revalidateEducation: CollectionAfterChangeHook<any> = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === "published") {
      payload.logger.info(
        `Revalidating published education: ${doc.schoolName} - ${doc.course}`
      );
      revalidatePath("/");
      revalidateTag("education");
    }

    if (previousDoc?._status === "published" && doc._status !== "published") {
      payload.logger.info(
        `Revalidating unpublished education: ${previousDoc.schoolName} - ${previousDoc.course}`
      );
      revalidatePath("/");
      revalidateTag("education");
    }
  }
  return doc;
};

export const revalidateEducationDelete: CollectionAfterDeleteHook<
  any
> = async ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(
      `Revalidating deleted education: ${doc?.schoolName} - ${doc?.course}`
    );
    revalidatePath("/");
    revalidateTag("education");
  }
  return doc;
};
