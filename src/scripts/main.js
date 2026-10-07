// Progressive enhancement only: every section is fully readable without this file.
(() => {
  const doc = document.documentElement;
  const header = document.querySelector('[data-header]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Header: background after scrolling ---------- */
  if (header) {
    let ticking = false;
    const update = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
      ticking = false;
    };
    update();
    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true }
    );
  }

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  const label = document.querySelector('[data-menu-label]');

  if (toggle && menu && header) {
    const focusables = () => [toggle, ...menu.querySelectorAll('a[href], button')];

    const setOpen = (open, { restoreFocus = true } = {}) => {
      toggle.setAttribute('aria-expanded', String(open));
      label.textContent = open ? 'Close menu' : 'Open menu';
      menu.hidden = !open;
      header.classList.toggle('is-open', open);
      doc.style.overflow = open ? 'hidden' : '';
      if (open) menu.querySelector('a')?.focus();
      else if (restoreFocus) toggle.focus();
    };

    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));

    menu.addEventListener('click', (e) => {
      if (e.target.closest('a')) setOpen(false, { restoreFocus: false });
    });

    header.addEventListener('keydown', (e) => {
      if (menu.hidden) return;
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });

    window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => {
      if (e.matches && !menu.hidden) setOpen(false, { restoreFocus: false });
    });
  }

  /* ---------- Active section indicator ---------- */
  const navLinks = [...document.querySelectorAll('[data-nav]')];
  const sectionIds = [...new Set(navLinks.map((a) => a.dataset.nav))];
  const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    const setActive = (id) => {
      navLinks.forEach((a) => {
        if (a.dataset.nav === id) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    };
    const visible = new Map();
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => visible.set(entry.target.id, entry.isIntersecting));
        const current = sectionIds.find((id) => visible.get(id));
        if (current) setActive(current);
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- Scroll reveal ---------- */
  const revealables = [...document.querySelectorAll('[data-reveal]')];

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealables.forEach((el) => el.classList.add('is-visible'));
  } else {
    // Stagger siblings that reveal together.
    const groups = new Map();
    revealables.forEach((el) => {
      const siblings = groups.get(el.parentElement) ?? [];
      siblings.push(el);
      groups.set(el.parentElement, siblings);
    });
    groups.forEach((els) => {
      els.forEach((el, i) => el.style.setProperty('--reveal-delay', `${Math.min(i, 6) * 70}ms`));
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    revealables.forEach((el) => io.observe(el));
  }

  /* ---------- Service cards: pointer spotlight ---------- */
  if (!reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.service').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    });
  }

  /* ---------- Project archive: filter + show more ---------- */
  const archive = document.querySelector('[data-archive]');
  if (archive) {
    const COLLAPSED = 6;
    const cards = [...archive.querySelectorAll('[data-platform]')];
    const buttons = [...archive.querySelectorAll('[data-filter]')];
    const moreWrap = archive.querySelector('.archive__more');
    const moreBtn = archive.querySelector('[data-show-more]');
    const status = archive.querySelector('[data-filter-status]');
    let filter = 'all';
    let expanded = false;

    const render = (announce) => {
      const matches = cards.filter((c) => filter === 'all' || c.dataset.platform === filter);
      const limit = filter === 'all' && !expanded ? COLLAPSED : Infinity;
      cards.forEach((c) => {
        const i = matches.indexOf(c);
        c.hidden = i === -1 || i >= limit;
      });
      moreWrap.hidden = matches.length <= limit && !(filter === 'all' && expanded);
      moreBtn.setAttribute('aria-expanded', String(expanded));
      moreBtn.firstChild.textContent = expanded ? 'Show fewer projects ' : `Show all ${matches.length} projects `;
      if (announce) status.textContent = `Showing ${Math.min(matches.length, limit)} of ${matches.length} projects`;
    };

    buttons.forEach((btn) =>
      btn.addEventListener('click', () => {
        filter = btn.dataset.filter;
        buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        render(true);
      })
    );

    moreBtn.addEventListener('click', () => {
      expanded = !expanded;
      if (expanded) {
        // Move focus to the first newly revealed project for keyboard users.
        render(true);
        const target = cards.filter((c) => !c.hidden)[COLLAPSED]?.querySelector('h4');
        if (target) {
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        }
      } else {
        render(true);
        archive.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      }
    });

    render(false);
  }

/* ---------- Contact form (Web3Forms) ---------- */
  const form = document.querySelector('[data-contact-form]');
  if (form) {
    const submit = form.querySelector('[data-submit]');
    const submitLabel = form.querySelector('[data-submit-label]');
    const status = form.querySelector('[data-status]');
    const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const MESSAGES = {
      success: 'Thank you! Your project inquiry has been sent successfully. I’ll get back to you as soon as possible.',
      error: 'Something went wrong. Please try again or contact me directly by email.',
    };

    const validate = (input) => {
      const value = input.value.trim();
      let msg = '';
      if (input.required && !value) msg = 'This field is required.';
      else if (input.type === 'email' && value && !EMAIL.test(value)) msg = 'Please enter a valid email address.';
      else if (input.name === 'message' && value && value.length < 10) msg = 'Please add a few more details (at least 10 characters).';
      const err = input.closest('[data-field]').querySelector('[data-error]');
      err.textContent = msg;
      err.hidden = !msg;
      input.setAttribute('aria-invalid', String(Boolean(msg)));
      return !msg;
    };

    const setStatus = (kind, text) => {
      status.className = 'form-status' + (kind ? ' is-' + kind : '');
      status.textContent = text;
      if (kind) status.focus({ preventScroll: false });
    };

    const fields = [...form.querySelectorAll('.input')];
    fields.forEach((el) => {
      el.addEventListener('blur', () => el.value && validate(el));
      el.addEventListener('input', () => el.getAttribute('aria-invalid') === 'true' && validate(el));
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (submit.disabled) return;
      const invalid = fields.filter((el) => !validate(el));
      if (invalid.length) {
        setStatus('', '');
        invalid[0].focus();
        return;
      }
      // Honeypot: bots fill the hidden field; pretend success and drop it.
      if (form.elements.botcheck.value) {
        form.reset();
        setStatus('success', MESSAGES.success);
        return;
      }
      if (form.dataset.keySet !== 'true') {
        console.warn('Contact form: Web3Forms access key missing. Set WEB3FORMS_ACCESS_KEY and rebuild.');
        setStatus('error', MESSAGES.error);
        return;
      }

      submit.disabled = true;
      form.setAttribute('aria-busy', 'true');
      form.classList.add('is-sending');
      submitLabel.textContent = 'Sending…';
      setStatus('', '');
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(Object.fromEntries(new FormData(form))),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || data.success === false) throw new Error(data.message || 'HTTP ' + res.status);
        form.reset();
        fields.forEach((el) => el.removeAttribute('aria-invalid'));
        setStatus('success', MESSAGES.success);
      } catch (err) {
        console.error('Contact form submission failed:', err);
        setStatus('error', MESSAGES.error);
      } finally {
        submit.disabled = false;
        form.removeAttribute('aria-busy');
        form.classList.remove('is-sending');
        submitLabel.textContent = 'Send Project Inquiry';
      }
    });
  }
})();
