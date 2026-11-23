import { useEffect, useRef } from "react";
import clickSound from "../assets/audio/sfx-click.mp3";

let sharedCtx = null;
let decodedBufferPromise = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!sharedCtx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) sharedCtx = new AudioCtx();
  }
  return sharedCtx;
}

function loadClickBuffer(soundPath) {
  if (!decodedBufferPromise) {
    decodedBufferPromise = fetch(soundPath)
      .then((res) => res.arrayBuffer())
      .then((buf) => {
        const ctx = getAudioContext();
        return ctx ? ctx.decodeAudioData(buf) : null;
      })
      .catch(() => null);
  }
  return decodedBufferPromise;
}

/**
 * Plays crisp UI click SFX using a single cached Web Audio AudioBuffer
 * (1 tiny fetch total instead of 5 parallel HTMLAudioElement loads on startup).
 */
export function useClickSound(soundPath = clickSound) {
  const bufferRef = useRef(null);

  useEffect(() => {
    let alive = true;
    loadClickBuffer(soundPath).then((buf) => {
      if (alive) bufferRef.current = buf;
    });

    const handleClick = (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;

      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.getAttribute("role") === "button" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest('[role="button"]') ||
        target.closest(".sc-bar") ||
        target.closest(".eq-bar") ||
        target.classList.contains("clickable");

      if (!isInteractive) return;

      const ctx = getAudioContext();
      const buffer = bufferRef.current;
      if (!ctx || !buffer) return;

      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }
      const source = ctx.createBufferSource();
      const gain = ctx.createGain();
      gain.gain.value = 0.3;
      source.buffer = buffer;
      source.connect(gain);
      gain.connect(ctx.destination);
      source.start(0);
    };

    document.addEventListener("click", handleClick, true);
    return () => {
      alive = false;
      document.removeEventListener("click", handleClick, true);
    };
  }, [soundPath]);
}

export function playClickSound(soundPath = clickSound, volume = 0.3) {
  const ctx = getAudioContext();
  if (!ctx) return;
  loadClickBuffer(soundPath).then((buffer) => {
    if (!buffer) return;
    if (ctx.state === "suspended") ctx.resume().catch(() => {});
    const source = ctx.createBufferSource();
    const gain = ctx.createGain();
    gain.gain.value = volume;
    source.buffer = buffer;
    source.connect(gain);
    gain.connect(ctx.destination);
    source.start(0);
  });
}
