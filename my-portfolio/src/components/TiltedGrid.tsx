import * as React from 'react';

/* ── the curved row ──────────────────────────────────────────────
 * Ported from the "Tilted Grid Hero" component, with its Tailwind classes
 * moved into index.css (.tgh-*) since this project has no Tailwind.
 *
 * One row of images streams from right to left around the inside of a
 * cylinder. The centre faces you flat, the ends bend toward you so each
 * end image curves along its length, and the ends fade into the page.
 *
 * A CSS box can't bend, so every tile is cut into SLICES vertical strips,
 * each a flat facet of the cylinder showing its share of the image. The
 * strips sit still inside their tile, each turned its own few degrees
 * round the cylinder's axis, and the tile (preserve-3d) is what moves: one
 * rotateY about that same axis carries the whole tile along the arc. Only
 * a tile's delay differs, and that sets where on the arc it sits.
 * ─────────────────────────────────────────────────────────────── */

// Strips per tile; fewer starts to show corners along the edges.
const SLICES = 16;

// Camera distance from the screen, as a multiple of the cylinder's radius.
const CAMERA = 1.6;

/** Cylinder radius, as a share of the width, that puts the frame's edge `bend` radians round the arc. */
function arc(bend: number) {
  return (CAMERA - 1 + Math.cos(bend)) / (2 * CAMERA * Math.sin(bend));
}

// A tile is never wider than this share of the frame, so a phone still
// shows its neighbours instead of one tile edge to edge.
const MAX_WIDTH = 55;

/**
 * Lays the loop on the cylinder. Angles come back in degrees: `unit` is
 * the arc one tile-height spans, `limit` how far round a tile's centre can
 * go before it's off-screen, and `sweep` how far round the loop's ends sit.
 */
function measure(width: number, height: number, tile: number, aspect: number, gap: number, bend: number) {
  const h = Math.min((tile / 100) * height, ((MAX_WIDTH / 100) * width) / aspect);
  const radius = width * arc(bend);
  if (!(h > 0) || !(radius > 0)) return { columns: 2, sweep: 0, unit: 0, limit: 0 };
  const deg = (rad: number) => (rad * 180) / Math.PI;
  const unit = deg(h / radius);
  const pitch = (aspect + gap / 100) * unit;
  const limit = deg(bend) + (aspect * unit) / 2;
  // Capped so a frame squeezed to a sliver can't mount thousands of tiles.
  const columns = Math.min(60, Math.max(2, Math.ceil((2 * limit) / pitch)));
  const round = (n: number) => +n.toFixed(4);
  const sweep = round((columns * pitch) / 2);
  return { columns, sweep, unit: round(unit), limit: round(Math.min(sweep, limit)) };
}

export type TiltedGridImage = { src: string; alt?: string };

type Props = {
  /** Images run along the row in order; short lists simply repeat. */
  images: TiltedGridImage[];
  /** Seconds for the row to advance by one tile. */
  speed?: number;
  /** Tile height, as a percentage of the frame's height. */
  tileHeight?: number;
  /** Tile width divided by tile height. */
  aspectRatio?: number;
  /** Space between tiles, as a percentage of a tile's height. */
  gap?: number;
  /** Vertical centre of the row, as a percentage of the frame's height. */
  axis?: number;
  /** How far the row bends round by the frame's edge, in degrees (5–85). */
  curve?: number;
  /** Width of the fade at each end, as a percentage of the frame's width. */
  fade?: number;
  children?: React.ReactNode;
  className?: string;
};

