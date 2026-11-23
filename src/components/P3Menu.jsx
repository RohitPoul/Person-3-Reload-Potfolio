import { useState, useEffect } from "react";
import profile from "../data/profile";
import "./P3Menu.css";

const ITEMS = [
  { id: "about", label: "ABOUT ME", page: "about", fontSize: 80, offsetX: 0, offsetY: 0, skew: -6, skewY: 10 },
  { id: "resume", label: "RESUME", page: "resume", fontSize: 66, offsetX: 20, offsetY: 8, skew: -11, skewY: -10 },
  { id: "github", label: "GITHUB", page: "github", fontSize: 68, offsetX: 8, offsetY: 6, skew: 0, skewY: -4 },
  { id: "sideproj", label: "PROJECTS", page: "sideproj", fontSize: 70, offsetX: 16, offsetY: 8, skew: -3, skewY: 5 },
  { id: "socials", label: "SOCIALS", page: "socials", fontSize: 68, offsetX: 10, offsetY: 6, skew: -4, skewY: 7 },
];

const CLIP_POLY = (w, h) => `polygon(0px 0px, ${w}px ${h * 0.5}px, 0px ${h}px)`;

export default function P3Menu({ onNavigate, onPrefetch }) {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const activate = (idx) => {
    setActive(idx);
    onPrefetch?.(ITEMS[idx]?.page);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") setActive((i) => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive((i) => Math.min(ITEMS.length - 1, i + 1));
      if (e.key === "Enter") onNavigate?.(ITEMS[active].page);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, onNavigate]);

  return (
    <div className="p3-overlay">
      <div className="p3-name-tag">
        <span>{profile.menuTag.line1}</span>
        <span>{profile.menuTag.line2}</span>
      </div>

      <nav className="p3-menu">
        {ITEMS.map((item, i) => {
          const isActive = active === i;
          const dist = Math.abs(i - active);
          const opacity = isActive ? 1 : Math.max(0.5, 1 - dist * 0.2);
          const estW = item.label.length * item.fontSize * 0.6 + 80;
          const estH = item.fontSize * 0.94;
          const clip = CLIP_POLY(estW, estH);

          return (
            <a
              key={item.id}
              href="#"
              className={`p3-row${isActive ? " active" : ""}`}
              style={{
                marginRight: item.offsetX,
                marginTop: item.offsetY,
              }}
              onClick={(e) => {
                e.preventDefault();
                onNavigate?.(item.page);
              }}
              onPointerEnter={() => activate(i)}
              onFocus={() => activate(i)}
              aria-current={isActive ? "page" : undefined}
            >
              <div
                className="p3-skew-wrap"
                style={{ transform: `skewX(${item.skew}deg) skewY(${item.skewY}deg)` }}
              >
                <div
                  className="p3-shadow-tri"
                  style={{ width: estW, height: estH, clipPath: clip }}
                  aria-hidden="true"
                />
                <div
                  className="p3-highlight"
                  style={{
                    width: estW,
                    height: estH,
                    clipPath: clip,
                    transform: `translateY(-50%) scaleX(${isActive ? 1 : 0})`,
                  }}
                  aria-hidden="true"
                />
                <div className="p3-label-wrap" style={{ opacity }}>
                  <span className="p3-label-base p3-label-dark" style={{ fontSize: item.fontSize }}>
                    {item.label}
                  </span>
                  <span
                    className="p3-label-base p3-label-bright"
                    style={{ fontSize: item.fontSize, clipPath: clip }}
                    aria-hidden="true"
                  >
                    {item.label}
                  </span>
                </div>
              </div>
            </a>
          );
        })}
      </nav>

      <div className="p3-hint">
        {isMobile ? (
          <div className="p3-hint-row"><span>TAP TO SELECT</span></div>
        ) : (
          <>
            <div className="p3-hint-row"><span className="p3-hint-key">↑↓</span><span>NAVIGATE</span></div>
            <div className="p3-hint-row"><span className="p3-hint-key">↵</span><span>CONFIRM</span></div>
          </>
        )}
      </div>
    </div>
  );
}
