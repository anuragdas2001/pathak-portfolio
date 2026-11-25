"use client";

import React from "react";
import { ArrowUp, Mail, ShieldCheck, Terminal } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/ui/icons";
import type { OperatorProfile, SocialEndpoint } from "@/data/types";

interface FooterProps {
  profile: OperatorProfile;
  socials: SocialEndpoint[];
}

function getSocialIcon(name: SocialEndpoint["name"]) {
  switch (name) {
    case "GitHub":
      return <GithubIcon className="h-4 w-4" aria-hidden="true" />;
    case "LinkedIn":
      return <LinkedinIcon className="h-4 w-4" aria-hidden="true" />;
    case "X":
      return <XIcon className="h-4 w-4" aria-hidden="true" />;
    case "Email":
      return <Mail className="h-4 w-4" aria-hidden="true" />;
    default:
      return <Terminal className="h-4 w-4" aria-hidden="true" />;
  }
}

export function Footer({ profile, socials }: FooterProps) {
  const scrollToTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-[var(--border)] bg-[var(--bg-elevated)]/90 px-4 sm:px-6 lg:px-10 py-12 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <div className="flex items-center gap-2.5 font-mono text-base font-bold text-[var(--text)]">
            <span className="h-2 w-2 rounded-full bg-[var(--accent)]" aria-hidden="true" />
            <span>{profile.name}</span>
            <span className="text-xs font-mono text-[var(--accent-2)]">({profile.handle})</span>
          </div>
          <p className="text-sm text-[var(--text-secondary)] max-w-md leading-relaxed">
            {profile.role} — {profile.location}
          </p>
        </div>

        <nav aria-label="Footer social links" className="flex items-center gap-2.5">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target={social.url.startsWith("http") ? "_blank" : undefined}
              rel={social.url.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={social.name}
              className="flex h-11 w-11 items-center justify-center rounded-sm border border-[var(--border)] bg-[var(--bg)] text-[var(--text-secondary)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {getSocialIcon(social.name)}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={scrollToTop}
          className="cyber-btn-secondary group inline-flex items-center gap-2 px-4 min-h-[44px] font-mono text-xs uppercase tracking-wider cursor-pointer"
        >
          <span>cd ~ / top</span>
          <ArrowUp
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </button>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[var(--text-muted)] gap-4">
        <p className="flex items-center gap-2">
          <ShieldCheck className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden="true" />
          <span>
            © {new Date().getFullYear()} {profile.name} — session secured
          </span>
        </p>
        <p>Static template data · Ready for dynamic data source</p>
      </div>
    </footer>
  );
}

