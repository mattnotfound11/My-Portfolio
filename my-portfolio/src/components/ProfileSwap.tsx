import { useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  base: string;
  hover: string;
  alt: string;
  /** Seconds of hold before the reveal fires. */
  charge?: number;
}

type Phase = 'idle' | 'charging' | 'revealing' | 'revealed';

/**
 * Cinematic portrait reveal.
 *
 * Hold the portrait and it "charges": grain and scanlines creep in, the image
 * drifts closer, and a ring fills to show how long is left. At full charge it
 * breaks — a white flash, an RGB split that snaps back into focus, and the
 * second portrait resolves through it.
 *
 * Leaving before full charge cancels and rewinds. Clicking skips the wait.
 */
export function ProfileSwap({ base, hover, alt, charge = 5 }: Props) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [hasHover, setHasHover] = useState(true);
  const timers = useRef<number[]>([]);

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => clear, []);

  const fire = useCallback(() => {
    clear();
    setPhase('revealing');
    // Flash + RGB split settle, then hold on the second portrait.
    timers.current.push(window.setTimeout(() => setPhase('revealed'), 1150));
  }, []);

  const start = () => {
    if (!hasHover || phase === 'revealed' || phase === 'revealing') return;
    setPhase('charging');
    timers.current.push(window.setTimeout(fire, charge * 1000));
  };

  const stop = () => {
    if (phase === 'charging') {
      clear();
      setPhase('idle');
    }
  };

  const toggle = () => {
    if (!hasHover) return;
    if (phase === 'revealed') {
      clear();
      setPhase('idle');
    } else {
      fire(); // click skips the charge
    }
  };

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div
      className={`pswap is-${phase}`}
      style={{ ['--charge' as string]: `${charge}s` }}
      onMouseEnter={reduced ? undefined : start}
      onMouseLeave={reduced ? undefined : stop}
      onFocus={reduced ? undefined : start}
      onBlur={stop}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`${alt} — hold or activate to reveal the photo`}
    >
      <img className="pswap-img pswap-base" src={base} alt={alt} />

      {hasHover && (
        <>
          {/* Duplicated layers, offset and blended, make the RGB split */}
          <img className="pswap-img pswap-ghost pswap-ghost--r" src={base} alt="" aria-hidden="true" />
          <img className="pswap-img pswap-ghost pswap-ghost--c" src={base} alt="" aria-hidden="true" />

          <img
            className="pswap-img pswap-top"
            src={hover}
            alt=""
            aria-hidden="true"
            onError={() => setHasHover(false)}
          />

          <span className="pswap-grain" aria-hidden="true" />
          <span className="pswap-scan" aria-hidden="true" />
          <span className="pswap-flash" aria-hidden="true" />
          <span className="pswap-vignette" aria-hidden="true" />

          {/* Charge indicator — without it nobody knows to keep holding */}
          <svg className="pswap-ring" viewBox="0 0 100 100" aria-hidden="true">
            <circle className="pswap-ring-track" cx="50" cy="50" r="46" />
            <circle className="pswap-ring-fill" cx="50" cy="50" r="46" />
          </svg>

          <span className="pswap-hint" aria-hidden="true">
            {phase === 'charging' ? 'hold…' : phase === 'revealed' ? 'click to reset' : 'hold to reveal'}
          </span>
        </>
      )}
    </div>
  );
}
