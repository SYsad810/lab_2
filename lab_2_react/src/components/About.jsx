function About() {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl transition duration-300 hover:border-brand-500/60 md:col-span-2">
      <h2 className="mb-3 flex items-center gap-2 text-2xl font-bold text-white">
        <span className="h-6 w-1.5 rounded-full bg-brand-400"></span>
        Про мене
      </h2>
      <p className="leading-relaxed text-slate-300">
        Студент 2-го курсу НУ «Львівська політехніка». Захоплююся практичною кібербезпекою, мережевою безпекою та веб-технологіями. Маю досвід аналізу шкідливого ПЗ, налаштування мережевих топологій і тестування веб-застосунків на вразливості.
      </p>
    </section>
  );
}

export default About;
