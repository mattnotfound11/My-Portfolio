import { useEffect, useState } from 'react';
import { PROFILE } from '../data';
import { IconClose } from './Icons';

const LINES = [
  '> whoami',
  'matthew tabat — software developer & security analyst, iloilo city',
  '> education',
  'bs information technology, university of san agustin (3rd year)',
  '> shipped',
  'pharmatrack — qr attendance, 800+ students, in production',
  '> stack',
  'react · next.js · node · supabase · postgres · tailwind',
  '> studying',
  'cisco intro to cybersecurity · hack the box academy',
  '> status',
  'open to internships and junior roles',
  '> contact',
  PROFILE.email,
];

/** Terminal easter egg (left) and a jump-to-contact button (right). */
export function FloatingDock() {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!open) {
      setShown(0);
      return;
    }
    const id = setInterval(() => {
      setShown((n) => {
        if (n >= LINES.length) {
          clearInterval(id);
          return n;
        }
        return n + 1;
      });
    }, 260);
    return () => clearInterval(id);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="dock-btn dock-left"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close terminal' : 'Open terminal'}
        aria-expanded={open}
      >
        {open ? <IconClose width={17} height={17} /> : <span className="dock-caret">&gt;_</span>}
      </button>

      {open && (
        <div className="term" role="dialog" aria-label="About Matthew, terminal view">
          <div className="term-bar">
            <span className="term-dot" style={{ background: '#ff5f57' }} />
            <span className="term-dot" style={{ background: '#febc2e' }} />
            <span className="term-dot" style={{ background: '#28c840' }} />
            <span className="term-title">matthew@portfolio — zsh</span>
          </div>
          <div className="term-body">
            {LINES.slice(0, shown).map((l, i) => (
              <p key={i} className={l.startsWith('>') ? 'term-cmd' : 'term-out'}>
                {l}
              </p>
            ))}
            {shown >= LINES.length && <span className="term-cursor" />}
          </div>
        </div>
      )}
    </>
  );
}
