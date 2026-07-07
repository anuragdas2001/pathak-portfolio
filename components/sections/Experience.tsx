"use client";

import React from "react";
import { CurvedThreadTimeline } from "@/components/ui/curved-thread-timeline";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { CircularGallery } from "@/components/ui/react-bits/CircularGallery";
import { Quote, Sparkles, Users, Award } from "lucide-react";
import { CiTrophy } from "react-icons/ci";
import { useTheme } from "next-themes";

export function Experience() {
  const { resolvedTheme } = useTheme();
  return (
    <section id="experience" className="py-28 relative max-w-7xl mx-auto overflow-hidden">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16 px-6 sm:px-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 text-black dark:text-white text-xs font-mono tracking-wider uppercase shadow-sm">
          <Users className="h-3.5 w-3.5" />
          <span>Leadership & Mentorship Timeline</span>
        </div>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-black dark:text-white">
          Experience & Leadership
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl text-base sm:text-lg leading-relaxed font-normal">
          A proven track record of architecting high-performance web applications, driving spatial computing innovation, and mentoring world-class engineering teams.
        </p>
      </div>

      {/* Interactive Framer Motion Curved Thread Timeline */}
      <CurvedThreadTimeline data={PORTFOLIO_DATA.experience} />

      {/* Honors & Competitive Programming Achievements */}
      <div className="mt-28 px-6 sm:px-12 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 text-black dark:text-white text-xs font-mono tracking-wider uppercase shadow-sm mb-4">
          <CiTrophy className="h-4 w-4 text-black dark:text-white shrink-0" />
          <span>Honors & Competitive Programming</span>
        </div>
        <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-black dark:text-white text-center mb-12">
          Global Coding Achievements
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 w-full max-w-6xl">
          {PORTFOLIO_DATA.achievements.map((item, idx) => (
            <div
              key={idx}
              className="group flex flex-col items-center text-center p-4 transition-all duration-300"
            >
              {/* Large Trophy Icon */}
              <div className="mb-6 transform group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
                <CiTrophy className="h-16 w-16 sm:h-20 sm:w-20 text-black dark:text-white drop-shadow-sm" />
              </div>

              {/* 1. Ranking */}
              <h4 className="text-xl sm:text-2xl font-extrabold text-black dark:text-white tracking-tight mb-2.5">
                {item.rank}
              </h4>

              {/* 2. Rating & Platform & Top % */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 mb-3.5">
                <span className="font-mono font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 text-black dark:text-white">
                  {item.platform} • {item.badge}
                </span>
                {item.topPercentage && (
                  <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-full bg-black text-white dark:bg-white dark:text-black shadow-sm">
                    {item.topPercentage}
                  </span>
                )}
              </div>

              {/* 3. Contest ID / Details */}
              <p className="font-mono text-xs text-zinc-600 dark:text-zinc-400 max-w-[230px] leading-relaxed">
                {item.details}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications & Professional Credentials (Circular Gallery) */}
      <div className="mt-28 px-6 sm:px-12 flex flex-col items-center">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 mb-4">
          <Award className="h-4 w-4 text-black dark:text-white" />
          <span>Certifications & Credentials</span>
        </div>
        <h3 className="text-2xl sm:text-4xl font-extrabold text-center text-black dark:text-white tracking-tight mb-4">
          Professional Certifications
        </h3>
        <p className="text-center text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto mb-6">
          Drag horizontally or scroll with your mouse wheel to rotate through my verified institutional credentials.
        </p>
        <div style={{ height: '750px', position: 'relative' }} className="w-full">
          <CircularGallery
            items={PORTFOLIO_DATA.certifications}
            bend={3}
            borderRadius={0.05}
            textColor={resolvedTheme === 'dark' ? '#ffffff' : '#18181b'}
            scrollEase={0.02}
          />
        </div>
      </div>

      {/* Peer Endorsements / Testimonials Marquee */}
      <div className="mt-28 px-6 sm:px-12 flex flex-col items-center">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 mb-8">
          <Quote className="h-4 w-4 text-black dark:text-white" />
          <span>Peer Endorsements & Recommendations</span>
        </div>

        <div className="w-full">
          <AnimatedTestimonials testimonials={PORTFOLIO_DATA.testimonials} autoplay={true} />
        </div>
      </div>
    </section>
  );
}
