import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BgVideo from "../components/BgVideo";
import { STREAMS } from "../data/streams";
import profile from "../data/profile";
import posterGithub from "../assets/images/posters/poster-github.avif";
import makotoAvatar from "../assets/images/avatars/makoto.webp";
import aigisAvatar from "../assets/images/avatars/aigis.webp";
import mitsuruAvatar from "../assets/images/avatars/mitsuru.webp";
import junpeiAvatar from "../assets/images/avatars/junpei.webp";
import yukariAvatar from "../assets/images/avatars/yukari.webp";
import fuukaAvatar from "../assets/images/avatars/fuuka.webp";
import akihikoAvatar from "../assets/images/avatars/akihiko.webp";
import makotoNp from "../assets/images/nameplates/makoto.webp";
import aigisNp from "../assets/images/nameplates/aigis.webp";
import mitsuruNp from "../assets/images/nameplates/mitsuru.webp";
import junpeiNp from "../assets/images/nameplates/junpei.webp";
import yukariNp from "../assets/images/nameplates/yukari.webp";
import fuukaNp from "../assets/images/nameplates/fuuka.webp";
import akihikoNp from "../assets/images/nameplates/akihiko.webp";
import { fetchGitHubStats } from "../services/githubService";
import "./GitHubPage.css";

const REPO_AVATARS = [aigisAvatar, mitsuruAvatar, junpeiAvatar, yukariAvatar, fuukaAvatar, akihikoAvatar];
const REPO_NAMEPLATES = [aigisNp, mitsuruNp, junpeiNp, yukariNp, fuukaNp, akihikoNp];
const TAG_COLORS = ["#ff5c8a", "#3ce2ff", "#ffbe55", "#4de1c1", "#8c9eff", "#ff85a8"];

const COMPENDIUM = [
  {
    id: "profile",
    avatar: makotoAvatar,
    nameplate: makotoNp,
    lv: profile.github.year,
    lang: "PROFILE",
    title: profile.github.displayName,
    subtitle: `github.com/${profile.github.username}`,
    summary: profile.github.bio,
    skills: [
      { tag: "AI", name: "PyTorch", color: "#ff5c8a" },
      { tag: "CV", name: "OpenCV", color: "#3ce2ff" },
      { tag: "SYS", name: "C++ / Qt 6", color: "#8c9eff" },
      { tag: "WEB", name: "React.js", color: "#ff85a8" },
      { tag: "API", name: "FastAPI", color: "#4de1c1" },
      { tag: "ML", name: "ONNX Runtime", color: "#ffbe55" },
    ],
    gauges: [
      { code: "AI", val: 92 },
      { code: "CV", val: 90 },
      { code: "FS", val: 88 },
      { code: "CP", val: 85 },
    ],
    url: `https://github.com/${profile.github.username}`,
    cta: `VISIT @${profile.github.username.toUpperCase()} →`,
  },
  ...profile.github.repos.map((repo, idx) => ({
    id: repo.id,
    avatar: REPO_AVATARS[idx % REPO_AVATARS.length],
    nameplate: REPO_NAMEPLATES[idx % REPO_NAMEPLATES.length],
    lv: repo.year.replace("'", ""),
    lang: repo.tags?.[0]?.tag || "CODE",
    title: repo.title,
    subtitle: repo.repoPath,
    summary: repo.summary,
    skills: (repo.tags || []).map((t, tIdx) => ({
      tag: t.tag,
      name: t.name,
      color: TAG_COLORS[(idx + tIdx) % TAG_COLORS.length],
    })),
    gauges: [
      { code: "AI", val: 90 - (idx % 3) * 4 },
      { code: "UI", val: 94 - (idx % 2) * 5 },
      { code: "DX", val: 88 },
      { code: "PF", val: 91 },
    ],
    url: repo.url,
    cta: repo.cta || "VIEW REPOSITORY →",
  })),
];

