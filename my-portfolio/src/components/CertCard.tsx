import type { Certificate } from '../data';
import { Mark } from './ui';

/** Small rotations so the grid reads like cards laid on a desk. */
const TILT = [-1.4, 0.9, -0.6, 1.3, -1, 0.5, 1.1, -0.8];

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
      <Mark name={cert.issuer} logo={cert.logo} size="sm" />
      <span className="cert-name">{cert.name}</span>
      <span className="cert-issuer">{cert.issuer}</span>
      <span className="cert-view" aria-hidden="true">‹ View ›</span>
    </button>
  );
}
