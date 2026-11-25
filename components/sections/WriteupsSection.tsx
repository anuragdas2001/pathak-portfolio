import React from "react";
import { ArrowUpRight, BookOpen, CheckSquare } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import type { WriteupEntry } from "@/data/types";

interface WriteupsSectionProps {
  writeups: WriteupEntry[];
}

export function WriteupsSection({ writeups }: WriteupsSectionProps) {
  return (
    <section
      id="writeups"
      className="py-20 px-4 sm:px-6 lg:px-10 border-y border-[var(--border)] bg-[var(--bg-elevated)]/35"
    >
      <Reveal className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--accent)] text-xs font-mono tracking-widest uppercase">
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{"04 // ./WRITEUPS"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-[var(--text)]">
              Research Notes &amp; Lab Writeups
            </h2>
          </div>
          <p className="text-[var(--text-secondary)] max-w-[54ch] text-sm sm:text-base leading-relaxed">
            Defensive engineering notes, hardening checklists, and reproducible lab walkthroughs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {writeups.map((entry) => (
            <article
              key={entry.id}
              className="cyber-panel p-6 flex flex-col justify-between gap-5 hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[var(--border)] font-mono text-xs">
                  <span className="px-2 py-0.5 rounded-xs border border-[var(--accent-2)]/40 bg-[var(--accent-2)]/10 text-[var(--accent-2)] font-bold">
                    [{entry.tag}]
                  </span>
                  <span className="text-[var(--text-muted)]">
                    {entry.date} · {entry.readTime}
                  </span>
                </div>

                <h3 className="font-mono text-lg font-bold text-[var(--text)] leading-snug">
                  {entry.title}
                </h3>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {entry.summary}
                </p>

                <ul className="space-y-2 pt-2">
                  {entry.takeaways.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-xs text-[var(--text)] leading-relaxed"
                    >
                      <CheckSquare
                        className="h-3.5 w-3.5 text-[var(--accent)] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-btn-secondary inline-flex items-center justify-between px-4 min-h-[44px] font-mono text-xs uppercase tracking-wider"
              >
                <span>Read Note</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

