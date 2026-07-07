"use client";

import React from "react";
import { motion } from "framer-motion";

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
}

export function BlurText({
  text,
  delay = 50,
  className = "",
  animateBy = "words",
  direction = "top",
}: BlurTextProps) {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");

  const defaultFrom =
    direction === "top"
      ? { filter: "blur(10px)", opacity: 0, y: -20 }
      : { filter: "blur(10px)", opacity: 0, y: 20 };

  const defaultTo = { filter: "blur(0px)", opacity: 1, y: 0 };

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {elements.map((element, index) => (
        <motion.span
          key={index}
          initial={defaultFrom}
          whileInView={defaultTo}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: (index * delay) / 1000,
            ease: [0.25, 0.4, 0.25, 1],
          }}
          className="inline-block mr-[0.25em] last:mr-0"
        >
          {element === " " ? "\u00A0" : element}
        </motion.span>
      ))}
    </span>
  );
}
