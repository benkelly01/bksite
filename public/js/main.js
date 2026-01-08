// Theme toggle
(function() {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', function() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    let newTheme;
    if (current === 'dark') {
      newTheme = 'light';
    } else if (current === 'light') {
      newTheme = 'dark';
    } else {
      // No explicit theme set, toggle from system preference
      newTheme = systemDark ? 'light' : 'dark';
    }

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
})();

// Reading progress bar
(function() {
  const progressBar = document.querySelector('.reading-progress');
  if (!progressBar) return;

  const article = document.querySelector('.post-content');
  if (!article) return;

  function updateProgress() {
    const articleRect = article.getBoundingClientRect();
    const articleTop = articleRect.top + window.scrollY;
    const articleHeight = article.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;

    // Calculate how far through the article we've scrolled
    const start = articleTop - windowHeight;
    const end = articleTop + articleHeight;
    const current = scrollY;

    let progress = 0;
    if (current > start) {
      progress = Math.min(100, Math.max(0, ((current - start) / (end - start)) * 100));
    }

    progressBar.style.width = progress + '%';
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  updateProgress();
})();
