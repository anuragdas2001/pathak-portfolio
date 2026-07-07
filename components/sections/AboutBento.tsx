"use client";

import React, { useState, useEffect } from "react";
import { BentoGrid } from "@/components/ui/bento-grid";
import { SpotlightCard } from "@/components/ui/react-bits/SpotlightCard";
import { ShinyText } from "@/components/ui/react-bits/ShinyText";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { 
  Terminal, 
  Clock, 
  MapPin, 
  Zap, 
  Layers, 
  Code, 
  Cpu, 
  Sparkles, 
  Globe2, 
  CheckCircle2 
} from "lucide-react";

export function AboutBento() {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setCurrentTime(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="py-28 px-6 sm:px-12 relative max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 text-black dark:text-white text-xs font-mono tracking-wider uppercase">
          <Sparkles className="h-3.5 w-3.5" />
          <ShinyText text="About & Architecture" speed={3} className="font-bold text-black dark:text-white" />
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-black dark:text-white">
          Crafting Digital Excellence
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl text-base sm:text-lg">
          My development philosophy bridges the gap between high-frequency engineering precision and immersive design aesthetics.
        </p>
      </div>

      {/* Bento Grid with React Bits SpotlightCards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Item 1: Bio & Philosophy (Spans 2 columns) */}
        <SpotlightCard className="md:col-span-2 p-6 sm:p-8 flex flex-col justify-between border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/50" spotlightColor="rgba(128, 128, 128, 0.15)">
          <div className="flex flex-1 w-full min-h-[7rem] rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-4 relative overflow-hidden flex-col justify-center mb-6">
            <div className="absolute top-3 right-3 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-black/30 dark:bg-white/30" />
              <span className="h-2 w-2 rounded-full bg-black/50 dark:bg-white/50" />
              <span className="h-2 w-2 rounded-full bg-black dark:bg-white" />
            </div>
            <div className="font-mono text-xs text-black/90 dark:text-white/90 space-y-1">
              <p className="text-zinc-500">// Core Philosophy</p>
              <p><span className="font-bold">const</span> <span>architect</span> = <span className="font-bold">new</span> <span>CreativeTechnologist</span>();</p>
              <p><span className="font-bold">await</span> architect.<span>render</span>(&#123; latency: <span className="underline">&apos;&lt; 16ms&apos;</span>, fps: <span className="underline">60</span>, aesthetics: <span className="underline">&apos;Institutional&apos;</span> &#125;);</p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Code className="h-6 w-6 text-black dark:text-white" />
              <h3 className="text-xl sm:text-2xl font-bold text-black dark:text-white tracking-tight">
                Engineering Precision Meets 3D Artistry
              </h3>
            </div>
            <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed mb-4">{PORTFOLIO_DATA.developer.bio}</p>
            <div className="flex flex-wrap gap-2 pt-2 border-t border-black/10 dark:border-white/10">
              {["Next.js 16", "React 19", "Three.js", "GSAP 3", "Tailwind v4", "React Bits"].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-mono rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white shadow-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </SpotlightCard>

        {/* Item 2: Live Location & Time Widget */}
        <SpotlightCard className="md:col-span-1 p-6 sm:p-8 flex flex-col justify-between border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/50" spotlightColor="rgba(128, 128, 128, 0.15)">
          <div className="flex flex-1 w-full min-h-[7rem] rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-4 flex-col items-center justify-center relative overflow-hidden mb-6">
            <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 text-xs uppercase tracking-wider mb-2 font-mono">
              <Clock className="h-3.5 w-3.5 text-black dark:text-white" />
              <span>Local Time (IST)</span>
            </div>

            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-black dark:text-white tracking-tight bg-white dark:bg-black/60 px-4 py-2 rounded-xl border border-black/10 dark:border-white/10 shadow-inner">
              {mounted ? currentTime : "12:00:00 PM"}
            </div>

            <div className="flex items-center gap-1.5 mt-3 text-black dark:text-white text-xs font-semibold">
              <span className="h-2 w-2 rounded-full bg-black dark:bg-white animate-ping" />
              <span>Active & Ready</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Globe2 className="h-6 w-6 text-black dark:text-white" />
              <h3 className="text-xl font-bold text-black dark:text-white tracking-tight">Kolkata, India</h3>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Available globally for remote engineering leadership & consulting.
            </p>
          </div>
        </SpotlightCard>

        {/* Item 3: High-Frequency Animation & UI Performance */}
        <SpotlightCard className="md:col-span-1 p-6 sm:p-8 flex flex-col justify-between border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/50" spotlightColor="rgba(128, 128, 128, 0.15)">
          <div className="flex flex-1 w-full min-h-[7rem] rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-4 flex-col justify-center items-center relative mb-6">
            <div className="grid grid-cols-3 gap-2 w-full">
              {["60 FPS", "< 16ms", "0 Lag"].map((m, i) => (
                <div key={i} className="flex flex-col items-center justify-center bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg p-2">
                  <span className="font-mono font-bold text-black dark:text-white text-xs sm:text-sm">{m}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-6 w-6 text-black dark:text-white" />
              <h3 className="text-xl font-bold text-black dark:text-white tracking-tight">High-Frequency UI</h3>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Sub-millisecond DOM updates, custom WebGL shaders, and smooth physics scrolling.
            </p>
          </div>
        </SpotlightCard>

        {/* Item 4: Institutional-Grade Architecture */}
        <SpotlightCard className="md:col-span-2 p-6 sm:p-8 flex flex-col justify-between border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/50" spotlightColor="rgba(128, 128, 128, 0.15)">
          <div className="flex flex-1 w-full min-h-[7rem] rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-4 flex items-center justify-around gap-4 mb-6">
            {[
              { label: "Type Safety", value: "100% TS" },
              { label: "Accessibility", value: "AA WCAG" },
              { label: "Performance", value: "98+ Audit" }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center space-y-1">
                <CheckCircle2 className="h-5 w-5 text-black dark:text-white" />
                <span className="text-base sm:text-lg font-bold font-mono text-black dark:text-white">{item.value}</span>
                <span className="text-[11px] text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">{item.label}</span>
              </div>
            ))}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Layers className="h-6 w-6 text-black dark:text-white" />
              <h3 className="text-xl sm:text-2xl font-bold text-black dark:text-white tracking-tight">
                Institutional-Grade Architecture
              </h3>
            </div>
            <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">
              Building scalable web platforms designed for high traffic, rigorous security, and seamless developer ergonomics.
            </p>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}