export function TiltedGrid({
  images,
  speed = 5,
  tileHeight = 26,
  aspectRatio = 16 / 10,
  gap = 6,
  axis = 56,
  curve = 80,
  fade = 12,
  children,
  className = '',
}: Props) {
  const ref = React.useRef<HTMLDivElement>(null);
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const orbit = `tgh-o-${id}`;
  const tile = `tgh-t-${id}`;
  const bend = (Math.min(85, Math.max(5, curve)) * Math.PI) / 180;

  // Null until the observer has measured the frame, so a first paint laid
  // out for the wrong size never shows.
  const [layout, setLayout] = React.useState<ReturnType<typeof measure> | null>(null);

  // The image each tile shows. It only changes when the tile wraps, which
  // is out of sight, so a resize never swaps an image on screen.
  const [shown, setShown] = React.useState<Record<number, number>>({});

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      if (!entry) return;
      const { width, height } = entry.contentRect;
      const next = measure(width, height, tileHeight, aspectRatio, gap, bend);
      setLayout((prev) =>
        prev?.columns === next.columns && prev.sweep === next.sweep && prev.unit === next.unit ? prev : next,
      );
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [tileHeight, aspectRatio, gap, bend]);

  // Fetch every image up front; a tile picks up its next one just before
  // it comes back into view, too late to start loading it then.
  React.useEffect(() => {
    for (const { src } of images) new Image().src = src;
  }, [images]);

  const { columns, sweep, unit, limit } = layout ?? measure(1200, 560, tileHeight, aspectRatio, gap, bend);

  // Every length is a multiple of the tile's height.
  const u = (n: number) =>
    `calc(${+n.toFixed(4)} * min(${tileHeight}cqh, ${+(MAX_WIDTH / aspectRatio).toFixed(4)}cqw))`;

  const r = 100 * arc(bend);
  const radius = `${+r.toFixed(3)}cqw`;
  const turn = (deg: number) => `translateZ(${radius}) rotateY(${+deg.toFixed(4)}deg) translateZ(-${radius})`;

  // Beyond `limit` a tile is wholly off-screen, so it is hidden there.
  const hide = +(((sweep - limit) / (2 * sweep || 1)) * 100).toFixed(4);
  const css =
    `@keyframes ${orbit}{` +
    `from{transform:${turn(-sweep)}}to{transform:${turn(sweep)}}` +
    `0%,${hide}%,${100 - hide}%,100%{visibility:hidden}` +
    `${hide + 0.001}%,${100 - hide - 0.001}%{visibility:visible}}` +
    // Paused rather than removed, so the band freezes as a finished still.
    `@media(prefers-reduced-motion:reduce){.${tile}{animation-play-state:paused}}`;

  const share = aspectRatio / SLICES;
  const duration = columns * speed;
  const mask = `linear-gradient(90deg,transparent,#000 ${fade}%,#000 ${100 - fade}%,transparent)`;

  return (
    <div ref={ref} className={`tgh ${className}`.trim()} style={{ containerType: 'size' }}>
      <style>{css}</style>

      <div
        aria-hidden="true"
        className="tgh-band"
        style={{
          opacity: layout ? 1 : 0,
          perspective: `${+(r * CAMERA).toFixed(3)}cqw`,
          perspectiveOrigin: `50% ${axis}%`,
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      >
        {Array.from({ length: columns }, (_, t) => {
          // Numbers tiles in the order they come on.
          const first = columns - 1 - t;
          const img = images[(shown[t] ?? first) % Math.max(images.length, 1)];
          return (
            <div
              key={t}
              className={`${tile} tgh-tile`}
              style={{
                left: `calc(50% - ${u(aspectRatio / 2)})`,
                top: `calc(${axis}% - ${u(0.5)})`,
                width: u(aspectRatio),
                height: u(1),
                animation: `${orbit} ${duration}s linear ${-t * speed}s infinite`,
              }}
              onAnimationIteration={(e) => {
                const lap = Math.round(e.elapsedTime / duration);
                setShown((prev) => {
                  const next = lap * columns + first;
                  return prev[t] === next ? prev : { ...prev, [t]: next };
                });
              }}
            >
              {Array.from({ length: SLICES }, (_, k) => (
                <div
                  key={k}
                  className={`tgh-slice ${k === 0 ? 'tgh-slice--first' : ''} ${k === SLICES - 1 ? 'tgh-slice--last' : ''}`}
                  style={{
                    left: u((aspectRatio - share) / 2),
                    // A pixel wider than its share, so no hairline opens between facets.
                    width: k === SLICES - 1 ? u(share) : `calc(${u(share)} + 1px)`,
                    height: u(1),
                    transform: turn((aspectRatio / 2 - (k + 0.5) * share) * unit),
                  }}
                >
                  {img ? (
                    <img
                      src={img.src}
                      alt={k === 0 ? (img.alt ?? '') : ''}
                      draggable={false}
                      className="tgh-img"
                      style={{ left: u(-k * share), width: u(aspectRatio), height: u(1) }}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {children}
    </div>
  );
}
