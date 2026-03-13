"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  BriefcaseBusinessIcon,
  CheckCheckIcon,
  Clock3Icon,
  Send,
  SparklesIcon,
} from "lucide-react";
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
  const [submissionError, setSubmissionError] = useState<string | null>(null);

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
    { resetForm }: FormikHelpers,
  ) => {
    setSubmissionError(null);

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
        setSubmissionError(
          "Could not send your message. Please try again in a moment.",
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmissionError(
        "Could not send your message. Please try again in a moment.",
      );
    }
  };

  if (sent) {
    return (
      <section className="mx-auto flex w-full max-w-5xl px-4 py-12">
        <div className="ambient-panel mx-auto w-full max-w-2xl p-8 text-center sm:p-10">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/15 text-emerald-500">
            <CheckCheckIcon className="h-11 w-11" />
          </div>
          <h1 className="display-title text-3xl font-extrabold sm:text-4xl">
            Message Sent
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-balance text-muted-foreground">
            Thanks for reaching out. I will get back to you shortly with next
            steps.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link href="/">
              <Button className="rounded-full px-5 font-semibold">
                Back To Home
              </Button>
            </Link>
            <Link href="/projects">
              <Button
                variant="outline"
                className="rounded-full px-5 font-semibold"
              >
                Browse Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-12">
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="ambient-panel p-6 sm:p-8">
          <span className="soft-outline inline-flex px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Contact
          </span>
          <h1 className="display-title mt-4 text-3xl font-extrabold sm:text-4xl">
            Let&apos;s Build Something Great
          </h1>
          <p className="mt-3 text-balance text-sm text-muted-foreground sm:text-base">
            Looking for someone to build a product, refine your UI, or improve
            performance? Share your goals and I&apos;ll reply as soon as
            possible.
          </p>

          <div className="mt-6 space-y-3">
            <div className="flex items-start gap-2 rounded-2xl border border-border/70 bg-background/65 p-3">
              <SparklesIcon className="mt-0.5 h-4 w-4 text-primary" />
              <p className="text-sm text-muted-foreground">
                Modern, high-conversion web UI with thoughtful interaction
                design.
              </p>
            </div>
            <div className="flex items-start gap-2 rounded-2xl border border-border/70 bg-background/65 p-3">
              <BriefcaseBusinessIcon className="mt-0.5 h-4 w-4 text-primary" />
              <p className="text-sm text-muted-foreground">
                Frontend architecture built for maintainability and speed.
              </p>
            </div>
            <div className="flex items-start gap-2 rounded-2xl border border-border/70 bg-background/65 p-3">
              <Clock3Icon className="mt-0.5 h-4 w-4 text-primary" />
              <p className="text-sm text-muted-foreground">
                Typical response time: within 24-48 hours.
              </p>
            </div>
          </div>
        </div>

        <div className="ambient-panel p-6 sm:p-8">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-foreground/85"
                  >
                    Your Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="block w-full rounded-xl border border-border bg-background/75 p-3 text-sm text-foreground placeholder:text-muted-foreground/80 outline-none transition-colors focus:border-primary"
                    placeholder="you@example.com"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="mt-1 text-xs text-red-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-foreground/85"
                  >
                    Name / Team
                  </label>
                  <Field
                    type="text"
                    name="name"
                    className="block w-full rounded-xl border border-border bg-background/75 p-3 text-sm text-foreground placeholder:text-muted-foreground/80 outline-none transition-colors focus:border-primary"
                    placeholder="Your name or company"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="mt-1 text-xs text-red-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-semibold text-foreground/85"
                  >
                    Project Type
                  </label>
                  <Field
                    type="text"
                    name="subject"
                    className="block w-full rounded-xl border border-border bg-background/75 p-3 text-sm text-foreground placeholder:text-muted-foreground/80 outline-none transition-colors focus:border-primary"
                    placeholder="Landing page, dashboard, redesign, etc."
                  />
                  <ErrorMessage
                    name="subject"
                    component="div"
                    className="mt-1 text-xs text-red-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-semibold text-foreground/85"
                  >
                    Message
                  </label>
                  <Field
                    as="textarea"
                    name="message"
                    rows="6"
                    className="block w-full rounded-xl border border-border bg-background/75 p-3 text-sm text-foreground placeholder:text-muted-foreground/80 outline-none transition-colors focus:border-primary"
                    placeholder="Tell me about your goals, timeline, and what success looks like."
                  />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="mt-1 text-xs text-red-500"
                  />
                </div>

                {submissionError && (
                  <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-300">
                    {submissionError}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-11 w-full rounded-full font-semibold shadow-md shadow-primary/25"
                >
                  {isSubmitting ? "Sending message..." : "Send message"}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
}
