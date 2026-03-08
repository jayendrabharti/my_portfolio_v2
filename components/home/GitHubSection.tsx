import { getPayloadInstance } from "@/payload";
import {
  extractGitHubUsername,
  fetchGitHubStats,
  GitHubStats,
} from "@/lib/github";
import GitHubContributionCalendar from "./GitHubContributionCalendar";
import Reveal from "@/components/animations/Reveal";
import RevealHero from "@/components/animations/RevealHero";
import Link from "next/link";
import { FaGithub, FaStar, FaCodeBranch } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";

export default async function GitHubSection() {
  const payload = await getPayloadInstance();
  const profile = await payload.findGlobal({ slug: "profile" });

  if (!profile.githubUrl) return null;

  const username = extractGitHubUsername(profile.githubUrl);
  if (!username) return null;

  const stats = await fetchGitHubStats(username);
  if (!stats) return null;

  return (
    <section
      id="github"
      className="flex flex-col py-16 px-4 max-w-4xl mx-auto w-full gap-6"
    >
      <div>
        <RevealHero className="text-3xl md:text-5xl font-bold">
          GitHub Activity
        </RevealHero>
        <p className="text-muted-foreground">
          My open source contributions and coding activity
        </p>
      </div>

      {/* Stats Cards */}
      <Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          <StatCard label="Repositories" value={stats.publicRepos} />
          <StatCard label="Stars Earned" value={stats.stars} />
          <StatCard label="Followers" value={stats.followers} />
          <StatCard label="Following" value={stats.following} />
          <StatCard label="Public Gists" value={stats.publicGists} />
        </div>
      </Reveal>

      {/* Contribution Calendar */}
      <Reveal delay={0.1}>
        <div className="rounded-xl border border-border bg-card p-4 sm:p-6 overflow-hidden">
          <h3 className="text-lg font-semibold mb-4">Contribution Calendar</h3>
          <GitHubContributionCalendar username={username} />
        </div>
      </Reveal>

      {/* Top Languages */}
      {stats.topLanguages.length > 0 && (
        <Reveal delay={0.2}>
          <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
            <h3 className="text-lg font-semibold mb-4">Top Languages</h3>
            <div className="flex flex-wrap gap-2">
              {stats.topLanguages.map((lang) => (
                <Badge
                  key={lang.name}
                  variant="secondary"
                  className="text-sm px-3 py-1"
                >
                  {lang.name}
                  <span className="ml-1.5 text-muted-foreground text-xs">
                    {lang.count} {lang.count === 1 ? "repo" : "repos"}
                  </span>
                </Badge>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {/* Recent Repositories */}
      {stats.recentRepos.length > 0 && (
        <Reveal delay={0.3}>
          <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
            <h3 className="text-lg font-semibold mb-4">
              Recently Updated Repos
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {stats.recentRepos.map((repo) => (
                <RepoCard key={repo.name} repo={repo} />
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {/* View Profile Link */}
      <Reveal delay={0.4}>
        <div className="flex justify-center">
          <Link
            href={profile.githubUrl}
            target="_blank"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-card hover:border-primary transition-all duration-300 hover:scale-105 font-medium"
          >
            <FaGithub className="w-5 h-5" />
            View Full Profile
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl border border-border bg-card p-4 text-center transition-all duration-300 hover:border-primary hover:shadow-sm">
      <span className="text-2xl sm:text-3xl font-bold text-primary">
        {value.toLocaleString()}
      </span>
      <span className="text-xs sm:text-sm text-muted-foreground">{label}</span>
    </div>
  );
}

function RepoCard({ repo }: { repo: GitHubStats["recentRepos"][number] }) {
  return (
    <Link
      href={repo.url}
      target="_blank"
      className="flex flex-col gap-2 rounded-lg border border-border p-3 hover:border-primary transition-all duration-300 group"
    >
      <div className="flex items-center gap-2 min-w-0">
        <FaGithub className="w-4 h-4 flex-shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
        <span className="font-medium truncate group-hover:text-primary transition-colors">
          {repo.name}
        </span>
      </div>
      {repo.description && (
        <p className="text-sm text-muted-foreground line-clamp-2">
          {repo.description}
        </p>
      )}
      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto">
        {repo.language && (
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-primary" />
            {repo.language}
          </span>
        )}
        {repo.stars > 0 && (
          <span className="flex items-center gap-1">
            <FaStar className="w-3 h-3" />
            {repo.stars}
          </span>
        )}
        {repo.forks > 0 && (
          <span className="flex items-center gap-1">
            <FaCodeBranch className="w-3 h-3" />
            {repo.forks}
          </span>
        )}
      </div>
    </Link>
  );
}
