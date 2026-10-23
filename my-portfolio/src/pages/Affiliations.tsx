import { AFFILIATIONS, PROFILE } from '../data';
import { useTitle } from '../router';
import { Reveal } from '../components/Reveal';
import { PageHead } from '../components/ui';

export function Affiliations() {
  useTitle(`Affiliations — ${PROFILE.name}`);

  return (
    <div className="page">
      <PageHead title="affiliations">
        The teams and organizations I'm part of, on campus and beyond.
      </PageHead>

      <div className="aff-list">
        {AFFILIATIONS.map((a, i) => (
          <Reveal key={a.id} delay={i * 0.06}>
            <article className="aff">
              <img src={a.logo} alt={`${a.name} logo`} className="aff-mark" loading="lazy" />
              <div className="aff-body">
                <div className="aff-top">
                  <h2 className="aff-name">{a.name}</h2>
                  <span className="tag">{a.role}</span>
                </div>
                <p className="aff-short">{a.short}</p>
                <p className="aff-blurb">{a.blurb}</p>
                <a href={a.href} target="_blank" rel="noopener noreferrer" className="aff-link">
                  {a.linkLabel} <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
