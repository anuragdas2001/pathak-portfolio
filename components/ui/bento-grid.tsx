"use client";

import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <div
      className={twMerge(
        "grid md:auto-rows-[19rem] grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  colSpan,
}: {
  className?: string;
  title?: string | ReactNode;
  description?: string | ReactNode;
  header?: ReactNode;
  icon?: ReactNode;
  colSpan?: string;
}) => {
  return (
    <div
      className={twMerge(
        "row-span-1 rounded-3xl group/bento hover:shadow-2xl hover:shadow-cyan-500/10 transition duration-500 shadow-input dark:shadow-none p-6 dark:bg-black/50 dark:border-white/[0.08] bg-white border border-transparent justify-between flex flex-col space-y-4 relative overflow-hidden backdrop-blur-xl hover:border-cyan-500/40",
        colSpan,
        className
      )}
    >
      {/* Subtle glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-cyan-500/0 group-hover/bento:from-cyan-500/10 group-hover/bento:to-indigo-500/10 transition-all duration-500 pointer-events-none" />
      
      <div className="w-full flex-1 relative z-10">{header}</div>
      <div className="group-hover/bento:translate-x-1 transition duration-300 relative z-10">
        <div className="mb-2 text-cyan-400">{icon}</div>
        <div className="font-sans font-bold text-neutral-800 dark:text-neutral-100 mb-2 mt-1 text-lg tracking-tight">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-xs sm:text-sm dark:text-neutral-400 leading-relaxed">
          {description}
        </div>
      </div>
    </div>
  );
};
