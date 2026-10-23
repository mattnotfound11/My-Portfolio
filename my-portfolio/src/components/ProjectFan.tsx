import { useState } from 'react';
import { WORK, type WorkItem } from '../work';
import { Chip } from './ui';
import { IconChevronLeft, IconChevronRight } from './Icons';

function FanCard({ item }: { item: WorkItem }) {
  return (
    <>
      <div className="chips">
        <Chip>{item.status === 'Shipped' ? 'Shipped' : 'In progress'}</Chip>
        <Chip>{item.kind}</Chip>
      </div>
      <div className="fan-title">
        <img src={item.image} alt="" className="fan-thumb" loading="lazy" />
        <h3>{item.name}</h3>
      </div>
      <p className="fan-blurb">{item.blurb}</p>
    </>
  );
}

/**
 * The home page project deck: one card in front, its neighbours fanned out
 * behind. Clicking a neighbour or the arrows brings it forward.
 */
export function ProjectFan() {
  const [i, setI] = useState(0);
  const n = WORK.length;
  const at = (k: number) => WORK[(k + n) % n]!;
  const current = at(i);

  return (
    <div className="fan" aria-roledescription="carousel" aria-label="Projects">
      <div className="fan-stage">
        <button type="button" className="fan-card fan-card--left" onClick={() => setI(i - 1)} aria-label={`Show ${at(i - 1).name}`} tabIndex={-1}>
          <FanCard item={at(i - 1)} />
        </button>
        <button type="button" className="fan-card fan-card--right" onClick={() => setI(i + 1)} aria-label={`Show ${at(i + 1).name}`} tabIndex={-1}>
          <FanCard item={at(i + 1)} />
        </button>
        <article className="fan-card fan-card--front" key={current.id} aria-live="polite">
          <FanCard item={current} />
          <div className="fan-actions">
            <a href={current.live} target="_blank" rel="noopener noreferrer" className="btn btn--solid">
              Visit site <span aria-hidden="true">↗</span>
            </a>
            {current.repo && (
              <a href={current.repo} target="_blank" rel="noopener noreferrer" className="btn">
                Source <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </article>
      </div>

      <div className="fan-nav">
        <button type="button" onClick={() => setI(i - 1)} aria-label="Previous project">
          <IconChevronLeft width={16} height={16} />
        </button>
        <span className="fan-count">
          {String(((i % n) + n) % n + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
        </span>
        <button type="button" onClick={() => setI(i + 1)} aria-label="Next project">
          <IconChevronRight width={16} height={16} />
        </button>
      </div>
    </div>
  );
}
