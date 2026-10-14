(function () {
  var root = document.documentElement;
  var meta = document.querySelector('meta[name="theme-color"]');
  var btn = document.getElementById('theme-toggle');

  function apply(theme) {
    root.dataset.theme = theme;
    if (meta) meta.content = theme === 'dark' ? '#0c1422' : '#f6f7f9';
    if (btn) {
      var toDark = theme !== 'dark';
      btn.setAttribute('aria-pressed', String(theme === 'dark'));
      btn.setAttribute('aria-label', toDark ? 'تغییر به تم تاریک' : 'تغییر به تم روشن');
      btn.title = toDark ? 'تم تاریک' : 'تم روشن';
    }
  }

  apply(root.dataset.theme === 'dark' ? 'dark' : 'light');

  if (btn) {
    btn.addEventListener('click', function () {
      var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  var rp = document.getElementById('reveal-phone');
  if (rp) {
    rp.addEventListener('click', function () {
      var n = atob(rp.dataset.p);
      var fa = ('0' + n.slice(3)).replace(/\d/g, function (d) { return '۰۱۲۳۴۵۶۷۸۹'[d]; });
      var a = document.createElement('a');
      a.href = 'tel:' + n;
      a.innerHTML = rp.innerHTML;
      var v = a.querySelector('.v');
      v.textContent = fa;
      v.dir = 'ltr';
      rp.replaceWith(a);
      a.focus();
    });
  }

  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !items.length) {
    items.forEach(function (el) { el.classList.add('is-in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  items.forEach(function (el) { io.observe(el); });
})();
