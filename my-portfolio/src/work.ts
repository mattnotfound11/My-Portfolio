import { BUILDING, PROJECTS } from './data';

/** Shipped work and live in-progress builds, flattened for listing. */
export type WorkItem = {
  id: string;
  name: string;
  kind: string;
  status: 'Shipped' | 'In progress';
  image: string;
  live: string;
  repo?: string;
  blurb: string;
  detail?: string;
  stack: string[];
  role?: string;
  roleNote?: string;
  client?: string;
  metrics?: { value: string; label: string }[];
};

export const WORK: WorkItem[] = [
  ...PROJECTS.map((p) => ({
    id: p.id,
    name: p.title,
    kind: p.category,
    status: 'Shipped' as const,
    image: p.shots[0]!.src,
    live: p.live,
    blurb: p.summary,
    detail: p.detail,
    stack: p.stack,
    role: p.role,
    roleNote: p.roleNote,
    client: p.org,
    metrics: p.metrics,
  })),
  ...BUILDING.map((b) => ({
    id: b.id,
    name: b.name,
    kind: b.kind,
    status: 'In progress' as const,
    image: b.image,
    live: b.live,
    repo: b.repo,
    blurb: b.blurb,
    stack: b.stack,
  })),
];
