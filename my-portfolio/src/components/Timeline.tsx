import { Chip, Mark } from './ui';

export type TimelineRole = {
  title: string;
  when: string;
  body?: string;
  chips?: string[];
  highlight?: string;
};

export type TimelineEntry = {
  org: string;
  sub: string;
  logo?: string;
  link?: { href: string; label: string };
  roles: TimelineRole[];
};

/** One organisation with its roles hanging off a vertical rule. */
export function Timeline({ entry }: { entry: TimelineEntry }) {
  const many = entry.roles.length > 1;
  return (
    <article className="tl">
      <div className="tl-head">
        <Mark name={entry.org} logo={entry.logo} />
        <div>
          <h2 className="tl-org">{entry.org}</h2>
          <p className="tl-sub">{entry.sub}</p>
          {entry.link && (
            <a href={entry.link.href} target="_blank" rel="noopener noreferrer" className="tl-link">
              {entry.link.label} <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
      <ol className={`tl-roles ${many ? 'tl-roles--many' : ''}`}>
        {entry.roles.map((r) => (
          <li key={r.title} className="tl-role">
            <h3 className="tl-title">
              {r.title}
              {r.highlight && <span className="tag tag--solid tl-badge">{r.highlight}</span>}
            </h3>
            <p className="tl-when">{r.when}</p>
            {r.body && (
              <div className="tl-body">
                <p>{r.body}</p>
              </div>
            )}
            {r.chips && (
              <div className="chips">
                {r.chips.map((c) => (
                  <Chip key={c}>{c}</Chip>
                ))}
              </div>
            )}
          </li>
        ))}
      </ol>
    </article>
  );
}
