"use server";

import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload";
import { revalidatePath, revalidateTag } from "next/cache";
import { getPayloadInstance } from "@/payload";

export const revalidateContact: CollectionAfterChangeHook<any> = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating contact form submission: ${doc.email}`);
    revalidatePath("/contact-me");
    revalidateTag("contact");
  }
  return doc;
};

export const revalidateContactDelete: CollectionAfterDeleteHook<any> = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating deleted contact: ${doc?.email}`);
    revalidatePath("/contact-me");
    revalidateTag("contact");
  }
  return doc;
};

export const createMessageAction = async ({
  email,
  name,
  subject,
  message,
}: {
  email: string;
  name?: string;
  subject: string;
  message: string;
}) => {
  try {
    const payload = await getPayloadInstance();
    await payload.create({
      collection: "contact",
      data: {
        email,
        name,
        subject,
        message,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Error creating message:", error);
    return { success: false, error: "Failed to send message" };
  }
};
