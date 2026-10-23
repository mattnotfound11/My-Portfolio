/**
 * Single source of truth for portfolio content.
 * Everything here is real and verifiable — keep it that way.
 */

export const PROFILE = {
  name: 'Matthew Tabat',
  fullName: 'Matthew P. Tabat',
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
    "Third-year BS Information Technology student at the University of San Agustin. I build web applications that solve concrete problems, with a focus on security in everything I ship. I create websites as a way to sharpen my skills and deepen my technical knowledge, and I'm driven to apply what I learn toward a future career in the field.",
} as const;

/* ── Tech stack, grouped ───────────────────────────────── */

export type StackGroup = {
  id: string;
  label: string;
  kicker: string;
  icon: 'layout' | 'server' | 'database' | 'key' | 'tools' | 'shield';
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
    items: ['CSS', 'React', 'Next.js', 'Tailwind CSS'],
  },
  {
    id: 'backend',
    label: 'Backend',
    kicker: 'Servers & Logic',
    icon: 'server',
    summary:
      'Writing the server side that makes an app real — routing, business logic, and APIs. Node.js and Express are my default; I also work in Python and Java depending on what the project calls for.',
    items: ['Node.js', 'Express', 'Python', 'Java'],
  },
  {
    id: 'database',
    label: 'Database',
    kicker: 'Data & Persistence',
    icon: 'database',
    summary:
      'Designing schemas and querying them without surprises. Relational work in PostgreSQL and MySQL, plus managed platforms like Supabase when speed to ship matters.',
    items: ['Supabase', 'PostgreSQL', 'MySQL'],
  },
  {
    id: 'auth',
    label: 'Authentication',
    kicker: 'Identity & Access',
    icon: 'key',
    summary:
      'Handling sign-up, sessions, and access control so the right person sees the right data. I use Supabase Auth rather than rolling my own — auth is the wrong place to be clever.',
    items: ['Supabase Auth'],
  },
  {
    id: 'security',
    label: 'Security',
    kicker: 'Analysis & Defence',
    icon: 'shield',
    summary:
      'The side I am actively building. I am working through Cisco\u2019s Introduction to Cybersecurity, and I apply what I have so far by using vetted auth providers instead of rolling my own and by thinking about attack surface before I ship rather than after.',
    items: ['Cisco Packet Tracer'],
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
  /** Real screens from the live site, shown in the coverflow carousel. */
  shots: { src: string; alt: string; title: string; subtitle: string }[];
  live: string;
  summary: string;
  detail: string;
  /** What I actually did here, kept separate from what the product does. */
  role: string;
  roleNote: string;
  metrics: { value: string; label: string }[];
  features: { title: string; body: string }[];
  /** The product's stack, not a claim about my own contribution. */
  stack: string[];
};

