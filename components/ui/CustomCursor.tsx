"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState("");

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Center initial position off screen
    gsap.set(cursor, { xPercent: -50, yPercent: -50, x: -100, y: -100 });
    gsap.set(follower, { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.15, ease: "power2.out" });
      gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.45, ease: "power3.out" });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest("a, button, input, textarea, [data-interactive='true'], .interactive");
      
      if (interactiveEl) {
        setIsHovered(true);
        const text = interactiveEl.getAttribute("data-cursor-text") || "";
        setHoverText(text);
        gsap.to(follower, {
          scale: 2.2,
          backgroundColor: "rgba(128, 128, 128, 0.15)",
          borderColor: "rgba(150, 150, 150, 0.8)",
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(cursor, { scale: 0.5, duration: 0.3 });
      } else {
        setIsHovered(false);
        setHoverText("");
        gsap.to(follower, {
          scale: 1,
          backgroundColor: "transparent",
          borderColor: "rgba(150, 150, 150, 0.3)",
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(cursor, { scale: 1, duration: 0.3 });
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-2.5 w-2.5 rounded-full bg-black dark:bg-white shadow-[0_0_12px_rgba(128,128,128,0.5)] transition-opacity duration-300 hidden md:block"
      />
      <div
        ref={followerRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] flex h-10 w-10 items-center justify-center rounded-full border border-black/25 dark:border-white/25 backdrop-blur-[1px] transition-opacity duration-300 hidden md:flex"
      >
        {hoverText && (
          <span className="text-[6px] font-bold uppercase tracking-wider text-black dark:text-white">
            {hoverText}
          </span>
        )}
      </div>
    </>
  );
}
