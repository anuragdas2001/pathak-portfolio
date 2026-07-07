"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation?: string;
  title?: string;
  company?: string;
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, testimonials.length]);

  const getRotateY = (index: number) => {
    const rotations = [-7, 5, -3, 8, -6, 4, -9, 6, -4, 7];
    return rotations[index % rotations.length];
  };

  return (
    <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12 w-full">
      <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2 items-center">
        <div>
          <div className="relative h-80 w-full max-w-[24rem] mx-auto sm:h-96">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: getRotateY(index),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : getRotateY(index),
                    zIndex: isActive(index)
                      ? 40
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: getRotateY(index),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-black/80 shadow-2xl overflow-hidden"
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col justify-between py-4">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
            className="min-h-[14rem] flex flex-col justify-center"
          >
            <h3 className="text-2xl sm:text-3xl font-extrabold text-black dark:text-white tracking-tight">
              {testimonials[active].name}
            </h3>
            <p className="text-sm sm:text-base text-gray-500 dark:text-neutral-400 font-mono mt-1">
              {testimonials[active].designation || `${testimonials[active].title} ${testimonials[active].company ? `— ${testimonials[active].company}` : ""}`}
            </p>
            <motion.p className="mt-6 text-base sm:text-lg text-gray-700 dark:text-neutral-300 italic leading-relaxed">
              &quot;{testimonials[active].quote}&quot;
            </motion.p>
          </motion.div>
          <div className="flex gap-4 pt-12 md:pt-6">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-black/5 border border-black/15 dark:border-white/15 dark:bg-neutral-800 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
            >
              <IconArrowLeft className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:rotate-12 group-hover/button:text-white dark:group-hover/button:text-black dark:text-neutral-400" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-black/5 border border-black/15 dark:border-white/15 dark:bg-neutral-800 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
            >
              <IconArrowRight className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:-rotate-12 group-hover/button:text-white dark:group-hover/button:text-black dark:text-neutral-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
