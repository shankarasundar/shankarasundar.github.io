import Header from "./components/Header";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Recognition from "./components/Recognition";
import Activities from "./components/Activities";
import Posts from "./components/Posts";
import Contact from "./components/Contact";
import "./App.css";

export default function App() {
  return (
    <div className="page">
      <Header />
      <div className="layout">
        <aside className="sidebar">
          <Posts />
        </aside>
        <main className="main-content">
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Recognition />
          <Activities />
        </main>
      </div>
      <Contact />
    </div>
  );
}
