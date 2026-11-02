/* ==========================================================================
   script.js — логіка сторінки-резюме
   Лабораторна робота №4, Частина 1 (чистий JavaScript, ES6+)
   1. Інформація про ОС і браузер → localStorage → футер
   2. Відгуки роботодавців з JSONPlaceholder (Fetch API, async/await)
   3. Модальне вікно зворотного зв'язку через 1 хвилину (Formspree)
   4. Денна / нічна тема: автоматично за часом доби + ручний перемикач
   ========================================================================== */

const VARIANT = 23;
const COMMENTS_URL = `https://jsonplaceholder.typicode.com/posts/${VARIANT}/comments`;
const MODAL_DELAY_MS = 60 * 1000;   // 1 хвилина
const DAY_START_HOUR = 7;           // денна тема: 07:00 – 20:59
const DAY_END_HOUR = 21;


/* 1. localStorage ------------------------------------------------------------ */

// Людські назви ключів для відображення у футері
const STORAGE_LABELS = {
    os: 'Операційна система',
    platform: 'Платформа (navigator.platform)',
    browser: 'Браузер',
    userAgent: 'User-Agent',
    language: 'Мова інтерфейсу',
    languages: 'Бажані мови',
    cookiesEnabled: 'Cookies',
    online: 'Мережа',
    cpuCores: 'Логічних ядер CPU',
    screen: 'Роздільна здатність екрана',
    colorDepth: 'Глибина кольору',
    timezone: 'Часовий пояс',
    savedAt: 'Дані збережено',
};

function detectOS(ua) {
    if (/Windows NT 10/.test(ua)) return 'Windows 10/11';
    if (/Windows/.test(ua)) return 'Windows';
    if (/Android/.test(ua)) return 'Android';
    if (/iPhone|iPad|iPod/.test(ua)) return 'iOS';
    if (/Mac OS X/.test(ua)) return 'macOS';
    if (/Linux/.test(ua)) return 'Linux';
    return 'Невідомо';
}

function detectBrowser(ua) {
    // Порядок важливий: User-Agent Edge і Opera також містять "Chrome"
    const rules = [
        ['Edge', /Edg\/([\d.]+)/],
        ['Opera', /OPR\/([\d.]+)/],
        ['Chrome', /Chrome\/([\d.]+)/],
        ['Firefox', /Firefox\/([\d.]+)/],
        ['Safari', /Version\/([\d.]+).*Safari/],
    ];
    for (const [name, regex] of rules) {
        const match = ua.match(regex);
        if (match) return `${name} ${match[1]}`;
    }
    return 'Невідомо';
}

function saveSystemInfo() {
    const ua = navigator.userAgent;
    const info = {
        os: detectOS(ua),
        platform: navigator.platform || 'Невідомо',
        browser: detectBrowser(ua),
        userAgent: ua,
        language: navigator.language,
        // localStorage зберігає лише рядки, тому масив перетворюємо на JSON
        languages: JSON.stringify(navigator.languages),
        cookiesEnabled: navigator.cookieEnabled ? 'увімкнено' : 'вимкнено',
        online: navigator.onLine ? 'онлайн' : 'офлайн',
        cpuCores: navigator.hardwareConcurrency ?? 'Невідомо',
        screen: `${screen.width}×${screen.height}`,
        colorDepth: `${screen.colorDepth} біт`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        savedAt: new Date().toLocaleString('uk-UA'),
    };

    for (const [key, value] of Object.entries(info)) {
        localStorage.setItem(key, String(value));
    }
}

function renderLocalStorage() {
    const list = document.getElementById('storage-list');
    list.innerHTML = '';

    // Показуємо ВСЕ, що є в localStorage, а не лише наші ключі.
    // Порядок key(i) браузер не гарантує, тому відомі ключі ставимо першими
    const known = Object.keys(STORAGE_LABELS);
    const keys = Object.keys(localStorage).sort((a, b) => {
        const ia = known.includes(a) ? known.indexOf(a) : known.length;
        const ib = known.includes(b) ? known.indexOf(b) : known.length;
        return ia - ib || a.localeCompare(b);
    });

    for (const key of keys) {
        let value = localStorage.getItem(key);

        if (key === 'languages') {
            value = JSON.parse(value).join(', ');
        }

        const term = document.createElement('dt');
        term.textContent = STORAGE_LABELS[key] ?? key;
        const desc = document.createElement('dd');
        desc.textContent = value;   // textContent — без ризику XSS
        list.append(term, desc);
    }
}


