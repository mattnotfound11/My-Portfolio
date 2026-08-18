import { PROFILE, TECH_COUNT, CERTIFICATES, STACK } from '../data';
import { Reveal } from '../components/Reveal';
import { Counter } from '../components/Motion';
import { GithubActivity } from '../components/GithubActivity';
import { ProfileSwap } from '../components/ProfileSwap';
import { IconArrow, IconPin } from '../components/Icons';

export function About() {
  return (
    <section id="about" className="section section-arc">
      <div className="shell">
        <div className="sec-head">
          <Reveal>
            <span className="badge-pill">
              <span className="dot" />
              Get to know me
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="sec-title">
              Turning ideas into <span className="tone-dim">shipped software</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="sec-sub">
              Student by day, builder by habit. I care about software that people
              actually use, not demos that only look good in a screenshot.
            </p>
          </Reveal>
        </div>

        <div className="bento">
          {/* Identity */}
          <Reveal className="span-2 row-2">
            <article className="bento-card id-tile" style={{ height: '100%' }}>
              <ProfileSwap
                base="/assets/profile.jpg"
                hover="/assets/profile-hover.jpg"
                alt={PROFILE.name}
              />
              <div className="id-copy">
                <span className="eyebrow">A {PROFILE.roleShort}</span>
                <h3 className="id-name">
                  {PROFILE.first}
                  <br />
                  {PROFILE.last}.
                </h3>
                <p className="id-blurb">{PROFILE.blurb}</p>
              </div>
            </article>
          </Reveal>

          {/* Study status */}
          <Reveal delay={0.06} className="span-2">
            <article className="bento-card" style={{ height: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 14,
                }}
              >
                <span className="live-dot" />
                <span className="eyebrow" style={{ color: 'var(--mint)' }}>
                  Currently studying
                </span>
              </div>
              <p className="tile-big">{PROFILE.year}</p>
              <p className="tile-headline">{PROFILE.program}</p>
              <p
                className="id-blurb"
                style={{ marginTop: 8, display: 'flex', gap: 6 }}
              >
                <IconPin width={16} height={16} style={{ marginTop: 3 }} />
                {PROFILE.school}
              </p>
            </article>
          </Reveal>

          {/* Stats */}
          <Reveal delay={0.12} className="span-2">
            <article className="bento-card" style={{ height: '100%' }}>
              <span className="eyebrow">By the numbers</span>
              <div className="stat-row" style={{ marginTop: 16 }}>
                <div className="stat">
                  <span className="stat-num"><Counter value="800+" /></span>
                  <span className="stat-label">
                    Students
                    <br />
                    served
                  </span>
                </div>
                <div className="stat">
                  <span className="stat-num"><Counter value={String(TECH_COUNT)} /></span>
                  <span className="stat-label">
                    Tech
                    <br />
                    stack
                  </span>
                </div>
                <div className="stat">
                  <span className="stat-num">
                    <Counter value={String(CERTIFICATES.length).padStart(2, '0')} />
                  </span>
                  <span className="stat-label">
                    Creden&shy;tials
                  </span>
                </div>
              </div>
            </article>
          </Reveal>

          {/* Disciplines */}
          <Reveal delay={0.18} className="span-4">
            <article className="bento-card" style={{ height: '100%' }}>
              <span className="eyebrow">What I work across</span>
              <div className="chip-cloud">
                {STACK.map((g) => (
                  <span className="chip" key={g.id}>
                    {g.label}
                  </span>
                ))}
              </div>
              <a href="#stack" className="tile-arrow" aria-label="See full stack">
                <IconArrow width={15} height={15} />
              </a>
            </article>
          </Reveal>

          {/* Live GitHub */}
          <Reveal delay={0.24} className="span-4">
            <GithubActivity />
          </Reveal>

          {/* CTA — full-width closing band */}
          <Reveal delay={0.3} className="span-4">
            <article className="bento-card cta-tile">
              <div>
                <h3 className="tile-big" style={{ marginBottom: 8 }}>
                  Let's build{' '}
                  <span className="tone-serif tone-amber">something.</span>
                </h3>
                <p className="id-blurb">
                  Open to internships, junior roles, and student collaborations.
                </p>
              </div>
              <a href="#contact" className="btn btn-primary">
                Get in touch
                <IconArrow width={16} height={16} />
              </a>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
