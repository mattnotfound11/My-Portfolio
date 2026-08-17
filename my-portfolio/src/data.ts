/**
 * Single source of truth for portfolio content.
 * Everything here is real and verifiable — keep it that way.
 */

export const PROFILE = {
  name: 'Matthew Tabat',
  first: 'Matthew',
  last: 'Tabat',
  role: 'Software Developer & Security Analyst',
  roleShort: 'Software Developer',
  /* Stacked hero wordmark, one entry per line. */
  titleLines: ['SOFTWARE', 'DEVELOPER', '& SECURITY ANALYST'],
  location: 'Iloilo City, Philippines',
  email: 'matttabat@gmail.com',
  linkedin: 'https://www.linkedin.com/in/matthew-tabat-606096387/',
  github: 'https://github.com/mattnotfound11',
  githubHandle: 'mattnotfound11',
  school: 'University of San Agustin',
  program: 'BS Information Technology',
  year: '3rd Year',
  blurb:
    'Third-year Information Technology student at the University of San Agustin. I build web applications that solve concrete problems, and I care about the security of what I ship — starting with attendance for 800+ pharmacy students.',
} as const;

/* ── Tech stack, grouped ───────────────────────────────── */

export type StackGroup = {
  id: string;
  label: string;
  kicker: string;
  icon: 'layout' | 'server' | 'database' | 'key' | 'tools' | 'shield';
  summary: string;
  items: string[];
  /** Self-assessed confidence, deliberately honest for a 3rd-year student. */
  levels: { label: string; value: number }[];
};

