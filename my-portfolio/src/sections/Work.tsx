import { PROJECTS } from '../data';
import { Reveal } from '../components/Reveal';
import { IconArrow } from '../components/Icons';

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
              <div className="work-shot">
                <img
                  src={project.image}
                  alt={`${project.title} interface`}
                  loading="lazy"
                />
              </div>

              <div className="work-body">
                <div className="work-head">
                  <p className="work-org">{project.org}</p>
                  <span className="work-tag">{project.category}</span>
                </div>
                <h3 className="work-title">{project.title}</h3>
                <p className="work-tagline">{project.tagline}</p>
                <p className="work-desc">{project.detail}</p>

                <div className="work-metrics">
                  {project.metrics.map((m) => (
                    <span className="metric" key={m.label}>
                      <b>{m.value}</b>
                      <span>{m.label}</span>
                    </span>
                  ))}
                </div>

                <div className="feature-grid">
                  {project.features.map((f) => (
                    <div className="feature-item" key={f.title}>
                      <h4>{f.title}</h4>
                      <p>{f.body}</p>
                    </div>
                  ))}
                </div>

                <div className="chip-cloud" style={{ marginTop: 22 }}>
                  {project.stack.map((tech) => (
                    <span className="chip" key={tech}>
                      {tech}
                    </span>
                  ))}
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
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
