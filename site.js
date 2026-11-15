document.documentElement.classList.add('js');

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
