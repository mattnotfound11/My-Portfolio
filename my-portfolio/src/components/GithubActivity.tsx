import { useEffect, useState } from 'react';
import { PROFILE } from '../data';
import { IconGithub, IconArrow } from './Icons';

type Repo = {
  id: number;
  name: string;
  html_url: string;
  language: string | null;
  pushed_at: string;
  fork: boolean;
};

const since = (iso: string) => {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
};

/** Live public-repo activity, pulled straight from the GitHub API. */
export function GithubActivity() {
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(
      `https://api.github.com/users/${PROFILE.githubHandle}/repos?sort=pushed&per_page=100`,
      { signal: ctrl.signal },
    )
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: Repo[]) => setRepos(data.filter((r) => !r.fork)))
      .catch((e) => {
        if (e.name !== 'AbortError') setFailed(true);
      });
    return () => ctrl.abort();
  }, []);

  const top = repos?.slice(0, 4) ?? [];
  const langs = [...new Set((repos ?? []).map((r) => r.language).filter(Boolean))];

  return (
    <article className="bento-card gh-tile">
      <div className="gh-head">
        <span className="eyebrow">Live from GitHub</span>
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="gh-handle"
        >
          <IconGithub width={14} height={14} />@{PROFILE.githubHandle}
        </a>
      </div>

      {failed && <p className="gh-empty">Could not reach GitHub right now.</p>}

      {!repos && !failed && (
        <div className="gh-list">
          {[0, 1, 2, 3].map((i) => (
            <div className="gh-row is-skeleton" key={i}>
              <span className="gh-bone" />
            </div>
          ))}
        </div>
      )}

      {repos && (
        <>
          <p className="tile-big">
            {repos.length}
            <span className="gh-unit"> public repos</span>
          </p>

          <div className="gh-list">
            {top.map((r) => (
              <a
                key={r.id}
                href={r.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="gh-row"
              >
                <span className="gh-name">{r.name}</span>
                <span className="gh-meta">
                  {r.language && <span className="gh-lang">{r.language}</span>}
                  <span className="gh-when">{since(r.pushed_at)}</span>
                  <IconArrow width={12} height={12} />
                </span>
              </a>
            ))}
          </div>

          {langs.length > 0 && (
            <div className="chip-cloud" style={{ marginTop: 12 }}>
              {langs.slice(0, 6).map((l) => (
                <span className="chip" key={l}>
                  {l}
                </span>
              ))}
            </div>
          )}
        </>
      )}
    </article>
  );
}
