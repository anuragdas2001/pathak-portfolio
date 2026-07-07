"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  disabled?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  as?: React.ElementType;
  href?: string;
  [key: string]: any;
}

export function Magnet({
  children,
  padding = 100,
  disabled = false,
  className = "",
  onClick,
  as: Component = "div",
  href,
  ...props
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    if (Math.abs(distanceX) < rect.width / 2 + padding && Math.abs(distanceY) < rect.height / 2 + padding) {
      setIsHovered(true);
      x.set(distanceX * 0.35);
      y.set(distanceY * 0.35);
    } else {
      setIsHovered(false);
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const MotionComponent = motion.create(Component as any);

  return (
    <MotionComponent
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      href={href}
      style={{
        x: springX,
        y: springY,
      }}
      className={`inline-block transition-transform duration-300 ${className}`}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
