/**
 * Theme Manager — Light / Dark Mode Switcher
 * Persists manual preference in localStorage ('rizal_theme_mode'), respects
 * OS prefers-color-scheme on first visit, syncs <meta name="theme-color">,
 * and applies [data-theme="dark"] on <html> before first paint to prevent FOUC.
 */
(function () {
  const STORAGE_KEY = 'rizal_theme_mode';
  const DARK_META_COLOR = '#111318';
  const LIGHT_META_COLOR = '#FAF8F5';
  const mediaQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function getManualTheme() {
    try {
      const val = localStorage.getItem(STORAGE_KEY);
      return val === 'dark' || val === 'light' ? val : null;
    } catch (e) {
      return null;
    }
  }

  function resolveTheme() {
    const manual = getManualTheme();
    if (manual) return manual;
    return mediaQuery && mediaQuery.matches ? 'dark' : 'light';
  }

  function syncThemeColorMeta(isDark) {
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta && document.head) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }
    if (meta) {
      meta.setAttribute('content', isDark ? DARK_META_COLOR : LIGHT_META_COLOR);
    }
  }

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    syncThemeColorMeta(isDark);

    const btn = document.getElementById('theme-toggle-btn');
    if (btn) {
      btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      btn.setAttribute('title', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      btn.setAttribute('aria-pressed', String(isDark));
    }
  }

  // Apply immediately before first paint
  applyTheme(resolveTheme());

  // Follow OS changes only when no manual preference is stored
  if (mediaQuery) {
    const onSystemChange = (e) => {
      if (!getManualTheme()) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    };
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', onSystemChange);
    } else if (typeof mediaQuery.addListener === 'function') {
      mediaQuery.addListener(onSystemChange);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(resolveTheme());
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
