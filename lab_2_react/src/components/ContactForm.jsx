import { useEffect, useState } from 'react';
import { FORMSPREE_ENDPOINT } from '../config';

const OPEN_DELAY_MS = 60_000; // 1 хвилина
const CLOSED_FLAG = 'feedbackModalClosed';

const inputClass =
  'w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 outline-none transition ' +
  'focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100';

function ContactForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [sendStatus, setSendStatus] = useState(null); // null | 'sending' | 'ok' | 'error' | 'not-configured'

  // Відкрити модальне вікно через 1 хвилину, якщо його ще не закривали в цій сесії
  useEffect(() => {
    if (sessionStorage.getItem(CLOSED_FLAG) === 'true') return;
    const timer = setTimeout(() => setIsOpen(true), OPEN_DELAY_MS);
    return () => clearTimeout(timer); // прибираємо таймер при демонтуванні
  }, []);

  const close = () => {
    setIsOpen(false);
    sessionStorage.setItem(CLOSED_FLAG, 'true');
  };

  // Закриття клавішею Escape — слухач існує лише поки вікно відкрите
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event) => event.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen]);

  // Надсилання через fetch, щоб показати результат без переходу на сторінку Formspree
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID')) {
      setSendStatus('not-configured');
      return;
    }
    const form = event.currentTarget;
    setSendStatus('sending');
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      form.reset();
      setSendStatus('ok');
    } catch (error) {
      console.error('Помилка надсилання форми:', error);
      setSendStatus('error');
    }
  };

  const statusText = {
    sending: ['Надсилання…', 'text-slate-500'],
    ok: ['Дякую! Повідомлення надіслано.', 'text-green-600'],
    error: ['Не вдалося надіслати. Спробуйте ще раз.', 'text-red-500'],
    'not-configured': ['Formspree ще не налаштовано: вкажіть endpoint у src/config.js.', 'text-red-500'],
  }[sendStatus];

  return (
    <>
      {/* Кнопка для ручного відкриття (не чекаючи хвилину) */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed right-5 bottom-5 z-40 cursor-pointer rounded-full bg-brand-600 px-5 py-3 font-semibold text-white shadow-xl transition hover:scale-105 hover:bg-brand-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-300"
        >
          ✉ Зворотний зв'язок
        </button>
      )}

      {/* Умовний рендеринг: модальне вікно існує в DOM лише коли isOpen === true */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={close}></div>

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
            className="relative max-h-[calc(100vh-2rem)] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-7 shadow-2xl dark:bg-slate-900"
          >
            <h2 id="contact-title" className="text-2xl font-bold text-slate-900 dark:text-white">Зворотний зв'язок</h2>
            <p className="mt-1 mb-5 text-sm text-slate-500 dark:text-slate-400">Залиште повідомлення — лист надійде мені на пошту.</p>

            <form action={FORMSPREE_ENDPOINT} method="POST" onSubmit={handleSubmit} className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Ім'я
                <input type="text" name="name" required minLength={2} autoComplete="name" className={`${inputClass} mt-1`} />
              </label>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Email
                <input type="email" name="email" required autoComplete="email" className={`${inputClass} mt-1`} />
              </label>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Номер телефону
                <input
                  type="tel"
                  name="phone"
                  required
                  pattern="\+?[0-9\s\-\(\)]{10,18}"
                  placeholder="+380 XX XXX XX XX"
                  autoComplete="tel"
                  className={`${inputClass} mt-1`}
                />
              </label>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Повідомлення
                <textarea name="message" rows={4} required className={`${inputClass} mt-1 resize-y`}></textarea>
              </label>

              {statusText && <p className={`text-sm ${statusText[1]}`}>{statusText[0]}</p>}

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={sendStatus === 'sending'}
                  className="flex-1 cursor-pointer rounded-lg bg-brand-600 py-2.5 font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
                >
                  Надіслати
                </button>
                <button
                  type="button"
                  onClick={close}
                  className="cursor-pointer rounded-lg border border-slate-300 px-5 py-2.5 font-semibold text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Закрити
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ContactForm;
