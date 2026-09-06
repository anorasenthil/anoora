/* Shared header behaviour: scrolled state + mobile drawer.
   Loaded on every page so the four navs stay in sync. */
(function () {
  var nav = document.getElementById('nav');
  if (!nav) return;

  var onScroll = function () {
    nav.classList.toggle('scrolled', window.scrollY > 80);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var burger = document.getElementById('navBurger');
  var links = document.getElementById('navLinks');
  if (!burger || !links) return;

  function setOpen(open) {
    nav.classList.toggle('nav-open', open);
    document.body.classList.toggle('nav-locked', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  burger.addEventListener('click', function () {
    setOpen(!nav.classList.contains('nav-open'));
  });
  // Same-page anchors don't reload, so close the drawer by hand.
  links.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });
  // A drawer left open across a resize would strand the desktop layout.
  window.addEventListener('resize', function () {
    if (window.innerWidth > 968) setOpen(false);
  });
})();
