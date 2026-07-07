import { Hero } from "@/components/sections/Hero";
import { AboutBento } from "@/components/sections/AboutBento";
import { TechStack } from "@/components/sections/TechStack";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { GlobalBackground } from "@/components/ui/GlobalBackground";
import GlobeDemo from "@/components/globe-demo";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen overflow-x-hidden relative bg-white dark:bg-[#050505] text-black dark:text-white transition-colors duration-300">
      {/* Global Fixed Interactive DotField Background covering the entire portfolio */}
      <GlobalBackground />

      <div className="relative z-10 flex flex-col w-full">
        <Hero />
        <AboutBento />
        <TechStack />
        <Projects />
        <Experience />
        <GlobeDemo />
        <Contact />
      </div>
    </div>
  );
}
