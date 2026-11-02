import { useEffect, useState } from 'react';

// Ключі, які зберігаємо в localStorage, і їх підписи у футері
const FIELDS = [
  ['platform', 'Платформа (navigator.platform)'],
  ['userAgent', 'User-Agent (navigator.userAgent)'],
  ['language', 'Мова браузера'],
  ['screen', 'Роздільна здатність екрана'],
  ['savedAt', 'Збережено'],
];

function Footer() {
  const [systemInfo, setSystemInfo] = useState([]);

  // [] — ефект виконується один раз, після монтування компонента
  useEffect(() => {
    // 1. Зчитуємо дані з navigator і записуємо в localStorage
    const info = {
      platform: navigator.platform || 'Невідомо',
      userAgent: navigator.userAgent,
      language: navigator.language,
      screen: `${window.screen.width}×${window.screen.height}`,
      savedAt: new Date().toLocaleString('uk-UA'),
    };
    Object.entries(info).forEach(([key, value]) => localStorage.setItem(key, value));

    // 2. Зчитуємо назад із localStorage і кладемо у стан → React перемалює футер.
    // localStorage — зовнішнє сховище, тому синхронізація зі станом в ефекті тут доречна
    // eslint-disable-next-line react/set-state-in-effect
    setSystemInfo(FIELDS.map(([key, label]) => ({ key, label, value: localStorage.getItem(key) })));
  }, []);

  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-8 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="mb-3 font-semibold text-brand-700 dark:text-brand-400">💻 Системна інформація з localStorage</h3>
          <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-[max-content_1fr]">
            {systemInfo.map(({ key, label, value }) => (
              <div key={key} className="contents">
                <dt className="text-slate-400">{label}</dt>
                <dd className="break-words text-slate-700 dark:text-slate-200">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="mt-6 text-center tracking-wide">
          © 2026 <span className="font-semibold text-brand-600 dark:text-brand-400">Фірко Андрій</span>. Всі права захищені.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
