import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BgVideo from "../components/BgVideo";
import { STREAMS } from "../data/streams";
import profile from "../data/profile";
import posterResume from "../assets/images/posters/poster-resume.avif";
import mitsuru from "../assets/images/portraits/mitsuru.webp";
import fuuka from "../assets/images/portraits/fuuka.webp";
import aigis from "../assets/images/portraits/aigis.webp";
import akihiko from "../assets/images/portraits/akihiko.webp";
import mitsuruNp from "../assets/images/nameplates/mitsuru.webp";
import fuukaNp from "../assets/images/nameplates/fuuka.webp";
import aigisNp from "../assets/images/nameplates/aigis.webp";
import akihikoNp from "../assets/images/nameplates/akihiko.webp";
import "./ResumePage.css";

const ARCANAS = [
  {
    id: "education",
    roman: "I",
    arcana: "Education",
    subtitle: "Academic Foundation",
    rank: 5,
    portrait: mitsuru,
    nameplate: mitsuruNp,
    portraitTransform: "scale(1.22) translateY(6%)",
    story: profile.resume.educationStory,
    entries: profile.resume.educationEntries,
  },
  {
    id: "skills",
    roman: "II",
    arcana: "Technical Skills",
    subtitle: "Equipped Engineering Stack",
    rank: 5,
    portrait: fuuka,
    nameplate: fuukaNp,
    portraitTransform: "scale(1.12) translateY(8%)",
    story: profile.resume.skillsStory,
    entries: profile.resume.skillsEntries,
  },
  {
    id: "projects",
    roman: "III",
    arcana: "Major Projects",
    subtitle: "Shipped Production Builds",
    rank: 5,
    portrait: aigis,
    nameplate: aigisNp,
    portraitTransform: "scale(1.12) translateY(6%)",
    story: profile.resume.projectsStory,
    entries: profile.resume.projectEntries,
  },
  {
    id: "certifications",
    roman: "IV",
    arcana: "Certifications",
    subtitle: "Training & Coursework",
    rank: 4,
    portrait: akihiko,
    nameplate: akihikoNp,
    portraitTransform: "scale(1.06) translateY(8%)",
    story: profile.resume.certificationsStory,
    entries: profile.resume.certificationsEntries,
  },
];

