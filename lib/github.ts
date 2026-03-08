export interface GitHubStats {
  username: string;
  publicRepos: number;
  publicGists: number;
  followers: number;
  following: number;
  stars: number;
  forkedRepos: number;
  originalRepos: number;
  topLanguages: { name: string; count: number }[];
  recentRepos: {
    name: string;
    description: string | null;
    url: string;
    stars: number;
    forks: number;
    language: string | null;
    updatedAt: string;
  }[];
}

export function extractGitHubUsername(githubUrl: string): string | null {
  try {
    const url = new URL(githubUrl);
    if (!url.hostname.includes("github.com")) return null;
    const parts = url.pathname.split("/").filter(Boolean);
    return parts[0] || null;
  } catch {
    return null;
  }
}

export async function fetchGitHubStats(
  username: string,
): Promise<GitHubStats | null> {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(
        `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`,
        {
          headers,
          next: { revalidate: 3600 },
        },
      ),
    ]);

    if (!userRes.ok || !reposRes.ok) return null;

    const user = await userRes.json();
    const repos: any[] = await reposRes.json();

    const stars = repos.reduce(
      (sum: number, repo: any) => sum + (repo.stargazers_count || 0),
      0,
    );
    const forkedRepos = repos.filter((r: any) => r.fork).length;
    const originalRepos = repos.filter((r: any) => !r.fork).length;

    const langMap = new Map<string, number>();
    for (const repo of repos) {
      if (repo.language) {
        langMap.set(repo.language, (langMap.get(repo.language) || 0) + 1);
      }
    }
    const topLanguages = Array.from(langMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    const recentRepos = repos
      .filter((r: any) => !r.fork)
      .slice(0, 6)
      .map((r: any) => ({
        name: r.name,
        description: r.description,
        url: r.html_url,
        stars: r.stargazers_count,
        forks: r.forks_count,
        language: r.language,
        updatedAt: r.updated_at,
      }));

    return {
      username,
      publicRepos: user.public_repos,
      publicGists: user.public_gists,
      followers: user.followers,
      following: user.following,
      stars,
      forkedRepos,
      originalRepos,
      topLanguages,
      recentRepos,
    };
  } catch {
    return null;
  }
}
