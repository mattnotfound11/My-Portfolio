/**
 * Single source of truth for portfolio content.
 * Everything here is real and verifiable — keep it that way.
 */

export const PROFILE = {
  name: 'Matthew Tabat',
  first: 'Matthew',
  last: 'Tabat',
  role: 'Web Developer',
  location: 'Iloilo City, Philippines',
  email: 'matttabat@gmail.com',
  phone: '+63 995 957 6454',
  phoneHref: '+639959576454',
  linkedin: 'https://www.linkedin.com/in/matthew-tabat-606096387/',
  github: 'https://github.com/mattnotfound11',
  githubHandle: 'mattnotfound11',
  school: 'University of San Agustin',
  program: 'BS Information Technology',
  year: '3rd Year',
  blurb:
    'Third-year Information Technology student at the University of San Agustin. I build web applications that solve concrete problems — starting with attendance for 800+ pharmacy students.',
} as const;

/* ── Tech stack, grouped ───────────────────────────────── */

export type StackGroup = {
  id: string;
  label: string;
  kicker: string;
  icon: 'layout' | 'server' | 'database' | 'shield' | 'tools';
  summary: string;
  items: string[];
};

export const STACK: StackGroup[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    kicker: 'Interfaces & Experience',
    icon: 'layout',
    summary:
      'Building responsive, accessible interfaces with React and Next.js. I care about layout that holds up on a phone, type that stays readable, and interactions that feel immediate rather than decorative.',
    items: ['HTML', 'CSS', 'React', 'Next.js', 'Tailwind CSS'],
  },
  {
    id: 'backend',
    label: 'Backend',
    kicker: 'Servers & Logic',
    icon: 'server',
    summary:
      'Writing the server side that makes an app real — routing, business logic, and APIs. Node.js and Express are my default; I also work in Python, Java, and PHP depending on what the project calls for.',
    items: ['Node.js', 'Express', 'Python', 'Java', 'PHP'],
  },
  {
    id: 'database',
    label: 'Database',
    kicker: 'Data & Persistence',
    icon: 'database',
    summary:
      'Designing schemas and querying them without surprises. Relational work in PostgreSQL and MySQL, plus managed platforms like Supabase, Firebase, and Convex when speed to ship matters.',
    items: ['Supabase', 'PostgreSQL', 'MySQL', 'Firebase', 'Convex'],
  },
  {
    id: 'auth',
    label: 'Authentication',
    kicker: 'Identity & Access',
    icon: 'shield',
    summary:
      'Handling sign-up, sessions, and access control so the right person sees the right data. I use Supabase Auth and Convex rather than rolling my own — auth is the wrong place to be clever.',
    items: ['Supabase Auth', 'Convex'],
  },
  {
    id: 'tools',
    label: 'Developer Tools',
    kicker: 'Workflow & Delivery',
    icon: 'tools',
    summary:
      'Version control, design, and deployment. Git and GitHub for history, Figma for interface work, Vercel for shipping, and AI-assisted editors for moving faster without losing the plot.',
    items: [
      'Git',
      'GitHub',
      'Figma',
      'Notion',
      'Vercel',
      'Antigravity',
      'Cursor',
    ],
  },
];

export const TECH_COUNT = STACK.reduce((n, g) => n + g.items.length, 0);

/* ── Projects ──────────────────────────────────────────── */

export type Project = {
  id: string;
  org: string;
  title: string;
  tagline: string;
  category: string;
  image: string;
  live: string;
  summary: string;
  detail: string;
  metrics: { value: string; label: string }[];
  features: { title: string; body: string }[];
  stack: string[];
};

export const PROJECTS: Project[] = [
  {
    id: 'pharmatrack',
    org: 'University of San Agustin — Pharmacy Dept.',
    title: 'PHARMATRACK',
    tagline: 'QR attendance, done right.',
    category: 'Web Application',
    image: '/assets/pharmatrack.png',
    live: 'https://lsgph-pharmatrack.com/',
    summary:
      'No clipboards, no manual rollcalls. Students scan in seconds — facilitators see who is present, late, or absent in real time.',
    detail:
      'PHARMATRACK replaces paper attendance sheets for the University of San Agustin Pharmacy Department. Students register once with their USA student ID to receive a permanent personal QR code, then present it at any event to be logged in under a second. Facilitators watch scans land on a live dashboard and export per-event or per-student reports in one click.',
    metrics: [
      { value: '800+', label: 'Students' },
      { value: '<1s', label: 'Scan time' },
      { value: 'Live', label: 'Dashboard' },
    ],
    features: [
      {
        title: 'Register',
        body: 'Sign up with a USA student ID to get a personal, permanent QR code.',
      },
      {
        title: 'Scan',
        body: 'Present the QR at any event — logged in under a second, no app required.',
      },
      {
        title: 'Track',
        body: 'Full attendance history and event reports available instantly.',
      },
      {
        title: 'Automated reporting',
        body: 'Export per-event and per-student reports for 800+ students in one click.',
      },
      {
        title: 'Real-time dashboard',
        body: 'Facilitators see scan data the moment a QR is read — no refresh needed.',
      },
      {
        title: 'Tamper-proof records',
        body: 'Each scan ties to a unique student QR — no buddy-punching, no manual errors.',
      },
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'QR Scanning'],
  },
];

