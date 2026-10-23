import { useState } from 'react';
import { CERT_TYPES, CERTIFICATES, LEARNING, PROFILE, type Certificate } from '../data';
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

      {CERT_TYPES.map((t) => {
        const list = CERTIFICATES.filter((c) => c.type === t.type);
        if (!list.length) return null;
        return (
          <Reveal key={t.type}>
            <section className="cert-group">
              <div className="cert-group-head">
                <h2 className="sec-label">{t.label}</h2>
                <span className="cert-count">{String(list.length).padStart(2, '0')}</span>
              </div>
              <p className="group-note">{t.note}</p>
              <div className="cert-grid cert-grid--page">
                {list.map((c, i) => (
                  <CertCard key={c.id} cert={c} index={i} onOpen={setCert} tilt />
                ))}
              </div>
            </section>
          </Reveal>
        );
      })}

      <Reveal>
        <section className="cert-group">
          <div className="cert-group-head">
            <h2 className="sec-label">Currently studying</h2>
            <span className="cert-count">{String(LEARNING.length).padStart(2, '0')}</span>
          </div>
          <p className="group-note">In progress right now — listed separately from what I've earned.</p>
          <div className="cert-grid cert-grid--page">
            {LEARNING.map((l) => (
              <div key={l.id} className="cert cert--pending">
                <span className="cert-shot cert-shot--pending">
                  <Mark name={l.issuer} size="sm" />
                </span>
                <span className="cert-text">
                  <span className="cert-name">{l.name}</span>
                  <span className="cert-issuer">{l.issuer}</span>
                  <span className="cert-view">Studying now</span>
                </span>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <CertViewer cert={cert} onClose={() => setCert(null)} />
    </div>
  );
}
