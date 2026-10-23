import { useEffect, useMemo, useState } from 'react';

type Day = { date: string; count: number; level: number };

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Radius per contribution level, as a share of half the cell. */
const RADIUS = [0.18, 0.42, 0.6, 0.78, 0.98];

function label(d: Day) {
  const [y, m, day] = d.date.split('-').map(Number);
  const when = `${MONTHS[(m ?? 1) - 1]} ${day}, ${y}`;
  return d.count ? `${d.count} contribution${d.count === 1 ? '' : 's'} on ${when}` : `No contributions on ${when}`;
}

/**
 * The last year of GitHub contributions as a dot matrix: one column per
 * week, dot size by activity. Data comes from a public contributions API.
 */
export function DotCalendar({ username }: { username: string }) {
  const [days, setDays] = useState<Day[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((j: { contributions: Day[] }) => alive && setDays(j.contributions))
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, [username]);

  const weeks = useMemo(() => {
    if (!days?.length) return [];
    const out: (Day | null)[][] = [];
    // Pad the first week so rows line up with weekdays.
    const first = new Date(days[0]!.date + 'T00:00:00').getDay();
    let week: (Day | null)[] = Array.from({ length: first }, () => null);
    for (const d of days) {
      week.push(d);
      if (week.length === 7) {
        out.push(week);
        week = [];
      }
    }
    if (week.length) out.push(week);
    return out;
  }, [days]);

  const total = days?.reduce((n, d) => n + d.count, 0) ?? 0;

  if (failed) {
    return (
      <p className="cal-note">
        Contribution data is unavailable right now.{' '}
        <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer">
          See it on GitHub ↗
        </a>
      </p>
    );
  }

  const cell = 12;
  const w = Math.max(weeks.length, 53) * cell;
  const h = 7 * cell;

  return (
    <figure className="cal">
      <div className="cal-scroll">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          className={`cal-svg ${days ? '' : 'is-loading'}`}
          role="img"
          aria-label={days ? `${total} GitHub contributions in the last year` : 'Loading GitHub contributions'}
        >
          {(weeks.length ? weeks : Array.from({ length: 53 }, () => Array<Day | null>(7).fill(null))).map(
            (wk, x) =>
              wk.map((d, y) => (
                <circle
                  key={`${x}-${y}`}
                  cx={x * cell + cell / 2}
                  cy={y * cell + cell / 2}
                  r={(cell / 2) * RADIUS[d ? Math.min(4, d.level) : 0]!}
                  className={d && d.level > 0 ? 'cal-dot is-on' : 'cal-dot'}
                >
                  {d && <title>{label(d)}</title>}
                </circle>
              )),
          )}
        </svg>
      </div>
      <figcaption className="cal-caption">
        {days ? `${total.toLocaleString()} contributions in the last year` : 'Loading contributions…'}
      </figcaption>
    </figure>
  );
}
