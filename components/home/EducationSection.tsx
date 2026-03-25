import { Education } from "@/payload/payload-types";
import Reveal from "@/components/animations/Reveal";
import { GraduationCap, Calendar, BookOpen, Star } from "lucide-react";
import Image from "next/image";
import { getPayloadInstance } from "@/payload";
import RevealHero from "../animations/RevealHero";
import { cn } from "@/lib/utils";

export default async function EducationSection({
  className = "",
}: {
  className?: string;
}) {
  const payload = await getPayloadInstance();
  const { docs: educations }: { docs: Education[] } =
    await payload.find({
      collection: "education",
      sort: "-fromYear",
      where: {
        _status: {
          equals: "published",
        },
      },
    });

  return (
    <section
      id="education"
      className={cn(className, "flex flex-col gap-8 py-16 px-4 rail-bounded")}
    >
      <div className="flex flex-col gap-2">
        <RevealHero className="text-3xl md:text-5xl font-black uppercase tracking-tight">
          Education
        </RevealHero>
        <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest max-w-xl">
          Academic background and educational achievements
        </p>
      </div>

      {educations.length > 0 ? (
        <div className="grid grid-cols-1 gap-0 border border-border bg-background">
          {educations.map((education, index) => (
            <div
              key={education.id}
              className={cn(
                "border-b border-border last:border-b-0",
                index % 2 === 0 ? "diagonal-pattern-subtle" : "",
              )}
            >
              <EducationCard education={education} />
            </div>
          ))}
        </div>
      ) : (
        <div className="h-32 border border-dashed border-border flex items-center justify-center diagonal-pattern-subtle">
          <span className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
            No Records Found
          </span>
        </div>
      )}
    </section>
  );
}

export function EducationCard({
  education,
}: {
  education: Education;
}) {
  return (
    <Reveal key={education.id}>
      <div className="group transition-colors duration-300 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Logo Box */}
          <div className="flex-shrink-0">
            {education.logo &&
            typeof education.logo === "object" &&
            education.logo.url ? (
              <div className="w-16 h-16 relative border-2 border-foreground bg-background p-1 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src={education.logo.url}
                  alt={`${education.schoolName} logo`}
                  fill
                  className="object-contain transition-all duration-300 p-1"
                />
              </div>
            ) : (
              <div className="w-16 h-16 relative border-2 border-dashed border-border bg-background flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="space-y-2">
                <h3 className="text-xl font-bold uppercase tracking-wide text-foreground">
                  {education.schoolName}
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-sm font-mono uppercase tracking-wider text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-3 h-3" />
                    {education.course || "No Course Specified"}
                  </div>
                </div>
              </div>

              {/* Date & Grade block */}
              <div className="flex flex-col items-start sm:items-end gap-2 text-xs font-mono uppercase tracking-widest p-3 border border-border bg-background sm:min-w-[180px]">
                <div className="flex items-center gap-2 text-foreground font-bold">
                  <Calendar className="w-3 h-3" />
                  {education.fromYear} - {education.toYear}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Star className="w-3 h-3" />
                  {education.gradingSystem === "cgpa" ? "CGPA" : "Percentage"}: {education.gradeValue}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
