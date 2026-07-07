// @ts-nocheck
'use client';
import React, { useCallback, useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export interface StaggeredMenuProps {
  position?: 'left' | 'right';
  colors?: string[];
  items?: Array<{ label: string; ariaLabel?: string; link: string }>;
  socialItems?: Array<{ label: string; link: string }>;
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string | null;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  changeMenuColorOnOpen?: boolean;
  isFixed?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = 'right',
  colors = [],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl = null,
  menuButtonColor = 'currentColor',
  openMenuButtonColor = 'currentColor',
  accentColor = 'currentColor',
  changeMenuColorOnOpen = true,
  isFixed = false,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose
}) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [open, setOpen] = useState(false);
  const openRef = useRef<any>(false);
  const panelRef = useRef<any>(null);
  const preLayersRef = useRef<any>(null);
  const preLayerElsRef = useRef<any>([]);
  const lineTopRef = useRef<any>(null);
  const lineMidRef = useRef<any>(null);
  const lineBotRef = useRef<any>(null);
  const iconRef = useRef<any>(null);

  const openTlRef = useRef<any>(null);
  const closeTweenRef = useRef<any>(null);
  const spinTweenRef = useRef<any>(null);
  const colorTweenRef = useRef<any>(null);
  const toggleBtnRef = useRef<any>(null);
  const busyRef = useRef<any>(false);
  const itemEntranceTweenRef = useRef<any>(null);

  const toggleTheme = useCallback((e: React.MouseEvent) => {
    const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark';

    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    // Style: NEW page on top, starts HIDDEN via clip-path (prevents flash before animation).
    // OLD page behind, untouched — avoids grey blob from WebGL-less screenshots.
    // Initialize CSS variable to a collapsed point at bottom-right BEFORE transition starts.
    // This ensures the new theme page starts 100% hidden at frame zero.
    document.documentElement.style.setProperty('--pt-clip', 'polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%)');

    // Style: NEW page on top, starts HIDDEN via clip-path (prevents flash before animation).
    // OLD page behind, untouched — avoids grey blob from WebGL-less screenshots.
    const style = document.createElement('style');
    style.id = 'page-turn-style';
    style.innerHTML = `
      ::view-transition-group(root) { animation: none !important; }
      ::view-transition-old(root)  { animation: none !important; z-index: 1 !important; }
      ::view-transition-new(root)  {
        animation: none !important;
        z-index: 2 !important;
        clip-path: var(--pt-clip, polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%));
      }
    `;
    document.head.appendChild(style);

    // Curl flap overlay: wrapper (drop-shadow filter) → paper (gradient + clip).
    // Starts invisible (clipped to a point) — no flash.
    const curlWrap = document.createElement('div');
    curlWrap.style.cssText = 'position:fixed;inset:0;z-index:999999;pointer-events:none;filter:drop-shadow(-6px 6px 18px rgba(0,0,0,0.4))';
    const curlPaper = document.createElement('div');
    curlPaper.style.cssText = 'position:absolute;inset:0;clip-path:polygon(100% 100%,100% 100%,100% 100%)';
    curlPaper.style.background = resolvedTheme === 'dark'
      ? 'linear-gradient(135deg, #71717a 0%, #52525b 35%, #3f3f46 65%, #27272a 100%)'
      : 'linear-gradient(135deg, #fafafa 0%, #e4e4e7 35%, #d4d4d8 65%, #a1a1aa 100%)';
    curlWrap.appendChild(curlPaper);
    document.body.appendChild(curlWrap);

    const transition = document.startViewTransition(() => {
      setTheme(nextTheme);
    });

    transition.ready.then(() => {
      // ── SPEED CONTROL ──
      // Both animations use this duration so the page reveal and paper curl stay in perfect sync.
      const SPEED_SECONDS = 3.2;

      // ── Keep the view-transition snapshot alive for the full duration ──
      // The CSS above sets `animation: none` on the transition pseudo-elements,
      // so without a real Animation targeting them the browser tears the
      // snapshot tree down almost immediately after setTheme() runs — the
      // live DOM (already the new theme) then shows through everywhere
      // instantly, while only the separate curlWrap overlay kept animating
      // on its own schedule (the "theme already switched except under the
      // flap" bug). This is a no-op animation (opacity stays 1) whose only
      // job is to hold the transition open for SPEED_SECONDS so our
      // --pt-clip updates below stay visible for the whole animation
      // instead of being drawn on top of an already-fully-revealed page.
      document.documentElement.animate(
        { opacity: [1, 1] },
        { duration: SPEED_SECONDS * 1000, pseudoElement: '::view-transition-new(root)', fill: 'forwards' }
      );

      // ── Single Unified GSAP Animation ──
      // Controls BOTH the new theme page reveal AND the 3D curled paper flap so they share the exact
      // same crease line A→B, eliminating the 'two layers' separation in Screenshot 2!
      const animObj = { progress: 0 };
      gsap.to(animObj, {
        progress: 1,
        duration: SPEED_SECONDS,
        ease: 'power2.inOut',
        onUpdate: () => {
          const t = animObj.progress;
          const W = window.innerWidth;
          const H = window.innerHeight;

          // Diagonal crease A→B sweeps from bottom-right to top-left
          let Ax: number, Ay: number, Bx: number, By: number;
          if (t <= 0.5) {
            Ax = W * (1 - 2 * t);
            Ay = H;
            Bx = W;
            By = H * (1 - 2 * t);
          } else {
            Ax = 0;
            Ay = H * (2 - 2 * t);
            Bx = W * (2 - 2 * t);
            By = 0;
          }

          const dx = Bx - Ax;
          const dy = By - Ay;
          const creaseLen = Math.sqrt(dx * dx + dy * dy) || 1;

          // Unit normal to the crease, pointing toward the BOTTOM-RIGHT
          // (the side that's already revealed). The curl needs to bulge
          // into the newly revealed page so it shows up as a contrasting
          // shape against it — bulging over the still-covered old page
          // made it blend into a same-toned background and disappear.
          let nx = dy / creaseLen;
          let ny = -dx / creaseLen;
          if (nx + ny < 0) {
            nx = -nx;
            ny = -ny;
          }

          // How far the roll bulges out from the crease.
          // Using Math.pow(..., 0.5) ensures the curl immediately has prominent width/height
          // right from millisecond zero at the bottom-right corner (fixing Screenshot 1)!
          const bulge = Math.min(W, H) * 0.25 * Math.pow(Math.sin(t * Math.PI), 0.5);

          // ── 1. Page Reveal Path (the boundary of the newly revealed theme page) ──
          // Exactly aligned with crease line A→B so there is zero gap or separation between layers!
          let revealPath: string;
          if (t <= 0.5) {
            revealPath = `M ${Ax} ${Ay} L ${Bx} ${By} L ${W} ${H} L ${Ax} ${H} Z`;
          } else {
            revealPath = `M 0 ${Ay} L ${Bx} 0 L ${W} 0 L ${W} ${H} L 0 ${H} Z`;
          }
          document.documentElement.style.setProperty('--pt-clip', `path('${revealPath}')`);

          // ── 2. Big Smooth Rounded Fold via Cubic Bezier (C) ──
          // Attached along the exact same crease line A→B!
          const C1x = Ax + dx * 0.25 + nx * (bulge * 1.35);
          const C1y = Ay + dy * 0.25 + ny * (bulge * 1.35);
          const C2x = Ax + dx * 0.75 + nx * (bulge * 1.35);
          const C2y = Ay + dy * 0.75 + ny * (bulge * 1.35);

          const curlPath = `M ${Ax} ${Ay} C ${C1x} ${C1y}, ${C2x} ${C2y}, ${Bx} ${By} L ${Bx} ${By} Z`;
          curlPaper.style.clipPath = `path('${curlPath}')`;
        },
        onComplete: () => {
          gsap.to(curlWrap, {
            opacity: 0,
            duration: 0.15,
            onComplete: () => curlWrap.remove()
          });
        }
      });
    });

    transition.finished.then(() => {
      style.remove();
      document.documentElement.style.removeProperty('--pt-clip');
    });
  }, [resolvedTheme, setTheme]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const lineTop = lineTopRef.current;
      const lineMid = lineMidRef.current;
      const lineBot = lineBotRef.current;
      const icon = iconRef.current;
      if (!panel || !lineTop || !lineMid || !lineBot || !icon) return;

      let preLayers: any[] = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer'));
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === 'left' ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 });
      if (preContainer) {
        gsap.set(preContainer, { xPercent: 0, opacity: 1 });
      }
      gsap.set(lineTop, { y: -5, rotate: 0, opacity: 1 });
      gsap.set(lineMid, { y: 0, opacity: 1, scaleX: 1 });
      gsap.set(lineBot, { y: 5, rotate: 0, opacity: 1 });
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
    const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'));
    const socialTitle = panel.querySelector('.sm-socials-title');
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));

    const offscreen = position === 'left' ? -100 : 100;
    const layerStates = layers.map(el => ({ el, start: offscreen }));
    const panelStart = offscreen;

    if (itemEls.length) {
      gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    }
    if (numberEls.length) {
      gsap.set(numberEls, { '--sm-num-opacity': 0 });
    }
    if (socialTitle) {
      gsap.set(socialTitle, { opacity: 0 });
    }
    if (socialLinks.length) {
      gsap.set(socialLinks, { y: 25, opacity: 0 });
    }

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
    });
    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;
    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
      panelInsertTime
    );

    if (itemEls.length) {
      const itemsStartRatio = 0.15;
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;
      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: { each: 0.1, from: 'start' }
        },
        itemsStart
      );
      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.6,
            ease: 'power2.out',
            '--sm-num-opacity': 1,
            stagger: { each: 0.08, from: 'start' }
          },
          itemsStart + 0.1
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;
      if (socialTitle) {
        tl.to(
          socialTitle,
          {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out'
          },
          socialsStart
        );
      }
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power3.out',
            stagger: { each: 0.08, from: 'start' },
            onComplete: () => {
              gsap.set(socialLinks, { clearProps: 'opacity' });
            }
          },
          socialsStart + 0.04
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all = [...layers, panel];
    closeTweenRef.current?.kill();
    const offscreen = position === 'left' ? -100 : 100;
    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
        if (itemEls.length) {
          gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        }
        const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'));
        if (numberEls.length) {
          gsap.set(numberEls, { '--sm-num-opacity': 0 });
        }
        const socialTitle = panel.querySelector('.sm-socials-title');
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
        busyRef.current = false;
      }
    });
  }, [position]);

  const animateIcon = useCallback(opening => {
    const top = lineTopRef.current;
    const mid = lineMidRef.current;
    const bot = lineBotRef.current;
    if (!top || !mid || !bot) return;
    spinTweenRef.current?.kill();
    if (opening) {
      gsap.to(top, { y: 0, rotate: 45, duration: 0.4, ease: 'power3.out', overwrite: 'auto' });
      gsap.to(mid, { opacity: 0, scaleX: 0, duration: 0.2, ease: 'power3.out', overwrite: 'auto' });
      gsap.to(bot, { y: 0, rotate: -45, duration: 0.4, ease: 'power3.out', overwrite: 'auto' });
    } else {
      gsap.to(top, { y: -5, rotate: 0, duration: 0.35, ease: 'power3.inOut', overwrite: 'auto' });
      gsap.to(mid, { opacity: 1, scaleX: 1, duration: 0.35, ease: 'power3.inOut', overwrite: 'auto' });
      gsap.to(bot, { y: 5, rotate: 0, duration: 0.35, ease: 'power3.inOut', overwrite: 'auto' });
    }
  }, []);

  const animateColor = useCallback(
    opening => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;
        colorTweenRef.current = gsap.to(btn, {
          color: targetColor,
          delay: 0.18,
          duration: 0.3,
          ease: 'power2.out'
        });
      } else {
        gsap.set(btn, { color: menuButtonColor });
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]
  );

  React.useEffect(() => {
    if (toggleBtnRef.current) {
      if (changeMenuColorOnOpen) {
        const targetColor = openRef.current ? openMenuButtonColor : menuButtonColor;
        gsap.set(toggleBtnRef.current, { color: targetColor });
      } else {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
      }
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);
    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }
    animateIcon(target);
    animateColor(target);
  }, [playOpen, playClose, animateIcon, animateColor, onMenuOpen, onMenuClose]);

  const closeMenu = useCallback(() => {
    if (openRef.current) {
      openRef.current = false;
      setOpen(false);
      onMenuClose?.();
      playClose();
      animateIcon(false);
      animateColor(false);
    }
  }, [playClose, animateIcon, animateColor, onMenuClose]);

  React.useEffect(() => {
    if (!closeOnClickAway || !open) return;

    const handleClickOutside = event => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeOnClickAway, open, closeMenu]);

  const isDark = !mounted || resolvedTheme === 'dark';
  const effectiveColors = colors && colors.length ? colors : (isDark ? ['#18181b', '#27272a', '#3f3f46', '#52525b'] : ['#e4e4e7', '#d4d4d8', '#a1a1aa', '#71717a']);

  return (
    <div
      className={(className ? className + ' ' : '') + 'staggered-menu-wrapper relative w-full h-full z-50 pointer-events-none' + (isFixed ? ' !fixed inset-0 w-screen h-screen overflow-hidden' : '')}
      style={accentColor ? { ['--sm-accent']: accentColor } as React.CSSProperties : undefined}
      data-position={position}
      data-open={open || undefined}
    >
      <div ref={preLayersRef} className={`sm-prelayers absolute top-0 bottom-0 w-[clamp(260px,38vw,420px)] max-lg:w-full max-sm:w-full pointer-events-none z-0 opacity-0 ${position === 'left' ? 'left-0 right-auto' : 'right-0 left-auto'}`} aria-hidden="true">
        {effectiveColors.slice(0, 4).map((c, i) => (
          <div key={i} className="sm-prelayer absolute top-0 right-0 h-full w-full opacity-0" style={{ background: c }} />
        ))}
      </div>
      <header className="staggered-menu-header absolute top-0 left-0 w-full flex items-center justify-between p-6 sm:p-8 bg-transparent pointer-events-none z-20 [&>*]:pointer-events-auto" aria-label="Main navigation header">
        <div className="sm-logo text-xl font-bold font-mono tracking-tighter text-black dark:text-white flex items-center select-none" aria-label="Logo">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt="Logo"
              className="sm-logo-img block h-8 w-auto object-contain"
              draggable={false}
              width={110}
              height={24}
            />
          ) : (
            <a href="#" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
              <span>Anurag<span className="text-zinc-500">.dev</span></span>
            </a>
          )}
        </div>
        <div className="flex items-center gap-3">
          {mounted && (
            <button
              onClick={toggleTheme}
              className="relative p-2.5 rounded-full border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10 transition-all text-black dark:text-white pointer-events-auto flex items-center justify-center h-9 w-9 overflow-hidden cursor-pointer"
              aria-label="Toggle theme"
              type="button"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
            </button>
          )}
          <button
            ref={toggleBtnRef}
            className="sm-toggle relative inline-flex items-center justify-center p-2.5 rounded-full border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10 transition-all bg-transparent cursor-pointer font-medium leading-none overflow-visible text-black dark:text-white focus-visible:outline-2 focus-visible:outline-white/70 focus-visible:outline-offset-4 focus-visible:rounded h-9 w-9 pointer-events-auto"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="staggered-menu-panel"
            onClick={toggleMenu}
            type="button"
          >
            <span ref={iconRef} className="sm-icon relative w-4 h-4 flex-none inline-flex items-center justify-center" aria-hidden="true">
              <span ref={lineTopRef} className="absolute left-0 top-1/2 w-4 h-0.5 bg-current rounded-sm -translate-y-1/2 transform-gpu" />
              <span ref={lineMidRef} className="absolute left-0 top-1/2 w-4 h-0.5 bg-current rounded-sm -translate-y-1/2 transform-gpu" />
              <span ref={lineBotRef} className="absolute left-0 top-1/2 w-4 h-0.5 bg-current rounded-sm -translate-y-1/2 transform-gpu" />
            </span>
          </button>
        </div>
      </header>

      <aside id="staggered-menu-panel" ref={panelRef} className={`staggered-menu-panel absolute top-0 w-[clamp(260px,38vw,420px)] max-lg:w-full max-sm:w-full h-full bg-white dark:bg-[#09090b] backdrop-blur-2xl flex flex-col pt-24 pb-8 px-8 overflow-y-auto z-10 pointer-events-auto opacity-0 ${position === 'left' ? 'left-0 right-auto border-r border-black/10 dark:border-white/10' : 'right-0 left-auto border-l border-black/10 dark:border-white/10'}`} aria-hidden={!open}>
        <div className="sm-panel-inner flex-1 flex flex-col gap-5">
          <ul className="sm-panel-list list-none m-0 p-0 flex flex-col gap-2 [counter-reset:smItem]" role="list" data-numbering={displayItemNumbering || undefined}>
            {items && items.length ? (
              items.map((it, idx) => (
                <li className="sm-panel-itemWrap relative overflow-hidden leading-none" key={it.label + idx}>
                  <a
                    className="sm-panel-item relative text-black dark:text-white font-semibold text-4xl sm:text-5xl cursor-pointer leading-tight tracking-tighter uppercase transition-colors duration-200 inline-block no-underline pr-8 hover:text-zinc-500 dark:hover:text-zinc-400 after:[counter-increment:smItem] after:content-[counter(smItem,decimal-leading-zero)] after:absolute after:top-1 after:right-0 after:text-sm sm:after:text-base after:font-mono after:font-normal after:text-zinc-400 dark:after:text-zinc-600 after:opacity-[var(--sm-num-opacity,0)]"
                    href={it.link}
                    aria-label={it.ariaLabel}
                    data-index={idx + 1}
                    onClick={() => closeMenu()}
                  >
                    <span className="sm-panel-itemLabel inline-block origin-bottom">{it.label}</span>
                  </a>
                </li>
              ))
            ) : (
              <li className="sm-panel-itemWrap relative overflow-hidden leading-none" aria-hidden="true">
                <span className="sm-panel-item relative text-black dark:text-white font-semibold text-4xl sm:text-5xl cursor-pointer leading-tight tracking-tighter uppercase inline-block pr-8">
                  <span className="sm-panel-itemLabel inline-block origin-bottom">No items</span>
                </span>
              </li>
            )}
          </ul>
          {displaySocials && socialItems && socialItems.length > 0 && (
            <div className="sm-socials mt-auto pt-8 flex flex-col gap-3" aria-label="Social links">
              <h3 className="sm-socials-title m-0 text-sm font-mono tracking-wider uppercase font-medium text-zinc-500 dark:text-zinc-400">Socials</h3>
              <ul className="sm-socials-list list-none m-0 p-0 flex flex-row items-center gap-4 flex-wrap group/socials" role="list">
                {socialItems.map((s, i) => (
                  <li key={s.label + i} className="sm-socials-item">
                    <a href={s.link} target="_blank" rel="noopener noreferrer" className="sm-socials-link text-sm font-mono font-semibold text-zinc-700 dark:text-zinc-300 no-underline relative py-1 inline-block transition-all duration-300 hover:text-black dark:hover:text-white group-hover/socials:opacity-40 hover:!opacity-100">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default StaggeredMenu;