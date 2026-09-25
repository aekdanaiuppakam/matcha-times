// ═══════════════════════════════════════════════════════════════
// MATCHA TIMES — Animation Controller v2.0
// Splash Screen · Hero Entrance & Typewriter · Trust Counter · 
// Scroll Progress · Scroll Reveal · MATTY Micro-Interactions · 
// Back-to-Top · Celebration Confetti
// ═══════════════════════════════════════════════════════════════
(function() {

  // ─── 1. SPLASH SCREEN ─────────────────────────────────────
  function initSplashScreen() {
    const splash = document.getElementById('splash-screen');
    if (!splash) return;

    const dismiss = () => {
      if (splash.classList.contains('splash-exit')) return;
      splash.classList.add('splash-exit');
      setTimeout(() => {
        splash.classList.add('splash-hidden');
        triggerHeroEntrance();
      }, 650);
    };

    // Auto-dismiss timer (2.4s)
    setTimeout(dismiss, 2400);

    // Tap to skip immediately
    splash.addEventListener('click', dismiss);
    splash.addEventListener('touchstart', dismiss, { passive: true });
  }


  // ─── 2. HERO ENTRANCE & TYPEWRITER ANIMATION ──────────────
  function triggerHeroEntrance() {
    const heroElements = document.querySelectorAll('.hero-anim');
    heroElements.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('hero-visible');
      }, i * 120);
    });

    // Start hero headline typewriter effect
    initHeroTypewriter();

    // Trigger trust-strip entrance + counter numbers
    setTimeout(() => {
      const trustItems = document.querySelectorAll('.trust-anim');
      trustItems.forEach((el, i) => {
        setTimeout(() => {
          el.classList.add('hero-visible');
        }, i * 80);
      });
      // Start counting numbers
      setTimeout(animateTrustCounters, 300);
    }, 450);
  }

  function getGraphemeClusters(text) {
    if (typeof Intl !== 'undefined' && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter('th', { granularity: 'grapheme' });
      return Array.from(segmenter.segment(text), s => s.segment);
    }
    return text.match(/[\u0E00-\u0E7F][\u0E30-\u0E4E]*|[^\u0E00-\u0E7F]/gu) || text.split('');
  }

  function initHeroTypewriter() {
    const titleEl = document.querySelector('h1[data-i18n="hero_title_1"]');
    if (!titleEl) return;

    const fullText = titleEl.textContent.trim();
    if (!fullText) return;

    const graphemes = getGraphemeClusters(fullText);
    titleEl.textContent = '';

    const textNode = document.createTextNode('');
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    titleEl.appendChild(textNode);
    titleEl.appendChild(cursor);

    let clusterIdx = 0;
    const typeSpeed = 45; // ms per cluster

    function typeNext() {
      if (clusterIdx < graphemes.length) {
        clusterIdx++;
        textNode.nodeValue = graphemes.slice(0, clusterIdx).join('');
        setTimeout(typeNext, typeSpeed);
      } else {
        // Complete text: clean up cursor after 2s
        setTimeout(() => {
          cursor.style.transition = 'opacity 0.4s ease';
          cursor.style.opacity = '0';
          setTimeout(() => {
            cursor.remove();
            titleEl.textContent = fullText;
          }, 400);
        }, 2000);
      }
    }
    setTimeout(typeNext, 180);
  }


  // ─── 3. TRUST STRIP COUNTER ANIMATION ─────────────────────
  let countersAnimated = false;
  function animateTrustCounters() {
    if (countersAnimated) return;
    countersAnimated = true;

    const statElements = document.querySelectorAll('[data-i18n^="stat_"]:not([data-i18n$="_sub"])');
    statElements.forEach(el => {
      const originalText = el.textContent.trim();
      // Match pattern: (prefix)(number)(suffix)
      const match = originalText.match(/^(.*?)(\d+)(.*)$/);
      if (!match) return;

      const prefix = match[1];
      const targetVal = parseInt(match[2], 10);
      const suffix = match[3];

      const duration = 1200; // ms
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const easeVal = 1 - Math.pow(1 - progress, 3);
        const currentNum = Math.floor(easeVal * targetVal);

        el.textContent = `${prefix}${currentNum}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = originalText;
        }
      }

      requestAnimationFrame(update);
    });
  }


  // ─── 4. SCROLL PROGRESS BAR ───────────────────────────────
  function initScrollProgress() {
    let bar = document.getElementById('scroll-progress');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'scroll-progress';
      bar.className = 'scroll-progress';
      document.body.appendChild(bar);
    }

    const updateBar = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const pct = Math.min(100, Math.max(0, (window.scrollY / scrollHeight) * 100));
        bar.style.width = pct + '%';
      }
    };

    window.addEventListener('scroll', updateBar, { passive: true });
    updateBar();
  }


  // ─── 5. BACK TO TOP BUTTON (MATTY MASCOT) ─────────────────
  function initBackToTop() {
    if (document.getElementById('back-to-top')) return;

    const btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.className = 'back-to-top';
    btn.title = 'กลับสู่ด้านบนสุด';
    btn.setAttribute('aria-label', 'Scroll back to top');
    btn.innerHTML = `
      <img src="assets/images/matty.jpg" alt="MATTY">
      <div class="btt-arrow">
        <svg viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"></polyline></svg>
      </div>
    `;

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.body.appendChild(btn);

    let scrollTicking = false;
    window.addEventListener('scroll', () => {
      if (!scrollTicking) {
        requestAnimationFrame(() => {
          if (window.scrollY > 400) {
            btn.classList.add('visible');
          } else {
            btn.classList.remove('visible');
          }
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    }, { passive: true });
  }


  // ─── 6. CONFETTI CELEBRATION ──────────────────────────────
  window.triggerConfetti = function(count = 36) {
    let container = document.getElementById('confetti-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'confetti-container';
      container.className = 'confetti-container';
      document.body.appendChild(container);
    }

    const colors = ['#3d8535', '#8cc280', '#c9a84c', '#e0f0db', '#2d6a28', '#ffd700', '#06C755', '#4caf50'];
    for (let i = 0; i < count; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const size = 6 + Math.random() * 8;
      const animDuration = 1.8 + Math.random() * 1.2;
      const delay = Math.random() * 0.35;

      piece.style.cssText = `
        left: ${left}%;
        top: -10px;
        width: ${size}px;
        height: ${size * (Math.random() > 0.4 ? 1 : 1.5)}px;
        background: ${color};
        border-radius: ${Math.random() > 0.35 ? '2px' : '50%'};
        animation-duration: ${animDuration}s;
        animation-delay: ${delay}s;
      `;
      container.appendChild(piece);
      setTimeout(() => piece.remove(), (animDuration + delay) * 1000 + 100);
    }
  };


  // ─── 7. SCROLL REVEAL (Intersection Observer) ─────────────
  function initScrollReveal() {
    const revealSelectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale';
    const revealElements = document.querySelectorAll(revealSelectors);
    if (!revealElements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.revealDelay || 0;
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, parseInt(delay));
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  }


  // ─── 8. MATTY MICRO-INTERACTIONS ──────────────────────────
  function initMattyInteractions() {
    const mattyBtn = document.querySelector('.ai-fab-btn');
    if (!mattyBtn) return;

    function triggerWave() {
      mattyBtn.classList.add('matty-wave');
      mattyBtn.addEventListener('animationend', () => {
        mattyBtn.classList.remove('matty-wave');
      }, { once: true });
    }

    setTimeout(() => {
      triggerWave();
      setInterval(triggerWave, 12000);
    }, 6000);
  }


  // ─── 9. AUTO-TAG REVEAL CLASSES & CARD SHINE ──────────────
  function autoTagRevealElements() {
    const sectionSelectors = [
      '#tier-list', '#catalog', '#matchmaker',
      '#comparison-section', '#calculator', '#recipes',
      '#terroirs', '#story', '#faq'
    ];

    sectionSelectors.forEach(sel => {
      const section = document.querySelector(sel);
      if (!section) return;

      const headings = section.querySelectorAll('h2, h3.section-title, .section-header');
      headings.forEach(h => {
        if (!h.classList.contains('reveal') && !h.closest('.reveal')) {
          h.classList.add('reveal');
        }
      });
    });

    // Tag trust-strip items
    const trustItems = document.querySelectorAll('.hero-tea-farm .grid > div');
    trustItems.forEach((item, i) => {
      item.classList.add('trust-anim', 'hero-anim');
      item.style.transitionDelay = `${i * 80}ms`;
    });

    // Tag hero content elements
    const heroContent = document.querySelector('.hero-tea-farm .max-w-2xl');
    if (heroContent) {
      const children = heroContent.children;
      for (let i = 0; i < children.length; i++) {
        children[i].classList.add('hero-anim');
      }
    }

    // Tag product cards and grid items for scroll reveal
    const revealItems = document.querySelectorAll(
      '.recipe-card, .terroir-card, .faq-item, ' +
      '#product-grid > div, #recipes .grid > div, #terroirs .grid > div'
    );
    revealItems.forEach((item, i) => {
      if (!item.classList.contains('reveal') && !item.closest('.modal-overlay')) {
        item.classList.add('reveal');
        item.dataset.revealDelay = Math.min((i % 4) * 90, 270).toString();
      }
    });

    // Tag CTA banner
    const ctaBanner = document.querySelector('#b2b-banner, .b2b-cta-section');
    if (ctaBanner) {
      ctaBanner.classList.add('reveal-scale');
    }
  }


  // ─── INIT ON DOM READY ────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    autoTagRevealElements();
    initSplashScreen();
    initScrollProgress();
    initBackToTop();
    initScrollReveal();
    initMattyInteractions();
  });

})();
