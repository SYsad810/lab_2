// Номер варіанта = порядковий номер у журналі групи
export const VARIANT = 23;
export const COMMENTS_URL = `https://jsonplaceholder.typicode.com/posts/${VARIANT}/comments`;

// Той самий endpoint Formspree, що й у Частині 1 (index.html)
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xzeekkqj';

// Денна тема з 07:00 до 20:59, нічна — решту часу
export const DAY_START_HOUR = 7;
export const DAY_END_HOUR = 21;

// Спільні класи карток-секцій (світла + темна тема)
export const cardClass =
  'rounded-2xl border border-slate-200 bg-white p-6 shadow-lg transition duration-300 hover:border-brand-500/60 ' +
  'dark:border-slate-800 dark:bg-slate-900 dark:shadow-xl';
