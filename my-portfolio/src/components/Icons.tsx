import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement>;

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export const IconHome = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.8V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.8" />
  </svg>
);

export const IconUser = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="8" r="3.6" />
    <path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" />
  </svg>
);

export const IconCode = (p: P) => (
  <svg {...base} {...p}>
    <path d="m9 17-5-5 5-5" />
    <path d="m15 7 5 5-5 5" />
  </svg>
);

export const IconBriefcase = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="7.5" width="18" height="13" rx="2" />
    <path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5" />
  </svg>
);

export const IconAward = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="9" r="5.5" />
    <path d="M8.2 13.4 7 21l5-2.6L17 21l-1.2-7.6" />
  </svg>
);

export const IconMail = (p: P) => (
  <svg {...base} {...p}>
    <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
    <path d="m3 6.5 9 6 9-6" />
  </svg>
);

export const IconPhone = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z" />
  </svg>
);

export const IconPin = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);

export const IconGithub = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 1.8a10.2 10.2 0 0 0-3.22 19.88c.5.1.69-.22.69-.49v-1.9c-2.84.62-3.44-1.24-3.44-1.24-.46-1.19-1.13-1.5-1.13-1.5-.93-.63.07-.62.07-.62 1.03.07 1.57 1.06 1.57 1.06.91 1.57 2.4 1.12 2.98.85.09-.66.36-1.12.65-1.37-2.27-.26-4.65-1.14-4.65-5.06 0-1.12.4-2.03 1.05-2.75-.1-.26-.46-1.3.1-2.71 0 0 .86-.28 2.81 1.05a9.7 9.7 0 0 1 5.12 0c1.95-1.33 2.81-1.05 2.81-1.05.56 1.41.2 2.45.1 2.71.65.72 1.05 1.63 1.05 2.75 0 3.93-2.39 4.8-4.66 5.05.37.32.7.94.7 1.9v2.82c0 .27.18.6.69.49A10.2 10.2 0 0 0 12 1.8Z" />
  </svg>
);

export const IconLinkedin = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.76-1.95C21.6 8.75 23 11 23 14.4V21h-4v-5.9c0-1.4-.03-3.2-2-3.2s-2.3 1.53-2.3 3.1V21h-4V9Z" />
  </svg>
);

export const IconLayout = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="3.5" width="18" height="17" rx="2" />
    <path d="M3 9h18M9 9v11.5" />
  </svg>
);

export const IconServer = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="3.5" width="18" height="7" rx="2" />
    <rect x="3" y="13.5" width="18" height="7" rx="2" />
    <path d="M7 7h.01M7 17h.01" />
  </svg>
);

export const IconDatabase = (p: P) => (
  <svg {...base} {...p}>
    <ellipse cx="12" cy="6" rx="8" ry="3" />
    <path d="M4 6v12c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
    <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
  </svg>
);

export const IconShield = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6L12 3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const IconTools = (p: P) => (
  <svg {...base} {...p}>
    <path d="M14.5 5.5a3.8 3.8 0 0 0 5 5l-9 9a2.6 2.6 0 0 1-3.7-3.7l9-9Z" />
    <path d="m5 5 3 3" />
  </svg>
);

export const IconArrow = (p: P) => (
  <svg {...base} {...p}>
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);

export const IconChevronDown = (p: P) => (
  <svg {...base} {...p}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const IconCheck = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12 2.5 2.5 4.5-5" />
  </svg>
);

export const IconMenu = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const IconClose = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
