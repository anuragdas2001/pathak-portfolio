"use client";

import React, { useState } from "react";
import { Aurora } from "@/components/ui/react-bits/Aurora";
import { DotField } from "@/components/ui/react-bits/DotField";
import { BlurText } from "@/components/ui/react-bits/BlurText";
import { Magnet } from "@/components/ui/react-bits/Magnet";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { Send, CheckCircle2, Mail, MessageSquare, Terminal, ShieldAlert, Loader2 } from "lucide-react";
import gsap from "gsap";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      return;
    }

    setStatus("submitting");

    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      const formEl = document.getElementById("contact-form-card");
      if (formEl) {
        gsap.fromTo(
          formEl,
          { scale: 0.98, borderColor: "#10b981" },
          { scale: 1, borderColor: "rgba(255,255,255,0.1)", duration: 1, ease: "elastic.out(1, 0.5)" }
        );
      }
    }, 1500);
  };

  return (
    <section id="contact" className="py-28 relative min-h-[850px] w-full flex items-center justify-center overflow-hidden bg-transparent">
      <div className="max-w-6xl mx-auto w-full px-6 sm:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Contact Info & Philosophy */}
        <div className="lg:col-span-5 flex flex-col space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 text-black dark:text-white text-xs font-mono tracking-wider uppercase self-start">
            <Mail className="h-3.5 w-3.5" />
            <span>Initiate Transmission</span>
          </div>

          <div className="space-y-2">
            <BlurText
              text="Let's Build Something Extraordinary."
              animateBy="words"
              delay={60}
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-black dark:text-white leading-tight"
            />
          </div>

          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed font-normal">
            Whether you need an institutional-grade web architecture, real-time 3D WebGL experiences, or technical advisory, my inbox is always open.
          </p>

          <div className="pt-4 space-y-4 border-t border-black/10 dark:border-white/10">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-mono text-zinc-500 uppercase block">Direct Email</span>
                <a
                  href={`mailto:${PORTFOLIO_DATA.developer.email}`}
                  className="font-mono text-sm sm:text-base text-black dark:text-white hover:opacity-80 transition-opacity font-semibold"
                  data-cursor-text="Email me"
                >
                  {PORTFOLIO_DATA.developer.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-mono text-zinc-500 uppercase block">Response Time</span>
                <span className="font-mono text-sm sm:text-base text-zinc-700 dark:text-zinc-300 font-semibold">
                  &lt; 24 Hours • Global Availability
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono text-zinc-500">Connect:</span>
            {PORTFOLIO_DATA.socials.map((social) => (
              <Magnet key={social.name} padding={30}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-xs font-mono text-black dark:text-white hover:border-black dark:hover:border-white hover:bg-black/10 dark:hover:bg-white/10 transition-all inline-block"
                  data-cursor-text={social.name}
                >
                  {social.name}
                </a>
              </Magnet>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Contact Form Card */}
        <div className="lg:col-span-7 w-full">
          <div
            id="contact-form-card"
            className="w-full rounded-3xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-black/80 p-6 sm:p-10 backdrop-blur-2xl shadow-xl relative overflow-hidden transition-colors duration-500"
          >
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-black/10 dark:border-white/10">
              <div className="flex items-center gap-2">
                <Terminal className="h-5 w-5 text-black dark:text-white" />
                <span className="font-mono text-xs sm:text-sm font-bold text-black dark:text-white tracking-wider">
                  TRANSMISSION_PROTOCOL // V4.2
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-black/30 dark:bg-white/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-black/50 dark:bg-white/50" />
                <span className="h-2.5 w-2.5 rounded-full bg-black dark:bg-white" />
              </div>
            </div>

            {status === "success" ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-fadeIn">
                <div className="h-16 w-16 rounded-full bg-black/5 dark:bg-white/5 border border-black/20 dark:border-white/20 flex items-center justify-center text-black dark:text-white shadow-md animate-bounce">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-extrabold text-black dark:text-white">
                  Transmission Confirmed!
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm max-w-md">
                  Your message has been securely transmitted to {PORTFOLIO_DATA.developer.name}&apos;s terminal. Expect a response within 24 hours.
                </p>
                <Magnet padding={40}>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 px-6 py-2.5 rounded-full border border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5 text-xs font-mono font-semibold text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-all"
                    data-cursor-text="Reset"
                  >
                    Send Another Message
                  </button>
                </Magnet>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {status === "error" && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-red-400 text-xs font-mono">
                    <ShieldAlert className="h-4 w-4 shrink-0" />
                    <span>Please complete all required fields (Name, Email, Message).</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                      Your Name <span className="text-black dark:text-white">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Anurag Das"
                      className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-3 text-sm text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:border-black dark:focus:border-white focus:bg-white dark:focus:bg-black/50 focus:outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                      Email Address <span className="text-black dark:text-white">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="anurag@company.com"
                      className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-3 text-sm text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:border-black dark:focus:border-white focus:bg-white dark:focus:bg-black/50 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                    Subject / Project Scope
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="3D Spatial Architecture / Full-Stack Advisory"
                    className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-3 text-sm text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:border-black dark:focus:border-white focus:bg-white dark:focus:bg-black/50 focus:outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                    Message / Technical Specifications <span className="text-black dark:text-white">*</span>
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your vision, timeline, and technical requirements..."
                    className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-3 text-sm text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:border-black dark:focus:border-white focus:bg-white dark:focus:bg-black/50 focus:outline-none transition-all resize-none"
                  />
                </div>

                <Magnet padding={40} className="w-full block">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full group relative flex items-center justify-center gap-2 rounded-xl bg-black text-white dark:bg-white dark:text-black px-6 py-4 text-sm font-bold shadow-lg transition-all duration-300 hover:opacity-90 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
                    data-cursor-text="Transmit"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-current" />
                        <span>Transmitting Telemetry...</span>
                      </>
                    ) : (
                      <>
                        <span>Transmit Message</span>
                        <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </>
                    )}
                  </button>
                </Magnet>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
