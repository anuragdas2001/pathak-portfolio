"use client";

import React from "react";
import { ValorantProjectCard } from "@/components/ui/valorant-project-card";
import { ShinyText } from "@/components/ui/react-bits/ShinyText";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { Crosshair, Terminal, Sparkles } from "lucide-react";

export function Projects() {
  return (
    <section id="projects" className="py-28 px-6 sm:px-12 relative max-w-7xl mx-auto w-full overflow-hidden">
      {/* Background Monochrome Glow & Accents */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-black/5 via-zinc-500/10 to-black/5 dark:from-white/5 dark:via-zinc-500/10 dark:to-white/5 blur-[140px] pointer-events-none -z-10" />

      {/* Section Header (Valorant Lobby Style - Monochrome) */}
      <div className="flex flex-col items-center text-center mb-20 space-y-4 relative">
        {/* Top Lobby Indicator */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 text-black dark:text-white text-xs font-mono tracking-widest uppercase shadow-sm">
          <span className="h-2 w-2 rounded-full bg-black dark:bg-white animate-pulse" />
          <span className="font-bold">// CASE STUDY SELECT</span>
          <span className="text-zinc-400">|</span>
          <ShinyText text="TACTICAL LOBBY" speed={4} className="font-extrabold text-black dark:text-white tracking-wider" />
        </div>

        {/* Main Title */}
        <div className="relative">
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-black dark:text-white uppercase">
            Architectured <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 via-black to-zinc-500 dark:from-zinc-400 dark:via-white dark:to-zinc-400">For Impact</span>
          </h2>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-black dark:via-white to-transparent" />
        </div>

        {/* Subtitle / Lobby Instructions */}
        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl text-sm sm:text-base font-mono pt-2">
          // CHOOSE YOUR CASE STUDY: Hover over a banner card to reveal tactical telemetry, full-stack architecture, and deployment protocols.
        </p>

        {/* Tactical Status Bar */}
        <div className="flex items-center gap-6 pt-4 text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
          <div className="flex items-center gap-1.5">
            <Crosshair className="h-3.5 w-3.5 text-black dark:text-white" />
            <span>4 ACTIVE DEPLOYMENTS</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5 text-black dark:text-white" />
            <span>SYS_STATUS: OPTIMAL</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-black dark:text-white" />
            <span>S-TIER RATING</span>
          </div>
        </div>
      </div>

      {/* 4-Column Valorant Project Banner Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 lg:gap-6 w-full pt-4 pb-8">
        {PORTFOLIO_DATA.projects.map((project, index) => (
          <ValorantProjectCard
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </div>

      {/* Bottom Tactical Footer Line */}
      <div className="mt-16 pt-6 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-500 gap-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-black dark:bg-white" />
          <span>PORTFOLIO_V3 // TELEMETRY ENGINE</span>
        </div>
        <div>
          <span>ALL CASE STUDIES VERIFIED // PRODUCTION READY</span>
        </div>
      </div>
    </section>
  );
}
