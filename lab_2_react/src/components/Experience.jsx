import { cardClass } from '../config';

const projects = [
  {
    icon: '🌐',
    title: 'Мережева безпека',
    text: 'Налаштування маршрутизації (OSPF), WPA2-Enterprise (RADIUS) та захисту від ARP spoofing в GNS3/Packet Tracer.',
  },
  {
    icon: '🛡️',
    title: 'Аналіз загроз',
    text: 'Дослідження механізмів обфускації PowerShell-скриптів та поведінковий аналіз виконаних файлів у пісочниці.',
  },
  {
    icon: '🗄️',
    title: 'Розробка БД',
    text: 'Проєктування нормалізованої бази даних (5 таблиць BCNF) для інформаційної системи.',
  },
];

function Experience() {
  return (
    <section className={`${cardClass} md:col-span-2`}>
      <h2 className="mb-5 flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">
        <span className="h-6 w-1.5 rounded-full bg-brand-500 dark:bg-brand-400"></span>
        Проєкти та практичний досвід
      </h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.title}
            className="rounded-xl border-2 border-slate-200 bg-slate-50 p-5 transition duration-300 hover:scale-105 hover:border-brand-500 hover:shadow-lg hover:shadow-brand-500/20 dark:border-slate-800 dark:bg-slate-950"
          >
            <div className="mb-3 text-3xl">{project.icon}</div>
            <h3 className="mb-2 font-semibold text-slate-900 dark:text-white">{project.title}</h3>
            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">{project.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Experience;
