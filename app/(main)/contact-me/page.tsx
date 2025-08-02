"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CheckCheckIcon, Send } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { createMessageAction } from "@/payload/collections/Contact/actions";
import { Button } from "@/components/ui/button";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  name: Yup.string().required("Required"),
  subject: Yup.string().required("Required"),
  message: Yup.string().required("Required"),
  isRead: Yup.boolean(),
});

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const initialValues = {
    email: "",
    name: "",
    subject: "",
    message: "",
  };

  interface ContactFormValues {
    email: string;
    name: string;
    subject: string;
    message: string;
  }

  interface FormikHelpers {
    resetForm: () => void;
  }

  const handleSubmit = async (
    values: ContactFormValues,
    { resetForm }: FormikHelpers
  ) => {
    try {
      const result = await createMessageAction({
        name: values.name,
        email: values.email,
        subject: values.subject,
        message: values.message,
      });

      if (result.success) {
        resetForm();
        setSent(true);
      } else {
        alert("Failed to send message! Please refresh and try again.");
        resetForm();
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message! Please refresh and try again.");
      resetForm();
    }
  };

  if (sent)
    return (
      <div className="w-full h-full flex items-center justify-center flex-col text-green-500 gap-2">
        <CheckCheckIcon className="size-20" />
        <span className="text-2xl font-bold">
          Message was sent successfully!!
        </span>

        <Link
          href={"/"}
          className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-black dark:text-white inline-block active:scale-75 transition-all duration-200"
        >
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </span>
          <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-300 dark:bg-zinc-900 py-0.5 px-4 ring-1 ring-white/10 ">
            <span>Go to Homepage</span>
            <svg
              fill="none"
              height="16"
              viewBox="0 0 24 24"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.75 8.75L14.25 12L10.75 15.25"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
        </Link>
      </div>
    );

  return (
    <section>
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-2xl md:text-4xl font-extrabold text-center text-zinc-800 dark:text-zinc-100">
          Contact Me
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-zinc-600 dark:text-zinc-400 sm:text-xl">
          Want a website/webapp made? Contact me and i will respond as soon as i
          can.
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-8">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Your email
                </label>
                <Field
                  type="email"
                  name="email"
                  className="shadow-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm rounded-lg block w-full p-2.5 placeholder-zinc-400 dark:placeholder-zinc-500"
                  placeholder="Your E-mail Address"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Your Name & other information
                </label>
                <Field
                  type="text"
                  name="name"
                  className="shadow-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm rounded-lg block w-full p-2.5 placeholder-zinc-400 dark:placeholder-zinc-500"
                  placeholder="Enter your Name & other information"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Subject
                </label>
                <Field
                  type="text"
                  name="subject"
                  className="shadow-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm rounded-lg block w-full p-2.5 placeholder-zinc-400 dark:placeholder-zinc-500"
                  placeholder="How can we assist you?"
                />
                <ErrorMessage
                  name="subject"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Your message
                </label>
                <Field
                  as="textarea"
                  name="message"
                  rows="6"
                  className="shadow-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm rounded-lg block w-full p-2.5 placeholder-zinc-400 dark:placeholder-zinc-500"
                  placeholder="Leave a message..."
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending message ..." : "Send message"}
                <Send className="transition-all duration-300 ml-2 group-hover:ml-5" />
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
