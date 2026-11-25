# CLAUDE.md — Portfolio Redesign: Cybersecurity Theme

## Mission

Revamp this existing portfolio website into a polished, aesthetic **cybersecurity-themed** experience. The result should feel like a security researcher's command center: dark, sharp, technical, and confident, without becoming cluttered, gimmicky, or hard to read.

Visitors (recruiters, hiring managers, peers) must still be able to find who I am, what I've built, and how to contact me within seconds. **Style serves content, never the reverse.**

---

## Step 0 — Understand the project before changing anything

1. Inspect the repo: identify the framework/tooling (plain HTML/CSS/JS, React, Next.js, Vite, Astro, Svelte, Tailwind, etc.), package manager, build/dev commands, and folder structure.
2. List every page/section that exists today (hero, about, skills, projects, experience, certifications, blog, contact, etc.).
3. Note existing assets: logo, profile photo, resume PDF, favicon, social links, analytics, SEO tags.
4. Run the dev server once to confirm the baseline works before editing.
5. Create a new git branch (e.g. `redesign/cyber-theme`) so the original design is easy to restore.

**Do not switch frameworks, rewrite the stack, or restructure routing.** Work within what is already there.

---

## Hard rules (never violate)

- **Preserve all content**: text, project descriptions, links, images, resume, and contact details stay accurate. Rewording is allowed only for section labels and microcopy that fit the theme (see "Voice").
- **Preserve functionality**: navigation, routing, forms, downloads, and external links must keep working.
- **No new heavy dependencies** (animation libraries, 3D engines, UI kits) without asking first. Prefer CSS and small vanilla JS. Fonts via Google Fonts or `@fontsource` are fine.
- **Accessibility is mandatory** (see below). A cool look that fails contrast or keyboard use is a failed redesign.
- **Respect `prefers-reduced-motion`**: all non-essential animation must be disabled or reduced for those users.
- **Never fake real security claims**: no fabricated certifications, CVEs, bug bounty results, or "hacked by" gimmicks. Terminal output shown on the site is decorative and must be clearly harmless.
- **Never add anything that looks like malware, phishing, or a real exploit**, and no scripts that scan, probe, or phone home to third parties.

---

## Design direction

### Overall vibe
Dark terminal / SOC dashboard / red-team toolkit. Think: `htop`, Kali, Hack The Box, a threat-intel console. Clean grid layout, monospaced accents, glowing edges, subtle scanlines, restrained neon.

### Color palette (define as CSS variables / theme tokens)

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0a0e14` | Page background |
| `--bg-elevated` | `#0f1620` | Cards, panels, nav |
| `--border` | `#1c2733` | Hairlines, dividers |
| `--text` | `#c9d1d9` | Body text |
| `--text-muted` | `#6b7a90` | Secondary text |
| `--accent` | `#00ff9c` | Primary neon green (links, CTAs, highlights) |
| `--accent-2` | `#00e5ff` | Cyan (secondary highlights, hover states) |
| `--danger` | `#ff2e63` | Alerts, "critical" tags, error states |
| `--warn` | `#ffb000` | Warnings, "medium" tags |

