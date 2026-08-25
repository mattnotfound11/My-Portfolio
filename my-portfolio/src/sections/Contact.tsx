import { PROFILE } from '../data';
import { Reveal } from '../components/Reveal';
import {
  IconMail,
  IconPin,
  IconLinkedin,
  IconGithub,
  IconArrow,
} from '../components/Icons';

/** Same four details as before — email, LinkedIn, GitHub, location. */
const CHANNELS = [
  {
    id: 'email',
    icon: IconMail,
    label: 'Email',
    value: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
  },
  {
    id: 'linkedin',
    icon: IconLinkedin,
    label: 'LinkedIn',
    value: 'matthew-tabat',
    href: PROFILE.linkedin,
  },
  {
    id: 'github',
    icon: IconGithub,
    label: 'GitHub',
    value: `@${PROFILE.githubHandle}`,
    href: PROFILE.github,
  },
  {
    id: 'location',
    icon: IconPin,
    label: 'Location',
    value: PROFILE.location,
  },
];

export function Contact() {
  return (
    <section id="contact" className="section">
      <div className="shell">
        <div className="connect">
          <Reveal>
            <h2 className="connect-title">
              Let's <span className="connect-grad">connect</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="connect-sub">
              I'm open to internships, junior developer roles, and student
              collaborations. The fastest way to reach me is email — I reply to
              everything.
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="connect-panel">
              <div className="connect-grid">
                {CHANNELS.map((c) => {
                  const Icon = c.icon;
                  const inner = (
                    <>
                      <span className="connect-orb">
                        <Icon width={26} height={26} />
                      </span>
                      <span className="connect-label">{c.label}</span>
                      <span className="connect-value">{c.value}</span>
                    </>
                  );
                  const cls = `connect-item connect-item--${c.id}`;

                  return c.href ? (
                    <a
                      key={c.id}
                      href={c.href}
                      className={cls}
                      target={c.href.startsWith('http') ? '_blank' : undefined}
                      rel={
                        c.href.startsWith('http')
                          ? 'noopener noreferrer'
                          : undefined
                      }
                    >
                      {inner}
                    </a>
                  ) : (
                    <div key={c.id} className={cls}>
                      {inner}
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <a href={`mailto:${PROFILE.email}`} className="btn btn-primary">
              Send me an email
              <IconArrow width={16} height={16} />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
