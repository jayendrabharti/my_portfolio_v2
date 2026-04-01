import { getPayloadInstance } from "@/payload";
import { NextResponse } from "next/server";

export async function GET() {
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

    const response = await fetch(resumeUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch resume from ${resumeUrl}`);
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
