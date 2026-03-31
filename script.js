const statusBtn = document.getElementById('statusBtn');
const themeToggle = document.getElementById('themeToggle');

const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);

    if (!themeToggle) {
        return;
    }

    if (theme === 'light') {
        themeToggle.textContent = '☀️ Light';
    } else {
        themeToggle.textContent = '🌙 Dark';
    }
};

const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

setTheme(getInitialTheme());

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

        setTheme(nextTheme);
        localStorage.setItem('theme', nextTheme);
    });
}

if (statusBtn) {
    statusBtn.addEventListener('click', () => {
        statusBtn.classList.add('pop');

        setTimeout(() => {
            statusBtn.classList.remove('pop');
        }, 150);

        const currentState = statusBtn.getAttribute('data-state') || 'available';
        const nextState = currentState === 'available' ? 'unavailable' : 'available';

        if (nextState === 'unavailable') {
            statusBtn.textContent = '🔴 Unavailable for Projects';
            statusBtn.classList.add('status-btn--unavailable');
        } else {
            statusBtn.textContent = '🟢 Available for Projects';
            statusBtn.classList.remove('status-btn--unavailable');
        }

        statusBtn.setAttribute('data-state', nextState);
    });
}