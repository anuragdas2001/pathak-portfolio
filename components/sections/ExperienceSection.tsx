import React from "react";
import { Award, Briefcase, ExternalLink, MapPin } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import type { CredentialEntry, ExperienceEntry } from "@/data/types";

interface ExperienceSectionProps {
  experience: ExperienceEntry[];
  credentials: CredentialEntry[];
}

export function ExperienceSection({ experience, credentials }: ExperienceSectionProps) {
  return (
    <section
      id="experience"
      className="py-20 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto w-full"
    >
      <Reveal className="space-y-16">
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--accent)] text-xs font-mono tracking-widest uppercase">
                <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{"05 // OPERATIONS_LOG"}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-[var(--text)]">
                Experience &amp; Credentials
              </h2>
            </div>
            <p className="text-[var(--text-secondary)] max-w-[54ch] text-sm sm:text-base leading-relaxed">
              Timeline of security engineering, SOC automation, and backend hardening work.
            </p>
          </div>

          <ol className="relative border-l border-[var(--border)] ml-3 space-y-8">
            {experience.map((item) => (
              <li key={item.id} className="pl-7 sm:pl-9 relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[5px] top-6 h-2.5 w-2.5 rounded-full bg-[var(--accent)] border-2 border-[var(--bg)]"
                />

                <article className="cyber-panel p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--border)]">
                    <div>
                      <h3 className="font-mono text-lg font-bold text-[var(--text)]">
                        {item.role}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono mt-1">
                        {item.orgUrl ? (
                          <a
                            href={item.orgUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[var(--accent-2)] hover:text-[var(--accent)] transition-colors"
                          >
                            <span>{item.organization}</span>
                            <ExternalLink className="h-3 w-3" aria-hidden="true" />
                          </a>
                        ) : (
                          <span className="text-[var(--accent-2)]">{item.organization}</span>
                        )}
                        <span className="inline-flex items-center gap-1 text-[var(--text-muted)]">
                          <MapPin className="h-3 w-3" aria-hidden="true" />
                          <span>{item.location}</span>
                        </span>
                      </div>
                    </div>

                    <span className="self-start sm:self-center px-2.5 py-1 rounded-sm bg-[var(--bg)] border border-[var(--border)] font-mono text-xs text-[var(--accent)]">
                      {item.period}
                    </span>
                  </div>

                  <p className="text-sm text-[var(--text)] leading-relaxed max-w-[70ch]">
                    {item.summary}
                  </p>

                  <ul className="space-y-1.5 text-sm text-[var(--text-secondary)] list-disc list-inside">
                    {item.outcomes.map((outcome) => (
                      <li key={outcome} className="leading-relaxed">
                        {outcome}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-sm bg-[var(--bg)] border border-[var(--border)] font-mono text-[11px] text-[var(--text-secondary)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>

        {/* Certifications & Training Templates */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--accent-2)]">
            <Award className="h-4 w-4" aria-hidden="true" />
            <span>{"CREDENTIALS_SLOT // REPLACE_WITH_VERIFIED_CERTS"}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {credentials.map((cred) => (
              <div key={cred.id} className="cyber-panel p-5 flex flex-col justify-between gap-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-[var(--text-muted)]">{cred.code}</span>
                    <span className="px-2 py-0.5 rounded-xs border border-[var(--warn)]/40 bg-[var(--warn)]/10 text-[var(--warn)] font-bold">
                      {cred.status}
                    </span>
                  </div>
                  <h3 className="font-mono text-base font-bold text-[var(--text)]">
                    {cred.name}
                  </h3>
                  <p className="font-mono text-xs text-[var(--accent-2)]">{cred.issuer}</p>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed pt-2 border-t border-[var(--border)]">
                  {cred.notes}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

