(function () {
  'use strict';

  var root = document.documentElement;
  var STORAGE_KEY = 'mc-portfolio-v4-theme';

  /* ============ Theme toggle (dark-first) ============ */
  var toggle = document.getElementById('theme-toggle');

  function currentTheme() {
    return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function updateLabel() {
    // Label shows the mode you'd switch TO.
    toggle.textContent = currentTheme() === 'dark' ? 'light_mode' : 'dark_mode';
  }

  toggle.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    if (next === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }
    try { localStorage.setItem(STORAGE_KEY, next); } catch (e) {}
    updateLabel();
  });

  updateLabel();

  /* ============ Scroll reveal ============ */
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('[data-reveal]').forEach(function (el) {
    // Only animate elements that start below the fold, so the initial
    // viewport renders complete without waiting on the observer.
    if (el.getBoundingClientRect().top > window.innerHeight * 0.92) {
      el.classList.add('reveal-pending');
      io.observe(el);
    }
  });
})();
