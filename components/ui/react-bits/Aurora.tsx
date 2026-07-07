"use client";

import React from "react";

interface AuroraProps {
  className?: string;
}

export function Aurora({ className = "" }: AuroraProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none -z-10 ${className}`}>
      {/* Primary cyan blob */}
      <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-500/20 via-teal-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: "7s" }} />
      
      {/* Secondary violet blob */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-gradient-to-bl from-purple-500/20 via-indigo-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: "10s", animationDelay: "2s" }} />
      
      {/* Tertiary emerald blob */}
      <div className="absolute -bottom-40 left-1/3 w-[550px] h-[550px] bg-gradient-to-t from-emerald-500/15 via-cyan-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: "8s", animationDelay: "4s" }} />
    </div>
  );
}