export default function GitHubPage() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState({ repos: 18, stars: 38, followers: 5 });
  const rowRefs = useRef([]);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    let alive = true;
    fetchGitHubStats().then((data) => {
      if (alive && data) {
        setStats({
          repos: data.repos ?? 18,
          stars: data.stars ?? 38,
          followers: data.followers ?? 5,
        });
      }
    });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    rowRefs.current[active]?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [active]);

  const current = COMPENDIUM[active];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") setActive((i) => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive((i) => Math.min(COMPENDIUM.length - 1, i + 1));
      if (e.key === "Enter") window.open(current.url, "_blank");
      if (e.key === "ArrowLeft" || e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current.url, navigate]);

  return (
    <div id="menu-screen" style={{ background: "#220613" }}>
      <BgVideo src={STREAMS.github} poster={posterGithub} />

      <div className="cp-stage">
        <div className="cp-watermark" aria-hidden="true">GITHUB</div>

        {/* Left Kinetic P3R Nameplate Compendium Bars */}
        <div className="cp-list-col">
          <div className="cp-list-meta">
            <span>REPOSITORY COMPENDIUM</span>
            <span>{COMPENDIUM.length} ENTRIES</span>
          </div>

          <div className="cp-list-scroll">
            {COMPENDIUM.map((entry, idx) => (
              <div
                key={entry.id}
                ref={(el) => { rowRefs.current[idx] = el; }}
                className={`cp-row-outer${active === idx ? " active" : ""}${mounted ? " mounted" : ""}`}
              >
                <div className="cp-row-slash" aria-hidden="true" />
                <button
                  type="button"
                  className="cp-row"
                  onMouseEnter={() => setActive(idx)}
                  onFocus={() => setActive(idx)}
                  onClick={() => setActive(idx)}
                >
                  <img className="cp-row-np" src={entry.nameplate} decoding="async" alt="" />
                  <span className="cp-row-fill" aria-hidden="true" />
                  <div className="cp-row-content">
                    <span className="cp-row-lv">'{entry.lv}</span>
                    <span className="cp-row-title">{entry.title}</span>
                  </div>
                </button>
              </div>
            ))}
          </div>

          <div className="cp-live-strip" aria-label="Live GitHub stats">
            <div className="cp-live-stat">
              <span className="cp-live-label">REPOS</span>
              <span className="cp-live-val">{stats.repos}</span>
            </div>
            <div className="cp-live-stat">
              <span className="cp-live-label">STARS</span>
              <span className="cp-live-val">{stats.stars}</span>
            </div>
            <div className="cp-live-stat">
              <span className="cp-live-label">FOLLOWERS</span>
              <span className="cp-live-val">{stats.followers}</span>
            </div>
          </div>
        </div>

        {/* Reactive Center-Left Showcase Card (Leaves Kotone Open on Right!) */}
        <div className={`cp-right${mounted ? " mounted" : ""}`}>
          <div className="cp-card-inner" key={current.id}>
            <div className="cp-top-ribbon">
              <div className="cp-lv-box">
                <span className="cp-lv-word">YR</span>
                <span className="cp-lv-num">{current.lv}</span>
              </div>
              <div>
                <div className="cp-name">{current.title}</div>
                <div className="cp-sub">{current.subtitle}</div>
              </div>
              <div className="cp-head-avatar-box">
                <img className="cp-head-avatar" src={current.avatar} decoding="async" alt="" />
                <span className="cp-head-lang">{current.lang}</span>
              </div>
            </div>

            <div className="cp-white-slab">
              <div className="cp-summary">{current.summary}</div>

              <div className="cp-skills-row">
                {current.skills.map((sk) => (
                  <div className="cp-skill-chip" key={sk.name}>
                    <span className="cp-skill-tag" style={{ background: sk.color }}>{sk.tag}</span>
                    <span className="cp-skill-name">{sk.name}</span>
                  </div>
                ))}
              </div>

              <div className="cp-gauges">
                {current.gauges.map((g) => (
                  <div key={g.code}>
                    <div className="cp-gauge-top">
                      <span>{g.code}</span>
                      <span className="cp-gauge-val">{g.val}</span>
                    </div>
                    <div className="cp-gauge-track">
                      <div className="cp-gauge-fill" style={{ width: `${g.val}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="cp-action-bar">
              <button
                type="button"
                className="cp-open-btn"
                onClick={() => window.open(current.url, "_blank")}
              >
                <span className="cp-open-btn-wipe" aria-hidden="true" />
                <span className="cp-open-btn-label">{current.cta}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="cp-footer">
        <div className="cp-footer-row"><span className="cp-footer-key">↑↓</span><span>SELECT</span></div>
        <div className="cp-footer-row"><span className="cp-footer-key">↵</span><span>OPEN</span></div>
        <div className="cp-footer-row"><span className="cp-footer-key">ESC</span><span>BACK</span></div>
      </div>

      <div className="cp-mobile-controls" aria-label="GitHub mobile controls">
        <button className="cp-mobile-btn" type="button" onClick={() => navigate(-1)}>
          BACK
        </button>
        <button className="cp-mobile-btn" type="button" onClick={() => window.open(current.url, "_blank")}>
          OPEN REPO
        </button>
      </div>
    </div>
  );
}
