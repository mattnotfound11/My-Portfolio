import { useEffect, useMemo, useRef, useState } from 'react';
import { navigate } from '../router';
import { PROFILE } from '../data';
import type { ThemeChoice } from '../theme';
import { IconSearch } from './Icons';

type Command = { id: string; label: string; group: string; hint?: string; run: () => void };

type Props = {
  open: boolean;
  onClose: () => void;
  setTheme: (t: ThemeChoice) => void;
};

export function CommandPalette({ open, onClose, setTheme }: Props) {
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  const commands = useMemo<Command[]>(
    () => [
      { id: 'home', group: 'Pages', label: 'Home', run: () => navigate('/') },
      { id: 'resume', group: 'Pages', label: 'Resume', run: () => navigate('/resume') },
      { id: 'experience', group: 'Pages', label: 'Experience', run: () => navigate('/experience') },
      { id: 'collabs', group: 'Pages', label: 'Collabs', run: () => navigate('/collabs') },
      { id: 'affiliations', group: 'Pages', label: 'Affiliations', run: () => navigate('/affiliations') },
      { id: 'projects', group: 'Pages', label: 'Projects', run: () => navigate('/projects') },
      { id: 'stack', group: 'Pages', label: 'Tech stack', run: () => navigate('/stack') },
      { id: 'certs', group: 'Pages', label: 'Certifications', run: () => navigate('/certifications') },
      { id: 'gear', group: 'Pages', label: 'Gear', run: () => navigate('/gear') },
      { id: 'shop', group: 'Pages', label: 'Shop — NFC cards', run: () => navigate('/shop') },
      {
        id: 'email',
        group: 'Actions',
        label: 'Copy email address',
        hint: PROFILE.email,
        run: () => void navigator.clipboard?.writeText(PROFILE.email),
      },
      { id: 'mail', group: 'Actions', label: 'Send an email', run: () => (window.location.href = `mailto:${PROFILE.email}`) },
      { id: 'light', group: 'Theme', label: 'Light theme', run: () => setTheme('light') },
      { id: 'dark', group: 'Theme', label: 'Dark theme', run: () => setTheme('dark') },
      { id: 'system', group: 'Theme', label: 'Match system theme', run: () => setTheme('system') },
      { id: 'gh', group: 'Links', label: 'GitHub', hint: `@${PROFILE.githubHandle}`, run: () => window.open(PROFILE.github, '_blank', 'noopener') },
      { id: 'li', group: 'Links', label: 'LinkedIn', run: () => window.open(PROFILE.linkedin, '_blank', 'noopener') },
    ],
    [setTheme],
  );

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    return t ? commands.filter((c) => `${c.label} ${c.group} ${c.hint ?? ''}`.toLowerCase().includes(t)) : commands;
  }, [q, commands]);

  useEffect(() => {
    if (!open) return;
    setQ('');
    setActive(0);
    const id = requestAnimationFrame(() => input.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => setActive(0), [q]);

  if (!open) return null;

  const run = (c: Command | undefined) => {
    if (!c) return;
    onClose();
    c.run();
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      run(results[active]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  let lastGroup = '';

  return (
    <div className="palette-backdrop" onMouseDown={onClose}>
      <div
        className="palette"
        role="dialog"
        aria-modal="true"
        aria-label="Search the site"
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={onKey}
      >
        <div className="palette-input">
          <IconSearch width={16} height={16} aria-hidden="true" />
          <input
            ref={input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Jump to a page, link, or action"
            aria-label="Search"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
          />
          <kbd>esc</kbd>
        </div>
        <ul className="palette-list" id="palette-list" role="listbox">
          {results.length === 0 && <li className="palette-empty">Nothing matches “{q}”.</li>}
          {results.map((c, i) => {
            const head = c.group !== lastGroup;
            lastGroup = c.group;
            return (
              <li key={c.id} role="presentation">
                {head && <p className="palette-group">{c.group}</p>}
                <button
                  type="button"
                  id={`cmd-${c.id}`}
                  role="option"
                  aria-selected={i === active}
                  className={`palette-item ${i === active ? 'is-active' : ''}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => run(c)}
                >
                  <span>{c.label}</span>
                  {c.hint && <span className="palette-hint">{c.hint}</span>}
                </button>
              </li>
            );
          })}
        </ul>
        <div className="palette-foot">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> to move
          </span>
          <span>
            <kbd>↵</kbd> to open
          </span>
        </div>
      </div>
    </div>
  );
}
