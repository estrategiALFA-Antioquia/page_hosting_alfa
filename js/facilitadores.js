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

  /* ---------------------------------------------------------
     TANGERINE: pestañas, captura de sincronización y videos
     --------------------------------------------------------- */
  var tang = document.getElementById('tangerine');
  if (tang) {
    var tabs = tang.querySelectorAll('.fc-tabs button');
    function abrirTab(id) {
      tabs.forEach(function (b) { b.setAttribute('aria-selected', b.dataset.tab === id ? 'true' : 'false'); });
      tang.querySelectorAll('.fc-tab-panel').forEach(function (p) { p.hidden = (p.dataset.tab !== id); });
    }
    tabs.forEach(function (b) { b.addEventListener('click', function () { abrirTab(b.dataset.tab); }); });

    /* Enlaces dentro de la sección que llevan a otra pestaña (ej.: "sincroniza primero") */
    tang.querySelectorAll('[data-ir]').forEach(function (b) {
      b.addEventListener('click', function () {
        abrirTab(b.dataset.ir);
        tang.querySelector('.fc-tabs').scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    /* Sincronización: los números de la captura y la lista se iluminan juntos */
    function paso(n) {
      tang.querySelectorAll('.fc-pin, .fc-pasos li').forEach(function (el) { el.classList.toggle('activo', el.dataset.paso === n); });
    }
    tang.querySelectorAll('.fc-pin, .fc-pasos li').forEach(function (el) {
      el.addEventListener('mouseenter', function () { paso(el.dataset.paso); });
      el.addEventListener('click', function () { paso(el.dataset.paso); });
    });
    paso('2');

    /* Videos de observación: cargan solo al hacer clic */
    tang.querySelectorAll('.fc-player').forEach(function (p) {
      p.addEventListener('click', function () {
        var marco = document.createElement('div');
        marco.className = 'fc-video';
        marco.innerHTML = '<iframe src="https://www.youtube.com/embed/' + p.dataset.video + '?autoplay=1&rel=0" title="Tutorial de observación de aula" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
        p.replaceWith(marco);
      });
    });
  }

  /* ---------------------------------------------------------
     PREGUNTAS FRECUENTES: buscador y filtros por tema
     --------------------------------------------------------- */
  var faq = document.getElementById('faq');
  if (faq) {
    var campo = faq.querySelector('.fc-buscar input');
    var filtros = faq.querySelectorAll('.fc-filtros button');
    var grupos = faq.querySelectorAll('.fc-faq-grupo');
    var items = faq.querySelectorAll('.fc-faq-item');
    var cuenta = faq.querySelector('.fc-faq-cuenta');
    var vacio = faq.querySelector('.fc-faq-vacio');
    var tema = 'todas';

    /* Quita tildes y mayúsculas para que "sincronizacion" encuentre "sincronización" */
    function normal(t) { return t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); }

    items.forEach(function (it) {
      var s = it.querySelector('summary span');
      it.dataset.pregunta = s.textContent;
      it.dataset.texto = normal(it.textContent);
      it.dataset.tema = it.closest('.fc-faq-grupo').dataset.tema;
    });

    /* Números en los filtros */
    filtros.forEach(function (b) {
      var f = b.dataset.filtro;
      b.querySelector('span').textContent = f === 'todas' ? items.length : faq.querySelectorAll('.fc-faq-grupo[data-tema="' + f + '"] .fc-faq-item').length;
    });

    /* Resalta la palabra buscada dentro de la pregunta */
    function resaltar(it, q) {
      var s = it.querySelector('summary span');
      var txt = it.dataset.pregunta;
      s.textContent = txt;
      if (!q) return;
      var n = normal(txt), i = n.indexOf(q);
      if (i < 0) return;
      s.textContent = '';
      s.append(txt.slice(0, i));
      var m = document.createElement('mark');
      m.textContent = txt.slice(i, i + q.length);
      s.append(m, txt.slice(i + q.length));
    }

    function aplicar() {
      var q = normal(campo.value.trim());
      var visibles = 0;
      items.forEach(function (it) {
        var ok = (tema === 'todas' || it.dataset.tema === tema) && (!q || it.dataset.texto.indexOf(q) > -1);
        it.hidden = !ok;
        if (ok) visibles++;
        resaltar(it, q);
      });
      grupos.forEach(function (g) { g.hidden = !g.querySelector('.fc-faq-item:not([hidden])'); });
      vacio.hidden = visibles > 0;
      vacio.querySelector('.fc-faq-termino').textContent = '«' + campo.value.trim() + '»';
      cuenta.textContent = q ? visibles + (visibles === 1 ? ' pregunta encontrada' : ' preguntas encontradas') : '';
    }

    campo.addEventListener('input', aplicar);
    filtros.forEach(function (b) {
      b.addEventListener('click', function () {
        tema = b.dataset.filtro;
        filtros.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        aplicar();
      });
    });

    /* Enlace a otra pregunta (ej.: "protocolo de aleatorización") */
    faq.querySelectorAll('a[data-faq]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var destino = document.querySelector(a.getAttribute('href'));
        if (!destino) return;
        e.preventDefault();
        campo.value = ''; tema = 'todas';
        filtros.forEach(function (x) { x.setAttribute('aria-pressed', x.dataset.filtro === 'todas' ? 'true' : 'false'); });
        aplicar();
        destino.open = true;
        destino.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });

    /* Enlace a una pestaña de la sección Tangerine (ej.: Sincronización) */
    faq.querySelectorAll('a[data-tang]').forEach(function (a) {
      a.addEventListener('click', function () {
        var tab = document.querySelector('#tangerine .fc-tabs button[data-tab="' + a.dataset.tang + '"]');
        if (tab) tab.click();
      });
    });

    aplicar();
  }