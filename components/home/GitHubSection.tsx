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
import {
  BookCopyIcon,
  UsersRoundIcon,
  UserPlusIcon,
  GitPullRequestIcon,
} from "lucide-react";

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
      className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-12"
    >
      <div className="space-y-3">
        <Reveal delay={0.05}>
          <span className="soft-outline inline-flex px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Engineering Signal
          </span>
        </Reveal>
        <RevealHero
          className="text-3xl font-bold sm:text-4xl md:text-5xl"
          delay={0.08}
        >
          GitHub Activity
        </RevealHero>
        <Reveal delay={0.12}>
          <p className="max-w-3xl text-balance text-muted-foreground sm:text-base">
            A live snapshot of my open-source footprint, coding consistency, and
            collaboration habits.
          </p>
        </Reveal>
      </div>

      {/* Stats Cards */}
      <Reveal>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <StatCard
            label="Repositories"
            value={stats.publicRepos}
            icon={<BookCopyIcon className="h-4 w-4" />}
          />
          <StatCard
            label="Stars Earned"
            value={stats.stars}
            icon={<FaStar className="h-3.5 w-3.5" />}
          />
          <StatCard
            label="Followers"
            value={stats.followers}
            icon={<UsersRoundIcon className="h-4 w-4" />}
          />
          <StatCard
            label="Following"
            value={stats.following}
            icon={<UserPlusIcon className="h-4 w-4" />}
          />
          <StatCard
            label="Public Gists"
            value={stats.publicGists}
            icon={<GitPullRequestIcon className="h-4 w-4" />}
          />
        </div>
      </Reveal>

      {/* Contribution Calendar */}
      <Reveal delay={0.1}>
        <div className="ambient-panel overflow-hidden p-4 sm:p-6">
          <h3 className="mb-4 text-lg font-semibold">Contribution Calendar</h3>
          <GitHubContributionCalendar username={username} />
        </div>
      </Reveal>

      {/* Top Languages */}
      {stats.topLanguages.length > 0 && (
        <Reveal delay={0.2}>
          <div className="ambient-panel p-4 sm:p-6">
            <h3 className="mb-4 text-lg font-semibold">Top Languages</h3>
            <div className="flex flex-wrap gap-2">
              {stats.topLanguages.map((lang) => (
                <Badge
                  key={lang.name}
                  variant="outline"
                  className="rounded-full border-border/80 bg-background/70 px-3 py-1 text-sm"
                >
                  {lang.name}
                  <span className="ml-1.5 text-xs text-muted-foreground">
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
          <div className="ambient-panel p-4 sm:p-6">
            <h3 className="mb-4 text-lg font-semibold">
              Recently Updated Repos
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-6 py-3 font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
          >
            <FaGithub className="w-5 h-5" />
            View Full Profile
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="group flex flex-col items-center gap-1 rounded-2xl border border-border/75 bg-card/85 p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_22px_60px_-40px_rgba(27,95,197,0.5)]">
      <span className="mb-1 rounded-full border border-border/70 bg-background/70 p-1.5 text-muted-foreground transition-colors group-hover:text-primary">
        {icon}
      </span>
      <span className="text-2xl font-extrabold text-primary sm:text-3xl">
        {value.toLocaleString()}
      </span>
      <span className="text-xs text-muted-foreground sm:text-sm">{label}</span>
    </div>
  );
}

function RepoCard({ repo }: { repo: GitHubStats["recentRepos"][number] }) {
  return (
    <Link
      href={repo.url}
      target="_blank"
      className="group flex flex-col gap-2 rounded-xl border border-border/75 bg-background/60 p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/45"
    >
      <div className="flex items-center gap-2 min-w-0">
        <FaGithub className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
        <span className="truncate font-medium transition-colors group-hover:text-primary">
          {repo.name}
        </span>
      </div>
      {repo.description && (
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {repo.description}
        </p>
      )}
      <div className="mt-auto flex items-center gap-3 text-xs text-muted-foreground">
        {repo.language && (
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-primary" />
            {repo.language}
          </span>
        )}
        {repo.stars > 0 && (
          <span className="flex items-center gap-1">
            <FaStar className="h-3 w-3" />
            {repo.stars}
          </span>
        )}
        {repo.forks > 0 && (
          <span className="flex items-center gap-1">
            <FaCodeBranch className="h-3 w-3" />
            {repo.forks}
          </span>
        )}
      </div>
    </Link>
  );
}
