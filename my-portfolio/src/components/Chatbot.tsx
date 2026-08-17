import { useEffect, useRef, useState } from 'react';
import { PROFILE, PROJECTS, CERTIFICATES, STACK, TECH_COUNT } from '../data';
import { IconClose, IconArrow } from './Icons';

type Msg = { from: 'bot' | 'me'; text: string };

/**
 * Fully hardcoded assistant — no API, no network. Answers are matched on
 * keywords against the same data that drives the rest of the page, so it can
 * never contradict the site.
 */
type Rule = { keys: string[]; answer: () => string };

const RULES: Rule[] = [
  {
    keys: ['who are', 'yourself', 'introduce', 'your bio', 'about you'],
    answer: () =>
      `I'm ${PROFILE.name}, a ${PROFILE.role.toLowerCase()} based in ${PROFILE.location}. I'm a ${PROFILE.year.toLowerCase()} ${PROFILE.program} student at ${PROFILE.school}, and I build web applications that real institutions actually use.`,
  },
  {
    keys: ['project', 'pharmatrack', 'work', 'built', 'portfolio', 'app'],
    answer: () => {
      const p = PROJECTS[0];
      return `My main shipped project is ${p.title} — ${p.tagline} ${p.summary} It's live and in daily use: ${p.metrics.map((m) => `${m.value} ${m.label.toLowerCase()}`).join(', ')}. Built with ${p.stack.join(', ')}.`;
    },
  },
  {
    keys: ['stack', 'tech', 'skill', 'language', 'framework', 'tool', 'know'],
    answer: () =>
      `I work across ${TECH_COUNT} technologies in ${STACK.length} areas:\n\n${STACK.map((g) => `• ${g.label}: ${g.items.join(', ')}`).join('\n')}`,
  },
  {
    keys: ['security', 'analyst', 'cyber', 'hack', 'pentest'],
    answer: () =>
      `Alongside development I work as a security analyst — I care about how the things I ship hold up, not just that they run. On the credential side I've completed Cisco's Getting Started with Cisco Packet Tracer, and I handle auth through vetted providers (Supabase Auth, Convex) rather than rolling my own.`,
  },
  {
    keys: ['cert', 'credential', 'course', 'aws', 'scrimba', 'learn'],
    answer: () =>
      `I hold ${CERTIFICATES.length} credentials:\n\n${CERTIFICATES.map((c) => `• ${c.name} — ${c.issuer} (${c.year})`).join('\n')}\n\nScans of each are in the Credentials section.`,
  },
  {
    keys: ['school', 'study', 'education', 'university', 'degree', 'college'],
    answer: () =>
      `I'm in my ${PROFILE.year.toLowerCase()} of ${PROFILE.program} at ${PROFILE.school} in Iloilo City. Before that I was at Colegio de las Hijas de Jesus, Inc. from elementary through senior high school.`,
  },
  {
    keys: ['contact', 'email', 'reach', 'hire', 'message', 'talk'],
    answer: () =>
      `The fastest way to reach me is email: ${PROFILE.email}. I'm also on LinkedIn and GitHub (@${PROFILE.githubHandle}) — all linked in the Contact section. I reply to everything.`,
  },
  {
    keys: ['available', 'intern', 'job', 'open', 'freelance', 'opportunit'],
    answer: () =>
      `Yes — I'm open to internships, junior developer roles, and student collaborations. Email me at ${PROFILE.email} and I'll get back to you.`,
  },
  {
    keys: ['github', 'repo', 'code', 'source'],
    answer: () =>
      `My GitHub is github.com/${PROFILE.githubHandle}. The About section pulls my public repos live from the GitHub API, so what you see there is current.`,
  },
  {
    keys: ['location', 'where', 'based', 'city', 'remote'],
    answer: () =>
      `I'm based in ${PROFILE.location}, and I'm happy to work remotely.`,
  },
  {
    keys: ['site', 'website', 'this', 'made', 'stack of this'],
    answer: () =>
      `This site is React 19 + TypeScript on Vite, with Lenis for smooth scrolling and hand-written CSS — no UI framework. It's deployed on Vercel, and the source is public on my GitHub.`,
  },
];

const CHIPS = [
  'Who are you?',
  'Tell me about PHARMATRACK',
  'What is your stack?',
  'Are you available?',
];

const GREETING: Msg = {
  from: 'bot',
  text: `Hi — I'm a small hardcoded assistant on Matthew's site. Ask me about his work, stack, credentials, or how to reach him.`,
};

function reply(input: string): string {
  const q = input.toLowerCase();
  let best: { rule: Rule; score: number } | null = null;

  // Score by keyword length so a specific hit ("pharmatrack") outranks a
  // generic one ("work") instead of the first rule in the list winning.
  for (const rule of RULES) {
    const score = rule.keys.reduce((n, k) => (q.includes(k) ? n + k.length : n), 0);
    if (score > 0 && (!best || score > best.score)) best = { rule, score };
  }

  if (best) return best.rule.answer();

  return `I only know a fixed set of things about Matthew — try asking about his projects, tech stack, security work, credentials, education, or how to get in touch. For anything else, email ${PROFILE.email}.`;
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([GREETING]);
  const [draft, setDraft] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [msgs, typing]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Clear any in-flight reply timers on unmount.
  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    [],
  );

  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setMsgs((m) => [...m, { from: 'me', text: q }]);
    setDraft('');
    setTyping(true);
    const id = window.setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { from: 'bot', text: reply(q) }]);
    }, 550);
    timers.current.push(id);
  };

  return (
    <>
      <button
        type="button"
        className="dock-btn dock-right"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Ask about Matthew'}
        aria-expanded={open}
      >
        {open ? (
          <IconClose width={17} height={17} />
        ) : (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.5 8.5 0 0 1-12.2 7.6L3 21l1.9-5.6A8.5 8.5 0 1 1 21 11.5Z" />
          </svg>
        )}
      </button>

      {open && (
        <div className="chat" role="dialog" aria-label="Ask about Matthew">
          <header className="chat-head">
            <span className="chat-avatar">MT</span>
            <div>
              <p className="chat-name">Ask about Matthew</p>
              <p className="chat-status">
                <span className="chat-dot" /> Hardcoded · always on
              </p>
            </div>
            <button
              type="button"
              className="chat-x"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <IconClose width={15} height={15} />
            </button>
          </header>

          <div className="chat-log">
            {msgs.map((m, i) => (
              <div key={i} className={`bubble bubble--${m.from}`}>
                {m.text}
              </div>
            ))}

            {typing && (
              <div className="bubble bubble--bot bubble--typing">
                <span />
                <span />
                <span />
              </div>
            )}

            {msgs.length <= 1 && (
              <div className="chat-chips">
                {CHIPS.map((c) => (
                  <button
                    type="button"
                    key={c}
                    className="chat-chip"
                    onClick={() => send(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}

            <div ref={endRef} />
          </div>

          <form
            className="chat-form"
            onSubmit={(e) => {
              e.preventDefault();
              send(draft);
            }}
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Ask a question…"
              aria-label="Your question"
            />
            <button type="submit" aria-label="Send">
              <IconArrow width={15} height={15} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