Rules:
- Use the neon accent **sparingly** (roughly 5–10% of the visual surface). Most of the page stays dark and calm.
- Body text must meet WCAG AA contrast (4.5:1) against its background. Muted text must still be readable (3:1 minimum for large/secondary text; verify, don't assume).
- Glow effects (`box-shadow`, `text-shadow`) are decoration only; never the sole indicator of state.

### Typography
- **Headings / labels / code-like accents**: a monospace face, e.g. `JetBrains Mono` or `Fira Code`.
- **Body copy**: a clean sans, e.g. `Inter` (or system UI stack as fallback) for readability.
- Use letter-spacing and uppercase on small labels (`// SECTION`, tags, nav items) for a technical feel.
- Keep line length ~60–75 characters for body paragraphs; generous line-height (1.6+).

### Layout and components
- **Background**: faint grid or dot pattern, plus an optional very low-opacity scanline overlay. Both pure CSS where possible.
- **Navigation**: sticky, slim, translucent dark bar with a blurred backdrop; nav items styled like terminal paths or commands (e.g. `~/about`, `./projects`). Show a clear active state.
- **Hero**: terminal-window component with a short typed sequence (e.g. `$ whoami` → name, `$ cat role.txt` → title, `$ ls skills/`), a blinking cursor, and two clear CTAs (View Projects / Contact). The typing effect must be skippable/static for reduced-motion users and must not delay content for screen readers.
- **Cards** (projects, certs, experience): dark elevated panels with a 1px border, small corner "brackets" or a top status strip, a hover state with accent border glow and a slight lift. Include tech-stack chips styled like tags/badges.
- **Skills section**: render as a "toolkit" grid or progress-style bars grouped by category (Offensive, Defensive, Networking, Scripting, Cloud, etc.), using only skills that already appear in the existing portfolio.
- **Project cards**: optional severity-style labels (e.g. `[CTF]`, `[TOOL]`, `[RESEARCH]`, `[WRITEUP]`) derived from the real project type.
- **Buttons**: sharp or slightly rounded (2–4px radius), outlined neon by default, filled on hover, visible focus ring.
- **Footer**: minimal, with a terminal-style line (e.g. `© <year> — session secured`), social links, and a back-to-top link.
- **Optional extras** (only if they stay tasteful and performant):
  - Subtle animated "matrix rain" or particle network canvas in the hero background, low opacity, paused when off-screen and disabled for reduced motion.
  - Glitch effect on the name or logo on hover only (CSS clip-path / text-shadow, ~300ms).
  - Section headers with a prefix like `01 // ABOUT`.
  - A small "system status" widget (e.g. `STATUS: ONLINE · OPEN TO WORK`), only if that matches my real availability. Ask me if unsure.

### Motion
- Duration 150–300ms for UI transitions; easing `ease-out`.
- Scroll-reveal for sections: fade + 12–20px translate, once per element.
- No autoplaying loops that distract from reading. Anything looping must be low-contrast and ignorable.

### Voice / microcopy
Light terminal and infosec flavor in labels only, for example:
- About → `whoami`
- Projects → `./projects`
- Skills → `toolkit`
- Contact → `connect --secure`
Keep real content (bios, descriptions) professional and unchanged. Don't overdo hacker clichés.

---

## Accessibility checklist (must pass)

- [ ] Semantic HTML landmarks (`header`, `nav`, `main`, `section`, `footer`) and a logical heading order.
- [ ] Full keyboard navigation with a clearly visible `:focus-visible` style (use the accent color, 2px+ outline).
- [ ] Color contrast meets WCAG AA for text and interactive elements.
- [ ] Decorative layers (scanlines, grid, rain canvas, glows) use `aria-hidden="true"` / `pointer-events: none` and never block clicks or text selection.
- [ ] Typing/terminal animation: real text exists in the DOM for screen readers; animation is purely visual.
- [ ] `@media (prefers-reduced-motion: reduce)` disables typing, glitch, rain, parallax, and scroll-reveal animations.
- [ ] All images have meaningful `alt` text (empty `alt=""` for decorative ones).
- [ ] Touch targets at least 44×44px on mobile.

## Responsiveness and performance

- Mobile-first. Test at 360px, 768px, 1024px, and 1440px widths. No horizontal scrolling at any size.
- Collapse the nav into an accessible mobile menu (button with `aria-expanded`, closes on Escape and on link click).
- Keep Lighthouse targets: **Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 90**.
- Self-host or preload fonts, use `font-display: swap`, and limit font weights to what's needed (e.g. 400/500/700).
- Prefer CSS over JS for effects; lazy-load below-the-fold images; keep any canvas effect at a capped frame rate and pause it when the tab is hidden.
- Keep the final CSS organized: design tokens first, then base, layout, components, utilities, and finally motion/reduced-motion overrides.

---

## Implementation workflow

1. **Tokens first**: add the color, typography, spacing, radius, and shadow tokens as CSS variables (or extend the Tailwind/theme config if the project uses it).
2. **Global styles**: background, base typography, links, selection color (`::selection` in accent), scrollbar styling (thin, dark, accent thumb), focus styles.
3. **Layout shell**: header/nav, footer, section wrappers, and container widths.
4. **Hero** with terminal component.
5. **Section by section**: About → Skills → Projects → Experience/Certs → Contact, one at a time, checking the browser after each.
6. **Polish**: hover/focus states, scroll-reveal, optional effects, favicon and `theme-color` meta (`#0a0e14`), Open Graph image if one exists.
7. **Audit**: run the accessibility checklist, test responsive breakpoints, run Lighthouse, fix issues.
8. **Cleanup**: remove dead CSS, unused assets, and console logs; ensure the build passes with no warnings introduced by my changes.

Make small, focused commits per step (e.g. `style: add cyber theme tokens`, `feat: terminal hero`).

---

## Definition of done

- The site visibly reads as a cohesive cybersecurity brand: dark theme, mono accents, neon highlights, terminal motifs.
- All original content, links, and functionality are intact.
- Passes the accessibility checklist and Lighthouse targets above.
- Looks and works well on mobile and desktop.
- Build and dev server run cleanly.
- A short summary is provided at the end: what changed, which files were touched, any decisions that need my input (e.g. availability badge, optional matrix-rain effect), and how to revert (switch back to the original branch).

## Ask me before

- Adding any new dependency or build step.
- Adding content I didn't provide (new bio lines, stats, badges, certifications).
- Removing any existing section or page.
- Using any third-party script, embed, or tracker.