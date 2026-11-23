import { useEffect, useState } from "react";
import { IMPACT_FRAMES } from "../data/impacts";
import "./PageTransition.css";

let hasBooted = false;

/**
 * Persona 3 Reload 3-Cut Sakuga Impact-Frame Transition (Enter-Only).
 * - Zero exit animation when returning to Main Menu (menu video itself provides the return transition).
 * - Skips initial cold boot so landing paints immediately.
 * - Plays 3 razor-sharp GPU-composited anime sakuga cuts (~148ms total) anchored to each character's
 *   exact wallpaper circle origin:
 *     1) Dark Negative Sakuga Hit (0-48ms)
 *     2) Stark White-Out 1-Bit Sakuga Smash (48-100ms)
 *     3) Screen-Blended Energy Afterimage burning directly over the live 60fps video (100-148ms)
 */
export default function PageTransition({ children, variant = "default" }) {
  const entry = IMPACT_FRAMES[variant];
  const bg = entry ? entry.bg : "#051348";
  const [showImpact, setShowImpact] = useState(() => hasBooted && Boolean(entry));

  useEffect(() => {
    hasBooted = true;
    if (!showImpact) return undefined;
    const t = setTimeout(() => setShowImpact(false), 160);
    return () => clearTimeout(t);
  }, [showImpact]);

  return (
    <div className="pt-root" style={{ background: bg }}>
      {showImpact && entry && (
        <>
          <img
            src={entry.f1}
            alt=""
            className="pt-impact-img pt-cut-1"
            style={{ "--pt-origin": entry.origin }}
            decoding="sync"
            fetchPriority="high"
            aria-hidden="true"
          />
          <img
            src={entry.f2}
            alt=""
            className="pt-impact-img pt-cut-2"
            style={{ "--pt-origin": entry.origin }}
            decoding="sync"
            fetchPriority="high"
            aria-hidden="true"
          />
          <img
            src={entry.f1}
            alt=""
            className="pt-impact-img pt-cut-3"
            style={{ "--pt-origin": entry.origin }}
            decoding="sync"
            aria-hidden="true"
          />
        </>
      )}
      {children}
    </div>
  );
}
