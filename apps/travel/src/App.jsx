import { Routes, Route, Link } from "react-router-dom";
import { LoginGate, SaveBar } from "edit-kit";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import "./App.css";

export default function App() {
  const year = new Date().getFullYear();

  return (
    <div className="page">
      <header className="site-header">
        <Link to="/" className="brand">
          Travel
        </Link>
        <a className="back-link" href="https://www.shankshub.page">
          Sankara Sundaram →
        </a>
      </header>

      <main className="site-main">
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/posts/:slug" element={<PostDetail />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <p>© {year} Sankara Sundaram</p>
        <div className="footer-admin">
          <LoginGate />
        </div>
      </footer>
      <SaveBar />
    </div>
  );
}
