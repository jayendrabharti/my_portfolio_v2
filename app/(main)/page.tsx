import BlogsSection from "@/components/home/BlogsSection";
import GitHubSection from "@/components/home/GitHubSection";
import HeroSection from "@/components/home/HeroSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import SkillsSection from "@/components/home/SkillsSection";
import WorkExperienceSection from "@/components/home/WorkExperienceSection";
import EducationSection from "@/components/home/EducationSection";
import ContactSection from "@/components/home/ContactSection";
import { getPayloadInstance } from "@/payload";

export default async function HomePage() {
  const payload = await getPayloadInstance();
  const settings = await payload.findGlobal({
    slug: "settings",
  });
  const { totalDocs: blogsCount } = await payload.count({
    collection: "blogs",
  });
  const { totalDocs: educationCount } = await payload.count({
    collection: "education",
  });
  const profile = await payload.findGlobal({
    slug: "profile",
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

      {settings.workExperience && (
        <>
          <div className="section-divider" aria-hidden="true" />
          <WorkExperienceSection />
        </>
      )}

      {settings.education && educationCount > 0 && (
        <>
          <div className="section-divider" aria-hidden="true" />
          <EducationSection />
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

      {settings.projects && (
        <>
          <div className="section-divider" aria-hidden="true" />
          <div className="dot-pattern">
            <ProjectsSection />
          </div>
        </>
      )}

      {settings.blogs && blogsCount > 0 && (
        <>
          <div className="section-divider" aria-hidden="true" />
          <BlogsSection />
        </>
      )}

      <div className="section-divider" aria-hidden="true" />
      <ContactSection
        email={profile.email}
        githubUrl={profile.githubUrl}
        linkedinUrl={profile.linkedinUrl}
        socials={profile.socials}
        phoneNumber="+91 8800534849"
      />
    </>
  );
}
