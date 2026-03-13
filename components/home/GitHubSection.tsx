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
import { Button } from "@/components/ui/button";

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
      className="flex flex-col py-16 px-4 rail-bounded gap-8"
    >
      <div className="flex flex-col gap-2">
        <RevealHero className="text-3xl md:text-5xl font-black uppercase tracking-tight">
          GitHub
        </RevealHero>
        <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest max-w-xl">
          GitHub footprints and repository statistics
        </p>
      </div>

      {/* Stats Cards */}
      <Reveal>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-0 border border-border">
          <StatCard
            label="Repositories"
            value={stats.publicRepos}
            isLast={false}
          />
          <StatCard label="Stars Earned" value={stats.stars} isLast={false} />
          <StatCard label="Followers" value={stats.followers} isLast={false} />
          <StatCard label="Following" value={stats.following} isLast={false} />
          <StatCard
            label="Public Gists"
            value={stats.publicGists}
            isLast={true}
          />
        </div>
      </Reveal>

      {/* Grid for Calendar & Top Languages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-border">
        {/* Contribution Calendar */}
        <Reveal
          delay={0.1}
          className="lg:col-span-2 border-b lg:border-b-0 lg:border-r border-border p-6 bg-background"
        >
          <div className="flex flex-col h-full">
            <h3 className="text-sm font-mono uppercase tracking-widest mb-6 font-bold flex items-center">
              <span className="w-2 h-2 bg-primary mr-2" />
              Contribution Calendar
            </h3>
            <div className="flex-1 flex items-center justify-center -mx-4 sm:mx-0 overflow-x-auto">
              <GitHubContributionCalendar username={username} />
            </div>
          </div>
        </Reveal>

        {/* Top Languages */}
        {stats.topLanguages.length > 0 && (
          <Reveal
            delay={0.2}
            className="col-span-1 p-6 bg-background diagonal-pattern-subtle"
          >
            <h3 className="text-sm font-mono uppercase tracking-widest mb-6 font-bold flex items-center border-b border-dashed border-border pb-4">
              <span className="w-2 h-2 bg-foreground mr-2" />
              Top Languages
            </h3>
            <div className="flex flex-col gap-3">
              {stats.topLanguages.map((lang) => (
                <div
                  key={lang.name}
                  className="flex items-center justify-between border border-border bg-background p-3"
                >
                  <span className="font-mono text-xs uppercase tracking-widest font-bold">
                    {lang.name}
                  </span>
                  <Badge
                    variant="outline"
                    className="rounded-none border-border font-mono text-[10px]"
                  >
                    {lang.count} {lang.count === 1 ? "REC" : "RECS"}
                  </Badge>
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </div>

      {/* Recent Repositories */}
      {stats.recentRepos.length > 0 && (
        <Reveal delay={0.3}>
          <div className="flex flex-col gap-0 border border-border">
            <div className="bg-muted border-b border-border p-4">
              <h3 className="text-sm font-mono uppercase tracking-widest font-bold flex items-center">
                <span className="w-2 h-2 bg-foreground mr-2" />
                Latest Activity
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {stats.recentRepos.map((repo, index) => (
                <RepoCard
                  key={repo.name}
                  repo={repo}
                  index={index}
                  total={stats.recentRepos.length}
                />
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {/* View Profile Link */}
      <Reveal delay={0.4}>
        <div className="flex justify-center mt-4">
          <Link href={profile.githubUrl} target="_blank">
            <Button
              size="lg"
              className="rounded-none font-mono uppercase tracking-widest px-8"
            >
              <FaGithub className="w-4 h-4 mr-3" />
              Visit Profile
            </Button>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

function StatCard({
  label,
  value,
  isLast,
}: {
  label: string;
  value: number;
  isLast: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-6 bg-background dark:bg-black/[0.2] transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.02] border-r border-border last:border-r-0 md:!border-r ${isLast ? "md:!border-r-0" : ""}`}
    >
      <span className="text-3xl font-black font-sans mb-1 text-foreground">
        {value.toLocaleString()}
      </span>
      <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

function RepoCard({
  repo,
  index,
  total,
}: {
  repo: GitHubStats["recentRepos"][number];
  index: number;
  total: number;
}) {
  return (
    <Link
      href={repo.url}
      target="_blank"
      className={`flex flex-col gap-3 p-5 bg-background hover:bg-muted transition-colors group ${index % 2 === 0 ? "md:border-r" : ""} border-border ${index >= total - 2 && index >= 2 ? "" : "border-b"}`}
    >
      <div className="flex items-center gap-3">
        <FaGithub className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        <span className="font-mono text-sm uppercase tracking-wider font-bold truncate group-hover:text-primary transition-colors">
          {repo.name}
        </span>
      </div>
      {repo.description && (
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {repo.description}
        </p>
      )}
      <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-auto pt-2">
        {repo.language && (
          <span className="flex items-center gap-1.5 border border-border px-2 py-1 bg-background group-hover:border-foreground transition-colors">
            <span className="w-1.5 h-1.5 bg-foreground" />
            {repo.language}
          </span>
        )}
        {repo.stars > 0 && (
          <span className="flex items-center gap-1.5 border border-border px-2 py-1 bg-background group-hover:border-foreground transition-colors">
            <FaStar className="w-2.5 h-2.5" />
            {repo.stars}
          </span>
        )}
        {repo.forks > 0 && (
          <span className="flex items-center gap-1.5 border border-border px-2 py-1 bg-background group-hover:border-foreground transition-colors">
            <FaCodeBranch className="w-2.5 h-2.5" />
            {repo.forks}
          </span>
        )}
      </div>
    </Link>
  );
}
