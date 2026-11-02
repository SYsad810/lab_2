function Header({ theme, onToggleTheme }) {
  const isDark = theme === 'dark';

  return (
    <header className="bg-linear-to-br from-blue-800 via-blue-600 to-brand-500 px-4 pt-12 pb-24 text-white shadow-lg dark:from-slate-900 dark:via-blue-950 dark:to-brand-700">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
        {/* Аватар з ініціалами */}
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-white/80 bg-blue-900 text-3xl font-bold text-brand-300 shadow-xl ring-4 ring-brand-500/30 dark:border-brand-400 dark:bg-slate-900">
          ФА
        </div>

        <div className="flex-1">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Фірко Андрій</h1>
          <p className="mt-2 text-lg text-blue-100 dark:text-slate-300">
            Студент спеціальності «Кібербезпека та захист інформації»
            <span className="mx-2 text-brand-300 dark:text-brand-400">|</span>
            <span className="font-semibold text-white dark:text-brand-300">Junior Security / Web Specialist</span>
          </p>
          <a
            href="mailto:firko.andriy60@gmail.com"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur transition hover:bg-white hover:text-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 dark:bg-white/10 dark:hover:bg-brand-500 dark:hover:text-slate-950"
          >
            ✉ firko.andriy60@gmail.com
          </a>
        </div>

        {/* Ручний перемикач теми */}
        <button
          type="button"
          onClick={onToggleTheme}
          aria-pressed={isDark}
          className="shrink-0 cursor-pointer self-center rounded-full border border-white/50 bg-slate-900/25 px-4 py-2 text-sm font-semibold transition hover:bg-slate-900/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 active:scale-95 sm:self-start"
        >
          {isDark ? '☀️ Денна тема' : '🌙 Нічна тема'}
        </button>
      </div>
    </header>
  );
}

export default Header;
