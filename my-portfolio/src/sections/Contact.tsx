import { PROFILE } from '../data';
import { Reveal } from '../components/Reveal';
import {
  IconMail,
  IconPin,
  IconLinkedin,
  IconGithub,
  IconArrow,
} from '../components/Icons';

const ROWS = [
  {
    icon: IconMail,
    label: 'Email',
    value: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
  },
  {
    icon: IconLinkedin,
    label: 'LinkedIn',
    value: 'matthew-tabat',
    href: PROFILE.linkedin,
  },
  {
    icon: IconGithub,
    label: 'GitHub',
    value: `@${PROFILE.githubHandle}`,
    href: PROFILE.github,
  },
  {
    icon: IconPin,
    label: 'Location',
    value: PROFILE.location,
  },
];

export function Contact() {
  return (
    <section id="contact" className="section">
      <div className="shell">
        <Reveal>
          <div className="contact-card">
            <h2 className="contact-title">
              Let's build{' '}
              <span className="tone-serif tone-amber">something good.</span>
            </h2>
            <p className="contact-sub">
              I'm open to internships, junior developer roles, and student
              collaborations. The fastest way to reach me is email — I reply to
              everything.
            </p>

            <div className="contact-rows">
              {ROWS.map((row) => {
                const Icon = row.icon;
                const inner = (
                  <>
                    <Icon />
                    <span>
                      <span className="label">{row.label}</span>
                      <span
                        className="value"
                        style={{ display: 'block', marginTop: 2 }}
                      >
                        {row.value}
                      </span>
                    </span>
                  </>
                );

                return row.href ? (
                  <a
                    key={row.label}
                    href={row.href}
                    className="contact-row"
                    target={row.href.startsWith('http') ? '_blank' : undefined}
                    rel={
                      row.href.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={row.label} className="contact-row">
                    {inner}
                  </div>
                );
              })}
            </div>

            <div
              style={{
                position: 'relative',
                marginTop: 34,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <a href={`mailto:${PROFILE.email}`} className="btn btn-primary">
                Send me an email
                <IconArrow width={16} height={16} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
