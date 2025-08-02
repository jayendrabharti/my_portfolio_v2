import BlogsSection from "@/components/home/BlogsSection";
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
      <HeroSection />
      {settings.skills && <SkillsSection />}
      {settings.workExperience && <WorkExperienceSection />}
      {settings.projects && <ProjectsSection />}
      {settings.blogs && <BlogsSection />}
    </>
  );
}
