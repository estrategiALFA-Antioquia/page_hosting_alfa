/* =========================================================
   docentes.js — comportamiento de la página Docentes
   Estrategia ALFA
   ========================================================= */
(function () {
  'use strict';

  /* ---------------------------------------------------------
     MATERIALES: programas y sub-pestañas
     --------------------------------------------------------- */
  var seccion = document.getElementById('materiales');

  function elegirPrograma(prog) {
    if (!seccion) return;
    seccion.querySelectorAll('.dc-prog').forEach(function (b) {
      b.setAttribute('aria-selected', b.dataset.prog === prog ? 'true' : 'false');
    });
    seccion.querySelectorAll('.dc-panel').forEach(function (p) {
      p.hidden = (p.dataset.prog !== prog);
    });
    reiniciarAnimacion(seccion.querySelector('.dc-panel[data-prog="' + prog + '"]'));
  }

  function elegirSub(boton) {
    var panel = boton.closest('.dc-panel');
    panel.querySelectorAll('.dc-subtabs button').forEach(function (b) {
      b.setAttribute('aria-selected', b === boton ? 'true' : 'false');
    });
    panel.querySelectorAll('.dc-subpanel').forEach(function (s) {
      s.hidden = (s.dataset.sub !== boton.dataset.sub);
    });
    reiniciarAnimacion(panel.querySelector('.dc-subpanel[data-sub="' + boton.dataset.sub + '"]'));
  }

  /* Las portadas entran escalonadas cada vez que se cambia de filtro */
  function reiniciarAnimacion(contenedor) {
    if (!contenedor) return;
    var visibles = Array.prototype.filter.call(
      contenedor.querySelectorAll('.dc-libro, .dc-enlace'),
      function (el) { return !el.closest('[hidden]'); }
    );
    visibles.forEach(function (el, i) {
      el.style.animation = 'none';
      void el.offsetWidth;
      el.style.animation = '';
      el.style.animationDelay = (i * 45) + 'ms';
    });
  }

  if (seccion) {
    seccion.querySelectorAll('.dc-prog').forEach(function (b) {
      b.addEventListener('click', function () { elegirPrograma(b.dataset.prog); });
    });
    seccion.querySelectorAll('.dc-subtabs button').forEach(function (b) {
      b.addEventListener('click', function () { elegirSub(b); });
    });
    reiniciarAnimacion(seccion.querySelector('.dc-panel:not([hidden])'));

    /* Tutoriales de Kalulu: cambia el video al elegir uno de la lista */
    seccion.querySelectorAll('.dc-tv').forEach(function (tv) {
      var iframe = tv.querySelector('.dc-tv-iframe');
      tv.querySelectorAll('.dc-tv-item').forEach(function (item) {
        item.addEventListener('click', function () {
          iframe.src = 'https://www.youtube.com/embed/' + item.dataset.video;
          tv.querySelector('.dc-tv-eyebrow').textContent = item.dataset.eyebrow;
          tv.querySelector('.dc-tv-title').textContent = item.dataset.title;
          tv.querySelector('.dc-tv-desc').textContent = item.dataset.desc;
          tv.querySelectorAll('.dc-tv-item').forEach(function (i) { i.classList.toggle('activo', i === item); });
        });
      });
    });
  }

  /* ---------------------------------------------------------
     Enlaces con data-programa (hero y Tu rol):
     abren Materiales con ese programa ya elegido
     --------------------------------------------------------- */
  document.addEventListener('click', function (e) {
    var enlace = e.target.closest('a[data-programa]');
    if (enlace) elegirPrograma(enlace.dataset.programa);
  });
})();