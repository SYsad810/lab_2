import { useEffect, useState } from 'react';
import Header from './components/Header';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Reviews from './components/Reviews';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import { DAY_END_HOUR, DAY_START_HOUR } from './config';

function getThemeByTime() {
  const hours = new Date().getHours();
  return hours >= DAY_START_HOUR && hours < DAY_END_HOUR ? 'light' : 'dark';
}

function App() {
  // Початкова тема — за поточним часом (лінива ініціалізація, щоб не було «спалаху» світлої теми)
  const [theme, setTheme] = useState(getThemeByTime);
  const [isManual, setIsManual] = useState(false);

  // Автоматичне перемикання: щохвилини звіряємося з годинником,
  // поки користувач не обрав тему вручну
  useEffect(() => {
    if (isManual) return;
    const id = setInterval(() => setTheme(getThemeByTime()), 60_000);
    return () => clearInterval(id);
  }, [isManual]);

  // Застосовуємо тему: клас dark на <body> вмикає варіанти dark:* у Tailwind
  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setIsManual(true);
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-100 font-display text-slate-700 antialiased transition-colors duration-300 dark:bg-slate-950 dark:text-slate-200">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      {/* Grid: одна колонка на телефоні, дві — від md (768px) */}
      <main className="mx-auto -mt-12 grid w-full max-w-5xl flex-1 content-start gap-6 px-4 pb-12 md:grid-cols-2">
        <About />
        <Education />
        <Skills />
        <Experience />
        <Reviews />
      </main>
      <Footer />
      <ContactForm />
    </div>
  );
}

export default App;
