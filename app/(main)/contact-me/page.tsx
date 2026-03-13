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
    { resetForm }: FormikHelpers,
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
      <div className="w-full h-[calc(100vh-200px)] flex flex-col items-center justify-center p-4">
        <div className="border-[3px] border-border bg-background p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] flex flex-col items-center gap-6 relative overflow-hidden group">
          <div className="absolute inset-0 diagonal-pattern opacity-10 pointer-events-none" />
          <CheckCheckIcon className="size-20 relative z-10 text-primary" />
          <span className="text-2xl md:text-3xl font-black uppercase tracking-widest text-center relative z-10">
            TRANSMISSION SECURED
          </span>
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase text-center relative z-10">
            Your message has been successfully submitted.
          </p>
          <Link
            href="/"
            className="mt-4 relative z-10 border-2 border-border bg-primary text-primary-foreground px-8 py-4 font-mono font-bold text-sm tracking-widest uppercase hover:-translate-y-[2px] hover:-translate-x-[2px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] transition-all"
          >
            RETURN TO HUB
          </Link>
        </div>
      </div>
    );

  return (
    <section className="flex flex-col gap-0 py-8 px-4 rail-bounded min-h-[calc(100vh-200px)]">
      <div className="border-[3px] border-border bg-background p-8 md:p-12 mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] relative overflow-hidden">
        <div className="absolute inset-0 diagonal-pattern opacity-10 pointer-events-none" />
        <h2 className="relative z-10 text-4xl md:text-6xl font-black tracking-tighter uppercase">
          CONTACT
        </h2>
        <p className="relative z-10 font-mono text-sm mt-4 tracking-widest text-muted-foreground uppercase max-w-lg">
          INITIATE A DIRECT SECURE CONNECTION.
        </p>
      </div>

      <div className="border-2 border-border p-8 bg-background relative">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6 flex flex-col font-mono text-sm uppercase font-bold tracking-widest">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-foreground">
                  IDENTIFIER: E-MAIL
                </label>
                <Field
                  type="email"
                  name="email"
                  className="border-2 border-border bg-background p-4 outline-none focus:ring-2 focus:ring-primary transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] placeholder:text-muted-foreground placeholder:font-normal"
                  placeholder="name@domain.com"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1 bg-red-500/10 border border-red-500 p-2"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-foreground">
                  IDENTIFIER: NAME
                </label>
                <Field
                  type="text"
                  name="name"
                  className="border-2 border-border bg-background p-4 outline-none focus:ring-2 focus:ring-primary transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] placeholder:text-muted-foreground placeholder:font-normal"
                  placeholder="JOHN DOE"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-xs mt-1 bg-red-500/10 border border-red-500 p-2"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-foreground">
                  COMMUNICATION SUBJECT
                </label>
                <Field
                  type="text"
                  name="subject"
                  className="border-2 border-border bg-background p-4 outline-none focus:ring-2 focus:ring-primary transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] placeholder:text-muted-foreground placeholder:font-normal"
                  placeholder="PROPOSAL DETAILS"
                />
                <ErrorMessage
                  name="subject"
                  component="div"
                  className="text-red-500 text-xs mt-1 bg-red-500/10 border border-red-500 p-2"
                />
              </div>

              <div className="flex flex-col gap-2 sm:col-span-2">
                <label htmlFor="message" className="text-foreground">
                  PAYLOAD
                </label>
                <Field
                  as="textarea"
                  name="message"
                  rows={6}
                  className="border-2 border-border bg-background p-4 outline-none focus:ring-2 focus:ring-primary transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] placeholder:text-muted-foreground placeholder:font-normal resize-none"
                  placeholder="TRANSMIT MESSAGE HERE..."
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-red-500 text-xs mt-1 bg-red-500/10 border border-red-500 p-2"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 border-2 border-border !rounded-none bg-primary text-primary-foreground p-6 font-mono font-bold text-sm tracking-widest uppercase hover:-translate-y-[2px] hover:-translate-x-[2px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] transition-all flex items-center justify-center gap-4 w-full sm:w-auto self-start"
              >
                {isSubmitting ? "TRANSMITTING..." : "DISPATCH TRANSMISSION"}
                <Send className="w-5 h-5" />
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
