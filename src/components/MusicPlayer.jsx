import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import walkmanImg from "../assets/images/player/walkman.webp";
import earcupImg from "../assets/images/player/earcup.webp";
import "./MusicPlayer.css";

const ROUTE_THEMES = {
  "/about": {
    accent: "#28d7ff",
    deep: "#051929",
    slash: "#e01e37",
    hue: "0deg",
  },
  "/resume": {
    accent: "#ff3b52",
    deep: "#14171c",
    slash: "#e01e37",
    hue: "168deg",
  },
  "/github": {
    accent: "#ff4f8b",
    deep: "#1b0611",
    slash: "#ff2a6d",
    hue: "152deg",
  },
  "/sideproj": {
    accent: "#e6c84f",
    deep: "#18111c",
    slash: "#d92136",
    hue: "178deg",
  },
  "/socials": {
    accent: "#e6df38",
    deep: "#1d1c0c",
    slash: "#c81d25",
    hue: "-125deg",
  },
  default: {
    accent: "#28d7ff",
    deep: "#06143b",
    slash: "#e01e37",
    hue: "0deg",
  },
};

function fmtTime(sec) {
  if (!Number.isFinite(sec) || sec < 0) return "00:00";
  const s = Math.floor(sec);
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

function PlayIcon({ accent, deep }) {
  return (
    <svg width="32" height="32" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <polygon points="12,6 58,32 12,58" fill={deep} stroke={accent} strokeWidth="3.2" strokeLinejoin="miter" />
      <polygon points="18,14 48,32 18,50 25,32" fill={accent} />
      <polyline points="20,10 54,32 20,54" stroke="#ffffff" strokeWidth="1.6" fill="none" opacity="0.75" />
    </svg>
  );
}

function PauseIcon({ accent, deep }) {
  return (
    <svg width="32" height="32" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <polygon points="12,6 56,6 56,52 50,58 8,58 8,12" fill={deep} stroke={accent} strokeWidth="2.2" />
      <polyline points="8,24 8,12 14,6 28,6" stroke="#ffffff" strokeWidth="3.5" fill="none" />
      <polyline points="56,40 56,52 50,58 36,58" stroke="#ffffff" strokeWidth="3.5" fill="none" />
      <rect x="19" y="16" width="9.5" height="32" fill={accent} />
      <polygon points="28.5,33 28.5,48 21,48" fill={deep} opacity="0.65" />
      <rect x="35.5" y="16" width="9.5" height="32" fill={accent} />
      <polygon points="45,33 45,48 37.5,48" fill={deep} opacity="0.65" />
      <text x="36" y="13" fill={accent} fontSize="6.5" fontFamily="monospace">&gt;&gt;&gt;&gt;</text>
      <text x="11" y="55" fill={accent} fontSize="6.5" fontFamily="monospace">&gt;&gt;&gt;&gt;</text>
    </svg>
  );
}

function NextIcon({ accent, deep }) {
  return (
    <svg width="30" height="28" viewBox="0 0 72 60" fill="none" aria-hidden="true">
      <polygon points="4,6 42,24 8,54 14,32" fill={accent} opacity="0.92" />
      <polygon points="28,11 54,30 28,49" fill="#ffffff" stroke={deep} strokeWidth="2.5" />
      <rect x="54" y="12" width="7" height="36" fill={accent} stroke={deep} strokeWidth="1.5" />
      <polyline points="12,18 32,30 12,42" fill={deep} opacity="0.28" />
    </svg>
  );
}

function PrevIcon({ accent, deep }) {
  return (
    <svg width="30" height="28" viewBox="0 0 72 60" fill="none" aria-hidden="true">
      <rect x="11" y="12" width="7" height="36" fill="#ffffff" stroke={deep} strokeWidth="1.5" />
      <polygon points="44,11 18,30 44,49" fill="#ffffff" stroke={deep} strokeWidth="2.5" />
      <polygon points="64,12 36,30 64,48" fill={accent} stroke={deep} strokeWidth="2" />
      <polygon points="62,48 44,42 66,54" fill={accent} opacity="0.8" />
    </svg>
  );
}

function ChevronIcon({ accent, deep, rot = 0 }) {
  return (
    <svg
      width="22"
      height="20"
      viewBox="0 0 60 54"
      fill="none"
      aria-hidden="true"
      style={{ transform: `rotate(${rot}deg)`, transition: "transform 240ms var(--p3-ease)" }}
    >
      <polygon points="4,10 30,48 56,10 44,10 30,32 16,10" fill={deep} stroke={accent} strokeWidth="2.5" />
      <polygon points="10,12 30,40 50,12 41,12 30,27 19,12" fill="#ffffff" />
      <polyline points="8,24 22,44" stroke={accent} strokeWidth="3" />
      <polyline points="52,24 38,44" stroke={accent} strokeWidth="3" />
    </svg>
  );
}

export default function MusicPlayer({
  tracks = [],
  src,
  autoPlay = false,
  initialVolume = 0.4,
}) {
  const location = useLocation();
  const resolvedTracks =
    tracks.length > 0
      ? tracks
      : [{ id: "bgm", title: "COLOR YOUR NIGHT", artist: "P3R OST", tag: "P3R OST", duration: 223, src }];

  const [trackIdx, setTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [hasOpenedHud, setHasOpenedHud] = useState(false);
  const [playlistOpen, setPlaylistOpen] = useState(false);
  const [volSteps, setVolSteps] = useState(() => Math.max(1, Math.min(8, Math.round(initialVolume * 8))));
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(resolvedTracks[0]?.duration || 0);
  const [kick, setKick] = useState(false);

  const audioRef = useRef(null);
  const oledTimeRef = useRef(null);
  const expandedRef = useRef(expanded);
  const wantPlayRef = useRef(autoPlay);
  const prevSrcRef = useRef(resolvedTracks[0]?.src);
  const lastSecRef = useRef(0);

  useEffect(() => {
    expandedRef.current = expanded;
    if (expanded) setCurrentTime(lastSecRef.current);
  }, [expanded]);

  const currentTrack = resolvedTracks[trackIdx] || resolvedTracks[0];
  const theme = ROUTE_THEMES[location.pathname] || ROUTE_THEMES.default;

  const triggerKick = () => {
    setKick(true);
    setTimeout(() => setKick(false), 260);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = muted ? 0 : volSteps / 8;
  }, [volSteps, muted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    let delayTimer = null;

    const onLoadedMeta = () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
      }
    };
    const onTimeUpdate = () => {
      const sec = Math.floor(audio.currentTime || 0);
      if (sec !== lastSecRef.current) {
        lastSecRef.current = sec;
        if (oledTimeRef.current) {
          oledTimeRef.current.textContent = fmtTime(sec);
        }
        if (expandedRef.current) {
          setCurrentTime(sec);
        }
      }
    };
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      if (resolvedTracks.length > 1) {
        setTrackIdx((i) => (i + 1) % resolvedTracks.length);
      } else {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      }
    };

    // Defer unlocking BGM on navigation clicks so destination route media gets clean bandwidth
    const unlock = (e) => {
      if (!wantPlayRef.current || !audio.paused) return;
      const isNavClick = e?.target instanceof Element && e.target.closest(".p3-row");
      const startPlay = () => {
        if (!wantPlayRef.current) return;
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
      };
      if (isNavClick) {
        delayTimer = setTimeout(startPlay, 650);
      } else {
        startPlay();
      }
    };

    audio.addEventListener("loadedmetadata", onLoadedMeta);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    if (autoPlay) {
      document.addEventListener("click", unlock, { once: true });
      document.addEventListener("keydown", unlock, { once: true });
    }

    return () => {
      if (delayTimer) clearTimeout(delayTimer);
      audio.removeEventListener("loadedmetadata", onLoadedMeta);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      document.removeEventListener("click", unlock);
      document.removeEventListener("keydown", unlock);
    };
  }, [autoPlay, resolvedTracks.length]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || prevSrcRef.current === currentTrack.src) return;
    prevSrcRef.current = currentTrack.src;
    lastSecRef.current = 0;
    setCurrentTime(0);
    setDuration(currentTrack.duration || 0);
    audio.load();
    if (wantPlayRef.current) {
      audio.play().catch(() => {});
    }
  }, [currentTrack.src, currentTrack.duration]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    triggerKick();
    if (audio.paused) {
      wantPlayRef.current = true;
      audio.play().catch(() => {});
    } else {
      wantPlayRef.current = false;
      audio.pause();
    }
  };

  const stepTrack = (delta) => {
    const audio = audioRef.current;
    triggerKick();
    if (resolvedTracks.length > 1) {
      wantPlayRef.current = true;
      setTrackIdx((i) => (i + delta + resolvedTracks.length) % resolvedTracks.length);
    } else if (audio) {
      audio.currentTime = 0;
      lastSecRef.current = 0;
      setCurrentTime(0);
      if (audio.paused) {
        wantPlayRef.current = true;
        audio.play().catch(() => {});
      }
    }
  };

  const selectTrack = (idx) => {
    const audio = audioRef.current;
    triggerKick();
    wantPlayRef.current = true;
    if (idx === trackIdx && audio) {
      audio.currentTime = 0;
      lastSecRef.current = 0;
      setCurrentTime(0);
      audio.play().catch(() => {});
    } else {
      setTrackIdx(idx);
    }
  };

  const handleScrub = (e) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const t = ratio * duration;
    audio.currentTime = t;
    lastSecRef.current = Math.floor(t);
    setCurrentTime(Math.floor(t));
  };

  const toggleHud = () => {
    if (!hasOpenedHud) setHasOpenedHud(true);
    setExpanded((ex) => {
      if (ex) setPlaylistOpen(false);
      return !ex;
    });
  };

  const progress = duration > 0 ? Math.max(0.02, Math.min(1, currentTime / duration)) : 0.02;
  const fillW = 198 * progress;
  const starX = 12 + fillW;
  const activeLevel = muted ? 0 : volSteps;

  return (
    <>
      <audio ref={audioRef} src={currentTrack.src} preload="none" />

      <div className="p3m-dock" aria-label="Persona 3 Reload music player">
        {hasOpenedHud && (
          <div className={`p3m-wing-stack${expanded ? " open" : " closed"}`}>
            <div className="p3m-wing-wrap">
              <div className="p3m-wing-shadow" style={{ background: theme.slash }} aria-hidden="true" />
              <div
                className="p3m-wing"
                style={{
                  background: `${theme.deep}f2`,
                  borderTop: `2.5px solid ${theme.accent}`,
                  borderLeft: `4px solid ${theme.accent}`,
                }}
              >
                <div className="p3m-head-row">
                  <div className="p3m-track-id">
                    <button
                      type="button"
                      className="p3m-earcup-btn"
                      onClick={() => setMuted((m) => !m)}
                      title={muted ? "Unmute audio" : "Mute audio"}
                      aria-label={muted ? "Unmute audio" : "Mute audio"}
                    >
                      {isPlaying && !muted && (
                        <>
                          <span className="p3m-wave" style={{ borderColor: theme.accent }} />
                          <span className="p3m-wave w2" style={{ borderColor: theme.accent }} />
                        </>
                      )}
                      <img
                        className="p3m-earcup-img"
                        src={earcupImg}
                        decoding="async"
                        alt=""
                        style={{
                          filter: theme.hue === "0deg" ? undefined : `hue-rotate(${theme.hue})`,
                          opacity: muted ? 0.42 : 1,
                        }}
                      />
                    </button>

                    <div className="p3m-meta-col">
                      <div className="p3m-meta-top">
                        <span className="p3m-tag-pill" style={{ background: theme.slash }}>
                          {currentTrack.tag}
                        </span>
                        <span className="p3m-time-txt" style={{ color: theme.accent }}>
                          {fmtTime(currentTime)} / {fmtTime(duration)}
                        </span>
                      </div>
                      <div className="p3m-title-mask">
                        <div className={`p3m-title-txt${isPlaying && currentTrack.title.length > 15 ? " scroll" : ""}`}>
                          {currentTrack.title}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p3m-head-actions">
                    <button
                      type="button"
                      className="p3m-list-btn"
                      onClick={() => setPlaylistOpen((o) => !o)}
                      aria-expanded={playlistOpen}
                      style={{
                        background: playlistOpen ? "#ffffff" : "rgba(255,255,255,0.08)",
                        color: playlistOpen ? theme.deep : theme.accent,
                        borderColor: theme.accent,
                      }}
                      title="Toggle playlist"
                    >
                      LIST
                    </button>
                    <button
                      type="button"
                      className="p3m-icon-btn"
                      onClick={() => {
                        setExpanded(false);
                        setPlaylistOpen(false);
                      }}
                      title="Collapse player HUD"
                      aria-label="Collapse player HUD"
                    >
                      <ChevronIcon accent={theme.accent} deep={theme.deep} rot={-90} />
                    </button>
                  </div>
                </div>

                <div className="p3m-prog-row">
                  <svg
                    width="256"
                    height="22"
                    viewBox="0 0 224 26"
                    fill="none"
                    style={{ cursor: "pointer", width: "100%", maxWidth: 262 }}
                    onClick={handleScrub}
                    role="slider"
                    aria-label="Track progress"
                    aria-valuemin={0}
                    aria-valuemax={Math.round(duration)}
                    aria-valuenow={Math.round(currentTime)}
                  >
                    <defs>
                      <clipPath id="p3mProgClip">
                        <polygon points="14,5 214,5 204,21 4,21" />
                      </clipPath>
                    </defs>
                    <polygon points="12,3 218,3 206,23 2,23" fill={theme.deep} stroke={theme.accent} strokeWidth="2.2" />
                    <polyline points="12,3 218,3 210,16" stroke="#ffffff" strokeWidth="1.3" fill="none" opacity="0.8" />
                    <g clipPath="url(#p3mProgClip)">
                      <rect x="4" y="5" width={fillW + 8} height="16" fill={theme.accent} />
                      <polygon
                        points={`${Math.max(4, starX - 42)},5 ${starX + 4},5 ${starX - 8},21 ${Math.max(4, starX - 54)},21`}
                        fill="#ffffff"
                        opacity="0.9"
                      />
                      <line x1="52" y1="3" x2="42" y2="23" stroke={theme.deep} strokeWidth="2.6" />
                      <line x1="94" y1="3" x2="84" y2="23" stroke={theme.deep} strokeWidth="2.6" />
                      <line x1="136" y1="3" x2="126" y2="23" stroke={theme.deep} strokeWidth="2.6" />
                      <line x1="178" y1="3" x2="168" y2="23" stroke={theme.deep} strokeWidth="2.6" />
                    </g>
                    <path
                      d={`M${starX},4 L${starX + 3},10.5 L${starX + 9.5},13 L${starX + 3},15.5 L${starX},22 L${starX - 3},15.5 L${starX - 9.5},13 L${starX - 3},10.5 Z`}
                      fill="#ffffff"
                      stroke={theme.accent}
                      strokeWidth="1"
                    />
                  </svg>
                </div>

                <div className="p3m-controls-row">
                  <div className="p3m-transport">
                    <button
                      type="button"
                      className="p3m-icon-btn"
                      onClick={() => stepTrack(-1)}
                      aria-label="Previous track"
                      title={resolvedTracks.length > 1 ? "Previous track" : "Restart track"}
                    >
                      <PrevIcon accent={theme.accent} deep={theme.deep} />
                    </button>
                    <button
                      type="button"
                      className="p3m-icon-btn"
                      onClick={togglePlay}
                      aria-label={isPlaying ? "Pause music" : "Play music"}
                      title={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? (
                        <PauseIcon accent={theme.accent} deep={theme.deep} />
                      ) : (
                        <PlayIcon accent={theme.accent} deep={theme.deep} />
                      )}
                    </button>
                    <button
                      type="button"
                      className="p3m-icon-btn"
                      onClick={() => stepTrack(1)}
                      aria-label="Next track"
                      title={resolvedTracks.length > 1 ? "Next track" : "Restart track"}
                    >
                      <NextIcon accent={theme.accent} deep={theme.deep} />
                    </button>
                  </div>

                  <div className="p3m-vol-col">
                    <span className="p3m-vol-label">
                      {muted ? "MUTED" : `VOL ${Math.round((volSteps / 8) * 100)}%`}
                    </span>
                    <svg width="116" height="34" viewBox="0 0 120 44" fill="none" aria-label="Volume controls">
                      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                        const h = 8 + i * 4.4;
                        const x = 6 + i * 13.5;
                        const y = 42 - h;
                        const lit = i < activeLevel;
                        return (
                          <g
                            key={i}
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setMuted(false);
                              setVolSteps(i + 1);
                            }}
                          >
                            <rect x={x} y="2" width="11" height="42" fill="transparent" />
                            <polygon
                              points={`${x + 4},${y} ${x + 13},${y - 1.5} ${x + 10.5},42 ${x + 1.5},42`}
                              fill={lit ? theme.accent : "rgba(255,255,255,0.16)"}
                              stroke={theme.deep}
                              strokeWidth="0.8"
                            />
                            {lit && (
                              <polygon
                                points={`${x + 4},${y} ${x + 13},${y - 1.5} ${x + 11.8},${y + Math.min(h * 0.42, 13)} ${x + 3.2},${y + Math.min(h * 0.28, 9)}`}
                                fill="#ffffff"
                                opacity="0.88"
                              />
                            )}
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {expanded && playlistOpen && (
              <div
                className="p3m-playlist-drawer"
                style={{
                  background: `${theme.deep}f5`,
                  borderTop: `2.5px solid ${theme.accent}`,
                  borderLeft: `4px solid ${theme.slash}`,
                }}
              >
                <div className="p3m-pl-header" style={{ color: theme.accent }}>
                  <span>S.E.E.S. PLAYLIST</span>
                  <span>
                    {String(trackIdx + 1).padStart(2, "0")} / {String(resolvedTracks.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="p3m-pl-list">
                  {resolvedTracks.map((tr, idx) => {
                    const active = idx === trackIdx;
                    return (
                      <button
                        key={tr.id}
                        type="button"
                        className={`p3m-pl-row${active ? " active" : ""}`}
                        onClick={() => selectTrack(idx)}
                      >
                        <span className="p3m-pl-fill" aria-hidden="true" />
                        <div className="p3m-pl-left">
                          <span className="p3m-pl-title">
                            {active && isPlaying ? "▶ " : `${String(idx + 1).padStart(2, "0")} • `}
                            {tr.title}
                          </span>
                          {tr.artist && <span className="p3m-pl-artist">{tr.artist}</span>}
                        </div>
                        <span className="p3m-pl-dur">{fmtTime(tr.duration)}</span>
                      </button>
                    );
                  })}
                </div>

                {resolvedTracks.length === 1 && (
                  <div className="p3m-pl-foot">PLAYLIST READY • MORE TRACKS CAN BE ADDED ANYTIME</div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="p3m-walkman-col">
          <button
            type="button"
            className="p3m-hud-toggle"
            onClick={toggleHud}
            style={{
              background: `${theme.deep}e8`,
              borderColor: theme.accent,
              color: theme.accent,
            }}
            title={expanded ? "Hide player controls" : "Open Cyber-HUD & Playlist"}
          >
            <ChevronIcon accent={theme.accent} deep={theme.deep} rot={expanded ? -90 : 90} />
            <span>{expanded ? "HIDE" : "HUD"}</span>
          </button>

          <div
            className={`p3m-walkman${isPlaying ? " playing" : ""}${kick ? " kicking" : ""}`}
            onClick={(e) => {
              if (e.target.closest(".p3m-side-btn")) return;
              togglePlay();
            }}
            role="button"
            tabIndex={0}
            aria-label={isPlaying ? "Pause music" : "Play music"}
            title="Click Walkman to Play / Pause"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                togglePlay();
              }
            }}
          >
            <img
              className="p3m-walkman-img"
              src={walkmanImg}
              decoding="async"
              alt=""
              style={theme.hue === "0deg" ? undefined : { filter: `hue-rotate(${theme.hue})` }}
            />
            <div className={`p3m-oled ${isPlaying ? "playing" : "paused"}`} aria-hidden="true">
              <span className="p3m-oled-txt">{isPlaying ? "▶PLAY" : "❚❚HOLD"}</span>
              <div className="p3m-oled-eq">
                <span className="p3m-oled-col c1" />
                <span className="p3m-oled-col c2" />
                <span className="p3m-oled-col c3" />
                <span className="p3m-oled-col c4" />
                <span className="p3m-oled-col c5" />
              </div>
              <span className="p3m-oled-txt" ref={oledTimeRef}>{fmtTime(lastSecRef.current)}</span>
            </div>

            <button
              type="button"
              className="p3m-side-btn p3m-side-skip"
              aria-label="Next track"
              title="Skip / Restart track"
              onClick={(e) => {
                e.stopPropagation();
                stepTrack(1);
              }}
            />
            <button
              type="button"
              className="p3m-side-btn p3m-side-vol"
              aria-label="Cycle volume"
              title="Cycle volume"
              onClick={(e) => {
                e.stopPropagation();
                setMuted(false);
                setVolSteps((v) => (v % 8) + 1);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
