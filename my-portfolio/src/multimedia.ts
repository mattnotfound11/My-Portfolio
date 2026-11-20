/** Content for the Multimedia section (IT 312 Multimedia Systems). */

export type Kind = 'Slides' | 'Logo' | 'Audio' | 'Sound design' | 'Poster' | 'Film' | 'Video';

export type Lab = {
  id: string;
  /** Label such as "Prelim · Lab W1". */
  tag: string;
  title: string;
  summary: string;
  due: string;
  /** What kind of work it is; picks the cover glyph. */
  kind: Kind;
  /**
   * Optional screenshot in /public/assets/multimedia (e.g. '/assets/multimedia/yaris.jpg').
   * Leave unset until the file is actually in that folder; the card shows a cover instead.
   */
  image?: string;
  /** Teammates, for group work. */
  team?: string[];
  links: { label: string; href: string }[];
};

export const SLIDE: { title: string; image?: string; href: string; note: string } = {
  title: 'UniLend: project presentation',
  image: '/assets/multimedia/unilend-slide-1.jpg',
  href: 'https://canva.link/8vgwh2p7ltj09vy',
  note: 'Canva slide deck. Click to open the full presentation.',
};

export const LABS: Lab[] = [
  {
    id: 'w1',
    tag: 'Prelim · Lab W1',
    title: 'UniLend project presentation',
    summary:
      'A slide deck pitching the project: problem statement, solution, objectives, scope and limitations, methodology, system architecture, tech stack and a Gantt roadmap. I served as project manager.',
    due: 'Jul 24, 2026',
    kind: 'Slides',
    team: ['Alexander Tolosa', 'Deghne Gabriel Agana', 'Aziel Misola'],
    links: [{ label: 'Open the deck', href: 'https://canva.link/8vgwh2p7ltj09vy' }],
  },
  {
    id: 'w2',
    tag: 'Prelim · Lab W2',
    title: 'UniServe logo & style guide',
    summary:
      'A logo for the UniServe project, built as clean vectors, with a colour and type system and exported assets (SVG, transparent PNG, favicon) plus a style-guide report.',
    due: 'Aug 5, 2026',
    kind: 'Logo',
    links: [
      {
        label: 'View files',
        href: 'https://drive.google.com/drive/folders/1wX2zD5wAVcBz1SuJXOmiR9MDpalHJUKJ?usp=share_link',
      },
    ],
  },
  {
    id: 'l1',
    tag: 'Prelim · Lab 1',
    title: 'Sampling rate & bit depth in BandLab',
    summary:
      'Compared one track at 44.1 kHz/16-bit against low-pass filtered versions at the 22.05 kHz and 8 kHz Nyquist limits, then an 8-bit crush, noting what each step removed: the bass body, the crispness, and finally the "T" sounds.',
    due: 'Aug 12, 2026',
    kind: 'Audio',
    links: [],
  },
  {
    id: 'l2',
    tag: 'Prelim · Lab 2',
    title: 'Toyota Yaris Cross: rainy-weather montage',
    summary:
      'A short cinematic montage of a Yaris Cross in rain and cloud, sound-designed with layered ambience, Foley and impact effects synced to the picture.',
    due: 'Aug 14, 2026',
    kind: 'Sound design',
    links: [
      {
        label: 'Watch the montage',
        href: 'https://drive.google.com/file/d/1ndjpGplLoYn9wBErtmSFRfCTUmgN5JMb/view',
      },
    ],
  },
  {
    id: 'm1',
    tag: 'Midterm · Lab 1',
    title: 'Research infographic poster',
    summary:
      'A research study translated into a plain-language poster with data visualisation, a clear visual hierarchy, budget and impact sections, and sources credited in the footer.',
    due: 'Sep 2, 2026',
    kind: 'Poster',
    links: [],
  },
  {
    id: 'm2',
    tag: 'Midterm · Lab 2',
    title: 'Silent movie',
    summary:
      'A short video built from our storyboard, told entirely through visuals with no dialogue, voiceover or on-screen text, using shot variety, pacing and sound effects.',
    due: 'Sep 16, 2026',
    kind: 'Film',
    team: ['Alexander Michael Tolosa', 'Deghne Gabriel Agana', 'Aziel Misola'],
    links: [
      {
        label: 'Watch the video',
        href: 'https://drive.google.com/drive/folders/1Udl0SIUp03G-CtVzkXCBZd7kwFr3GXY6',
      },
    ],
  },
  {
    id: 'm4',
    tag: 'Module 4 · Lab',
    title: 'Campus interview video',
    summary:
      'Field-shot interviews with B-roll, edited with organised project bins, lower-third graphics, ducked music under dialogue and an H.264 export.',
    due: 'Oct 2, 2026',
    kind: 'Video',
    team: ['Alexander Tolosa'],
    links: [
      {
        label: 'Watch the video',
        href: 'https://drive.google.com/drive/folders/1Aj5yPdZFEouy2fJGJlJxePsL0mf61HAM',
      },
    ],
  },
];