/* ── Certifications ────────────────────────────────────── */

export type Certificate = {
  id: string;
  issuer: string;
  name: string;
  year: string;
  description: string;
  meta: string[];
  /** Badge wording. Attendance records say so plainly rather than posing as skills certs. */
  kind?: 'Verified' | 'Attended';
  url?: string;
};

export const CERTIFICATES: Certificate[] = [
  {
    id: 'aws',
    issuer: 'Udacity × AWS',
    name: 'AWS AI & ML Scholars',
    year: '2026',
    description:
      'Full scholarship program covering applied AI and machine learning on AWS. Completed the AI Practitioner Challenge plus two hands-on builds: a data-analysis app and an AI productivity app, both on PartyRock and Amazon Bedrock.',
    meta: [
      'AI Practitioner Challenge',
      '2026 Challenge Completion',
      'PartyRock',
      'AI Productivity App',
    ],
    url: 'https://www.udacity.com/certificate/e/ea1c3c4a-2cbc-11f1-ba0a-2bd8b4faa744',
  },
  {
    id: 'mcp',
    issuer: 'Scrimba',
    name: 'Intro to Model Context Protocol (MCP)',
    year: '2026',
    description:
      'How MCP lets AI models talk to external tools and data sources through a standard interface — servers, clients, tools, and resources.',
    meta: ['12 lessons'],
    url: 'https://scrimba.com/@mattnotfound11:certs;cert2ffentAFPFvjm3JYDV9nxaeTqcp3zbkjez6L8wDbTQBZKf',
  },
  {
    id: 'ui',
    issuer: 'Scrimba',
    name: 'Intro to UI Design Fundamentals',
    year: '2026',
    description:
      'The groundwork behind interfaces that read well: visual hierarchy, spacing systems, typography, colour, and layout decisions that hold up under scrutiny.',
    meta: ['21 lessons', '1.2 hours'],
    url: 'https://scrimba.com/@mattnotfound11:certs;cert24zAwPPowYU9pe4Tz7BgVivDaXtcvLufctxYE',
  },
  {
    id: 'git',
    issuer: 'Scrimba',
    name: 'Learn Git and GitHub',
    year: '2026',
    description:
      'Version control end to end — branching, merging, resolving conflicts, pull requests, and the collaboration workflow real teams run on.',
    meta: ['40 lessons', '1.7 hours'],
    url: 'https://scrimba.com/@mattnotfound11:certs;cert2ffentAFPFvjm3JYDV9nxa4r8opCiJy7B9fy1w1er3fNob',
  },
  {
    id: 'css-vars',
    issuer: 'Scrimba',
    name: 'Learn CSS Variables',
    year: '2026',
    description:
      'Custom properties as the backbone of a design system — theming, scoped overrides, and keeping a stylesheet maintainable as it grows.',
    meta: ['12 lessons'],
    url: 'https://scrimba.com/@mattnotfound11:certs;cert2JbLs3qgBjtqwGaJ74KmSPLrFVBLUm7V8B9Ypd',
  },
  {
    id: 'packet-tracer',
    issuer: 'Cisco Networking Academy',
    name: 'Getting Started with Cisco Packet Tracer',
    year: '2026',
    description:
      'Network simulation fundamentals — building topologies, configuring devices, and tracing how packets actually move between them.',
    meta: ['Completed 08 Aug 2026', 'Cert ID 00702108'],
  },
  {
    id: 'ai-fest',
    issuer: '2026 AI Fest · DOST VI',
    name: 'AI GAME ON! — 2026 AI Fest',
    year: '2026',
    description:
      'Regional AI conference in Iloilo City organised by DOST Region VI with DICT, DTI, and the Iloilo Business Club. Attended as a delegate of ITSA.',
    meta: ['Certificate of Appearance', 'Iloilo City', '04 Aug 2026'],
    kind: 'Attended',
  },
];

/* ── Education ─────────────────────────────────────────── */

export type Milestone = {
  year: string;
  role: string;
  org: string;
  note?: string;
  now?: boolean;
};

export const EDUCATION: Milestone[] = [
  {
    year: 'Present',
    role: 'BS Information Technology — 3rd Year',
    org: 'University of San Agustin',
    note: 'Currently studying information technology while building and shipping web applications, including PHARMATRACK for the university’s Pharmacy Department.',
    now: true,
  },
  {
    year: 'Senior High School',
    role: 'Senior High School',
    org: 'Colegio de las Hijas de Jesus, Inc.',
  },
  {
    year: 'Junior High School',
    role: 'High School',
    org: 'Colegio de las Hijas de Jesus, Inc.',
  },
  {
    year: 'Elementary',
    role: 'Elementary',
    org: 'Colegio de las Hijas de Jesus, Inc.',
  },
];

/* ── Nav ───────────────────────────────────────────────── */

export const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'stack', label: 'Stack' },
  { id: 'work', label: 'Work' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'contact', label: 'Contact' },
] as const;

export const MARQUEE = [
  'Web Developer',
  'React & Next.js',
  'Full Stack',
  'BSIT Student',
  'Iloilo City, PH',
  'AWS AI & ML Scholar',
  'Supabase',
  'Open to Internships',
];
