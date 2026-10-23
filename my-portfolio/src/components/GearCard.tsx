import { useState } from 'react';
import type { Gear } from '../data';
import { IconLaptop, IconSmartphone } from './Icons';

export function GearCard({ item, compact = false }: { item: Gear; compact?: boolean }) {
  const [missing, setMissing] = useState(false);
  const Icon = item.id.includes('iphone') ? IconSmartphone : IconLaptop;

  return (
    <article className={`gear ${compact ? 'gear--compact' : ''}`}>
      <div className="gear-plate">
        {missing ? (
          <span className="gear-fallback" aria-hidden="true">
            <Icon width={40} height={40} />
          </span>
        ) : (
          <img src={item.image} alt={item.name} loading="lazy" onError={() => setMissing(true)} />
        )}
      </div>
      <div className="gear-body">
        <h3 className="gear-name">{item.name}</h3>
        <p className="gear-spec">{item.spec}</p>
      </div>
    </article>
  );
}
