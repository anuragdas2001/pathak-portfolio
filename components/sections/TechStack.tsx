"use client";

import React, { useState } from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { SpotlightCard } from "@/components/ui/react-bits/SpotlightCard";
import { Magnet } from "@/components/ui/react-bits/Magnet";
import { ShinyText } from "@/components/ui/react-bits/ShinyText";
import { PORTFOLIO_DATA, TechItem } from "@/data/portfolioData";
import { Cpu, Sparkles, Layers, Box, Palette } from "lucide-react";

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Core", "Databases & ORMs", "Backend & DevOps", "Design & UI"];

  const filteredTech = activeCategory === "All"
    ? PORTFOLIO_DATA.techStack
    : PORTFOLIO_DATA.techStack.filter((t) => t.category === activeCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Core":
        return <Cpu className="h-4 w-4 text-black dark:text-white" />;
      case "Databases & ORMs":
        return <Box className="h-4 w-4 text-black dark:text-white" />;
      case "Backend & DevOps":
        return <Layers className="h-4 w-4 text-black dark:text-white" />;
      case "Design & UI":
        return <Palette className="h-4 w-4 text-black dark:text-white" />;
      default:
        return <Sparkles className="h-4 w-4 text-black dark:text-white" />;
    }
  };

  return (
    <section id="skills" className="py-28 px-6 sm:px-12 relative overflow-hidden bg-zinc-50/50 dark:bg-black/40 border-y border-black/10 dark:border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 space-y-4">
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

        {/* Aceternity Infinite Moving Cards Marquee 1 (Left) */}
        <div className="w-full my-6">
          <InfiniteMovingCards
            items={PORTFOLIO_DATA.techStack}
            direction="left"
            speed="normal"
            renderItem={(item: TechItem) => (
              <div className="flex items-center justify-between gap-4 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 p-4 backdrop-blur-md transition-all duration-300 hover:border-black dark:hover:border-white shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/5 dark:bg-black/50 border border-black/10 dark:border-white/10">
                    {getCategoryIcon(item.category)}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans font-bold text-black dark:text-white text-base">{item.name}</span>
                    <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">{item.category}</span>
                  </div>
                </div>
                <span className="text-xs font-mono px-2 py-1 rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white">
                  {item.proficiency}
                </span>
              </div>
            )}
          />
        </div>

        {/* Aceternity Infinite Moving Cards Marquee 2 (Right) */}
        <div className="w-full mb-16">
          <InfiniteMovingCards
            items={[...PORTFOLIO_DATA.techStack].reverse()}
            direction="right"
            speed="normal"
            renderItem={(item: TechItem) => (
              <div className="flex items-center justify-between gap-4 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 p-4 backdrop-blur-md transition-all duration-300 hover:border-black dark:hover:border-white shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/5 dark:bg-black/50 border border-black/10 dark:border-white/10">
                    {getCategoryIcon(item.category)}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans font-bold text-black dark:text-white text-base">{item.name}</span>
                    <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">{item.category}</span>
                  </div>
                </div>
                <span className="text-xs font-mono px-2 py-1 rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white">
                  {item.proficiency}
                </span>
              </div>
            )}
          />
        </div>

        {/* Interactive Category Filter with Magnet wrapper */}
        <div className="w-full max-w-5xl flex flex-col items-center space-y-8">
          <div className="flex flex-wrap items-center justify-center gap-2 bg-black/5 dark:bg-black/60 p-1.5 rounded-full border border-black/10 dark:border-white/10 backdrop-blur-md">
            {categories.map((cat) => (
              <Magnet key={cat} padding={30}>
                <button
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-black text-white dark:bg-white dark:text-black shadow-md scale-105"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                  data-cursor-text={cat}
                >
                  {cat}
                </button>
              </Magnet>
            ))}
          </div>

          {/* Grid with React Bits SpotlightCards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
            {filteredTech.map((tech) => (
              <SpotlightCard
                key={tech.name}
                spotlightColor="rgba(128, 128, 128, 0.15)"
                className="group p-5 flex flex-col justify-between backdrop-blur-md transition-all duration-300 border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/50 hover:border-black dark:hover:border-white hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black/5 dark:bg-black/60 border border-black/10 dark:border-white/10 group-hover:border-black dark:group-hover:border-white transition-colors">
                    {getCategoryIcon(tech.category)}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 px-2 py-0.5 rounded-full bg-black/5 dark:bg-black/40 border border-black/10 dark:border-white/5">
                    {tech.proficiency}
                  </span>
                </div>
                <div>
                  <h3 className="font-sans font-bold text-black dark:text-white text-base tracking-tight transition-colors">
                    {tech.name}
                  </h3>
                  <p className="font-mono text-xs text-zinc-500 mt-1">{tech.category}</p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
