import { EXPERIENCE, PROFILE } from '../data';
import { useTitle } from '../router';
import { Reveal } from '../components/Reveal';
import { Timeline } from '../components/Timeline';
import { PageHead } from '../components/ui';

export function Experience() {
  useTitle(`Experience — ${PROFILE.name}`);

  return (
    <div className="page">
      <PageHead title="experience">
        Where I've built, designed, and competed: front-end work with Cascade Development Group, my first
        hackathon, and the UI/UX behind PHARMATRACK.
      </PageHead>

      <div className="tl-list">
        {EXPERIENCE.map((e) => (
          <Reveal key={e.id}>
            <Timeline
              entry={{
                org: e.org,
                sub: e.orgSub,
                logo: e.logo,
                link: e.link,
                roles: [{ title: e.role, when: e.when, body: e.body, chips: e.chips, highlight: e.highlight }],
              }}
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
