import type { ReactNode } from 'react';
import { Link } from '../router';
import { Reveal } from './Reveal';

/** "01 — projects" header with an optional "all projects →" link. */
export function SectionHead({ n, title, to, more }: { n: string; title: string; to?: string; more?: string }) {
  return (
    <div className="sec-head">
      <h2 className="sec-title">
        <span className="sec-n">{n}</span> — {title}
      </h2>
      {to && more && (
        <Link to={to} className="sec-more">
          {more} →
        </Link>
      )}
    </div>
  );
}

export function PageHead({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Reveal>
      <header className="page-head">
        <h1 className="page-title">{title}</h1>
        <p className="page-lede">{children}</p>
      </header>
    </Reveal>
  );
}

export function Chip({ children, dashed = false }: { children: ReactNode; dashed?: boolean }) {
  return <span className={`chip ${dashed ? 'chip--dashed' : ''}`}>{children}</span>;
}

/** Two-letter badge standing in for an organisation's logo. */
export function Mark({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' }) {
  const letters = name
    .replace(/[^A-Za-z ]/g, ' ')
    .split(/\s+/)
    .filter((w) => w && !/^(of|the|de|las|and|inc)$/i.test(w))
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('');
  return (
    <span className={`mark mark--${size}`} aria-hidden="true">
      {letters}
    </span>
  );
}

export function Ext({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children} <span aria-hidden="true">↗</span>
    </a>
  );
}