/* 2. Відгуки з сервера (Fetch API) -------------------------------------------- */

function createReviewCard(comment, index) {
    const card = document.createElement('article');
    card.className = 'review';

    const title = document.createElement('h3');
    title.textContent = `${index + 1}. ${comment.name}`;

    const author = document.createElement('a');
    author.className = 'review__email';
    author.href = `mailto:${comment.email}`;
    author.textContent = comment.email;

    const body = document.createElement('p');
    body.textContent = comment.body;

    card.append(title, author, body);
    return card;
}

async function loadReviews() {
    const container = document.getElementById('reviews-list');

    try {
        const response = await fetch(COMMENTS_URL);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const comments = await response.json();

        container.innerHTML = '';
        // Відображаємо у порядку отримання (сортування не застосовуємо)
        comments.forEach((comment, index) => {
            container.append(createReviewCard(comment, index));
        });
    } catch (error) {
        console.error('Не вдалося завантажити відгуки:', error);
        container.innerHTML = '<p class="status-text status-text--error">Не вдалося завантажити відгуки. Спробуйте пізніше.</p>';
    }
}


/* 3. Модальне вікно зворотного зв'язку ---------------------------------------- */

const modal = document.getElementById('feedback-modal');

function openModal() {
    modal.hidden = false;
    document.body.classList.add('no-scroll');
    modal.querySelector('input').focus();
}

function closeModal() {
    modal.hidden = true;
    document.body.classList.remove('no-scroll');
}

function initFeedbackModal() {
    setTimeout(openModal, MODAL_DELAY_MS);

    document.getElementById('open-feedback').addEventListener('click', openModal);

    // Закриття: хрестик або клік по фону (обидва мають data-close-modal) та Escape
    modal.querySelectorAll('[data-close-modal]').forEach((el) => {
        el.addEventListener('click', closeModal);
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !modal.hidden) closeModal();
    });

    const form = document.getElementById('feedback-form');
    const status = document.getElementById('form-status');

    // Надсилаємо через fetch, щоб не залишати сторінку; без JS форма
    // все одно працює завдяки action/method у HTML
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (form.action.includes('YOUR_FORM_ID')) {
            status.textContent = 'Formspree ще не налаштовано: вкажіть свій endpoint в action форми.';
            status.className = 'form-status form-status--error';
            return;
        }

        status.textContent = 'Надсилання…';
        status.className = 'form-status';

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { Accept: 'application/json' },
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            form.reset();
            status.textContent = 'Дякую! Повідомлення надіслано.';
            status.className = 'form-status form-status--ok';
        } catch (error) {
            console.error('Помилка надсилання форми:', error);
            status.textContent = 'Не вдалося надіслати. Спробуйте ще раз.';
            status.className = 'form-status form-status--error';
        }
    });
}


/* 4. Денна / нічна тема -------------------------------------------------------- */

const themeToggle = document.getElementById('theme-toggle');

function applyTheme(isDark) {
    document.body.classList.toggle('dark-mode', isDark);
    themeToggle.textContent = isDark ? '☀️ Денна тема' : '🌙 Нічна тема';
    themeToggle.setAttribute('aria-pressed', String(isDark));
}

function isDayTime(date = new Date()) {
    const hours = date.getHours();
    return hours >= DAY_START_HOUR && hours < DAY_END_HOUR;
}

function initTheme() {
    applyTheme(!isDayTime());

    themeToggle.addEventListener('click', () => {
        applyTheme(!document.body.classList.contains('dark-mode'));
    });
}


/* Запуск --------------------------------------------------------------------- */
initTheme();
saveSystemInfo();
renderLocalStorage();
loadReviews();
initFeedbackModal();
