/* ════════════════════════════════════════
   DEVIKA J — PORTFOLIO JAVASCRIPT
   ════════════════════════════════════════ */

/* ── CUSTOM CURSOR ── */
const dot  = document.getElementById('cdot');
const ring = document.getElementById('cring');
let mx = -100, my = -100, rx = -100, ry = -100;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

(function tick() {
  dot.style.left = mx + 'px';
  dot.style.top  = my + 'px';
  rx += (mx - rx) * 0.11;
  ry += (my - ry) * 0.11;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(tick);
})();

/* grow cursor on hover over interactive elements */
document.querySelectorAll('a, button, .hsc, .pill, .pc, .feat, .chan, .tli, .cc').forEach(el => {
  el.addEventListener('mouseenter', () => { dot.classList.add('grow');  ring.classList.add('shrink'); });
  el.addEventListener('mouseleave', () => { dot.classList.remove('grow'); ring.classList.remove('shrink'); });
});


/* ── EMAIL (split to avoid Cloudflare encoding) ──
   To change email: edit the two parts in the array below */
const emailParts = ['devikaj2005', 'gmail.com'];
const em    = emailParts.join('@');
const echan = document.getElementById('emailchan');
const evalEl = document.getElementById('emailval');

if (evalEl) evalEl.textContent = em;

if (echan) {
  echan.addEventListener('click', () => {
    navigator.clipboard.writeText(em).then(() => {
      evalEl.textContent   = '✓ Copied!';
      echan.style.color    = 'var(--green)';
      setTimeout(() => {
        evalEl.textContent = em;
        echan.style.color  = '';
      }, 2000);
    });
  });
}


/* ── HAMBURGER MENU ── */
const hbg    = document.getElementById('hbg');
const drawer = document.getElementById('drawer');

function closeDrawer() {
  hbg.classList.remove('open');
  drawer.classList.remove('open');
}

if (hbg && drawer) {
  hbg.addEventListener('click', () => {
    hbg.classList.toggle('open');
    drawer.classList.toggle('open');
  });

  /* close if clicking outside */
  document.addEventListener('click', e => {
    if (!hbg.contains(e.target) && !drawer.contains(e.target)) closeDrawer();
  });
}


/* ── NAV: scroll shadow + active link highlight ── */
const nav     = document.getElementById('nav');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nlinks a');

window.addEventListener('scroll', () => {
  /* shadow on scroll */
  nav.classList.toggle('scrolled', window.scrollY > 10);

  /* highlight active section link */
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 160) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('act', a.getAttribute('href') === '#' + current);
  });
}, { passive: true });


/* ── SCROLL REVEAL ──
   Elements with class .rv slide up, .rvl slide from left */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('on'), i * 60);
    }
  });
}, { threshold: 0.07 });

document.querySelectorAll('.rv, .rvl').forEach(el => revealObserver.observe(el));


/* ── CONTACT FORM ──
   Activate: go to web3forms.com, get a free key,
   paste it into the hidden input in index.html */
const form = document.getElementById('cform');
if (form) {
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = document.getElementById('fsbtn');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      const res  = await fetch(this.action, { method: 'POST', body: new FormData(this) });
      const data = await res.json();

      if (data.success) {
        btn.textContent      = '✓ Message Sent!';
        btn.style.background = 'var(--green)';
        this.reset();
      } else {
        btn.textContent = 'Try Again';
        btn.disabled    = false;
      }
    } catch {
      btn.textContent = 'Try Again';
      btn.disabled    = false;
    }
  });
}
/* ── DISABLE RIGHT CLICK ON PHOTO ── */
document.querySelector('.pbox img').addEventListener('contextmenu', e => e.preventDefault());