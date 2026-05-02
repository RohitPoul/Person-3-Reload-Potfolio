// GitHub API Service - Fetch real stats

const GITHUB_USERNAME = 'RohitPoul';
const GITHUB_API = 'https://api.github.com';

/**
 * Fetch GitHub user stats
 * @returns {Promise<Object>} User stats including repos, followers, stars
 */
export async function fetchGitHubStats() {
  try {
    // Fetch user data
    const userResponse = await fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`);
    if (!userResponse.ok) throw new Error('Failed to fetch user data');
    const userData = await userResponse.json();

    // Fetch repositories to count total stars
    const reposResponse = await fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}/repos?per_page=100`);
    if (!reposResponse.ok) throw new Error('Failed to fetch repos');
    const repos = await reposResponse.json();

    // Calculate total stars
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

    return {
      repos: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
      stars: totalStars,
      bio: userData.bio,
      location: userData.location,
      company: userData.company,
      blog: userData.blog,
      avatar: userData.avatar_url,
    };
  } catch (error) {
    console.error('GitHub API Error:', error);
    // Return fallback data if API fails
    return {
      repos: 10,
      followers: 5,
      following: 10,
      stars: 5,
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
  if (value >= 100) return '100+';
  if (value >= 50) return '50+';
  if (value >= 10) return '10+';
  if (value >= 5) return '5+';
  return `${value}+`;
}
