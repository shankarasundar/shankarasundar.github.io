import { Routes, Route } from "react-router-dom";
import { LoginGate, SaveBar } from "edit-kit";
import Nav from "./components/Nav";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import "./App.css";

export default function App() {
  const year = new Date().getFullYear();

  return (
    <div className="page">
      <Nav />

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
