(function () {
  'use strict';

  var root = document.documentElement;
  var STORAGE_KEY = 'mc-portfolio-theme';

  /* ============ Theme toggle ============ */
  var toggle = document.getElementById('theme-toggle');

  function currentTheme() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function updateLabel() {
    toggle.textContent = currentTheme() === 'dark' ? 'Light' : 'Dark';
  }

  toggle.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch (e) {}
    updateLabel();
  });

  // Follow OS theme changes while the user hasn't picked one explicitly.
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      var saved = null;
      try { saved = localStorage.getItem(STORAGE_KEY); } catch (err) {}
      if (saved === 'light' || saved === 'dark') return;
      root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      updateLabel();
    });
  }

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
