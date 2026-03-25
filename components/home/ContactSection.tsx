"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CheckCheckIcon, Send, Mail, Phone } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { BsInstagram, BsTwitterX } from "react-icons/bs";
import { useState } from "react";
import { createMessageAction } from "@/payload/collections/Contact/actions";
import { Button } from "@/components/ui/button";
import RevealHero from "@/components/animations/RevealHero";
import Reveal from "@/components/animations/Reveal";
import Link from "next/link";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  name: Yup.string().required("Required"),
  subject: Yup.string().required("Required"),
  message: Yup.string().required("Required"),
});

interface ContactFormValues {
  email: string;
  name: string;
  subject: string;
  message: string;
}

interface FormikHelpers {
  resetForm: () => void;
}

interface ContactSectionProps {
  email?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  phoneNumber?: string;
  socials?: { name: string; url: string }[] | null;
}

function SocialIconLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      target="_blank"
      className="size-12 border border-border flex items-center justify-center hover:border-foreground hover:bg-foreground hover:text-background transition-all"
    >
      {icon}
    </Link>
  );
}

export default function ContactSection({
  email,
  githubUrl,
  linkedinUrl,
  phoneNumber,
  socials,
}: ContactSectionProps) {
  const [sent, setSent] = useState(false);

  const initialValues = {
    email: "",
    name: "",
    subject: "",
    message: "",
  };

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

  return (
    <section
      id="contact"
      className="flex flex-col gap-8 py-16 px-4 rail-bounded border-x border-border overflow-hidden"
    >
      <div className="flex flex-col gap-2 relative z-10">
        <RevealHero className="text-3xl md:text-5xl font-black uppercase tracking-tight">
          Contact
        </RevealHero>
        <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest max-w-xl">
          Initiate a direct secure connection
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        {/* Contact Info Side */}
        <div className="lg:col-span-5 flex flex-col gap-6 h-full">
          <Reveal className="h-full">
            <div className="border border-border bg-background p-8 h-full flex flex-col gap-10 relative overflow-hidden group">
              <div className="absolute inset-0 diagonal-pattern opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity" />

              <div className="relative z-10 flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                    [ COMMUNICATION_CHANNELS ]
                  </span>
                  <h3 className="text-2xl font-black uppercase tracking-tight">
                    Get in Touch
                  </h3>
                </div>

                <div className="flex flex-col gap-6">
                  {email && (
                    <div className="flex items-center gap-4 group/item">
                      <div className="size-12 border border-border flex items-center justify-center bg-muted/50 group-hover/item:border-primary transition-colors">
                        <Mail className="size-5 text-muted-foreground group-hover/item:text-primary" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          EMAIL
                        </span>
                        <a
                          href={`mailto:${email}`}
                          className="font-mono font-bold text-sm hover:text-primary transition-colors uppercase"
                        >
                          {email}
                        </a>
                      </div>
                    </div>
                  )}

                  {phoneNumber && (
                    <div className="flex items-center gap-4 group/item">
                      <div className="size-12 border border-border flex items-center justify-center bg-muted/50 group-hover/item:border-primary transition-colors">
                        <Phone className="size-5 text-muted-foreground group-hover/item:text-primary" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          PHONE
                        </span>
                        <a
                          href={`tel:${phoneNumber.replace(/\s+/g, "")}`}
                          className="font-mono font-bold text-sm hover:text-primary transition-colors uppercase"
                        >
                          {phoneNumber}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-auto relative z-10 border-t border-border pt-8 flex flex-col gap-4">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  SECURE_NETWORKS
                </span>
                <div className="flex gap-4 flex-wrap">
                  {githubUrl && (
                    <SocialIconLink href={githubUrl} icon={<FaGithub className="size-5" />} />
                  )}
                  {linkedinUrl && (
                    <SocialIconLink href={linkedinUrl} icon={<FaLinkedin className="size-5" />} />
                  )}
                  {socials?.map((social, idx) => {
                    const lowercaseUrl = social.url.toLowerCase();
                    if (lowercaseUrl.includes("instagram.com")) {
                      return (
                        <SocialIconLink
                          key={idx}
                          href={social.url}
                          icon={<BsInstagram className="size-5" />}
                        />
                      );
                    }
                    if (lowercaseUrl.includes("twitter.com") || lowercaseUrl.includes("x.com")) {
                      return (
                        <SocialIconLink
                          key={idx}
                          href={social.url}
                          icon={<BsTwitterX className="size-5" />}
                        />
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Form Side */}
        <div className="lg:col-span-7">
          <Reveal>
            <div className="border border-border bg-background p-8 lg:p-12 relative overflow-hidden">
              <div className="absolute inset-0 diagonal-pattern opacity-10 pointer-events-none" />
              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 gap-6 relative z-10">
                  <CheckCheckIcon className="size-16 text-primary" />
                  <div className="text-center">
                    <span className="text-xl md:text-2xl font-black uppercase tracking-widest block mb-2">
                      TRANSMISSION SECURED
                    </span>
                    <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                      Your message has been successfully submitted.
                    </p>
                  </div>
                  <Button
                    onClick={() => setSent(false)}
                    variant="outline"
                    className="mt-4 rounded-none font-mono uppercase tracking-widest px-8 transition-all hover:bg-foreground hover:text-background"
                  >
                    Send Another
                  </Button>
                </div>
              ) : (
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form className="relative z-10 flex flex-col gap-6 font-mono text-sm uppercase font-bold tracking-widest text-foreground">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="name" className="text-[10px] tracking-[0.2em] font-black opacity-60">
                            IDENTIFIER: NAME
                          </label>
                          <Field
                            type="text"
                            name="name"
                            className="border border-border bg-background p-4 outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/30 placeholder:font-normal"
                            placeholder="JOHN DOE"
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="text-red-500 text-[10px] mt-1 uppercase"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label htmlFor="email" className="text-[10px] tracking-[0.2em] font-black opacity-60">
                            IDENTIFIER: E-MAIL
                          </label>
                          <Field
                            type="email"
                            name="email"
                            className="border border-border bg-background p-4 outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/30 placeholder:font-normal"
                            placeholder="name@domain.com"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-500 text-[10px] mt-1 uppercase"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="subject" className="text-[10px] tracking-[0.2em] font-black opacity-60">
                          COMMUNICATION SUBJECT
                        </label>
                        <Field
                          type="text"
                          name="subject"
                          className="border border-border bg-background p-4 outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/30 placeholder:font-normal"
                          placeholder="PROPOSAL DETAILS"
                        />
                        <ErrorMessage
                          name="subject"
                          component="div"
                          className="text-red-500 text-[10px] mt-1 uppercase"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="text-[10px] tracking-[0.2em] font-black opacity-60">
                          PAYLOAD
                        </label>
                        <Field
                          as="textarea"
                          name="message"
                          rows={6}
                          className="border border-border bg-background p-4 outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/30 placeholder:font-normal resize-none"
                          placeholder="TRANSMIT MESSAGE HERE..."
                        />
                        <ErrorMessage
                          name="message"
                          component="div"
                          className="text-red-500 text-[10px] mt-1 uppercase"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-none h-14 font-mono font-bold text-sm tracking-widest uppercase hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all flex items-center justify-center gap-4 w-full md:w-fit px-12"
                      >
                        {isSubmitting ? "TRANSMITTING..." : "DISPATCH TRANSMISSION"}
                        <Send className="w-4 h-4" />
                      </Button>
                    </Form>
                  )}
                </Formik>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
