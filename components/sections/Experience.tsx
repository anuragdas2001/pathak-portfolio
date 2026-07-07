"use client";

import React from "react";
import { CurvedThreadTimeline } from "@/components/ui/curved-thread-timeline";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { SpotlightCard } from "@/components/ui/react-bits/SpotlightCard";
import { CircularGallery } from "@/components/ui/react-bits/CircularGallery";
import { Quote, Sparkles, Trophy, Users, Award } from "lucide-react";
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
          <Trophy className="h-3.5 w-3.5 text-black dark:text-white" />
          <span>Honors & Competitive Programming</span>
        </div>
        <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-black dark:text-white text-center mb-12">
          Global Coding Achievements
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {PORTFOLIO_DATA.achievements.map((item, idx) => (
            <SpotlightCard
              key={idx}
              spotlightColor="rgba(128, 128, 128, 0.15)"
              className="group p-6 flex flex-col justify-between border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/50 hover:border-black dark:hover:border-white transition-all duration-300 shadow-sm hover:shadow-xl rounded-3xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-black/10 dark:border-white/10">
                  <span className="font-mono font-bold text-xs uppercase tracking-wider text-black dark:text-white">
                    {item.platform}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 text-black dark:text-white">
                    {item.badge}
                  </span>
                </div>

                <div className="my-4">
                  <h4 className="text-lg sm:text-xl font-extrabold text-black dark:text-white tracking-tight">
                    {item.rank}
                  </h4>
                </div>
              </div>

              <div className="pt-3 mt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                <span className="font-mono text-xs text-zinc-600 dark:text-zinc-400">
                  {item.details}
                </span>
                <Sparkles className="h-4 w-4 text-black dark:text-white shrink-0 ml-2 opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
            </SpotlightCard>
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
        <div style={{ height: '600px', position: 'relative' }} className="w-full">
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
