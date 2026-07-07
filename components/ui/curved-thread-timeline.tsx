"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, CheckCircle2, Users, ShieldCheck, Zap, Sparkles, ExternalLink } from "lucide-react";

export interface CurvedTimelineEntry {
  year: string;
  role: string;
  company: string;
  companyUrl?: string;
  description: string;
  highlights: string[];
  products?: {
    name: string;
    url?: string;
    description?: string;
  }[];
}

interface CurvedThreadTimelineProps {
  data: CurvedTimelineEntry[];
}

export const CurvedThreadTimeline: React.FC<CurvedThreadTimelineProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 15%", "end 60%"],
  });

  // Transform scroll progress for drawing the curved thread
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <div ref={containerRef} className="relative w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-6 font-sans">
      {/* 
        DESKTOP WINDING S-CURVE THREAD (md and up)
        Spans down the center (x = 50%) weaving through milestone nodes
      */}
      <div className="hidden md:block absolute inset-x-0 top-0 bottom-0 pointer-events-none z-10 overflow-hidden">
        <svg
          className="w-full h-full absolute inset-0"
          viewBox="0 0 100 1000"
          preserveAspectRatio="none"
          fill="none"
        >
          {/* Background Track */}
          <path
            d="M 50 0 C 20 150, 80 250, 50 333 C 20 450, 80 550, 50 666 C 20 780, 80 880, 50 1000"
            className="stroke-black/10 dark:stroke-white/10"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          {/* Animated Winding Thread */}
          <motion.path
            d="M 50 0 C 20 150, 80 250, 50 333 C 20 450, 80 550, 50 666 C 20 780, 80 880, 50 1000"
            className="stroke-black dark:stroke-white drop-shadow-[0_0_8px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]"
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{
              pathLength,
              opacity,
            }}
          />
        </svg>
      </div>

      {/* 
        MOBILE LEFT-EDGE WINDING THREAD (below md)
        Curves smoothly along the left edge (around x = 24px)
      */}
      <div className="md:hidden absolute left-6 top-0 bottom-0 w-12 pointer-events-none z-10 overflow-hidden -translate-x-1/2">
        <svg
          className="w-full h-full absolute inset-0"
          viewBox="0 0 100 1000"
          preserveAspectRatio="none"
          fill="none"
        >
          {/* Background Track */}
          <path
            d="M 50 0 C 20 150, 80 250, 50 333 C 20 450, 80 550, 50 666 C 20 780, 80 880, 50 1000"
            className="stroke-black/10 dark:stroke-white/10"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          {/* Animated Winding Thread */}
          <motion.path
            d="M 50 0 C 20 150, 80 250, 50 333 C 20 450, 80 550, 50 666 C 20 780, 80 880, 50 1000"
            className="stroke-black dark:stroke-white drop-shadow-[0_0_8px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{
              pathLength,
              opacity,
            }}
          />
        </svg>
      </div>

      {/* Timeline Entries */}
      <div className="relative z-20 space-y-20 sm:space-y-28 md:space-y-36">
        {data.map((item, idx) => {
          const isEven = idx % 2 === 0;

          // Select leadership badge icon based on index
          const getLeadershipIcon = (index: number) => {
            switch (index % 3) {
              case 0:
                return <Users className="h-3.5 w-3.5 text-black dark:text-white" />;
              case 1:
                return <ShieldCheck className="h-3.5 w-3.5 text-black dark:text-white" />;
              case 2:
                return <Zap className="h-3.5 w-3.5 text-black dark:text-white" />;
              default:
                return <Briefcase className="h-3.5 w-3.5 text-black dark:text-white" />;
            }
          };

          const getLeadershipLabel = (index: number) => {
            switch (index % 3) {
              case 0:
                return "Executive Leadership & Mentorship";
              case 1:
                return "Architectural Ownership & Scaling";
              case 2:
                return "Technical Strategy & Innovation";
              default:
                return "Core Leadership";
            }
          };

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-80px" }}
              className="relative flex flex-col md:flex-row items-center w-full group"
            >
              {/* 
                GLOWING MILESTONE NODE 
                Sits on left-6 on mobile, and center (left-1/2) on desktop
              */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 -translate-y-1/2 top-0 md:top-1/2 z-30 flex items-center justify-center">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white dark:bg-black border-2 border-black dark:border-white flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-110">
                  <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-black dark:bg-white shadow-[0_0_12px_rgba(0,0,0,0.6)] dark:shadow-[0_0_15px_rgba(255,255,255,0.9)] animate-pulse" />
                </div>
              </div>

              {/* 
                TIMELINE CARD CONTAINER
                Alternates left and right on desktop; stacks on right on mobile
              */}
              <div
                className={`w-full pl-14 sm:pl-16 md:pl-0 md:w-[49%] ${
                  isEven
                    ? "md:mr-auto md:pr-8 md:text-right"
                    : "md:ml-auto md:pl-8 md:text-left"
                }`}
              >
                {/* Year Badge (Mobile & Desktop) */}
                <div
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5 backdrop-blur-md text-xs font-mono font-bold text-black dark:text-white mb-4 shadow-sm ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <Sparkles className="h-3 w-3 text-black dark:text-white shrink-0" />
                  <span>{item.year}</span>
                </div>

                {/* Institutional Bento Card */}
                <div className="bg-white/90 dark:bg-[#09090b]/90 border border-black/15 dark:border-white/15 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-xl transition-all duration-300 hover:border-black dark:hover:border-white hover:shadow-2xl hover:-translate-y-1">
                  {/* Card Header */}
                  <div
                    className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-5 border-b border-black/10 dark:border-white/10 ${
                      isEven ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    <div className={isEven ? "md:text-right" : "text-left"}>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-black dark:text-white tracking-tight leading-snug">
                        {item.role}
                      </h3>
                      <span className="text-sm font-mono text-zinc-600 dark:text-zinc-400 font-semibold mt-1 inline-block">
                        @ {item.companyUrl ? (
                          <a href={item.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white hover:underline decoration-1 underline-offset-4 transition-colors">
                            {item.company} ↗
                          </a>
                        ) : (
                          item.company
                        )}
                      </span>
                    </div>

                    {/* Leadership Category Badge */}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 text-xs font-mono font-medium text-black dark:text-white self-start sm:self-auto shrink-0">
                      {getLeadershipIcon(idx)}
                      <span>{getLeadershipLabel(idx)}</span>
                    </span>
                  </div>

                  {/* Description */}
                  <p
                    className={`text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed mb-6 font-normal ${
                      isEven ? "md:text-right" : "text-left"
                    }`}
                  >
                    {item.description}
                  </p>

                  {/* Highlights / Key Impact */}
                  <div className="space-y-3.5 pt-2">
                    <span
                      className={`text-[11px] font-mono uppercase tracking-widest text-zinc-500 font-semibold block ${
                        isEven ? "md:text-right" : "text-left"
                      }`}
                    >
                      // Leadership Impact & Key Achievements
                    </span>
                    <div className="space-y-2.5">
                      {item.highlights.map((highlight, hIdx) => (
                        <div
                          key={hIdx}
                          className={`flex items-start gap-3 ${
                            isEven ? "md:flex-row-reverse" : ""
                          }`}
                        >
                          <CheckCircle2 className="h-4 w-4 text-black dark:text-white shrink-0 mt-0.5" />
                          <p
                            className={`text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal ${
                              isEven ? "md:text-right" : "text-left"
                            }`}
                          >
                            {highlight}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Products / Systems Built */}
                  {item.products && item.products.length > 0 && (
                    <div className="space-y-3.5 pt-4 mt-6 border-t border-black/10 dark:border-white/10">
                      <span
                        className={`text-[11px] font-mono uppercase tracking-widest text-zinc-500 font-semibold block ${
                          isEven ? "md:text-right" : "text-left"
                        }`}
                      >
                        // Key Systems & Products Built
                      </span>
                      <div className="grid grid-cols-1 gap-2.5">
                        {item.products.map((prod, pIdx) => (
                          <a
                            key={pIdx}
                            href={prod.url || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group/prod flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-all duration-200 shadow-sm ${
                              isEven ? "md:flex-row-reverse" : ""
                            }`}
                          >
                            <div className={`flex items-center gap-3 ${isEven ? "md:flex-row-reverse" : ""}`}>
                              <div className="h-8 w-8 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-mono font-bold text-xs shrink-0 shadow-md group-hover/prod:scale-105 transition-transform">
                                {prod.name.charAt(0)}
                              </div>
                              <div className={isEven ? "md:text-right" : "text-left"}>
                                <div className={`flex items-center gap-1.5 font-bold text-xs sm:text-sm text-black dark:text-white group-hover/prod:underline decoration-1 underline-offset-4 ${isEven ? "md:flex-row-reverse" : ""}`}>
                                  <span>{prod.name}</span>
                                  {prod.url && <ExternalLink className="h-3.5 w-3.5 text-zinc-400 group-hover/prod:text-black dark:group-hover/prod:text-white shrink-0 transition-colors" />}
                                </div>
                                {prod.description && (
                                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5 line-clamp-1 font-normal">
                                    {prod.description}
                                  </p>
                                )}
                              </div>
                            </div>
                            {prod.url && (
                              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 bg-black/5 dark:bg-white/10 px-2.5 py-1 rounded-full border border-black/10 dark:border-white/10 shrink-0 self-start sm:self-center group-hover/prod:border-black/30 dark:group-hover/prod:border-white/30 group-hover/prod:bg-black group-hover/prod:text-white dark:group-hover/prod:bg-white dark:group-hover/prod:text-black transition-all">
                                View Live ↗
                              </span>
                            )}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
