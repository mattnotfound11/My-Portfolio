/**
 * Tiny pixel-art renderer. Each sprite is a list of equal-length rows where
 * every character is one pixel:
 *   X = ink (current text colour)   p = blush pink   w = paper (page bg)
 *   y = duck yellow   Y = wing shade   o = beak orange   k = eye (always dark)
 *   . = transparent
 */

const FILL: Record<string, string> = {
  X: 'currentColor',
  p: '#f2a7bc',
  w: 'var(--bg)',
  y: '#ffd43b',
  Y: '#f2b705',
  o: '#f08c00',
  k: '#1b1b1f',
};

export function Pixels({
  map,
  scale = 3,
  className = '',
  title,
}: {
  map: string[];
  scale?: number;
  className?: string;
  title?: string;
}) {
  const h = map.length;
  const w = map[0]?.length ?? 0;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w * scale}
      height={h * scale}
      shapeRendering="crispEdges"
      className={`pixels ${className}`.trim()}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {map.flatMap((row, y) =>
        [...row].map((c, x) =>
          FILL[c] ? <rect key={`${x}-${y}`} x={x} y={y} width="1.02" height="1.02" fill={FILL[c]} /> : null,
        ),
      )}
    </svg>
  );
}
