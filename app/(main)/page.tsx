import BlogsSection from "@/components/home/BlogsSection";
import GitHubSection from "@/components/home/GitHubSection";
import HeroSection from "@/components/home/HeroSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import SkillsSection from "@/components/home/SkillsSection";
import WorkExperienceSection from "@/components/home/WorkExperienceSection";
import { getPayloadInstance } from "@/payload";

export default async function HomePage() {
  const payload = await getPayloadInstance();
  const settings = await payload.findGlobal({
    slug: "settings",
  });

  return (
    <>
      <div className="dot-pattern">
        <HeroSection />
      </div>
      {settings.skills && (
        <>
          <div className="section-divider" aria-hidden="true" />
          <SkillsSection />
        </>
      )}
      {settings.github && (
        <>
          <div className="section-divider" aria-hidden="true" />
          <div className="dot-pattern">
            <GitHubSection />
          </div>
        </>
      )}
      {settings.workExperience && (
        <>
          <div className="section-divider" aria-hidden="true" />
          <WorkExperienceSection />
        </>
      )}
      {settings.projects && (
        <>
          <div className="section-divider" aria-hidden="true" />
          <div className="dot-pattern">
            <ProjectsSection />
          </div>
        </>
      )}
      {settings.blogs && (
        <>
          <div className="section-divider" aria-hidden="true" />
          <BlogsSection />
        </>
      )}
    </>
  );
}
