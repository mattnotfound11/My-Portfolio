import { memo, useEffect, useId, useMemo, useRef, useState } from 'react';

/* ── Types ─────────────────────────────────────────────── */

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export type ContributionData = {
  [date: string]: { level: ContributionLevel; count?: number };
};

type ThemeColors = Record<`level${ContributionLevel}`, string>;

type Props = {
  username: string;
  cellSize?: number;
  cellGap?: number;
  cellShape?: 'rounded' | 'circle';
  startsOnSunday?: boolean;
  showMonthLabels?: boolean;
};

/* Dark-canvas palette; level0 is the empty square. */
const COLORS: ThemeColors = {
  level0: '#1b1a20',
  level1: '#0e4429',
  level2: '#006d32',
  level3: '#26a641',
  level4: '#39d353',
};

/* ── Date helpers ──────────────────────────────────────── */

const parseDate = (s: string) => {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y ?? 0, (m ?? 1) - 1, d ?? 1);
};

const formatDate = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate(),
  ).padStart(2, '0')}`;

const addDays = (d: Date, n: number) => {
  const c = new Date(d);
  c.setDate(c.getDate() + n);
  return c;
};

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const FULL_MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const ordinal = (d: number) => {
  if (d > 3 && d < 21) return 'th';
  return { 1: 'st', 2: 'nd', 3: 'rd' }[d % 10] ?? 'th';
};

const tooltipDate = (s: string) => {
  const d = parseDate(s);
  return `${FULL_MONTHS[d.getMonth()]} ${d.getDate()}${ordinal(d.getDate())}`;
};

/* ── API ───────────────────────────────────────────────── */

type ApiResponse = {
  contributions: { date: string; count: number; level: number }[];
};

async function fetchContributions(user: string): Promise<ContributionData> {
  const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${user}`);
  if (!res.ok) throw new Error(`Could not load contributions (${res.status})`);
  const json: ApiResponse = await res.json();
  const out: ContributionData = {};
  for (const e of json.contributions) {
    out[e.date] = {
      level: Math.min(4, Math.max(0, e.level)) as ContributionLevel,
      count: e.count,
    };
  }
  return out;
}

/* ── Grid ──────────────────────────────────────────────── */

function buildGrid(startDate: string, endDate: string, startsOnSunday: boolean) {
  const start = parseDate(startDate);
  const end = parseDate(endDate);
  const startDow = start.getDay();
  const offset = (startDow - (startsOnSunday ? 0 : 1) + 7) % 7;

  const weeks: (string | null)[][] = [];
  const monthLabels: { label: string; weekIndex: number }[] = [];

  let current = addDays(start, -offset);
  let weekIndex = 0;
  let lastMonth = -1;

  while (current <= end) {
    const week: (string | null)[] = [];
    for (let d = 0; d < 7; d++) {
      const inRange = current >= start && current <= end;
      week.push(inRange ? formatDate(current) : null);
      if (inRange && current.getMonth() !== lastMonth) {
        lastMonth = current.getMonth();
        monthLabels.push({ label: MONTHS[current.getMonth()]!, weekIndex });
      }
      current = addDays(current, 1);
    }
    weeks.push(week);
    weekIndex++;
  }

  return { weeks, monthLabels };
}

/* ── Component ─────────────────────────────────────────── */

