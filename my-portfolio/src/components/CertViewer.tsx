import { useEffect, useRef } from 'react';
import type { Certificate } from '../data';
import { IconClose } from './Icons';
import { Chip } from './ui';

/** Full-size view of a certificate scan with its details. */
export function CertViewer({ cert, onClose }: { cert: Certificate | null; onClose: () => void }) {
  const close = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!cert) return;
    const back = document.activeElement as HTMLElement | null;
    close.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      back?.focus();
    };
  }, [cert, onClose]);

  if (!cert) return null;

  return (
    <div className="viewer-backdrop" onMouseDown={onClose}>
      <div
        className="viewer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="viewer-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button ref={close} type="button" className="viewer-close" onClick={onClose} aria-label="Close">
          <IconClose width={18} height={18} />
        </button>
        <img src={cert.image} alt={`${cert.name} certificate issued by ${cert.issuer}`} className="viewer-img" />
        <div className="viewer-body">
          <p className="viewer-issuer">
            {cert.issuer} · {cert.year}
          </p>
          <h2 id="viewer-title" className="viewer-title">
            {cert.name}
          </h2>
          <p className="viewer-text">{cert.description}</p>
          <div className="chips">
            {cert.kind === 'Attended' && <Chip>Attended</Chip>}
            {cert.meta.map((m) => (
              <Chip key={m}>{m}</Chip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
