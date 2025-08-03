import { WorkExperience } from "@/payload/payload-types";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Reveal from "@/components/animations/Reveal";
import {
  Calendar,
  MapPin,
  Building2,
  Briefcase,
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
    return `${diffMonths} month${diffMonths !== 1 ? "s" : ""}`;
  } else {
    const years = Math.floor(diffMonths / 12);
    const remainingMonths = diffMonths % 12;
    if (remainingMonths === 0) {
      return `${years} year${years !== 1 ? "s" : ""}`;
    }
    return `${years} year${years !== 1 ? "s" : ""} ${remainingMonths} month${remainingMonths !== 1 ? "s" : ""}`;
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
        "flex flex-col gap-4 py-8 px-4 max-w-4xl mx-auto w-full "
      )}
    >
      <RevealHero className="text-3xl md:text-5xl font-bold">
        Work Experience
      </RevealHero>
      <p className="text-muted-foreground text-balance">
        My professional journey and the experiences that have shaped my career
        in technology and software development
      </p>

      {workExperiences.length > 0 ? (
        <div className="space-y-6">
          {workExperiences.map((experience, index) => (
            <WorkExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      ) : (
        <span className="text-2xl font-extralight text-muted-foreground mx-auto">
          No Work Experience Yet
        </span>
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
      <Card className="group hover:shadow-lg transition-all duration-300 border-border/50">
        <CardContent className="flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Company Logo */}
            {experience.logo &&
              typeof experience.logo === "object" &&
              experience.logo.url && (
                <div className="flex-shrink-0">
                  <div className="size-16 relative rounded-xl border bg-background shadow-sm overflow-hidden">
                    <Image
                      src={experience.logo.url}
                      alt={`${experience.companyName} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              )}

            {/* Experience Header */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="space-y-1">
                  <CardTitle className="text-xl font-semibold">
                    {experience.position}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Link
                      href={experience.companyWebsiteUrl || "#"}
                      target="_blank"
                      className="flex flex-row items-center hover:underline gap-1.5"
                    >
                      <Building2 className="w-4 h-4" />
                      {experience.companyName}
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                  {experience.location && (
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {experience.location}
                    </div>
                  )}
                </div>

                {/* Date and Duration */}
                <div className="flex flex-col items-start sm:items-end gap-1 text-sm">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Calendar className="w-3 h-3" />
                    {getDateRange(
                      experience.startDate,
                      experience.endDate,
                      experience.current
                    )}
                    {experience.current && (
                      <Badge className="ml-2 text-xs bg-green-600 text-white">
                        Current
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {calculateDuration(
                      experience.startDate,
                      experience.endDate,
                      experience.current
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />
          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">
            {experience.description}
          </p>

          {/* Tags */}
          {experience.tags && experience.tags.length > 0 && (
            <>
              <Separator />
              <div className="space-y-3 ml-auto">
                <h4 className="text-sm font-medium text-muted-foreground">
                  Technologies & Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {experience.tags.map((tagItem, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      className="bg-foreground text-background"
                    >
                      {tagItem.tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </Reveal>
  );
}
