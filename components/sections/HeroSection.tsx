"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  Code2,
  FastForward,
  FileJson,
  MapPin,
  RotateCcw,
  Shield,
  Terminal,
} from "lucide-react";
import type { LanyardRevealPhase } from "@/components/ui/Lanyard";
import type { PortfolioData } from "@/data/types";

const Lanyard = dynamic(() => import("@/components/ui/Lanyard"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 font-mono text-xs text-[var(--text-muted)]">
      <Shield className="h-6 w-6 text-[var(--accent)] animate-pulse" aria-hidden="true" />
      <span>INITIALIZING_3D_BADGE...</span>
    </div>
  ),
});

interface HeroSectionProps {
  data: PortfolioData;
}

const QUICK_COMMANDS = [
  "help",
  "whoami",
  "skills",
  "projects",
  "writeups",
  "pgp",
  "contact",
  "clear",
] as const;

export function HeroSection({ data }: HeroSectionProps) {
  const { profile, stats, skills, projects, writeups, experience } = data;

  const terminalScript = useMemo(
    () => [
      { cmd: "$ whoami", output: `${profile.name} (${profile.handle}) — ${profile.location}` },
      { cmd: "$ cat role.txt", output: `${profile.role} · ${profile.specialty}` },
      {
        cmd: "$ ls toolkit/",
        output: "offensive-appsec/  defensive-secops/  cloud-infra/  scripting-dev/",
      },
    ],
    [profile]
  );

  const fullText = useMemo(
    () => terminalScript.map((entry) => `${entry.cmd}\n${entry.output}`).join("\n"),
    [terminalScript]
  );

  const [typedChars, setTypedChars] = useState<number>(fullText.length);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"console" | "profile">("console");
  const [commandInput, setCommandInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<Array<{ cmd: string; out: string }>>([]);
  const [revealTrigger, setRevealTrigger] = useState(0);
  const [badgePhase, setBadgePhase] = useState<LanyardRevealPhase>("decrypting");
  const terminalScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let current = 0;
    let intervalId = 0;

    const startTimeout = window.setTimeout(() => {
      setTypedChars(0);
      setIsTyping(true);
      intervalId = window.setInterval(() => {
        current = Math.min(fullText.length, current + 8);
        setTypedChars(current);
        if (current >= fullText.length) {
          window.clearInterval(intervalId);
          setIsTyping(false);
        }
      }, 18);
    }, 30);

    return () => {
      window.clearTimeout(startTimeout);
      window.clearInterval(intervalId);
    };
  }, [fullText]);

  const skipTyping = () => {
    setTypedChars(fullText.length);
    setIsTyping(false);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    }
  };

  const runCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === "clear") {
      setCommandHistory([]);
      setCommandInput("");
      return;
    }

    let out = "";
    switch (cmd) {
      case "help":
        out =
          "Commands: whoami, skills, projects, writeups, experience, pgp, contact, clear (harmless local demo)";
        break;
      case "whoami":
        out = `${profile.name} (${profile.handle}) | ${profile.role} | ${profile.location}`;
        break;
      case "skills":
        out =
          skills
            .slice(0, 8)
            .map((s) => s.name)
            .join(", ") + ` (+${Math.max(0, skills.length - 8)} more in ./toolkit)`;
        break;
      case "projects":
        out = projects.map((p) => `[${p.category}] ${p.title}`).join(" | ");
        break;
      case "writeups":
        out = writeups.map((w) => `[${w.tag}] ${w.title}`).join(" | ");
        break;
      case "experience":
        out = experience.map((e) => `${e.role} @ ${e.organization} (${e.period})`).join(" · ");
        break;
      case "pgp":
        out = `PGP Fingerprint: ${profile.pgpFingerprint}`;
        break;
      case "contact":
        out = `Email: ${profile.email} | Location: ${profile.location} (${profile.timezone})`;
        break;
      default:
        out = `sh: command not found: ${cmd}. Type "help" for available commands.`;
    }

    setActiveTab("console");
    setTypedChars(fullText.length);
    setIsTyping(false);
    setCommandHistory((prev) => [...prev.slice(-4), { cmd, out }]);
    setCommandInput("");
    window.setTimeout(() => {
      if (terminalScrollRef.current) {
        terminalScrollRef.current.scrollTop = terminalScrollRef.current.scrollHeight;
      }
    }, 20);
  };

  const visibleEntries = useMemo(() => {
    return terminalScript.reduce<{
      remaining: number;
      entries: Array<{ cmd: string; output: string; hasCmd: boolean; hasOut: boolean }>;
    }>(
      (acc, entry) => {
        const cmdSlice = entry.cmd.slice(0, Math.max(0, acc.remaining));
        const afterCmd = Math.max(0, acc.remaining - entry.cmd.length - 1);
        const outSlice = entry.output.slice(0, Math.max(0, afterCmd));
        const afterOut = Math.max(0, afterCmd - entry.output.length - 1);
        acc.entries.push({
          cmd: cmdSlice,
          output: outSlice,
          hasCmd: cmdSlice.length > 0,
          hasOut: outSlice.length > 0,
        });
        acc.remaining = afterOut;
        return acc;
      },
      { remaining: typedChars, entries: [] }
    ).entries;
  }, [terminalScript, typedChars]);

  const lastCmdIdx = visibleEntries.findLastIndex((e) => e.hasCmd);

  return (
    <section
      id="hero"
      className="relative w-full pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Operator Intro + Interactive Terminal */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[var(--bg-elevated)] border border-[var(--border)] font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
            <Shield className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{"00 // OPERATOR_PROFILE"}</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-mono tracking-tight text-[var(--text)] leading-[1.08]">
              <span className="cyber-glitch">{profile.name}</span>
            </h1>
            <p className="font-mono text-base sm:text-lg text-[var(--accent-2)] font-medium">
              {profile.role}
            </p>
            <p className="text-[var(--text-secondary)] text-base leading-relaxed max-w-[62ch]">
              {profile.tagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--text-muted)]">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-secondary)]">
              <MapPin className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden="true" />
              <span>{profile.location}</span>
            </span>
            <span className="px-2.5 py-1 rounded-sm border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--accent-2)]">
              {profile.timezone}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              onClick={(e) => scrollToSection(e, "projects")}
              className="cyber-btn-primary inline-flex items-center gap-2 px-6 py-3 min-h-[44px] font-mono text-xs sm:text-sm font-bold uppercase tracking-wider"
            >
              <Code2 className="h-4 w-4" aria-hidden="true" />
              <span>./projects — View Work</span>
            </a>

            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "contact")}
              className="cyber-btn-secondary inline-flex items-center gap-2 px-6 py-3 min-h-[44px] font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider"
            >
              <Terminal className="h-4 w-4" aria-hidden="true" />
              <span>connect --secure</span>
            </a>
          </div>

          {/* Interactive Terminal Window */}
          <div className="cyber-panel overflow-hidden shadow-2xl">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-0 left-0 h-2.5 w-2.5 border-t-2 border-l-2 border-[var(--accent)] z-20"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-0 right-0 h-2.5 w-2.5 border-t-2 border-r-2 border-[var(--accent)] z-20"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-0 h-2.5 w-2.5 border-b-2 border-l-2 border-[var(--accent)] z-20"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 right-0 h-2.5 w-2.5 border-b-2 border-r-2 border-[var(--accent)] z-20"
            />

            <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 border-b border-[var(--border)] bg-[var(--bg)]/90">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--danger)]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--warn)]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
                </div>

                <div role="tablist" aria-label="Terminal view mode" className="flex items-center gap-1">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === "console"}
                    onClick={() => setActiveTab("console")}
                    className={`inline-flex items-center gap-1.5 px-2.5 min-h-[36px] rounded-xs font-mono text-xs cursor-pointer transition-colors ${
                      activeTab === "console"
                        ? "bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/40 font-bold"
                        : "text-[var(--text-muted)] hover:text-[var(--text)]"
                    }`}
                  >
                    <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>console.sh</span>
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === "profile"}
                    onClick={() => setActiveTab("profile")}
                    className={`inline-flex items-center gap-1.5 px-2.5 min-h-[36px] rounded-xs font-mono text-xs cursor-pointer transition-colors ${
                      activeTab === "profile"
                        ? "bg-[var(--accent-2)]/15 text-[var(--accent-2)] border border-[var(--accent-2)]/40 font-bold"
                        : "text-[var(--text-muted)] hover:text-[var(--text)]"
                    }`}
                  >
                    <FileJson className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>operator.json</span>
                  </button>
                </div>
              </div>

              {activeTab === "console" && isTyping ? (
                <button
                  type="button"
                  onClick={skipTyping}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm border border-[var(--border)] font-mono text-[11px] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-pointer"
                  aria-label="Skip terminal typing animation"
                >
                  <FastForward className="h-3 w-3" aria-hidden="true" />
                  <span>skip</span>
                </button>
              ) : (
                <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--accent)]">
                  READY
                </span>
              )}
            </div>

            <div className="sr-only">
              {terminalScript.map((entry, idx) => (
                <p key={idx}>
                  {entry.cmd} — {entry.output}
                </p>
              ))}
            </div>

            {activeTab === "console" ? (
              <>
                <div
                  ref={terminalScrollRef}
                  className="p-4 font-mono text-xs sm:text-sm space-y-2.5 min-h-[190px] max-h-[240px] overflow-y-auto bg-[var(--bg-panel)]"
                >
                  <div aria-hidden="true" className="space-y-2.5">
                    {visibleEntries.map((entry, idx) => (
                      <div key={idx} className="space-y-1">
                        {entry.hasCmd && (
                          <div className="text-[var(--accent)] font-semibold">
                            {entry.cmd}
                            {isTyping && !entry.hasOut && idx === lastCmdIdx && (
                              <span className="inline-block w-2 h-4 ml-1 align-middle bg-[var(--accent)] animate-cursor-blink" />
                            )}
                          </div>
                        )}
                        {entry.hasOut && (
                          <div className="text-[var(--text)] pl-3 border-l border-[var(--border)] leading-relaxed">
                            {entry.output}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {commandHistory.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="text-[var(--accent)] font-semibold">$ {item.cmd}</div>
                      <div className="text-[var(--accent-2)] pl-3 border-l border-[var(--accent-2)]/40 leading-relaxed break-words">
                        {item.out}
                      </div>
                    </div>
                  ))}

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      runCommand(commandInput);
                    }}
                    className="flex items-center gap-2 pt-1"
                  >
                    <label htmlFor="hero-terminal-input" className="sr-only">
                      Run a harmless local command (help, whoami, skills, projects, writeups, pgp, contact, clear)
                    </label>
                    <span className="text-[var(--accent)] font-bold shrink-0" aria-hidden="true">
                      $
                    </span>
                    <input
                      id="hero-terminal-input"
                      type="text"
                      value={commandInput}
                      onChange={(e) => setCommandInput(e.target.value)}
                      placeholder="type 'help' or click a command below..."
                      autoComplete="off"
                      spellCheck={false}
                      className="w-full bg-transparent text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none font-mono text-xs sm:text-sm"
                    />
                    {!isTyping && !commandInput && (
                      <span
                        aria-hidden="true"
                        className="inline-block w-2 h-4 bg-[var(--accent)] animate-cursor-blink shrink-0"
                      />
                    )}
                  </form>
                </div>

                <div className="px-4 py-2 border-t border-[var(--border)] bg-[var(--bg)]/80 flex flex-wrap items-center gap-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] mr-1">
                    quick_cmd:
                  </span>
                  {QUICK_COMMANDS.map((cmd) => (
                    <button
                      key={cmd}
                      type="button"
                      onClick={() => runCommand(cmd)}
                      className="px-2.5 py-1 min-h-[34px] rounded-sm border border-[var(--border)] bg-[var(--bg-elevated)] font-mono text-[11px] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-pointer"
                    >
                      {cmd}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <pre className="p-4 font-mono text-xs text-[var(--text)] overflow-x-auto min-h-[244px] leading-relaxed bg-[var(--bg-panel)]">
                <code>
                  {JSON.stringify(
                    {
                      handle: profile.handle,
                      name: profile.name,
                      role: profile.role,
                      specialty: profile.specialty,
                      location: profile.location,
                      projects_indexed: projects.length,
                      writeups_indexed: writeups.length,
                      toolkit_modules: skills.length,
                    },
                    null,
                    2
                  )}
                </code>
              </pre>
            )}
          </div>
        </div>

        {/* Right Column: Interactive 3D Lanyard Security Badge */}
        <div className="lg:col-span-5 w-full cyber-panel overflow-hidden">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-[var(--accent)] z-20"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-[var(--accent)] z-20"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-[var(--accent)] z-20"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-[var(--accent)] z-20"
          />

          <div className="px-4 py-2 border-b border-[var(--border)] bg-[var(--bg)]/85 flex items-center justify-between gap-2 font-mono text-[11px]">
            <span className="inline-flex items-center gap-1.5 text-[var(--accent)]">
              <Shield className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{"CLEARANCE_BAY // 3D_ID"}</span>
            </span>

            <div className="flex items-center gap-2">
              <span
                className={`uppercase text-[10px] px-2 py-0.5 rounded-xs border ${
                  badgePhase === "verified"
                    ? "border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)]"
                    : "border-[var(--accent-2)]/40 bg-[var(--accent-2)]/10 text-[var(--accent-2)]"
                }`}
              >
                {badgePhase === "decrypting"
                  ? "DECRYPTING_BIN"
                  : badgePhase === "reconstructing"
                  ? "RECONSTRUCTING"
                  : "ID_VERIFIED"}
              </span>

              <button
                type="button"
                onClick={() => {
                  setBadgePhase("decrypting");
                  setRevealTrigger((prev) => prev + 1);
                }}
                aria-label="Replay binary decryption animation on ID badge"
                className="inline-flex items-center gap-1 px-2.5 min-h-[34px] rounded-sm border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" aria-hidden="true" />
                <span>RE-DECRYPT</span>
              </button>
            </div>
          </div>

          <div
            className="relative bg-[var(--bg-panel)] cyber-dot-bg"
            style={{ width: "100%", height: "600px" }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              <div className="h-64 w-64 rounded-full border border-dashed border-[var(--accent)]/15" />
              <div className="absolute h-80 w-80 rounded-full border border-[var(--accent-2)]/10" />
            </div>

            <Lanyard
              frontImage="/card-front.jpg"
              backImage="/card-back.png"
              strapImage="/band.png"
              imageFit="cover"
              cardColor="#0a0e14"
              orientation="portrait"
              finish="glossy"
              cornerRadius={0.3}
              size={0.6}
              anchor="center"
              strapLength={0.5}
              strapColor="#111111"
              strapWidth={0.65}
              metal="silver"
              gravity={1}
              damping={0.5}
              elasticity={0.5}
              breeze={0.5}
              interactive
              intro
              cyberReveal
              revealTrigger={revealTrigger}
              badgeLabel={`${profile.handle}@sec`}
              badgeRole="APPSEC_ENGINEER"
              onRevealPhaseChange={setBadgePhase}
            />
          </div>

          <div className="px-4 py-2 border-t border-[var(--border)] bg-[var(--bg)]/85 flex items-center justify-between font-mono text-[11px] text-[var(--text-muted)]">
            <span>{profile.handle}@sec</span>
            <span className="text-[var(--accent-2)]">DRAG TO INSPECT · CLICK TO FLIP</span>
          </div>
        </div>
      </div>

      {/* Key Telemetry Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-8">
        {stats.map((stat) => (
          <div key={stat.label} className="cyber-panel p-4 flex flex-col gap-1">
            <span className="font-mono text-lg sm:text-xl font-bold text-[var(--accent)] tracking-tight">
              {stat.value}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text)]">
              {stat.label}
            </span>
            <span className="text-xs text-[var(--text-muted)] leading-snug">
              {stat.detail}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
