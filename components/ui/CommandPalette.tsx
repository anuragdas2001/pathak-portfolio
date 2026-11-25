"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Search, Terminal, ArrowRight, Copy, Check, KeyRound, X } from "lucide-react";
import type { NavItem, SecurityProject } from "@/data/types";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  email: string;
  pgpFingerprint: string;
  navItems: NavItem[];
  projects: SecurityProject[];
}

export function CommandPalette({
  open,
  onClose,
  email,
  pgpFingerprint,
  navItems,
  projects,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [copiedField, setCopiedField] = useState<"email" | "pgp" | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 20);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const routes = useMemo(
    () => [
      { label: "cd ~/hero", hint: "Operator Console & Terminal", href: "#hero" },
      ...navItems.map((item) => ({
        label: item.label,
        hint: item.ariaLabel,
        href: item.href,
      })),
    ],
    [navItems]
  );

  const normalizedQuery = query.trim().toLowerCase();

  const filteredRoutes = useMemo(() => {
    if (!normalizedQuery) return routes;
    return routes.filter(
      (r) =>
        r.label.toLowerCase().includes(normalizedQuery) ||
        r.hint.toLowerCase().includes(normalizedQuery)
    );
  }, [routes, normalizedQuery]);

  const filteredProjects = useMemo(() => {
    if (!normalizedQuery) return projects.slice(0, 3);
    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(normalizedQuery) ||
        p.category.toLowerCase().includes(normalizedQuery) ||
        p.stack.some((s) => s.toLowerCase().includes(normalizedQuery))
    );
  }, [projects, normalizedQuery]);

  if (!open) return null;

  const navigateTo = (href: string) => {
    const id = href.replace(/^#/, "");
    const el = document.getElementById(id);
    if (el) {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    }
    setQuery("");
    onClose();
  };

  const copyValue = async (value: string, field: "email" | "pgp") => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      window.setTimeout(() => setCopiedField(null), 1800);
    } catch {
      // Clipboard API unavailable in restricted context
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Quick command palette"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl cyber-panel shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)] bg-[var(--bg)]">
          <Terminal className="h-4 w-4 text-[var(--accent)] shrink-0" aria-hidden="true" />
          <label htmlFor="cmd-palette-input" className="sr-only">
            Search navigation commands and projects
          </label>
          <input
            id="cmd-palette-input"
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, section, or tool (e.g. projects, pgp, go)..."
            className="w-full bg-transparent font-mono text-xs sm:text-sm text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close command palette"
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-sm border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] cursor-pointer"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="p-2 max-h-96 overflow-y-auto space-y-1">
          <p className="px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
            {"// NAVIGATION_ROUTES"}
          </p>
          {filteredRoutes.map((route) => (
            <button
              key={route.href}
              type="button"
              onClick={() => navigateTo(route.href)}
              className="w-full flex items-center justify-between gap-3 px-3 min-h-[44px] rounded-sm text-left hover:bg-[var(--accent)]/10 border border-transparent hover:border-[var(--accent)]/30 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Search className="h-3.5 w-3.5 text-[var(--accent)] shrink-0" aria-hidden="true" />
                <span className="font-mono text-xs sm:text-sm font-semibold text-[var(--text)] group-hover:text-[var(--accent)]">
                  {route.label}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="hidden sm:inline font-mono text-[11px] text-[var(--text-muted)]">
                  {route.hint}
                </span>
                <ArrowRight
                  className="h-3.5 w-3.5 text-[var(--text-muted)] group-hover:text-[var(--accent)]"
                  aria-hidden="true"
                />
              </div>
            </button>
          ))}

          {filteredProjects.length > 0 && (
            <>
              <p className="px-3 pt-3 pb-1 font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] border-t border-[var(--border)] mt-2">
                {"// PROJECTS_INDEX"}
              </p>
              {filteredProjects.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => navigateTo("#projects")}
                  className="w-full flex items-center justify-between gap-3 px-3 min-h-[44px] rounded-sm text-left hover:bg-[var(--accent-2)]/10 border border-transparent hover:border-[var(--accent-2)]/30 transition-colors cursor-pointer group"
                >
                  <span className="font-mono text-xs text-[var(--text)] truncate group-hover:text-[var(--accent-2)]">
                    <span className="text-[var(--accent-2)] mr-2">[{project.category}]</span>
                    {project.title}
                  </span>
                  <ArrowRight
                    className="h-3.5 w-3.5 text-[var(--text-muted)] group-hover:text-[var(--accent-2)] shrink-0"
                    aria-hidden="true"
                  />
                </button>
              ))}
            </>
          )}

          <p className="px-3 pt-3 pb-1 font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] border-t border-[var(--border)] mt-2">
            {"// QUICK_ACTIONS"}
          </p>
          <button
            type="button"
            onClick={() => copyValue(email, "email")}
            className="w-full flex items-center justify-between px-3 min-h-[44px] rounded-sm text-left hover:bg-[var(--accent)]/10 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2.5 font-mono text-xs sm:text-sm text-[var(--text)]">
              {copiedField === "email" ? (
                <Check className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden="true" />
              ) : (
                <Copy className="h-3.5 w-3.5 text-[var(--accent-2)]" aria-hidden="true" />
              )}
              <span>
                {copiedField === "email" ? "Copied email to clipboard" : `Copy email (${email})`}
              </span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => copyValue(pgpFingerprint, "pgp")}
            className="w-full flex items-center justify-between px-3 min-h-[44px] rounded-sm text-left hover:bg-[var(--accent)]/10 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2.5 font-mono text-xs sm:text-sm text-[var(--text)]">
              {copiedField === "pgp" ? (
                <Check className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden="true" />
              ) : (
                <KeyRound className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden="true" />
              )}
              <span>
                {copiedField === "pgp"
                  ? "Copied PGP fingerprint"
                  : "Copy PGP fingerprint"}
              </span>
            </span>
          </button>
        </div>

        <div className="px-4 py-2 border-t border-[var(--border)] bg-[var(--bg)] flex items-center justify-between font-mono text-[11px] text-[var(--text-muted)]">
          <span>ESC to close</span>
          <span>CTRL+K / ⌘K</span>
        </div>
      </div>
    </div>
  );
}
