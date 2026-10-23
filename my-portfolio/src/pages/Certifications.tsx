import { useState } from 'react';
import { CERTIFICATES, LEARNING, PROFILE, type Certificate } from '../data';
import { useTitle } from '../router';
import { Reveal } from '../components/Reveal';
import { CertCard } from '../components/CertCard';
import { CertViewer } from '../components/CertViewer';
import { Mark, PageHead } from '../components/ui';

export function Certifications() {
  useTitle(`Certifications — ${PROFILE.name}`);
  const [cert, setCert] = useState<Certificate | null>(null);

  return (
    <div className="page page--wide">
      <PageHead title="certifications">
        {String(CERTIFICATES.length).padStart(2, '0')} credentials across AI, design, networking, and engineering
        fundamentals — course certifications plus one regional AI conference.
      </PageHead>

      <Reveal>
        <section className="cert-group">
          <h2 className="sec-label">Certifications</h2>
          <div className="cert-grid cert-grid--page">
            {CERTIFICATES.map((c, i) => (
              <CertCard key={c.id} cert={c} index={i} onOpen={setCert} tilt />
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="cert-group">
          <h2 className="sec-label">Currently studying</h2>
          <p className="group-note">In progress right now — listed separately from what I've earned.</p>
          <div className="cert-grid cert-grid--page">
            {LEARNING.map((l) => (
              <div key={l.id} className="cert cert--pending">
                <Mark name={l.issuer} size="sm" />
                <span className="cert-name">{l.name}</span>
                <span className="cert-issuer">{l.issuer}</span>
                <span className="cert-view">Studying now</span>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <CertViewer cert={cert} onClose={() => setCert(null)} />
    </div>
  );
}
