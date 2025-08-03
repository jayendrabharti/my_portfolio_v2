import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/ThemeProvider";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Main from "@/components/Main";
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
    title: `Portfolio of ${profile.name}`,
    description:
      "Welcome to my portfolio website, showcasing my projects and blogs.",
    openGraph: {
      title: `Portfolio of ${profile.name}`,
      description:
        "Welcome to my portfolio website, showcasing my projects and blogs.",
      url: profile.websiteUrl ?? "https://my-portfolio.com",
      siteName: `Portfolio of ${profile.name}`,
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
    <html lang="en" suppressHydrationWarning className="h-full overflow-hidden">
      <body className={"h-full w-full flex flex-col overflow-hidden"}>
        <ThemeProvider>
          {!profileComplete ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
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
              <Main
                className={cn(
                  "flex w-full flex-col items-center overflow-y-auto overflow-x-hidden flex-1 min-h-0"
                )}
              >
                {children}
                <Footer profile={profile} />
              </Main>
            </>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
