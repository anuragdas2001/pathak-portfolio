"use client";

import React, { useState } from "react";
import { Project } from "@/data/portfolioData";
import { ExternalLink, Code2, Sparkles, Activity, Shield, Terminal, Cpu, Zap, Layers } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { Magnet } from "@/components/ui/react-bits/Magnet";

interface ValorantProjectCardProps {
  project: Project;
  index: number;
}

// Sleek Monochrome / Black & White cyber themes for each card
const MONOCHROME_THEMES = [
  {
    name: "ARCHITECTURE // 01",
    borderGlow: "from-black/40 via-black to-black/40 dark:from-white/40 dark:via-white dark:to-white/40",
    shadowColor: "hover:shadow-[0_0_35px_rgba(0,0,0,0.25)] dark:hover:shadow-[0_0_35px_rgba(255,255,255,0.25)]",
    badgeBg: "bg-black dark:bg-white",
    textColor: "text-black dark:text-white",
    bgGradient: "from-black/5 via-white/90 to-zinc-100 dark:from-white/10 dark:via-black/90 dark:to-[#09090b]",
    icon: <Cpu className="h-4 w-4 text-white dark:text-black" />
  },
  {
    name: "TELEMETRY // 02",
    borderGlow: "from-black/40 via-black to-black/40 dark:from-white/40 dark:via-white dark:to-white/40",
    shadowColor: "hover:shadow-[0_0_35px_rgba(0,0,0,0.25)] dark:hover:shadow-[0_0_35px_rgba(255,255,255,0.25)]",
    badgeBg: "bg-black dark:bg-white",
    textColor: "text-black dark:text-white",
    bgGradient: "from-black/5 via-white/90 to-zinc-100 dark:from-white/10 dark:via-black/90 dark:to-[#09090b]",
    icon: <Terminal className="h-4 w-4 text-white dark:text-black" />
  },
  {
    name: "INTELLIGENCE // 03",
    borderGlow: "from-black/40 via-black to-black/40 dark:from-white/40 dark:via-white dark:to-white/40",
    shadowColor: "hover:shadow-[0_0_35px_rgba(0,0,0,0.25)] dark:hover:shadow-[0_0_35px_rgba(255,255,255,0.25)]",
    badgeBg: "bg-black dark:bg-white",
    textColor: "text-black dark:text-white",
    bgGradient: "from-black/5 via-white/90 to-zinc-100 dark:from-white/10 dark:via-black/90 dark:to-[#09090b]",
    icon: <Sparkles className="h-4 w-4 text-white dark:text-black" />
  },
  {
    name: "ENTERPRISE // 04",
    borderGlow: "from-black/40 via-black to-black/40 dark:from-white/40 dark:via-white dark:to-white/40",
    shadowColor: "hover:shadow-[0_0_35px_rgba(0,0,0,0.25)] dark:hover:shadow-[0_0_35px_rgba(255,255,255,0.25)]",
    badgeBg: "bg-black dark:bg-white",
    textColor: "text-black dark:text-white",
    bgGradient: "from-black/5 via-white/90 to-zinc-100 dark:from-white/10 dark:via-black/90 dark:to-[#09090b]",
    icon: <Layers className="h-4 w-4 text-white dark:text-black" />
  }
];

