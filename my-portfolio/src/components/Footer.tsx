import { PROFILE } from '../data';

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <span className="footer-note">
          © {new Date().getFullYear()} {PROFILE.name} · {PROFILE.location}
        </span>

        <nav className="footer-links" aria-label="Elsewhere">
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={`mailto:${PROFILE.email}`}>Email</a>
        </nav>
      </div>
    </footer>
  );
}
