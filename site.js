document.documentElement.classList.add('js');

const hero = document.querySelector('.hero');
if (hero) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let slides = [];
  let current = 0;
  let inView = true;
  let incoming = null;
  let nextTimer;
  let fadeTimer;
  const holdDuration = 4000;
  const fadeDuration = 3000;
  const canPlay = () => slides.length > 1 && !reducedMotion.matches && !document.hidden && inView;

  const schedule = () => {
    window.clearTimeout(nextTimer);
    if (canPlay() && !incoming) nextTimer = window.setTimeout(advance, holdDuration);
  };
  const finishFade = () => {
    if (!incoming) return;
    window.clearTimeout(fadeTimer);
    slides.forEach(slide => slide.classList.remove('is-previous'));
    incoming = null;
    schedule();
  };
  const advance = () => {
    if (!canPlay() || incoming) return;
    const previous = slides[current];
    current = (current + 1) % slides.length;
    incoming = slides[current];
    // Keep the outgoing photo opaque beneath the incoming fade to avoid dark flashes.
    previous.classList.add('is-previous');
    previous.classList.remove('is-active');
    incoming.classList.add('is-active');
    fadeTimer = window.setTimeout(finishFade, fadeDuration + 100);
  };
  hero.addEventListener('transitionend', event => {
    if (event.target === incoming && event.propertyName === 'opacity') finishFade();
  });
  const updateMotion = () => {
    if (reducedMotion.matches) finishFade();
    schedule();
  };
  reducedMotion.addEventListener('change', updateMotion);
  document.addEventListener('visibilitychange', schedule);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting;
      schedule();
    }).observe(hero);
  }
  Promise.all(Array.from(hero.querySelectorAll('.hero-slide'), async slide => {
    try {
      await slide.decode();
      return slide;
    } catch {
      return null;
    }
  })).then(loaded => {
    slides = loaded.filter(Boolean);
    if (!slides.length) return;
    hero.querySelectorAll('.hero-slide').forEach(slide => slide.classList.remove('is-active'));
    slides[0].classList.add('is-active');
    updateMotion();
  });
}

const menuButton = document.querySelector('.nav-toggle');
const menu = document.querySelector('#primary-nav');
if (menuButton && menu) {
  const closeMenu = (restoreFocus = false) => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    menu.classList.remove('is-open');
    if (restoreFocus) menuButton.focus();
  };
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    menu.classList.toggle('is-open', isOpen);
  });
  menu.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  window.matchMedia('(min-width: 901px)').addEventListener('change', event => {
    if (event.matches) closeMenu();
  });
}

const enquiryForm = document.querySelector('#enquiry-form');
if (enquiryForm) {
  enquiryForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!enquiryForm.reportValidity()) return;
    const values = new FormData(enquiryForm);
    const get = name => String(values.get(name) || '').trim();
    const body = [
      'Hello Lone Star Al Serdal,', '',
      'I would like to discuss the following enquiry:', '',
      `Name: ${get('name')}`, `Company: ${get('company')}`,
      `Email: ${get('email')}`, `Phone: ${get('phone')}`,
      `Country: ${get('country')}`, `Industry: ${get('industry')}`,
      `Regional objective: ${get('goal')}`, '', 'Message:', get('message')
    ].join('\r\n');
    const subject = `Website enquiry — ${get('company') || get('name')}`;
    window.location.href = `mailto:info@lonestaralserdal.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const status = document.querySelector('#form-status');
    if (status) status.textContent = 'Your email app will open with your enquiry ready to send. Send it there to complete your enquiry, or email info@lonestaralserdal.com directly.';
  });
}
