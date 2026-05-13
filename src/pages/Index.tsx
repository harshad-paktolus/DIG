// @ts-nocheck
/**
 * DIGISIM — Where Precision Meets Performance
 * Single-file React component for Lovable
 *
 * HOW TO USE IN LOVABLE:
 * 1. Go to lovable.dev → New Project
 * 2. In the chat, type: "Replace my App.jsx with this code"
 * 3. Paste this entire file
 * 4. Lovable will install dependencies and render the page live
 *
 * FONTS: Add this to your index.html <head> in Lovable:
 * <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;500;600;700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
 *
 * DEPENDENCIES USED: react, react-dom, tailwindcss (all pre-installed in Lovable)
 */

import { useState, useEffect, useRef } from "react";

/* ============================================================
   DESIGN TOKENS (injected as a global style tag)
   ============================================================ */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;500;600;700&family=Inter:wght@300;400;500&display=swap');

    :root {
      --navy: #0D2B4E;
      --navy-deep: #071828;
      --navy-mid: #163a62;
      --gold: #C8973A;
      --gold-light: #e8b865;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: 'Inter', sans-serif; overflow-x: hidden; background: #fff; }

    .font-display { font-family: 'Orbitron', monospace; }
    .font-ui      { font-family: 'Rajdhani', sans-serif; }
    .font-body    { font-family: 'Inter', sans-serif; }

    /* ── Scroll reveal ── */
    .rv  { opacity: 0; transform: translateY(44px); transition: opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1); }
    .rl  { opacity: 0; transform: translateX(-52px); transition: opacity .75s cubic-bezier(.22,1,.36,1), transform .75s cubic-bezier(.22,1,.36,1); }
    .rr  { opacity: 0; transform: translateX(52px);  transition: opacity .75s cubic-bezier(.22,1,.36,1), transform .75s cubic-bezier(.22,1,.36,1); }
    .rs  { opacity: 0; transform: scale(.88);         transition: opacity .65s ease, transform .65s ease; }
    .in  { opacity: 1 !important; transform: none !important; }
    .d1  { transition-delay: .06s; } .d2 { transition-delay: .14s; } .d3 { transition-delay: .22s; }
    .d4  { transition-delay: .30s; } .d5 { transition-delay: .38s; } .d6 { transition-delay: .46s; } .d7 { transition-delay: .54s; }

    /* ── Keyframes ── */
    @keyframes fadeUp    { from { opacity:0; transform:translateY(40px) } to { opacity:1; transform:none } }
    @keyframes fadeIn    { from { opacity:0 } to { opacity:1 } }
    @keyframes growX     { from { width:0 } to { width:80px } }
    @keyframes slideL    { from { opacity:0; transform:translateX(-24px) } to { opacity:1; transform:none } }
    @keyframes badgePop  { from { opacity:0; transform:scale(.55) rotate(-10deg) } to { opacity:1; transform:scale(1) rotate(0) } }
    @keyframes navDown   { from { transform:translateY(-100%); opacity:0 } to { transform:none; opacity:1 } }
    @keyframes scan      { 0% { top:-3px } 100% { top:101% } }
    @keyframes gridBreathe { 0%,100% { opacity:.55 } 50% { opacity:1 } }
    @keyframes ctaGlow   { 0%,100% { transform:scale(.8); opacity:.3 } 50% { transform:scale(1.2); opacity:.8 } }
    @keyframes spinSlow  { to { transform:rotate(360deg) } }
    @keyframes ripple    { to { transform:scale(1); opacity:0 } }
    @keyframes barPulse  { 0%,100% { opacity:.7 } 50% { opacity:1 } }

    /* ── Hero animations ── */
    .anim-nav      { animation: navDown .55s .1s both cubic-bezier(.22,1,.36,1); }
    .anim-eyebrow  { animation: slideL .7s .3s both cubic-bezier(.22,1,.36,1); }
    .anim-headline { animation: fadeUp .85s .44s both cubic-bezier(.22,1,.36,1); }
    .anim-tagline  { animation: fadeUp .7s .6s both cubic-bezier(.22,1,.36,1); }
    .anim-divider  { animation: growX .65s .75s both ease-out; width:0; }
    .anim-desc     { animation: fadeUp .7s .85s both cubic-bezier(.22,1,.36,1); }
    .anim-actions  { animation: fadeUp .7s 1s both cubic-bezier(.22,1,.36,1); }
    .anim-stats    { animation: fadeUp .7s 1.15s both cubic-bezier(.22,1,.36,1); }
    .anim-visual   { animation: fadeIn 1.1s .55s both ease; }
    .anim-badge    { animation: badgePop .65s 1.3s both cubic-bezier(.34,1.56,.64,1); }
    .anim-spin     { animation: spinSlow 40s linear infinite; transform-origin: 260px 260px; }
    .anim-scan     { animation: scan 12s 2s infinite linear; }
    .anim-grid     { animation: gridBreathe 5s infinite ease-in-out; }
    .anim-cta-glow { animation: ctaGlow 7s infinite ease-in-out; }

    /* ── Button ripple ── */
    .ripple-btn { position:relative; overflow:hidden; }
    .ripple-btn .ripple-effect { position:absolute; border-radius:50%; background:rgba(255,255,255,.22); transform:scale(0); animation:ripple .55s linear; pointer-events:none; }

    /* ── Nav link underline ── */
    .nav-link { position:relative; }
    .nav-link::after { content:''; position:absolute; bottom:-5px; left:0; width:0; height:1px; background:var(--gold); transition:width .25s ease; }
    .nav-link:hover::after { width:100%; }
    .nav-link:hover { color: var(--gold) !important; }

    /* ── Card hover effects ── */
    .service-card:hover { background: var(--navy) !important; transform: translateY(-5px); box-shadow: 0 22px 55px rgba(13,43,78,.22); }
    .service-card:hover .svc-num  { color: rgba(255,255,255,.06) !important; }
    .service-card:hover .svc-name { color: #fff !important; }
    .service-card:hover .svc-desc { color: rgba(255,255,255,.6) !important; }
    .service-card:hover .svc-tag  { background: rgba(200,151,58,.14) !important; color: #e8b865 !important; }
    .service-card:hover .svc-accent { background: var(--gold) !important; }
    .service-card { transition: background .35s, transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s; }

    .exp-card:hover { transform: translateY(-6px); }
    .exp-card:hover .exp-bar { transform: scaleX(1) !important; }
    .exp-card:hover .exp-detail { opacity: 1 !important; transform: none !important; }
    .exp-card:hover .exp-overlay-bg { background: linear-gradient(to top, rgba(7,24,40,.98) 0%, rgba(7,24,40,.65) 65%, rgba(7,24,40,.1) 100%) !important; }
    .exp-card { transition: transform .45s cubic-bezier(.22,1,.36,1); }

    .diff-item:hover { background: rgba(255,255,255,.025); }
    .diff-item:hover .diff-title { color: var(--gold) !important; }
    .diff-title { transition: color .25s; }

    .pillar:hover { background: rgba(200,151,58,.04) !important; }
    .pillar:hover .pillar-bar { height: 100% !important; }
    .pillar-bar { transition: height .5s cubic-bezier(.22,1,.36,1); }

    .ind-card:hover { transform: translateY(-4px); box-shadow: 0 18px 44px rgba(13,43,78,.12); }
    .ind-card:hover .ind-bar { transform: scaleX(1) !important; }
    .ind-card { transition: transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s; }

    .split-section:hover .split-img-inner { transform: scale(1.04) !important; }
    .split-img-inner { transition: transform .9s cubic-bezier(.22,1,.36,1); }

    .list-item:hover { transform: translateX(5px) !important; color: rgba(255,255,255,.88) !important; }
    .list-item { transition: transform .22s, color .22s; }
    .list-item-dk:hover { transform: translateX(5px) !important; color: var(--navy) !important; }

    input:focus, select:focus, textarea:focus {
      border-color: var(--gold) !important;
      box-shadow: 0 0 0 3px rgba(200,151,58,.15) !important;
      background: rgba(255,255,255,.07) !important;
      outline: none;
    }

    @media (max-width: 900px) {
      .hero-grid { grid-template-columns: 1fr !important; }
      .hero-visual { display: none !important; }
      .two-col { grid-template-columns: 1fr !important; }
      .three-col { grid-template-columns: 1fr !important; }
      .four-col { grid-template-columns: 1fr 1fr !important; }
      .split-section { grid-template-columns: 1fr !important; }
      .contact-grid { grid-template-columns: 1fr !important; }
    }
    @media (max-width: 600px) {
      .four-col { grid-template-columns: 1fr !important; }
    }
  `}</style>
);

/* ============================================================
   HOOKS
   ============================================================ */
function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.1, rootMargin: "0px 0px -48px 0px" }
    );
    document.querySelectorAll(".rv,.rl,.rr,.rs").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useCounter(target, duration = 1400) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const steps = 60, inc = target / steps, interval = duration / steps;
        let cur = 0;
        const iv = setInterval(() => {
          cur = Math.min(cur + inc, target);
          setCount(Math.floor(cur));
          if (cur >= target) clearInterval(iv);
        }, interval);
      }
    }, { threshold: 0.6 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return [ref, count];
}

function useNavScroll() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return scrolled;
}

function useRipple() {
  const addRipple = (e) => {
    const btn = e.currentTarget;
    const r = document.createElement("span");
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2.2;
    r.className = "ripple-effect";
    r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px;`;
    btn.appendChild(r);
    setTimeout(() => r.remove(), 600);
  };
  return addRipple;
}

