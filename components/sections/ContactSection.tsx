"use client";

import React, { useState } from "react";
import {
  Check,
  CheckCircle2,
  Copy,
  KeyRound,
  Loader2,
  Mail,
  Send,
  ShieldAlert,
  Terminal,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import type { OperatorProfile, SocialEndpoint } from "@/data/types";

interface ContactSectionProps {
  profile: OperatorProfile;
  socials: SocialEndpoint[];
}

export function ContactSection({ profile, socials }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [copiedField, setCopiedField] = useState<"email" | "pgp" | null>(null);

  const handleCopy = async (value: string, field: "email" | "pgp") => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      window.setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // Clipboard blocked in current context
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (status === "error") setStatus("idle");
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      return;
    }

    // Replace this simulated timeout with a POST to `/api/contact` or your form endpoint.
    setStatus("submitting");
    window.setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 500);
  };

  return (
    <section
      id="contact"
      className="py-20 px-4 sm:px-6 lg:px-10 border-t border-[var(--border)]"
    >
      <Reveal className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Contact Channels */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--accent)] text-xs font-mono tracking-widest uppercase">
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{"06 // CONNECT --SECURE"}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-[var(--text)] leading-tight">
            Open a Secure <span className="text-[var(--accent)]">Channel</span>
          </h2>

          <p className="text-[var(--text-secondary)] text-base leading-relaxed max-w-[54ch]">
            Reach out for application security roles, architecture reviews, or open-source security tooling collaborations.
          </p>

          <div className="space-y-3 pt-2">
            {/* Email Card */}
            <div className="cyber-panel p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <span className="h-11 w-11 rounded-sm bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] shrink-0">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <span className="font-mono text-[11px] uppercase text-[var(--text-muted)] block">
                    Direct Email
                  </span>
                  <a
                    href={`mailto:${profile.email}`}
                    className="font-mono text-xs sm:text-sm text-[var(--text)] hover:text-[var(--accent)] font-semibold break-all"
                  >
                    {profile.email}
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(profile.email, "email")}
                aria-label="Copy email address"
                className="cyber-btn-secondary min-h-[44px] px-3 inline-flex items-center gap-1.5 font-mono text-xs shrink-0 cursor-pointer"
              >
                {copiedField === "email" ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden="true" />
                    <span className="text-[var(--accent)]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="hidden sm:inline">Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* PGP Card */}
            <div className="cyber-panel p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <span className="h-11 w-11 rounded-sm bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-[var(--accent-2)] shrink-0">
                  <KeyRound className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <span className="font-mono text-[11px] uppercase text-[var(--text-muted)] block">
                    PGP Fingerprint
                  </span>
                  <span className="font-mono text-[11px] text-[var(--text)] break-all block">
                    {profile.pgpFingerprint}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(profile.pgpFingerprint, "pgp")}
                aria-label="Copy PGP fingerprint"
                className="cyber-btn-secondary min-h-[44px] px-3 inline-flex items-center gap-1.5 font-mono text-xs shrink-0 cursor-pointer"
              >
                {copiedField === "pgp" ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden="true" />
                    <span className="text-[var(--accent)]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="hidden sm:inline">Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="font-mono text-xs uppercase text-[var(--text-muted)] mr-1">
              Endpoints:
            </span>
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target={social.url.startsWith("http") ? "_blank" : undefined}
                rel={social.url.startsWith("http") ? "noopener noreferrer" : undefined}
                className="cyber-btn-secondary px-3.5 min-h-[44px] inline-flex items-center font-mono text-xs"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>

        {/* Right Transmission Form */}
        <div className="lg:col-span-7">
          <div className="cyber-panel p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[var(--border)]">
              <div className="flex items-center gap-2 font-mono text-xs sm:text-sm font-bold text-[var(--text)]">
                <Terminal className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
                <span>{"MESSAGE_DISPATCH // LOCAL_DEMO"}</span>
              </div>
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--danger)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--warn)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
              </div>
            </div>

            {status === "success" ? (
              <div className="py-10 flex flex-col items-center text-center space-y-4">
                <div className="h-14 w-14 rounded-sm bg-[var(--accent)]/12 border border-[var(--accent)] flex items-center justify-center text-[var(--accent)]">
                  <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="font-mono text-xl font-bold text-[var(--text)]">
                  Message Queued (Demo Mode)
                </h3>
                <p className="text-sm text-[var(--text-secondary)] max-w-md leading-relaxed">
                  Client-side validation passed. Wire{" "}
                  <code className="font-mono text-[var(--accent)]">handleSubmit</code> in{" "}
                  <code className="font-mono text-[var(--accent-2)]">ContactSection.tsx</code> to an API route or mail service when deploying.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="cyber-btn-secondary px-6 min-h-[44px] font-mono text-xs uppercase tracking-wider cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {status === "error" && (
                  <div
                    role="alert"
                    className="p-3 rounded-sm bg-[var(--danger)]/10 border border-[var(--danger)]/50 flex items-center gap-2 text-[var(--danger)] text-xs font-mono"
                  >
                    <ShieldAlert className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Please fill in your name, email address, and message.</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-name"
                      className="font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)] block"
                    >
                      &gt; Name <span className="text-[var(--accent)]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      aria-invalid={status === "error" && !formData.name.trim()}
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full rounded-sm border border-[var(--border)] bg-[var(--bg)] px-4 py-3 min-h-[44px] font-mono text-sm text-[var(--text)] placeholder-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-email"
                      className="font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)] block"
                    >
                      &gt; Email <span className="text-[var(--accent)]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      aria-invalid={status === "error" && !formData.email.trim()}
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      className="w-full rounded-sm border border-[var(--border)] bg-[var(--bg)] px-4 py-3 min-h-[44px] font-mono text-sm text-[var(--text)] placeholder-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-subject"
                    className="font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)] block"
                  >
                    &gt; Topic / Scope
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="AppSec Engineering / Security Tooling"
                    className="w-full rounded-sm border border-[var(--border)] bg-[var(--bg)] px-4 py-3 min-h-[44px] font-mono text-sm text-[var(--text)] placeholder-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-message"
                    className="font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)] block"
                  >
                    &gt; Message <span className="text-[var(--accent)]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    name="message"
                    required
                    aria-invalid={status === "error" && !formData.message.trim()}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Share context, timeline, or encrypted contact preference..."
                    className="w-full rounded-sm border border-[var(--border)] bg-[var(--bg)] px-4 py-3 font-mono text-sm text-[var(--text)] placeholder-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="cyber-btn-primary w-full flex items-center justify-center gap-2 px-6 min-h-[48px] font-mono text-xs sm:text-sm font-bold uppercase tracking-wider disabled:opacity-50 cursor-pointer"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      <span>Dispatching...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="h-4 w-4" aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

