import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <header className="travel-nav">
      <div className="travel-nav-inner">
        <Link to="/" className="travel-brand">
          ✈ Travel
        </Link>
        <nav className="travel-nav-links">
          <Link to="/">All trips</Link>
          <a href="https://www.shankshub.page">Portfolio ↗</a>
        </nav>
      </div>
    </header>
  );
}
