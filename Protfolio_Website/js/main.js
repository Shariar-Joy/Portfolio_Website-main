(() => {
  'use strict';
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const mobile = window.matchMedia('(max-width: 680px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // The navigation remains usable if JavaScript is disabled.
  nav.classList.add('menu-ready');
  const closeMenu = (restoreFocus = false) => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    nav.classList.remove('is-open');
    if (restoreFocus && mobile.matches) menuToggle.focus();
  };
  menuToggle.addEventListener('click', () => {
    if (menuToggle.getAttribute('aria-expanded') === 'true') closeMenu();
    else {
      menuToggle.setAttribute('aria-expanded', 'true');
      menuToggle.setAttribute('aria-label', 'Close navigation');
      nav.classList.add('is-open');
    }
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu(true);
  });
  document.addEventListener('click', event => {
    if (!header.contains(event.target)) closeMenu();
  });
  mobile.addEventListener('change', () => closeMenu());

  let scrollScheduled = false;
  const updateHeader = () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
    scrollScheduled = false;
  };
  window.addEventListener('scroll', () => {
    if (!scrollScheduled) {
      scrollScheduled = true;
      window.requestAnimationFrame(updateHeader);
    }
  }, { passive: true });
  updateHeader();

  const revealElements = document.querySelectorAll('.reveal');
  let revealObserver;
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('is-pending');
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -15px 0px' });
    revealElements.forEach(element => {
      element.classList.add('is-pending');
      revealObserver.observe(element);
    });
  }
  reducedMotion.addEventListener('change', event => {
    if (event.matches) {
      revealObserver?.disconnect();
      revealElements.forEach(element => element.classList.remove('is-pending'));
    }
  });

  const filters = document.querySelector('.project-filters');
  const filterButtons = filters.querySelectorAll('button');
  const projects = document.querySelectorAll('.project-card');
  const projectCount = document.querySelector('#project-count');
  filters.hidden = false;
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      let visible = 0;
      projects.forEach(project => {
        const matches = filter === 'all' || project.dataset.category.split(' ').includes(filter);
        project.hidden = !matches;
        if (matches) {
          visible += 1;
          project.classList.remove('is-pending');
          project.classList.add('is-visible');
        }
      });
      projectCount.textContent = `${visible} ${visible === 1 ? 'project' : 'projects'}${filter === 'all' ? ' selected' : ''}`;
    });
  });

  if ('IntersectionObserver' in window) {
    const navLinks = nav.querySelectorAll('a[href^="#"]');
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
          if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
    document.querySelectorAll('main > section[id]').forEach(section => sectionObserver.observe(section));
  }

  const copyButton = document.querySelector('.copy-email');
  const copyStatus = document.querySelector('.copy-status');
  let copyTimer;
  if (navigator.clipboard && window.isSecureContext) {
    copyButton.hidden = false;
    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText('shariarjoy707@gmail.com');
        copyStatus.textContent = 'Email copied';
      } catch {
        copyStatus.textContent = 'Select the email address to copy it.';
      }
      window.clearTimeout(copyTimer);
      copyTimer = window.setTimeout(() => { copyStatus.textContent = ''; }, 4000);
    });
  }
  document.querySelector('#current-year').textContent = String(new Date().getFullYear());
})();
