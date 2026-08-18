const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');

const getStoredTheme = () => {
  try {
    return localStorage.getItem('portfolio-theme');
  } catch (error) {
    return null;
  }
};

const setTheme = (theme) => {
  body.setAttribute('data-theme', theme);
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(theme === 'light'));
    themeToggle.querySelector('span').textContent = theme === 'light' ? '☾' : '☀︎';
  }
};

const initialTheme = getStoredTheme() || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
setTheme(initialTheme);

themeToggle?.addEventListener('click', () => {
  const nextTheme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  setTheme(nextTheme);
  try {
    localStorage.setItem('portfolio-theme', nextTheme);
  } catch (error) {
    // Theme still works when storage is unavailable.
  }
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-in').forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll('.fade-in').forEach((element) => element.classList.add('visible'));
}
