import { useState } from 'react';

interface Props {
  base: string;
  hover: string;
  alt: string;
}

/**
 * Portrait that swaps on hover via a circular iris reveal.
 *
 * Touch devices have no hover, so tapping toggles the same state — otherwise
 * phone visitors would never see the second image at all.
 */
export function ProfileSwap({ base, hover, alt }: Props) {
  const [open, setOpen] = useState(false);
  const [hasHover, setHasHover] = useState(true);

  return (
    <div
      className={`pswap ${open ? 'is-open' : ''}`}
      onClick={() => setOpen((v) => !v)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setOpen((v) => !v);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`${alt} — activate to switch portrait`}
    >
      <img className="pswap-img pswap-base" src={base} alt={alt} />

      {hasHover && (
        <>
          <img
            className="pswap-img pswap-top"
            src={hover}
            alt=""
            aria-hidden="true"
            // If the second file is not there yet, fall back to a plain portrait.
            onError={() => setHasHover(false)}
          />
          <span className="pswap-ring" aria-hidden="true" />
          <span className="pswap-hint" aria-hidden="true">
            hover
          </span>
        </>
      )}
    </div>
  );
}
