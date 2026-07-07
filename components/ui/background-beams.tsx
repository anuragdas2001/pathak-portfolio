"use client";
import React from "react";
import { twMerge } from "tailwind-merge";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  return (
    <div
      className={twMerge(
        "absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.12)_0%,transparent_70%)] opacity-80 animate-pulse-glow" />
      
      {/* Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      {/* Glowing beams */}
      <div className="absolute -top-[40%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/20 to-indigo-500/0 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-[30%] right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/15 to-emerald-500/0 rounded-full blur-[100px] pointer-events-none" />
    </div>
  );
};
