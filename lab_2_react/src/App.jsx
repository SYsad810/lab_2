import Header from './components/Header';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Footer from './components/Footer';

function App() {
  return (
    // min-h-screen + flex-col притискають футер донизу; темний фон для всієї сторінки
    <div className="flex min-h-screen flex-col bg-slate-950 font-display text-slate-200 antialiased">
      <Header />
      {/* Grid: одна колонка на телефоні, дві — від md (768px) */}
      <main className="mx-auto -mt-12 grid w-full max-w-5xl flex-1 content-start gap-6 px-4 pb-12 md:grid-cols-2">
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
