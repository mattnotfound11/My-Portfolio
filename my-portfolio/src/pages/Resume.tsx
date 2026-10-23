
import { CERTIFICATES, EDUCATION, LEARNING, PROFILE, STACK } from '../data';
import { WORK } from '../work';
import { useTitle } from '../router';
import { Reveal } from '../components/Reveal';
import { PageHead } from '../components/ui';
import { Timeline, type TimelineEntry } from '../components/Timeline';
import { IconDownload, IconMail } from '../components/Icons';

/** Education exactly as listed on the portfolio, grouped by school. */
const ENTRIES: TimelineEntry[] = EDUCATION.reduce<TimelineEntry[]>((out, e) => {
  const role = { title: e.role, when: e.year, body: e.note };
  const last = out[out.length - 1];
  if (last && last.org === e.org) last.roles.push(role);
  else
    out.push({
      org: e.org,
      sub: e.now ? 'Currently studying' : 'Education',
      logo: e.org === PROFILE.school ? '/assets/orgs/usa.png' : undefined,
      roles: [role],
    });
  return out;
}, []);

const GLANCE = [
  { k: 'Based in', v: PROFILE.location },
  { k: 'Studying', v: `${PROFILE.program}, ${PROFILE.year}` },
  { k: 'Role', v: PROFILE.role },
  { k: 'Status', v: 'Open to internships' },
];

export function Resume() {
  useTitle(`Resume — ${PROFILE.fullName}`);

  return (
    <div className="page page--resume">
      {/* Only shown on paper: the classic resume masthead. */}
      <header className="print-head">
        <h1>{PROFILE.fullName}</h1>
        <p>{PROFILE.role}</p>
        <p>
          {PROFILE.email} · {PROFILE.location} · github.com/{PROFILE.githubHandle} · tabat-dev.vercel.app
        </p>
      </header>

      <PageHead title="resume">
        I'm {PROFILE.fullName}, a {PROFILE.year} College student at the {PROFILE.school}, Iloilo.
      </PageHead>

      <Reveal>
        <div className="resume-bar">
          <dl className="glance">
            {GLANCE.map((g) => (
              <div key={g.k}>
                <dt>{g.k}</dt>
                <dd>{g.v}</dd>
              </div>
            ))}
          </dl>
          <div className="resume-actions">
            <button type="button" className="btn btn--solid" onClick={() => window.print()}>
              <IconDownload width={14} height={14} /> Download PDF
            </button>
            <a href={`mailto:${PROFILE.email}`} className="btn">
              <IconMail width={14} height={14} /> Email me
            </a>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <section className="resume-sec resume-sec--first">
          <h2 className="sec-label">Profile</h2>
          <p className="resume-summary">{PROFILE.blurb}</p>
        </section>
      </Reveal>

      <h2 className="sec-label resume-label">Education</h2>
      <div className="tl-list">
        {ENTRIES.map((e) => (
          <Reveal key={e.org}>
            <Timeline entry={e} />
          </Reveal>
        ))}
      </div>

      <Reveal>
        <section className="resume-sec">
          <h2 className="sec-label">Projects</h2>
          <ul className="rows">
            {WORK.map((w) => (
              <li key={w.id} className="row">
                <span className="row-when">{w.status}</span>
                <span className="row-what">
                  <a href={w.live} target="_blank" rel="noopener noreferrer">
                    {w.name} <span aria-hidden="true">↗</span>
                  </a>
                  <small>{w.role ? `${w.role} · ${w.client}` : w.kind}</small>
                </span>
                <span className="row-where">{w.stack.slice(0, 3).join(' · ')}</span>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal>
        <section className="resume-sec">
          <h2 className="sec-label">Skills</h2>
          <dl className="skill-rows">
            {STACK.map((g) => (
              <div key={g.id}>
                <dt>{g.label}</dt>
                <dd>{g.items.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </section>
      </Reveal>

      <Reveal>
        <section className="resume-sec">
          <h2 className="sec-label">Certifications</h2>
          <ul className="rows">
            {CERTIFICATES.map((c) => (
              <li key={c.id} className="row">
                <span className="row-when">{c.year}</span>
                <span className="row-what">{c.name}</span>
                <span className="row-where">{c.kind === 'Attended' ? 'Attended · ' : ''}{c.issuer}</span>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal>
        <section className="resume-sec">
          <h2 className="sec-label">Currently studying</h2>
          <ul className="rows">
            {LEARNING.map((l) => (
              <li key={l.id} className="row">
                <span className="row-when">In progress</span>
                <span className="row-what">{l.name}</span>
                <span className="row-where">{l.issuer}</span>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <p className="print-only print-foot">References available on request.</p>
    </div>
  );
}
