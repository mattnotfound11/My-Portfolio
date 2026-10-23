import { useState } from 'react';
import { PRODUCTS, PROFILE, type Product } from '../data';
import { useTitle } from '../router';
import { Reveal } from '../components/Reveal';
import { PageHead } from '../components/ui';
import { IconCheck, IconMail } from '../components/Icons';

function notifyLink(p: Product) {
  const subject = encodeURIComponent(`${p.name} — notify me`);
  const body = encodeURIComponent(`Hi Matthew,\n\nI'm interested in the ${p.name}. Let me know when it's available.\n\n`);
  return `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
}

function NfcGlyph() {
  return (
    <svg viewBox="0 0 48 48" width="44" height="44" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <rect x="8" y="12" width="32" height="24" rx="3" />
      <path d="M22 20a6 6 0 0 1 0 8M26 17a10 10 0 0 1 0 14M30 14a14 14 0 0 1 0 20" />
    </svg>
  );
}

function ProductCard({ p }: { p: Product }) {
  const [missing, setMissing] = useState(false);
  return (
    <article className="product">
      <div className="product-plate">
        <span className="tag product-status">{p.status}</span>
        {missing ? (
          <span className="gear-fallback" aria-hidden="true">
            <NfcGlyph />
          </span>
        ) : (
          <img src={p.image} alt={p.name} loading="lazy" onError={() => setMissing(true)} />
        )}
      </div>
      <div className="product-body">
        <p className="product-kind">{p.kind}</p>
        <h2 className="product-name">{p.name}</h2>
        <p className="product-blurb">{p.blurb}</p>
        <ul className="product-points">
          {p.points.map((pt) => (
            <li key={pt}>
              <IconCheck width={14} height={14} aria-hidden="true" />
              {pt}
            </li>
          ))}
        </ul>
        <a href={notifyLink(p)} className="btn btn--solid product-cta">
          <IconMail width={14} height={14} /> Notify me
        </a>
      </div>
    </article>
  );
}

export function Shop() {
  useTitle(`Shop — ${PROFILE.name}`);

  return (
    <div className="page page--wide">
      <PageHead title="shop">
        NFC cards I'll be selling soon. Tap a phone, open a link. Want one when they launch? Hit “Notify me” and
        I'll email you first.
      </PageHead>

      <Reveal>
        <section>
          <h2 className="sec-label">NFC cards</h2>
          <div className="product-grid">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </section>
      </Reveal>
    </div>
  );
}
