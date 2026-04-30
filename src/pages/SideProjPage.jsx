import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgVideo from "../assets/videos/main1.mp4";

const PROJECTS = [
  {
    id: "i",
    badge: "01",
    title: "PROJECT ALPHA",
    subtitle: "React / Full-Stack",
    lang: "JS",
    rank: 5,
    description: "A modern web application built with React and Node.js. Features include real-time updates, user authentication, and responsive design for all devices.",
    tags: ["React", "Node.js", "MongoDB", "REST API"],
    url: "#",
  },
  {
    id: "ii",
    badge: "02",
    title: "DATA ANALYZER",
    subtitle: "Python / Machine Learning",
    lang: "PY",
    rank: 5,
    description: "Machine learning tool for data analysis and visualization. Implements various algorithms for pattern recognition and predictive modeling.",
    tags: ["Python", "TensorFlow", "Pandas", "ML"],
    url: "#",
  },
  {
    id: "iii",
    badge: "03",
    title: "MOBILE COMPANION",
    subtitle: "React Native / Mobile",
    lang: "RN",
    rank: 4,
    description: "Cross-platform mobile application for iOS and Android. Provides seamless user experience with offline support and push notifications.",
    tags: ["React Native", "Firebase", "Mobile", "API"],
    url: "#",
  },
  {
    id: "iv",
    badge: "04",
    title: "CLOUD MANAGER",
    subtitle: "TypeScript / DevOps",
    lang: "TS",
    rank: 4,
    description: "Cloud infrastructure management tool built with TypeScript. Automates deployment, monitoring, and scaling of cloud resources.",
    tags: ["TypeScript", "AWS", "Docker", "CI/CD"],
    url: "#",
  },
  {
    id: "v",
    badge: "05",
    title: "GAME ENGINE",
    subtitle: "C++ / Graphics",
    lang: "C++",
    rank: 5,
    description: "Custom 2D game engine with physics simulation, collision detection, and sprite rendering. Optimized for performance and extensibility.",
    tags: ["C++", "OpenGL", "Physics", "Game Dev"],
    url: "#",
  },
  {
    id: "vi",
    badge: "06",
    title: "API GATEWAY",
    subtitle: "Go / Microservices",
    lang: "GO",
    rank: 4,
    description: "High-performance API gateway for microservices architecture. Handles routing, load balancing, and authentication for distributed systems.",
    tags: ["Go", "Microservices", "gRPC", "Redis"],
    url: "#",
  },
];

