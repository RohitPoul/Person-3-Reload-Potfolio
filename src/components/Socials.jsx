import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BgVideo from "./BgVideo";
import char1 from "../assets/images/bars/bar-leader.webp";
import char2 from "../assets/images/bars/bar-party-1.webp";
import char3 from "../assets/images/bars/bar-party-2.webp";
import { STREAMS } from "../data/streams";
import profile from "../data/profile";
import posterEquip from "../assets/images/posters/poster-equip.avif";
import newsign from "../assets/images/ui/badge-new.webp";
import icon1 from "../assets/images/icons/icon-github.webp";
import icon2 from "../assets/images/icons/icon-linkedin.webp";
import icon3 from "../assets/images/icons/icon-email.webp";
import { fetchGitHubStats, formatStatValue } from "../services/githubService";
import "./Socials.css";

const CHARS = [char1, char2, char3];
const EMAIL_ADDR = profile.socials.email;

const ROLES = [
  { text: "LEADER", stampBg: "#c81d25" },
  { text: "PARTY", stampBg: "#c81d25" },
  { text: "PARTY", stampBg: "#c81d25" },
];

const SOCIAL_ICONS = {
  github: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  ),
  linkedin: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  email: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
};

const getChannels = (githubStats) => [
  {
    id: "github",
    label: "GITHUB",
    handle: profile.socials.githubHandle,
    roleTag: "OPEN SOURCE & BUILDS",
    icon: SOCIAL_ICONS.github,
    barIcon: icon1,
    effect: `Inspect ${profile.socials.githubHandle} source repositories, pinned AI/ML builds (PyTorch, OpenCV, C++ / Qt 6), and commit history.`,
    slots: [
      { category: "Primary", label: "GitHub Profile", shortUrl: profile.socials.githubShortUrl, url: profile.socials.githubUrl, isNew: true },
      { category: "Source", label: "All Repositories", shortUrl: "?tab=repositories", url: `${profile.socials.githubUrl}?tab=repositories` },
      { category: "Curated", label: "Starred Projects", shortUrl: "?tab=stars", url: `${profile.socials.githubUrl}?tab=stars` },
    ],
    stats: [
      { tag: "REPO", value: githubStats.repos, color: "#f3ee78" },
      { tag: "STR", value: githubStats.stars, color: "#e6df38" },
    ],
  },
  {
    id: "linkedin",
    label: "LINKEDIN",
    handle: profile.socials.linkedinHandle,
    roleTag: "EXPERIENCE & NETWORK",
    icon: SOCIAL_ICONS.linkedin,
    barIcon: icon2,
    effect: "Connect directly for AI/ML Engineer, Computer Vision, or Full-Stack Developer opportunities.",
    slots: [
      { category: "Network", label: "LinkedIn Profile", shortUrl: profile.socials.linkedinShortUrl, url: profile.socials.linkedinUrl, isNew: true },
      { category: "Activity", label: "Recent Posts", shortUrl: "recent-activity", url: `${profile.socials.linkedinUrl}/recent-activity/all/` },
    ],
    stats: [
      { tag: "CON", value: "50+", color: "#f3ee78" },
      { tag: "AVL", value: "YES", color: "#e6df38" },
    ],
  },
  {
    id: "email",
    label: "EMAIL",
    handle: EMAIL_ADDR,
    roleTag: "DIRECT CONTACT",
    icon: SOCIAL_ICONS.email,
    barIcon: icon3,
    effect: "Direct inbox for interviews, collaborations, or freelance inquiries — replies within 24 hours.",
    slots: [
      { category: "Quick", label: "Copy Email Address", shortUrl: "COPY", copy: EMAIL_ADDR, isNew: true },
      { category: "Webmail", label: "Compose in Gmail", shortUrl: "mail.google.com", url: `https://mail.google.com/mail/?view=cm&to=${EMAIL_ADDR}` },
      { category: "Client", label: "Open Mail App", shortUrl: "mailto:", url: `mailto:${EMAIL_ADDR}` },
    ],
    stats: [
      { tag: "RES", value: "<24H", color: "#f3ee78" },
      { tag: "AVL", value: "YES", color: "#ff4d5a" },
    ],
  },
];

