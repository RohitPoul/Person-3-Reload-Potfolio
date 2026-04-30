import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import char1 from "../assets/images/characters/char1.png";
import char2 from "../assets/images/characters/char2.png";
import char3 from "../assets/images/characters/char3.png";
import bgVideo from "../assets/videos/main1.mp4";
import icon1 from "../assets/images/icons/icon1.png";
import icon2 from "../assets/images/icons/icon2.png";
import icon3 from "../assets/images/icons/icon3.png";
import mainm from "../assets/images/portraits/mainm.png";
import mainm2 from "../assets/images/portraits/mainm2.png";
import mainf from "../assets/images/portraits/mainf.png";

const CHARS = [char1, char2, char3];
const MAIN_IMAGES = [mainm, mainm2, mainf];

const REVEAL_CONTENT = [
  {
    upper: ["NAME: ROHIT POUL", "AGE: 23", "EDUCATION: B.TECH INFORMATION TECHNOLOGY", "STATUS: GRADUATED • AVAILABLE NOW"],
    lower: "AI/ML ENGINEER & FULL-STACK DEVELOPER",
  },
  {
    upper: [
      "PYTHON • C++ • JAVASCRIPT • TYPESCRIPT",
      "PYTORCH • TENSORFLOW • OPENCV • ONNX",
      "FASTAPI • REACT • QT • ELECTRON • POSTGRESQL",
    ],
    lower: "FRESHER • READY TO BUILD PRODUCTION-READY SOLUTIONS",
  },
  {
    upper: [
      "AI/ML & COMPUTER VISION",
      "DESKTOP APPLICATION DEVELOPMENT",
      "FULL-STACK WEB DEVELOPMENT",
    ],
    lower: "BUILDING INTELLIGENT, SCALABLE SOLUTIONS",
  },
];

const ROLES = [
  { text: "LEADER", color: "#e8c100", bg: "rgba(232,193,0,0.12)", border: "rgba(232,193,0,0.5)" },
  { text: "SUPPORT",  color: "#4a8fff", bg: "rgba(74,143,255,0.12)", border: "rgba(74,143,255,0.5)" },
  { text: "ATTACK",  color: "#dc2626", bg: "rgba(220,38,38,0.12)", border: "rgba(220,38,38,0.5)" },
];

const ITEMS = [
  {
    id: "about", label: "ABOUT ME", handle: "@ROHIT-POUL", href: "https://github.com/Rohit-Poul", icon: "👤", barIcon: icon1, bars: 1, newBars: [0], counts: ["RP"],
    links: ["GITHUB.COM/ROHIT-POUL"],
    stats: [
      { tag: "AGE", value: "23",  color: "#9147ff" },
      { tag: "AI",  value: "ML", color: "#bf94ff" },
    ],
  },
  {
    id: "skills", label: "SKILLS & STACK", handle: "@ROHIT-POUL", href: "https://www.linkedin.com/in/rohit-poul-403a41289", icon: "⚡", barIcon: icon2, bars: 3, newBars: [0], counts: ["PYTORCH", "REACT", "C++"],
    links: ["LINKEDIN.COM/IN/ROHIT-POUL-403A41289", "GITHUB.COM/ROHIT-POUL", "GITHUB.COM/ROHIT-POUL?TAB=REPOSITORIES"],
    stats: [
      { tag: "STK", value: "FS",   color: "#e1306c" },
      { tag: "YRS", value: "3+",   color: "#f77737" },
    ],
  },
  {
    id: "specializations", label: "SPECIALIZATIONS", handle: "POULROHIT258@GMAIL.COM", href: "mailto:poulrohit258@gmail.com", icon: "🎯", barIcon: icon3, bars: 3, newBars: [0, 1], counts: ["AI/ML", "DESKTOP", "WEB"],
    links: ["GITHUB.COM/ROHIT-POUL", "LINKEDIN.COM/IN/ROHIT-POUL-403A41289", "GITHUB.COM/ROHIT-POUL?TAB=REPOSITORIES"],
    stats: [
      { tag: "AI", value: "CV", color: "#00f2ea" },
      { tag: "EXP", value: "3+",  color: "#ff0050" },
    ],
  },
];

