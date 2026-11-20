/** Sprite maps drawn by <Pixels>. One character per pixel; see FILL in Pixel.tsx. */

/* ── The ducks (16 × 14), facing right ────────────────── */

const DUCK_HEAD = [
  '........yyyy....',
  '.......yyyyyy...',
  '.......yyykyy...',
  '.......yyyyyyooo',
  '.......yyyyyyoo.',
  '........yyyyy...',
];
const DUCK_BLINK_HEAD = [
  '........yyyy....',
  '.......yyyyyy...',
  '.......yyyyyy...',
  '.......yyyyyyooo',
  '.......yyyyyyoo.',
  '........yyyyy...',
];
const DUCK_BODY = [
  'y......yyyyyy...',
  'yy...yyyyyyyyy..',
  'yyyyyyYYYYyyyy..',
  'yyyyyYYYYYyyyy..',
  '.yyyyyYYYyyyy...',
  '..yyyyyyyyyy....',
];

export const DUCK = {
  walkA: [...DUCK_HEAD, ...DUCK_BODY, '....o....o......', '...oo...oo......'],
  walkB: [...DUCK_HEAD, ...DUCK_BODY, '....o...o.......', '....oo..oo......'],
  /** Resting: tucked down, feet hidden. */
  sit: ['................', '................', ...DUCK_HEAD, ...DUCK_BODY],
  blink: ['................', '................', ...DUCK_BLINK_HEAD, ...DUCK_BODY],
};

export const HEART = ['.pp.pp.', 'ppppppp', 'ppppppp', '.ppppp.', '..ppp..', '...p...'];
