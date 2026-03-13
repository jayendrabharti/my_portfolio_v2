import { WorkExperience } from "@/payload/payload-types";
import { Badge } from "@/components/ui/badge";
import Reveal from "@/components/animations/Reveal";
import {
  Calendar,
  MapPin,
  Building2,
  Clock,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import { getPayloadInstance } from "@/payload";
import RevealHero from "../animations/RevealHero";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Separator } from "../ui/separator";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

const getDateRange = (
  startDate: string,
  endDate?: string | null,
  current?: boolean | null
) => {
  const start = formatDate(startDate);
  if (current) {
    return `${start} - Present`;
  }
  if (endDate) {
    return `${start} - ${formatDate(endDate)}`;
  }
  return start;
};

const calculateDuration = (
  startDate: string,
  endDate?: string | null,
  current?: boolean | null
) => {
  const start = new Date(startDate);
  const end = current ? new Date() : endDate ? new Date(endDate) : new Date();

  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30.44));

  if (diffMonths < 12) {
    return `${diffMonths} mo`;
  } else {
    const years = Math.floor(diffMonths / 12);
    const remainingMonths = diffMonths % 12;
    if (remainingMonths === 0) {
      return `${years} yr`;
    }
    return `${years} yr ${remainingMonths} mo`;
  }
};

export default async function WorkExperienceSection({
  className = "",
}: {
  className?: string;
}) {
  const payload = await getPayloadInstance();
  const { docs: workExperiences }: { docs: WorkExperience[] } =
    await payload.find({
      collection: "work-experience",
      sort: "-startDate",
      where: {
        _status: {
          equals: "published",
        },
      },
    });

  return (
    <section
      id="work-experience"
      className={cn(
        className,
        "flex flex-col gap-8 py-16 px-4 rail-bounded"
      )}
    >
      <div className="flex flex-col gap-2">
        <RevealHero className="text-3xl md:text-5xl font-black uppercase tracking-tight">
          Experience
        </RevealHero>
        <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest max-w-xl">
          Professional timeline and technical contributions
        </p>
      </div>

      {workExperiences.length > 0 ? (
        <div className="grid grid-cols-1 gap-0 border border-border bg-background">
          {workExperiences.map((experience, index) => (
            <div key={experience.id} className={cn("border-b border-border last:border-b-0", index % 2 === 0 ? "diagonal-pattern-subtle" : "")}>
              <WorkExperienceCard experience={experience} />
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

export function WorkExperienceCard({
  experience,
}: {
  experience: WorkExperience;
}) {
  return (
    <Reveal key={experience.id}>
      <div className="group transition-colors duration-300 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Company Logo Box */}
          <div className="flex-shrink-0">
            {experience.logo &&
              typeof experience.logo === "object" &&
              experience.logo.url ? (
                <div className="w-16 h-16 relative border-2 border-foreground bg-background p-1 group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={experience.logo.url}
                    alt={`${experience.companyName} logo`}
                    fill
                    className="object-contain transition-all duration-300 p-1"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 relative border-2 border-dashed border-border bg-background flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-muted-foreground" />
                </div>
              )}
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="space-y-2">
                <h3 className="text-xl font-bold uppercase tracking-wide text-foreground">
                  {experience.position}
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-sm font-mono uppercase tracking-wider text-muted-foreground">
                  <Link
                    href={experience.companyWebsiteUrl || "#"}
                    target="_blank"
                    className="flex flex-row items-center hover:text-foreground transition-colors gap-2"
                  >
                    {experience.companyName}
                    <ExternalLink className="w-3 h-3" />
                  </Link>

                  {experience.location && (
                    <div className="flex items-center gap-1.5 border-l border-border pl-4">
                      <MapPin className="w-3 h-3" />
                      {experience.location}
                    </div>
                  )}
                </div>
              </div>

              {/* Date & Duration block */}
              <div className="flex flex-col items-start sm:items-end gap-2 text-xs font-mono uppercase tracking-widest p-3 border border-border bg-background sm:min-w-[180px]">
                <div className="flex items-center gap-2 text-foreground font-bold">
                  <Calendar className="w-3 h-3" />
                  {getDateRange(
                    experience.startDate,
                    experience.endDate,
                    experience.current
                  )}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {calculateDuration(
                    experience.startDate,
                    experience.endDate,
                    experience.current
                  )}
                  {experience.current && (
                    <span className="w-2 h-2 rounded-none bg-green-500 ml-1 animate-pulse" />
                  )}
                </div>
              </div>
            </div>

            <p className="text-foreground/80 leading-relaxed text-sm mt-2">
              {experience.description}
            </p>

            {/* Tags */}
            {experience.tags && experience.tags.length > 0 && (
              <div className="mt-2 pt-4 border-t border-dashed border-border/50">
                <div className="flex flex-wrap gap-2">
                  {experience.tags.map((tagItem, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="outline"
                      className="font-mono text-[10px] uppercase rounded-none border-border"
                    >
                      {tagItem.tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