export default function SideProjPage() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp")    setActive((i) => Math.max(0, i - 1));
      if (e.key === "ArrowDown")  setActive((i) => Math.min(PROJECTS.length - 1, i + 1));
      if (e.key === "Enter")      window.open(PROJECTS[active].url, "_blank");
      if (e.key === "ArrowLeft")  navigate(-1);
      if (e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, navigate]);

  const proj = PROJECTS[active];

  return (
    <div id="menu-screen">
      <video src={bgVideo} autoPlay loop muted playsInline />
      <div className="sp-entry-mask" aria-hidden="true">
        <video className="sp-entry-video" src={bgVideo} autoPlay loop muted playsInline />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap');

        .sp-entry-mask {
          position: absolute;
          inset: 0;
          z-index: 9;
          overflow: hidden;
          background: #c4001a;
          clip-path: circle(0 at 50% 50%);
          animation: sp-entry-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          pointer-events: none;
        }
        .sp-entry-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        @keyframes sp-entry-reveal {
          from { clip-path: circle(0 at 50% 50%); }
          to   { clip-path: circle(150vmax at 50% 50%); }
        }

        .sp-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
        }

        /* ── Left stack ── */
        .sp-stack {
          position: absolute;
          top: 9vh;
          left: 2.8vw;
          width: min(47vw, 720px);
          display: flex;
          flex-direction: column;
          gap: 8px;
          pointer-events: none;
          transform: scale(0.9);
          transform-origin: top left;
        }

        .sp-list-tag {
          font-family: 'Anton', sans-serif;
          font-size: 92px;
          line-height: 0.9;
          color: #f6fbff;
          letter-spacing: 2px;
          margin: 0 0 4px 12px;
          text-shadow: 0 2px 0 rgba(0,0,0,0.18);
          opacity: 0;
          transform: translateX(-24px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .sp-list-tag.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .sp-card-wrap {
          position: relative;
          opacity: 0;
          transform: translateX(-48px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: all;
          cursor: pointer;
        }
        .sp-card-wrap.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .sp-card {
          position: relative;
          height: 88px;
          background: #10185f;
          clip-path: polygon(0 0, 97% 0, 100% 100%, 3% 100%);
          box-shadow: 0 8px 0 rgba(5, 13, 59, 0.85);
          transition: transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
          overflow: visible;
        }
        .sp-card-wrap.active .sp-card {
          background: #ffffff;
          box-shadow: 10px 8px 0 #d63232;
          transform: translateX(6px);
        }

        .sp-card-inner {
          position: absolute;
          inset: 0;
          padding: 10px 22px 10px 62px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .sp-badge {
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
        .sp-badge-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          color: #d2fdff;
          letter-spacing: 1px;
          transform: rotate(8deg);
        }
        .sp-card-wrap.active .sp-badge {
          background: #000;
          border-color: #000;
        }
        .sp-card-wrap.active .sp-badge-text {
          color: #fff;
        }

        .sp-title {
          font-family: 'Anton', sans-serif;
          font-size: 42px;
          line-height: 0.9;
          letter-spacing: 1px;
          color: #a5f6ff;
          transition: color 0.22s ease;
        }
        .sp-card-wrap.active .sp-title {
          color: #000;
        }

        .sp-lang-badge {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 2px;
          padding: 4px 10px;
          background: rgba(133, 244, 255, 0.15);
          color: #9ffbff;
          border: 1px solid rgba(133, 244, 255, 0.3);
          align-self: center;
          flex-shrink: 0;
          transition: background 0.22s ease, color 0.22s ease;
        }
        .sp-card-wrap.active .sp-lang-badge {
          background: #000;
          color: #fff;
          border-color: #000;
        }

        .sp-subtitle-bar {
          position: absolute;
          left: 64px;
          right: 14px;
          bottom: 10px;
          height: 28px;
          background: #85f4ff;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          display: flex;
          align-items: center;
          padding: 0 18px;
          transition: background 0.22s ease;
        }
        .sp-card-wrap.active .sp-subtitle-bar {
          background: #000;
        }
        .sp-subtitle {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          line-height: 1;
          letter-spacing: 1px;
          color: #041238;
          transition: color 0.22s ease;
        }
        .sp-card-wrap.active .sp-subtitle {
          color: #fff;
        }

        /* ── Right detail panel ── */
        .sp-detail-panel {
          position: absolute;
          top: 9.5vh;
          right: 4.5vw;
          width: min(39vw, 620px);
          min-height: 74vh;
          z-index: 12;
          padding: 22px 24px 24px 24px;
          background: linear-gradient(180deg, rgba(15, 28, 105, 0.96) 0%, rgba(8, 16, 68, 0.97) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow:
            inset 0 0 0 1px rgba(133, 244, 255, 0.16),
            16px 16px 0 rgba(0, 6, 30, 0.55);
          overflow: hidden;
          pointer-events: all;
        }
        .sp-detail-panel::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, rgba(133, 244, 255, 0.08) 0 15%, transparent 15% 100%),
            linear-gradient(180deg, rgba(255,255,255,0.05), transparent 24%);
          pointer-events: none;
        }

        .sp-detail-top {
          position: relative;
          display: grid;
          grid-template-columns: 70px 1fr auto;
          align-items: center;
          gap: 14px;
          min-height: 84px;
          padding: 0 18px;
          background: linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          color: #08153f;
          box-shadow: 10px 0 0 rgba(255, 94, 136, 0.88);
        }
        .sp-detail-top-index {
          font-family: 'Anton', sans-serif;
          font-size: 42px;
          line-height: 1;
        }
        .sp-detail-top-title {
          font-family: 'Anton', sans-serif;
          font-size: 36px;
          line-height: 0.92;
          letter-spacing: 1px;
        }
        .sp-detail-top-lang {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 34px;
          letter-spacing: 2px;
          line-height: 1;
        }

        .sp-detail-desc {
          position: relative;
          margin-top: 18px;
          padding: 16px 18px;
          background: rgba(8, 18, 72, 0.96);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(140, 239, 255, 0.12);
        }
        .sp-detail-desc-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px;
          letter-spacing: 2px;
          color: #91f5ff;
          margin-bottom: 10px;
        }
        .sp-detail-desc-text {
          font-family: 'Anton', sans-serif;
          font-size: 20px;
          line-height: 1.25;
          color: #edfaff;
        }

        .sp-detail-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 14px;
        }
        .sp-tag {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px;
          letter-spacing: 1.5px;
          color: #06133b;
          background: #8df6ff;
          padding: 5px 12px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
        }

        .sp-detail-github {
          display: flex;
          margin-top: 22px;
        }
        .sp-github-btn {
          font-family: 'Anton', sans-serif;
          font-size: 22px;
          letter-spacing: 2px;
          color: #08153f;
          background: linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%);
          border: none;
          padding: 12px 28px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%);
          cursor: pointer;
          transition: opacity 0.2s ease;
        }
        .sp-github-btn:hover {
          opacity: 0.85;
        }

        /* ── Footer hints ── */
        .sp-footer {
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
        .sp-footer.mounted { opacity: 1; }
        .sp-footer-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.22);
        }
        .sp-footer-key {
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 3px;
          padding: 1px 6px;
          font-size: 11px;
        }

        /* ── Mobile ── */
        .sp-mobile-controls {
          display: none;
        }
        .sp-mobile-btn {
          border: 1px solid rgba(255, 255, 255, 0.28);
          background: rgba(6, 13, 55, 0.8);
          color: #fff;
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 1.2px;
          font-size: 13px;
          padding: 7px 12px;
          border-radius: 8px;
          min-width: 84px;
        }

        @media (max-width: 768px) {
          .sp-overlay {
            overflow-y: auto;
            overflow-x: hidden;
            -webkit-overflow-scrolling: touch;
            pointer-events: all;
            padding-bottom: 72px;
          }

          .sp-stack {
            position: relative !important;
            transform: none !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            padding: 16px 14px 10px !important;
            pointer-events: all !important;
          }

          .sp-list-tag {
            font-size: 56px !important;
            margin: 0 0 8px 8px !important;
          }

          .sp-card { height: 80px !important; }

          .sp-title { font-size: 28px !important; }

          .sp-detail-panel {
            position: relative !important;
            top: 0 !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            width: calc(100% - 28px) !important;
            min-height: unset !important;
            margin: 8px 14px 16px !important;
            pointer-events: all !important;
          }

          .sp-footer { display: none; }

          .sp-mobile-controls {
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
          .sp-stack {
            transform: scale(0.88);
          }
          .sp-detail-panel {
            right: 2vw;
            width: min(42vw, 560px);
          }
        }
      `}</style>

      <div className="sp-overlay">
        <div className="sp-stack">
          <div className={`sp-list-tag${mounted ? " mounted" : ""}`}>PROJECTS</div>
          {PROJECTS.map((proj, index) => (
            <div
              key={proj.id}
              className={`sp-card-wrap${active === index ? " active" : ""}${mounted ? " mounted" : ""}`}
              style={{ transitionDelay: `${index * 45}ms` }}
              onMouseEnter={() => setActive(index)}
              onClick={() => setActive(index)}
            >
              <div className="sp-card">
                <div className="sp-badge">
                  <div className="sp-badge-text">{proj.badge}</div>
                </div>
                <div className="sp-card-inner">
                  <div className="sp-title">{proj.title}</div>
                  <div className="sp-lang-badge">{proj.lang}</div>
                </div>
                <div className="sp-subtitle-bar">
                  <div className="sp-subtitle">{proj.subtitle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="sp-detail-panel" key={proj.id}>
          <div className="sp-detail-top">
            <div className="sp-detail-top-index">{proj.badge}</div>
            <div className="sp-detail-top-title">{proj.title}</div>
            <div className="sp-detail-top-lang">{proj.lang}</div>
          </div>

          <div className="sp-detail-desc">
            <div className="sp-detail-desc-label">DESCRIPTION</div>
            <div className="sp-detail-desc-text">{proj.description}</div>
          </div>

          <div className="sp-detail-tags">
            {proj.tags.map((tag) => (
              <span className="sp-tag" key={tag}>{tag}</span>
            ))}
          </div>

          <div className="sp-detail-github">
            <button
              className="sp-github-btn"
              onClick={() => {}}
            >
              OPEN ON GITHUB →
            </button>
          </div>
        </div>
      </div>

      <div className={`sp-footer${mounted ? " mounted" : ""}`}>
        <div className="sp-footer-row"><span className="sp-footer-key">↑↓</span><span>SELECT</span></div>
        <div className="sp-footer-row"><span className="sp-footer-key">↵</span><span>OPEN</span></div>
        <div className="sp-footer-row"><span className="sp-footer-key">ESC</span><span>BACK</span></div>
      </div>

      <div className="sp-mobile-controls" aria-label="Side projects mobile controls">
        <button className="sp-mobile-btn" type="button" onClick={() => navigate(-1)}>
          BACK
        </button>
        <button
          className="sp-mobile-btn"
          type="button"
          onClick={() => {}}
        >
          GITHUB
        </button>
      </div>
    </div>
  );
}
