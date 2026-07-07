"use client";

import React, { useRef } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { Spotlight } from "@/components/ui/spotlight";
import { FlipWords } from "@/components/ui/flip-words";
import  Lanyard from "@/components/ui/react-bits/Lanyard";
import { DotField } from "@/components/ui/react-bits/DotField";
import { BlurText } from "@/components/ui/react-bits/BlurText";
import { ShinyText } from "@/components/ui/react-bits/ShinyText";
import { Magnet } from "@/components/ui/react-bits/Magnet";
import { CountUp } from "@/components/ui/react-bits/CountUp";
import { ArrowDown, Terminal, Code2, Cpu } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-28 pb-16 px-6 sm:px-12 bg-transparent"
    >
      {/* Minimal Monochrome Spotlight effect */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="rgba(128, 128, 128, 0.15)" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left column: Text content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5 backdrop-blur-md text-xs sm:text-sm font-medium shadow-sm">
            <span className="h-2 w-2 rounded-full bg-black dark:bg-white animate-pulse" />
            <ShinyText text={PORTFOLIO_DATA.developer.status} speed={4} className="font-bold text-black dark:text-white" />
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter text-black dark:text-white leading-[1.1]">
              <span>Hi, I&apos;m</span>
              <BlurText
                text={PORTFOLIO_DATA.developer.name}
                animateBy="words"
                delay={80}
                className="text-black dark:text-white"
              />
            </div>

            <div className="h-16 sm:h-20 lg:h-24 flex items-center">
              <FlipWords words={PORTFOLIO_DATA.heroWords} className="text-3xl sm:text-5xl lg:text-6xl pl-0 text-zinc-600 dark:text-zinc-400" />
            </div>
          </div>

          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg lg:text-xl max-w-2xl leading-relaxed font-normal">
            {PORTFOLIO_DATA.developer.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Magnet padding={50}>
              <a
                href="#projects"
                onClick={(e) => scrollToSection(e, "projects")}
                className="group relative inline-flex items-center gap-2 rounded-full bg-black text-white dark:bg-white dark:text-black px-7 py-3.5 text-sm font-bold shadow-xl transition-all duration-300 hover:scale-105 hover:opacity-90 active:scale-95"
                data-cursor-text="Projects"
              >
                <Code2 className="h-4 w-4" />
                <span>Explore Featured Work</span>
              </a>
            </Magnet>

            <Magnet padding={50}>
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "contact")}
                className="inline-flex items-center gap-2 rounded-full border border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5 px-7 py-3.5 text-sm font-semibold text-black dark:text-white backdrop-blur-md transition-all duration-300 hover:border-black dark:hover:border-white hover:bg-black/10 dark:hover:bg-white/10 active:scale-95"
                data-cursor-text="Get in touch"
              >
                <Terminal className="h-4 w-4" />
                <span>Initiate Contact</span>
              </a>
            </Magnet>
          </div>

          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-6 w-full border-t border-black/10 dark:border-white/10">
            {PORTFOLIO_DATA.stats.map((stat, i) => {
              const numericVal = parseInt(stat.value.replace(/[^0-9]/g, "")) || 10;
              const suffix = stat.value.replace(/[0-9]/g, "");
              return (
                <div key={i} className="flex flex-col">
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-black dark:text-white">
                    <CountUp to={numericVal} suffix={suffix} duration={2.5} />
                  </div>
                  <span className="text-xs text-zinc-500 uppercase tracking-wider font-medium mt-1">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column: Interactive 3D Lanyard ID Card from React Bits */}
        <div className="lg:col-span-5 h-[480px] sm:h-[550px] lg:h-[620px] w-full relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-zinc-500/5 to-transparent dark:from-white/5 dark:via-zinc-400/5 dark:to-transparent rounded-full blur-3xl -z-10" />
          
          <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />

          <div className="absolute bottom-4 right-4 pointer-events-none hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-black/80 border border-black/15 dark:border-white/15 backdrop-blur-md text-[10px] font-mono text-zinc-700 dark:text-zinc-300 shadow-lg">
            <Cpu className="h-3 w-3 text-black dark:text-white animate-spin" style={{ animationDuration: "8s" }} />
            <span>3D Physics Lanyard • Drag Badge</span>
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <a
        href="#about"
        onClick={(e) => scrollToSection(e, "about")}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500 hover:text-black dark:hover:text-white transition-colors duration-300 group"
        aria-label="Scroll to About Section"
      >
        <span className="text-[11px] font-mono uppercase tracking-widest">Scroll Down</span>
        <div className="h-8 w-5 rounded-full border-2 border-current flex items-start justify-center p-1">
          <ArrowDown className="h-3 w-3 animate-bounce text-black dark:text-white" />
        </div>
      </a>
    </section>
  );
}
