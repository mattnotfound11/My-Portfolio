import { useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  /** Photograph. Sits underneath and is revealed. */
  base: string;
  /** Artwork. Sits on top and dissolves away. */
  cover: string;
  alt: string;
  /** Seconds for the hover dissolve. */
  duration?: number;
}

type Phase = 'idle' | 'breaking' | 'revealed';

/**
 * Two ways into the same photograph.
 *
 * Hovering slowly dissolves the artwork so the photo behind it drifts into
 * focus — and rewinds the moment you leave, since that path is pure CSS
 * transitions. Clicking skips the gradual route and breaks through instead:
 * a flash, a chromatic split, and the photo wiping open. Clicking again
 * puts the artwork back.
 */
export function ProfileSwap({ base, cover, alt, duration = 3.2 }: Props) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [hasCover, setHasCover] = useState(true);
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const toggle = useCallback(() => {
    if (!hasCover) return;
    if (timer.current) clearTimeout(timer.current);

    setPhase((p) => {
      if (p === 'revealed') return 'idle';
      // Fires immediately — no wait before the break.
      timer.current = window.setTimeout(() => setPhase('revealed'), 1100);
      return 'breaking';
    });
  }, [hasCover]);

  return (
    <div
      className={`pswap is-${phase}`}
      style={{ ['--dissolve' as string]: `${duration}s` }}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`${alt} — hover to fade through, or activate to reveal the photograph`}
    >
      <img className="pswap-img pswap-under" src={base} alt={alt} />

      {hasCover && (
        <>
          <img
            className="pswap-img pswap-cover"
            src={cover}
            alt=""
            aria-hidden="true"
            onError={() => setHasCover(false)}
          />

          {/* Offset copies of the artwork; only visible during the break */}
          <img className="pswap-img pswap-ghost pswap-ghost--r" src={cover} alt="" aria-hidden="true" />
          <img className="pswap-img pswap-ghost pswap-ghost--c" src={cover} alt="" aria-hidden="true" />

          <span className="pswap-grain" aria-hidden="true" />
          <span className="pswap-flash" aria-hidden="true" />
          <span className="pswap-vignette" aria-hidden="true" />
          <span className="pswap-hint" aria-hidden="true">
            {phase === 'revealed' ? 'click to reset' : 'hover · click'}
          </span>
        </>
      )}
    </div>
  );
}