export const GithubCalendar = memo(function GithubCalendar({
  username,
  cellSize = 11,
  cellGap = 3,
  cellShape = 'rounded',
  startsOnSunday = true,
  showMonthLabels = true,
}: Props) {
  const id = useId().replace(/:/g, '');
  const scrollRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [data, setData] = useState<ContributionData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [gameActive, setGameActive] = useState(false);
  const [tooltip, setTooltip] = useState<{
    visible: boolean; date: string; count?: number; x: number; y: number;
  }>({ visible: false, date: '', x: 0, y: 0 });

  useEffect(() => {
    let alive = true;
    fetchContributions(username)
      .then((d) => alive && setData(d))
      .catch((e) => alive && setError(e instanceof Error ? e.message : String(e)));
    return () => { alive = false; };
  }, [username]);

  const end = formatDate(new Date());
  const start = useMemo(() => {
    const d = parseDate(end);
    d.setFullYear(d.getFullYear() - 1);
    return formatDate(addDays(d, 1));
  }, [end]);

  const { weeks, monthLabels } = useMemo(
    () => buildGrid(start, end, startsOnSunday),
    [start, end, startsOnSunday],
  );

  const stats = useMemo(() => {
    const entries = Object.entries(data ?? {});
    return {
      total: entries.reduce((n, [, v]) => n + (v.count ?? 0), 0),
      activeDays: entries.filter(([, v]) => v.level > 0).length,
    };
  }, [data]);

  const step = cellSize + cellGap;
  const labelH = showMonthLabels && !gameActive ? 18 : 0;
  const svgW = weeks.length * step - cellGap;
  const svgH = labelH + 7 * step - cellGap;
  const rx = cellShape === 'circle' ? cellSize / 2 : cellSize * 0.25;

  // Most recent weeks matter most, so park the scroll at the right edge.
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
  }, [data]);

  /* ── Space shooter ──────────────────────────────────── */
  useEffect(() => {
    const setCell = (date: string, level: number) => {
      const el = document.getElementById(`c-${id}-${date}`);
      if (!el) return;
      el.setAttribute('fill', COLORS[`level${level as ContributionLevel}`]);
      el.style.opacity = level === 0 ? '0' : '1';
    };

    if (!gameActive || !data) {
      Object.keys(data ?? {}).forEach((d) => setCell(d, data?.[d]?.level ?? 0));
      // Empty squares stay visible outside the game.
      weeks.flat().forEach((d) => {
        if (!d) return;
        const el = document.getElementById(`c-${id}-${d}`);
        if (el) el.style.opacity = '1';
      });
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const W = svgW;
    const H = svgH + 70;
    canvas.width = W;
    canvas.height = H;

    // Live level map; only lit cells are targets.
    const levels = new Map<string, number>();
    weeks.flat().forEach((d) => {
      if (!d) return;
      const lv = data[d]?.level ?? 0;
      levels.set(d, lv);
      const el = document.getElementById(`c-${id}-${d}`);
      if (el) el.style.opacity = lv === 0 ? '0' : '1';
    });

    const ship = { x: W / 2 - 15, y: H - 24, w: 26, h: 18, speed: 3.4, dir: 1 };
    let bullets: { x: number; y: number; vy: number }[] = [];
    let sparks: { x: number; y: number; vx: number; vy: number; c: string; life: number; max: number }[] = [];
    const stars = Array.from({ length: 90 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      s: Math.random() * 0.35 + 0.1, a: Math.random() * 0.5 + 0.1,
    }));

    let lastShot = 0;
    let raf = 0;

    const burst = (x: number, y: number, c: string) => {
      for (let i = 0; i < 10; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = Math.random() * 2.2 + 1;
        sparks.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, c, life: 0, max: Math.random() * 14 + 12 });
      }
    };

    const update = () => {
      // Keep the ship within the columns that still hold targets.
      let minWi = -1, maxWi = -1;
      weeks.forEach((wk, wi) => {
        wk.forEach((d) => {
          if (d && (levels.get(d) ?? 0) > 0) {
            if (minWi === -1) minWi = wi;
            minWi = Math.min(minWi, wi);
            maxWi = Math.max(maxWi, wi);
          }
        });
      });

      let minX = 0, maxX = W - ship.w;
      if (minWi !== -1) {
        minX = minWi * step;
        maxX = Math.max(minX, Math.min(W - ship.w, (maxWi + 1) * step - ship.w));
      }

      ship.x += ship.speed * ship.dir;
      if (ship.x >= maxX) { ship.x = maxX; ship.dir = -1; }
      if (ship.x <= minX) { ship.x = minX; ship.dir = 1; }

      const now = Date.now();
      if (now - lastShot >= 130) {
        bullets.push({ x: ship.x + ship.w / 2 - 1.5, y: ship.y - 4, vy: -6 });
        lastShot = now;
      }

      // Everything cleared → restore and go again.
      if (![...levels.values()].some((l) => l > 0)) {
        weeks.flat().forEach((d) => {
          if (!d) return;
          const lv = data[d]?.level ?? 0;
          levels.set(d, lv);
          setCell(d, lv);
        });
      }

      stars.forEach((s) => { s.y += s.s; if (s.y > H) { s.y = 0; s.x = Math.random() * W; } });
      bullets = bullets.filter((b) => { b.y += b.vy; return b.y > 0; });
      sparks.forEach((p) => { p.x += p.vx; p.y += p.vy; p.life++; });
      sparks = sparks.filter((p) => p.life < p.max);

      bullets.forEach((b, bi) => {
        weeks.forEach((wk, wi) => {
          wk.forEach((d, di) => {
            if (!d) return;
            const lv = levels.get(d) ?? 0;
            if (lv === 0) return;
            const cx = wi * step;
            const cy = labelH + di * step;
            if (b.x < cx + cellSize && b.x + 3 > cx && b.y < cy + cellSize && b.y + 8 > cy) {
              bullets.splice(bi, 1);
              const next = lv - 1;
              levels.set(d, next);
              setCell(d, next);
              burst(cx + cellSize / 2, cy + cellSize / 2, COLORS[`level${lv as ContributionLevel}`]);
            }
          });
        });
      });
    };

    const render = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#fff';
      stars.forEach((s) => { ctx.globalAlpha = s.a; ctx.fillRect(s.x, s.y, 1.1, 1.1); });
      ctx.globalAlpha = 1;

      ctx.fillStyle = '#ffb627';
      bullets.forEach((b) => ctx.fillRect(b.x, b.y, 3, 8));

      sparks.forEach((p) => {
        ctx.fillStyle = p.c;
        ctx.globalAlpha = 1 - p.life / p.max;
        ctx.fillRect(p.x, p.y, 2, 2);
      });
      ctx.globalAlpha = 1;

      ctx.fillStyle = '#7c5cff';
      ctx.shadowColor = '#7c5cff';
      ctx.shadowBlur = 7;
      ctx.beginPath();
      ctx.moveTo(ship.x + ship.w / 2, ship.y);
      ctx.lineTo(ship.x + ship.w, ship.y + ship.h);
      ctx.lineTo(ship.x + ship.w * 0.7, ship.y + ship.h * 0.75);
      ctx.lineTo(ship.x + ship.w * 0.3, ship.y + ship.h * 0.75);
      ctx.lineTo(ship.x, ship.y + ship.h);
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    const loop = () => { update(); render(); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [gameActive, data, weeks, step, cellSize, labelH, svgW, svgH, id]);

  /* ── Render ─────────────────────────────────────────── */

  if (error) {
    return <p className="gh-empty">{error}</p>;
  }

  return (
    <div className={`ghcal ${gameActive ? 'is-game' : ''}`}>
      <div className="ghcal-scroll" ref={scrollRef}>
        <svg width={svgW} height={svgH} className="ghcal-svg">
          {showMonthLabels && !gameActive &&
            (() => {
              const seen: { label: string; weekIndex: number }[] = [];
              monthLabels.forEach((m) => {
                const last = seen[seen.length - 1];
                if (!last || m.weekIndex - last.weekIndex >= 3) seen.push(m);
              });
              return seen.map((m) => (
                <text key={`${m.label}-${m.weekIndex}`} x={m.weekIndex * step} y={10} className="ghcal-month">
                  {m.label}
                </text>
              ));
            })()}

          {weeks.map((week, wi) =>
            week.map((date, di) => {
              if (!date) return null;
              const entry = data?.[date];
              const level = entry?.level ?? 0;
              return (
                <rect
                  key={`${wi}-${di}`}
                  id={`c-${id}-${date}`}
                  x={wi * step}
                  y={labelH + di * step}
                  width={cellSize}
                  height={cellSize}
                  rx={rx}
                  fill={COLORS[`level${level}`]}
                  className="ghcal-cell"
                  onMouseEnter={() =>
                    !gameActive &&
                    setTooltip({ visible: true, date, count: entry?.count, x: wi * step + cellSize / 2, y: labelH + di * step })
                  }
                  onMouseLeave={() => setTooltip((t) => ({ ...t, visible: false }))}
                />
              );
            }),
          )}
        </svg>

        {gameActive && <canvas ref={canvasRef} className="ghcal-canvas" style={{ width: svgW, height: svgH + 70 }} />}

        {tooltip.visible && (
          <div className="ghcal-tip" style={{ left: tooltip.x, top: tooltip.y }}>
            {tooltip.count
              ? `${tooltip.count} contribution${tooltip.count !== 1 ? 's' : ''} on ${tooltipDate(tooltip.date)}`
              : `No contributions on ${tooltipDate(tooltip.date)}`}
          </div>
        )}
      </div>

      <div className="ghcal-foot">
        <div className="ghcal-legend">
          <span>Less</span>
          {([0, 1, 2, 3, 4] as ContributionLevel[]).map((l) => (
            <svg key={l} width={cellSize} height={cellSize} aria-hidden="true">
              <rect width={cellSize} height={cellSize} rx={rx} fill={COLORS[`level${l}`]} />
            </svg>
          ))}
          <span>More</span>
        </div>

        <button
          type="button"
          className={`ghcal-toggle ${gameActive ? 'is-on' : ''}`}
          onClick={() => setGameActive((v) => !v)}
          aria-pressed={gameActive}
        >
          <span className="ghcal-knob" />
          <span className="ghcal-toggle-label">Game mode</span>
        </button>

        <p className="ghcal-stats">
          <strong>{stats.total.toLocaleString()}</strong> contributions ·{' '}
          <strong>{stats.activeDays}</strong> active days
        </p>
      </div>
    </div>
  );
});

export default GithubCalendar;
