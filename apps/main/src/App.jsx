import Header from "./components/Header";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Activities from "./components/Activities";
import Credentials from "./components/Credentials";
import Posts from "./components/Posts";
import Contact from "./components/Contact";
import { SaveBar } from "edit-kit";
import "./App.css";

export default function App() {
  return (
    <div className="page">
      <Header />
      <div className="layout">
        <aside className="sidebar">
          <Credentials />
          <Posts />
        </aside>
        <main className="main-content">
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Activities />
        </main>
      </div>
      <Contact />
      <SaveBar />
    </div>
  );
}
