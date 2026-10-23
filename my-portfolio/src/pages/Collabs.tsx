import { useState, type FormEvent } from 'react';
import { AFFILIATIONS, PROFILE } from '../data';
import { useTitle } from '../router';
import { Reveal } from '../components/Reveal';
import { WorldMap } from '../components/WorldMap';
import { PageHead } from '../components/ui';

/** Organizations I've actually built with, shown as a logo wall. */
const PARTNERS = [
  ...AFFILIATIONS.map((a) => ({ name: a.name, logo: a.logo, href: a.href })),
  {
    name: 'University of San Agustin — Pharmacy Department',
    logo: '/assets/orgs/usa.png',
    href: 'https://lsgph-pharmatrack.com/',
  },
];

const BUDGETS = ['Not sure yet', 'Under ₱10k', '₱10k–₱30k', '₱30k–₱80k', '₱80k+'];

type Form = {
  name: string;
  email: string;
  org: string;
  project: string;
  budget: string;
  timeline: string;
  details: string;
};

const EMPTY: Form = { name: '', email: '', org: '', project: '', budget: '', timeline: '', details: '' };

function Inquiry() {
  const [form, setForm] = useState<Form>(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const set = (k: keyof Form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const send = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.project.trim() || !form.details.trim()) {
      setError('Please fill in your name, email, project, and the details.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      setError('That email address doesn’t look right.');
      return;
    }
    setError(null);
    const lines = [`Name: ${form.name}`, `Email: ${form.email}`];
    if (form.org) lines.push(`Organization: ${form.org}`);
    lines.push(`Project: ${form.project}`);
    if (form.budget) lines.push(`Budget: ${form.budget}`);
    if (form.timeline) lines.push(`Timeline: ${form.timeline}`);
    lines.push('', form.details);
    const subject = encodeURIComponent(`Collab inquiry: ${form.project}`);
    const body = encodeURIComponent(lines.join('\n'));
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
  };

  return (
    <form className="inquiry" onSubmit={send} noValidate>
      <div className="inquiry-head">
        <div>
          <p className="inquiry-kicker">Collaboration inquiry</p>
          <h2 className="inquiry-title">tell me about it</h2>
          <p className="inquiry-lede">
            Share the essentials and I’ll reply with next steps. The more context you include, the more useful my
            first reply can be.
          </p>
        </div>
        <svg className="inquiry-icon" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M4 5h16v11H9l-5 4V5Z" strokeLinejoin="round" />
          <path d="M8 9h8M8 12.5h5" strokeLinecap="round" />
        </svg>
      </div>

      <div className="inquiry-body">
        <div className="inquiry-grid">
          <label className="field">
            <span>
              Name <em aria-hidden="true">*</em>
            </span>
            <input value={form.name} onChange={set('name')} placeholder="Your name" autoComplete="name" required />
          </label>
          <label className="field">
            <span>
              Email <em aria-hidden="true">*</em>
            </span>
            <input
              type="email"
              value={form.email}
              onChange={set('email')}
              placeholder="you@company.com"
              autoComplete="email"
              required
            />
          </label>
          <label className="field">
            <span>Organization / business</span>
            <input value={form.org} onChange={set('org')} placeholder="Optional" autoComplete="organization" />
          </label>
          <label className="field">
            <span>
              Project <em aria-hidden="true">*</em>
            </span>
            <input
              value={form.project}
              onChange={set('project')}
              placeholder="e.g. Café website, org site, UI design, hackathon team"
              required
            />
          </label>
          <label className="field">
            <span>Budget range</span>
            <select value={form.budget} onChange={set('budget')}>
              <option value="">Select one (optional)</option>
              {BUDGETS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Ideal timeline</span>
            <input value={form.timeline} onChange={set('timeline')} placeholder="e.g. Next month, this semester, flexible" />
          </label>
        </div>

        <label className="field">
          <span>
            Project details <em aria-hidden="true">*</em>
          </span>
          <textarea
            value={form.details}
            onChange={set('details')}
            rows={6}
            placeholder="What are you working on, who is it for, and what would a great result look like?"
            required
          />
        </label>
        <p className="inquiry-note">Please don’t include passwords, API keys, or other sensitive information.</p>

        {error && (
          <p className="inquiry-error" role="alert">
            {error}
          </p>
        )}

        <div className="inquiry-foot">
          <p>
            Prefer email? <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
          </p>
          <button type="submit" className="btn btn--solid inquiry-send">
            Send inquiry <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </form>
  );
}

export function Collabs() {
  useTitle(`Collabs — ${PROFILE.name}`);

  return (
    <div className="page page--wide page--center">
      <PageHead title="collabs">
        As a student developer, I build with organizations, teams, and local businesses on websites, interfaces, and
        events. A few I’ve worked with:
      </PageHead>

      <Reveal>
        <ul className="partners" aria-label="Organizations I've worked with">
          {PARTNERS.map((p) => (
            <li key={p.name}>
              <a href={p.href} target="_blank" rel="noopener noreferrer" title={p.name}>
                <img src={p.logo} alt={p.name} loading="lazy" />
              </a>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal>
        <WorldMap caption="Building from Iloilo City, Philippines" />
      </Reveal>

      <Reveal>
        <Inquiry />
      </Reveal>
    </div>
  );
}
