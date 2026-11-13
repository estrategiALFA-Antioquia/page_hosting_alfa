/* =========================================================
   docentes.js — comportamiento de la página Docentes
   Estrategia ALFA
   Las secciones se van migrando aquí una por una.
   ========================================================= */
(function () {
  'use strict';

  /* ---------------------------------------------------------
     TU ROL: "Ver materiales" abre Materiales con el programa elegido
     (por ahora activa la pestaña actual; cuando migremos Materiales
     se conecta con el nuevo selector)
     --------------------------------------------------------- */
  var pestanas = { atal: 'doc-atal', kalulu: 'doc-kalulu', avanza: 'doc-avanza' };

  document.querySelectorAll('.dc-rol-link[data-programa]').forEach(function (enlace) {
    enlace.addEventListener('click', function () {
      var panel = pestanas[enlace.dataset.programa];
      var boton = document.querySelector('.mat-tab-btn[onclick*="' + panel + '"]');
      if (boton) boton.click();
    });
  });
})();
