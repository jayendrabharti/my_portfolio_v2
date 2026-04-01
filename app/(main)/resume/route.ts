import { getPayloadInstance } from "@/payload";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const payload = await getPayloadInstance();
    const profile = await payload.findGlobal({
      slug: "profile",
    });

    if (!profile.resume || typeof profile.resume === "string") {
      return new NextResponse("Resume not found", { status: 404 });
    }

    const resume = profile.resume;
    const resumeUrl = resume.url;

    if (!resumeUrl) {
      return new NextResponse("Resume URL not found", { status: 404 });
    }

    const { origin } = new URL(req.url);
    const absoluteUrl = resumeUrl.startsWith("/")
      ? `${origin}${resumeUrl}`
      : resumeUrl;
    const response = await fetch(absoluteUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch resume from ${absoluteUrl}`);
    }

    const blob = await response.blob();

    return new NextResponse(blob, {
      headers: {
        "Content-Type": resume.mimeType || "application/pdf",
        "Content-Disposition": `inline; filename="${resume.filename || "resume.pdf"}"`,
      },
    });
  } catch (error) {
    console.error("Error serving resume:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
