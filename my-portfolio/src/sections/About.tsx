import { PROFILE, STACK, LEARNING } from '../data';
import { Reveal } from '../components/Reveal';
import { GithubCalendar } from '../components/GithubCalendar';
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
          {/* Portrait + identity */}
          <Reveal className="span-2 row-2">
            <article className="bento-card id-tile">
              <ProfileSwap
                base="/assets/profile-hover.jpg"
                cover="/assets/profile.jpg"
                alt={PROFILE.name}
              />
              <div className="id-copy">
                <span className="eyebrow">A {PROFILE.roleShort}</span>
                <h3 className="id-name">
                  {PROFILE.first} {PROFILE.last}
                </h3>
                <p className="id-blurb">{PROFILE.blurb}</p>
              </div>
            </article>
          </Reveal>

          {/* Study status — sits beside the portrait's first row. */}
          <Reveal delay={0.06} className="span-2">
            <article className="bento-card">
              <div className="tile-head">
                <span className="live-dot" />
                <span className="eyebrow eyebrow--mint">Currently studying</span>
              </div>

              <div className="tile-body">
                <p className="tile-big">{PROFILE.year}</p>
                <p className="tile-headline">{PROFILE.program}</p>
                <p className="tile-meta tile-meta--inline">
                  <IconPin width={15} height={15} />
                  {PROFILE.school}
                </p>
              </div>

              <div className="mini-list">
                <span className="eyebrow">Alongside</span>
                {LEARNING.map((l) => (
                  <div className="mini-row" key={l.id}>
                    <span className="mini-dot" />
                    <span className="mini-name">{l.name}</span>
                    <span className="mini-org">{l.issuer}</span>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>

          {/* Disciplines — fills the portrait's second row, so the tall
              portrait is flanked top and bottom and no cell is left empty. */}
          <Reveal delay={0.12} className="span-2">
            <article className="bento-card">
              <div className="tile-head tile-head--split">
                <span className="eyebrow">What I work across</span>
                <a href="#stack" className="tile-link">
                  Full stack
                  <IconArrow width={13} height={13} />
                </a>
              </div>

              <div className="chip-cloud">
                {STACK.map((g) => (
                  <span className="chip" key={g.id}>
                    {g.label}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>

          {/* GitHub contribution calendar */}
          <Reveal delay={0.18} className="span-4">
            <article className="bento-card">
              <div className="tile-head tile-head--split">
                <span className="eyebrow">Contribution activity</span>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tile-link"
                >
                  @{PROFILE.githubHandle}
                  <IconArrow width={13} height={13} />
                </a>
              </div>
              <GithubCalendar username={PROFILE.githubHandle} />
            </article>
          </Reveal>

          {/* Closing band */}
          <Reveal delay={0.24} className="span-4">
            <article className="bento-card cta-tile">
              <div className="cta-copy">
                <h3 className="tile-big">
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
