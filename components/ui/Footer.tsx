"use client";

import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { ArrowUp, MessageSquare, Mail, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/ui/icons";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Github":
        return <GithubIcon className="h-4 w-4" />;
      case "Linkedin":
        return <LinkedinIcon className="h-4 w-4" />;
      case "Twitter":
        return <XIcon className="h-4 w-4" />;
      case "MessageSquare":
        return <MessageSquare className="h-4 w-4" />;
      case "Mail":
        return <Mail className="h-4 w-4" />;
      default:
        return <GithubIcon className="h-4 w-4" />;
    }
  };

  return (
    <footer className="relative border-t border-black/10 dark:border-white/10 bg-white/90 dark:bg-black/80 px-6 py-16 backdrop-blur-lg overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <div className="flex items-center gap-2 font-mono text-lg font-bold text-black dark:text-white">
            <span className="h-2 w-2 rounded-full bg-black dark:bg-white animate-ping" />
            <span>{PORTFOLIO_DATA.developer.name}</span>
            <span className="text-black dark:text-white font-sans text-xs border border-black/20 dark:border-white/20 px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10">
              {PORTFOLIO_DATA.developer.status.split(" ")[0]}
            </span>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-sm">
            {PORTFOLIO_DATA.developer.tagline}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {PORTFOLIO_DATA.socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-black dark:text-white transition-all duration-300 hover:border-black dark:hover:border-white hover:bg-black/10 dark:hover:bg-white/10 hover:scale-110 shadow-sm"
              data-cursor-text={social.name}
              aria-label={social.name}
            >
              {getIcon(social.icon)}
            </a>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-2 text-xs font-semibold text-black dark:text-white transition-all duration-300 hover:border-black dark:hover:border-white hover:bg-black/10 dark:hover:bg-white/10"
            data-cursor-text="Top"
          >
            <span>Back to Top</span>
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-1 text-black dark:text-white" />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-black/10 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
        <p>© {new Date().getFullYear()} {PORTFOLIO_DATA.developer.name}. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Crafted with <Heart className="h-3 w-3 text-black dark:text-white fill-current inline animate-pulse" /> using Next.js 16, Three.js & GSAP.
        </p>
      </div>
    </footer>
  );
}
