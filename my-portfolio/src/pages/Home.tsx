import { useState, type ReactElement } from 'react';
import {
  AFFILIATIONS,
  CERTIFICATES,
  EDUCATION,
  EXPERIENCE,
  GEAR,
  HIGHLIGHTS,
  LEARNING,
  PROFILE,
  STACK,
  type Certificate,
} from '../data';
import { WORK } from '../work';
import { Link, useTitle } from '../router';
import { Reveal } from '../components/Reveal';
import { Halftone } from '../components/Halftone';
import { ProjectFan } from '../components/ProjectFan';
import { DotCalendar } from '../components/DotCalendar';
import { CertCard } from '../components/CertCard';
import { CertViewer } from '../components/CertViewer';
import { GearCard } from '../components/GearCard';
import { Chip, Ext, SectionHead } from '../components/ui';
import { IconCopy, IconCheck } from '../components/Icons';

const MARKS: Record<(typeof HIGHLIGHTS)[number]['mark'], ReactElement> = {
  cloud: (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path fill="currentColor" d="M7 18.5a4.5 4.5 0 0 1-.6-8.96 6 6 0 0 1 11.47 1.47A3.75 3.75 0 0 1 17.25 18.5Z" />
    </svg>
  ),
  qr: (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="currentColor">
      <path d="M3 3h8v8H3Zm2 2v4h4V5Zm8-2h8v8h-8Zm2 2v4h4V5ZM3 13h8v8H3Zm2 2v4h4v-4Zm8-2h3v3h-3Zm5 0h3v3h-3Zm-5 5h3v3h-3Zm5 0h3v3h-3Z" />
    </svg>
  ),
  school: (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="currentColor">
      <path d="M12 3 1.5 8.5 12 14l8.5-4.45V16h2V8.5Zm-6 9.6v3.9c0 1.9 2.7 3.5 6 3.5s6-1.6 6-3.5v-3.9l-6 3.15Z" />
    </svg>
  ),
};

const certCount = CERTIFICATES.filter((c) => c.kind !== 'Attended').length;
const STATS = [
  { value: '800+', label: 'Students on PHARMATRACK', to: '/projects' },
  { value: String(WORK.length), label: 'Live projects', to: '/projects' },
  { value: String(certCount), label: 'Certificates', to: '/certifications' },
];

const TOP_STACK = ['React', 'Next.js', 'Tailwind CSS', 'Node.js', 'Express', 'Python', 'Java', 'PostgreSQL', 'Supabase', 'Git', 'Figma', 'Vercel'];
const totalStack = STACK.reduce((n, g) => n + g.items.length, 0);

function CopyEmail() {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setDone(true);
      setTimeout(() => setDone(false), 1800);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };
  return (
    <button type="button" className="btn" onClick={copy}>
      {done ? <IconCheck width={14} height={14} /> : <IconCopy width={14} height={14} />}
      {done ? 'Copied' : 'Copy'}
    </button>
  );
}

