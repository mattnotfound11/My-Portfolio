import { useEffect, useRef, useState } from 'react';
import { PROFILE } from '../data';

const SEEN_KEY = 'mt-loader-seen';
const MIN_MS = 1200;
const MAX_MS = 4000;

export function loaderAlreadySeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

function manilaTime() {
  return new Intl.DateTimeFormat('en-PH', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Manila',
  }).format(new Date());
}

/**
 * First-visit loading screen. The percentage follows real work (fonts and
 * page load) with a short floor so it never flickers, and a ceiling so a
 * slow asset can't hold the page hostage.
 */
export function Loader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [phase, setPhase] = useState<'in' | 'out' | 'gone'>('in');
  const target = useRef(8);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('gone');
      onDone();
      return;
    }

    const start = performance.now();
    let fontsDone = false;
    let pageDone = document.readyState === 'complete';
    const bump = () => {
      target.current = 8 + (fontsDone ? 46 : 0) + (pageDone ? 46 : 0);
    };
    bump();

    document.fonts?.ready.then(() => {
      fontsDone = true;
      bump();
    });
    const onLoad = () => {
      pageDone = true;
      bump();
    };
    window.addEventListener('load', onLoad);

    let raf = 0;
    let shown = 0;
    let finishing = false;
    const tick = (now: number) => {
      const elapsed = now - start;
      // Time alone can carry the bar most of the way; real readiness finishes it.
      const timeFloor = Math.min(90, (elapsed / MIN_MS) * 70);
      const goal = elapsed > MAX_MS ? 100 : Math.max(Math.min(target.current, 100), timeFloor);
      const capped = elapsed < MIN_MS ? Math.min(goal, 92) : goal;
      shown += (capped - shown) * 0.12;
      if (capped === 100 && shown > 99.4) shown = 100;
      setPct(Math.floor(shown));

      if (shown === 100 && !finishing) {
        finishing = true;
        setTimeout(() => setPhase('out'), 180);
        setTimeout(() => {
          setPhase('gone');
          try {
            sessionStorage.setItem(SEEN_KEY, '1');
          } catch {
            /* fine: the loader just shows again next visit */
          }
          onDone();
        }, 1000);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('load', onLoad);
    };
  }, [onDone]);

  if (phase === 'gone') return null;

  return (
    <div className={`loader ${phase === 'out' ? 'is-out' : ''}`} role="status" aria-label="Loading portfolio">
      <div className="loader-row loader-row--top">
        <span>{PROFILE.fullName}</span>
        <span>Portfolio · {new Date().getFullYear()}</span>
      </div>

      <div className="loader-center">
        <p className="loader-name">
          {PROFILE.name.split('').map((ch, i) => (
            <span key={i} style={{ animationDelay: `${i * 45}ms` }}>
              {ch === ' ' ? ' ' : ch}
            </span>
          ))}
        </p>
        <p className="loader-role">{PROFILE.role}</p>
        <div className="loader-bar" aria-hidden="true">
          <span style={{ transform: `scaleX(${pct / 100})` }} />
        </div>
        <div className="loader-meta">
          <span>{pct < 100 ? 'Loading' : 'Ready'}</span>
          <span className="loader-pct">{String(pct).padStart(3, '0')}%</span>
        </div>
      </div>

      <div className="loader-row loader-row--bottom">
        <span>{PROFILE.location}</span>
        <span>{manilaTime()} PHT</span>
      </div>
    </div>
  );
}
