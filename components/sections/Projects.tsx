"use client";

import React from "react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { TiltedCard } from "@/components/ui/react-bits/TiltedCard";
import { Magnet } from "@/components/ui/react-bits/Magnet";
import { ShinyText } from "@/components/ui/react-bits/ShinyText";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { ExternalLink, Code2, Sparkles, Activity } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";

export function Projects() {
  return (
    <section id="projects" className="py-28 px-6 sm:px-12 relative max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 text-black dark:text-white text-xs font-mono tracking-wider uppercase">
          <Code2 className="h-3.5 w-3.5" />
          <ShinyText text="Featured Case Studies" speed={4} className="font-bold text-black dark:text-white" />
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-black dark:text-white">
          Architectured for Impact
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl text-base sm:text-lg">
          Explore a curated selection of 3D spatial computing engines, financial analytics dashboards, and design systems.
        </p>
      </div>

      {/* Projects Grid with Aceternity 3D Card & React Bits TiltedCard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full">
        {PORTFOLIO_DATA.projects.map((project, index) => (
          <CardContainer key={project.id} className="w-full">
            <CardBody className="bg-white/90 dark:bg-black/60 relative group/card border-black/10 dark:border-white/10 w-full rounded-3xl p-6 sm:p-8 border backdrop-blur-xl flex flex-col justify-between transition-all duration-500 hover:border-black dark:hover:border-white shadow-lg">
              {/* Top Bar / Metrics */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <CardItem
                  translateZ="30"
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono text-black dark:text-white"
                >
                  <Activity className="h-3.5 w-3.5 text-black dark:text-white animate-pulse" />
                  <span>{project.metrics}</span>
                </CardItem>
                <CardItem translateZ="20" className="text-xs font-mono text-zinc-500">
                  // Case Study 0{index + 1}
                </CardItem>
              </div>

              {/* Title & Subtitle */}
              <div>
                <CardItem
                  translateZ="40"
                  className="text-2xl sm:text-3xl font-extrabold text-black dark:text-white tracking-tight transition-colors"
                >
                  {project.title}
                </CardItem>
                <CardItem
                  translateZ="35"
                  className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mt-1"
                >
                  {project.subtitle}
                </CardItem>
              </div>

              {/* Mockup Preview Image with React Bits TiltedCard */}
              <CardItem
                translateZ="60"
                className="w-full mt-6 mb-6"
              >
                <TiltedCard rotateAmplitude={12} scaleOnHover={1.03} glareOpacity={0.15} className="w-full">
                  <div className={`w-full h-52 sm:h-60 rounded-2xl bg-gradient-to-br from-black/5 via-zinc-500/5 to-transparent dark:from-white/5 dark:via-zinc-500/5 dark:to-transparent border border-black/15 dark:border-white/15 p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl group-hover/card:border-black dark:group-hover/card:border-white transition-all duration-500`}>
                    <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-3 relative z-10">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-black/30 dark:bg-white/30" />
                        <span className="h-2.5 w-2.5 rounded-full bg-black/50 dark:bg-white/50" />
                        <span className="h-2.5 w-2.5 rounded-full bg-black dark:bg-white" />
                      </div>
                      <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">system://aetheria.render</span>
                    </div>

                    <div className="flex flex-col items-center justify-center my-auto text-center relative z-10">
                      <Sparkles className="h-8 w-8 text-black dark:text-white mb-2 animate-bounce" style={{ animationDuration: "3s" }} />
                      <span className="font-mono font-bold text-black dark:text-white text-base tracking-wider uppercase">
                        {project.title.split(" ")[0]}
                      </span>
                      <span className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">Interactive WebGL & UI Telemetry</span>
                    </div>
                  </div>
                </TiltedCard>
              </CardItem>

              {/* Description */}
              <CardItem
                translateZ="30"
                className="text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed mb-6 font-normal"
              >
                {project.description}
              </CardItem>

              {/* Tech Stack Tags */}
              <CardItem translateZ="25" className="flex flex-wrap gap-1.5 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[11px] font-mono text-black dark:text-white"
                  >
                    {tag}
                  </span>
                ))}
              </CardItem>

              {/* Footer CTA Buttons with Magnet wrappers */}
              <div className="flex items-center justify-between pt-4 border-t border-black/10 dark:border-white/10">
                <CardItem translateZ="20">
                  <Magnet padding={40}>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-black dark:text-white bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-all"
                      data-cursor-text="Source"
                    >
                      <GithubIcon className="h-4 w-4 text-black dark:text-white" />
                      <span>Codebase</span>
                    </a>
                  </Magnet>
                </CardItem>

                <CardItem translateZ="30">
                  <Magnet padding={40}>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-black dark:text-black dark:bg-white shadow-lg hover:opacity-90 hover:scale-105 transition-all"
                      data-cursor-text="Launch"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </Magnet>
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </section>
  );
}
