import { memo, useEffect, useRef } from "react";

let hlsModulePromise = null;
function loadHls() {
  if (!hlsModulePromise) {
    hlsModulePromise = import("hls.js/dist/hls.light.min.mjs").then((m) => m.default || m);
  }
  return hlsModulePromise;
}

const prefetchedStreams = new Set();

/**
 * Low-priority prefetch of ONLY the manifest + init + first 2s chunk (~300 KB)
 * when hovering a menu item so destination 1080p playback starts instantaneously.
 */
export function prefetchStream(streamUrl) {
  if (!streamUrl || prefetchedStreams.has(streamUrl)) return;
  prefetchedStreams.add(streamUrl);
  const base = streamUrl.slice(0, streamUrl.lastIndexOf("/") + 1);
  for (const rel of ["index.m3u8", "init.mp4", "seg_000.m4s"]) {
    fetch(base + rel, { priority: "low" }).catch(() => {});
  }
}

/**
 * 1080p Native-FPS CMAF fMP4 HLS background video player.
 * - Uses native OS HLS on Safari (0 KB JS) and lightweight hls.light (Worker-parsed) elsewhere.
 * - Only downloads 2-second chunks as needed (maxBufferLength: 6s) instead of dumping whole MP4s.
 * - Keeps downloaded chunks in MSE back-buffer for glitch-free seamless looping.
 * - Cleanly pauses/resumes on tab visibility changes to prevent catch-up frame bursts.
 */
const BgVideo = memo(function BgVideo({ src, poster }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return undefined;

    let hls = null;
    let cancelled = false;

    const tryPlay = () => {
      if (cancelled || document.hidden) return;
      video.play().catch(() => {});
    };

    const onVisibility = () => {
      if (document.hidden) {
        video.pause();
      } else {
        tryPlay();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    const isHls = src.endsWith(".m3u8");
    if (isHls && video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      video.addEventListener("loadedmetadata", tryPlay, { once: true });
      tryPlay();
    } else if (isHls) {
      loadHls()
        .then((Hls) => {
          if (cancelled || !videoRef.current) return;
          if (!Hls.isSupported()) {
            video.src = src;
            tryPlay();
            return;
          }
          hls = new Hls({
            enableWorker: true,
            lowLatencyMode: false,
            startPosition: 0,
            maxBufferLength: 4,
            maxMaxBufferLength: 6,
            backBufferLength: 60,
            startFragPrefetch: true,
          });
          hls.loadSource(src);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, tryPlay);
          hls.on(Hls.Events.ERROR, (_, data) => {
            if (!data.fatal) return;
            if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
              hls.startLoad();
            } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
              hls.recoverMediaError();
            }
          });
        })
        .catch(() => {});
    } else {
      video.src = src;
      tryPlay();
    }

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisibility);
      if (hls) {
        hls.destroy();
        hls = null;
      }
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
    />
  );
});

export default BgVideo;
