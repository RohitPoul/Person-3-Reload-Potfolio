import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BgVideo from "../components/BgVideo";
import char1 from "../assets/images/bars/bar-leader.webp";
import char2 from "../assets/images/bars/bar-party-1.webp";
import char3 from "../assets/images/bars/bar-party-2.webp";
import { STREAMS } from "../data/streams";
import profile from "../data/profile";
import posterStatus from "../assets/images/posters/poster-status.avif";
import makoto from "../assets/images/portraits/makoto.webp";
import junpei from "../assets/images/portraits/junpei.webp";
import yukari from "../assets/images/portraits/yukari.webp";
import "./AboutMe.css";

const CHARS = [char1, char2, char3];
const MAIN_IMAGES = [makoto, junpei, yukari];

const ROLES = [
  { text: "LEADER", stamp: "LEADER", stampBg: "#c4001a" },
  { text: "SUPPORT", stamp: "STACK", stampBg: "#0a5bd4" },
  { text: "ATTACK", stamp: "FOCUS", stampBg: "#c4001a" },
];

const ITEMS = [
  { id: "about", label: "STATUS", sub: "CHARACTER PROFILE" },
  { id: "skills", label: "SKILLS & STACK", sub: "EQUIPPED ABILITIES" },
  { id: "specializations", label: "SPECIALIZATIONS", sub: "CORE DOMAINS" },
];

const EQUIPPED_SKILLS = profile.about.equippedSkills;
const STAT_GAUGES = profile.about.statGauges;
const SPECIALIZATIONS = profile.about.specializations;

