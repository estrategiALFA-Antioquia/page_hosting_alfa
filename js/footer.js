/* =========================================================
   footer.js — inserta el footer compartido (footer.html)
   en el <footer id="pie"></footer> de cada página.
   Estrategia ALFA
   ========================================================= */
(function () {
  'use strict';

  var pie = document.getElementById('pie');
  if (!pie) return;

  fetch('footer.html')
    .then(function (r) {
      if (!r.ok) throw new Error('No se encontró footer.html (' + r.status + ')');
      return r.text();
    })
    .then(function (html) {
      pie.innerHTML = html;

      // Resalta en "Navegación" el enlace de la página actual
      var actual = location.pathname.split('/').pop() || 'index.html';
      pie.querySelectorAll('a[href]').forEach(function (a) {
        if (a.getAttribute('href') === actual) a.classList.add('activo');
      });
    })
    .catch(function (err) {
      console.error('[footer.js]', err);
    });
})();
