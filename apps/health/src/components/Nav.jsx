import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <header className="health-nav">
      <div className="health-nav-inner">
        <Link to="/" className="health-brand">
          ♡ Health & Wellbeing
        </Link>
        <nav className="health-nav-links">
          <Link to="/">All sections</Link>
          <a href="https://www.shankshub.page">Portfolio ↗</a>
        </nav>
      </div>
    </header>
  );
}
