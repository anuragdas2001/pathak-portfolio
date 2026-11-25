"use client";

import React, { useMemo, useState } from "react";
import { ExternalLink, FileCode2, FolderLock, Shield, Terminal, Wrench } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import type { ProjectCategory, SecurityProject } from "@/data/types";

interface ProjectsSectionProps {
  projects: SecurityProject[];
}

const CATEGORIES: Array<"ALL" | ProjectCategory> = ["ALL", "TOOL", "DEFENSE", "RESEARCH", "CTF"];

function getCategoryMeta(category: ProjectCategory) {
  switch (category) {
    case "TOOL":
      return {
        label: "[TOOL]",
        colorClass: "text-[var(--accent)] border-[var(--accent)]/40 bg-[var(--accent)]/10",
        Icon: Wrench,
      };
    case "DEFENSE":
      return {
        label: "[DEFENSE]",
        colorClass: "text-[var(--accent-2)] border-[var(--accent-2)]/40 bg-[var(--accent-2)]/10",
        Icon: Shield,
      };
    case "RESEARCH":
      return {
        label: "[RESEARCH]",
        colorClass: "text-[var(--warn)] border-[var(--warn)]/40 bg-[var(--warn)]/10",
        Icon: FileCode2,
      };
    case "CTF":
      return {
        label: "[CTF]",
        colorClass: "text-[var(--danger)] border-[var(--danger)]/40 bg-[var(--danger)]/10",
        Icon: FolderLock,
      };
  }
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [filter, setFilter] = useState<"ALL" | ProjectCategory>("ALL");

  const visibleProjects = useMemo(() => {
    if (filter === "ALL") return projects;
    return projects.filter((p) => p.category === filter);
  }, [projects, filter]);

  return (
    <section
      id="projects"
      className="py-20 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto w-full"
    >
      <Reveal>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--accent)] text-xs font-mono tracking-widest uppercase">
              <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{"03 // ./PROJECTS"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-[var(--text)]">
              Security Tools &amp; Lab Builds
            </h2>
          </div>

          <div
            role="group"
            aria-label="Filter projects by type"
            className="flex flex-wrap items-center gap-2"
          >
            {CATEGORIES.map((cat) => {
              const active = filter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(cat)}
                  className={`px-3 min-h-[44px] rounded-sm border font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                    active
                      ? "border-[var(--accent)] bg-[var(--accent)]/12 text-[var(--accent)] font-bold"
                      : "border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:border-[var(--accent-2)] hover:text-[var(--accent-2)]"
                  }`}
                >
                  {cat === "ALL" ? "ALL" : `[${cat}]`}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleProjects.map((project, idx) => {
            const meta = getCategoryMeta(project.category);
            const Icon = meta.Icon;
            const indexLabel = String(idx + 1).padStart(2, "0");

            return (
              <article
                key={project.id}
                className="cyber-panel flex flex-col justify-between overflow-hidden hover:-translate-y-1 group"
              >
                {/* Corner Brackets */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 left-0 h-2.5 w-2.5 border-t-2 border-l-2 border-[var(--accent)]/60 group-hover:border-[var(--accent)] transition-colors"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-0 right-0 h-2.5 w-2.5 border-b-2 border-r-2 border-[var(--accent)]/60 group-hover:border-[var(--accent)] transition-colors"
                />

                <div>
                  {/* Top Status Strip */}
                  <div className="px-5 py-3 border-b border-[var(--border)] bg-[var(--bg)]/85 flex items-center justify-between gap-2 font-mono text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[var(--text-muted)]">{`#${indexLabel}`}</span>
                      <span
                        className={`px-2 py-0.5 rounded-xs border text-[11px] font-bold ${meta.colorClass}`}
                      >
                        {meta.label}
                      </span>
                    </div>
                    <span className="text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                      {project.status}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <div className="flex items-start gap-3.5">
                      <div className="h-11 w-11 rounded-sm bg-[var(--bg)] border border-[var(--border)] group-hover:border-[var(--accent)]/60 flex items-center justify-center shrink-0 transition-colors">
                        <Icon className="h-5 w-5 text-[var(--accent)]" aria-hidden="true" />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <h3 className="font-mono text-lg font-bold text-[var(--text)] leading-snug">
                          {project.title}
                        </h3>
                        <p className="font-mono text-xs text-[var(--accent-2)]">
                          {project.subtitle}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-[var(--text)] leading-relaxed max-w-[65ch]">
                      {project.description}
                    </p>

                    <ul className="space-y-1.5 border-l-2 border-[var(--border)] pl-3 text-xs text-[var(--text-secondary)]">
                      {project.highlights.map((item) => (
                        <li key={item} className="leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Tags & Links */}
                <div className="px-5 sm:px-6 pb-6 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-sm bg-[var(--bg)] border border-[var(--border)] font-mono text-[11px] text-[var(--text-secondary)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3 pt-4 border-t border-[var(--border)]">
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View source repository for ${project.title}`}
                      className="cyber-btn-secondary flex-1 inline-flex items-center justify-center gap-2 px-4 min-h-[44px] font-mono text-xs font-semibold uppercase tracking-wider"
                    >
                      <GithubIcon className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Source</span>
                    </a>

                    {project.docsUrl && (
                      <a
                        href={project.docsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Read documentation for ${project.title}`}
                        className="cyber-btn-primary flex-1 inline-flex items-center justify-center gap-2 px-4 min-h-[44px] font-mono text-xs font-bold uppercase tracking-wider"
                      >
                        <span>Docs</span>
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}

