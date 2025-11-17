const roles = ["Graphic Designer", "Video Editor", "Motion Designer", "Programmer", "Content Creator"];
const typewriterElement = document.getElementById("typewriter-roles");

let roleIndex = 0;
let charIndex = 0;
let typing = true;

function typeWriter() {
  const currentRole = roles[roleIndex];
  
  if (typing) {
    if (charIndex < currentRole.length) {
      typewriterElement.textContent += currentRole.charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, 100);
    } else {
      typing = false;
      setTimeout(typeWriter, 1500); // pause before deleting
    }
  } else {
    if (charIndex > 0) {
      typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(typeWriter, 50);
    } else {
      typing = true;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeWriter, 500);
    }
  }
}

typeWriter();
/* ======= CORE ======= */
document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  // Simple selectors
  const navLinks = document.querySelectorAll('.nav-link');
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  // Mobile nav toggle
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
    hamburger.classList.toggle('is-active');
  });

  // Smooth scroll + active link highlight
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        // close mobile nav if open
        if (nav.classList.contains('open')) { nav.classList.remove('open'); hamburger.classList.remove('is-active'); hamburger.setAttribute('aria-expanded','false'); }
        const offset = document.querySelector('.nav-wrap').offsetHeight + 8;
        const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // highlight nav on scroll
  const sections = Array.from(document.querySelectorAll('main > section'));
  function highlightNav() {
    const scrollPos = window.scrollY + (window.innerHeight * 0.25);
    let current = sections[0].id;
    sections.forEach(sec => {
      if (scrollPos >= sec.offsetTop) current = sec.id;
    });
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href').includes(current)));
  }
  window.addEventListener('scroll', highlightNav);
  highlightNav();

  /* ======= GSAP: Reveal animations ======= */
  gsap.utils.toArray('.card-animated').forEach((el, i) => {
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

  /* Hero entrance */
  gsap.from('.hero-left .eyebrow, .hero-title, .hero-role, .hero-cta, .hero-meta', {
    y: 30, autoAlpha: 0, duration: 1.2, stagger: 0.12, ease: 'power3.out'
  });

  // subtle blob motion for depth
  gsap.to('.blob-1', { duration: 18, rotation: 15, y: -20, x: 18, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.blob-2', { duration: 22, rotation: -18, y: 24, x: -28, repeat: -1, yoyo: true, ease: 'sine.inOut' });

  /* ======= TYPEWRITER ======= */
  const typeEl = document.getElementById('typewriter-text');
  const phrases = ["A Graphic Designer.", "A Video Editor.", "A Motion Designer.", "A Programmer.", "A Content Creator.", "A Storyteller.", "A Researcher."];
  let pIndex = 0, chIndex = 0, deleting = false;
  function typeTick() {
    if (!typeEl) return;
    const current = phrases[pIndex];
    if (!deleting) {
      chIndex++;
      typeEl.textContent = current.slice(0, chIndex);
    } else {
      chIndex--;
      typeEl.textContent = current.slice(0, chIndex);
    }
    let timeout = 80;
    if (!deleting && chIndex === current.length) timeout = 1200, deleting = true;
    if (deleting && chIndex === 0) { deleting = false; pIndex = (pIndex + 1) % phrases.length; timeout = 400; }
    setTimeout(typeTick, timeout);
  }
  typeTick();

  /* ======= COUNTERS ======= */
  const counters = document.querySelectorAll('.meta-number');
  counters.forEach(el => {
    const target = parseInt(el.getAttribute('data-target') || '0', 10);
    gsap.fromTo(el, { innerText: 0 }, {
      innerText: target, duration: 1.6, ease: 'power1.out',
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
      onUpdate: function () { el.textContent = Math.floor(this.targets()[0].innerText); }
    });
  });

  /* ======= PORTFOLIO MODAL ======= */
  const modal = document.getElementById('modal');
  const modalMedia = document.querySelector('.modal-media');
  const modalTitle = document.getElementById('modalTitle');
  const modalClose = document.getElementById('modalClose');

  document.querySelectorAll('.project').forEach(card => {
    card.addEventListener('click', () => {
      const title = card.dataset.title || 'Project';
      const media = card.dataset.media || '';
      modalTitle.textContent = title;
      modalMedia.style.backgroundImage = media ? `url("${media}")` : '';
      modal.setAttribute('aria-hidden','false');
      document.body.style.overflow = 'hidden';
      // simple modal animation
      gsap.fromTo(modal.querySelector('.modal-inner'), { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .5, ease: 'power3.out' });
    });
  });

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  function closeModal() {
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }

  /* ======= CONTACT FORM (local demo) ======= */
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Form submitted — demo only. Hook up your backend or email provider for production.');
    form.reset();
  });

  /* ======= Resize/Refresh ScrollTrigger on load & resize ======= */
  window.addEventListener('load', () => ScrollTrigger.refresh());
  window.addEventListener('resize', () => ScrollTrigger.refresh());
  const typewriterText = document.getElementById('typewriter-text');

const roles = [
  "I'm a Designer",
  "I'm a Video Editor",
  "I'm a Motion Designer",
  "I'm a Programmer"
];

let roleIndex = 0;
let charIndex = 0;
let typingSpeed = 100;
let deletingSpeed = 50;
let delayBetweenRoles = 2000;

function typeRole() {
  if (charIndex < roles[roleIndex].length) {
    typewriterText.textContent += roles[roleIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeRole, typingSpeed);
  } else {
    setTimeout(deleteRole, delayBetweenRoles);
  }
}

function deleteRole() {
  if (charIndex > 0) {
    typewriterText.textContent = roles[roleIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(deleteRole, deletingSpeed);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeRole, typingSpeed);
  }
}

// Start animation
typeRole();

});
