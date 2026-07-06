// Manual smooth scroll via requestAnimationFrame.
//
// We animate the scroll ourselves rather than relying on
// `scrollIntoView({ behavior: 'smooth' })` / CSS `scroll-behavior: smooth`,
// because browsers force those to an instant jump when the OS has
// "reduce motion" enabled. This gives a consistent eased scroll.
//
// `offset` clears the sticky nav (~74px) so the section top isn't hidden.
const NAV_OFFSET = 74;
const DURATION = 600;

const easeInOutQuad = (t) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

export function smoothScrollTo(id, offset = NAV_OFFSET, duration = DURATION) {
  const el = document.getElementById(id);
  if (!el) return;

  const startY = window.scrollY;
  const targetY = el.getBoundingClientRect().top + startY - offset;
  const distance = targetY - startY;
  const start = performance.now();

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    window.scrollTo(0, startY + distance * easeInOutQuad(progress));
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}