export function ValorantProjectCard({ project, index }: ValorantProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const theme = MONOCHROME_THEMES[index % MONOCHROME_THEMES.length];

  // Clip path for Valorant Banner: Flat top (for rounded-md) + V-shaped chevron bottom tip
  const bannerClipPath = "polygon(0 0, 100% 0, 100% 86%, 50% 100%, 0 86%)";
  
  // Clip path for Valorant Cyber Buttons (angled corners)
  const buttonClipPath = "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)";

  return (
    <div
      className="relative group h-[640px] sm:h-[680px] w-96 flex flex-col justify-start select-none transition-all duration-500 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer Glowing Border Wrapper with Banner Clip-Path & rounded-md top */}
      <div
        className={`w-full h-[610px] sm:h-[650px] p-[2px] rounded-t-md bg-gradient-to-b from-black/15 via-black/30 to-black/15 dark:from-white/15 dark:via-white/30 dark:to-white/15 group-hover:${theme.borderGlow} transition-all duration-500 ${theme.shadowColor}`}
        style={{ clipPath: bannerClipPath }}
      >
        {/* Inner Banner Card Container with rounded-md top */}
        <div
          className={`w-full h-full rounded-t-md bg-zinc-50 dark:bg-[#09090b] flex flex-col justify-between relative overflow-hidden transition-all duration-500`}
          style={{ clipPath: bannerClipPath }}
        >
          {/* Background Cyber Grids & Gradients */}
          <div className={`absolute inset-0 bg-gradient-to-b ${theme.bgGradient} opacity-90 transition-opacity duration-500 group-hover:opacity-100`} />
          
          {/* Subtle Grid Pattern Overlay */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none" 
            style={{ 
              backgroundImage: "radial-gradient(#888888 1px, transparent 1px)", 
              backgroundSize: "16px 16px" 
            }} 
          />

          {/* Top Telemetry & Status Bar (No inner border radius) */}
          <div className="relative z-10 p-5 pb-3 flex items-center justify-between border-b border-black/10 dark:border-white/10 font-mono text-xs tracking-wider text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <span className={`font-bold ${theme.textColor}`}>// 0{index + 1}</span>
              <span className="text-[10px] text-zinc-500 uppercase">{theme.name.split(" // ")[0]}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-none bg-black/5 dark:bg-white/10 border border-black/15 dark:border-white/15 text-[10px]">
              <span className="h-1.5 w-1.5 rounded-none bg-black dark:bg-white animate-ping" />
              <span className="text-black dark:text-white font-semibold uppercase">READY</span>
            </div>
          </div>

          {/* Center Visual Showcase Area / Artwork */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
            {/* Glowing Center Emblem / Icon (No inner border radius) */}
            <div className="relative mb-6 group-hover:scale-110 transition-transform duration-500">
              <div className={`absolute -inset-4 rounded-none bg-gradient-to-r ${theme.borderGlow} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />
              <div className="w-24 h-24 rounded-none bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 flex items-center justify-center relative z-10 shadow-xl group-hover:border-black dark:group-hover:border-white transition-colors">
                {index === 0 && <Cpu className={`h-12 w-12 ${theme.textColor}`} />}
                {index === 1 && <Terminal className={`h-12 w-12 ${theme.textColor}`} />}
                {index === 2 && <Sparkles className={`h-12 w-12 ${theme.textColor}`} />}
                {index === 3 && <Code2 className={`h-12 w-12 ${theme.textColor}`} />}
              </div>
            </div>

            {/* Project Title Initial & Telemetry */}
            <span className="font-mono text-[11px] text-zinc-500 uppercase tracking-widest mb-1.5">
              system://case-study.deploy
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-black dark:text-white tracking-tight uppercase leading-none drop-shadow-sm">
              {project.title.split(" — ")[0].split(" ")[0]}
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 max-w-[90%] line-clamp-1 font-medium">
              {project.subtitle}
            </p>

            {/* Metrics Badge (No inner border radius) */}
            {project.metrics && (
              <div className="mt-5 px-3 py-1.5 rounded-none bg-black/5 dark:bg-white/10 border border-black/15 dark:border-white/15 text-[11px] font-mono text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-none ${theme.badgeBg}`} />
                <span>{project.metrics}</span>
              </div>
            )}
          </div>

          {/* High-Contrast Nameplate Bar across Lower Section (No inner border radius) */}
          <div className="relative z-10 bg-zinc-100 dark:bg-zinc-900 border-t border-b border-black/15 dark:border-white/15 py-3.5 px-5 flex flex-col items-center text-center shadow-md mb-10">
            <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400 tracking-widest uppercase">
              {theme.name}
            </span>
            <span className="text-sm font-extrabold text-black dark:text-white tracking-wider uppercase truncate w-full">
              {project.title}
            </span>
          </div>

          {/* Hover Overlay / Action Panel (Slides up when hovered) */}
          <div
            className={`absolute inset-0 z-20 rounded-t-md bg-white/95 dark:bg-[#09090b]/95 backdrop-blur-md p-6 flex flex-col justify-between transition-all duration-500 transform ${
              isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
            }`}
            style={{ clipPath: bannerClipPath }}
          >
            {/* Overlay Header */}
            <div className="flex items-center justify-between border-b border-black/15 dark:border-white/15 pb-3 font-mono text-xs">
              <span className={`font-bold ${theme.textColor}`}>// TECHNICAL SPECS</span>
              <span className="text-zinc-500 dark:text-zinc-400">0{index + 1} / 04</span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed my-auto font-normal line-clamp-5">
              {project.description}
            </p>

            {/* Tech Stack Pills (No inner border radius) */}
            <div className="mb-6">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">
                // ARSENAL / TECH STACK
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-none bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/10 text-[10px] font-mono text-zinc-700 dark:text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Valorant Styled CTA Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-black/15 dark:border-white/15 mb-6">
              <Magnet padding={30} className="w-full">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-black dark:text-white text-xs font-mono font-bold tracking-wider uppercase transition-all border border-black/20 dark:border-white/20 w-full"
                  style={{ clipPath: buttonClipPath }}
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  <span>Code</span>
                </a>
              </Magnet>

              <Magnet padding={30} className="w-full">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-1.5 py-2.5 px-3 bg-black dark:bg-white hover:opacity-90 text-white dark:text-black font-mono font-extrabold text-xs tracking-wider uppercase transition-all shadow-lg w-full`}
                  style={{ clipPath: buttonClipPath }}
                >
                  <span>Launch</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </Magnet>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
