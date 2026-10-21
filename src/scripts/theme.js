/**
 * CentralApp - Theme Management Module
 * Supports Dark and Light theme with instant persistence and OS preference sync.
 */

const THEME_STORAGE_KEY = 'centralapp_theme';

export function initTheme() {
  const root = document.documentElement;
  const themeToggleButtons = document.querySelectorAll('.theme-toggle-btn');
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  // Determine initial theme: saved in localStorage or OS preference
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  applyTheme(initialTheme);

  // Attach click listener to all theme buttons
  themeToggleButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    });
  });

  // Watch for system preference changes if user hasn't explicitly set one
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);

    if (themeMeta) {
      themeMeta.setAttribute('content', theme === 'dark' ? '#140C07' : '#F9F5EC');
    }

    // Update toggle icons (sun/moon)
    themeToggleButtons.forEach((btn) => {
      const icon = btn.querySelector('.theme-icon');
      if (icon) {
        icon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
        btn.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
      }
    });
  }
}
