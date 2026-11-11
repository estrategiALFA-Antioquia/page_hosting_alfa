/* =========================================================
   contador.js — cifras que cuentan desde 0 al aparecer
   Estrategia ALFA

   Uso: en cualquier página, ponga el número real dentro del
   elemento y agregue data-count con el valor sin puntos:
     <span data-count="88812">88.812</span>
   Si el script no carga, se ve el número real escrito.
   ========================================================= */
(function () {
  'use strict';

  var nums = document.querySelectorAll('[data-count]');
  if (!nums.length) return;
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function contar(el) {
    var fin = +el.dataset.count, t0 = null;
    function paso(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / 1600, 1);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(fin * e).toLocaleString('es-CO');
      if (p < 1) requestAnimationFrame(paso);
    }
    requestAnimationFrame(paso);
  }

  var obs = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (en) {
      if (en.isIntersecting) { contar(en.target); obs.unobserve(en.target); }
    });
  }, { threshold: 0.5 });

  nums.forEach(function (el) { el.textContent = '0'; obs.observe(el); });
})();
