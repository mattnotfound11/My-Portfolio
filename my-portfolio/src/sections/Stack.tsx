import { useState } from 'react';
import { STACK, TECH_COUNT } from '../data';
import { Reveal } from '../components/Reveal';
import { Meter } from '../components/Motion';
import {
  IconLayout,
  IconServer,
  IconDatabase,
  IconShield,
  IconKey,
  IconTools,
} from '../components/Icons';

const STACK_ICONS = {
  layout: IconLayout,
  server: IconServer,
  database: IconDatabase,
  key: IconKey,
  tools: IconTools,
  shield: IconShield,
} as const;

export function Stack() {
  const [activeId, setActiveId] = useState(STACK[0].id);
  const active = STACK.find((g) => g.id === activeId) ?? STACK[0];
  const ActiveIcon = STACK_ICONS[active.icon];

  return (
    <section id="stack" className="section section-arc section-arc--violet">
      <div className="shell">
        <div className="sec-head">
          <Reveal>
            <span className="badge-pill badge-pill--violet">
              <span className="dot" />
              My toolkit
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="sec-title">
              The stack I <span className="tone-violet">actually use</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="sec-sub">
              {TECH_COUNT} technologies across {STACK.length} areas. Everything
              here is something I have actually worked in — where I am still
              building the skill, the meters say so.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="stack-wrap">
            <aside className="stack-rail">
              <span className="eyebrow">Disciplines</span>
              <div className="rail-list" style={{ marginTop: 12 }}>
                {STACK.map((group) => {
                  const Icon = STACK_ICONS[group.icon];
                  return (
                    <button
                      type="button"
                      key={group.id}
                      className={`rail-btn ${
                        group.id === activeId ? 'is-active' : ''
                      }`}
                      onClick={() => setActiveId(group.id)}
                      aria-pressed={group.id === activeId}
                    >
                      <span className="rail-icon">
                        <Icon />
                      </span>
                      <span>
                        <span className="rail-title">{group.label}</span>
                        <span className="rail-sub">{group.kicker}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </aside>

            <div className="stack-panel">
              <div className="panel-head">
                <span className="panel-icon">
                  <ActiveIcon />
                </span>
                <div>
                  <h3 className="panel-title">{active.label}</h3>
                  <p className="panel-kicker">{active.kicker}</p>
                </div>
                <span className="panel-count">
                  {String(active.items.length).padStart(2, '0')} tools
                </span>
              </div>

              <p className="panel-body">{active.summary}</p>

              <span className="eyebrow">Confidence · self-assessed</span>
              <div className="meter-grid">
                {active.levels.map((l) => (
                  <Meter key={l.label} label={l.label} value={l.value} />
                ))}
              </div>

              <span className="eyebrow">Technologies</span>
              <div className="tech-grid">
                {active.items.map((item) => (
                  <div className="tech-item" key={item}>
                    <span className="tech-bullet" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
