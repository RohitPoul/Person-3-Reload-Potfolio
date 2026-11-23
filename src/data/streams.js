const base = import.meta.env.BASE_URL || "/";

export const STREAMS = {
  menu: `${base}streams/v2/menu/index.m3u8`,
  about: `${base}streams/v2/about/index.m3u8`,
  resume: `${base}streams/v2/resume/index.m3u8`,
  github: `${base}streams/v2/github/index.m3u8`,
  projects: `${base}streams/v2/projects/index.m3u8`,
  socials: `${base}streams/v2/socials/index.m3u8`,
};
