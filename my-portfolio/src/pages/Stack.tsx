import { PROFILE, STACK, TECH_COUNT } from '../data';
import { useTitle } from '../router';
import { Reveal } from '../components/Reveal';
import { Chip, PageHead } from '../components/ui';

export function Stack() {
  useTitle(`Tech stack — ${PROFILE.name}`);

  return (
    <div className="page">
      <PageHead title="tech stack">
        {TECH_COUNT} technologies across {STACK.length} areas — everything listed here is something I have
        actually written code in.
      </PageHead>

      {STACK.map((g, i) => (
        <Reveal key={g.id} delay={Math.min(i, 3) * 0.05}>
          <section className="stack-group">
            <h2 className="sec-label">{g.label}</h2>
            <p className="stack-summary">{g.summary}</p>
            <div className="chips chips--lg">
              {g.items.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>
          </section>
        </Reveal>
      ))}
    </div>
  );
}
