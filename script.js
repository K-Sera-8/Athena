/**
 * Phatthanan Siangpro - Personal Portfolio Scripts
 * Vanilla JavaScript (No external libraries or build tools required)
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initActiveNav();
  initProjectDrawers();
  initEmailCopy();
  initBackToTop();
});

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
        button.querySelector('.btn-text').textContent = 'Read Full Analytical Essay';
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
        button.querySelector('.btn-text').textContent = 'Collapse Essay';
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
        mainExpandBtn.querySelector('.btn-text').textContent = 'Read Full Analytical Essay';
        mainExpandBtn.setAttribute('aria-expanded', 'false');
      }

      if (parentCard) {
        parentCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
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
        const originalText = btn.innerHTML;
        btn.classList.add('copied');
        btn.innerHTML = '<span>&#10003; Copied!</span>';

        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = originalText;
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
