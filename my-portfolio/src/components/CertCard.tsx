import type { Certificate } from '../data';

/** Small rotations so the grid reads like cards laid on a desk. */
const TILT = [-1.2, 0.8, -0.5, 1.1, -0.9, 0.5, 1, -0.7];

export function CertCard({ cert, index, onOpen, tilt = false }: {
  cert: Certificate;
  index: number;
  onOpen: (c: Certificate) => void;
  tilt?: boolean;
}) {
  return (
    <button
      type="button"
      className="cert"
      style={tilt ? { ['--tilt' as string]: `${TILT[index % TILT.length]}deg` } : undefined}
      onClick={() => onOpen(cert)}
      aria-label={`View ${cert.name} certificate`}
    >
      <span className="cert-shot">
        <img src={cert.image} alt="" loading="lazy" />
      </span>
      <span className="cert-text">
        <span className="cert-name">{cert.name}</span>
        <span className="cert-issuer">
          {cert.issuer} · {cert.year}
        </span>
        <span className="cert-view" aria-hidden="true">‹ View ›</span>
      </span>
    </button>
  );
}
