// Optional BGM (gitignored — drop your own bgm-theme.mp3 into src/assets/audio/)
const bgmModules = import.meta.glob("../assets/audio/bgm-theme.mp3", {
  eager: true,
  import: "default",
});
const colorYourNight = bgmModules["../assets/audio/bgm-theme.mp3"] || "";

/**
 * Portfolio BGM Playlist
 * Add new tracks by dropping an MP3 into ../assets/audio/ and appending an entry here.
 */
export const PLAYLIST = colorYourNight
  ? [
      {
        id: "color-your-night",
        title: "COLOR YOUR NIGHT",
        artist: "Azumi Takahashi, Lotus Juice",
        tag: "P3R OST",
        duration: 223,
        src: colorYourNight,
      },
    ]
  : [];
