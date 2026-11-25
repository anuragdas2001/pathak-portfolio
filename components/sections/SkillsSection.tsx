"use client";

import React, { useMemo, useState } from "react";
import { Cpu, FolderGit2, Search } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import type { ProficiencyLevel, SkillCategory, SkillItem } from "@/data/types";

interface SkillsSectionProps {
  skills: SkillItem[];
}

const CATEGORIES: SkillCategory[] = [
  "Offensive & AppSec",
  "Defensive & SecOps",
  "Cloud & Infra",
  "Scripting & Dev",
];

function getProficiencySegments(level: ProficiencyLevel): number {
  switch (level) {
    case "Core":
      return 9;
    case "Advanced":
      return 7;
    case "Working":
      return 5;
  }
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<"All" | SkillCategory>("All");
  const [query, setQuery] = useState("");

  const filteredSkills = useMemo(() => {
    const q = query.trim().toLowerCase();
    return skills.filter(
      (item) =>
        (selectedCategory === "All" || item.category === selectedCategory) &&
        (!q ||
          item.name.toLowerCase().includes(q) ||
          item.context.toLowerCase().includes(q))
    );
  }, [skills, selectedCategory, query]);

  return (
    <section
      id="skills"
      className="py-20 px-4 sm:px-6 lg:px-10 border-y border-[var(--border)] bg-[var(--bg-elevated)]/35"
    >
      <Reveal className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--accent)] text-xs font-mono tracking-widest uppercase">
              <Cpu className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{"02 // ./TOOLKIT"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-[var(--text)]">
              Security Stack &amp; Tooling
            </h2>
          </div>
          <p className="text-[var(--text-secondary)] max-w-[54ch] text-sm sm:text-base leading-relaxed">
            Tools, protocols, and languages grouped across offensive review, defensive monitoring, cloud hardening, and automation.
          </p>
        </div>

        <div className="cyber-panel overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Category Filter Sidebar */}
          <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-[var(--border)] bg-[var(--bg)]/75 p-5 flex flex-col justify-between gap-5">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--text-muted)] mb-3">
                {"// TOOLKIT_GROUPS"}
              </p>

              <div role="tablist" aria-label="Filter toolkit by category" className="flex flex-col gap-1.5">
                {(["All", ...CATEGORIES] as const).map((cat) => {
                  const active = selectedCategory === cat;
                  const count =
                    cat === "All"
                      ? skills.length
                      : skills.filter((s) => s.category === cat).length;

                  return (
                    <button
                      key={cat}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setSelectedCategory(cat)}
                      className={`flex items-center justify-between px-3.5 py-2.5 min-h-[44px] rounded-sm font-mono text-xs border transition-colors cursor-pointer ${
                        active
                          ? "border-[var(--accent)] bg-[var(--accent)]/12 text-[var(--accent)] font-bold"
                          : "border-transparent bg-[var(--bg-elevated)]/65 text-[var(--text-secondary)] hover:border-[var(--border)] hover:text-[var(--accent-2)]"
                      }`}
                    >
                      <span className="inline-flex items-center gap-2 text-left">
                        <FolderGit2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{cat === "All" ? "~/all_modules" : cat}</span>
                      </span>
                      <span className="text-[11px] text-[var(--text-muted)]">[{count}]</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <label htmlFor="toolkit-filter-input" className="sr-only">
                Search security tools and skills
              </label>
              <Search
                className="h-4 w-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="toolkit-filter-input"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="grep -i <tool_or_domain>..."
                className="w-full rounded-sm border border-[var(--border)] bg-[var(--bg-elevated)] pl-9 pr-3 py-2 min-h-[44px] font-mono text-xs text-[var(--text)] placeholder-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
              />
            </div>
          </div>

          {/* Skills Grid */}
          <div className="lg:col-span-8 p-5 sm:p-6">
            <div className="flex items-center justify-between pb-3 mb-5 border-b border-[var(--border)] font-mono text-xs">
              <h3 className="font-bold uppercase tracking-wider text-[var(--accent-2)]">
                {`// ${selectedCategory === "All" ? "ALL_MODULES" : selectedCategory}`}
              </h3>
              <span className="text-[var(--text-muted)]">
                {filteredSkills.length} active modules
              </span>
            </div>

            {filteredSkills.length === 0 ? (
              <div className="py-12 text-center font-mono text-sm text-[var(--text-secondary)]">
                No toolkit modules match &ldquo;{query}&rdquo;.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {filteredSkills.map((skill) => {
                  const segments = getProficiencySegments(skill.proficiency);
                  return (
                    <div
                      key={skill.name}
                      className="p-4 rounded-sm bg-[var(--bg)] border border-[var(--border)] hover:border-[var(--accent)]/55 transition-colors flex flex-col justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-mono text-sm font-semibold text-[var(--text)]">
                            {skill.name}
                          </span>
                          <span className="font-mono text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-xs border border-[var(--accent)]/35 bg-[var(--accent)]/10 text-[var(--accent)] shrink-0">
                            {skill.proficiency}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                          {skill.context}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <span className="sr-only">
                          Proficiency level: {skill.proficiency} ({segments} out of 10)
                        </span>
                        <div className="grid grid-cols-10 gap-1" aria-hidden="true">
                          {Array.from({ length: 10 }).map((_, idx) => (
                            <span
                              key={idx}
                              className={`h-1 rounded-xs ${
                                idx < segments
                                  ? idx >= 7
                                    ? "bg-[var(--accent-2)]"
                                    : "bg-[var(--accent)]"
                                  : "bg-[var(--border)]"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

