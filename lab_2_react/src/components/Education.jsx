const education = [
  {
    title: 'Національний університет «Львівська політехніка»',
    period: '2025 — дотепер',
    details: [
      "Інститут комп'ютерних технологій, автоматики та метрології (ІКТА)",
      'Спеціальність: Кібербезпека та захист інформації (2 курс)',
    ],
  },
  {
    title: 'UnderDefense',
    period: 'Інтернатура з кібербезпеки',
    details: ['Поглиблене вивчення аналізу загроз, безпеки мереж та засобів захисту інформації.'],
  },
  {
    title: 'IT Step Academy',
    period: 'Практичний курс',
    details: ['Практичне навчання та виконання практичних проєктів з мов програмування та баз даних.'],
  },
];

function Education() {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl transition duration-300 hover:border-brand-500/60">
      <h2 className="mb-5 flex items-center gap-2 text-2xl font-bold text-white">
        <span className="h-6 w-1.5 rounded-full bg-brand-400"></span>
        Освіта та стажування
      </h2>
      {/* Таймлайн: ліва рамка + кружечки, позиціоновані абсолютно */}
      <ol className="relative space-y-6 border-l-2 border-brand-500/40 pl-6">
        {education.map((item) => (
          <li key={item.title} className="relative">
            <span className="absolute top-1.5 -left-[33px] h-4 w-4 rounded-full border-2 border-slate-900 bg-brand-400"></span>
            <h3 className="font-semibold text-white">{item.title}</h3>
            <p className="mb-1 text-xs font-medium tracking-wide text-brand-300 uppercase">{item.period}</p>
            {item.details.map((line) => (
              <p key={line} className="text-sm text-slate-400">{line}</p>
            ))}
          </li>
        ))}
      </ol>
    </section>
  );
}

export default Education;
