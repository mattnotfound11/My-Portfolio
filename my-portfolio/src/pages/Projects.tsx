import { WORK } from '../work';
import { PROFILE } from '../data';
import { useTitle } from '../router';
import { Reveal } from '../components/Reveal';
import { PageHead } from '../components/ui';

/** Shipped work first, then live builds still in progress. */
const ITEMS = [...WORK.filter((w) => w.status === 'Shipped'), ...WORK.filter((w) => w.status === 'In progress')];

export function Projects() {
  useTitle(`Projects — ${PROFILE.name}`);

  return (
    <div className="page page--full">
      <PageHead title="projects">
        Built for real users. One project shipped and in daily use, plus live builds I'm still working on.
      </PageHead>

      <Reveal>
        <div className="pgrid">
          {ITEMS.map((p) => (
            <article key={p.id} className="pcard">
              <a href={p.live} target="_blank" rel="noopener noreferrer" className="pcard-shot" tabIndex={-1}>
                <img src={p.image} alt={`${p.name} home page`} loading="lazy" />
                <span className={`tag pcard-status ${p.status === 'Shipped' ? 'tag--solid' : ''}`}>{p.status}</span>
              </a>
              <span className="pcard-kind">{p.kind}</span>
              <h2 className="pcard-title">{p.name}</h2>
              <p className="pcard-sum">{p.blurb}</p>
              <p className="pcard-foot">
                {p.role ? (
                  <>
                    My role · <strong>{p.role}</strong>
                  </>
                ) : (
                  p.stack.join(' · ')
                )}
              </p>
              <span className="pcard-links">
                <a href={p.live} target="_blank" rel="noopener noreferrer" className="mm-link">
                  Visit site ↗
                </a>
                {p.repo && (
                  <a href={p.repo} target="_blank" rel="noopener noreferrer" className="mm-link">
                    Source ↗
                  </a>
                )}
              </span>
            </article>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