export default function AboutMe() {
  const [active, setActive]   = useState(-1);
  const [mounted, setMounted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const navigate = useNavigate();
  const selectedIndex = active >= 0 ? active : 0;

  const handleBarClick = (index) => {
    if (revealed && active === index) {
      setRevealed(false);
    } else {
      setActive(index);
      setRevealed(true);
    }
  };

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") {
        setActive(i => (i < 0 ? 0 : Math.max(0, i - 1)));
      }
      if (e.key === "ArrowDown") {
        setActive(i => (i < 0 ? 0 : Math.min(ITEMS.length - 1, i + 1)));
      }
      if (e.key === "Enter") {
        setActive(i => (i < 0 ? 0 : i));
        setRevealed(true);
      }
      if (e.key === "ArrowRight") {
        setActive(i => (i < 0 ? 0 : i));
        setRevealed(true);
      }
      if (e.key === "ArrowLeft") {
        if (revealed) setRevealed(false);
        else navigate(-1);
      }
      if (e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, navigate, revealed]);

  return (
    <div id="menu-screen">
      <video src={bgVideo} autoPlay loop muted playsInline />
      {revealed && <div className="sc-dim" onClick={(e) => { e.stopPropagation(); setRevealed(false); }} />}
      {revealed && (
        <div className={`sc-reveal-panel${mounted ? " mounted" : ""}`}>
          <div className="sc-reveal-upper-bar">
            {REVEAL_CONTENT[selectedIndex].upper.map((line) => (
              <div className="sc-reveal-upper-line" key={line}>{line}</div>
            ))}
          </div>
          <div className="sc-reveal-lower-bar">{REVEAL_CONTENT[selectedIndex].lower}</div>
        </div>
      )}
      {revealed && (
        <div className="sc-right-nav">
          <span className="sc-nav-arrow left">◄</span>
          <span className="sc-nav-btn">LB</span>
          <span className="sc-nav-dot" />
          <span className="sc-nav-btn">RB</span>
          <span className="sc-nav-arrow right">►</span>
        </div>
      )}
      {revealed && (
        <div className={`sc-main-portrait-shell${mounted ? " mounted" : ""}`}>
          <img
            className="sc-main-portrait"
            src={MAIN_IMAGES[selectedIndex]}
            alt=""
          />
        </div>
      )}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:ital,wght@0,400;0,700;1,700&family=Montserrat:wght@300&display=swap');

        .sc-root {
          position: absolute;
          inset: 0;
          z-index: 9999;
          display: block;
          padding-left: 0;
        }

        .sc-dim {
          position: absolute;
          inset: 0;
          z-index: 15000;
          background: rgba(40, 45, 54, 0.68);
          pointer-events: all;
          cursor: pointer;
          animation: sc-dim-in 0.32s ease-out;
        }

        @keyframes sc-dim-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes sc-reveal-bar-in {
          0% {
            opacity: 0;
            transform: translateX(-120px) rotate(-20deg) scaleX(0.72);
          }
          60% {
            opacity: 0.96;
            transform: translateX(18px) rotate(-20deg) scaleX(1.03);
          }
          100% {
            opacity: 0.92;
            transform: translateX(0) rotate(-20deg) scaleX(1);
          }
        }

        @keyframes sc-portrait-in {
          0% {
            opacity: 0;
            transform: translateX(78px) skewX(-8deg) scale(0.94);
            filter: blur(8px);
          }
          55% {
            opacity: 0.9;
            transform: translateX(-8px) skewX(-8deg) scale(1.015);
            filter: blur(0);
          }
          100% {
            opacity: 0.96;
            transform: translateX(0) skewX(-8deg) scale(1);
            filter: blur(0);
          }
        }

        @keyframes sc-arrow-left {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(-5px); opacity: 0.4; }
        }

        @keyframes sc-arrow-right {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(5px); opacity: 0.4; }
        }

        .sc-main-portrait-shell {
          position: absolute;
          top: 0;
          right: -3vw;
          z-index: 15002;
          pointer-events: none;
          width: 43vw;
          height: 100vh;
          overflow: hidden;
          animation: sc-portrait-in 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sc-main-portrait-shell.mounted {
          opacity: 0.96;
          transform: translateX(0) skewX(-8deg) scale(1);
        }

        .sc-reveal-panel {
          position: absolute;
          top: 44vh;
          left: -6vw;
          width: 88vw;
          height: 60vh;
          z-index: 15001;
          pointer-events: none;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(243,246,252,0.98) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 88px) 100%, 0 100%);
          box-shadow:
            0 0 0 2px rgba(255,255,255,0.18),
            18px 0 0 rgba(215, 13, 44, 0.82),
            28px 0 0 rgba(255,255,255,0.26);
          opacity: 0;
          transform: translateX(-80px) rotate(-20deg) scaleX(0.7);
          transform-origin: left bottom;
          animation: sc-reveal-bar-in 0.46s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .sc-reveal-panel.mounted {
          opacity: 0.92;
          transform: translateX(0) rotate(-20deg) scaleX(1);
        }
        .sc-reveal-panel::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 8px;
          background: linear-gradient(180deg, #e03d31 0%, #eb3333 100%);
          clip-path: inherit;
        }
        .sc-reveal-upper-bar {
          position: absolute;
          top: 10%;
          left: 0%;
          width: 100%;
          height: 40%;
          background: rgba(0, 0, 0, 0.92);
          clip-path: polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #fff;
          text-align: center;
        }
        .sc-reveal-upper-line {
          font-family: 'Montserrat', sans-serif;
          font-weight: 300;
          font-size: 20px;
          letter-spacing: 0.5px;
          line-height: 1.15;
        }
        .sc-reveal-lower-bar {
          position: absolute;
          top: 58%;
          right: 0;
          width: 48%;
          min-height: 20%;
          max-height: 34%;
          background: rgba(0, 0, 0, 0.92);
          clip-path: polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.06);
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          font-weight: 300;
          font-size: 22px;
          line-height: 1.18;
          letter-spacing: 0.4px;
          text-transform: lowercase;
          white-space: normal;
          overflow-y: auto;
          padding: 10px 18px 10px 22px;
        }

        @keyframes sc-right-nav-pop {
          0%   { opacity: 0; transform: scale(0.55) translateY(-10px); }
          65%  { opacity: 1; transform: scale(1.1) translateY(2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .sc-right-nav {
          position: absolute;
          top: 10vh;
          left: 6vw;
          display: flex;
          align-items: center;
          gap: 6px;
          pointer-events: none;
          z-index: 15003;
          transform: translateX(-40px) rotate(-20deg);
          transform-origin: left bottom;
          animation: sc-right-nav-pop 0.38s cubic-bezier(0.22,1,0.36,1) both;
        }
        .sc-right-nav .sc-nav-btn {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 100px;
          letter-spacing: 3px;
          line-height: 1;
          user-select: none;
          color: #fff;
          -webkit-text-stroke: 2px #000;
          paint-order: stroke fill;
          background: none;
          border: none;
          padding: 0 6px;
        }
        .sc-right-nav .sc-nav-dot {
          width: 16px;
          height: 16px;
          border-radius: 999px;
          background: #111;
          margin: 0 10px;
          flex-shrink: 0;
        }
        .sc-right-nav .sc-nav-arrow {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          color: #c4001a;
          display: inline-block;
          user-select: none;
        }
        .sc-right-nav .sc-nav-arrow.left  { animation: sc-arrow-left  0.8s ease-in-out infinite; }
        .sc-right-nav .sc-nav-arrow.right { animation: sc-arrow-right 0.8s ease-in-out infinite; }

        .sc-main-portrait {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transform: skewX(8deg) scale(1.02);
          transform-origin: top right;
        }
        
        /* Shift mainf and mainm2 portraits to the left */
        .sc-main-portrait-shell:has(img[src*="mainf"]) .sc-main-portrait {
          object-position: 20% center;
        }
        
        .sc-main-portrait-shell:has(img[src*="mainm2"]) .sc-main-portrait {
          object-position: 30% center;
        }

        /* ── Each bar ── */
        .sc-bar {
          position: relative;
          width: 45vw;
          height: 64px;
          transition: height 0.3s cubic-bezier(0.22,1,0.36,1);
          background: #111;
          cursor: pointer;
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: 0 6px 24px rgba(0,0,0,0.65);
          z-index: 2;
        }

        /* wrapper holds both the red underlay and the bar */
        .sc-bar-outer {
          position: absolute;
          left: 0;
          flex-shrink: 0;
          cursor: pointer;
          transform: translateX(-100%);
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sc-bar-outer:nth-child(1) { 
          top: calc(50vh - 130px);
          z-index: 10003 !important;
        }
        .sc-bar-outer:nth-child(2) { 
          top: calc(50vh - 40px);
          z-index: 10002 !important;
        }
        .sc-bar-outer:nth-child(3) { 
          top: calc(50vh + 50px);
          z-index: 10001 !important;
        }
        .sc-bar-outer.active .sc-bar     { height: 90px; }
        .sc-bar-outer.active .sc-bar-red { height: 90px; opacity: 1; }
        .sc-bar-outer.active .sc-bar-fill  {
          clip-path: polygon(22% 0, 100% 0, calc(100% - 14px) 100%, calc(22% + 138px) 100%);
        }
        .sc-bar-outer.active .sc-bar-shade { opacity: 1; }
        .sc-bar-outer.mounted { transform: translateX(0); }
        .sc-bar-outer:nth-child(1) .sc-bar-outer { transition-delay: 0ms; }
        .sc-bar-outer:nth-child(2) .sc-bar-outer { transition-delay: 80ms; }
        .sc-bar-outer:nth-child(3) .sc-bar-outer { transition-delay: 160ms; }

        /* red underlay — peeks out below the bar when active */
        .sc-bar-red {
          position: absolute;
          top: 0; left: 0;
          width: 45vw;
          height: 64px;
          background: #c4001a;
          clip-path: polygon(50% 0, 100% 0, 100% 100%, calc(50% - 10px) 100%);
          transform: translateY(-7px);
          opacity: 0;
          transition: opacity 0.2s ease, height 0.3s cubic-bezier(0.22,1,0.36,1);
          z-index: 1;
          pointer-events: none;
        }
        .sc-bar-outer.active .sc-bar-red { opacity: 1; }

        /* white fill — skewed parallelogram on the right 25% */
        .sc-bar-fill {
          position: absolute;
          inset: 0;
          width: 100%;
          background: #ffffff;
          clip-path: polygon(100% 0, 100% 0, calc(100% - 32px) 100%, calc(100% - 32px) 100%);
          transition: clip-path 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 1;
          pointer-events: none;
        }
        .sc-bar-outer.active .sc-bar-fill {
          clip-path: polygon(22% 0, 100% 0, calc(100% - 14px) 100%, calc(22% + 138px) 100%);
        }

        /* shade on the left edge of the white fill */
        .sc-bar-shade {
          position: absolute;
          top: 0; bottom: 0;
          left: 73%;
          width: 6%;
          background: linear-gradient(90deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 100%);
          z-index: 2;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .sc-bar-outer.active .sc-bar-shade { opacity: 1; }

        /* bottom shadow line under each bar */
        .sc-bar::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 6px;
          background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%);
          z-index: 10;
          pointer-events: none;
        }

        /* content layout inside each bar */
        .sc-bar-content {
          position: relative;
          z-index: 3;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px 0 20px;
          pointer-events: none;
        }

        /* left: role label */
        .sc-role {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          font-family: 'Anton', sans-serif;
          font-size: 50px;
          letter-spacing: -2px;
          color: #ffffff;
          transform: rotate(-30deg);
          user-select: none;
          line-height: 1;
          padding: 0 16px 0 8px;
        }

        /* left: icon + name centered in remaining space */
        .sc-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          padding-left: 78px;
        }
        .sc-main-top {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .sc-icon {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          width: 32px;
          text-align: center;
          flex-shrink: 0;
          color: rgba(255,255,255,0.15);
          transition: color 0.2s ease;
          user-select: none;
        }
        .sc-bar-outer.active .sc-icon { color: rgba(255,255,255,0.25); }

        .sc-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 4px;
          line-height: 1;
          color: rgba(255,255,255,0.85);
          transition: color 0.2s ease;
          user-select: none;
        }
        .sc-bar-outer.active .sc-label { color: #111111; }

        /* right: stats group */
        .sc-stats {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-right: 24px;
          flex-shrink: 0;
        }

        .sc-stat {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .sc-stat-top {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }

        .sc-stat-tag {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 9px;
          letter-spacing: 1.5px;
          padding: 1px 4px;
          border-width: 1px;
          border-style: solid;
          line-height: 1.4;
          user-select: none;
        }

        .sc-stat-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          font-style: italic;
          line-height: 1;
          color: #ffffff;
          letter-spacing: 1px;
          user-select: none;
          transition: color 0.2s ease;
        }
        .sc-bar-outer.active .sc-stat-num { color: #111111; }

        .sc-stat-bars {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1px;
          margin-top: 2px;
        }
        .sc-stat-bar-color {
          height: 3px;
          width: 100%;
        }
        .sc-stat-bar-black {
          height: 2px;
          width: 100%;
          background: #000;
        }

        /* character portrait */
        .sc-char {
          position: absolute;
          top: 0;
          left: 110px;
          height: 100%;
          width: auto;
          max-width: 160px;
          object-fit: cover;
          object-position: top;
          pointer-events: none;
          z-index: 4;
          clip-path: polygon(20px 0%, 100% 0%, calc(100% - 20px) 100%, 0% 100%);
        }

        /* footer hints */
        .sc-footer {
          position: fixed;
          bottom: 20px; right: 28px;
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 5px;
          font-family: 'Bebas Neue', sans-serif;
          z-index: 15004;
          opacity: 0;
          transition: opacity 0.4s ease 0.6s;
        }
        .sc-footer.mounted { opacity: 1; }
        .sc-footer-row {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; letter-spacing: 2px;
          color: rgba(255,255,255,0.22);
        }
        .sc-footer-key {
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 3px;
          padding: 1px 6px; font-size: 11px;
        }

        .sc-mobile-controls {
          display: none;
        }

        .sc-mobile-btn {
          border: 1px solid rgba(255, 255, 255, 0.28);
          background: rgba(0, 0, 0, 0.6);
          color: #fff;
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 1.2px;
          font-size: 13px;
          padding: 7px 12px;
          border-radius: 8px;
          min-width: 86px;
        }

        @media (max-width: 768px) {
          .sc-bar {
            width: 90vw;
            height: 56px;
          }

          .sc-bar-red {
            width: 90vw;
            height: 56px;
          }

          .sc-bar-outer {
            z-index: 10 !important;
          }

          .sc-bar-outer:nth-child(1) { 
            top: calc(50vh - 180px);
          }
          .sc-bar-outer:nth-child(2) { 
            top: calc(50vh - 90px);
          }
          .sc-bar-outer:nth-child(3) { 
            top: calc(50vh);
          }

          .sc-bar-outer.active .sc-bar {
            height: 70px;
          }

          .sc-bar-outer.active .sc-bar-red {
            height: 70px;
          }

          .sc-role {
            font-size: 32px;
            padding: 0 8px 0 4px;
          }

          .sc-label {
            font-size: 18px;
            letter-spacing: 2px;
          }

          .sc-char {
            left: 60px;
            max-width: 100px;
          }

          .sc-main {
            padding-left: 40px;
          }

          .sc-stats {
            display: none;
          }

          .sc-main-portrait-shell {
            top: 0;
            right: -6vw;
            width: 50vw;
            height: 46vh;
            z-index: 15002 !important;
          }
          
          /* Make mainf portrait overlap more on mobile */
          .sc-main-portrait-shell:has(img[src*="mainf"]) {
            right: -12vw;
            width: 55vw;
          }

          .sc-main-portrait {
            transform: none;
            object-position: center top;
          }

          .sc-reveal-panel {
            top: 42vh !important;
            left: 2vw !important;
            right: 2vw !important;
            width: auto !important;
            height: 52vh !important;
            z-index: 15001 !important;
            transform: translateX(0) rotate(0deg) !important;
            clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
            box-shadow:
              0 0 0 2px rgba(255,255,255,0.24),
              8px 0 0 rgba(215, 13, 44, 0.9),
              14px 0 0 rgba(255,255,255,0.2);
          }

          .sc-reveal-panel.mounted {
            transform: translateX(0) rotate(0deg) !important;
          }

          .sc-reveal-panel::after {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            width: 18px;
            height: 100%;
            background: linear-gradient(180deg, rgba(224,61,49,0.95) 0%, rgba(168,22,43,0.92) 100%);
            clip-path: polygon(20% 0, 100% 0, 100% 100%, 0 100%);
            opacity: 0.95;
            pointer-events: none;
          }

          .sc-reveal-upper-bar {
            top: 8%;
            height: 48%;
            width: 96%;
            left: 2%;
          }

          .sc-reveal-upper-line {
            font-size: 12px;
            line-height: 1.2;
            padding: 0 8px;
          }

          .sc-reveal-lower-bar {
            top: 62%;
            width: 90%;
            bottom: 6%;
            height: auto;
            max-height: none;
            font-size: 13px;
            line-height: 1.3;
            padding: 8px 14px;
          }

          .sc-right-nav {
            top: 2vh;
            left: 4vw;
            transform: translateX(0) rotate(-12deg);
            z-index: 15003 !important;
          }
          
          .sc-right-nav .sc-nav-btn {
            font-size: 60px;
          }

          .sc-mobile-controls {
            position: fixed;
            left: 8px;
            right: 8px;
            bottom: max(8px, env(safe-area-inset-bottom));
            z-index: 28;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
            pointer-events: all;
          }

          .sc-footer {
            display: none;
          }
        }

        @media (min-width: 769px) and (max-width: 1200px) {
          .sc-main-portrait-shell {
            right: -6vw;
            width: 44vw;
            height: 92vh;
          }

          .sc-reveal-panel {
            top: 46vh;
            left: -2vw;
            width: 78vw;
            height: 52vh;
            transform: translateX(0) rotate(-14deg);
          }

          .sc-reveal-panel.mounted {
            transform: translateX(0) rotate(-14deg);
          }
        }
      `}</style>

      <div className="sc-root" role="navigation" style={{ pointerEvents: 'none' }}>
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`sc-bar-outer${active === i && !revealed ? " active" : ""}${mounted ? " mounted" : ""}`}
            style={{ 
              pointerEvents: 'all'
            }}
          >
            <div className="sc-bar-red" />
            <div 
              className="sc-bar"
              onClick={(e) => {
                e.stopPropagation();
                handleBarClick(i);
              }}
              onMouseEnter={() => {
                if (!revealed) {
                  setActive(i);
                }
              }}
              onMouseLeave={() => {
                if (!revealed) {
                  setActive(-1);
                }
              }}
            >
              <img className="sc-char" src={CHARS[i]} alt="" />
              <div className="sc-bar-fill" />
              <div className="sc-bar-shade" />
              <div className="sc-bar-content">
                <div className="sc-role">{ROLES[i].text}</div>
                <div className="sc-main">
                  <div className="sc-main-top">
                    <div className="sc-label">{item.label}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`sc-footer${mounted ? " mounted" : ""}`}>
        <div className="sc-footer-row"><span className="sc-footer-key">↑↓</span><span>SELECT</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">↵</span><span>REVEAL</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">ESC</span><span>BACK</span></div>
      </div>

      <div className="sc-mobile-controls" aria-label="About mobile controls">
        <button className="sc-mobile-btn" type="button" onClick={() => navigate(-1)}>
          BACK
        </button>
        <button className="sc-mobile-btn" type="button" onClick={() => setRevealed((prev) => !prev)}>
          {revealed ? "HIDE" : "REVEAL"}
        </button>
      </div>
    </div>
  );
}