import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BgVideo from "../components/BgVideo";
import { STREAMS } from "../data/streams";
import profile from "../data/profile";
import posterProjects from "../assets/images/posters/poster-projects.avif";
import fuukaNp from "../assets/images/nameplates/fuuka.webp";
import makotoNp from "../assets/images/nameplates/makoto.webp";
import "./SideProjPage.css";

const TABS = [
  { id: "all", label: "ALL REQUESTS" },
  { id: "ai", label: "AI / ML" },
  { id: "fullstack", label: "FULL-STACK" },
];

const QUEST_NAMEPLATES = [fuukaNp, makotoNp];
const QUESTS = profile.projects.map((p, idx) => ({
  ...p,
  nameplate: QUEST_NAMEPLATES[idx % QUEST_NAMEPLATES.length],
}));

export default function SideProjPage() {
  const navigate = useNavigate();
  const [tabIdx, setTabIdx] = useState(0);
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);

  const currentTab = TABS[tabIdx];
  const filtered =
    currentTab.id === "all"
      ? QUESTS
      : QUESTS.filter((q) => q.category === currentTab.id);

  const safeActive = Math.min(active, Math.max(0, filtered.length - 1));
  const selected = filtered[safeActive] || QUESTS[0];

  const switchTab = (nextIdx) => {
    setTabIdx((nextIdx + TABS.length) % TABS.length);
    setActive(0);
  };

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") setActive((i) => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive((i) => Math.min(filtered.length - 1, i + 1));
      if (e.key === "ArrowRight") switchTab(tabIdx + 1);
      if (e.key === "ArrowLeft") switchTab(tabIdx - 1);
      if (e.key === "Enter" && selected?.url) window.open(selected.url, "_blank");
      if (e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [filtered.length, navigate, selected, tabIdx]);

  return (
    <div id="menu-screen" style={{ background: "#18121c" }}>
      <BgVideo src={STREAMS.projects} poster={posterProjects} />

      <div className="qst-overlay">
        <div className="qst-page-title" aria-hidden="true">PROJECTS</div>
        <div className={`qst-board${mounted ? " mounted" : ""}`}>
          <div className="qst-header">
            <div className="qst-watermark">QUEST BOARD</div>

            <div className="qst-tabs" role="tablist" aria-label="Filter projects">
              <span className="qst-tab-key" aria-hidden="true">
                <span className="qst-tab-arrow">◄</span> L
              </span>
              {TABS.map((tab, idx) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={tabIdx === idx}
                  className={`qst-tab-btn${tabIdx === idx ? " active" : ""}`}
                  onClick={() => switchTab(idx)}
                >
                  {tabIdx === idx && <span className="qst-tab-bg" aria-hidden="true" />}
                  <span className="qst-tab-label">{tab.label}</span>
                </button>
              ))}
              <span className="qst-tab-key" aria-hidden="true">
                R <span className="qst-tab-arrow">►</span>
              </span>
            </div>
          </div>

          <div className="qst-cols" aria-hidden="true">
            <span>Agent</span>
            <span>Build / Request</span>
            <span>Year</span>
            <span>Status</span>
          </div>

          <div className="qst-list" key={`qlist-${currentTab.id}`}>
            {filtered.map((quest, idx) => (
              <div
                key={quest.id}
                className={`qst-row-outer${safeActive === idx ? " active" : ""}`}
              >
                <div className="qst-row-slash" aria-hidden="true" />
                <button
                  type="button"
                  className="qst-row"
                  onMouseEnter={() => setActive(idx)}
                  onFocus={() => setActive(idx)}
                  onClick={() => setActive(idx)}
                >
                  <img className="qst-row-np" src={quest.nameplate} decoding="async" alt="" />
                  <span className="qst-row-fill" aria-hidden="true" />
                  <div className="qst-row-content">
                    <span className="qst-row-code">{quest.code}</span>
                    <span className="qst-row-title">{quest.title}</span>
                    <span className="qst-row-year">{quest.year}</span>
                    <span className="qst-row-status">✓ {quest.status}</span>
                  </div>
                </button>
              </div>
            ))}
          </div>

          <div className="qst-task-box" key={selected.id}>
            <div className="qst-task-top">
              <span className="qst-task-label">TASK BRIEF — #{selected.code}</span>
            </div>
            <div className="qst-task-desc">{selected.summary}</div>
            <div className="qst-task-bottom">
              <div className="qst-tags">
                {selected.tags.map((tag) => (
                  <span className="qst-tag" key={tag}>{tag}</span>
                ))}
              </div>
              <button
                type="button"
                className="qst-open-btn"
                onClick={() => window.open(selected.url, "_blank")}
              >
                <span className="qst-open-btn-wipe" aria-hidden="true" />
                <span className="qst-open-btn-label">OPEN ON GITHUB →</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`qst-footer${mounted ? " mounted" : ""}`}>
        <div className="qst-footer-row"><span className="qst-footer-key">↑↓</span><span>SELECT</span></div>
        <div className="qst-footer-row"><span className="qst-footer-key">←→</span><span>FILTER</span></div>
        <div className="qst-footer-row"><span className="qst-footer-key">↵</span><span>OPEN REPO</span></div>
        <div className="qst-footer-row"><span className="qst-footer-key">ESC</span><span>BACK</span></div>
      </div>

      <div className="qst-mobile-controls" aria-label="Projects mobile controls">
        <button className="qst-mobile-btn" type="button" onClick={() => navigate(-1)}>
          BACK
        </button>
        <button
          className="qst-mobile-btn"
          type="button"
          onClick={() => window.open(selected.url, "_blank")}
        >
          OPEN REPO
        </button>
      </div>
    </div>
  );
}
