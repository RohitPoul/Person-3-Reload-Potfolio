import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import menuVideo from './assets/videos/Mainn.mp4'
import main1 from './assets/videos/main1.mp4'
import main2 from './assets/videos/main2.mp4'
import main3 from './assets/videos/main3.mp4'
import bgMusic from './assets/audio/stream.flac'
import P3Menu from './components/P3Menu'
import VideoPage from './pages/VideoPage'
import ResumePage from './pages/ResumePage'
import PageTransition from './components/PageTransition'
import Socials from './components/Socials'
import AboutMe from './pages/AboutMe'
import SideProjPage from './pages/SideProjPage'
import GitHubPage from './pages/GitHubPage'
import MusicPlayer from './components/MusicPlayer'
import { useClickSound } from './hooks/useClickSound'
import './styles/App.css'


function MenuScreen() {
  const navigate = useNavigate()
  return (
    <div id="menu-screen">
      <video src={menuVideo} autoPlay loop muted playsInline />
      <P3Menu onNavigate={(page) => navigate(`/${page}`)} />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition><MenuScreen /></PageTransition>
        } />
        <Route path="/about" element={
          <PageTransition variant="about"><AboutMe /></PageTransition>
        } />
        <Route path="/resume" element={
          <PageTransition><ResumePage src={main2} /></PageTransition>
        } />
        <Route path="/github" element={
          <PageTransition><GitHubPage /></PageTransition>
        } />
        <Route path="/socials" element={
          <PageTransition variant="socials"><Socials /></PageTransition>
        } />
        <Route path="/sideproj" element={
          <PageTransition><SideProjPage /></PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  // Enable click sound globally
  useClickSound();
  
  return (
    <>
      <AnimatedRoutes />
      <MusicPlayer src={bgMusic} autoPlay={true} volume={0.4} />
    </>
  )
}