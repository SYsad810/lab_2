import { cardClass } from '../config';

function About() {
  return (
    <section className={`${cardClass} md:col-span-2`}>
      <h2 className="mb-3 flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">
        <span className="h-6 w-1.5 rounded-full bg-brand-500 dark:bg-brand-400"></span>
        Про мене
      </h2>
      <p className="leading-relaxed text-slate-600 dark:text-slate-300">
        Студент 2-го курсу НУ «Львівська політехніка». Захоплююся практичною кібербезпекою, мережевою безпекою та веб-технологіями. Маю досвід аналізу шкідливого ПЗ, налаштування мережевих топологій і тестування веб-застосунків на вразливості.
      </p>
    </section>
  );
}

export default About;
