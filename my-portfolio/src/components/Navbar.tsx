import { useEffect, useState } from 'react';
import { NAV } from '../data';
import {
  IconHome,
  IconUser,
  IconCode,
  IconBriefcase,
  IconAward,
  IconMail,
  IconMenu,
  IconClose,
} from './Icons';

const ICONS = {
  home: IconHome,
  about: IconUser,
  stack: IconCode,
  work: IconBriefcase,
  credentials: IconAward,
  contact: IconMail,
} as const;

export function Navbar() {
  const [active, setActive] = useState<string>('home');
  const [open, setOpen] = useState(false);

  // Scroll-spy: the section occupying the upper third of the viewport wins.
  useEffect(() => {
    const ids = NAV.map((n) => n.id);

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0.05, 0.3, 0.6] },
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close the sheet on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header className="nav">
        <a href="#home" className="nav-brand" aria-label="Matthew Tabat — home">
          <span className="nav-mark">MT</span>
        </a>

        <nav className="nav-dock" aria-label="Sections">
          {NAV.map((item) => {
            const Icon = ICONS[item.id];
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link ${active === item.id ? 'is-active' : ''}`}
                aria-current={active === item.id ? 'true' : undefined}
              >
                <Icon />
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="nav-actions">
          <a href="#contact" className="btn btn-primary">
            Get in touch
          </a>
          <button
            type="button"
            className="nav-toggle"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </header>

      {open && (
        <div className="nav-sheet" role="dialog" aria-modal="true">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={active === item.id ? 'is-active' : ''}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
