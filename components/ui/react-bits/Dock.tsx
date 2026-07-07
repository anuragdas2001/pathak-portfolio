"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export interface DockItemData {
  icon: React.ReactNode;
  label: string;
  href: string;
  onClick?: (e: React.MouseEvent) => void;
}

interface DockProps {
  items: DockItemData[];
  className?: string;
}

function DockItem({ item, mouseX }: { item: DockItemData; mouseX: any }) {
  const ref = useRef<any>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [44, 76, 44]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 200, damping: 15 });

  const handleClick = (e: React.MouseEvent) => {
    if (item.onClick) {
      item.onClick(e);
    } else if (item.href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(item.href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.a
      ref={ref}
      href={item.href}
      onClick={handleClick}
      style={{ width, height: width }}
      className="group relative flex items-center justify-center rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xl shadow-lg transition-colors hover:border-black dark:hover:border-white hover:bg-black/5 dark:hover:bg-white/10"
      data-cursor-text={item.label}
    >
      <div className="flex items-center justify-center w-full h-full text-zinc-300 group-hover:text-black dark:group-hover:text-white transition-colors">
        {item.icon}
      </div>

      {/* Hover tooltip label */}
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-black/90 border border-white/20 text-[11px] font-mono font-bold text-white uppercase tracking-wider opacity-0 scale-75 transition-all duration-200 pointer-events-none group-hover:opacity-100 group-hover:scale-100 shadow-xl whitespace-nowrap">
        {item.label}
      </span>
    </motion.a>
  );
}

export function Dock({ items, className = "" }: DockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={`flex items-center gap-3 px-4 py-3 rounded-3xl bg-black/60 border border-white/15 backdrop-blur-2xl shadow-2xl ${className}`}
    >
      {items.map((item, idx) => (
        <DockItem key={idx} item={item} mouseX={mouseX} />
      ))}
    </div>
  );
}
