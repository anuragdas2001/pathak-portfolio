import React from "react";
import { Globe2, KeyRound, ShieldCheck, Terminal } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import type { FocusPillar, OperatorProfile } from "@/data/types";

interface AboutSectionProps {
  profile: OperatorProfile;
  focusPillars: FocusPillar[];
}

export function AboutSection({ profile, focusPillars }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto w-full border-t border-[var(--border)]"
    >
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--accent)] text-xs font-mono tracking-widest uppercase">
              <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{"01 // WHOAMI"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-[var(--text)]">
              Security-First Engineering
            </h2>
          </div>
          <p className="text-[var(--text-secondary)] max-w-[54ch] text-sm sm:text-base leading-relaxed">
            Treating security as an engineering discipline — reproducible, automated, and grounded in how systems actually fail.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Operator Dossier */}
          <div className="lg:col-span-6 cyber-panel p-6 sm:p-7 flex flex-col justify-between gap-6">
            <div className="space-y-5">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] pb-3 border-b border-[var(--border)]">
                <span className="text-[var(--accent)]">{"DOSSIER // ~/whoami.md"}</span>
                <span>{profile.handle}</span>
              </div>

              <div className="rounded-sm bg-[var(--bg)] border border-[var(--border)] p-4 font-mono text-xs text-[var(--text)] space-y-1.5 overflow-x-auto">
                <p className="text-[var(--text-muted)]">{"# Security engineering loop"}</p>
                <p>
                  <span className="text-[var(--accent-2)]">const</span>{" "}
                  <span className="text-[var(--text)]">workflow</span> = [
                  <span className="text-[var(--accent)]">&quot;threat-model&quot;</span>,{" "}
                  <span className="text-[var(--accent)]">&quot;harden&quot;</span>,{" "}
                  <span className="text-[var(--accent)]">&quot;verify&quot;</span>,{" "}
                  <span className="text-[var(--accent)]">&quot;monitor&quot;</span>];
                </p>
              </div>

              <div className="space-y-4 max-w-[65ch]">
                {profile.bio.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-[var(--text)] text-sm sm:text-base leading-[1.68]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[var(--border)] font-mono text-xs">
              <div className="p-3 rounded-sm bg-[var(--bg)] border border-[var(--border)] flex items-start gap-2.5">
                <Globe2 className="h-4 w-4 text-[var(--accent-2)] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="text-[var(--text-muted)] uppercase block text-[10px]">
                    Base &amp; Languages
                  </span>
                  <span className="text-[var(--text)] font-semibold">
                    {profile.location} · {profile.languages.join(", ")}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-sm bg-[var(--bg)] border border-[var(--border)] flex items-start gap-2.5">
                <KeyRound className="h-4 w-4 text-[var(--accent)] shrink-0 mt-0.5" aria-hidden="true" />
                <div className="min-w-0">
                  <span className="text-[var(--text-muted)] uppercase block text-[10px]">
                    PGP Key Fingerprint
                  </span>
                  <span className="text-[var(--text)] font-semibold break-all text-[11px]">
                    {profile.pgpFingerprint}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Security Focus Pillars */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {focusPillars.map((pillar) => (
              <article
                key={pillar.code}
                className="cyber-panel p-5 flex flex-col justify-between gap-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-[var(--accent)] font-bold">{pillar.code}</span>
                    <ShieldCheck className="h-4 w-4 text-[var(--accent-2)]" aria-hidden="true" />
                  </div>
                  <h3 className="font-mono text-base font-bold text-[var(--text)] leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {pillar.summary}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--border)]">
                  {pillar.techniques.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-sm bg-[var(--bg)] border border-[var(--border)] font-mono text-[11px] text-[var(--accent-2)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

