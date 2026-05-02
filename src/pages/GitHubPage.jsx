import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgVideo from "../assets/videos/main1.mp4";

const PROFILE = {
  name: "ROHIT POUL",
  role: "AI/ML ENGINEER & FULL-STACK DEVELOPER",
  bio: [
    "PASSIONATE ABOUT CREATING SOFTWARE THAT MAKES A DIFFERENCE",
    "EXPLORING AI/ML AND REAL-TIME APPLICATIONS",
    "OPEN SOURCE CONTRIBUTOR",
    "LOOKING TO COLLABORATE ON INNOVATIVE PROJECTS",
  ],
  stack: ["PYTHON", "C++", "JAVASCRIPT", "PYTORCH", "TENSORFLOW", "ELECTRON", "HTML5", "CSS3"],
  statsImg: "https://github-readme-stats.vercel.app/api?username=RohitPoul&show_icons=true&theme=dark&locale=en",
  streakImg: "https://github-readme-streak-stats.herokuapp.com/?user=RohitPoul&theme=dark",
  github: "https://github.com/RohitPoul",
};

const ITEMS = [
  {
    id: "profile",
    badge: "★",
    title: "MY PROFILE",
    subtitle: "GitHub • Overview",
    lang: "GH",
    isProfile: true,
  },
  {
    id: "sticker",
    badge: "01",
    title: "TELEGRAM STICKER MAKER",
    subtitle: "Python • Automation / Bot",
    lang: "PY",
    description:
      "Automated Telegram sticker maker and uploader. Processes images, converts them to sticker-compatible format, and uploads them directly to a Telegram sticker pack with zero manual steps.",
    tags: ["PYTHON", "TELEGRAM API", "AUTOMATION", "IMAGE PROCESSING"],
    url: "https://github.com/RohitPoul/Telegram-Sticker-Maker-And-Auto-Uploader",
    repoName: "Telegram-Sticker-Maker-And-Auto-Uploader",
  },
  {
    id: "bgremover",
    badge: "02",
    title: "BACKGROUND REMOVER AI",
    subtitle: "Python • AI / Computer Vision",
    lang: "AI",
    description:
      "AI-powered background removal tool using deep learning models. Delivers clean, precise foreground extraction from images — fast and fully local, no cloud dependency.",
    tags: ["PYTHON", "AI / ML", "COMPUTER VISION", "OPENCV", "DEEP LEARNING"],
    url: "https://github.com/RohitPoul/Background-Remover-Ai",
    repoName: "Background-Remover-Ai",
  },
];

