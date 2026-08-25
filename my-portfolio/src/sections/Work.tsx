import { PROJECTS, BUILDING } from '../data';
import { Reveal } from '../components/Reveal';
import { CoverflowCarousel } from '../components/CoverflowCarousel';
import { IconArrow, IconGithub } from '../components/Icons';

export function Work() {
  return (
    <section id="work" className="section section-arc">
      <div className="shell">
        <div className="sec-head">
          <Reveal>
            <span className="badge-pill">
              <span className="dot" />
              Selected work
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="sec-title">
              Built for <span className="tone-amber">real users</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="sec-sub">
              One project, shipped and in daily use. I would rather show you
              something running in production than a folder of concepts.
            </p>
          </Reveal>
        </div>

        {PROJECTS.map((project) => (
          <Reveal key={project.id} delay={0.1}>
            <article className="work-card">
              {/* Real screens from the live site. Drag, arrow keys, or the
                  chevrons — the deck stays compact whatever the viewport. */}
              <CoverflowCarousel
                slides={project.shots}
                label={`${project.title} screens`}
                className="work-deck"
                cardWidth="clamp(150px, 19vw, 236px)"
                showCaption
                showNavigation
                showPagination
              />

              <div className="work-body">
                <div className="work-head">
                  <p className="work-org">{project.org}</p>
                  <span className="work-tag">{project.category}</span>
                </div>
                <h3 className="work-title">{project.title}</h3>
                <p className="work-tagline">{project.tagline}</p>

                {/* My contribution, stated before the product description so
                    the stack below is never read as a personal skill claim. */}
                <div className="work-role">
                  <span className="work-role-tag">My role</span>
                  <div>
                    <p className="work-role-name">{project.role}</p>
                    <p className="work-role-note">{project.roleNote}</p>
                  </div>
                </div>

                <div className="work-split">
                  <div className="work-col">
                    <p className="work-desc">{project.detail}</p>

                    <div className="work-metrics">
                      {project.metrics.map((m) => (
                        <span className="metric" key={m.label}>
                          <b>{m.value}</b>
                          <span>{m.label}</span>
                        </span>
                      ))}
                    </div>

                    <div className="work-stack">
                      <span className="eyebrow">Project stack</span>
                      <div className="chip-cloud">
                        {project.stack.map((tech) => (
                          <span className="chip" key={tech}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="work-actions">
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                      >
                        Visit live site
                        <IconArrow width={16} height={16} />
                      </a>
                    </div>
                  </div>

                  <ul className="feature-list">
                    {project.features.map((f) => (
                      <li className="feature-row" key={f.title}>
                        <h4>{f.title}</h4>
                        <p>{f.body}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </Reveal>
        ))}

        {/* ── Currently building ── */}
        <div className="build-strip">
          <div className="sec-head sec-head--left" style={{ marginBottom: 30 }}>
            <Reveal>
              <span className="badge-pill badge-pill--violet">
                <span className="dot" />
                Currently building
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h3 className="sec-title" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
                Live, still <span className="tone-violet">in progress</span>
              </h3>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="sec-sub">
                Each one is deployed and usable today, and each is still being
                worked on — so treat them as work in motion rather than finished
                case studies.
              </p>
            </Reveal>
          </div>

          <div className="build-grid">
            {BUILDING.map((b, i) => (
              <Reveal key={b.id} delay={i * 0.08}>
                <article className="build-card">
                  <a
                    href={b.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="build-shot"
                    aria-label={`Open ${b.name}`}
                  >
                    <img src={b.image} alt={`${b.name} home page`} loading="lazy" />
                  </a>

                  <div className="build-body">
                    <div className="build-top">
                      <span className="learn-badge">
                        <span className="learn-pulse" />
                        In progress
                      </span>
                      <span className="build-kind">{b.kind}</span>
                    </div>

                    <h4 className="build-name">{b.name}</h4>
                    <p className="cert-desc">{b.blurb}</p>

                    <div className="chip-cloud">
                      {b.stack.map((t) => (
                        <span className="chip" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="build-actions">
                      <a
                        href={b.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-ghost btn-mono"
                      >
                        Visit site
                        <IconArrow width={14} height={14} />
                      </a>
                      <a
                        href={b.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-ghost btn-mono"
                      >
                        <IconGithub width={14} height={14} />
                        Source
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
