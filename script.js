/* ======= CORE ======= */
document.addEventListener('DOMContentLoaded', () => {
  /* ======= TYPEWRITER ======= */
  const typewriterElement = document.getElementById('typewriter-roles');
  if (typewriterElement) {
    const roles = [
      'Motion Designer',
      'Video Editor',
      'Graphic Designer',
      'Computer Engineering Student',
      'AI/ML Enthusiast'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function runTypewriter() {
      const currentRole = roles[roleIndex];

      if (!isDeleting) {
        charIndex++;
        typewriterElement.textContent = currentRole.substring(0, charIndex);
        if (charIndex === currentRole.length) {
          isDeleting = true;
          setTimeout(runTypewriter, 1800);
          return;
        }
        setTimeout(runTypewriter, 90);
      } else {
        charIndex--;
        typewriterElement.textContent = currentRole.substring(0, charIndex);
        if (charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(runTypewriter, 400);
          return;
        }
        setTimeout(runTypewriter, 45);
      }
    }

    runTypewriter();
  }

  // Register GSAP plugins if available
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // GSAP: Reveal animations
    gsap.utils.toArray('.card-animated').forEach((el) => {
      gsap.fromTo(el, { y: 30, autoAlpha: 0 }, {
        y: 0, autoAlpha: 1, duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      });
    });

    // Hero entrance
    gsap.from('.hero-left .eyebrow, .hero-title, .hero-cta, .hero-meta', {
      y: 30, autoAlpha: 0, duration: 1.2, stagger: 0.12, ease: 'power3.out'
    });

    // subtle blob motion for depth
    gsap.to('.blob-1', { duration: 18, rotation: 15, y: -20, x: 18, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.blob-2', { duration: 22, rotation: -18, y: 24, x: -28, repeat: -1, yoyo: true, ease: 'sine.inOut' });

    // Counters
    const counters = document.querySelectorAll('.meta-number');
    counters.forEach(el => {
      const target = parseInt(el.getAttribute('data-target') || '0', 10);
      gsap.fromTo(el, { innerText: 0 }, {
        innerText: target, duration: 1.6, ease: 'power1.out',
        scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
        onUpdate: function () { el.textContent = Math.floor(this.targets()[0].innerText); }
      });
    });
  }

  // Simple selectors
  const navLinks = document.querySelectorAll('.nav-link');
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  // Mobile nav toggle
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
      hamburger.classList.toggle('is-active');
    });
  }

  // Smooth scroll + active link highlight
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        if (nav && nav.classList.contains('open')) {
          nav.classList.remove('open');
          hamburger.classList.remove('is-active');
          hamburger.setAttribute('aria-expanded', 'false');
        }
        const navWrap = document.querySelector('.nav-wrap');
        const offset = navWrap ? navWrap.offsetHeight + 8 : 8;
        const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // highlight nav on scroll
  const sections = Array.from(document.querySelectorAll('main > section, section'));
  function highlightNav() {
    const scrollPos = window.scrollY + (window.innerHeight * 0.25);
    let current = sections[0]?.id;
    sections.forEach(sec => {
      if (scrollPos >= sec.offsetTop) current = sec.id;
    });
    navLinks.forEach(a => a.classList.toggle('active', Boolean(current && a.getAttribute('href').includes(current))));
  }
  window.addEventListener('scroll', highlightNav);
  highlightNav();

  /* ======= PORTFOLIO MODAL ======= */
  const modal = document.getElementById('modal');
  const modalMedia = document.querySelector('.modal-media');
  const modalTitle = document.getElementById('modalTitle');
  const modalClose = document.getElementById('modalClose');

  if (modal && modalClose) {
    document.querySelectorAll('.project').forEach(card => {
      card.addEventListener('click', () => {
        const title = card.dataset.title || 'Project';
        const media = card.dataset.media || '';
        if (modalTitle) modalTitle.textContent = title;
        if (modalMedia) modalMedia.style.backgroundImage = media ? `url("${media}")` : '';
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        if (typeof gsap !== 'undefined') {
          gsap.fromTo(modal.querySelector('.modal-inner'), { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, ease: 'power3.out' });
        }
      });
    });

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    function closeModal() {
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  /* ======= CONTACT FORM (demo handling) ======= */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Message received. Thank you for reaching out.');
      form.reset();
    });
  }

  /* ======= Resize/Refresh ScrollTrigger on load & resize ======= */
  window.addEventListener('load', () => {
    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
  });
  window.addEventListener('resize', () => {
    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
  });
});