export default function GitHubPage() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [statsLoaded, setStatsLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp")   setActive((i) => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive((i) => Math.min(ITEMS.length - 1, i + 1));
      if (e.key === "Enter") {
        const item = ITEMS[active];
        if (!item.isProfile && item.url) window.open(item.url, "_blank");
        else if (item.isProfile) window.open(PROFILE.github, "_blank");
      }
      if (e.key === "ArrowLeft")  navigate(-1);
      if (e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, navigate]);

  const item = ITEMS[active];

  return (
    <div id="menu-screen">
      <video src={bgVideo} autoPlay loop muted playsInline />

      {/* Entry reveal mask */}
      <div className="gh-entry-mask" aria-hidden="true">
        <video className="gh-entry-video" src={bgVideo} autoPlay loop muted playsInline />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap');

        /* ── Entry animation ── */
        .gh-entry-mask {
          position: absolute;
          inset: 0;
          z-index: 9;
          overflow: hidden;
          background: #0a1445;
          clip-path: circle(0 at 50% 50%);
          animation: gh-entry-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          pointer-events: none;
        }
        .gh-entry-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        @keyframes gh-entry-reveal {
          from { clip-path: circle(0 at 50% 50%); }
          to   { clip-path: circle(150vmax at 50% 50%); }
        }

        /* ── Overlay ── */
        .gh-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
        }

        /* ── Left stack ── */
        .gh-stack {
          position: absolute;
          top: 9vh;
          left: 2.8vw;
          width: min(47vw, 680px);
          display: flex;
          flex-direction: column;
          gap: 8px;
          pointer-events: none;
          transform: scale(0.9);
          transform-origin: top left;
        }

        .gh-list-tag {
          font-family: 'Anton', sans-serif;
          font-size: 86px;
          line-height: 0.9;
          color: #f6fbff;
          letter-spacing: 2px;
          margin: 0 0 4px 12px;
          text-shadow: 0 2px 0 rgba(0,0,0,0.18);
          opacity: 0;
          transform: translateX(-24px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .gh-list-tag.mounted { opacity: 1; transform: translateX(0); }

        /* ── Cards ── */
        .gh-card-wrap {
          position: relative;
          opacity: 0;
          transform: translateX(-48px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: all;
          cursor: pointer;
        }
        .gh-card-wrap.mounted { opacity: 1; transform: translateX(0); }

        /* Profile card (special teal border) */
        .gh-card {
          position: relative;
          height: 88px;
          background: #10185f;
          clip-path: polygon(0 0, 97% 0, 100% 100%, 3% 100%);
          box-shadow: 0 8px 0 rgba(5,13,59,0.85);
          transition: transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
          overflow: visible;
        }
        .gh-card-wrap.active .gh-card {
          background: #ffffff;
          box-shadow: 10px 8px 0 #0a77d4;
          transform: translateX(6px);
        }
        .gh-card-wrap.profile .gh-card {
          background: #091240;
          border-left: 3px solid #9cf7ff;
        }
        .gh-card-wrap.profile.active .gh-card {
          background: #ffffff;
          box-shadow: 10px 8px 0 #0a77d4;
          border-left: none;
        }

        .gh-card-inner {
          position: absolute;
          inset: 0;
          padding: 10px 22px 10px 62px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .gh-badge {
          position: absolute;
          top: 8px;
          left: -10px;
          width: 56px;
          height: 62px;
          background: #0b113d;
          border: 3px solid #9cf7ff;
          clip-path: polygon(14% 0, 100% 0, 84% 100%, 0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(-8deg);
          box-shadow: 0 4px 0 rgba(0,0,0,0.28);
          transition: background 0.22s ease, border-color 0.22s ease;
        }
        .gh-badge-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          color: #d2fdff;
          letter-spacing: 1px;
          transform: rotate(8deg);
        }
        .gh-card-wrap.active .gh-badge { background: #000; border-color: #000; }
        .gh-card-wrap.active .gh-badge-text { color: #fff; }

        .gh-title {
          font-family: 'Anton', sans-serif;
          font-size: 38px;
          line-height: 0.9;
          letter-spacing: 1px;
          color: #a5f6ff;
          transition: color 0.22s ease;
        }
        .gh-card-wrap.active .gh-title { color: #000; }
        .gh-card-wrap.profile .gh-title { color: #d2fdff; font-size: 32px; }
        .gh-card-wrap.profile.active .gh-title { color: #000; }

        .gh-lang-badge {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px;
          letter-spacing: 2px;
          padding: 4px 10px;
          background: rgba(133, 244, 255, 0.15);
          border: 1px solid rgba(133, 244, 255, 0.3);
          color: #a5f6ff;
          align-self: flex-end;
          clip-path: polygon(8% 0, 100% 0, 92% 100%, 0 100%);
          transition: background 0.22s ease, color 0.22s ease, border-color 0.22s ease;
        }
        .gh-card-wrap.active .gh-lang-badge {
          background: rgba(10, 119, 212, 0.15);
          border-color: #0a77d4;
          color: #0a77d4;
        }

        .gh-subtitle-bar {
          position: absolute;
          bottom: 0;
          left: 48px;
          right: 14px;
          height: 26px;
          background: rgba(0,0,0,0.28);
          display: flex;
          align-items: center;
          padding: 0 12px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
        }
        .gh-subtitle {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 16px;
          letter-spacing: 1.5px;
          color: rgba(200, 240, 255, 0.7);
          white-space: nowrap;
        }
        .gh-card-wrap.active .gh-subtitle-bar { background: rgba(10, 119, 212, 0.18); }
        .gh-card-wrap.active .gh-subtitle { color: rgba(0,0,0,0.55); }

        /* ── Right detail panel ── */
        .gh-detail-panel {
          position: absolute;
          top: 9vh;
          right: 2.8vw;
          width: min(44vw, 560px);
          bottom: 9vh;
          background: rgba(6, 12, 48, 0.92);
          border: 1px solid rgba(140, 239, 255, 0.16);
          box-shadow: 0 0 0 1px rgba(140,239,255,0.06), 8px 8px 0 rgba(10,119,212,0.3);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: opacity 0.3s ease;
          pointer-events: all;
        }

        /* Profile detail */
        .gh-profile-detail {
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow-y: auto;
          overflow-x: hidden;
          scrollbar-width: thin;
          scrollbar-color: rgba(140,239,255,0.2) transparent;
        }

        .gh-profile-header {
          padding: 20px 20px 14px;
          background: linear-gradient(135deg, rgba(10,119,212,0.18) 0%, rgba(0,246,255,0.06) 100%);
          border-bottom: 1px solid rgba(140,239,255,0.12);
        }
        .gh-profile-name {
          font-family: 'Anton', sans-serif;
          font-size: 42px;
          color: #d2fdff;
          letter-spacing: 2px;
          line-height: 1;
        }
        .gh-profile-role {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 17px;
          letter-spacing: 2px;
          color: #9cf7ff;
          margin-top: 4px;
          opacity: 0.9;
        }

        .gh-profile-bio {
          padding: 14px 20px;
          border-bottom: 1px solid rgba(140,239,255,0.08);
        }
        .gh-profile-bio-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 16px;
          letter-spacing: 2px;
          color: #9cf7ff;
          margin-bottom: 8px;
          opacity: 0.7;
        }
        .gh-profile-bio-item {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 15px;
          letter-spacing: 1.2px;
          color: rgba(200,240,255,0.82);
          line-height: 1.7;
          padding-left: 12px;
          border-left: 2px solid rgba(156, 247, 255, 0.3);
          margin-bottom: 4px;
        }
        .gh-profile-bio-item::before { content: "◆ "; font-size: 10px; opacity: 0.6; }

        .gh-profile-stack {
          padding: 14px 20px;
          border-bottom: 1px solid rgba(140,239,255,0.08);
        }
        .gh-profile-stack-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 16px;
          letter-spacing: 2px;
          color: #9cf7ff;
          margin-bottom: 10px;
          opacity: 0.7;
        }
        .gh-stack-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .gh-stack-tag {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 15px;
          letter-spacing: 1.5px;
          color: #06133b;
          background: #8df6ff;
          padding: 4px 10px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 6px) 100%, 0 100%);
        }

        .gh-profile-stats {
          padding: 14px 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .gh-profile-stats-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 16px;
          letter-spacing: 2px;
          color: #9cf7ff;
          margin-bottom: 4px;
          opacity: 0.7;
        }
        .gh-stats-img-wrap {
          display: flex;
          flex-direction: column;
          gap: 8px;
          opacity: 0;
          transition: opacity 0.4s ease 0.3s;
        }
        .gh-stats-img-wrap.loaded { opacity: 1; }
        .gh-stats-img {
          width: 100%;
          border-radius: 4px;
          display: block;
          filter: brightness(0.92);
        }

        .gh-profile-btn-row {
          padding: 14px 20px 18px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .gh-visit-btn {
          font-family: 'Anton', sans-serif;
          font-size: 18px;
          letter-spacing: 2px;
          color: #08153f;
          background: linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%);
          border: none;
          padding: 10px 22px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          cursor: pointer;
          pointer-events: all;
          transition: opacity 0.2s ease;
        }
        .gh-visit-btn:hover { opacity: 0.82; }

        /* Project detail */
        .gh-proj-detail {
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(140,239,255,0.2) transparent;
        }
        .gh-detail-top {
          display: grid;
          grid-template-columns: 52px 1fr auto;
          align-items: center;
          min-height: 72px;
          padding: 0 18px;
          gap: 12px;
          background: rgba(10,119,212,0.14);
          border-bottom: 1px solid rgba(140,239,255,0.14);
        }
        .gh-detail-top-index {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 36px;
          color: #9cf7ff;
          opacity: 0.6;
        }
        .gh-detail-top-title {
          font-family: 'Anton', sans-serif;
          font-size: 26px;
          letter-spacing: 1px;
          color: #d2fdff;
          line-height: 1.1;
        }
        .gh-detail-top-lang {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 30px;
          letter-spacing: 2px;
          color: #9cf7ff;
          opacity: 0.55;
        }

        .gh-detail-desc {
          position: relative;
          margin: 18px 18px 0;
          padding: 14px 16px;
          background: rgba(8, 18, 72, 0.96);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(140, 239, 255, 0.12);
        }
        .gh-detail-desc-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 16px;
          letter-spacing: 2px;
          color: #91f5ff;
          margin-bottom: 8px;
          opacity: 0.7;
        }
        .gh-detail-desc-text {
          font-family: 'Anton', sans-serif;
          font-size: 18px;
          line-height: 1.3;
          color: #edfaff;
        }

        .gh-detail-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 14px 18px 0;
        }
        .gh-tag {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 16px;
          letter-spacing: 1.5px;
          color: #06133b;
          background: #8df6ff;
          padding: 4px 10px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
        }

        .gh-detail-repo-card {
          margin: 14px 18px 0;
          padding: 12px 14px;
          background: rgba(10,119,212,0.1);
          border: 1px solid rgba(140,239,255,0.14);
          clip-path: polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%);
        }
        .gh-detail-repo-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 14px;
          letter-spacing: 2px;
          color: rgba(156,247,255,0.5);
          margin-bottom: 4px;
        }
        .gh-detail-repo-name {
          font-family: 'Anton', sans-serif;
          font-size: 20px;
          letter-spacing: 1px;
          color: #9cf7ff;
        }

        .gh-detail-btn-row {
          margin: 16px 18px 20px;
          display: flex;
          gap: 10px;
        }
        .gh-github-btn {
          font-family: 'Anton', sans-serif;
          font-size: 20px;
          letter-spacing: 2px;
          color: #08153f;
          background: linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%);
          border: none;
          padding: 12px 24px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%);
          cursor: pointer;
          pointer-events: all;
          transition: opacity 0.2s ease;
        }
        .gh-github-btn:hover { opacity: 0.82; }

        /* ── Footer ── */
        .gh-footer {
          position: fixed;
          bottom: 20px;
          right: 28px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 5px;
          font-family: 'Bebas Neue', sans-serif;
          z-index: 14;
          opacity: 0;
          transition: opacity 0.4s ease 0.6s;
        }
        .gh-footer.mounted { opacity: 1; }
        .gh-footer-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.22);
        }
        .gh-footer-key {
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 3px;
          padding: 1px 6px;
          font-size: 11px;
        }

        /* ── Mobile ── */
        .gh-mobile-controls { display: none; }
        .gh-mobile-btn {
          border: 1px solid rgba(255,255,255,0.28);
          background: rgba(6,13,55,0.8);
          color: #fff;
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 1.2px;
          font-size: 13px;
          padding: 7px 12px;
          border-radius: 8px;
          min-width: 84px;
        }

        @media (max-width: 768px) {
          .gh-overlay {
            overflow-y: auto;
            overflow-x: hidden;
            -webkit-overflow-scrolling: touch;
            pointer-events: all;
            padding-bottom: 72px;
          }
          .gh-stack {
            position: relative !important;
            transform: none !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            padding: 16px 14px 10px !important;
            pointer-events: all !important;
          }
          .gh-list-tag { font-size: 52px !important; margin: 0 0 8px 8px !important; }
          .gh-card { height: 76px !important; }
          .gh-title { font-size: 26px !important; }
          .gh-detail-panel {
            position: relative !important;
            top: 0 !important;
            right: 0 !important;
            width: calc(100% - 28px) !important;
            min-height: 0 !important;
            bottom: auto !important;
            margin: 8px 14px 16px !important;
            pointer-events: all !important;
          }
          .gh-footer { display: none; }
          .gh-mobile-controls {
            position: fixed;
            left: 8px;
            right: 8px;
            bottom: max(8px, env(safe-area-inset-bottom));
            z-index: 20;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 8px;
            pointer-events: all;
          }
        }

        @media (min-width: 769px) and (max-width: 1200px) {
          .gh-stack { transform: scale(0.88); }
          .gh-detail-panel { right: 2vw; width: min(42vw, 520px); }
        }
      `}</style>

      <div className="gh-overlay">
        {/* ── Left stack ── */}
        <div className="gh-stack">
          <div className={`gh-list-tag${mounted ? " mounted" : ""}`}>GITHUB</div>
          {ITEMS.map((it, index) => (
            <div
              key={it.id}
              className={`gh-card-wrap${active === index ? " active" : ""}${it.isProfile ? " profile" : ""}${mounted ? " mounted" : ""}`}
              style={{ transitionDelay: `${index * 45}ms` }}
              onMouseEnter={() => setActive(index)}
              onClick={() => setActive(index)}
            >
              <div className="gh-card">
                <div className="gh-badge">
                  <div className="gh-badge-text">{it.badge}</div>
                </div>
                <div className="gh-card-inner">
                  <div className="gh-title">{it.title}</div>
                  <div className="gh-lang-badge">{it.lang}</div>
                </div>
                <div className="gh-subtitle-bar">
                  <div className="gh-subtitle">{it.subtitle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Right detail panel ── */}
        <div className="gh-detail-panel" key={item.id}>
          {item.isProfile ? (
            <div className="gh-profile-detail">
              <div className="gh-profile-header">
                <div className="gh-profile-name">{PROFILE.name}</div>
                <div className="gh-profile-role">{PROFILE.role}</div>
              </div>

              <div className="gh-profile-bio">
                <div className="gh-profile-bio-label">ABOUT ME</div>
                {PROFILE.bio.map((line) => (
                  <div className="gh-profile-bio-item" key={line}>{line}</div>
                ))}
              </div>

              <div className="gh-profile-stack">
                <div className="gh-profile-stack-label">TECH STACK</div>
                <div className="gh-stack-tags">
                  {PROFILE.stack.map((s) => (
                    <span className="gh-stack-tag" key={s}>{s}</span>
                  ))}
                </div>
              </div>

              <div className="gh-profile-stats">
                <div className="gh-profile-stats-label">GITHUB STATS</div>
                <div className={`gh-stats-img-wrap${statsLoaded ? " loaded" : ""}`}>
                  <img
                    className="gh-stats-img"
                    src={PROFILE.statsImg}
                    alt="GitHub Stats"
                    onLoad={() => setStatsLoaded(true)}
                  />
                  <img
                    className="gh-stats-img"
                    src={PROFILE.streakImg}
                    alt="GitHub Streak"
                  />
                </div>
              </div>

              <div className="gh-profile-btn-row">
                <button
                  className="gh-visit-btn"
                  onClick={() => window.open(PROFILE.github, "_blank")}
                >
                  VISIT PROFILE →
                </button>
              </div>
            </div>
          ) : (
            <div className="gh-proj-detail">
              <div className="gh-detail-top">
                <div className="gh-detail-top-index">{item.badge}</div>
                <div className="gh-detail-top-title">{item.title}</div>
                <div className="gh-detail-top-lang">{item.lang}</div>
              </div>

              <div className="gh-detail-desc">
                <div className="gh-detail-desc-label">DESCRIPTION</div>
                <div className="gh-detail-desc-text">{item.description}</div>
              </div>

              <div className="gh-detail-tags">
                {item.tags.map((tag) => (
                  <span className="gh-tag" key={tag}>{tag}</span>
                ))}
              </div>

              <div className="gh-detail-repo-card">
                <div className="gh-detail-repo-label">REPOSITORY</div>
                <div className="gh-detail-repo-name">{item.repoName}</div>
              </div>

              <div className="gh-detail-btn-row">
                <button
                  className="gh-github-btn"
                  onClick={() => window.open(item.url, "_blank")}
                >
                  OPEN ON GITHUB →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Footer hints ── */}
      <div className={`gh-footer${mounted ? " mounted" : ""}`}>
        <div className="gh-footer-row"><span className="gh-footer-key">↑↓</span><span>SELECT</span></div>
        <div className="gh-footer-row"><span className="gh-footer-key">↵</span><span>OPEN</span></div>
        <div className="gh-footer-row"><span className="gh-footer-key">ESC</span><span>BACK</span></div>
      </div>

      {/* ── Mobile controls ── */}
      <div className="gh-mobile-controls" aria-label="GitHub page mobile controls">
        <button className="gh-mobile-btn" type="button" onClick={() => navigate(-1)}>
          BACK
        </button>
        <button
          className="gh-mobile-btn"
          type="button"
          onClick={() => {
            if (item.isProfile) window.open(PROFILE.github, "_blank");
            else if (item.url) window.open(item.url, "_blank");
          }}
        >
          {item.isProfile ? "PROFILE" : "GITHUB"}
        </button>
      </div>
    </div>
  );
}