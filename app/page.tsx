import { getPortfolioData } from "@/data/portfolioService";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { WriteupsSection } from "@/components/sections/WriteupsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default async function Home() {
  const data = await getPortfolioData();

  return (
    <div className="flex flex-col w-full">
      <HeroSection data={data} />
      <AboutSection profile={data.profile} focusPillars={data.focusPillars} />
      <SkillsSection skills={data.skills} />
      <ProjectsSection projects={data.projects} />
      <WriteupsSection writeups={data.writeups} />
      <ExperienceSection experience={data.experience} credentials={data.credentials} />
      <ContactSection profile={data.profile} socials={data.socials} />
    </div>
  );
}
