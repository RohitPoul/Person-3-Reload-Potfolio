> [!NOTE]
> **Under Development** — Repository files are being cleaned up and updated gradually one by one, so not all source files here reflect the latest production build yet. Check out the live site below for the full latest version.

<div align="center">

# PERSONA 3 RELOAD PORTFOLIO

Interactive developer portfolio inspired by *Persona 3 Reload* — React 19, 1080p CMAF HLS chunked video streaming, and a route-reactive S.E.E.S. Walkman HUD.

<p>
  <a href="https://persona3.rohitpoul.workers.dev">
    <img src="https://img.shields.io/badge/LIVE_SITE-persona3.rohitpoul.workers.dev-e01e37?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Live Site" />
  </a>
</p>

<p>
  <img src="https://img.shields.io/badge/React-19-0b1021?style=flat-square&logo=react&logoColor=61DAFB" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-8-0b1021?style=flat-square&logo=vite&logoColor=646CFF" alt="Vite 8" />
  <img src="https://img.shields.io/badge/HLS-1080p_CMAF-0b1021?style=flat-square&logo=cloudflare&logoColor=7dd3fc" alt="HLS 1080p" />
  <img src="https://img.shields.io/badge/License-MIT-0b1021?style=flat-square" alt="MIT License" />
</p>

</div>

---

## Preview

![Portfolio Preview](screenshots/demo.webp)

| Main Menu | About Me |
| :---: | :---: |
| ![Main Menu](screenshots/main-menu.png) | ![About Me](screenshots/about-me.png) |

| Resume | GitHub |
| :---: | :---: |
| ![Resume](screenshots/resume.png) | ![GitHub](screenshots/github.png) |

| Projects | Socials |
| :---: | :---: |
| ![Projects](screenshots/projects.png) | ![Socials](screenshots/socials.png) |

---

## Highlights

- **5 Interactive Screens** — `About Me`, `Resume`, `GitHub` (live REST API stats), `Projects` (filterable Quest Board), and `Socials`.
- **1080p Chunked Streaming** — 2-second CMAF fMP4 HLS segments (`hls.js` Web Worker + native Safari HLS) with hover prefetching.
- **S.E.E.S. Walkman HUD** — Floating audio player with OLED equalizer, playlist drawer, and route-reactive themes.
- **Keyboard & Mouse** — `↑↓` select, `←→` switch tabs/filters, `Enter` inspect, `Esc` back.

---

## Run Locally

```bash
git clone https://github.com/RohitPoul/Person-3-Reload-Potfolio.git
cd Person-3-Reload-Potfolio
npm install
npm run dev
```

> Media assets (`public/streams/`, `src/assets/audio/`, `src/assets/images/`) are gitignored.

---

## Author

**Rohit Poul** — [Live Site](https://persona3.rohitpoul.workers.dev) · [GitHub](https://github.com/RohitPoul) · [LinkedIn](https://www.linkedin.com/in/rohit-poul-403a41289) · [Email](mailto:poulrohit258@gmail.com)

<sub>Inspired by <em>Persona 3 Reload</em> (Atlus). Licensed under MIT.</sub>
