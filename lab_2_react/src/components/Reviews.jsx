import { useEffect, useState } from 'react';
import { COMMENTS_URL, VARIANT, cardClass } from '../config';

function Reviews() {
  const [comments, setComments] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'error'

  useEffect(() => {
    // AbortController скасовує запит, якщо компонент демонтується раніше, ніж прийде відповідь
    const controller = new AbortController();

    async function loadComments() {
      try {
        const response = await fetch(COMMENTS_URL, { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        setComments(await response.json());
        setStatus('ready');
      } catch (error) {
        if (error.name === 'AbortError') return;
        console.error('Не вдалося завантажити відгуки:', error);
        setStatus('error');
      }
    }

    loadComments();
    return () => controller.abort();
  }, []);

  return (
    <section id="reviews" className={`${cardClass} md:col-span-2`}>
      <h2 className="mb-2 flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">
        <span className="h-6 w-1.5 rounded-full bg-brand-500 dark:bg-brand-400"></span>
        Відгуки попередніх роботодавців
      </h2>
      <p className="mb-5 text-sm text-slate-500 dark:text-slate-400">
        Варіант {VARIANT}: <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs dark:bg-slate-800">{COMMENTS_URL}</code>
      </p>

      {status === 'loading' && <p className="animate-pulse text-slate-500">Завантаження відгуків…</p>}
      {status === 'error' && <p className="text-red-500">Не вдалося завантажити відгуки. Спробуйте пізніше.</p>}

      {status === 'ready' && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {comments.map((comment, index) => (
            <article
              key={comment.id}
              className="flex flex-col rounded-xl border border-slate-200 border-l-4 border-l-brand-500 bg-slate-50 p-5 transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:border-l-brand-400 dark:bg-slate-950"
            >
              <span className="mb-2 text-xs font-semibold tracking-wider text-brand-600 uppercase dark:text-brand-400">Відгук #{index + 1}</span>
              <h3 className="mb-1 font-semibold text-slate-900 capitalize dark:text-white">{comment.name}</h3>
              <a href={`mailto:${comment.email}`} className="mb-3 text-sm text-blue-600 hover:underline dark:text-blue-400">
                {comment.email}
              </a>
              <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">“{comment.body}”</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Reviews;
