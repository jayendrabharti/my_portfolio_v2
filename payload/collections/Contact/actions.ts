"use server";

import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload";
import { revalidatePath, revalidateTag } from "next/cache";
import { getPayloadInstance } from "@/payload";
import nodemailer from "nodemailer";

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
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: `Contact Form Submission by ${email}`,
      html: `
        <p><strong>Name:</strong> ${name ?? "N/A"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <p>This message was sent from the contact form on your website.</p>`,
    });

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
