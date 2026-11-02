import { cardClass } from '../config';

const skills = [
  { category: 'Мови та технології', items: ['Python', 'HTML', 'CSS', 'SQL', 'C#', 'Bash', 'PowerShell'] },
  { category: 'Операційні системи', items: ['Kali Linux', 'Ubuntu', 'Windows'] },
  { category: 'Мережі та безпека', items: ['Cisco Packet Tracer', 'GNS3', 'Suricata IDS', 'Wireshark', 'Burp Suite'] },
  { category: 'Бази даних', items: ['Реляційні БД (BCNF, ERD)', 'SQL'] },
];

function Skills() {
  return (
    <section className={cardClass}>
      <h2 className="mb-5 flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">
        <span className="h-6 w-1.5 rounded-full bg-brand-500 dark:bg-brand-400"></span>
        Навички (Skills)
      </h2>
      <div className="space-y-4">
        {skills.map((group) => (
          <div key={group.category}>
            <h3 className="mb-2 text-sm font-semibold text-slate-500 dark:text-slate-400">{group.category}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <li
                  key={skill}
                  className="cursor-default rounded-lg border border-brand-500/30 bg-brand-500/10 px-3 py-1 font-mono text-sm text-brand-700 transition hover:-translate-y-0.5 hover:bg-brand-500 hover:text-white dark:text-brand-300 dark:hover:text-slate-950"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
