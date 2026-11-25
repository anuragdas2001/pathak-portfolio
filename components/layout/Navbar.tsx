"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Command, Menu, Terminal, X } from "lucide-react";
import { CommandPalette } from "@/components/ui/CommandPalette";
import type { NavItem, SecurityProject, SocialEndpoint } from "@/data/types";

interface NavbarProps {
  handle: string;
  name: string;
  email: string;
  pgpFingerprint: string;
  navItems: NavItem[];
  projects: SecurityProject[];
  socials: SocialEndpoint[];
}

export function Navbar({
  handle,
  name,
  email,
  pgpFingerprint,
  navItems,
  projects,
  socials,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>("#hero");

  const panelRef = useRef<HTMLElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  // Track active section cleanly on scroll
  useEffect(() => {
    const ids = ["hero", ...navItems.map((item) => item.href.replace(/^#/, ""))];
    const handleScroll = () => {
      const threshold = window.scrollY + 140;
      let current = `#${ids[0]}`;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= threshold) {
          current = `#${id}`;
        }
      }
      setActiveHref(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  // Global Ctrl+K / Cmd+K shortcut
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Close mobile menu on Escape and return focus
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
        toggleBtnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, closeMenu]);

  return (
    <>
      <CommandPalette
        open={cmdOpen}
        onClose={() => setCmdOpen(false)}
        email={email}
        pgpFingerprint={pgpFingerprint}
        navItems={navItems}
        projects={projects}
      />

      <header
        className="sticky top-0 left-0 right-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/85 backdrop-blur-md"
        aria-label="Primary site header"
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-4">
          <a
            href="#hero"
            onClick={closeMenu}
            aria-label={`${name} home`}
            className="inline-flex items-center gap-2.5 font-mono text-sm sm:text-base font-bold tracking-tight text-[var(--text)] hover:text-[var(--accent)] transition-colors min-h-[44px] px-1"
          >
            <span className="h-8 w-8 rounded-sm border border-[var(--accent)]/50 bg-[var(--accent)]/10 flex items-center justify-center shrink-0">
              <Terminal className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
            </span>
            <span className="cyber-glitch">
              {handle}
              <span className="text-[var(--accent)]">@sec</span>
              <span className="text-[var(--text-muted)]">:~$</span>
            </span>
          </a>

          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
            {navItems.map((item, idx) => {
              const isActive = activeHref === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-label={item.ariaLabel}
                  aria-current={isActive ? "location" : undefined}
                  className={`px-3 py-2 rounded-sm font-mono text-xs tracking-wider transition-colors min-h-[44px] inline-flex items-center gap-1.5 border ${
                    isActive
                      ? "text-[var(--accent)] bg-[var(--accent)]/10 border-[var(--accent)]/45 font-bold"
                      : "text-[var(--text-secondary)] border-transparent hover:text-[var(--accent-2)] hover:bg-[var(--bg-elevated)]"
                  }`}
                >
                  <span className="text-[10px] text-[var(--text-muted)]">0{idx + 1}</span>
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCmdOpen(true)}
              aria-label="Open command palette (Ctrl+K)"
              className="inline-flex items-center gap-2 px-3 min-h-[44px] rounded-sm border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors font-mono text-xs cursor-pointer"
            >
              <Command className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden="true" />
              <span className="hidden sm:inline">CMD</span>
              <kbd className="hidden sm:inline px-1.5 py-0.5 rounded-xs bg-[var(--bg)] border border-[var(--border)] text-[10px] text-[var(--text-muted)]">
                ^K
              </kbd>
            </button>

            <button
              ref={toggleBtnRef}
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-drawer"
              className="lg:hidden inline-flex items-center justify-center h-11 w-11 rounded-sm border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-pointer"
            >
              {menuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-200 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={closeMenu} />

        <aside
          id="mobile-nav-drawer"
          ref={panelRef}
          aria-label="Mobile navigation"
          className={`absolute top-0 bottom-0 right-0 w-full max-w-sm bg-[var(--bg-elevated)] border-l border-[var(--border)] pt-22 pb-8 px-6 flex flex-col justify-between overflow-y-auto transition-transform duration-200 ease-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav aria-label="Mobile menu links">
            <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--text-muted)] mb-4">
              {"// NAVIGATION_ROUTES"}
            </p>
            <ul className="flex flex-col gap-2">
              {navItems.map((item, idx) => {
                const isActive = activeHref === item.href;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-label={item.ariaLabel}
                      aria-current={isActive ? "location" : undefined}
                      onClick={closeMenu}
                      tabIndex={menuOpen ? 0 : -1}
                      className={`flex items-center justify-between px-4 py-3 min-h-[48px] rounded-sm border font-mono text-sm transition-colors ${
                        isActive
                          ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)] font-bold"
                          : "border-[var(--border)] bg-[var(--bg)]/60 text-[var(--text)] hover:border-[var(--accent-2)] hover:text-[var(--accent-2)]"
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="text-xs text-[var(--text-muted)]">0{idx + 1}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="pt-8 mt-8 border-t border-[var(--border)]">
            <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--text-muted)] mb-3">
              {"// ENDPOINTS"}
            </p>
            <ul className="flex flex-wrap gap-2">
              {socials.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.url}
                    target={social.url.startsWith("http") ? "_blank" : undefined}
                    rel={social.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    tabIndex={menuOpen ? 0 : -1}
                    onClick={closeMenu}
                    className="inline-flex items-center min-h-[44px] px-3 py-2 rounded-sm border border-[var(--border)] bg-[var(--bg)] font-mono text-xs text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                  >
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}