/* ============================================================
   SMOOTH SCROLL HELPER
   ============================================================ */
const scrollTo = (e, href) => {
  e.preventDefault();
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

/* ============================================================
   SVG ILLUSTRATIONS
   ============================================================ */
const AutomationSVG = () => (
  <svg viewBox="0 0 320 280" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style={{position:"absolute",inset:0,width:"100%",height:"100%"}}>
    <rect width="320" height="280" fill="#071828"/>
    {[56,112,168,224].map(y=><line key={y} x1="0" y1={y} x2="320" y2={y} stroke="#0D2B4E" strokeWidth="0.5"/>)}
    {[80,160,240].map(x=><line key={x} x1={x} y1="0" x2={x} y2="280" stroke="#0D2B4E" strokeWidth="0.5"/>)}
    <rect x="18" y="22" width="160" height="108" rx="4" fill="#0a1e36" stroke="#163a62" strokeWidth="1.5"/>
    <rect x="22" y="26" width="152" height="96" rx="2" fill="#071828"/>
    <rect x="22" y="26" width="152" height="18" rx="2" fill="#0D2B4E"/>
    <circle cx="32" cy="35" r="4" fill="#C8973A"/>
    <rect x="40" y="32" width="45" height="3" rx="1" fill="#C8973A" opacity="0.6"/>
    <circle cx="166" cy="35" r="3" fill="#C8973A" opacity="0.5"/>
    <polyline points="26,88 36,76 44,92 54,70 62,82 72,62 82,76 92,58 102,72 112,54 122,68 132,52 142,65 152,50 162,62 170,48" fill="none" stroke="#C8973A" strokeWidth="1.8"/>
    <polygon points="26,88 36,76 44,92 54,70 62,82 72,62 82,76 92,58 102,72 112,54 122,68 132,52 142,65 152,50 162,62 170,48 170,110 26,110" fill="#C8973A" opacity="0.07"/>
    <polyline points="26,100 36,98 44,102 54,97 62,100 72,96 82,99 92,94 102,98 112,93 122,97 132,92 142,96 152,91 162,95 170,90" fill="none" stroke="#163a62" strokeWidth="1.2"/>
    <line x1="26" y1="110" x2="170" y2="110" stroke="#163a62" strokeWidth="0.8"/>
    <line x1="26" y1="48" x2="26" y2="110" stroke="#163a62" strokeWidth="0.8"/>
    {[32,44,56,68].map((cx,i)=><circle key={cx} cx={cx} cy="118" r="3.5" fill={i===0||i===2?"#C8973A":"#163a62"} opacity={i===2?0.5:1}/>)}
    <rect x="196" y="18" width="108" height="200" rx="3" fill="#0D2B4E" stroke="#163a62" strokeWidth="1.5"/>
    <rect x="202" y="24" width="96" height="30" rx="2" fill="#071828" stroke="#163a62" strokeWidth="0.8"/>
    <rect x="208" y="30" width="38" height="4" rx="1" fill="#C8973A" opacity="0.8"/>
    <circle cx="280" cy="39" r="5" fill="#C8973A" opacity="0.9"/>
    <circle cx="291" cy="39" r="5" fill="#163a62"/>
    <rect x="202" y="60" width="96" height="30" rx="2" fill="#071828" stroke="#163a62" strokeWidth="0.8"/>
    <rect x="206" y="66" width="18" height="18" rx="1" fill="#163a62"/>
    <rect x="228" y="66" width="18" height="18" rx="1" fill="#163a62"/>
    <rect x="250" y="66" width="8" height="18" rx="1" fill="#C8973A" opacity="0.5"/>
    <rect x="202" y="96" width="96" height="30" rx="2" fill="#071828" stroke="#163a62" strokeWidth="0.8"/>
    <rect x="208" y="102" width="70" height="4" rx="1" fill="#C8973A" opacity="0.7"/>
    <rect x="202" y="132" width="96" height="30" rx="2" fill="#071828" stroke="#163a62" strokeWidth="0.8"/>
    <rect x="202" y="168" width="96" height="42" rx="2" fill="#071828" stroke="#163a62" strokeWidth="0.8"/>
    <polyline points="208,200 218,193 228,197 238,189 248,193 258,185 268,190 278,183 288,187" fill="none" stroke="#C8973A" strokeWidth="1.2"/>
    <line x1="208" y1="202" x2="292" y2="202" stroke="#163a62" strokeWidth="0.6"/>
    <line x1="178" y1="68" x2="196" y2="68" stroke="#C8973A" strokeWidth="1.2" strokeDasharray="3,2"/>
    <line x1="178" y1="85" x2="196" y2="85" stroke="#163a62" strokeWidth="1.2" strokeDasharray="3,2"/>
    <circle cx="50" cy="210" r="10" fill="#0D2B4E" stroke="#C8973A" strokeWidth="1.2"/>
    <circle cx="50" cy="210" r="4" fill="#C8973A" opacity="0.6"/>
    <circle cx="110" cy="230" r="8" fill="#0D2B4E" stroke="#163a62" strokeWidth="1"/>
    <circle cx="160" cy="215" r="8" fill="#0D2B4E" stroke="#163a62" strokeWidth="1"/>
    <line x1="50" y1="210" x2="110" y2="230" stroke="#163a62" strokeWidth="0.8" strokeDasharray="4,3"/>
    <line x1="110" y1="230" x2="160" y2="215" stroke="#163a62" strokeWidth="0.8" strokeDasharray="4,3"/>
    <circle cx="270" cy="248" r="22" fill="none" stroke="#C8973A" strokeWidth="0.5" opacity="0.18"/>
    <circle cx="270" cy="248" r="12" fill="none" stroke="#C8973A" strokeWidth="0.5" opacity="0.18"/>
    <circle cx="270" cy="248" r="3" fill="#C8973A" opacity="0.15"/>
    <line x1="270" y1="226" x2="270" y2="270" stroke="#C8973A" strokeWidth="0.4" opacity="0.18"/>
    <line x1="248" y1="248" x2="292" y2="248" stroke="#C8973A" strokeWidth="0.4" opacity="0.18"/>
  </svg>
);

const FacilitySVG = () => (
  <svg viewBox="0 0 320 280" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style={{position:"absolute",inset:0,width:"100%",height:"100%"}}>
    <rect width="320" height="280" fill="#071828"/>
    {[40,80,120,160,200,240].map(y=><line key={y} x1="0" y1={y} x2="320" y2={y} stroke="#0D2B4E" strokeWidth="0.5"/>)}
    {[40,80,120,160,200,240,280].map(x=><line key={x} x1={x} y1="0" x2={x} y2="280" stroke="#0D2B4E" strokeWidth="0.5"/>)}
    <rect x="22" y="22" width="276" height="196" rx="1" fill="none" stroke="#163a62" strokeWidth="2"/>
    <line x1="120" y1="22" x2="120" y2="140" stroke="#163a62" strokeWidth="1.5"/>
    <line x1="22" y1="120" x2="120" y2="120" stroke="#163a62" strokeWidth="1.5"/>
    <line x1="200" y1="22" x2="200" y2="218" stroke="#163a62" strokeWidth="1.5"/>
    <line x1="120" y1="140" x2="200" y2="140" stroke="#163a62" strokeWidth="1.5"/>
    <rect x="23" y="23" width="96" height="96" fill="#C8973A" opacity="0.05"/>
    <rect x="23" y="121" width="96" height="96" fill="#163a62" opacity="0.1"/>
    <rect x="121" y="23" width="78" height="116" fill="#0D2B4E" opacity="0.3"/>
    <rect x="201" y="23" width="96" height="194" fill="#C8973A" opacity="0.04"/>
    <rect x="201" y="23" width="96" height="3" fill="#C8973A" opacity="0.6"/>
    <rect x="108" y="118" width="24" height="4" fill="#071828"/>
    <rect x="118" y="136" width="4" height="24" fill="#071828"/>
    <rect x="188" y="70" width="4" height="20" fill="#071828"/>
    <rect x="30" y="55" width="50" height="3" rx="1" fill="#C8973A" opacity="0.5"/>
    <rect x="30" y="150" width="45" height="3" rx="1" fill="#163a62" opacity="0.5"/>
    <rect x="128" y="70" width="55" height="3" rx="1" fill="#C8973A" opacity="0.4"/>
    <rect x="208" y="60" width="70" height="3" rx="1" fill="#C8973A" opacity="0.5"/>
    <line x1="22" y1="232" x2="298" y2="232" stroke="#C8973A" strokeWidth="0.8" opacity="0.6"/>
    <line x1="22" y1="228" x2="22" y2="236" stroke="#C8973A" strokeWidth="0.8" opacity="0.6"/>
    <line x1="298" y1="228" x2="298" y2="236" stroke="#C8973A" strokeWidth="0.8" opacity="0.6"/>
    <line x1="310" y1="22" x2="310" y2="218" stroke="#C8973A" strokeWidth="0.8" opacity="0.6"/>
    <rect x="215" y="35" width="60" height="32" rx="3" fill="#0D2B4E" stroke="#C8973A" strokeWidth="0.8"/>
    <line x1="225" y1="47" x2="265" y2="47" stroke="#163a62" strokeWidth="0.8"/>
    <line x1="225" y1="53" x2="265" y2="53" stroke="#163a62" strokeWidth="0.8"/>
    <circle cx="268" cy="51" r="5" fill="none" stroke="#C8973A" strokeWidth="1"/>
    <circle cx="249" cy="140" r="28" fill="none" stroke="#C8973A" strokeWidth="0.7" opacity="0.35"/>
    <circle cx="249" cy="140" r="16" fill="none" stroke="#C8973A" strokeWidth="0.7" opacity="0.35"/>
    <circle cx="249" cy="140" r="4" fill="#C8973A" opacity="0.4"/>
    <line x1="249" y1="112" x2="249" y2="168" stroke="#C8973A" strokeWidth="0.5" opacity="0.35"/>
    <line x1="221" y1="140" x2="277" y2="140" stroke="#C8973A" strokeWidth="0.5" opacity="0.35"/>
  </svg>
);

const ValidationSVG = () => (
  <svg viewBox="0 0 320 280" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style={{position:"absolute",inset:0,width:"100%",height:"100%"}}>
    <rect width="320" height="280" fill="#071828"/>
    {[70,140,210].map(y=><line key={y} x1="0" y1={y} x2="320" y2={y} stroke="#0D2B4E" strokeWidth="0.5"/>)}
    <rect x="28" y="36" width="140" height="190" rx="3" fill="#0a1e36" stroke="#163a62" strokeWidth="1"/>
    <rect x="20" y="44" width="140" height="190" rx="3" fill="#071828" stroke="#163a62" strokeWidth="1"/>
    <rect x="12" y="52" width="140" height="190" rx="3" fill="#0a1e36" stroke="#163a62" strokeWidth="1.5"/>
    <rect x="20" y="60" width="124" height="18" rx="2" fill="#C8973A" opacity="0.85"/>
    <rect x="24" y="64" width="70" height="5" rx="1" fill="#071828" opacity="0.5"/>
    <rect x="20" y="88" width="50" height="3" rx="1" fill="#C8973A" opacity="0.55"/>
    <rect x="20" y="96" width="124" height="2.5" rx="1" fill="#163a62"/>
    <rect x="20" y="103" width="105" height="2.5" rx="1" fill="#163a62"/>
    <rect x="20" y="110" width="115" height="2.5" rx="1" fill="#163a62"/>
    <rect x="20" y="126" width="124" height="1" fill="#163a62" opacity="0.4"/>
    <rect x="20" y="134" width="12" height="12" rx="2" fill="none" stroke="#C8973A" strokeWidth="1.5"/>
    <polyline points="22,140 26,144 31,136" fill="none" stroke="#C8973A" strokeWidth="2"/>
    <rect x="37" y="137" width="90" height="3" rx="1" fill="#163a62"/>
    <rect x="20" y="152" width="12" height="12" rx="2" fill="none" stroke="#C8973A" strokeWidth="1.5"/>
    <polyline points="22,158 26,162 31,154" fill="none" stroke="#C8973A" strokeWidth="2"/>
    <rect x="37" y="155" width="75" height="3" rx="1" fill="#163a62"/>
    <rect x="20" y="170" width="12" height="12" rx="2" fill="none" stroke="#163a62" strokeWidth="1.5"/>
    <rect x="37" y="173" width="85" height="3" rx="1" fill="#163a62"/>
    <rect x="20" y="188" width="12" height="12" rx="2" fill="none" stroke="#163a62" strokeWidth="1.5"/>
    <rect x="37" y="191" width="65" height="3" rx="1" fill="#163a62"/>
    <rect x="20" y="218" width="50" height="8" rx="2" fill="#C8973A" opacity="0.8"/>
    <rect x="176" y="36" width="128" height="48" rx="4" fill="#C8973A"/>
    <rect x="182" y="43" width="116" height="34" rx="2" fill="#071828"/>
    <rect x="188" y="49" width="65" height="7" rx="1" fill="#C8973A"/>
    <rect x="176" y="94" width="128" height="48" rx="4" fill="#0D2B4E" stroke="#C8973A" strokeWidth="1.2"/>
    <rect x="188" y="104" width="75" height="7" rx="1" fill="#C8973A" opacity="0.85"/>
    <rect x="176" y="152" width="128" height="48" rx="4" fill="#0D2B4E" stroke="#163a62" strokeWidth="1"/>
    <rect x="188" y="162" width="60" height="7" rx="1" fill="#C8973A" opacity="0.6"/>
    <rect x="178" y="214" width="30" height="20" rx="3" fill="#C8973A" opacity="0.9"/>
    <rect x="182" y="221" width="18" height="4" rx="1" fill="#C8973A" opacity="0.9"/>
    <line x1="208" y1="224" x2="220" y2="224" stroke="#163a62" strokeWidth="1.5"/>
    <polygon points="218,220 226,224 218,228" fill="#163a62"/>
    <rect x="226" y="214" width="30" height="20" rx="3" fill="#0D2B4E" stroke="#C8973A" strokeWidth="1"/>
    <rect x="229" y="221" width="20" height="4" rx="1" fill="#C8973A" opacity="0.7"/>
    <line x1="256" y1="224" x2="268" y2="224" stroke="#163a62" strokeWidth="1.5"/>
    <polygon points="266,220 274,224 266,228" fill="#163a62"/>
    <rect x="274" y="214" width="30" height="20" rx="3" fill="#0D2B4E" stroke="#163a62" strokeWidth="1"/>
    <rect x="277" y="221" width="20" height="4" rx="1" fill="#C8973A" opacity="0.4"/>
    <line x1="152" y1="110" x2="176" y2="110" stroke="#C8973A" strokeWidth="0.8" strokeDasharray="4,3" opacity="0.6"/>
    <line x1="152" y1="165" x2="176" y2="165" stroke="#163a62" strokeWidth="0.8" strokeDasharray="4,3" opacity="0.5"/>
  </svg>
);

const TrainingSVG = () => (
  <svg viewBox="0 0 320 280" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style={{position:"absolute",inset:0,width:"100%",height:"100%"}}>
    <rect width="320" height="280" fill="#071828"/>
    {[70,140,210].map(y=><line key={y} x1="0" y1={y} x2="320" y2={y} stroke="#0D2B4E" strokeWidth="0.5"/>)}
    {[80,160,240].map(x=><line key={x} x1={x} y1="0" x2={x} y2="280" stroke="#0D2B4E" strokeWidth="0.5"/>)}
    <circle cx="160" cy="68" r="26" fill="#0D2B4E" stroke="#163a62" strokeWidth="1.5"/>
    <path d="M105 175 Q105 135 160 128 Q215 135 215 175 L215 210 L105 210 Z" fill="#0D2B4E" stroke="#163a62" strokeWidth="1.5"/>
    <rect x="134" y="56" width="52" height="26" rx="10" fill="#071828" stroke="#C8973A" strokeWidth="1.8"/>
    <rect x="138" y="60" width="18" height="14" rx="4" fill="#163a62"/>
    <rect x="160" y="60" width="18" height="14" rx="4" fill="#163a62"/>
    <rect x="140" y="62" width="14" height="10" rx="3" fill="#C8973A" opacity="0.2"/>
    <rect x="162" y="62" width="14" height="10" rx="3" fill="#C8973A" opacity="0.2"/>
    <rect x="131" y="64" width="8" height="4" rx="1" fill="#C8973A" opacity="0.7"/>
    <rect x="173" y="64" width="8" height="4" rx="1" fill="#C8973A" opacity="0.7"/>
    <line x1="160" y1="82" x2="68" y2="148" stroke="#C8973A" strokeWidth="0.8" strokeDasharray="4,4" opacity="0.55"/>
    <line x1="160" y1="82" x2="252" y2="148" stroke="#C8973A" strokeWidth="0.8" strokeDasharray="4,4" opacity="0.55"/>
    <line x1="160" y1="82" x2="160" y2="162" stroke="#C8973A" strokeWidth="0.8" strokeDasharray="4,4" opacity="0.55"/>
    <polygon points="68,148 252,148 232,212 88,212" fill="#C8973A" opacity="0.035" stroke="#C8973A" strokeWidth="0.8" strokeOpacity="0.22"/>
    <rect x="88" y="155" width="58" height="38" rx="3" fill="#0D2B4E" opacity="0.85"/>
    <rect x="92" y="160" width="50" height="5" rx="1" fill="#C8973A" opacity="0.75"/>
    <rect x="92" y="169" width="38" height="3" rx="1" fill="#163a62"/>
    <rect x="92" y="175" width="44" height="3" rx="1" fill="#163a62"/>
    <rect x="174" y="155" width="58" height="38" rx="3" fill="#0D2B4E" opacity="0.85"/>
    <rect x="180" y="183" width="8" height="6" rx="1" fill="#C8973A" opacity="0.9"/>
    <rect x="191" y="177" width="8" height="12" rx="1" fill="#C8973A" opacity="0.7"/>
    <rect x="202" y="172" width="8" height="17" rx="1" fill="#C8973A" opacity="0.85"/>
    <rect x="213" y="167" width="8" height="22" rx="1" fill="#C8973A"/>
    <line x1="178" y1="190" x2="224" y2="190" stroke="#163a62" strokeWidth="0.8"/>
    <rect x="88" y="222" width="144" height="10" rx="5" fill="#0D2B4E"/>
    <rect x="88" y="222" width="94" height="10" rx="5" fill="#C8973A" opacity="0.85"/>
    <circle cx="96" cy="95" r="8" fill="#0D2B4E" stroke="#C8973A" strokeWidth="0.8" opacity="0.7"/>
    <circle cx="224" cy="88" r="8" fill="#0D2B4E" stroke="#C8973A" strokeWidth="0.8" opacity="0.7"/>
    <line x1="104" y1="95" x2="134" y2="82" stroke="#C8973A" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.4"/>
    <line x1="216" y1="88" x2="186" y2="75" stroke="#C8973A" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.4"/>
  </svg>
);

/* ============================================================
   REUSABLE UI ATOMS
   ============================================================ */
const SectionLabel = ({ children }) => (
  <div className="font-ui" style={{fontSize:11,letterSpacing:"0.24em",textTransform:"uppercase",color:"#C8973A",fontWeight:700,marginBottom:16,display:"flex",alignItems:"center",gap:10}}>
    <span style={{width:24,height:1,background:"#C8973A",display:"inline-block"}}/>
    {children}
  </div>
);

const SectionTitle = ({ children, light, style }) => (
  <h2 className="font-display" style={{fontSize:"clamp(28px,3.5vw,52px)",fontWeight:800,color:light?"#fff":"#0D2B4E",lineHeight:1.08,letterSpacing:"0.04em",...style}}>
    {children}
  </h2>
);

const GoldBtn = ({ href, children, onClick, style }) => {
  const ripple = useRipple();
  return (
    <a href={href} className="ripple-btn font-ui"
      style={{fontSize:13,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",textDecoration:"none",display:"inline-block",background:"#C8973A",color:"#071828",padding:"14px 32px",transition:"all .2s",cursor:"pointer",...style}}
      onMouseEnter={e=>{e.currentTarget.style.background="#e8b865";e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 10px 28px rgba(200,151,58,.38)"}}
      onMouseLeave={e=>{e.currentTarget.style.background="#C8973A";e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=""}}
      onClick={e=>{ripple(e);onClick&&onClick(e);}}>
      {children}
    </a>
  );
};

const DarkBtn = ({ href, children, onClick }) => {
  const ripple = useRipple();
  return (
    <a href={href} className="ripple-btn font-ui"
      style={{fontSize:13,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",textDecoration:"none",display:"inline-block",background:"#071828",color:"#fff",padding:"16px 40px",transition:"all .2s",cursor:"pointer"}}
      onMouseEnter={e=>{e.currentTarget.style.background="#163a62";e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 10px 30px rgba(7,24,40,.5)"}}
      onMouseLeave={e=>{e.currentTarget.style.background="#071828";e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=""}}
      onClick={e=>{ripple(e);onClick&&onClick(e);}}>
      {children}
    </a>
  );
};

/* ============================================================
   NAV
   ============================================================ */
const NAV_LINKS = [
  {href:"#expertise",label:"Expertise"},{href:"#services",label:"Services"},
  {href:"#industries",label:"Industries"},{href:"#contact",label:"Contact"},
];

function Nav() {
  const scrolled = useNavScroll();
  const ripple = useRipple();
  return (
    <nav className="anim-nav" style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"0 5%",background:"rgba(7,24,40,0.96)",backdropFilter:"blur(14px)",borderBottom:`1px solid ${scrolled?"rgba(200,151,58,.4)":"rgba(200,151,58,.22)"}`,boxShadow:scrolled?"0 4px 36px rgba(7,24,40,.6)":"none",transition:"border-color .3s,box-shadow .3s"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",height:64}}>
        <a href="#" onClick={e=>scrollTo(e,"body")} style={{textDecoration:"none",display:"flex",alignItems:"center"}}>
          <svg viewBox="0 0 340 88" height="36" xmlns="http://www.w3.org/2000/svg">
            <circle cx="44" cy="44" r="26" fill="none" stroke="#C8973A" strokeWidth="1.5"/>
            <circle cx="44" cy="44" r="16" fill="none" stroke="#C8973A" strokeWidth="1"/>
            <circle cx="44" cy="44" r="4" fill="#C8973A"/>
            <line x1="44" y1="18" x2="44" y2="28" stroke="#C8973A" strokeWidth="1.2"/>
            <line x1="44" y1="60" x2="44" y2="70" stroke="#C8973A" strokeWidth="1.2"/>
            <line x1="18" y1="44" x2="28" y2="44" stroke="#C8973A" strokeWidth="1.2"/>
            <line x1="60" y1="44" x2="70" y2="44" stroke="#C8973A" strokeWidth="1.2"/>
            <line x1="44" y1="14" x2="44" y2="18" stroke="#C8973A" strokeWidth="2" strokeLinecap="round"/>
            <line x1="44" y1="70" x2="44" y2="74" stroke="#C8973A" strokeWidth="2" strokeLinecap="round"/>
            <line x1="14" y1="44" x2="18" y2="44" stroke="#C8973A" strokeWidth="2" strokeLinecap="round"/>
            <line x1="70" y1="44" x2="74" y2="44" stroke="#C8973A" strokeWidth="2" strokeLinecap="round"/>
            <text x="86" y="52" fontFamily="'Orbitron',monospace" fontWeight="900" fontSize="30" letterSpacing="4" fill="#fff">DIGISIM</text>
            <rect x="86" y="58" width="200" height="2" rx="1" fill="#C8973A"/>
          </svg>
        </a>
        <ul style={{display:"flex",gap:"2rem",listStyle:"none",margin:0,padding:0}}>
          {NAV_LINKS.map(l=>(
            <li key={l.href}>
              <a href={l.href} onClick={e=>scrollTo(e,l.href)} className="nav-link font-ui"
                style={{color:"rgba(255,255,255,.62)",textDecoration:"none",fontSize:12,letterSpacing:"0.14em",fontWeight:600,textTransform:"uppercase",transition:"color .2s"}}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" onClick={e=>{ripple(e);scrollTo(e,"#contact");}} className="ripple-btn font-ui"
          style={{fontSize:12,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",textDecoration:"none",background:"#C8973A",color:"#071828",padding:"9px 22px",transition:"all .2s"}}
          onMouseEnter={e=>{e.currentTarget.style.background="#e8b865";e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow="0 4px 18px rgba(200,151,58,.4)"}}
          onMouseLeave={e=>{e.currentTarget.style.background="#C8973A";e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=""}}>
          Get in Touch
        </a>
      </div>
    </nav>
  );
}

/* ============================================================
   HERO
   ============================================================ */
function StatCounter({ target, suffix, label }) {
  const [ref, count] = useCounter(target);
  return (
    <div ref={ref} style={{flex:1,paddingRight:32,borderRight:"1px solid rgba(255,255,255,.08)"}}>
      <div className="font-display" style={{fontSize:46,fontWeight:900,color:"#C8973A",lineHeight:1,letterSpacing:"0.04em"}}>{count}{suffix}</div>
      <div className="font-ui" style={{fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",color:"rgba(255,255,255,.36)",marginTop:6}}>{label}</div>
    </div>
  );
}

function Hero() {
  return (
    <div className="hero-grid" style={{background:"#071828",minHeight:"100vh",display:"grid",gridTemplateColumns:"1fr 1fr",alignItems:"center",position:"relative",overflow:"hidden",padding:"100px 5% 80px",gap:60}}>
      {/* Animated grid */}
      <div className="anim-grid" style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(200,151,58,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(200,151,58,.045) 1px,transparent 1px)",backgroundSize:"60px 60px",pointerEvents:"none"}}/>
      {/* Scan line */}
      <div className="anim-scan" style={{position:"absolute",left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,rgba(200,151,58,.22),transparent)",pointerEvents:"none",zIndex:1}}/>
      {/* Crosshair */}
      <svg style={{position:"absolute",right:-80,top:"50%",transform:"translateY(-50%)",width:520,height:520,opacity:.055,pointerEvents:"none"}} viewBox="0 0 520 520" fill="none">
        <g className="anim-spin"><circle cx="260" cy="260" r="240" stroke="#C8973A" strokeWidth="1"/><circle cx="260" cy="260" r="160" stroke="#C8973A" strokeWidth="0.8"/><circle cx="260" cy="260" r="80" stroke="#C8973A" strokeWidth="0.6"/></g>
        <line x1="260" y1="0" x2="260" y2="520" stroke="#C8973A" strokeWidth="0.6"/>
        <line x1="0" y1="260" x2="520" y2="260" stroke="#C8973A" strokeWidth="0.6"/>
        <circle cx="260" cy="260" r="12" fill="#C8973A" opacity="0.4"/>
      </svg>

      {/* Content */}
      <div style={{position:"relative",zIndex:2}}>
        <div className="anim-eyebrow font-ui" style={{display:"inline-flex",alignItems:"center",gap:10,fontSize:11,letterSpacing:"0.24em",textTransform:"uppercase",color:"#C8973A",fontWeight:700,marginBottom:28}}>
          <span style={{width:32,height:1,background:"#C8973A"}}/>
          Engineering Precision · Pharmaceutical Excellence
        </div>
        <h1 className="anim-headline font-display" style={{fontSize:"clamp(36px,5.5vw,72px)",fontWeight:900,lineHeight:1.02,color:"#fff",letterSpacing:"0.06em",marginBottom:8}}>
          WHERE<br/>PRECISION<br/><span style={{color:"#C8973A"}}>MEETS</span><br/>PERFORMANCE.
        </h1>
        <p className="anim-tagline font-ui" style={{fontSize:"clamp(13px,1.6vw,18px)",color:"rgba(255,255,255,.42)",letterSpacing:"0.3em",textTransform:"uppercase",marginBottom:32}}>
          Digisim Consulting
        </p>
        <div className="anim-divider" style={{height:2,background:"#C8973A",marginBottom:28}}/>
        <p className="anim-desc" style={{fontSize:15,lineHeight:1.85,color:"rgba(255,255,255,.58)",fontWeight:300,marginBottom:40,maxWidth:520}}>
          Operating at the intersection of engineering precision and deep pharmaceutical manufacturing expertise —
          delivering automation, validation, facility design, and training services that are optimized, compliant, and production-ready.
        </p>
        <div className="anim-actions" style={{display:"flex",gap:16,alignItems:"center",flexWrap:"wrap",marginBottom:48}}>
          <GoldBtn href="#contact" onClick={e=>scrollTo(e,"#contact")}>Request a Consultation</GoldBtn>
          <a href="#services" onClick={e=>scrollTo(e,"#services")} className="font-ui"
            style={{fontSize:13,fontWeight:600,letterSpacing:"0.1em",textDecoration:"none",border:"1px solid rgba(255,255,255,.25)",color:"rgba(255,255,255,.7)",padding:"14px 32px",transition:"all .2s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="#C8973A";e.currentTarget.style.color="#C8973A";e.currentTarget.style.transform="translateY(-3px)"}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.25)";e.currentTarget.style.color="rgba(255,255,255,.7)";e.currentTarget.style.transform=""}}>
            Explore Services
          </a>
        </div>
        <div className="anim-stats" style={{display:"flex",borderTop:"1px solid rgba(255,255,255,.08)",paddingTop:32}}>
          <StatCounter target={15} suffix="+" label="Years of Expertise"/>
          <div style={{flex:1,paddingLeft:32}}>
            <div className="font-display" style={{fontSize:46,fontWeight:900,color:"#C8973A",lineHeight:1,letterSpacing:"0.04em"}}>50+</div>
            <div className="font-ui" style={{fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",color:"rgba(255,255,255,.36)",marginTop:6}}>Projects Delivered</div>
          </div>
        </div>
      </div>

      {/* Visual */}
      <div className="hero-visual anim-visual" style={{position:"relative",height:520,zIndex:2}}>
        <img style={{position:"absolute",top:0,right:0,width:"88%",height:360,objectFit:"cover",border:"2px solid rgba(200,151,58,.3)",filter:"brightness(.72) saturate(.8)",transition:"transform .7s"}}
          src="https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?fm=jpg&q=80&w=900&fit=crop&ixlib=rb-4.1.0"
          alt="Pharmaceutical manufacturing"
          onError={e=>{e.target.style.background="#163a62"}}
          onMouseEnter={e=>e.target.style.transform="scale(1.025)"}
          onMouseLeave={e=>e.target.style.transform=""}/>
        <img style={{position:"absolute",bottom:0,left:0,width:"55%",height:200,objectFit:"cover",border:"2px solid rgba(200,151,58,.3)",filter:"brightness(.72) saturate(.8)"}}
          src="https://images.unsplash.com/photo-1581093458791-9f3c3250a8b7?fm=jpg&q=80&w=600&fit=crop&ixlib=rb-4.1.0"
          alt="Industrial automation"
          onError={e=>{e.target.style.background="#0D2B4E"}}/>
        <div className="anim-badge font-display" style={{position:"absolute",bottom:60,right:0,background:"#C8973A",color:"#071828",padding:16,width:148,textAlign:"center",zIndex:3}}>
          <div style={{fontSize:40,fontWeight:900,lineHeight:1,letterSpacing:"0.04em"}}>50+</div>
          <div className="font-ui" style={{fontSize:10,letterSpacing:"0.14em",fontWeight:700,textTransform:"uppercase",marginTop:3}}>Projects Delivered</div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   EXPERTISE STRIP
   ============================================================ */
const EXPERTISE = [
  {num:"01",title:"Automation & Digital Transformation",detail:"Platform-agnostic control systems that make plants run smarter — from the floor to the boardroom.",SVG:AutomationSVG},
  {num:"02",title:"Facility Design & Engineering",detail:"GMP-compliant cleanrooms and utilities built for inspection readiness from day one.",SVG:FacilitySVG},
  {num:"03",title:"CSV, Commissioning & Qualification",detail:"Risk-based validation programs built to withstand FDA and EMA scrutiny — every time.",SVG:ValidationSVG},
  {num:"04",title:"Training & Workforce Development",detail:"From SOPs to immersive XR simulation — building teams that can own and operate at scale.",SVG:TrainingSVG},
];

function ExpertiseCard({num,title,detail,SVG,delay}) {
  const [hov,setHov] = useState(false);
  return (
    <div className={`rs exp-card ${["d1","d2","d3","d4"][parseInt(num)-1]}`}
      style={{position:"relative",overflow:"hidden",height:280,background:"#163a62",cursor:"default"}}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
      <SVG/>
      <div className="exp-overlay-bg" style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"24px 20px",background:hov?"linear-gradient(to top,rgba(7,24,40,.98) 0%,rgba(7,24,40,.65) 65%,rgba(7,24,40,.1) 100%)":"linear-gradient(to top,rgba(7,24,40,.95) 0%,rgba(7,24,40,.18) 55%,transparent 100%)",transition:"background .35s"}}>
        <div className="font-ui" style={{fontSize:11,letterSpacing:"0.2em",color:"#C8973A",fontWeight:700,marginBottom:6}}>{num}</div>
        <div className="font-display" style={{fontSize:16,fontWeight:700,color:"#fff",lineHeight:1.2,marginBottom:8,letterSpacing:"0.04em"}}>{title}</div>
        <p className="exp-detail" style={{fontSize:12,color:"rgba(255,255,255,.78)",lineHeight:1.65,maxWidth:190,opacity:hov?1:0,transform:hov?"none":"translateY(8px)",transition:"opacity .4s,transform .4s"}}>{detail}</p>
      </div>
      <div className="exp-bar" style={{position:"absolute",bottom:0,left:0,width:"100%",height:3,background:"#C8973A",transform:hov?"scaleX(1)":"scaleX(0)",transformOrigin:"left",transition:"transform .5s cubic-bezier(.22,1,.36,1)"}}/>
    </div>
  );
}

function ExpertiseStrip() {
  return (
    <div id="expertise" style={{background:"#0D2B4E",padding:"64px 5%"}}>
      <div className="rv" style={{fontSize:11,letterSpacing:"0.24em",textTransform:"uppercase",color:"#C8973A",fontWeight:700,marginBottom:40,display:"flex",alignItems:"center",gap:10,fontFamily:"'Rajdhani',sans-serif"}}>
        <span style={{width:24,height:1,background:"#C8973A",display:"inline-block"}}/>Core Expertise
      </div>
      <div className="four-col" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:3}}>
        {EXPERTISE.map(c=><ExpertiseCard key={c.num} {...c}/>)}
      </div>
    </div>
  );
}

/* ============================================================
   SPLIT SECTIONS
   ============================================================ */
function SplitSection({id,reversed,imgBg,ImgContent,title,body,listItems,light}) {
  return (
    <div id={id} className="split-section" style={{display:"grid",gridTemplateColumns:"1fr 1fr",minHeight:520,direction:reversed?"rtl":"ltr"}}>
      <div style={{overflow:"hidden",position:"relative",background:imgBg,direction:"ltr"}}>
        <div className="split-img-inner" style={{width:"100%",height:"100%"}}><ImgContent/></div>
      </div>
      <div className="rv" style={{background:light?"#f7f8fa":"#0D2B4E",padding:"72px 56px",display:"flex",flexDirection:"column",justifyContent:"center",direction:"ltr"}}>
        <SectionLabel>Service Highlight</SectionLabel>
        <SectionTitle light={!light} style={{marginBottom:20}}>{title}</SectionTitle>
        <p style={{fontSize:15,lineHeight:1.88,color:light?"#4a5c6e":"rgba(255,255,255,.58)",fontWeight:300,marginBottom:28}}>{body}</p>
        <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:14,padding:0}}>
          {listItems.map(item=>(
            <li key={item} className={light?"list-item-dk":"list-item"} style={{fontSize:14,color:light?"#4a5c6e":"rgba(255,255,255,.54)",display:"flex",alignItems:"flex-start",gap:12,lineHeight:1.65}}>
              <span style={{width:6,height:6,background:"#C8973A",borderRadius:"50%",flexShrink:0,marginTop:7}}/>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const AutoSVGFull = () => (
  <svg viewBox="0 0 700 520" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style={{width:"100%",height:"100%"}}>
    <rect width="700" height="520" fill="#071828"/>
    {[104,208,312,416].map(y=><line key={y} x1="0" y1={y} x2="700" y2={y} stroke="#0D2B4E" strokeWidth="0.6"/>)}
    {[140,280,420,560].map(x=><line key={x} x1={x} y1="0" x2={x} y2="520" stroke="#0D2B4E" strokeWidth="0.6"/>)}
    <rect x="60" y="60" width="420" height="260" rx="6" fill="#0a1e36" stroke="#163a62" strokeWidth="2"/>
    <rect x="68" y="68" width="404" height="244" rx="3" fill="#071828"/>
    <rect x="68" y="68" width="404" height="32" rx="3" fill="#0D2B4E"/>
    <circle cx="85" cy="84" r="7" fill="#C8973A"/>
    <rect x="100" y="79" width="80" height="5" rx="2" fill="#C8973A" opacity="0.7"/>
    <polyline points="76,195 105,172 125,200 150,165 175,185 200,155 225,178 255,148 280,170 305,142 330,162 358,135 385,158 410,132 435,152 460,128" fill="none" stroke="#C8973A" strokeWidth="2.5"/>
    <polygon points="76,195 105,172 125,200 150,165 175,185 200,155 225,178 255,148 280,170 305,142 330,162 358,135 385,158 410,132 435,152 460,128 460,245 76,245" fill="#C8973A" opacity="0.06"/>
    <polyline points="76,215 105,210 125,220 150,208 175,216 200,205 225,212 255,202 280,210 305,200 330,208 358,197 385,205 410,195 435,204 460,194" fill="none" stroke="#163a62" strokeWidth="1.5"/>
    <line x1="76" y1="245" x2="460" y2="245" stroke="#163a62" strokeWidth="1"/>
    {[76,172,268,364].map((x,i)=><g key={x}><rect x={x} y="252" width="88" height="52" rx="2" fill="#0D2B4E"/><rect x={x} y="252" width="88" height="4" fill="#C8973A" opacity={[.8,.3,.5,1][i]}/></g>)}
    <rect x="508" y="40" width="140" height="380" rx="5" fill="#0D2B4E" stroke="#163a62" strokeWidth="2"/>
    <rect x="518" y="52" width="120" height="44" rx="2" fill="#071828" stroke="#163a62" strokeWidth="1"/>
    <rect x="526" y="60" width="60" height="3" rx="1" fill="#C8973A" opacity="0.8"/>
    <circle cx="610" cy="68" r="6" fill="#C8973A" opacity="0.9"/>
    <rect x="518" y="102" width="120" height="44" rx="2" fill="#071828" stroke="#163a62" strokeWidth="1"/>
    <rect x="527" y="111" width="16" height="20" rx="1" fill="#163a62"/>
    <rect x="547" y="111" width="16" height="20" rx="1" fill="#163a62"/>
    <line x1="480" y1="160" x2="508" y2="160" stroke="#C8973A" strokeWidth="1.5" strokeDasharray="3,3"/>
    <line x1="480" y1="200" x2="508" y2="200" stroke="#163a62" strokeWidth="1.5" strokeDasharray="3,3"/>
    <circle cx="630" cy="460" r="44" fill="none" stroke="#C8973A" strokeWidth="0.7" opacity="0.12"/>
    <line x1="630" y1="416" x2="630" y2="504" stroke="#C8973A" strokeWidth="0.5" opacity="0.12"/>
    <line x1="586" y1="460" x2="674" y2="460" stroke="#C8973A" strokeWidth="0.5" opacity="0.12"/>
  </svg>
);

/* ============================================================
   SERVICES
   ============================================================ */
const SERVICES = [
  {num:"01",name:"Automation Engineering & Digital Transformation",desc:"We design, integrate, and program industrial control systems that don't just automate tasks — they generate insight. From PLC logic to enterprise MES, platform-agnostic architectures that eliminate bottlenecks and give every level the data to act decisively.",tags:["PLC/SCADA","DCS Integration","HMI Design","MES","Batch Control","EMS"]},
  {num:"02",name:"Facility Design",desc:"A poorly designed facility doesn't just cost money to fix — it costs compliance. We engineer GMP-compliant facilities from the ground up: cleanroom architecture, HVAC, utility systems, material flow, and full capital project execution.",tags:["Cleanroom Design","HVAC/Utilities","cGMP Layout","Capital Projects"]},
  {num:"03",name:"Computer System Validation, Commissioning & Qualification",desc:"Compliance isn't a checkbox — it's an engineering discipline. Our CSV and C&Q programs are built risk-first, aligned to GAMP 5 and 21 CFR Part 11, executed with the precision FDA and EMA inspections demand.",tags:["GAMP 5","21 CFR Part 11","IQ/OQ/PQ","FAT/SAT","Risk-Based C&Q"]},
  {num:"04",name:"503B Setup & Automation",desc:"503B outsourcing facilities face a uniquely demanding regulatory environment. Specialized expertise in compounding workflow automation, aseptic process design, equipment selection, and IT/OT integration — so your facility launches FDA-ready.",tags:["Compounding Automation","FDA 503B","Manufacturing Setup","IT/OT Systems"]},
  {num:"05",name:"Staff Augmentation",desc:"The talent you need is hard to find and expensive to hire. Our augmentation model embeds credentialed professionals directly into your team — validation engineers, automation specialists, project managers, facility engineers.",tags:["On-Site Engineers","Validation Specialists","Project Managers","Contract-to-Hire"]},
  {num:"06",name:"Training & Workforce Development",desc:"Your system is only as capable as the people running it. From SOP-based content to immersive VR and AR simulation — building genuine competency. A workforce that truly understands the process is your most durable compliance asset.",tags:["Content Development","Process Simulation","VR/AR (XR)","Competency Frameworks"]},
  {num:"07",name:"Maintenance & Reliability",desc:"Unplanned downtime in a regulated facility isn't just expensive — it's a compliance event. RCM-based programs using FMEA-driven analysis, predictive monitoring, and CMMS integration shift your operation from reactive to anticipatory.",tags:["RCM/FMEA","Predictive Maintenance","CMMS Deployment","Asset Management"],last:true},
];

function ServiceCard({num,name,desc,tags,last,delay}) {
  const delays = ["d1","d2","d3","d4","d5","d6","d7"];
  return (
    <div className={`service-card rv ${delays[parseInt(num)-1]}`}
      style={{background:"#fff",padding:"40px 36px",position:"relative",overflow:"hidden",cursor:"default",
        ...(last?{gridColumn:"1/-1",display:"flex",flexDirection:"row",alignItems:"flex-start",gap:48}:{})}}>
      <div className="svc-accent" style={{position:"absolute",top:0,left:0,width:3,height:"100%",background:"transparent",transition:"background .35s"}}/>
      <div className="svc-num font-display" style={{fontSize:64,fontWeight:900,color:"rgba(13,43,78,.055)",lineHeight:1,marginBottom:last?0:16,letterSpacing:"0.04em",transition:"color .35s",...(last?{flexShrink:0}:{})}}>{num}</div>
      <div style={last?{flex:1}:{}}>
        <div className="svc-name font-display" style={{fontSize:18,fontWeight:700,color:"#0D2B4E",marginBottom:14,lineHeight:1.15,letterSpacing:"0.04em",transition:"color .35s",...(last?{width:220,flexShrink:0,marginBottom:0}:{})}}>{name}</div>
        <p className="svc-desc" style={{fontSize:14,lineHeight:1.8,color:"#4a5e72",marginBottom:22,transition:"color .35s"}}>{desc}</p>
      </div>
      <div style={last?{flexShrink:0,width:220,display:"flex",flexDirection:"column",gap:6}:{display:"flex",flexWrap:"wrap",gap:6}}>
        {tags.map(t=><span key={t} className="svc-tag font-ui" style={{fontSize:11,letterSpacing:"0.08em",background:"#eef1f5",color:"#4a5c6e",padding:"4px 10px",fontWeight:600,transition:"all .3s"}}>{t}</span>)}
      </div>
    </div>
  );
}

function Services() {
  return (
    <section id="services" style={{background:"#f7f8fa",padding:"96px 5%"}}>
      <div className="rv" style={{marginBottom:56}}>
        <SectionLabel>All Services</SectionLabel>
        <SectionTitle style={{marginBottom:20}}>Seven Disciplines.<br/>One Integrated Methodology.</SectionTitle>
        <p style={{fontSize:15,lineHeight:1.82,color:"#3a4e62",maxWidth:680,marginTop:20}}>
          The firms that struggle aren't short on capability — they're short on integration. At Digisim, our seven practice areas are designed to work together. Nothing falls through the cracks because there are no cracks.
        </p>
      </div>
      <div className="three-col" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:2,background:"rgba(13,43,78,.08)"}}>
        {SERVICES.map(s=><ServiceCard key={s.num} {...s}/>)}
      </div>
    </section>
  );
}

/* ============================================================
   DIFFERENTIATORS
   ============================================================ */
const DIFFS = [
  {num:"01 — Regulatory Intelligence",title:"Built In From Line One — Not Retrofitted at the End",body:"Too many engineering firms treat compliance as a final step. We treat it as a design constraint. Every Digisim engineer carries dual expertise — deep technical capability and fluent regulatory knowledge. FDA 21 CFR Part 11, GAMP 5, cGMP, EMA, and ISPE guidelines shape every decision from the first discovery call.",dir:"rl"},
  {num:"02 — Integrated Methodology",title:"Seven Disciplines. Zero Silos. One Accountable Team.",body:"Fragmented engagements produce fragmented results. When your automation team and your validation team don't talk, errors compound — and they show up during inspections. At Digisim, our disciplines are deliberately integrated. The facility design team knows what C&Q will need.",dir:"rr"},
  {num:"03 — Embedded Expertise",title:"Professionals Who Work With You — Not Around You",body:"Document-drop consulting has a well-known failure mode: technically correct deliverables nobody on the client team can own, operate, or defend. Digisim engineers work embedded in your organization — on-site, accountable, integrated into your workflows from day one.",dir:"rl"},
  {num:"04 — Knowledge Transfer",title:"When We Leave, Your Team Owns the System. Completely.",body:"Dependency is not a business model we believe in. Every engagement includes structured knowledge transfer — documented SOPs, comprehensive training, system architecture walkthroughs, and hands-on coaching. We measure success not by whether you call us back, but by whether you could handle it without us.",dir:"rr"},
];

function Differentiators() {
  return (
    <section style={{background:"#0D2B4E",padding:"96px 5%"}}>
      <div className="rv"><SectionLabel>Why Digisim</SectionLabel><SectionTitle light>The Firms That Have Worked With Us<br/>Don't Go Back to the Alternative.</SectionTitle></div>
      <div className="two-col" style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",marginTop:56,borderTop:"1px solid rgba(255,255,255,.08)"}}>
        {DIFFS.map((d,i)=>(
          <div key={d.num} className={`diff-item ${d.dir}`}
            style={{padding:`40px ${i%2===0?"40px 40px 40px 0":"40px 0 40px 40px"}`,borderBottom:i<2?"1px solid rgba(255,255,255,.08)":"none",borderRight:i%2===0?"1px solid rgba(255,255,255,.08)":"none",transition:"background .3s"}}>
            <div className="font-ui" style={{fontSize:11,letterSpacing:"0.24em",color:"#C8973A",fontWeight:700,marginBottom:10,textTransform:"uppercase"}}>{d.num}</div>
            <div className="diff-title font-display" style={{fontSize:22,fontWeight:700,color:"#fff",marginBottom:16,lineHeight:1.1,letterSpacing:"0.04em"}}>{d.title}</div>
            <p style={{fontSize:14,lineHeight:1.88,color:"rgba(255,255,255,.5)",fontWeight:300}}>{d.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   APPROACH
   ============================================================ */
const PILLARS = [
  {num:"01 — Engagement Model",title:"Full-Lifecycle. No Handoffs. No Context Lost.",body:"From concept through commissioning, validation, and sustained operational support — consistently. No handoffs between teams, no loss of institutional knowledge. The engineer who understands your process in week one is accountable in month twelve."},
  {num:"02 — Technology Philosophy",title:"Hardware & Software Agnostic. Best Solution Wins.",body:"No preferred vendors. No platform allegiances. Recommendations driven entirely by what solves your operational problem most effectively — Rockwell, Siemens, Honeywell, or best-of-breed. Independence means the right architecture, not the easiest for us to implement."},
  {num:"03 — Regulatory Approach",title:"Regulatory Fluency as a Core Engineering Competency.",body:"FDA 21 CFR Part 11, GAMP 5, cGMP, and ISPE guidelines are foundational constraints that shape how we design, build, validate, and document every system we touch. Our clients don't dread inspections — they're prepared for them."},
  {num:"04 — Outcome Standard",title:"Measured in Results. Not Hours Billed.",body:"Every engagement delivers outcomes you can quantify: increased uptime, accelerated inspection readiness, improved throughput, and reduced cost of quality. We define those targets at the outset and hold ourselves accountable at close."},
];

function Approach() {
  return (
    <section style={{background:"#071828",position:"relative",overflow:"hidden",padding:"96px 5%"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(200,151,58,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(200,151,58,.03) 1px,transparent 1px)",backgroundSize:"40px 40px",pointerEvents:"none"}}/>
      <div style={{position:"relative",zIndex:2}}>
        <div className="rv"><SectionLabel>Our Philosophy</SectionLabel><SectionTitle light>How We Work — And Why It Produces<br/>Results That Last.</SectionTitle></div>
        <div className="two-col" style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:2,marginTop:56,background:"rgba(200,151,58,.07)"}}>
          {PILLARS.map((p,i)=>{
            const [hov,setHov]=useState(false);
            return(
              <div key={p.num} className={`pillar rv ${["d1","d2","d3","d4"][i]}`}
                style={{padding:40,background:hov?"rgba(200,151,58,.04)":"#071828",position:"relative",transition:"background .35s"}}
                onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
                <div className="pillar-bar" style={{position:"absolute",top:0,left:0,width:3,background:"#C8973A",height:hov?"100%":"28%"}}/>
                <div className="font-ui" style={{fontSize:11,letterSpacing:"0.2em",color:"#C8973A",fontWeight:700,marginBottom:14,textTransform:"uppercase"}}>{p.num}</div>
                <div className="font-display" style={{fontSize:20,fontWeight:700,color:"#fff",marginBottom:14,letterSpacing:"0.04em"}}>{p.title}</div>
                <p style={{fontSize:14,lineHeight:1.88,color:"rgba(255,255,255,.48)",fontWeight:300}}>{p.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   INDUSTRIES
   ============================================================ */
const INDUSTRIES = [
  {title:"Life Sciences & Regulated Manufacturing",sub:"From early-stage biotech to large-scale pharmaceutical production, we bring engineering rigor and regulatory fluency to industries where product quality and patient safety are inseparable.",items:[["Pharmaceutical Manufacturing","Oral solid dose, sterile fill/finish, API production, and secondary packaging."],["Biotechnology & Cell Therapy","Bioreactor automation, cleanroom design, and GMP-validated systems for advanced therapeutic modalities."],["503B Outsourcing Facilities","Facility design, compounding automation, aseptic filling, and complete IT/OT infrastructure."],["Nutraceuticals & Dietary Supplements","cGMP facility design, automated batch record systems, and quality management infrastructure."]],dir:"rl"},
  {title:"Industrial Infrastructure & Operations",sub:"Beyond life sciences, Digisim brings the same disciplined methodology to industrial operations where automation, data integrity, and workforce capability determine competitive advantage.",items:[["Industrial Automation","End-to-end plant-floor control architecture delivering real-time operational intelligence at every level."],["Digital Transformation","MES deployment, IT/OT convergence, and enterprise data integration connecting production to business outcomes."],["Maintenance & Reliability Programs","CMMS deployment, RCM frameworks, and predictive monitoring shifting operations from reactive to proactive."],["Workforce & Training Programs","XR-enabled simulation and competency frameworks building teams capable of owning complex regulated operations."]],dir:"rr"},
];

function Industries() {
  return (
    <section id="industries" style={{background:"#fff",padding:"96px 5%"}}>
      <div className="rv">
        <SectionLabel>Industries Served</SectionLabel>
        <SectionTitle style={{marginBottom:20}}>We Work Where the Stakes<br/>Are Highest.</SectionTitle>
        <p style={{fontSize:15,lineHeight:1.82,color:"#3a4e62",maxWidth:680,marginTop:20,marginBottom:56}}>
          Digisim operates at the intersection of regulated life sciences and complex industrial manufacturing — environments where precision isn't a preference, it's a requirement.
        </p>
      </div>
      <div className="two-col" style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:2,background:"rgba(13,43,78,.08)"}}>
        {INDUSTRIES.map(ind=>(
          <div key={ind.title} className={`ind-card ${ind.dir}`} style={{background:"#f7f8fa",padding:"48px 44px",position:"relative",overflow:"hidden"}}>
            <div className="ind-bar" style={{position:"absolute",bottom:0,left:0,width:"100%",height:3,background:"#C8973A",transform:"scaleX(0)",transformOrigin:"left",transition:"transform .5s cubic-bezier(.22,1,.36,1)"}}/>
            <div className="font-display" style={{fontSize:24,fontWeight:700,color:"#0D2B4E",marginBottom:12,letterSpacing:"0.04em"}}>{ind.title}</div>
            <p style={{fontSize:14,lineHeight:1.75,color:"#5a6e82",marginBottom:24}}>{ind.sub}</p>
            <ul style={{listStyle:"none",padding:0,display:"flex",flexDirection:"column",gap:14}}>
              {ind.items.map(([strong,rest])=>(
                <li key={strong} className="list-item-dk" style={{fontSize:14,color:"#3a4e62",display:"flex",alignItems:"flex-start",gap:12,lineHeight:1.65}}>
                  <span style={{width:6,height:6,background:"#C8973A",borderRadius:"50%",flexShrink:0,marginTop:7}}/>
                  <span><strong style={{color:"#0D2B4E",fontWeight:600}}>{strong}</strong> — {rest}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   CTA
   ============================================================ */
function CTA() {
  return (
    <div style={{background:"#C8973A",padding:"80px 5%",textAlign:"center",position:"relative",overflow:"hidden"}}>
      <div className="anim-cta-glow" style={{position:"absolute",top:"-50%",left:"-50%",width:"200%",height:"200%",background:"radial-gradient(circle at center,rgba(255,255,255,.12) 0%,transparent 58%)",pointerEvents:"none"}}/>
      <div className="rv" style={{position:"relative"}}>
        <h2 className="font-display" style={{fontSize:"clamp(32px,5vw,68px)",fontWeight:900,color:"#071828",lineHeight:1.02,letterSpacing:"0.04em",marginBottom:16}}>
          Ready to Build Something That Lasts?
        </h2>
        <p style={{fontSize:16,color:"rgba(7,24,40,.62)",maxWidth:560,margin:"0 auto 40px"}}>
          Whether you're standing up a new facility, navigating a digital transformation, or facing a challenge that generic firms couldn't solve — bring it to Digisim.
        </p>
        <DarkBtn href="#contact" onClick={e=>scrollTo(e,"#contact")}>Start the Conversation</DarkBtn>
      </div>
    </div>
  );
}

/* ============================================================
   CONTACT
   ============================================================ */
function Contact() {
  const [status,setStatus] = useState("idle");
  const handleSubmit = e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    if(!fd.get("fname")||!fd.get("email")){alert("Please fill in your name and work email.");return;}
    setStatus("sending");
    setTimeout(()=>{setStatus("sent");setTimeout(()=>setStatus("idle"),3200);},900);
  };
  const inputStyle = {background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.1)",color:"#fff",padding:"13px 16px",fontSize:15,width:"100%",outline:"none",transition:"border-color .25s,box-shadow .25s,background .25s",fontFamily:"'Inter',sans-serif"};
  return (
    <section id="contact" style={{background:"#0D2B4E",padding:"80px 5%"}}>
      <div className="contact-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"start",maxWidth:1100,margin:"0 auto"}}>
        <div className="rl">
          <SectionLabel>Contact</SectionLabel>
          <SectionTitle light style={{marginBottom:20}}>Let's Talk<br/>Precision.</SectionTitle>
          <p style={{fontSize:15,lineHeight:1.85,color:"rgba(255,255,255,.52)",fontWeight:300,maxWidth:380}}>
            Tell us where you are and what you're trying to solve. The right practice lead will respond directly — no intake queues, no sales handoffs, no wasted time.
          </p>
        </div>
        <div className="rr">
          <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",gap:16}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
              {[{id:"fname",label:"Name",placeholder:"Your full name",type:"text"},{id:"company",label:"Company",placeholder:"Organization name",type:"text"}].map(f=>(
                <div key={f.id} style={{display:"flex",flexDirection:"column",gap:6}}>
                  <label htmlFor={f.id} className="font-ui" style={{fontSize:11,letterSpacing:"0.16em",textTransform:"uppercase",color:"rgba(255,255,255,.4)",fontWeight:600}}>{f.label}</label>
                  <input id={f.id} name={f.id} type={f.type} placeholder={f.placeholder} style={inputStyle}/>
                </div>
              ))}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              <label htmlFor="email" className="font-ui" style={{fontSize:11,letterSpacing:"0.16em",textTransform:"uppercase",color:"rgba(255,255,255,.4)",fontWeight:600}}>Work Email</label>
              <input id="email" name="email" type="email" placeholder="you@company.com" style={inputStyle}/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              <label htmlFor="interest" className="font-ui" style={{fontSize:11,letterSpacing:"0.16em",textTransform:"uppercase",color:"rgba(255,255,255,.4)",fontWeight:600}}>Area of Interest</label>
              <select id="interest" name="interest" defaultValue="" style={{...inputStyle,cursor:"pointer"}}>
                <option value="" disabled>Select a service area</option>
                {["Automation Engineering & Digital Transformation","Facility Design","CSV, Commissioning & Qualification","503B Setup & Automation","Staff Augmentation","Training & Workforce Development","Maintenance & Reliability","Multiple / Not Sure Yet"].map(o=><option key={o} style={{background:"#071828"}}>{o}</option>)}
              </select>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              <label htmlFor="message" className="font-ui" style={{fontSize:11,letterSpacing:"0.16em",textTransform:"uppercase",color:"rgba(255,255,255,.4)",fontWeight:600}}>Tell Us About Your Project</label>
              <textarea id="message" name="message" rows={4} placeholder="Brief overview of your challenge or initiative..." style={{...inputStyle,resize:"vertical",minHeight:110}}/>
            </div>
            <button type="submit" className="ripple-btn font-ui"
              style={{alignSelf:"flex-start",fontSize:13,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",padding:"16px 32px",border:"none",cursor:"pointer",transition:"all .2s",background:status==="sent"?"#2e7d32":"#C8973A",color:status==="sent"?"#fff":"#071828"}}
              onMouseEnter={e=>{if(status!=="sent"){e.currentTarget.style.background="#e8b865";e.currentTarget.style.transform="translateY(-2px)";}}}
              onMouseLeave={e=>{if(status!=="sent"){e.currentTarget.style.background="#C8973A";e.currentTarget.style.transform="";}}}
              onClick={e=>{const r=document.createElement("span");const rect=e.currentTarget.getBoundingClientRect();const sz=Math.max(rect.width,rect.height)*2.2;r.className="ripple-effect";r.style.cssText=`width:${sz}px;height:${sz}px;left:${e.clientX-rect.left-sz/2}px;top:${e.clientY-rect.top-sz/2}px;`;e.currentTarget.appendChild(r);setTimeout(()=>r.remove(),600);}}>
              {status==="idle"?"Send Inquiry →":status==="sending"?"Sending…":"Sent ✓"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  return (
    <footer style={{background:"#071828",borderTop:"1px solid rgba(255,255,255,.06)",padding:"32px 5%",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16}}>
      <div className="font-display" style={{fontSize:18,fontWeight:900,color:"#fff",letterSpacing:"0.1em"}}>DIGI<span style={{color:"#C8973A"}}>SIM</span></div>
      <div className="font-ui" style={{fontSize:12,color:"rgba(255,255,255,.2)",letterSpacing:"0.12em",fontStyle:"italic"}}>Where Precision Meets Performance.</div>
      <div className="font-ui" style={{fontSize:13,color:"rgba(255,255,255,.26)"}}>© 2025 Digisim Consulting. Confidential.</div>
    </footer>
  );
}

/* ============================================================
   APP ROOT
   ============================================================ */
export default function Index() {
  useScrollReveal();

  return (
    <>
      <GlobalStyles/>
      <Nav/>
      <Hero/>
      <ExpertiseStrip/>
      <SplitSection
        id="services-auto"
        imgBg="#071828"
        ImgContent={AutoSVGFull}
        title="Automation That Runs the Plant — Not Just the Line."
        body="Most automation firms stop at the PLC. We don't. Digisim designs end-to-end control architectures — from plant-floor instrumentation to enterprise MES — that give operations real-time visibility and leadership the data to make confident decisions. Platform agnostic. Regulation ready. Built to scale."
        listItems={["PLC, SCADA, DCS & HMI design, integration and programming","MES design, deployment and digital transformation roadmaps","Batch control, EMS and real-time operational intelligence","IT/OT convergence strategies for regulated manufacturing"]}
      />
      <SplitSection
        reversed
        light
        imgBg="#0a1e36"
        ImgContent={ValidationSVG}
        title="Validation Built to Survive the Inspection — Not Just Pass It."
        body="Regulatory scrutiny is only getting tighter. Our CSV and C&Q programs are structured from the outset around GAMP 5, 21 CFR Part 11, and risk-based approaches — so when the inspector walks in, your documentation tells a clear, defensible story. No scrambling, no retrofitting."
        listItems={["URS through IQ/OQ/PQ — full lifecycle protocol writing and execution","21 CFR Part 11 electronic records and audit trail compliance","FAT/SAT through site commissioning and periodic review","GAMP 5 risk classification and risk-based testing strategies"]}
      />
      <Services/>
      <Differentiators/>
      <Approach/>
      <Industries/>
      <CTA/>
      <Contact/>
      <Footer/>
    </>
  );
}
