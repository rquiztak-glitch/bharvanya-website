// Bharvanya E-Suvidha Portal interactions
(() => {
  const toggle = document.getElementById('langToggle');
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  let language = 'en';

  function setLanguage(next) {
    language = next;
    document.documentElement.lang = next;
    document.querySelectorAll('[data-en][data-hi]').forEach((el) => {
      el.innerHTML = el.dataset[next];
    });
    if (toggle) toggle.textContent = next === 'en' ? 'हिंदी' : 'English';
  }

  if (toggle) toggle.addEventListener('click', () => setLanguage(language === 'en' ? 'hi' : 'en'));

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });
    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const serviceSearch = document.getElementById('serviceSearch');
  const serviceCards = [...document.querySelectorAll('#serviceGrid .service-card')];
  const filterButtons = [...document.querySelectorAll('.filter-btn')];
  const noResults = document.getElementById('noResults');
  let activeFilter = 'all';

  function filterServices() {
    const query = (serviceSearch?.value || '').trim().toLowerCase();
    let shown = 0;
    serviceCards.forEach((card) => {
      const category = card.dataset.category || '';
      const haystack = `${card.dataset.search || ''} ${card.innerText}`.toLowerCase();
      const matchesCategory = activeFilter === 'all' || category === activeFilter;
      const matchesQuery = !query || haystack.includes(query);
      const visible = matchesCategory && matchesQuery;
      card.hidden = !visible;
      if (visible) shown += 1;
    });
    if (noResults) noResults.hidden = shown !== 0;
  }

  if (serviceSearch) serviceSearch.addEventListener('input', filterServices);
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter || 'all';
      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      filterServices();
    });
  });
})();
