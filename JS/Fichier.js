/* ============================================================
   ASSA NDIAYE — PORTFOLIO PREMIUM
   JavaScript : Loader · Cursor · Scroll · Parallax · Dark Mode
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. LOADER ─────────────────────────────────────────── */
  const loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('hidden'), 1800);
    });
  }

  /* ── 2. CUSTOM CURSOR ──────────────────────────────────── */
  const cursor     = document.querySelector('.cursor');
  const cursorRing = document.querySelector('.cursor-ring');

  if (cursor && cursorRing) {
    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top  = mouseY + 'px';
    });

    // Smooth ring follow
    (function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top  = ringY + 'px';
      requestAnimationFrame(animateRing);
    })();

    // Expand on interactive elements
    const interactives = document.querySelectorAll('a, button, .card, .project, input, textarea');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('expand'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('expand'));
    });
  }

  /* ── 3. STICKY HEADER ──────────────────────────────────── */
  const header = document.querySelector('.header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ── 4. SCROLL REVEAL ──────────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger children in same parent
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => revealObserver.observe(el));
  }

  /* ── 5. AUTO-APPLY REVEAL TO SECTIONS ─────────────────── */
  // Add .reveal to cards & section headings automatically
  document.querySelectorAll('.card, .project').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i % 4) * 0.1 + 's';
  });

  document.querySelectorAll('.section > p, #about p, .cta p').forEach(el => {
    el.classList.add('reveal');
  });

  document.querySelectorAll('h2').forEach(el => {
    el.classList.add('reveal');
  });

  // Re-observe newly added reveal elements
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
    const revealObserver2 = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver2.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    revealObserver2.observe(el);
  });

  /* ── 6. SECTION H2 DATA-LABELS ─────────────────────────── */
  const labelMap = {
    'about':    '01 — Qui je suis',
    'services': '02 — Ce que je fais',
    'projects': '03 — Réalisations',
    'blog':     '04 — Réflexions',
    'contact':  '05 — Me contacter',
  };

  document.querySelectorAll('.section').forEach(section => {
    const id = section.id;
    const h2 = section.querySelector('h2');
    if (id && h2 && labelMap[id]) {
      h2.setAttribute('data-label', labelMap[id]);
    }
  });

  /* ── 7. ADD CARD NUMBERS ────────────────────────────────── */
  document.querySelectorAll('.card').forEach((card, i) => {
    if (!card.querySelector('.card-num')) {
      const num = document.createElement('div');
      num.className = 'card-num';
      num.textContent = String(i + 1).padStart(2, '0');
      card.insertBefore(num, card.firstChild);
    }
  });

  /* ── 8. ADD PROJECT TAGS ────────────────────────────────── */
  const projectTags = ['Web Design', 'Dev Web', 'UX/UI'];
  document.querySelectorAll('.project').forEach((proj, i) => {
    if (!proj.querySelector('.project-tag')) {
      const tag = document.createElement('div');
      tag.className = 'project-tag';
      tag.textContent = projectTags[i % projectTags.length];
      proj.insertBefore(tag, proj.firstChild);
    }
  });

  /* ── 9. PARALLAX HERO ───────────────────────────────────── */
  const heroBgText = document.querySelector('.hero-bg-text');
  if (heroBgText) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      heroBgText.style.transform = `translateY(calc(-50% + ${y * 0.3}px))`;
    }, { passive: true });
  }

  /* ── 10. DARK / LIGHT TOGGLE ────────────────────────────── */
  const toggleBtn = document.getElementById('toggleDark');
  if (toggleBtn) {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      document.body.classList.add('light');
      toggleBtn.textContent = '☀️';
    }

    toggleBtn.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light');
      toggleBtn.textContent = isLight ? '☀️' : '🌙';
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
  }

  /* ── 11. FORM INTERACTIONS ─────────────────────────────── */
  const form = document.querySelector('#contact form');
  if (form) {
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', e => {
      e.preventDefault();
      if (submitBtn) {
        const original = submitBtn.textContent;
        submitBtn.textContent = 'Message envoyé ✓';
        submitBtn.style.background = 'var(--gold)';
        submitBtn.style.color = 'var(--black)';
        setTimeout(() => {
          submitBtn.textContent = original;
          submitBtn.style.background = '';
          submitBtn.style.color = '';
          form.reset();
        }, 3000);
      }
    });
  }

  /* ── 12. SMOOTH ACTIVE NAV ──────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.header nav a');

  if (sections.length && navLinks.length) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.style.color = link.getAttribute('href') === `#${entry.target.id}`
              ? 'var(--gold)'
              : '';
          });
        }
      });
    }, { threshold: 0.45 });

    sections.forEach(s => navObserver.observe(s));
  }

  /* ── 13. INJECT LOADER HTML ─────────────────────────────── */
  if (!document.getElementById('loader')) {
    const loaderEl = document.createElement('div');
    loaderEl.id = 'loader';
    loaderEl.innerHTML = `
      <div class="loader-inner">
        <div class="loader-name">Assa<span>.</span></div>
        <div class="loader-bar"><div class="loader-bar-fill"></div></div>
      </div>`;
    document.body.prepend(loaderEl);
  }

  /* ── 14. INJECT CURSOR HTML ─────────────────────────────── */
  if (!document.querySelector('.cursor')) {
    const cursorEl     = document.createElement('div');
    cursorEl.className = 'cursor';
    const cursorRingEl = document.createElement('div');
    cursorRingEl.className = 'cursor-ring';
    document.body.prepend(cursorEl);
    document.body.prepend(cursorRingEl);
  }

  /* ── 15. INJECT HERO EXTRAS ─────────────────────────────── */
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    // Big background letter
    if (!heroSection.querySelector('.hero-bg-text')) {
      const bgText = document.createElement('div');
      bgText.className = 'hero-bg-text parallax';
      bgText.textContent = 'A';
      heroSection.appendChild(bgText);
    }

    // Scroll indicator
    if (!heroSection.querySelector('.scroll-indicator')) {
      const scrollInd = document.createElement('div');
      scrollInd.className = 'scroll-indicator';
      scrollInd.innerHTML = `<span>Défiler</span><div class="scroll-dot"></div>`;
      heroSection.appendChild(scrollInd);
    }

    // Gold line in hero content
    const heroContent = heroSection.querySelector('.hero-content');
    if (heroContent && !heroContent.querySelector('.hero-line')) {
      const line = document.createElement('span');
      line.className = 'hero-line';
      const h2 = heroContent.querySelector('h2');
      if (h2) heroContent.insertBefore(line, h2);
    }
  }

});