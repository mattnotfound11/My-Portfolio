import { PROFILE, MARQUEE } from '../data';
import { Reveal } from '../components/Reveal';
import {
  IconChevronDown,
  IconArrow,
  IconGithub,
  IconLinkedin,
  IconMail,
} from '../components/Icons';

const METEORS = [
  { top: '12%', left: '18%', delay: '0s', dur: '4.2s' },
  { top: '22%', left: '72%', delay: '1.4s', dur: '5.1s' },
  { top: '38%', left: '8%', delay: '2.8s', dur: '4.6s' },
  { top: '54%', left: '88%', delay: '0.7s', dur: '5.6s' },
  { top: '66%', left: '32%', delay: '3.4s', dur: '4.9s' },
  { top: '30%', left: '52%', delay: '4.6s', dur: '5.3s' },
  { top: '76%', left: '64%', delay: '2.1s', dur: '4.4s' },
];

export function Hero() {
  return (
    <>
      <section id="home" className="hero">
        {/* Ambience: grid, meteors, horizon */}
        <div className="hero-ambience" aria-hidden="true">
          <div className="hero-grid" />
          {METEORS.map((m, i) => (
            <span
              key={i}
              className="meteor"
              style={{
                top: m.top,
                left: m.left,
                animationDelay: m.delay,
                animationDuration: m.dur,
              }}
            />
          ))}
        </div>
        <div className="hero-horizon" aria-hidden="true" />

        {/* Corner statements */}
        <p className="hero-note hero-note--tl">
          {PROFILE.name} · Building secure, practical software for real
          institutions.
        </p>
        <p className="hero-note hero-note--br">
          Shipping production web apps with React, Next.js &amp; TypeScript —
          and keeping them safe.
        </p>

        {/* Availability rail */}
        <div className="hero-rail" aria-hidden="true">
          <span className="hero-rail-dot" />
          Available for opportunity
        </div>

        <div className="shell hero-inner">
          <Reveal>
            <h1 className="hero-wordmark">
              {PROFILE.titleLines.map((line, i) => (
                <span
                  className={`wm-line ${i === 2 ? 'wm-line--sm' : ''}`}
                  key={line}
                  style={{ animationDelay: `${0.15 + i * 0.13}s` }}
                >
                  {line}
                </span>
              ))}
            </h1>
          </Reveal>

          {/* Icons orbiting the wordmark, as on the reference */}
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-orbit hero-orbit--gh"
            aria-label="GitHub"
          >
            <IconGithub />
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-orbit hero-orbit--li"
            aria-label="LinkedIn"
          >
            <IconLinkedin />
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            className="hero-orbit hero-orbit--ml"
            aria-label="Email"
          >
            <IconMail />
          </a>

          <Reveal delay={0.42}>
            <a href="#work" className="btn-resume">
              View my work
              <IconArrow width={16} height={16} />
            </a>
          </Reveal>
        </div>

        <a href="#about" className="hero-scroll" aria-label="Scroll to about">
          <IconChevronDown width={18} height={18} />
        </a>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((run) => (
            <div className="marquee-run" key={run}>
              {MARQUEE.map((item) => (
                <span className="marquee-item" key={item}>
                  {item}
                  <span className="marquee-sep"> ◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
