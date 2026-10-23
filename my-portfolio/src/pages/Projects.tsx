import { WORK } from '../work';
import { PROFILE } from '../data';
import { useTitle } from '../router';
import { Reveal } from '../components/Reveal';
import { Chip, PageHead } from '../components/ui';

const GROUPS = [
  {
    label: 'Selected work',
    note: 'One project, shipped and in daily use.',
    items: WORK.filter((w) => w.status === 'Shipped'),
  },
  {
    label: 'Currently building',
    note: 'Live, still in progress. Each one is deployed and usable today, and each is still being worked on — so treat them as work in motion rather than finished case studies.',
    items: WORK.filter((w) => w.status === 'In progress'),
  },
];

export function Projects() {
  useTitle(`Projects — ${PROFILE.name}`);

  return (
    <div className="page">
      <PageHead title="projects">
        Built for real users. I would rather show you something running in production than a folder of concepts.
      </PageHead>

      {GROUPS.map((g) => (
        <section key={g.label} className="proj-group">
          <h2 className="sec-label">{g.label}</h2>
          <p className="group-note">{g.note}</p>
          <div className="proj-list">
            {g.items.map((p, i) => (
              <Reveal key={p.id} delay={Math.min(i, 3) * 0.06}>
                <article className="proj">
                  <a href={p.live} target="_blank" rel="noopener noreferrer" className="proj-shot" tabIndex={-1}>
                    <img src={p.image} alt={`${p.name} home page`} loading="lazy" />
                  </a>
                  <div className="proj-top">
                    <div className="proj-head">
                      <div className="chips">
                        <span className={`tag ${p.status === 'Shipped' ? 'tag--solid' : ''}`}>‹ {p.status} ›</span>
                        <Chip>{p.kind}</Chip>
                        {p.client && <Chip>{p.client}</Chip>}
                      </div>
                      <h3 className="proj-title">{p.name}</h3>
                      <p className="proj-blurb">{p.blurb}</p>
                      {p.detail && <p className="proj-detail">{p.detail}</p>}
                    </div>
                  </div>

                  {p.metrics && (
                    <dl className="proj-metrics">
                      {p.metrics.map((m) => (
                        <div key={m.label}>
                          <dt>{m.label}</dt>
                          <dd>{m.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  <div className="proj-actions">
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn btn--solid">
                      Visit site <span aria-hidden="true">↗</span>
                    </a>
                    {p.repo && (
                      <a href={p.repo} target="_blank" rel="noopener noreferrer" className="btn">
                        Source code <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>

                  <div className="proj-foot">
                    <span className="proj-foot-label">{p.role ? 'My role' : 'Built with'}</span>
                    <span className="proj-foot-items">
                      {p.role ? (
                        <>
                          <strong>{p.role}</strong> · {p.roleNote}
                        </>
                      ) : (
                        p.stack.join(' · ')
                      )}
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
