function Header() {
  return (
    <header className="bg-linear-to-br from-slate-900 via-blue-950 to-brand-600 px-4 pt-12 pb-24 text-white shadow-lg">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
        {/* Аватар з ініціалами */}
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-brand-400 bg-slate-900 text-3xl font-bold text-brand-300 shadow-xl ring-4 ring-brand-500/30">
          ФА
        </div>

        <div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Фірко Андрій</h1>
          <p className="mt-2 text-lg text-slate-300">
            Студент спеціальності «Кібербезпека та захист інформації»
            <span className="mx-2 text-brand-400">|</span>
            <span className="font-semibold text-brand-300">Junior Security / Web Specialist</span>
          </p>
          <a
            href="mailto:firko.andriy60@gmail.com"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur transition hover:bg-brand-500 hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
          >
            ✉ firko.andriy60@gmail.com
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
