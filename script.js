const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const yearElement = document.getElementById('year');
const whatsappReveal = document.getElementById('whatsapp-reveal');
const whatsappNumber = document.getElementById('whatsapp-number');

const applyTheme = (theme) => {
  let selectedTheme = theme;
  if (!selectedTheme) {
    try {
      selectedTheme = localStorage.getItem('portfolio-theme');
    } catch (error) {
      selectedTheme = null;
    }
  }

  if (!selectedTheme) {
    selectedTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  body.setAttribute('data-theme', selectedTheme);
  if (themeToggle) {
    const icon = themeToggle.querySelector('.theme-toggle__icon');
    if (icon) {
      icon.textContent = selectedTheme === 'light' ? '☾' : '☀︎';
    }
    themeToggle.setAttribute('aria-pressed', String(selectedTheme === 'light'));
  }
};

const toggleTheme = () => {
  const currentTheme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  body.setAttribute('data-theme', currentTheme);
  try {
    localStorage.setItem('portfolio-theme', currentTheme);
  } catch (error) {
    // Ignore storage errors for privacy-restricted sessions.
  }
  if (themeToggle) {
    const icon = themeToggle.querySelector('.theme-toggle__icon');
    if (icon) {
      icon.textContent = currentTheme === 'light' ? '☾' : '☀︎';
    }
    themeToggle.setAttribute('aria-pressed', String(currentTheme === 'light'));
  }
};

const setMenuState = (isOpen) => {
  if (menuToggle) {
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  }
  if (siteNav) {
    siteNav.classList.toggle('is-open', isOpen);
  }
};

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

if (whatsappReveal && whatsappNumber) {
  whatsappReveal.addEventListener('click', () => {
    const isRevealed = whatsappReveal.getAttribute('aria-expanded') === 'true';
    whatsappReveal.setAttribute('aria-expanded', String(!isRevealed));
    whatsappNumber.classList.toggle('is-visible', !isRevealed);
    whatsappNumber.setAttribute('aria-hidden', String(isRevealed));
  });
}

applyTheme();

if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    setMenuState(!isOpen);
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });

  document.addEventListener('click', (event) => {
    if (window.innerWidth <= 760 && siteNav.classList.contains('is-open') && !siteNav.contains(event.target) && !menuToggle.contains(event.target)) {
      setMenuState(false);
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    setMenuState(false);
  }
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  document.querySelectorAll('.fade-in').forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll('.fade-in').forEach((element) => element.classList.add('visible'));
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 760) {
    setMenuState(false);
  }
});

const abstractModal = document.getElementById('abstract-modal');
const abstractModalTitle = document.getElementById('abstract-modal-title');
const abstractModalBody = document.getElementById('abstract-modal-body');
let lastAbstractTrigger = null;

const closeAbstractModal = () => {
  if (!abstractModal) return;
  abstractModal.classList.remove('is-open');
  abstractModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  if (lastAbstractTrigger) {
    lastAbstractTrigger.focus();
    lastAbstractTrigger = null;
  }
};

const openAbstractModal = (trigger) => {
  const template = document.getElementById(trigger.dataset.abstractTarget);
  if (!abstractModal || !template) return;
  abstractModalTitle.textContent = trigger.dataset.abstractTitle || '';
  abstractModalBody.replaceChildren(template.content.cloneNode(true));
  abstractModal.classList.add('is-open');
  abstractModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  lastAbstractTrigger = trigger;
  abstractModal.querySelector('.abstract-modal__close')?.focus();
};

document.querySelectorAll('.abstract-trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => openAbstractModal(trigger));
});

if (abstractModal) {
  abstractModal.querySelectorAll('[data-abstract-close]').forEach((element) => {
    element.addEventListener('click', closeAbstractModal);
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && abstractModal?.classList.contains('is-open')) {
    closeAbstractModal();
  }
});

