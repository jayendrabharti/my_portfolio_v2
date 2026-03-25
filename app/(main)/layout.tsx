import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/ThemeProvider";
import NavBar from "@/components/NavBar";
import CommandPalette from "@/components/CommandPalette";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { getPayloadInstance } from "@/payload";
import isProfileComplete from "@/payload/globals/Profile/utils";
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadInstance();
  const profile = await payload.findGlobal({
    slug: "profile",
  });
  const profileComplete = isProfileComplete(profile);

  if (!profileComplete) {
    return {
      title: "My Portfolio",
      description:
        "Welcome to my portfolio website, showcasing my projects and blogs.",
    };
  }

  return {
    title: profile.name,
    description:
      "Welcome to my portfolio website, showcasing my projects and blogs.",
    openGraph: {
      title: profile.name,
      description:
        "Welcome to my portfolio website, showcasing my projects and blogs.",
      url: profile.websiteUrl ?? "https://my-portfolio.com",
      siteName: profile.name,
      images: [
        {
          url:
            typeof profile.avatar === "string"
              ? profile.avatar
              : (profile.avatar?.url ??
                "/images/profile_avatar_placeholder.png"),
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const payload = await getPayloadInstance();
  const profile = await payload.findGlobal({
    slug: "profile",
  });
  const profileComplete = isProfileComplete(profile);
  const settings = await payload.findGlobal({
    slug: "settings",
  });

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className="flex flex-col min-h-screen">
        <ThemeProvider>
          {!profileComplete ? (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
              <h1 className="text-2xl font-bold">Profile is not complete</h1>
              <p>Please complete your profile to access the site.</p>
              <Link href="/admin">
                <Button>
                  Go to Admin Dashboard <ExternalLinkIcon />
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <NavBar profile={profile} settings={settings} />
              <CommandPalette profile={profile} />
              <main
                className={cn(
                  "flex w-full flex-col flex-1 items-center overflow-x-clip",
                )}
              >
                <div className="page-rails flex flex-col w-full flex-1">
                  {children}
                </div>
                <Footer profile={profile} />
              </main>
              <ScrollToTop />
            </>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
