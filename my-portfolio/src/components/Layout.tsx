import { useEffect, useState, type ComponentType, type ReactNode, type SVGProps } from 'react';
import { Link, usePath } from '../router';
import { PROFILE } from '../data';
import type { ThemeChoice } from '../theme';
import {
  IconBag,
  IconFile,
  IconLaptop,
  IconGithub,
  IconLinkedin,
  IconMail,
  IconMenu,
  IconClose,
  IconMonitor,
  IconSun,
  IconMoon,
} from './Icons';

type Icon = ComponentType<SVGProps<SVGSVGElement>>;
type NavItem = { to: string; label: string; icon?: Icon; external?: boolean };

const GROUPS: NavItem[][] = [
  [
    { to: '/shop', label: 'Shop', icon: IconBag },
    { to: '/resume', label: 'Resume', icon: IconFile },
    { to: '/gear', label: 'Gear', icon: IconLaptop },
  ],
  [
    { to: PROFILE.github, label: 'GitHub', icon: IconGithub, external: true },
    { to: PROFILE.linkedin, label: 'LinkedIn', icon: IconLinkedin, external: true },
  ],
  [
    { to: '/projects', label: 'Projects' },
    { to: '/stack', label: 'Stack' },
    { to: '/certifications', label: 'Certifications' },
  ],
];

const THEMES: { id: ThemeChoice; label: string; icon: Icon }[] = [
  { id: 'system', label: 'Match system', icon: IconMonitor },
  { id: 'light', label: 'Light', icon: IconSun },
  { id: 'dark', label: 'Dark', icon: IconMoon },
];

type Props = {
  children: ReactNode;
  theme: ThemeChoice;
  setTheme: (t: ThemeChoice) => void;
  openPalette: () => void;
};

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const path = usePath();
  return (
    <nav aria-label="Main">
      {GROUPS.map((group, gi) => (
        <ul key={gi} className="side-group">
          {group.map((item) => {
            const Icon = item.icon;
            const current = !item.external && path === item.to;
            const inner = (
              <>
                {current && <span className="side-arrow" aria-hidden="true">→</span>}
                {Icon && <Icon width={15} height={15} aria-hidden="true" />}
                <span>{item.label}</span>
                {item.external && <span className="side-ext" aria-hidden="true">↗</span>}
              </>
            );
            return (
              <li key={item.to}>
                {item.external ? (
                  <a className="side-link" href={item.to} target="_blank" rel="noopener noreferrer">
                    {inner}
                  </a>
                ) : (
                  <Link
                    to={item.to}
                    className={`side-link ${current ? 'is-current' : ''}`}
                    aria-current={current ? 'page' : undefined}
                    onClick={onNavigate}
                  >
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      ))}
    </nav>
  );
}

function SideFooter({ theme, setTheme, openPalette }: Omit<Props, 'children'>) {
  return (
    <div className="side-foot">
      <button type="button" className="side-search" onClick={openPalette}>
        Search
        <span className="side-keys" aria-hidden="true">
          <kbd>⌘</kbd>+<kbd>K</kbd>
        </span>
      </button>

      <p className="side-status">
        <span className="status-dot" aria-hidden="true" />
        Available for opportunity
      </p>

      <div className="theme-switch" role="radiogroup" aria-label="Colour theme">
        {THEMES.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={theme === t.id}
              aria-label={t.label}
              title={t.label}
              className={theme === t.id ? 'is-on' : ''}
              onClick={() => setTheme(t.id)}
            >
              <Icon width={13} height={13} aria-hidden="true" />
            </button>
          );
        })}
      </div>

      <p className="side-reach">For internships, collabs &amp; everything else, reach me at</p>
      <a className="side-mail" href={`mailto:${PROFILE.email}`}>
        <IconMail width={15} height={15} aria-hidden="true" />
        {PROFILE.email}
      </a>
    </div>
  );
}

export function Layout(props: Props) {
  const { children } = props;
  const [menu, setMenu] = useState(false);
  const path = usePath();

  useEffect(() => setMenu(false), [path]);

  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menu]);

  return (
    <div className="frame">
      <a href="#main" className="skip">Skip to content</a>

      <aside className="side" aria-label="Site">
        <Link to="/" className="side-name">{PROFILE.name}</Link>
        <NavList />
        <SideFooter {...props} />
      </aside>

      <header className="topbar">
        <Link to="/" className="side-name">{PROFILE.name}</Link>
        <button
          type="button"
          className="topbar-btn"
          aria-label={menu ? 'Close menu' : 'Open menu'}
          aria-expanded={menu}
          aria-controls="drawer"
          onClick={() => setMenu((m) => !m)}
        >
          {menu ? <IconClose width={20} height={20} /> : <IconMenu width={20} height={20} />}
        </button>
      </header>

      <div id="drawer" className={`drawer ${menu ? 'is-open' : ''}`} hidden={!menu}>
        <NavList onNavigate={() => setMenu(false)} />
        <SideFooter {...props} />
      </div>

      <div className="dots dots--corner" aria-hidden="true" />
      <main id="main" className="main">
        {children}
        <footer className="foot">
          <span>
            © {new Date().getFullYear()} {PROFILE.name} · {PROFILE.location}
          </span>
          <nav className="foot-links" aria-label="Elsewhere">
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={`mailto:${PROFILE.email}`}>Email</a>
          </nav>
        </footer>
      </main>
    </div>
  );
}
