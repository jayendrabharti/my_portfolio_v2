"use server";
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload";
import { revalidatePath, revalidateTag } from "next/cache";
import getPayloadInstance from "@/payload";

export const getViewCount = async (blogSlug: string, increment = false) => {
  let views: number = 0;

  const payload = await getPayloadInstance();

  const {
    docs: [blog],
  } = await payload.find({
    collection: "blogs",
    where: {
      slug: {
        equals: blogSlug,
      },
    },
  });

  views = blog?.views || 0;

  if (increment) {
    await payload.update({
      collection: "blogs",
      id: blog.id,
      data: {
        views: views + 1,
      },
    });

    views += 1;
  }

  return views;
};

export const revalidateBlog: CollectionAfterChangeHook<any> = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === "published") {
      const path = `/blogs/${doc.slug}`;
      payload.logger.info(`Revalidating blog at path: ${path}`);
      revalidatePath(path);
      revalidatePath("/blogs");
      revalidatePath("/");
      revalidateTag("blogs-sitemap");
    }

    if (previousDoc._status === "published" && doc._status !== "published") {
      const oldPath = `/blogs/${previousDoc.slug}`;
      payload.logger.info(`Revalidating old blog at path: ${oldPath}`);
      revalidatePath(oldPath);
      revalidatePath("/blogs");
      revalidatePath("/");
      revalidateTag("blogs-sitemap");
    }
  }
  return doc;
};

export const revalidateBlogDelete: CollectionAfterDeleteHook<any> = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/blogs/${doc?.slug}`;
    payload.logger.info(`Revalidating deleted blog at path: ${path}`);
    revalidatePath(path);
    revalidatePath("/blogs");
    revalidatePath("/");
    revalidateTag("blogs-sitemap");
  }
  return doc;
};