export const STACK: StackGroup[] = [
  {
    id: 'frontend',
    levels: [{ label: 'React', value: 80 },{ label: 'HTML & CSS', value: 88 },{ label: 'Tailwind CSS', value: 82 },{ label: 'Next.js', value: 65 }],
    label: 'Frontend',
    kicker: 'Interfaces & Experience',
    icon: 'layout',
    summary:
      'Building responsive, accessible interfaces with React and Next.js. I care about layout that holds up on a phone, type that stays readable, and interactions that feel immediate rather than decorative.',
    items: ['HTML', 'CSS', 'React', 'Next.js', 'Tailwind CSS'],
  },
  {
    id: 'backend',
    levels: [{ label: 'Node.js & Express', value: 72 },{ label: 'Python', value: 68 },{ label: 'Java', value: 60 },{ label: 'PHP', value: 58 }],
    label: 'Backend',
    kicker: 'Servers & Logic',
    icon: 'server',
    summary:
      'Writing the server side that makes an app real — routing, business logic, and APIs. Node.js and Express are my default; I also work in Python, Java, and PHP depending on what the project calls for.',
    items: ['Node.js', 'Express', 'Python', 'Java', 'PHP'],
  },
  {
    id: 'database',
    levels: [{ label: 'Supabase', value: 78 },{ label: 'PostgreSQL', value: 70 },{ label: 'MySQL', value: 68 },{ label: 'Firebase', value: 62 }],
    label: 'Database',
    kicker: 'Data & Persistence',
    icon: 'database',
    summary:
      'Designing schemas and querying them without surprises. Relational work in PostgreSQL and MySQL, plus managed platforms like Supabase, Firebase, and Convex when speed to ship matters.',
    items: ['Supabase', 'PostgreSQL', 'MySQL', 'Firebase', 'Convex'],
  },
  {
    id: 'auth',
    levels: [{ label: 'Supabase Auth', value: 75 },{ label: 'Convex', value: 58 }],
    label: 'Authentication',
    kicker: 'Identity & Access',
    icon: 'key',
    summary:
      'Handling sign-up, sessions, and access control so the right person sees the right data. I use Supabase Auth and Convex rather than rolling my own — auth is the wrong place to be clever.',
    items: ['Supabase Auth', 'Convex'],
  },
  {
    id: 'security',
    levels: [
      { label: 'Secure auth practices', value: 68 },
      { label: 'Network fundamentals', value: 55 },
      { label: 'Threat & vuln concepts', value: 45 },
      { label: 'Packet Tracer', value: 60 },
    ],
    label: 'Security',
    kicker: 'Analysis & Defence',
    icon: 'shield',
    summary:
      'The side I am actively building. I am working through Cisco\u2019s Introduction to Cybersecurity and Hack The Box Academy, and I apply what I have so far by using vetted auth providers instead of rolling my own and by thinking about attack surface before I ship rather than after.',
    items: [
      'Cisco Packet Tracer',
      'Network Fundamentals',
      'Threat & Vulnerability Concepts',
      'Secure Authentication',
      'Hack The Box Academy',
    ],
  },
  {
    id: 'tools',
    levels: [{ label: 'Git & GitHub', value: 85 },{ label: 'Figma', value: 74 },{ label: 'Vercel', value: 80 },{ label: 'Notion', value: 82 }],
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


/* ── In-progress builds ────────────────────────────────── */

export type Building = {
  id: string;
  name: string;
  kind: string;
  image: string;
  live: string;
  repo: string;
  blurb: string;
  stack: string[];
};

/** Live but still being worked on — kept apart from shipped work. */
export const BUILDING: Building[] = [
  {
    id: 'kapigasim',
    name: 'Kapigasm Coffee',
    kind: 'Cafe website',
    image: '/assets/projects/kapigasim.jpg',
    live: 'https://kapigasim-iloilo.vercel.app',
    repo: 'https://github.com/mattnotfound11/Kapigasim-Iloilo',
    blurb:
      'Site for a coffee shop in Pueblo Concepcion, Mandurriao. Full menu with live prices, branch locations and opening hours, customer reviews, and a downloadable menu. Split into a React front end and an Express API.',
    stack: ['React', 'React Router', 'Vite', 'Tailwind CSS', 'Node.js', 'Express'],
  },
  {
    id: 'ocd-iloilo',
    name: 'OCD Iloilo',
    kind: 'Car detailing studio',
    image: '/assets/projects/ocd-iloilo.jpg',
    live: 'https://ocd-iloilo.vercel.app/',
    repo: 'https://github.com/mattnotfound11/OCD-Iloilo',
    blurb:
      'Booking site for a Gyeon-certified detailing studio. Tiered service packages with pricing, an appointment flow, photo gallery, and a scripted assistant that answers questions on services and booking.',
    stack: ['React', 'TypeScript', 'React Router', 'Vite', 'Tailwind CSS'],
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
  /** Scan of the certificate itself, cropped free of verification codes. */
  image: string;
};

export const CERTIFICATES: Certificate[] = [
  {
    id: 'aws',
    image: '/assets/certificates/aws-ai-ml-scholars.jpg',
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
  },
  {
    id: 'mcp',
    image: '/assets/certificates/mcp.jpg',
    issuer: 'Scrimba',
    name: 'Intro to Model Context Protocol (MCP)',
    year: '2026',
    description:
      'How MCP lets AI models talk to external tools and data sources through a standard interface — servers, clients, tools, and resources.',
    meta: ['12 lessons'],
  },
  {
    id: 'ui',
    image: '/assets/certificates/ui-design.jpg',
    issuer: 'Scrimba',
    name: 'Intro to UI Design Fundamentals',
    year: '2026',
    description:
      'The groundwork behind interfaces that read well: visual hierarchy, spacing systems, typography, colour, and layout decisions that hold up under scrutiny.',
    meta: ['21 lessons', '1.2 hours'],
  },
  {
    id: 'git',
    image: '/assets/certificates/git-github.jpg',
    issuer: 'Scrimba',
    name: 'Learn Git and GitHub',
    year: '2026',
    description:
      'Version control end to end — branching, merging, resolving conflicts, pull requests, and the collaboration workflow real teams run on.',
    meta: ['40 lessons', '1.7 hours'],
  },
  {
    id: 'css-vars',
    image: '/assets/certificates/css-variables.jpg',
    issuer: 'Scrimba',
    name: 'Learn CSS Variables',
    year: '2026',
    description:
      'Custom properties as the backbone of a design system — theming, scoped overrides, and keeping a stylesheet maintainable as it grows.',
    meta: ['12 lessons'],
  },
  {
    id: 'packet-tracer',
    image: '/assets/certificates/packet-tracer.jpg',
    issuer: 'Cisco Networking Academy',
    name: 'Getting Started with Cisco Packet Tracer',
    year: '2026',
    description:
      'Network simulation fundamentals — building topologies, configuring devices, and tracing how packets actually move between them.',
    meta: ['Completed 08 Aug 2026'],
  },
  {
    id: 'ai-fest',
    image: '/assets/certificates/ai-fest.jpg',
    issuer: '2026 AI Fest · DOST VI',
    name: 'AI GAME ON! — 2026 AI Fest',
    year: '2026',
    description:
      'Regional AI conference in Iloilo City organised by DOST Region VI with DICT, DTI, and the Iloilo Business Club. Attended as a delegate of ITSA.',
    meta: ['Certificate of Appearance', 'Iloilo City', '04 Aug 2026'],
    kind: 'Attended',
  },
];

/* ── Currently studying ────────────────────────────────── */

export type Learning = {
  id: string;
  issuer: string;
  name: string;
  note: string;
};

/** In progress — deliberately NOT listed among earned credentials. */
export const LEARNING: Learning[] = [
  {
    id: 'cisco-cyber',
    issuer: 'Cisco Networking Academy',
    name: 'Introduction to Cybersecurity',
    note: 'Threat landscape, attack types, and the principles behind defending networks and data.',
  },
  {
    id: 'htb',
    issuer: 'Hack The Box',
    name: 'HTB Academy — Intro',
    note: 'Hands-on offensive security fundamentals: reconnaissance, common vulnerabilities, and how attackers actually think.',
  },
];

/* ── Education ─────────────────────────────────────────── */

export type Milestone = {
  year: string;
  role: string;
  org: string;
  note?: string;
  now?: boolean;
  /** School crest, shown beside the timeline entry. */
  logo?: string;
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
  'Software Developer',
  'Security Analyst',
  'React & Next.js',
  'Full Stack',
  'BSIT Student',
  'Iloilo City, PH',
  'AWS AI & ML Scholar',
  'Supabase',
  'Open to Internships',
];