export default function AboutMe() {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [activeSkill, setActiveSkill] = useState(0);
  const [activePillar, setActivePillar] = useState(0);
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

  const stepTab = (delta) => {
    setActive((prev) => {
      const cur = prev < 0 ? 0 : prev;
      return (cur + delta + ITEMS.length) % ITEMS.length;
    });
  };

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (revealed) {
        if (e.key === "ArrowRight" || e.key === "Tab") {
          e.preventDefault();
          stepTab(1);
        } else if (e.key === "ArrowLeft") {
          stepTab(-1);
        } else if (e.key === "Escape" || e.key === "Backspace") {
          setRevealed(false);
        }
        return;
      }

      if (e.key === "ArrowUp") setActive((i) => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive((i) => Math.min(ITEMS.length - 1, i + 1));
      if (e.key === "Enter" || e.key === "ArrowRight") setRevealed(true);
      if (e.key === "ArrowLeft" || e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, revealed]);

  const currentSkill = EQUIPPED_SKILLS[activeSkill];
  const currentSpec = SPECIALIZATIONS[activePillar];

  return (
    <div id="menu-screen" style={{ background: "#062536" }}>
      <BgVideo src={STREAMS.about} poster={posterStatus} />

      {!revealed && (
        <div className="sc-page-title" aria-hidden="true">ABOUT ME</div>
      )}

      {revealed && (
        <>
          <div
            className="sc-dim"
            onClick={(e) => {
              e.stopPropagation();
              setRevealed(false);
            }}
          />

          {/* Top-left clickable < L • • • R > tab switcher */}
          <div className="p3-status-nav" role="tablist" aria-label="Character status views">
            <button
              type="button"
              className="p3-status-nav-btn"
              onClick={() => stepTab(-1)}
              aria-label="Previous tab"
            >
              <span className="p3-status-arrow left">◄</span>
              <span>LB</span>
            </button>

            <div className="p3-status-dots">
              {ITEMS.map((it, idx) => (
                <button
                  key={it.id}
                  type="button"
                  role="tab"
                  aria-selected={selectedIndex === idx}
                  aria-label={it.label}
                  className={`p3-status-dot${selectedIndex === idx ? " active" : ""}`}
                  onClick={() => setActive(idx)}
                />
              ))}
            </div>

            <button
              type="button"
              className="p3-status-nav-btn"
              onClick={() => stepTab(1)}
              aria-label="Next tab"
            >
              <span>RB</span>
              <span className="p3-status-arrow right">►</span>
            </button>

            <span className="p3-status-tab-tag">{ITEMS[selectedIndex].label}</span>
          </div>

          {/* Right character portrait + P3R role stamp */}
          <div className="sc-main-portrait-shell" key={`portrait-${selectedIndex}`}>
            <img className="sc-main-portrait" src={MAIN_IMAGES[selectedIndex]} decoding="async" alt="" />
          </div>
          <div
            key={`stamp-${selectedIndex}`}
            className="p3-role-stamp"
            style={{ background: ROLES[selectedIndex].stampBg }}
          >
            {ROLES[selectedIndex].stamp}
          </div>

          {/* Left-center Character Sheet Stage */}
          <div className="p3-reveal-stage" key={`stage-${selectedIndex}`}>
            {selectedIndex === 0 && (
              <div className="p3-char-sheet">
                <div className="p3-char-top-strip">
                  <div className="p3-char-lv-block">
                    <span className="p3-char-lv-label">LV</span>
                    <span className="p3-char-lv-num">{profile.about.level}</span>
                  </div>
                  <div className="p3-char-identity">
                    <div className="p3-char-name">{profile.about.name}</div>
                    <div className="p3-char-title">{profile.about.title}</div>
                  </div>
                  <div className="p3-char-hp-sp">
                    <div className="p3-mini-meter">
                      <div className="p3-mini-meter-top">
                        <span>{profile.about.meters[0].label}</span>
                        <span>{profile.about.meters[0].value}</span>
                      </div>
                      <div className="p3-mini-meter-bar">
                        <div className="p3-mini-meter-fill" style={{ width: `${profile.about.meters[0].value}%` }} />
                      </div>
                    </div>
                    <div className="p3-mini-meter">
                      <div className="p3-mini-meter-top">
                        <span>{profile.about.meters[1].label}</span>
                        <span>{profile.about.meters[1].value}</span>
                      </div>
                      <div className="p3-mini-meter-bar">
                        <div className="p3-mini-meter-fill sp" style={{ width: `${profile.about.meters[1].value}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p3-char-white-band">
                  <div className="p3-char-arcana-row">
                    <div className="p3-char-arcana">{profile.about.degree}</div>
                    <span className="p3-char-status-pill">{profile.about.statusPill}</span>
                  </div>
                  <div className="p3-char-meta-grid">
                    <div className="p3-char-meta-item">
                      <span className="p3-char-meta-label">{profile.about.instituteLabel}</span>
                      <span className="p3-char-meta-val">{profile.about.institute}</span>
                    </div>
                    <div className="p3-char-meta-item">
                      <span className="p3-char-meta-label">FOCUS</span>
                      <span className="p3-char-meta-val">{profile.about.focus}</span>
                    </div>
                    <div className="p3-char-meta-item">
                      <span className="p3-char-meta-label">EXPERIENCE</span>
                      <span className="p3-char-meta-val">{profile.about.experience}</span>
                    </div>
                  </div>
                </div>

                <div className="p3-char-bio-bar">
                  {profile.about.bio}
                </div>
              </div>
            )}

            {selectedIndex === 1 && (
              <div className="p3-char-sheet">
                <div className="p3-char-top-strip">
                  <div className="p3-char-lv-block">
                    <span className="p3-char-lv-label">SKL</span>
                    <span className="p3-char-lv-num">08</span>
                  </div>
                  <div className="p3-char-identity">
                    <div className="p3-char-name">SKILLS & STACK</div>
                    <div className="p3-char-title">EQUIPPED ABILITIES • HOVER TO INSPECT</div>
                  </div>
                </div>

                <div className="p3-char-white-band">
                  <div className="p3-white-skill-grid">
                    {EQUIPPED_SKILLS.map((skill, idx) => (
                      <button
                        key={skill.name}
                        type="button"
                        className={`p3-white-skill-chip${activeSkill === idx ? " active" : ""}`}
                        onMouseEnter={() => setActiveSkill(idx)}
                        onFocus={() => setActiveSkill(idx)}
                        onClick={() => setActiveSkill(idx)}
                      >
                        <span className="p3-white-skill-tag" style={{ background: skill.color }}>
                          {skill.tag}
                        </span>
                        <span className="p3-white-skill-name">{skill.name}</span>
                      </button>
                    ))}
                  </div>

                  <div className="p3-white-gauges">
                    {STAT_GAUGES.map((stat) => (
                      <div className="p3-white-gauge-item" key={stat.code} title={stat.label}>
                        <div className="p3-white-gauge-top">
                          <span className="p3-white-gauge-code">{stat.code}</span>
                          <span className="p3-white-gauge-val">{stat.value}</span>
                        </div>
                        <div className="p3-white-gauge-track">
                          <div className="p3-white-gauge-fill" style={{ width: `${stat.value}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p3-char-bio-bar">
                  <strong>{currentSkill.name}</strong>
                  {currentSkill.desc}
                </div>
              </div>
            )}

            {selectedIndex === 2 && (
              <div className="p3-char-sheet">
                <div className="p3-char-top-strip">
                  <div className="p3-char-lv-block">
                    <span className="p3-char-lv-label">DOM</span>
                    <span className="p3-char-lv-num">03</span>
                  </div>
                  <div className="p3-char-identity">
                    <div className="p3-char-name">SPECIALIZATIONS</div>
                    <div className="p3-char-title">CORE ENGINEERING DOMAINS</div>
                  </div>
                </div>

                <div className="p3-char-white-band">
                  <div className="p3-white-spec-list">
                    {SPECIALIZATIONS.map((spec, idx) => (
                      <button
                        key={spec.index}
                        type="button"
                        className={`p3-white-spec-row${activePillar === idx ? " active" : ""}`}
                        onMouseEnter={() => setActivePillar(idx)}
                        onFocus={() => setActivePillar(idx)}
                        onClick={() => setActivePillar(idx)}
                      >
                        <span className="p3-white-spec-idx">{spec.index}</span>
                        <span className="p3-white-spec-title">{spec.title}</span>
                        <span className="p3-white-spec-tag">{spec.tag}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p3-char-bio-bar">
                  <strong>{currentSpec.stack}</strong>
                  — {currentSpec.summary}
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Left 3 Party/Status Bars */}
      <div className={`sc-root${revealed ? " hidden" : ""}`} role="navigation" style={{ pointerEvents: "none" }}>
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`sc-bar-outer${active === i && !revealed ? " active" : ""}${mounted ? " mounted" : ""}`}
            style={{ pointerEvents: revealed ? "none" : "all" }}
          >
            <div className="sc-bar-red" />
            <div
              className="sc-bar"
              onClick={(e) => {
                e.stopPropagation();
                handleBarClick(i);
              }}
              onMouseEnter={() => {
                if (!revealed) setActive(i);
              }}
            >
              <img className="sc-char" src={CHARS[i]} decoding="async" alt="" />
              <div className="sc-bar-fill" />
              <div className="sc-bar-shade" />
              <div className="sc-bar-content">
                <div className="sc-role">{ROLES[i].text}</div>
                <div className="sc-main">
                  <div className="sc-label">{item.label}</div>
                  <div className="sc-sub">{item.sub}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom-right P3R HUD Keycaps */}
      <div className={`sc-footer${mounted ? " mounted" : ""}`}>
        {revealed ? (
          <>
            <div className="sc-footer-row"><span className="sc-footer-key">←→</span><span>SWITCH VIEW</span></div>
            <div className="sc-footer-row"><span className="sc-footer-key">ESC</span><span>CLOSE</span></div>
          </>
        ) : (
          <>
            <div className="sc-footer-row"><span className="sc-footer-key">↑↓</span><span>SELECT</span></div>
            <div className="sc-footer-row"><span className="sc-footer-key">↵</span><span>INSPECT</span></div>
            <div className="sc-footer-row"><span className="sc-footer-key">ESC</span><span>BACK</span></div>
          </>
        )}
      </div>

      <div className="sc-mobile-controls" aria-label="About mobile controls">
        <button
          className="sc-mobile-btn"
          type="button"
          onClick={() => (revealed ? setRevealed(false) : navigate(-1))}
        >
          {revealed ? "CLOSE" : "BACK"}
        </button>
        <button
          className="sc-mobile-btn"
          type="button"
          onClick={() => (revealed ? stepTab(1) : setRevealed(true))}
        >
          {revealed ? "NEXT VIEW" : "INSPECT"}
        </button>
      </div>
    </div>
  );
}
