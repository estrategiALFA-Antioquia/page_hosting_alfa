/* =========================================================
   facilitadores.js — comportamiento de la página Facilitadores
   Estrategia ALFA
   Las secciones se van migrando aquí una por una.
   ========================================================= */
(function () {
  'use strict';

})();
/* ---------------------------------------------------------
     CAPACITACIÓN: sesiones, días y un solo reproductor por día
     --------------------------------------------------------- */
  var cap = document.getElementById('capacitacion');
  if (cap) {
    function elegir(botones, atributo, valor, contenedores) {
      botones.forEach(function (b) { b.setAttribute('aria-selected', b.dataset[atributo] === valor ? 'true' : 'false'); });
      contenedores.forEach(function (c) { c.hidden = (c.dataset[atributo] !== valor); });
    }

    /* Sesiones (marzo / julio) */
    var botSes = cap.querySelectorAll('.fc-sesiones button');
    botSes.forEach(function (b) {
      b.addEventListener('click', function () { elegir(botSes, 'ses', b.dataset.ses, cap.querySelectorAll('.fc-sesion')); });
    });

    /* Días dentro de cada sesión */
    cap.querySelectorAll('.fc-sesion').forEach(function (ses) {
      var botDias = ses.querySelectorAll('.fc-dias button');
      botDias.forEach(function (b) {
        b.addEventListener('click', function () { elegir(botDias, 'dia', b.dataset.dia, ses.querySelectorAll('.fc-dia')); });
      });
    });

    /* Reproductor: muestra la miniatura y carga el video solo al hacer clic */
    function cargarVideo(contenedor, id) {
      var marco = document.createElement('div');
      marco.className = 'fc-video';
      marco.innerHTML = '<iframe src="https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0" title="Video de la capacitación" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
      contenedor.replaceWith(marco);
    }
    cap.addEventListener('click', function (e) {
      var player = e.target.closest('.fc-player');
      if (player) { cargarVideo(player, player.dataset.video); return; }

      var parte = e.target.closest('.fc-parte');
      if (!parte) return;
      var dia = parte.closest('.fc-dia');
      dia.querySelectorAll('.fc-parte').forEach(function (p) { p.classList.toggle('activo', p === parte); });
      var id = parte.dataset.video;
      var actual = dia.querySelector('.fc-player, .fc-video');
      if (actual.classList.contains('fc-video')) {
        actual.querySelector('iframe').src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0';
      } else {
        actual.dataset.video = id;
        actual.querySelector('img').src = 'https://img.youtube.com/vi/' + id + '/hqdefault.jpg';
        actual.querySelector('.fc-player-et').textContent = parte.querySelector('.fc-parte-t').textContent;
      }
    });
  }