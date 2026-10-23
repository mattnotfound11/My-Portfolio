import { useState } from 'react';
import { AFFILIATIONS, PROFILE } from '../data';
import { Link, useTitle } from '../router';
import { Reveal } from '../components/Reveal';
import { Cat } from '../components/Cat';
import { ICONS, Pixels } from '../components/Pixel';
import { PageHead } from '../components/ui';

type Kind = { id: string; icon: keyof typeof ICONS; title: string; body: string; to?: string; more?: string };

const KINDS: Kind[] = [
  {
    id: 'web',
    icon: 'web',
    title: 'A website for your business',
    body: 'Menus, catalogs, booking and inquiry pages. The same kind of build as Kapigasm Coffee, Locket, and Clutch Cafe.',
    to: '/projects',
    more: 'see the builds',
  },
  {
    id: 'design',
    icon: 'design',
    title: 'UI/UX design',
    body: 'Screens and user flows that make sense on the first try, the way I designed PHARMATRACK for the Pharmacy Department.',
  },
  {
    id: 'hackathon',
    icon: 'trophy',
    title: 'A hackathon teammate',
    body: 'My first was HACK ILOILO 2026 with KASCODERS, and we made the top 10. Got a team and a deadline? I’m in.',
    to: '/experience',
    more: 'read about it',
  },
  {
    id: 'nfc',
    icon: 'nfc',
    title: 'NFC cards',
    body: 'Tap-to-share cards and Google review cards for your shop or brand, launching soon.',
    to: '/shop',
    more: 'visit the shop',
  },
  {
    id: 'study',
    icon: 'shield',
    title: 'Study buddies & student projects',
    body: 'Cybersecurity study sessions, org websites, and capstone ideas with fellow students at USA and beyond.',
  },
];

const STEPS = [
  { n: '01', title: 'Say hi', body: 'Tell me what you have in mind. A rough idea is fine.' },
  { n: '02', title: 'Sketch it together', body: 'We agree on what “done” looks like before anything gets built.' },
  { n: '03', title: 'Build in the open', body: 'You get a live preview link and see progress as it happens.' },
  { n: '04', title: 'Ship it', body: 'It goes live, and I stick around to fix what needs fixing.' },
];

const TOPICS = ['Website', 'UI/UX design', 'Hackathon', 'NFC cards', 'Student project', 'Something else'];

function Composer() {
  const [name, setName] = useState('');
  const [topic, setTopic] = useState(TOPICS[0]!);
  const [msg, setMsg] = useState('');

  const href = () => {
    const subject = encodeURIComponent(`Collab: ${topic}${name ? ` — ${name}` : ''}`);
    const body = encodeURIComponent(`Hi Matthew,\n\n${msg || 'I’d like to work with you on something.'}\n\n${name ? `— ${name}` : ''}`);
    return `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
  };

  return (
    <form
      className="composer"
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = href();
      }}
    >
      <div className="composer-head">
        <Pixels map={ICONS.mail} scale={3} />
        <div>
          <p className="composer-kicker">Pitch me</p>
          <p className="composer-title">what are we making?</p>
        </div>
      </div>

      <fieldset className="composer-topics">
        <legend className="sr-only">Topic</legend>
        {TOPICS.map((t) => (
          <label key={t} className={`topic ${topic === t ? 'is-on' : ''}`}>
            <input type="radio" name="topic" value={t} checked={topic === t} onChange={() => setTopic(t)} />
            {t}
          </label>
        ))}
      </fieldset>

      <label className="field">
        <span>Your name</span>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name or team" autoComplete="name" />
      </label>
      <label className="field">
        <span>The idea</span>
        <textarea
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          rows={4}
          placeholder="A booking site for my café, a teammate for a hackathon next month…"
        />
      </label>

      <div className="composer-foot">
        <p>This opens your email app with everything filled in. Nothing is stored here.</p>
        <button type="submit" className="btn btn--solid">
          Write the email <span aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  );
}

export function Collabs() {
  useTitle(`Collabs — ${PROFILE.name}`);
  const [pets, setPets] = useState<number | null>(null);

  return (
    <div className="page page--wide page--collabs">
      <PageHead title="collabs">
        I like building with people. Whether you run a shop, lead an org, or have a hackathon coming up, here’s what
        we can make together.
      </PageHead>

      <Reveal>
        <section className="collab-sec">
          <h2 className="sec-label">What we can make</h2>
          <div className="kind-grid">
            {KINDS.map((k, i) => (
              <article key={k.id} className="kind" style={{ ['--i' as string]: i }}>
                <span className="kind-icon">
                  <Pixels map={ICONS[k.icon]} scale={4} />
                </span>
                <h3 className="kind-title">{k.title}</h3>
                <p className="kind-body">{k.body}</p>
                {k.to && (
                  <Link to={k.to} className="kind-more">
                    {k.more} →
                  </Link>
                )}
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="collab-sec">
          <h2 className="sec-label">How a collab goes</h2>
          <ol className="steps">
            {STEPS.map((s) => (
              <li key={s.n} className="step">
                <span className="step-paw">
                  <Pixels map={ICONS.paw} scale={2} />
                </span>
                <span className="step-n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </section>
      </Reveal>

      <Reveal>
        <section className="collab-sec">
          <Composer />
        </section>
      </Reveal>

      <Reveal>
        <section className="collab-sec">
          <div className="sec-head">
            <h2 className="sec-label" style={{ margin: 0 }}>Teams I build with</h2>
            <Link to="/affiliations" className="sec-more">all affiliations →</Link>
          </div>
          <ul className="aff-row">
            {AFFILIATIONS.map((a) => (
              <li key={a.id}>
                <img src={a.logo} alt="" className="aff-logo" loading="lazy" />
                <span>
                  <strong>{a.short}</strong>
                  <small>{a.role}</small>
                </span>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal>
        <section className="collab-sec cat-yard" aria-label="Byte the cat">
          <div className="cat-yard-head">
            <p>
              <strong>Byte</strong> · site supervisor
            </p>
            <p className="cat-yard-count" aria-live="polite">
              {pets ? `petted ${pets} time${pets === 1 ? '' : 's'} on this device` : 'click to pet'}
            </p>
          </div>
          <Cat scale={5} speed={44} onPet={setPets} />
        </section>
      </Reveal>
    </div>
  );
}
