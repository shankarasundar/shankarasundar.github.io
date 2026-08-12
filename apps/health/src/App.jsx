import { Routes, Route } from "react-router-dom";
import { LoginGate, SaveBar } from "edit-kit";
import Nav from "./components/Nav";
import SectionList from "./components/SectionList";
import SectionDetail from "./components/SectionDetail";
import "./App.css";

export default function App() {
  const year = new Date().getFullYear();

  return (
    <div className="page">
      <Nav />

      <main className="site-main">
        <Routes>
          <Route path="/" element={<SectionList />} />
          <Route path="/sections/:slug" element={<SectionDetail />} />
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