export function Home() {
  useTitle(`${PROFILE.name} — ${PROFILE.role}`);
  const [cert, setCert] = useState<Certificate | null>(null);

  return (
    <div className="page page--home">
      <Reveal>
        <section className="hero" aria-labelledby="hero-name">
          <Halftone src="/assets/profile-hover.jpg" alt={`Portrait of ${PROFILE.name}`} className="hero-photo" />
          <div className="hero-copy">
            <h1 id="hero-name" className="hero-name">{PROFILE.name}</h1>
            <p>{PROFILE.blurb}</p>
            <p>
              Student by day, builder by habit. I care about software that people actually use, not demos that
              only look good in a screenshot.
            </p>
            <p className="hero-links">
              <Ext href={PROFILE.github}>github</Ext>
              <Ext href={PROFILE.linkedin}>linkedin</Ext>
              <a href={`mailto:${PROFILE.email}`}>email <span aria-hidden="true">↗</span></a>
              <Link to="/resume">resume →</Link>
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <div className="strip">
          <ul className="strip-row strip-row--marks">
            {HIGHLIGHTS.map((h) => (
              <li key={h.title}>
                {MARKS[h.mark]}
                <span>
                  <strong>{h.title}</strong>
                  <small>{h.sub}</small>
                </span>
              </li>
            ))}
          </ul>
          <ul className="strip-row strip-row--stats">
            {STATS.map((s) => (
              <li key={s.label}>
                <Link to={s.to}>
                  <strong>
                    {s.value}
                    <sup aria-hidden="true">↗</sup>
                  </strong>
                  <small>{s.label}</small>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <div className="dots dots--rule" aria-hidden="true" />

      <section className="sec">
        <Reveal>
          <SectionHead n="01" title="projects" to="/projects" more="all projects" />
          <ProjectFan />
        </Reveal>
      </section>

      <section className="sec">
        <Reveal>
          <SectionHead n="02" title="experience" to="/experience" more="full history" />
          <ul className="rows">
            {EXPERIENCE.map((e) => (
              <li key={e.id} className="row">
                <span className="row-when">{e.when}</span>
                <span className="row-what">
                  {e.role}
                  {e.highlight && <span className="tag tag--solid row-badge">{e.highlight}</span>}
                </span>
                <span className="row-where">{e.org}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="sec">
        <Reveal>
          <SectionHead n="03" title="education" to="/resume" more="full resume" />
          <ul className="rows">
            {EDUCATION.map((r) => (
              <li key={r.year} className="row">
                <span className="row-when">{r.year}</span>
                <span className="row-what">{r.role}</span>
                <span className="row-where">{r.org}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <div className="sec-sub">
            <div className="sec-head">
              <h3 className="sec-label">Stack</h3>
              <Link to="/stack" className="sec-more">view all →</Link>
            </div>
            <div className="chips chips--lg">
              {TOP_STACK.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
              <Link to="/stack" className="chip chip--dashed">+ {totalStack - TOP_STACK.length} more</Link>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="sec">
        <Reveal>
          <SectionHead n="04" title="certifications" to="/certifications" more="all certifications" />
          <div className="cert-grid">
            {CERTIFICATES.slice(0, 3).map((c, i) => (
              <CertCard key={c.id} cert={c} index={i} onOpen={setCert} />
            ))}
          </div>
        </Reveal>
      </section>

      <section className="sec">
        <Reveal>
          <SectionHead n="05" title="affiliations" to="/affiliations" more="all affiliations" />
          <ul className="aff-row">
            {AFFILIATIONS.map((a) => (
              <li key={a.id}>
                <img src={a.logo} alt="" className="aff-logo" loading="lazy" />
                <span>
                  <strong>{a.short}</strong>
                  <small>{a.role}</small>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="sec">
        <Reveal>
          <SectionHead n="06" title="currently studying" />
          <div className="learn-grid">
            {LEARNING.map((l) => (
              <article key={l.id} className="learn">
                <span className="learn-quote" aria-hidden="true">“</span>
                <p className="learn-note">{l.note}</p>
                <footer>
                  <strong>{l.name}</strong>
                  <small>{l.issuer} · In progress</small>
                </footer>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="sec">
        <Reveal>
          <SectionHead n="07" title="gear" to="/gear" more="all gear" />
          <div className="gear-grid gear-grid--home">
            {GEAR.map((g) => (
              <GearCard key={g.id} item={g} compact />
            ))}
          </div>
        </Reveal>
      </section>

      <section className="sec">
        <Reveal>
          <div className="sec-head">
            <h2 className="sec-title">
              <span className="sec-n">08</span> — github
            </h2>
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="sec-more">
              @{PROFILE.githubHandle} ↗
            </a>
          </div>
          <DotCalendar username={PROFILE.githubHandle} />
        </Reveal>
      </section>

      <div className="dots dots--rule" aria-hidden="true" />

      <section className="sec contact" aria-labelledby="contact-title">
        <Reveal>
          <p className="contact-kicker">Get in touch</p>
          <h2 id="contact-title" className="contact-title">Let's connect</h2>
          <p className="contact-text">
            I'm open to internships, junior developer roles, and student collaborations. The fastest way to reach
            me is email — I reply to everything.
          </p>
          <div className="contact-box">
            <span className="contact-mail">{PROFILE.email}</span>
            <div className="contact-actions">
              <CopyEmail />
              <a href={`mailto:${PROFILE.email}`} className="btn btn--solid">Open mail app</a>
            </div>
          </div>
        </Reveal>
      </section>

      <CertViewer cert={cert} onClose={() => setCert(null)} />
    </div>
  );
}
