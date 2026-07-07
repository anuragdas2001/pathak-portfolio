"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { ShinyText } from "@/components/ui/react-bits/ShinyText";
import { PORTFOLIO_DATA, TechItem } from "@/data/portfolioData";
import { Cpu } from "lucide-react";
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiRedux,
  SiTailwindcss,
  SiShadcnui,
  SiMui,
  SiGit,
  SiGithub,
  SiPostman,
  SiSwagger,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiFastapi,
  SiGraphql,
  SiDjango,
  SiDocker,
  SiLinux,
  SiCloudflare,
  SiVercel,
  SiNetlify,
  SiPostgresql,
  SiMongodb,
  SiPrisma,
  SiMongoose,
  SiFirebase,
  SiSupabase,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";

export function TechStack() {
  const getTechLogo = (name: string) => {
    const className = "h-6 w-6 text-black dark:text-white shrink-0";
    switch (name) {
      case "TypeScript":
        return <SiTypescript className={className} />;
      case "JavaScript":
        return <SiJavascript className={className} />;
      case "Python":
        return <SiPython className={className} />;
      case "React.js":
        return <SiReact className={className} />;
      case "Next.js":
        return <SiNextdotjs className={className} />;
      case "Redux Toolkit":
        return <SiRedux className={className} />;
      case "Tailwind CSS":
        return <SiTailwindcss className={className} />;
      case "ShadCN UI":
        return <SiShadcnui className={className} />;
      case "Material UI":
        return <SiMui className={className} />;
      case "Git":
        return <SiGit className={className} />;
      case "GitHub":
        return <SiGithub className={className} />;
      case "Postman":
        return <SiPostman className={className} />;
      case "Swagger":
        return <SiSwagger className={className} />;
      case "Node.js":
        return <SiNodedotjs className={className} />;
      case "Express.js":
        return <SiExpress className={className} strokeWidth={1.5} />;
      case "NestJS":
        return <SiNestjs className={className} />;
      case "REST APIs":
        return <SiFastapi className={className} />;
      case "GraphQL":
        return <SiGraphql className={className} />;
      case "Django":
        return <SiDjango className={className} />;
      case "Docker":
      case "Docker & Linux":
        return <SiDocker className={className} />;
      case "Linux":
        return <SiLinux className={className} />;
      case "AWS":
        return <FaAws className={className} />;
      case "Cloudflare":
        return <SiCloudflare className={className} />;
      case "Vercel":
        return <SiVercel className={className} />;
      case "Netlify":
        return <SiNetlify className={className} />;
      case "PostgreSQL":
        return <SiPostgresql className={className} />;
      case "MongoDB":
        return <SiMongodb className={className} />;
      case "Prisma ORM":
        return <SiPrisma className={className} />;
      case "Mongoose":
        return <SiMongoose className={className} />;
      case "Firebase":
        return <SiFirebase className={className} />;
      case "Supabase":
        return <SiSupabase className={className} />;
      default:
        return <SiReact className={className} />;
    }
  };

  const row1Names = [
    "TypeScript",
    "React.js",
    "Next.js",
    "Express.js",
    "Node.js",
    "AWS",
    "Vercel",
    "PostgreSQL",
    "Prisma ORM",
    "Tailwind CSS",
    "ShadCN UI",
    "Git",
    "Postman",
    "Python",
    "REST APIs",
    "Firebase",
  ];

  const row2Names = [
    "JavaScript",
    "Redux Toolkit",
    "NestJS",
    "Django",
    "GraphQL",
    "Cloudflare",
    "Netlify",
    "MongoDB",
    "Mongoose",
    "Material UI",
    "GitHub",
    "Swagger",
    "Docker",
    "Linux",
    "Supabase",
  ];

  const row1Items = row1Names
    .map((name) => PORTFOLIO_DATA.techStack.find((item) => item.name === name))
    .filter((item): item is TechItem => Boolean(item));

  const row2Items = row2Names
    .map((name) => PORTFOLIO_DATA.techStack.find((item) => item.name === name))
    .filter((item): item is TechItem => Boolean(item));

  return (
    <section id="skills" className="py-28 px-6 sm:px-12 relative overflow-hidden bg-zinc-50/50 dark:bg-black/40 border-y border-black/10 dark:border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 text-black dark:text-white text-xs font-mono tracking-wider uppercase">
            <Cpu className="h-3.5 w-3.5" />
            <ShinyText text="Technical Ecosystem" speed={4} className="font-bold text-black dark:text-white" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-black dark:text-white">
            Arsenal & Technologies
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl text-base sm:text-lg">
            A battle-tested stack engineered for real-time 3D graphics, seamless micro-interactions, and institutional-grade scalability.
          </p>
        </div>

        {/* 2 Minimalist Scrolling Rows (Black & White Monochrome) */}
        <div className="w-full flex flex-col space-y-8 my-6">
          {/* Row 1: Left Scrolling */}
          <InfiniteMovingCards
            items={row1Items}
            direction="left"
            speed="normal"
            renderItem={(item: TechItem) => (
              <div className="flex items-center gap-3 px-5 py-2.5 transition-all duration-300 hover:opacity-70 select-none">
                {getTechLogo(item.name)}
                <span className="font-sans font-semibold text-base sm:text-lg text-black dark:text-white tracking-wide whitespace-nowrap">
                  {item.name}
                </span>
              </div>
            )}
          />

          {/* Row 2: Right Scrolling */}
          <InfiniteMovingCards
            items={row2Items}
            direction="right"
            speed="normal"
            renderItem={(item: TechItem) => (
              <div className="flex items-center gap-3 px-5 py-2.5 transition-all duration-300 hover:opacity-70 select-none">
                {getTechLogo(item.name)}
                <span className="font-sans font-semibold text-base sm:text-lg text-black dark:text-white tracking-wide whitespace-nowrap">
                  {item.name}
                </span>
              </div>
            )}
          />
        </div>
      </div>
    </section>
  );
}
