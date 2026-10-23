import { useEffect, useState } from 'react';
import ActivityHeatmap, { type ActivityDay } from '@/components/ui/activity-heatmap';

/** The API rate-limits, so a tab keeps what it fetched for an hour. */
const CACHE_MS = 60 * 60 * 1000;

/** The last year of GitHub contributions, from a public contributions API. */
export function GithubActivity({ username }: { username: string }) {
  const [days, setDays] = useState<ActivityDay[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    const key = `mt-gh-${username}`;
    try {
      const hit = JSON.parse(sessionStorage.getItem(key) ?? 'null') as { at: number; days: ActivityDay[] } | null;
      if (hit && Date.now() - hit.at < CACHE_MS) {
        setDays(hit.days);
        return;
      }
    } catch {
      /* no cache available: fetch below */
    }
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((j: { contributions: ActivityDay[] }) => {
        const next = j.contributions.map(({ date, count }) => ({ date, count }));
        try {
          sessionStorage.setItem(key, JSON.stringify({ at: Date.now(), days: next }));
        } catch {
          /* fine: it just refetches next time */
        }
        if (alive) setDays(next);
      })
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, [username]);

  if (failed) {
    return (
      <p className="gh-note">
        Contribution data is unavailable right now.{' '}
        <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer">
          See it on GitHub ↗
        </a>
      </p>
    );
  }

  if (!days) return <p className="gh-note">Loading contributions…</p>;

  return (
    <ActivityHeatmap
      days={days}
      label="GitHub contributions in the last year"
      period="the last year"
      selectedDate={selected}
      onSelectDate={setSelected}
    />
  );
}
