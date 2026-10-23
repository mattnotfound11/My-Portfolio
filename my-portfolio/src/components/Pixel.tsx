/**
 * Tiny pixel-art renderer. Each sprite is a list of equal-length rows where
 * every character is one pixel:
 *   X = ink (current text colour)   p = blush pink   w = paper (page bg)
 *   y = warm yellow                 . = transparent
 */

const FILL: Record<string, string> = {
  X: 'currentColor',
  p: '#f2a7bc',
  w: 'var(--bg)',
  y: '#f5c451',
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

/* ── Collab icons (12 × 12) ────────────────────────────── */

export const ICONS = {
  /** Browser window with a heart: websites. */
  web: [
    'XXXXXXXXXXXX',
    'XpXyX......X',
    'XXXXXXXXXXXX',
    'X..........X',
    'X..pp.pp...X',
    'X.ppppppp..X',
    'X.ppppppp..X',
    'X..ppppp...X',
    'X...ppp....X',
    'X....p.....X',
    'X..........X',
    'XXXXXXXXXXXX',
  ],
  /** Pencil drawing a line: UI/UX design. */
  design: [
    '.........XX.',
    '........XppX',
    '.......XXppX',
    '......X..XX.',
    '.....X..X...',
    '....X..X....',
    '...X..X.....',
    '..XXXX......',
    '..XyX.......',
    '..XX........',
    '............',
    'XXX..XXX..XX',
  ],
  /** Trophy: hackathons. */
  trophy: [
    'XXXXXXXXXXXX',
    'XyyyyyyyyyyX',
    '.XyyyyyyyyX.',
    'XXyyyyyyyyXX',
    'X.XyyyyyyX.X',
    '.X.XyyyyX.X.',
    '....XyyX....',
    '.....XX.....',
    '.....XX.....',
    '....XXXX....',
    '...XyyyyX...',
    '...XXXXXX...',
  ],
  /** Card with tap waves: NFC cards. */
  nfc: [
    '............',
    '.XXXXXXXXX..',
    '.X.......X..',
    '.X.yy....X.X',
    '.X.yy..X.X..',
    '.X....X..X.X',
    '.X.....X.X..',
    '.X.......X.X',
    '.XXXXXXXXX..',
    '............',
    '............',
    '............',
  ],
  /** Shield with a paw: security study buddies. */
  shield: [
    '.XXXXXXXXXX.',
    'X..........X',
    'X..X....X..X',
    'X..........X',
    'X.X..XX..X.X',
    'X....pp....X',
    'X...pppp...X',
    '.X..pppp..X.',
    '.X........X.',
    '..X......X..',
    '...X....X...',
    '....XXXX....',
  ],
  /** Little envelope with a heart seal. */
  mail: [
    '............',
    'XXXXXXXXXXXX',
    'XX........XX',
    'X.X......X.X',
    'X..X....X..X',
    'X...XppX...X',
    'X...pppp...X',
    'X....pp....X',
    'X..........X',
    'XXXXXXXXXXXX',
    '............',
    '............',
  ],
  paw: [
    '..XX....XX..',
    '..XX....XX..',
    'XX..XXXX..XX',
    'XX..XXXX..XX',
    '............',
    '...XXXXXX...',
    '..XXXXXXXX..',
    '.XXXXXXXXXX.',
    '.XXXXXXXXXX.',
    '..XXX..XXX..',
    '............',
    '............',
  ],
} satisfies Record<string, string[]>;

/* ── Byte the cat (16 × 12), facing right ──────────────── */

const HEAD = [
  '...........X..X.',
  'X..........XXXX.',
  'X.........XXXXXX',
  '.X........XXwXwX',
  '.X........XXXpXX',
];

export const CAT = {
  walkA: [
    ...HEAD,
    '..XXXXXXXXXXXXX.',
    '..XXXXXXXXXXXX..',
    '..XXXXXXXXXXXX..',
    '...XXXXXXXXXX...',
    '...X.X....X.X...',
    '..X...X..X...X..',
    '................',
  ],
  walkB: [
    ...HEAD,
    '..XXXXXXXXXXXXX.',
    '..XXXXXXXXXXXX..',
    '..XXXXXXXXXXXX..',
    '...XXXXXXXXXX...',
    '...X.X....X.X...',
    '...X.X....X.X...',
    '................',
  ],
  sit: [
    '...........X..X.',
    '...........XXXX.',
    '..........XXXXXX',
    '..........XXwXwX',
    'XX........XXXpXX',
    '..X......XXXXXX.',
    '..X....XXXXXXXX.',
    '...X..XXXXXXXXX.',
    '....XXXXXXXXXXX.',
    '....XXXXXXXXXXX.',
    '.....XXX.XX.XX..',
    '................',
  ],
  blink: [
    '...........X..X.',
    '...........XXXX.',
    '..........XXXXXX',
    '..........XXXXXX',
    'XX........XXXpXX',
    '..X......XXXXXX.',
    '..X....XXXXXXXX.',
    '...X..XXXXXXXXX.',
    '....XXXXXXXXXXX.',
    '....XXXXXXXXXXX.',
    '.....XXX.XX.XX..',
    '................',
  ],
};

export const HEART = ['.pp.pp.', 'ppppppp', 'ppppppp', '.ppppp.', '..ppp..', '...p...'];
