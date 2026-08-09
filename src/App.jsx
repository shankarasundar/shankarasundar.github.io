import Header from "./components/Header";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Recognition from "./components/Recognition";
import Contact from "./components/Contact";
import "./App.css";

export default function App() {
  return (
    <div className="page">
      <Header />
      <main>
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Recognition />
      </main>
      <Contact />
    </div>
  );
}
