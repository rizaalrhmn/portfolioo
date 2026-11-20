/**
 * Theme Manager — Light / Dark Mode Switcher
 * Persists preference in localStorage ('rizal_theme_mode') and applies
 * [data-theme="dark"] on <html> immediately to prevent flash on load.
 */
(function () {
  const STORAGE_KEY = 'rizal_theme_mode';

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) {
      const isDark = theme === 'dark';
      btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      btn.setAttribute('title', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      btn.setAttribute('aria-pressed', String(isDark));
    }
  }

  // Apply immediately before first paint
  applyTheme(getStoredTheme());

  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(getStoredTheme());
    const toggleBtn = document.getElementById('theme-toggle-btn');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
      const isCurrentlyDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const nextTheme = isCurrentlyDark ? 'light' : 'dark';
      try {
        localStorage.setItem(STORAGE_KEY, nextTheme);
      } catch (e) {
        // Ignore storage errors in restricted contexts
      }
      applyTheme(nextTheme);
    });
  });
})();
