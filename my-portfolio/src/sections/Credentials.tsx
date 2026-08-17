import { CERTIFICATES, EDUCATION, LEARNING } from '../data';
import { Reveal } from '../components/Reveal';
import { IconCheck } from '../components/Icons';

export function Credentials() {
  return (
    <section id="credentials" className="section section-arc section-arc--violet">
      <div className="shell">
        <div className="sec-head">
          <Reveal>
            <span className="badge-pill badge-pill--violet">
              <span className="dot" />
              Certifications
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="sec-title">
              Credentials <span className="tone-violet">& learning</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="sec-sub">
              {String(CERTIFICATES.length).padStart(2, '0')} credentials across
              AI, design, networking, and engineering fundamentals — course
              certifications plus one regional AI conference.
            </p>
          </Reveal>
        </div>

        <div className="cert-grid">
          {CERTIFICATES.map((cert, i) => (
            <Reveal key={cert.id} delay={i * 0.06}>
              <article className="cert-card">
                <div className="cert-shot">
                  <img
                    src={cert.image}
                    alt={`${cert.name} certificate issued by ${cert.issuer}`}
                    loading="lazy"
                  />
                </div>

                <div className="cert-body">
                  <div className="cert-top">
                    <span
                      className={`cert-verified ${
                        cert.kind === 'Attended' ? 'is-attended' : ''
                      }`}
                    >
                      <IconCheck />
                      {cert.kind ?? 'Verified'}
                    </span>
                    <span className="cert-year">{cert.year}</span>
                  </div>

                  <p className="cert-issuer">{cert.issuer}</p>
                  <h3 className="cert-name">{cert.name}</h3>
                  <p className="cert-desc">{cert.description}</p>

                  <div className="cert-meta">
                    {cert.meta.map((m) => (
                      <span key={m}>{m}</span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* ── In progress ── */}
        <div className="learn-strip">
          <div className="learn-head">
            <span className="eyebrow">Currently studying</span>
            <p className="learn-lede">
              In progress right now — listed separately from what I've earned.
            </p>
          </div>

          <div className="learn-grid">
            {LEARNING.map((l, i) => (
              <Reveal key={l.id} delay={i * 0.07}>
                <article className="learn-card">
                  <div className="learn-top">
                    <span className="learn-badge">
                      <span className="learn-pulse" />
                      In progress
                    </span>
                    <span className="cert-issuer" style={{ margin: 0 }}>
                      {l.issuer}
                    </span>
                  </div>
                  <h3 className="cert-name">{l.name}</h3>
                  <p className="cert-desc">{l.note}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── Education ── */}
        <div className="sec-head sec-head--left" style={{ marginTop: 96 }}>
          <Reveal>
            <span className="badge-pill">
              <span className="dot" />
              Education
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="sec-title">
              Where I <span className="tone-amber">studied</span>
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="tl">
            {EDUCATION.map((item) => (
              <div
                className={`tl-item ${item.now ? 'is-now' : ''}`}
                key={item.role + item.org}
              >
                {item.logo && (
                  <img className="tl-logo" src={item.logo} alt="" loading="lazy" />
                )}
                <p className="tl-year">{item.year}</p>
                <h3 className="tl-role">{item.role}</h3>
                <p className="tl-org">{item.org}</p>
                {item.note && <p className="tl-note">{item.note}</p>}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
