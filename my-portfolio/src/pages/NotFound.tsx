import { PROFILE } from '../data';
import { useTitle } from '../router';
import { Link } from '../components/Link';

export function NotFound() {
  useTitle(`Not found — ${PROFILE.name}`);
  return (
    <div className="page">
      <header className="page-head">
        <h1 className="page-title">404</h1>
        <p className="page-lede">
          There's nothing at this address. <Link to="/">Head back home →</Link>
        </p>
      </header>
    </div>
  );
}
