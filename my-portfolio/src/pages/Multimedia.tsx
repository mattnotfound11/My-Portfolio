import type { SVGProps } from 'react';
import { LABS, SLIDE, type Kind } from '../multimedia';
import { PROFILE } from '../data';
import { useTitle } from '../router';
import { Reveal } from '../components/Reveal';
import { PageHead } from '../components/ui';

const glyph = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/** One line-drawn glyph per kind of work, matching the site's icon style. */
function KindGlyph({ kind, ...p }: { kind: Kind } & SVGProps<SVGSVGElement>) {
  switch (kind) {
    case 'Slides':
      return (
        <svg {...glyph} {...p}>
          <rect x="3" y="4" width="18" height="12" rx="1" />
          <path d="M12 16v4M8 20h8M7 8h6M7 11h10" />
        </svg>
      );
    case 'Logo':
      return (
        <svg {...glyph} {...p}>
          <path d="M12 3 4 7.5v9L12 21l8-4.5v-9z" />
          <path d="M12 3v18M4 7.5l16 9M20 7.5l-16 9" />
        </svg>
      );
    case 'Audio':
      return (
        <svg {...glyph} {...p}>
          <path d="M3 12h2M7 8v8M11 5v14M15 9v6M19 7v10M21 12h0" />
        </svg>
      );
    case 'Sound design':
      return (
        <svg {...glyph} {...p}>
          <path d="M4 10v4h3l5 4V6L7 10z" />
          <path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11" />
        </svg>
      );
    case 'Poster':
      return (
        <svg {...glyph} {...p}>
          <rect x="5" y="3" width="14" height="18" rx="1" />
          <path d="M8 7h8M8 17v-3M11 17v-5M14 17v-2M8 10h4" />
        </svg>
      );
    case 'Film':
      return (
        <svg {...glyph} {...p}>
          <rect x="3" y="5" width="18" height="14" rx="1" />
          <path d="M7 5v14M17 5v14M3 9h4M3 15h4M17 9h4M17 15h4" />
        </svg>
      );
    case 'Video':
      return (
        <svg {...glyph} {...p}>
          <rect x="3" y="6" width="13" height="12" rx="1" />
          <path d="m16 10 5-3v10l-5-3" />
        </svg>
      );
  }
}

/** The real screenshot when there is one, otherwise a drawn cover. */
function Cover({ kind, image, alt, label }: { kind: Kind; image?: string; alt: string; label: string }) {
  if (image) return <img className="mm-shot" src={image} alt={alt} loading="lazy" />;
  return (
    <div className="mm-cover" aria-hidden="true">
      <KindGlyph kind={kind} width={34} height={34} />
      <span className="mm-cover-label">{label}</span>
    </div>
  );
}

export function Multimedia() {
  useTitle(`Multimedia — ${PROFILE.name}`);

  return (
    <div className="page page--wide">
      <PageHead title="multimedia">
        Work from IT 312 Multimedia Systems: a project presentation and the {LABS.length} laboratory activities I
        submitted, across audio, design and video.
      </PageHead>

      <Reveal>
        <section className="cert-group">
          <h2 className="sec-label">Presentation</h2>
          <a className="mm-slide" href={SLIDE.href} target="_blank" rel="noopener noreferrer">
            {SLIDE.image ? (
              <img className="mm-shot" src={SLIDE.image} alt={`First slide of ${SLIDE.title}`} />
            ) : (
              <div className="mm-title-slide" aria-hidden="true">
                <span className="mm-title-kicker">Slide 01 · Project proposal</span>
                <span className="mm-title-name">UniLend</span>
                <span className="mm-title-meta">BS Information Technology · {PROFILE.school}</span>
              </div>
            )}
            <span className="mm-slide-cap">
              <span className="cert-name">{SLIDE.title}</span>
              <span className="cert-issuer">{SLIDE.note}</span>
            </span>
          </a>
        </section>
      </Reveal>

      <Reveal>
        <section className="cert-group">
          <h2 className="sec-label">Laboratory activities</h2>
          <div className="mm-grid">
            {LABS.map((lab) => (
              <article key={lab.id} className="cert mm-lab">
                <Cover kind={lab.kind} image={lab.image} alt={lab.title} label={lab.kind} />
                <span className="cert-issuer">
                  {lab.tag} · {lab.due}
                </span>
                <h3 className="cert-name">{lab.title}</h3>
                <p className="mm-sum">{lab.summary}</p>
                {lab.team && <p className="mm-team">Group work with {lab.team.join(', ')}</p>}
                {lab.links.length > 0 && (
                  <span className="mm-links">
                    {lab.links.map((l) => (
                      <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="mm-link">
                        {l.label} ↗
                      </a>
                    ))}
                  </span>
                )}
              </article>
            ))}
          </div>
        </section>
      </Reveal>
    </div>
  );
}
