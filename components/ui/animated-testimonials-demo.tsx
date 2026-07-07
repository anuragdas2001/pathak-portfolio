"use client";

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function AnimatedTestimonialsDemo() {
  return <AnimatedTestimonials testimonials={PORTFOLIO_DATA.testimonials} autoplay={true} />;
}
