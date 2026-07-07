"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { DotField } from "@/components/ui/react-bits/DotField";

export function GlobalBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = !mounted || resolvedTheme === "dark";

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-auto z-0">
      <DotField
        dotRadius={1.5}
        dotSpacing={14}
        bulgeStrength={67}
        glowRadius={160}
        sparkle={false}
        waveAmplitude={0}
        cursorRadius={500}
        cursorForce={0.1}
        bulgeOnly
        gradientFrom={isDark ? "#ffffff" : "#000000"}
        gradientTo={isDark ? "#d4d4d8" : "#27272a"}
        glowColor={isDark ? "#ffffff" : "#000000"}
        className="w-full h-full opacity-80"
      />
    </div>
  );
}