export const PROJECTS: Project[] = [
  {
    id: 'pharmatrack',
    org: 'University of San Agustin — Pharmacy Dept.',
    title: 'PHARMATRACK',
    tagline: 'QR attendance, done right.',
    category: 'Web Application',
    shots: [
      {
        src: '/assets/pharmatrack/01-landing.jpg',
        alt: 'PHARMATRACK landing page with the QR attendance headline',
        title: 'Landing',
        subtitle: 'Public entry point',
      },
      {
        src: '/assets/pharmatrack/02-flow.jpg',
        alt: 'Register, scan and track steps beside the key features panel',
        title: 'How it works',
        subtitle: 'Register → Scan → Track',
      },
      {
        src: '/assets/pharmatrack/03-register.jpg',
        alt: 'Student and facilitator registration form',
        title: 'Create account',
        subtitle: 'Student or facilitator',
      },
      {
        src: '/assets/pharmatrack/04-login.jpg',
        alt: 'PHARMATRACK secure log in screen',
        title: 'Secure log in',
        subtitle: 'USA email accounts',
      },
    ],
    live: 'https://lsgph-pharmatrack.com/',
    summary:
      'No clipboards, no manual rollcalls. Students scan in seconds — facilitators see who is present, late, or absent in real time.',
    detail:
      'PHARMATRACK replaces paper attendance sheets for the University of San Agustin Pharmacy Department. Students register once with their USA student ID to receive a permanent personal QR code, then present it at any event to be logged in under a second. Facilitators watch scans land on a live dashboard and export per-event or per-student reports in one click.',
    role: 'UI/UX Design',
    roleNote:
      'I designed the interface and the user flows — the screens in the deck above, and the path a student takes from registering to being scanned in.',
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
  /** Omitted for private repos, which would 404 for visitors. */
  repo?: string;
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
  {
    id: 'decoforge',
    name: 'Decoforge Baguio',
    kind: 'Interior finishes supplier',
    image: '/assets/projects/decoforge.jpg',
    live: 'https://decoforge-baguio.vercel.app',
    repo: 'https://github.com/mattnotfound11/Decoforge-Baguio',
    blurb:
      'Catalog and booking site for a UV marble, PVC ceiling, fluted panel, and WPC decking supplier in Irisan, Baguio City. Priced materials catalog, project gallery, and a consultation booking form that degrades honestly when email delivery is not configured.',
    stack: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Resend'],
  },
  {
    id: 'locket',
    name: 'Locket',
    kind: 'Bakery storefront',
    image: '/assets/projects/locket.jpg',
    live: 'https://locket-bakes.vercel.app',
    repo: 'https://github.com/mattnotfound11/Locket',
    blurb:
      'Storefront and ordering system for a bakery in Jaro, Iloilo City. Product catalog with allergen and nutrition panels, a pickup-slot picker, custom cake orders, and order tracking by reference. Pricing runs on integer centavos, and the business rules sit outside React so they can be tested without a browser.',
    stack: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Vitest'],
  },
  {
    id: 'sage-esports',
    name: 'SAGE Esports',
    kind: 'Esports organization',
    image: '/assets/projects/sage-esports.jpg',
    live: 'https://sage-esports.vercel.app',
    blurb:
      'Official website for San Agustin Golden Eagle Esports (SAGE), the esports organization of the University of San Agustin. Match schedules, results, rosters, news, a merch shop, and a staff dashboard, backed by an Express API.',
    stack: ['Next.js', 'Express', 'Supabase'],
  },
  {
    id: 'misobooth',
    name: 'Miso Booth',
    kind: 'Pop-up photobooth',
    image: '/assets/projects/misobooth.jpg',
    live: 'https://misobooth.vercel.app',
    blurb:
      'Site for a vintage-style pop-up photobooth in Iloilo City. Rotating themed frames, photo strips, a gallery, and private bookings for weddings, birthdays, debuts, and corporate events.',
    stack: ['React', 'Vite'],
  },
  {
    id: 'clutch',
    name: 'Clutch Cafe',
    kind: 'Car-themed cafe',
    image: '/assets/projects/clutch.jpg',
    live: 'https://clutch-cafe-nine.vercel.app',
    blurb:
      'Website for a car-themed coffee shop on C1 Road, Villa Arevalo, Iloilo City. Menu, the garage, customer reviews, socials, and directions, with live open hours.',
    stack: ['Vite'],
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
  /** Topic heading on the Certifications page. */
  topic: 'AI' | 'Engineering' | 'Design' | 'Networking & Security';
  /** Issuer logo shown on the card. */
  logo: string;
  /** Scan of the certificate itself, cropped free of verification codes. */
  image: string;
};

export const CERTIFICATES: Certificate[] = [
  {
    id: 'aws',
    topic: 'AI',
    logo: '/assets/issuers/udacity.png',
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
    topic: 'AI',
    logo: '/assets/issuers/scrimba.png',
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
    topic: 'Design',
    logo: '/assets/issuers/scrimba.png',
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
    topic: 'Engineering',
    logo: '/assets/issuers/scrimba.png',
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
    topic: 'Engineering',
    logo: '/assets/issuers/scrimba.png',
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
    topic: 'Networking & Security',
    logo: '/assets/issuers/cisco.png',
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
    topic: 'AI',
    logo: '/assets/issuers/ai-fest.png',
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
  logo: string;
};

/** In progress — deliberately NOT listed among earned credentials. */
export const LEARNING: Learning[] = [
  {
    id: 'cisco-cyber',
    logo: '/assets/issuers/cisco.png',
    issuer: 'Cisco Networking Academy',
    name: 'Introduction to Cybersecurity',
    note: 'Threat landscape, attack types, and the principles behind defending networks and data.',
  },
  {
    id: 'htb',
    logo: '/assets/issuers/htb.png',
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

/* ── Gear ──────────────────────────────────────────────── */

export type Gear = {
  id: string;
  name: string;
  spec: string;
  /** Product photo; the card falls back to a plain plate if the file is missing. */
  image: string;
};

export const GEAR: Gear[] = [
  {
    id: 'macbook-pro',
    name: 'MacBook Pro',
    spec: 'M5 · 16GB memory · 1TB · 14-inch',
    image: '/assets/gear/macbook-pro.jpg',
  },
  {
    id: 'iphone-17-pro-max',
    name: 'iPhone 17 Pro Max',
    spec: 'A19 Pro chip · 512GB',
    image: '/assets/gear/iphone-17-pro-max.jpg',
  },
];

/* ── Highlights (home page strip) ──────────────────────── */

export const HIGHLIGHTS = [
  { title: 'AWS AI & ML', sub: 'Scholar · 2026', mark: 'cloud' },
  { title: 'PHARMATRACK', sub: 'UI/UX Design', mark: 'qr' },
  { title: 'San Agustin', sub: 'BSIT · 3rd Year', mark: 'school' },
] as const;

/* ── Shop ──────────────────────────────────────────────── */

export type Product = {
  id: string;
  name: string;
  kind: string;
  blurb: string;
  points: string[];
  status: 'Coming soon' | 'Available';
  /** Product photo; the card falls back to a plain plate if the file is missing. */
  image: string;
};

export const PRODUCTS: Product[] = [
  {
    id: 'nfc-card',
    name: 'NFC Card',
    kind: 'Tap-to-share card',
    blurb:
      'A card that opens a link when someone taps it with their phone. Point it at your contact details, portfolio, socials, or menu.',
    points: ['Tap to open, no app needed on most modern phones', 'Programmed with the link you choose'],
    status: 'Coming soon',
    image: '/assets/shop/nfc-card.svg',
  },
  {
    id: 'nfc-google-review',
    name: 'NFC Google Review Card',
    kind: 'For businesses',
    blurb:
      'Customers tap their phone on the card and land straight on your Google review page, so leaving a review takes seconds.',
    points: ['Opens your Google review page on tap', 'Set up for your business listing'],
    status: 'Coming soon',
    image: '/assets/shop/nfc-google-review.svg',
  },
];

export const CERT_TOPICS: Certificate['topic'][] = ['AI', 'Engineering', 'Design', 'Networking & Security'];

/* ── Experience ────────────────────────────────────────── */

export type Experience = {
  id: string;
  org: string;
  orgSub: string;
  logo?: string;
  link?: { href: string; label: string };
  role: string;
  when: string;
  body: string;
  chips: string[];
  highlight?: string;
};

export const EXPERIENCE: Experience[] = [
  {
    id: 'cdg',
    org: 'Cascade Development Group',
    orgSub: 'Software development group · Iloilo City',
    logo: '/assets/orgs/cdg.png',
    link: { href: 'https://cdg-official.vercel.app', label: 'cdg-official.vercel.app' },
    role: 'Front-End Developer',
    when: 'Present',
    body: 'Translating UI designs into fast, precise, and accessible front-end code that holds up under real-world use. React and Next.js component architecture, responsive layouts, cross-browser compatibility, and interaction quality.',
    chips: ['React', 'Next.js', 'UI implementation', 'Responsive design'],
  },
  {
    id: 'hack-iloilo',
    org: 'HACK ILOILO 2026',
    orgSub: 'Hackathon · Iloilo Province',
    logo: '/assets/orgs/ledip.png',
    link: {
      href: 'https://www.facebook.com/ledipcenteriloiloprovince',
      label: 'Provincial LEDIP Office, Iloilo',
    },
    role: 'Top 10 — Team KASCODERS',
    when: '2026 · First hackathon',
    body: 'My first hackathon. I competed with my team, KASCODERS, and we made it into the top 10.',
    chips: ['Hackathon', 'Teamwork', 'Rapid prototyping'],
    highlight: 'Top 10',
  },
  {
    id: 'pharmatrack',
    org: 'PHARMATRACK',
    orgSub: 'University of San Agustin — Pharmacy Dept.',
    logo: '/assets/orgs/usa.png',
    link: { href: 'https://lsgph-pharmatrack.com/', label: 'lsgph-pharmatrack.com' },
    role: 'UI/UX Design',
    when: 'Shipped',
    body: 'I designed the interface and the user flows — the screens, and the path a student takes from registering to being scanned in.',
    chips: ['UI/UX Design', 'User flows', 'React'],
  },
];

/* ── Affiliations ──────────────────────────────────────── */

export type Affiliation = {
  id: string;
  name: string;
  short: string;
  role: string;
  logo: string;
  href: string;
  linkLabel: string;
  blurb: string;
};

export const AFFILIATIONS: Affiliation[] = [
  {
    id: 'cdg',
    name: 'Cascade Development Group',
    short: 'CDG',
    role: 'Front-End Developer',
    logo: '/assets/orgs/cdg.png',
    href: 'https://cdg-official.vercel.app',
    linkLabel: 'cdg-official.vercel.app',
    blurb:
      'A software development group based in Iloilo City, building websites, business systems, and AI tools for growing businesses and organizations. Est. 2026.',
  },
  {
    id: 'itsa',
    name: 'Information Technology Student Association',
    short: 'ITSA',
    role: 'Member',
    logo: '/assets/orgs/itsa.png',
    href: 'https://itsa-website-psi.vercel.app',
    linkLabel: 'itsa-website-psi.vercel.app',
    blurb:
      'The official student organization of Information Technology students at the University of San Agustin, building community, skills, and opportunities in tech.',
  },
  {
    id: 'ads',
    name: 'Augustinian Developer Society',
    short: 'ADS',
    role: 'Member',
    logo: '/assets/orgs/ads.png',
    href: 'https://www.facebook.com/adsusadevs',
    linkLabel: 'facebook.com/adsusadevs',
    blurb: 'The developer community of the University of San Agustin.',
  },
];
