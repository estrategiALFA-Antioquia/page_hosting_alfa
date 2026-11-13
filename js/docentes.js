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

/* ---------------------------------------------------------
     PODCAST
     El primer episodio de la lista se muestra destacado y con "Nuevo".
     --------------------------------------------------------- */
  var pod = document.getElementById('podcast');
  if (pod) {
    var filas = pod.querySelectorAll('.dc-pod-row');
    var info = pod.querySelector('.dc-pod-info');
    var lb = pod.querySelector('.dc-pod-lb');
    var iframe = lb.querySelector('iframe');
    var videoActual = '';

    if (filas.length) {
      var etiqueta = document.createElement('em');
      etiqueta.textContent = 'Nuevo';
      filas[0].querySelector('.dc-pod-n').prepend(etiqueta);
    }

    function mostrarEpisodio(fila, animar) {
      videoActual = fila.dataset.video;
      var esNuevo = (fila === filas[0]);
      pod.querySelector('.dc-pod-cov img').src = fila.dataset.img;
      pod.querySelector('.dc-pod-cov img').alt = 'Portada del episodio ' + fila.dataset.ep;
      pod.querySelector('.dc-pod-pill').textContent = 'Episodio ' + fila.dataset.ep + (esNuevo ? ' · Nuevo' : '');
      pod.querySelector('.dc-pod-t').textContent = fila.dataset.title;
      pod.querySelector('.dc-pod-guest').textContent = fila.dataset.guest;
      pod.querySelector('.dc-pod-d').textContent = fila.dataset.desc;
      filas.forEach(function (f) { f.classList.toggle('activo', f === fila); });
      if (animar) { info.classList.remove('cambia'); void info.offsetWidth; info.classList.add('cambia'); }
    }

    function abrir() {
      iframe.src = 'https://www.youtube.com/embed/' + videoActual + '?autoplay=1';
      lb.hidden = false;
      lb.querySelector('.dc-pod-x').focus();
    }
    function cerrar() {
      lb.hidden = true;
      iframe.src = '';
    }

    filas.forEach(function (f) { f.addEventListener('click', function () { mostrarEpisodio(f, true); }); });
    pod.querySelectorAll('[data-accion="escuchar"]').forEach(function (b) { b.addEventListener('click', abrir); });
    lb.querySelector('.dc-pod-x').addEventListener('click', cerrar);
    lb.addEventListener('click', function (e) { if (e.target === lb) cerrar(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !lb.hidden) cerrar(); });

    /* En computador, la lista mide lo mismo que el episodio destacado */
    var feat = pod.querySelector('.dc-pod-feat'), lista = pod.querySelector('.dc-pod-list');
    function ajustarAlto() { lista.style.maxHeight = (window.innerWidth > 900) ? (feat.offsetHeight - 30) + 'px' : ''; }
    window.addEventListener('resize', ajustarAlto);
    window.addEventListener('load', ajustarAlto);

    if (filas.length) mostrarEpisodio(filas[0], false);
  }