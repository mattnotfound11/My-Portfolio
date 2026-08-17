import { PROFILE, MARQUEE } from '../data';
import { Reveal } from '../components/Reveal';
import { IconChevronDown, IconArrow } from '../components/Icons';
import { SplitText } from '../components/Motion';

export function Hero() {
  return (
    <>
      <section id="home" className="hero">
        <div className="hero-ambience" aria-hidden="true">
          <div className="hero-grid" />
        </div>

        <div className="shell hero-inner">
          <Reveal>
            <span className="badge-pill">
              <span className="dot" />
              Available for internships
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="hero-role">
              {PROFILE.role} · {PROFILE.location}
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <h1 className="hero-title">
              <SplitText text={PROFILE.first} />
              <br />
              <span className="tone-dim">
                <SplitText text={PROFILE.last} delay={0.12} />
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.22}>
            <p className="hero-sub">
              I build web applications that solve real problems for real
              institutions — like <strong>PHARMATRACK</strong>, the QR attendance
              system now used by 800+ pharmacy students at the University of San
              Agustin.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="hero-actions">
              <a href="#work" className="btn btn-primary">
                View my work
                <IconArrow width={16} height={16} />
              </a>
              <a href="#contact" className="btn btn-ghost">
                Get in touch
              </a>
            </div>
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