export default function ResumePage() {
  const navigate = useNavigate();
  const [arcanaIdx, setArcanaIdx] = useState(0);
  const [entryIdx, setEntryIdx] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const current = ARCANAS[arcanaIdx];
  const safeEntry = Math.min(entryIdx, current.entries.length - 1);
  const entry = current.entries[safeEntry];

  const stepArcana = (delta) => {
    setArcanaIdx((prev) => (prev + delta + ARCANAS.length) % ARCANAS.length);
    setEntryIdx(0);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight" || e.key === "Tab") {
        e.preventDefault();
        stepArcana(1);
      } else if (e.key === "ArrowLeft") {
        stepArcana(-1);
      } else if (e.key === "ArrowUp") {
        setEntryIdx((i) => Math.max(0, i - 1));
      } else if (e.key === "ArrowDown") {
        setEntryIdx((i) => Math.min(current.entries.length - 1, i + 1));
      } else if (e.key === "Escape" || e.key === "Backspace") {
        navigate(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current.entries.length, navigate]);

  return (
    <div id="menu-screen" style={{ background: "#1b1e23" }}>
      <BgVideo src={STREAMS.resume} poster={posterResume} />

      <div className="sl-stage">
        <div className="sl-top-bar">
          <div className="sl-watermark">RESUME</div>
          <div className="sl-tab-strip" role="tablist" aria-label="Resume Arcana sections">
            <button type="button" className="sl-lr-btn" onClick={() => stepArcana(-1)} aria-label="Previous section">
              <span className="sl-lr-arrow">◄</span> L
            </button>
            {ARCANAS.map((a, idx) => (
              <button
                key={a.id}
                type="button"
                role="tab"
                aria-selected={arcanaIdx === idx}
                className={`sl-arcana-pill${arcanaIdx === idx ? " active" : ""}`}
                onClick={() => {
                  setArcanaIdx(idx);
                  setEntryIdx(0);
                }}
              >
                {arcanaIdx === idx && <span className="sl-arcana-pill-bg" aria-hidden="true" />}
                <span className="sl-arcana-pill-label">
                  {a.roman} • {a.arcana}
                </span>
              </button>
            ))}
            <button type="button" className="sl-lr-btn" onClick={() => stepArcana(1)} aria-label="Next section">
              R <span className="sl-lr-arrow">►</span>
            </button>
          </div>
        </div>

        <div className={`sl-left${mounted ? " mounted" : ""}`}>
          <div className="sl-hero-row" key={`hero-${current.id}`}>
            <div className="sl-rank-banner">
              <div className="sl-rank-banner-top">
                <img className="sl-rank-top-np" src={current.nameplate} decoding="async" alt="" />
                <span className="sl-rank-top-text">{current.subtitle}</span>
              </div>
              <div className="sl-rank-banner-main">
                <div className="sl-arcana-name">{current.arcana}</div>
                <div className="sl-rank-group">
                  <span className="sl-rank-word">RANK</span>
                  <span className="sl-rank-num">{current.rank}</span>
                </div>
              </div>
              <div className="sl-stars-strip" aria-label={`Rank ${current.rank} of 5`}>
                {[0, 1, 2, 3, 4].map((sIdx) => (
                  <span
                    key={sIdx}
                    className={`sl-star${sIdx >= current.rank ? " dim" : ""}`}
                    style={{ animationDelay: `${sIdx * 45}ms` }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <div className="sl-tarot-card" aria-hidden="true">
              <div className="sl-tarot-top">
                <span className="sl-tarot-roman">{current.roman}</span>
                <span className="sl-tarot-tag">ARCANA</span>
              </div>
              <img
                className="sl-tarot-portrait"
                src={current.portrait}
                decoding="async"
                alt=""
                style={{ transform: current.portraitTransform }}
              />
            </div>
          </div>

          <div className="sl-story">{current.story}</div>

          <div className="sl-sublist-wrap" key={`list-${current.id}`}>
            <div className="sl-sublist-label">LIST ({current.entries.length})</div>
            {current.entries.map((item, idx) => (
              <div
                key={item.label}
                className={`sl-row-outer${safeEntry === idx ? " active" : ""}`}
              >
                <div className="sl-row-slash" aria-hidden="true" />
                <button
                  type="button"
                  className="sl-sublist-btn"
                  onMouseEnter={() => setEntryIdx(idx)}
                  onFocus={() => setEntryIdx(idx)}
                  onClick={() => setEntryIdx(idx)}
                >
                  <span className="sl-row-fill" aria-hidden="true" />
                  <div className="sl-row-inner">
                    <span className="sl-row-left">
                      <span className="sl-row-tri" aria-hidden="true">▶</span>
                      <span className="sl-row-title">{item.label}</span>
                    </span>
                    <span className="sl-sublist-meta">{item.meta}</span>
                  </div>
                </button>
              </div>
            ))}
          </div>

          <div className="sl-dossier-ribbon" key={`dossier-${current.id}-${safeEntry}`}>
            <div className="sl-dossier-kicker">{entry.meta}</div>
            <div className="sl-dossier-title">{entry.headline}</div>
            <div className="sl-dossier-text">{entry.detail}</div>
          </div>
        </div>
      </div>

      <div className="sl-footer">
        <div className="sl-footer-row"><span className="sl-footer-key">←→</span><span>ARCANA</span></div>
        <div className="sl-footer-row"><span className="sl-footer-key">↑↓</span><span>INSPECT</span></div>
        <div className="sl-footer-row"><span className="sl-footer-key">ESC</span><span>BACK</span></div>
      </div>

      <div className="sl-mobile-controls" aria-label="Resume mobile controls">
        <button className="sl-mobile-btn" type="button" onClick={() => navigate(-1)}>
          BACK
        </button>
        <button className="sl-mobile-btn" type="button" onClick={() => stepArcana(1)}>
          NEXT ARCANA
        </button>
      </div>
    </div>
  );
}
