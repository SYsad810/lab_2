import Header from './components/Header';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Header />
      <main>
        <About />
        <Education />
        <Skills />
        <Experience />
      </main>
      <Footer />
    </div>
  );
}

export default App;