export default function Socials() {
  const [active, setActive] = useState(0);
  const [activeSlot, setActiveSlot] = useState(0);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [githubStats, setGithubStats] = useState({ repos: "10+", stars: "5+" });
  const navigate = useNavigate();

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    let alive = true;
    fetchGitHubStats().then((stats) => {
      if (alive && stats) {
        setGithubStats({
          repos: formatStatValue(stats.repos),
          stars: formatStatValue(stats.stars),
        });
      }
    });
    return () => {
      alive = false;
    };
  }, []);

  const channels = getChannels(githubStats);
  const current = channels[active];
  const safeSlot = Math.min(activeSlot, current.slots.length - 1);

  const handleSlotAction = (slot) => {
    if (slot.copy) {
      navigator.clipboard?.writeText(slot.copy).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } else if (slot.url) {
      window.open(slot.url, "_blank");
    }
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") {
        setActive((i) => Math.max(0, i - 1));
        setActiveSlot(0);
      } else if (e.key === "ArrowDown") {
        setActive((i) => Math.min(channels.length - 1, i + 1));
        setActiveSlot(0);
      } else if (e.key === "ArrowRight") {
        setActiveSlot((s) => (s + 1) % current.slots.length);
      } else if (e.key === "ArrowLeft") {
        navigate(-1);
      } else if (e.key === "Enter") {
        handleSlotAction(current.slots[safeSlot]);
      } else if (e.key === "Escape" || e.key === "Backspace") {
        navigate(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [channels.length, current.slots, navigate, safeSlot]);

  return (
    <div id="menu-screen" style={{ background: "#24220b" }}>
      <BgVideo src={STREAMS.socials} poster={posterEquip} />

      <div className="eq-stage">
        <div className="eq-page-title" aria-hidden="true">SOCIALS</div>
        <div className="eq-layout">
          <div className="eq-bars-col" role="navigation">
            {channels.map((item, i) => (
              <div
                key={item.id}
                className={`eq-bar-outer${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
              >
                <div className="eq-bar-frame" aria-hidden="true" />
                <div className="eq-bar-red" aria-hidden="true" />
                <div
                  className="eq-bar"
                  onClick={() => {
                    setActive(i);
                    setActiveSlot(0);
                  }}
                  onMouseEnter={() => {
                    setActive(i);
                    setActiveSlot(0);
                  }}
                >
                  <img className="eq-char" src={CHARS[i]} decoding="async" alt="" />
                  <div className="eq-bar-fill" />
                  <div className="eq-bar-content">
                    <div className="eq-role">{ROLES[i].text}</div>
                    <div className="eq-main">
                      <div className="eq-icon">{item.icon}</div>
                      <div className="eq-label">{item.label}</div>
                    </div>
                    <div className="eq-stats">
                      {item.stats.map((s) => (
                        <div className="eq-stat" key={s.tag}>
                          <div className="eq-stat-top">
                            <span className="eq-stat-tag" style={{ color: s.color, borderColor: s.color }}>
                              {s.tag}
                            </span>
                            <span className="eq-stat-num">{s.value}</span>
                          </div>
                          <div className="eq-stat-bar-color" style={{ background: s.color }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`eq-panel${mounted ? " mounted" : ""}`}>
            <div className="eq-head-ribbon" key={`head-${current.id}`}>
              <div>
                <div className="eq-head-title">{current.label}</div>
                <div className="eq-head-sub">{current.handle}</div>
              </div>
              <span className="eq-head-badge" style={{ background: ROLES[active].stampBg }}>
                {current.roleTag}
              </span>
            </div>

            <div className="eq-slots-stack" key={`slots-${current.id}`}>
              {current.slots.map((slot, idx) => (
                <div className="eq-slot-group" key={slot.label}>
                  <span className="eq-slot-cat">{slot.category}</span>
                  <div className="eq-slot-wrap">
                    <span className="eq-slot-pointer" aria-hidden="true">▶</span>
                    <div className="eq-slot-shadow" aria-hidden="true" />
                    <button
                      type="button"
                      className={`eq-slot-btn${safeSlot === idx ? " selected" : ""}`}
                      onMouseEnter={() => setActiveSlot(idx)}
                      onFocus={() => setActiveSlot(idx)}
                      onClick={() => {
                        setActiveSlot(idx);
                        handleSlotAction(slot);
                      }}
                    >
                      <span className="eq-slot-wipe" aria-hidden="true" />
                      <span className="eq-slot-icon-badge">
                        <img className="eq-slot-icon" src={current.barIcon} decoding="async" alt="" />
                      </span>
                      <span className="eq-slot-label">{slot.label}</span>
                      {slot.copy && copied ? (
                        <span className="eq-slot-copied">COPIED</span>
                      ) : (
                        <span className="eq-slot-url">{slot.shortUrl} ↗</span>
                      )}
                      {slot.isNew && !(slot.copy && copied) && (
                        <img className="eq-slot-new" src={newsign} decoding="async" alt="New" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="eq-effect-card" key={`eff-${current.id}-${safeSlot}`}>
              <div className="eq-effect-top">
                <span className="eq-effect-pill">Effect</span>
                <span className="eq-effect-url-preview">
                  {current.slots[safeSlot]?.url || EMAIL_ADDR}
                </span>
              </div>
              <div className="eq-effect-text">
                {copied ? `Copied ${EMAIL_ADDR} to clipboard — ready to paste.` : current.effect}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="eq-footer">
        <div className="eq-footer-row"><span className="eq-footer-key">↑↓</span><span>CHANNEL</span></div>
        <div className="eq-footer-row"><span className="eq-footer-key">→</span><span>CYCLE LINK</span></div>
        <div className="eq-footer-row"><span className="eq-footer-key">↵</span><span>OPEN</span></div>
        <div className="eq-footer-row"><span className="eq-footer-key">ESC</span><span>BACK</span></div>
      </div>

      <div className="eq-mobile-controls" aria-label="Socials mobile controls">
        <button className="eq-mobile-btn" type="button" onClick={() => navigate(-1)}>
          BACK
        </button>
        <button
          className="eq-mobile-btn"
          type="button"
          onClick={() => handleSlotAction(current.slots[safeSlot])}
        >
          {current.slots[safeSlot]?.copy ? "COPY EMAIL" : `OPEN ${current.label}`}
        </button>
      </div>
    </div>
  );
}
