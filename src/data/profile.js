/**
 * Portfolio Profile Data (Public Template)
 * ----------------------------------------
 * Edit this file with your own details, OR create a gitignored
 * `src/data/profile.local.js` exporting your personal overrides.
 */
const DEFAULT_PROFILE = {
  seo: {
    title: "Makoto Yuki — Persona 3 Reload Portfolio",
    description:
      "Interactive Persona 3 Reload-themed developer portfolio — Dark Hour Systems & Full-Stack Engineering.",
  },
  menuTag: {
    line1: "Makoto's",
    line2: "portfolio",
  },
  about: {
    level: "23",
    name: "MAKOTO YUKI",
    title: "S.E.E.S. LEADER • FULL-STACK DEVELOPER",
    degree: "GEKKOUKAN HIGH — CLASS 2-F",
    statusPill: "DARK HOUR READY",
    instituteLabel: "ACADEMY",
    institute: "GEKKOUKAN HIGH, TATSUMI",
    focus: "PERSONA • SYSTEMS • WEB",
    experience: "3+ YRS TARTARUS",
    bio: "Transfer student & S.E.E.S. field leader building local-first AI tools, real-time combat HUDs, and full-stack web applications.",
    meters: [
      { label: "AI", value: 92 },
      { label: "WEB", value: 88 },
    ],
    equippedSkills: [
      { name: "Orpheus", tag: "FIR", color: "#ff5c39", desc: "Initial Persona of the Fool Arcana — Agi & Bash fusion foundation." },
      { name: "Thanatos", tag: "DRK", color: "#3ce2ff", desc: "Death Arcana heavy hitter — Megidolaon & Brave Blade." },
      { name: "Messiah", tag: "ALM", color: "#61dafb", desc: "Judgement Arcana — Invigorate 3, Magic Ability, and Enduring Soul." },
      { name: "Siegfried", tag: "SLH", color: "#38d9a9", desc: "Strength Arcana — Vorpal Blade & Apt Pupil crit engine." },
    ],
    statGauges: [
      { code: "ST", label: "STRENGTH", value: 92 },
      { code: "MA", label: "MAGIC", value: 90 },
      { code: "EN", label: "ENDURANCE", value: 88 },
      { code: "AG", label: "AGILITY", value: 85 },
      { code: "LU", label: "LUCK", value: 82 },
    ],
    specializations: [
      {
        index: "01",
        title: "WILD CARD PERSONA FUSION",
        tag: "PRIMARY",
        summary: "Multi-Arcana Persona synthesis, skill inheritance routing, and Velvet Room compendium optimization.",
        stack: "Orpheus • Thanatos • Messiah • Helel • Lucifer",
      },
      {
        index: "02",
        title: "DARK HOUR TACTICAL COMMAND",
        tag: "S.E.E.S.",
        summary: "Real-time All-Out Attack coordination, Shadow weakness scanning, and Tartarus floor navigation.",
        stack: "Evoker • Theurgy • Shift • Fuuka Oracle HUD",
      },
    ],
  },
  github: {
    username: "MakotoYuki",
    displayName: "MAKOTO YUKI",
    year: "23",
    bio: "S.E.E.S. field leader shipping local-first AI tools, Tartarus recon software, and 60fps web interfaces.",
    repos: [
      {
        id: "tartarus-scanner",
        year: "'26",
        title: "TARTARUS FLOOR SCANNER",
        repoPath: "MakotoYuki/tartarus-floor-scanner",
        summary:
          "Real-time procedural floor mapping & shadow-weakness analyzer powered by OpenCV and local ONNX inference.",
        tags: [
          { tag: "C++", name: "C++ / Qt 6" },
          { tag: "CV", name: "OpenCV" },
          { tag: "ML", name: "ONNX" },
        ],
        url: "https://github.com/RohitPoul/Person-3-Reload-Potfolio",
        cta: "VIEW REPOSITORY →",
      },
      {
        id: "velvet-compendium",
        year: "'25",
        title: "VELVET COMPENDIUM",
        repoPath: "MakotoYuki/velvet-compendium",
        summary:
          "Full-stack Persona fusion calculator and skill inheritance graph built with React, FastAPI, and PostgreSQL.",
        tags: [
          { tag: "WEB", name: "React" },
          { tag: "API", name: "FastAPI" },
          { tag: "DB", name: "PostgreSQL" },
        ],
        url: "https://github.com/RohitPoul/Person-3-Reload-Potfolio",
        cta: "VIEW REPOSITORY →",
      },
      {
        id: "fuuka-oracle",
        year: "'26",
        title: "ORACLE RECON HUD",
        repoPath: "MakotoYuki/oracle-recon-hud",
        summary:
          "Low-latency telemetry overlay and automated squad callout pipeline for Dark Hour operations.",
        tags: [
          { tag: "PY", name: "Python" },
          { tag: "AI", name: "PyTorch" },
          { tag: "UI", name: "Electron" },
        ],
        url: "https://github.com/RohitPoul/Person-3-Reload-Potfolio",
        cta: "VIEW REPOSITORY →",
      },
    ],
  },
  resume: {
    educationStory:
      "Enrolled at Gekkoukan High School on Tatsumi Port Island while leading S.E.E.S. expeditions into Tartarus.",
    educationEntries: [
      {
        label: "Gekkoukan High School",
        meta: "CLASS 2-F • 2009–2010",
        headline: "Tatsumi Port Island",
        detail:
          "Transfer student & S.E.E.S. Field Leader • Focused on Arcana fusion systems, combat telemetry, and full-stack tooling.",
      },
      {
        label: "Iwatodai Dormitory Ops",
        meta: "S.E.E.S. • 2009",
        headline: "Command & Recon",
        detail:
          "Coordinated nightly Tartarus climbs, weakness indexing, and real-time squad support.",
      },
    ],
    projectsStory:
      "Built and shipped local-first recon tools, fusion calculators, and HUD overlays designed for zero latency.",
    skillsStory:
      "Full-spectrum Wild Card loadout spanning elemental magic, physical crits, and Velvet Room fusion.",
    skillsEntries: [
      {
        label: "Elemental & Almighty",
        meta: "EXPERT",
        headline: "Agidyne • Bufudyne • Ziodyne • Megidolaon",
        detail: "Coverage across every Shadow affinity for instant 1 More knockdowns.",
      },
      {
        label: "Physical & Theurgy",
        meta: "ADVANCED",
        headline: "Vorpal Blade • Scarlet Havoc • Armageddon",
        detail: "High-crit slash & pierce combos paired with S.E.E.S. Theurgy finishers.",
      },
    ],
    certificationsStory:
      "Velvet Room contracts and Gekkoukan High academic milestones completed across the Dark Hour.",
    certificationsEntries: [
      {
        label: "Velvet Room Compendium",
        meta: "RANK MAX • VELVET ROOM",
        headline: "Master of the Wild Card",
        detail: "Completed special fusion trials under Igor & Elizabeth.",
      },
    ],
    projectEntries: [
      {
        label: "Tartarus Floor Scanner",
        meta: "2026 • C++ / QT 6",
        headline: "Real-Time Shadow Recon",
        detail:
          "Native C++ & Qt 6 desktop tool powered by OpenCV and ONNX Runtime for instant floor mapping.",
      },
      {
        label: "Velvet Compendium",
        meta: "2025 • FULL-STACK",
        headline: "Persona Fusion Graph",
        detail:
          "End-to-end fusion planner built with Python, FastAPI, React, and PostgreSQL.",
      },
      {
        label: "Oracle Recon HUD",
        meta: "2026 • AUTOMATION",
        headline: "Squad Telemetry Overlay",
        detail:
          "Desktop automation overlay built with Python, Electron, and PyTorch.",
      },
    ],
  },
  projects: [
    {
      id: "tartarus",
      code: "01",
      title: "Tartarus Floor Scanner",
      category: "ai",
      year: "2026",
      status: "SHIPPED",
      summary:
        "Local computer-vision floor mapper delivering instant shadow-weakness overlays with zero cloud dependency.",
      tags: ["Python", "Deep Learning", "OpenCV", "Computer Vision"],
      url: "https://github.com/RohitPoul/Person-3-Reload-Potfolio",
    },
    {
      id: "p3rportfolio",
      code: "02",
      title: "Persona 3 Reload Portfolio",
      category: "fullstack",
      year: "2026",
      status: "LIVE",
      summary:
        "Interactive developer portfolio styled as a playable Persona 3 Reload RPG menu system with 60fps transitions and GitHub integration.",
      tags: ["React", "Vite", "HLS", "CSS HUD"],
      url: "https://github.com/RohitPoul/Person-3-Reload-Potfolio",
    },
  ],
  socials: {
    email: "makoto.yuki@sees.jp",
    githubHandle: "@MakotoYuki",
    githubUrl: "https://github.com/RohitPoul/Person-3-Reload-Potfolio",
    githubShortUrl: "github.com/RohitPoul",
    linkedinHandle: "in/makoto-yuki-sees",
    linkedinUrl: "https://github.com/RohitPoul/Person-3-Reload-Potfolio",
    linkedinShortUrl: "in/makoto-yuki",
  },
};

const useDummy = import.meta.env.VITE_USE_DUMMY === "true";
const localModules = useDummy ? {} : import.meta.glob("./profile.local.js", { eager: true });
const localOverrides = localModules["./profile.local.js"]?.default || {};

function deepMerge(base, override) {
  if (!override || typeof override !== "object" || Array.isArray(override)) {
    return override !== undefined ? override : base;
  }
  const out = { ...base };
  for (const key of Object.keys(override)) {
    if (
      override[key] &&
      typeof override[key] === "object" &&
      !Array.isArray(override[key]) &&
      base[key] &&
      typeof base[key] === "object" &&
      !Array.isArray(base[key])
    ) {
      out[key] = deepMerge(base[key], override[key]);
    } else if (override[key] !== undefined) {
      out[key] = override[key];
    }
  }
  return out;
}

export default deepMerge(DEFAULT_PROFILE, localOverrides);
