import { useEffect, useState } from 'react';
import { TextShimmer } from './TextShimmer';

const SEEN_KEY = 'mt-intro-seen';

/**
 * Landing screen: the signature draws in on black, holds, then the whole
 * curtain lifts to reveal the hero. Shown once per tab session.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'in' | 'out' | 'gone'>('in');

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setPhase('gone');
      onDone();
      return;
    }

    const t1 = setTimeout(() => setPhase('out'), 1750);
    const t2 = setTimeout(() => {
      setPhase('gone');
      sessionStorage.setItem(SEEN_KEY, '1');
      onDone();
    }, 2650);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  if (phase === 'gone') return null;

  return (
    <div className={`intro ${phase === 'out' ? 'is-out' : ''}`} aria-hidden="true">
      <div className="intro-inner">
        <span className="intro-rise">
          <TextShimmer className="intro-sign shimmer--warm" duration={2.8}>
            Matthew
          </TextShimmer>
        </span>
        <span className="intro-rise intro-rise--late">
          <TextShimmer className="intro-role" duration={2.2}>
            Software Developer &amp; Security Analyst
          </TextShimmer>
        </span>
      </div>
      <span className="intro-count" />
    </div>
  );
}

export function introAlreadySeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
}
