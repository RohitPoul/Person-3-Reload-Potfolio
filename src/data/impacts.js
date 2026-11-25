import about1 from "../assets/images/impact/about-1.webp";
import about2 from "../assets/images/impact/about-2.webp";
import resume1 from "../assets/images/impact/resume-1.webp";
import resume2 from "../assets/images/impact/resume-2.webp";
import github1 from "../assets/images/impact/github-1.webp";
import github2 from "../assets/images/impact/github-2.webp";
import sideproj1 from "../assets/images/impact/sideproj-1.webp";
import sideproj2 from "../assets/images/impact/sideproj-2.webp";
import socials1 from "../assets/images/impact/socials-1.webp";
import socials2 from "../assets/images/impact/socials-2.webp";

export const IMPACT_FRAMES = {
  about: {
    bg: "#062536",
    origin: "65% 4%",
    f1: about1,
    f2: about2,
  },
  resume: {
    bg: "#1b1e23",
    origin: "66% 72%",
    f1: resume1,
    f2: resume2,
  },
  github: {
    bg: "#260715",
    origin: "65% 4%",
    f1: github1,
    f2: github2,
  },
  sideproj: {
    bg: "#18121c",
    origin: "65% 4%",
    f1: sideproj1,
    f2: sideproj2,
  },
  socials: {
    bg: "#17160b",
    origin: "68% 62%",
    f1: socials1,
    f2: socials2,
  },
};

const decodedUrls = new Set();

/**
 * Preload & GPU-decode both sakuga impact frames on hover so page-enter cuts fire with 0ms lag.
 */
export function preloadImpact(variant) {
  const entry = IMPACT_FRAMES[variant];
  if (!entry) return;
  for (const url of [entry.f1, entry.f2]) {
    if (!url || decodedUrls.has(url)) continue;
    decodedUrls.add(url);
    const img = new Image();
    img.decoding = "async";
    img.src = url;
    if (typeof img.decode === "function") {
      img.decode().catch(() => {});
    }
  }
}
