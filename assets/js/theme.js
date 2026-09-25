// MATCHA TIMES — Unified Theme Controller (Dark / Light Mode)
// Shared across Main Website (index.html) and Admin Portal (sales-report.html)

(function () {
  const savedTheme = localStorage.getItem('matcha_theme');
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
})();

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  try {
    localStorage.setItem('matcha_theme', isDark ? 'dark' : 'light');
  } catch (e) {
    console.warn('LocalStorage access error:', e);
  }
  updateThemeUI();

  // Track event if analytics available
  if (typeof window.trackEvent === 'function') {
    window.trackEvent('theme_switched', { theme: isDark ? 'dark' : 'light' });
  }
}

function updateThemeUI() {
  const isDark = document.documentElement.classList.contains('dark');

  // 1. Toggle Moon and Sun icons across all toggle buttons
  document.querySelectorAll('.moon-icon').forEach(icon => {
    if (isDark) {
      icon.classList.add('hidden');
    } else {
      icon.classList.remove('hidden');
    }
  });

  document.querySelectorAll('.sun-icon').forEach(icon => {
    if (isDark) {
      icon.classList.remove('hidden');
    } else {
      icon.classList.add('hidden');
    }
  });

  // 2. Toggle text labels if present
  document.querySelectorAll('.theme-label').forEach(label => {
    label.textContent = isDark ? 'โหมดสว่าง' : 'โหมดมืด';
  });

  // 3. Update accessibility and title attributes
  document.querySelectorAll('.theme-toggle-btn, #theme-toggle-btn').forEach(btn => {
    const titleText = isDark ? 'เปลี่ยนเป็นโหมดสว่าง' : 'เปลี่ยนเป็นโหมดมืด';
    btn.setAttribute('title', titleText);
    btn.setAttribute('aria-label', titleText);
  });

  // 4. Re-render Lucide icons if available
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

// Expose globally
window.toggleTheme = toggleTheme;
window.updateThemeUI = updateThemeUI;

// Sync across multiple open browser tabs
window.addEventListener('storage', (e) => {
  if (e.key === 'matcha_theme') {
    if (e.newValue === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    updateThemeUI();
  }
});

// Update UI when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', updateThemeUI);
} else {
  updateThemeUI();
}
