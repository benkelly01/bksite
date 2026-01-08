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
    const articleTop = article.offsetTop;
    const articleHeight = article.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;

    // Calculate progress: 0% when article starts, 100% when article bottom is visible
    const scrollStart = articleTop;
    const scrollEnd = articleTop + articleHeight - windowHeight;

    let progress = 0;
    if (scrollY >= scrollStart) {
      if (scrollY >= scrollEnd) {
        progress = 100;
      } else {
        progress = ((scrollY - scrollStart) / (scrollEnd - scrollStart)) * 100;
      }
    }

    progressBar.style.width = progress + '%';
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  updateProgress();
})();
