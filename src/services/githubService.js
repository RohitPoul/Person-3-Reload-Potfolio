// GitHub API Service - Fetch real stats with session caching
import profile from "../data/profile";

const GITHUB_USERNAME = profile.github.username;
const GITHUB_API = "https://api.github.com";
const CACHE_KEY = "p3r_gh_stats_v1";
const CACHE_TTL_MS = 10 * 60 * 1000;

let memoryCache = null;

function readSessionCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && Date.now() - parsed.ts < CACHE_TTL_MS && parsed.data) {
      return parsed.data;
    }
  } catch {
    // Ignore storage access errors
  }
  return null;
}

function writeSessionCache(data) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
  } catch {
    // Ignore storage quota/access errors
  }
}

/**
 * Fetch GitHub user stats (cached for 10 min per session to prevent rate limits)
 * @returns {Promise<Object>} User stats including repos, followers, stars
 */
export async function fetchGitHubStats() {
  if (memoryCache) return memoryCache;

  const cached = readSessionCache();
  if (cached) {
    memoryCache = cached;
    return cached;
  }

  try {
    const [userResponse, reposResponse] = await Promise.all([
      fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`),
      fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}/repos?per_page=100`),
    ]);

    if (!userResponse.ok || !reposResponse.ok) {
      throw new Error("GitHub API rate limited or unavailable");
    }

    const [userData, repos] = await Promise.all([
      userResponse.json(),
      reposResponse.json(),
    ]);

    const totalStars = Array.isArray(repos)
      ? repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0)
      : 0;

    const result = {
      repos: userData.public_repos ?? 18,
      followers: userData.followers ?? 5,
      following: userData.following ?? 10,
      stars: totalStars,
      bio: userData.bio ?? null,
      location: userData.location ?? null,
      company: userData.company ?? null,
      blog: userData.blog ?? null,
      avatar: userData.avatar_url ?? null,
    };

    memoryCache = result;
    writeSessionCache(result);
    return result;
  } catch {
    return {
      repos: 18,
      followers: 5,
      following: 10,
      stars: 38,
      bio: null,
      location: null,
      company: null,
      blog: null,
      avatar: null,
    };
  }
}

/**
 * Format number with + suffix (e.g., 10+, 50+)
 */
export function formatStatValue(value) {
  if (value >= 100) return "100+";
  if (value >= 50) return "50+";
  if (value >= 10) return "10+";
  if (value >= 5) return "5+";
  return `${value}+`;
}
