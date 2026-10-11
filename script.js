/**
 * Phatthanan Siangpro - Personal Portfolio Scripts
 * Vanilla JavaScript (No external libraries or build tools required)
 */

document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initNavbar();
  initActiveNav();
  initTypewriterQuote();
  initScrollReveal();
  initProjectDrawers();
  initEmailCopy();
  initBackToTop();
});

/**
 * Internationalization (i18n) Language Switcher (EN <-> TH)
 */
function initLanguage() {
  const langToggleButtons = document.querySelectorAll('.lang-switch-btn');

  // Check URL query param -> localStorage -> default ('en')
  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get('lang');
  const storedLang = localStorage.getItem('athena_lang');
  let currentLang = urlLang === 'th' || urlLang === 'en' ? urlLang : (storedLang || 'en');

  setLanguage(currentLang);

  langToggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const activeLang = document.body.classList.contains('lang-th') ? 'th' : 'en';
      const newLang = activeLang === 'en' ? 'th' : 'en';
      setLanguage(newLang);
    });
  });
}

function setLanguage(lang) {
  const isThai = lang === 'th';
  
  if (isThai) {
    document.body.classList.remove('lang-en');
    document.body.classList.add('lang-th');
    document.documentElement.lang = 'th';
  } else {
    document.body.classList.remove('lang-th');
    document.body.classList.add('lang-en');
    document.documentElement.lang = 'en';
  }

  // Update button active state indicators
  document.querySelectorAll('.lang-switch-btn').forEach(btn => {
    const enLabel = btn.querySelector('.lang-opt-en');
    const thLabel = btn.querySelector('.lang-opt-th');
    if (enLabel && thLabel) {
      if (isThai) {
        enLabel.classList.remove('active');
        thLabel.classList.add('active');
      } else {
        enLabel.classList.add('active');
        thLabel.classList.remove('active');
      }
    }
  });

  // Re-trigger typewriter for the active language quote
  initTypewriterQuote();

  // Save preference
  try {
    localStorage.setItem('athena_lang', lang);
  } catch (e) {
    // Local storage might be restricted in some iframe/file contexts
  }

  // Update URL parameter without reload
  if (window.history && window.history.replaceState) {
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.history.replaceState(null, '', url.toString());
  }
}

/**
 * Typewriter Animation for Hero Quote
 */
let typewriterTimeout = null;

function initTypewriterQuote() {
  const quoteTarget = document.getElementById('typewriterText');
  if (!quoteTarget) return;

  const isThai = document.body.classList.contains('lang-th');
  const fullText = isThai 
    ? '“เข้าใจเศรษฐศาสตร์อย่างถ่องแท้ ในวิธีที่เรียบง่าย”' 
    : '“Master Economics, the Simple Way.”';

  // Clear existing timeout if switching languages rapidly
  if (typewriterTimeout) {
    clearTimeout(typewriterTimeout);
  }

  quoteTarget.textContent = '';
  let charIndex = 0;

  function typeChar() {
    if (charIndex < fullText.length) {
      quoteTarget.textContent += fullText.charAt(charIndex);
      charIndex++;
      typewriterTimeout = setTimeout(typeChar, isThai ? 40 : 48);
    }
  }

  typeChar();
}

/**
 * Smooth Scroll Reveal Animations
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  // Check if browser supports IntersectionObserver
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }
}

/**
 * Navigation Bar Scroll Effect & Mobile Menu Toggle
 */
function initNavbar() {
  const nav = document.querySelector('.site-nav');
  const toggleBtn = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Add shadow and darkened background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggleBtn.innerHTML = isOpen ? '[ &times; ]' : '[ &#9776; ]';
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.innerHTML = '[ &#9776; ]';
      });
    });
  }
}

/**
 * Active Navigation Highlight based on scroll position
 */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });

    // Handle bottom of page (Contact section)
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
      navLinks.forEach(link => {
        if (link.getAttribute('href') === '#contact') {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
}

/**
 * Expandable Essay Drawers for Featured Projects
 */
function initProjectDrawers() {
  const expandButtons = document.querySelectorAll('.btn-expand');

  expandButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      const drawer = document.getElementById(targetId);

      if (!drawer) return;

      const isExpanded = drawer.classList.contains('active');

      if (isExpanded) {
        // Collapse drawer
        drawer.classList.remove('active');
        button.classList.remove('expanded');
        updateExpandButtonText(button, false);
        button.setAttribute('aria-expanded', 'false');

        // Smoothly scroll back to the project card top if needed
        const projectCard = button.closest('.project-card');
        if (projectCard) {
          projectCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        // Expand drawer
        drawer.classList.add('active');
        button.classList.add('expanded');
        updateExpandButtonText(button, true);
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Handlers for "Collapse Essay" buttons inside the essay footer
  const collapseButtons = document.querySelectorAll('.btn-collapse-inner');
  collapseButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetId = btn.getAttribute('data-target');
      const drawer = document.getElementById(targetId);
      const parentCard = btn.closest('.project-card');
      const mainExpandBtn = parentCard?.querySelector(`.btn-expand[data-target="${targetId}"]`);

      if (drawer) {
        drawer.classList.remove('active');
      }
      if (mainExpandBtn) {
        mainExpandBtn.classList.remove('expanded');
        updateExpandButtonText(mainExpandBtn, false);
        mainExpandBtn.setAttribute('aria-expanded', 'false');
      }

      if (parentCard) {
        parentCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function updateExpandButtonText(button, isExpanded) {
  const textContainer = button.querySelector('.btn-text');
  if (textContainer) {
    const enText = isExpanded ? 'Collapse Essay' : 'Read Full Analytical Essay';
    const thText = isExpanded ? 'ย่อบทความ' : 'อ่านบทความวิเคราะห์ฉบับเต็ม';
    textContainer.innerHTML = `<span class="i18n-en">${enText}</span><span class="i18n-th">${thText}</span>`;
  }
}

/**
 * Email Address Click-to-Copy with Feedback Tooltip
 */
function initEmailCopy() {
  const copyButtons = document.querySelectorAll('.btn-copy-email');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const email = btn.getAttribute('data-email');
      if (!email) return;

      navigator.clipboard.writeText(email).then(() => {
        const isThai = document.body.classList.contains('lang-th');
        const originalHtml = btn.innerHTML;
        btn.classList.add('copied');
        btn.innerHTML = isThai 
          ? '<span>&#10003; คัดลอกแล้ว!</span>' 
          : '<span>&#10003; Copied!</span>';

        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = originalHtml;
        }, 2200);
      }).catch(err => {
        console.error('Could not copy email to clipboard: ', err);
      });
    });
  });
}

/**
 * Floating Back-to-Top Button
 */
function initBackToTop() {
  const backBtn = document.querySelector('.back-to-top');
  if (!backBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  }, { passive: true });

  backBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
