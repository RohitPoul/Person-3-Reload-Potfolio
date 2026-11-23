import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import statusPoster from "./assets/images/posters/poster-status.avif";
import resumePoster from "./assets/images/posters/poster-resume.avif";
import githubPoster from "./assets/images/posters/poster-github.avif";
import equipPoster from "./assets/images/posters/poster-equip.avif";
import projectsPoster from "./assets/images/posters/poster-projects.avif";
import { PLAYLIST } from "./data/playlist";
import { STREAMS } from "./data/streams";
import profile from "./data/profile";
import { preloadImpact } from "./data/impacts";
import BgVideo, { prefetchStream } from "./components/BgVideo";
import P3Menu from "./components/P3Menu";
import PageTransition from "./components/PageTransition";
import MusicPlayer from "./components/MusicPlayer";
import { useClickSound } from "./hooks/useClickSound";
import "./styles/App.css";

const loadAbout = () => import("./pages/AboutMe");
const loadResume = () => import("./pages/ResumePage");
const loadGitHub = () => import("./pages/GitHubPage");
const loadSocials = () => import("./components/Socials");
const loadSideProj = () => import("./pages/SideProjPage");

const AboutMe = lazy(loadAbout);
const ResumePage = lazy(loadResume);
const GitHubPage = lazy(loadGitHub);
const Socials = lazy(loadSocials);
const SideProjPage = lazy(loadSideProj);

const prefetchedChunks = new Set();
const prefetchedPosters = new Set();
const ROUTE_PREFETCH = {
  about: { load: loadAbout, poster: statusPoster, stream: STREAMS.about },
  resume: { load: loadResume, poster: resumePoster, stream: STREAMS.resume },
  github: { load: loadGitHub, poster: githubPoster, stream: STREAMS.github },
  socials: { load: loadSocials, poster: equipPoster, stream: STREAMS.socials },
  sideproj: { load: loadSideProj, poster: projectsPoster, stream: STREAMS.projects },
};

function prefetchRoute(page) {
  const entry = ROUTE_PREFETCH[page];
  if (!entry) return;
  if (!prefetchedChunks.has(page)) {
    prefetchedChunks.add(page);
    entry.load().catch(() => {});
  }
  if (entry.poster && !prefetchedPosters.has(page)) {
    prefetchedPosters.add(page);
    const img = new Image();
    img.src = entry.poster;
  }
  if (entry.stream) {
    prefetchStream(entry.stream);
  }
  preloadImpact(page);
}

function MenuScreen() {
  const navigate = useNavigate();

  // Warm-decode the default active route's sakuga impact frames so even an instant click has 0ms lag
  useEffect(() => {
    preloadImpact("about");
  }, []);

  return (
    <div id="menu-screen" style={{ background: "#051348" }}>
      <BgVideo src={STREAMS.menu} />
      <P3Menu
        onNavigate={(page) => navigate(`/${page}`)}
        onPrefetch={prefetchRoute}
      />
    </div>
  );
}

function RouteFallback() {
  return <div id="menu-screen" style={{ background: "#051348" }} />;
}

function AppRoutes() {
  const location = useLocation();
  const variant =
    location.pathname === "/"
      ? "menu"
      : location.pathname.slice(1);

  return (
    <PageTransition key={location.pathname} variant={variant}>
      <Suspense fallback={<RouteFallback />}>
        <Routes location={location}>
          <Route path="/" element={<MenuScreen />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/github" element={<GitHubPage />} />
          <Route path="/socials" element={<Socials />} />
          <Route path="/sideproj" element={<SideProjPage />} />
        </Routes>
      </Suspense>
    </PageTransition>
  );
}

export default function App() {
  useClickSound();

  useEffect(() => {
    if (profile?.seo?.title) document.title = profile.seo.title;
  }, []);

  // Prevent accidental double/triple-click text & image highlighting while keeping click-drag copy intact
  useEffect(() => {
    const preventDblClickSelect = (e) => {
      if (e.detail > 1) e.preventDefault();
    };
    document.addEventListener("mousedown", preventDblClickSelect);
    return () => document.removeEventListener("mousedown", preventDblClickSelect);
  }, []);

  return (
    <>
      <main style={{ width: "100%", height: "100%" }}>
        <AppRoutes />
      </main>
      <div className="p3-atlus-credit" aria-label="Asset attribution">
        Persona 3 Reload assets © ATLUS / SEGA
      </div>
      <MusicPlayer tracks={PLAYLIST} autoPlay={true} initialVolume={0.4} />
    </>
  );
}
