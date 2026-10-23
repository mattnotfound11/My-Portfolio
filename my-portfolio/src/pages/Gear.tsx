import { GEAR, PROFILE } from '../data';
import { useTitle } from '../router';
import { Reveal } from '../components/Reveal';
import { GearCard } from '../components/GearCard';
import { PageHead } from '../components/ui';

export function Gear() {
  useTitle(`Gear — ${PROFILE.name}`);

  return (
    <div className="page page--wide">
      <PageHead title="gear">
        What I build and study on every day.
      </PageHead>

      <Reveal>
        <section>
          <h2 className="sec-label">Everyday setup</h2>
          <div className="gear-grid">
            {GEAR.map((g) => (
              <GearCard key={g.id} item={g} />
            ))}
          </div>
        </section>
      </Reveal>
    </div>
  );
}
