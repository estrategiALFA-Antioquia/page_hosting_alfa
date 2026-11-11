/* =========================================================
   alfa.js — scripts de la página Sobre ALFA (alfa.html)
   Estrategia ALFA
   ========================================================= */
(function () {
  'use strict';

  /* Objetivos: paneles que se abren al pasar el mouse o al tocarlos */
  var paneles = document.querySelectorAll('#objetivos .obj-pn');
  if (paneles.length) {
    var conMouse = window.matchMedia && window.matchMedia('(hover:hover)').matches;
    function abrir(p) {
      paneles.forEach(function (o) {
        var activo = (o === p);
        o.classList.toggle('on', activo);
        o.setAttribute('aria-expanded', activo ? 'true' : 'false');
      });
    }
    paneles.forEach(function (p) {
      if (conMouse) p.addEventListener('mouseenter', function () { abrir(p); });
      p.addEventListener('click', function () { abrir(p); });
      p.addEventListener('focus', function () { abrir(p); });
    });
  }
})();
