import { WorkExperience } from "@/payload/payload-types";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import Reveal from "@/components/animations/Reveal";
import { Calendar, MapPin, Building2, Clock, ExternalLink } from "lucide-react";
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
  current?: boolean | null,
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
  current?: boolean | null,
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
        "mx-auto flex w-full max-w-5xl flex-col gap-5 px-4 py-12",
      )}
    >
      <div className="space-y-3">
        <Reveal delay={0.05}>
          <span className="soft-outline inline-flex px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Career Timeline
          </span>
        </Reveal>
        <RevealHero
          className="text-3xl font-bold sm:text-4xl md:text-5xl"
          delay={0.08}
        >
          Professional Experience
        </RevealHero>
        <Reveal delay={0.12}>
          <p className="max-w-3xl text-balance text-muted-foreground sm:text-base">
            Roles where I contributed to product delivery, engineering quality,
            and cross-functional collaboration.
          </p>
        </Reveal>
      </div>

      {workExperiences.length > 0 ? (
        <StaggerContainer className="space-y-6">
          {workExperiences.map((experience) => (
            <StaggerItem key={experience.id} type="bottomUp">
              <WorkExperienceCard experience={experience} />
            </StaggerItem>
          ))}
        </StaggerContainer>
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
  const hasWebsite = Boolean(experience.companyWebsiteUrl);

  return (
    <Card className="group relative overflow-hidden border-border/50 bg-card/85 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_40px_80px_-30px_rgba(27,95,197,0.15)] hover:bg-card">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-1 bg-linear-to-b from-primary/70 via-primary/25 to-transparent" />
      <CardContent className="flex flex-col gap-4 p-5 sm:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          {/* Company Logo */}
          {experience.logo &&
            typeof experience.logo === "object" &&
            experience.logo.url && (
              <div className="shrink-0">
                <div className="relative size-16 overflow-hidden rounded-xl border border-border/70 bg-background/80 shadow-sm">
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
                <CardTitle className="text-xl font-semibold sm:text-2xl">
                  {experience.position}
                </CardTitle>
                {hasWebsite ? (
                  <Link
                    href={experience.companyWebsiteUrl as string}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Building2 className="h-4 w-4" />
                    {experience.companyName}
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                    <Building2 className="h-4 w-4" />
                    {experience.companyName}
                  </span>
                )}

                {experience.location && (
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {experience.location}
                  </div>
                )}
              </div>

              {/* Date and Duration */}
              <div className="flex flex-col items-start sm:items-end gap-1 text-sm">
                <div className="flex items-center gap-1.5 font-medium text-foreground/90">
                  <Calendar className="h-3 w-3" />
                  {getDateRange(
                    experience.startDate,
                    experience.endDate,
                    experience.current,
                  )}
                  {experience.current && (
                    <Badge className="ml-2 rounded-full bg-emerald-600 text-xs text-white">
                      Current
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {calculateDuration(
                    experience.startDate,
                    experience.endDate,
                    experience.current,
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />
        {/* Description */}
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          {experience.description}
        </p>

        {/* Tags */}
        {experience.tags && experience.tags.length > 0 && (
          <>
            <Separator />
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Technologies & Skills Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {experience.tags.map((tagItem, tagIndex) => (
                  <Badge
                    key={tagIndex}
                    variant="outline"
                    className="rounded-full border-border/80 bg-background/60 px-2.5 py-1 text-[11px]"
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
  );
}
