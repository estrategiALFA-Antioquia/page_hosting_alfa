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

  /* ---------------------------------------------------------
     ACOMPAÑAMIENTO: la línea y las barras se animan al llegar
     --------------------------------------------------------- */
  var fases = document.querySelector('.dc-fases');
  if (fases) {
    /* Cada barra toma el porcentaje de data-facilitador */
    fases.querySelectorAll('.dc-fase').forEach(function (f) {
      var fac = parseInt(f.dataset.facilitador, 10) || 50;
      f.style.setProperty('--fac', fac + '%');
      f.style.setProperty('--doc', (100 - fac) + '%');
    });

    var sinAnimar = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (sinAnimar || !('IntersectionObserver' in window)) {
      fases.classList.add('visible');
    } else {
      var obs = new IntersectionObserver(function (entradas) {
        if (entradas[0].isIntersecting) { fases.classList.add('visible'); obs.disconnect(); }
      }, { threshold: 0.3 });
      obs.observe(fases);
    }
  }

  /* ---------------------------------------------------------
     PANELES: cuenta regresiva y video de los paneles realizados
     --------------------------------------------------------- */
  var proximo = document.querySelector('.dc-pan-next[data-fecha]');
  if (proximo) {
    var meta = new Date(proximo.dataset.fecha).getTime();
    var cnt = proximo.querySelector('.dc-pan-cnt');
    function actualizar() {
      var ms = meta - Date.now();
      if (ms <= 0) { cnt.hidden = true; return; }
      cnt.querySelector('[data-u="d"]').textContent = Math.floor(ms / 864e5);
      cnt.querySelector('[data-u="h"]').textContent = Math.floor(ms % 864e5 / 36e5);
      cnt.querySelector('[data-u="m"]').textContent = Math.floor(ms % 36e5 / 6e4);
    }
    actualizar();
    setInterval(actualizar, 30000);
  }

  /* El video de YouTube se carga solo cuando se hace clic */
  document.querySelectorAll('.dc-pan-video[data-video]').forEach(function (b) {
    b.addEventListener('click', function () {
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube.com/embed/' + b.dataset.video + '?autoplay=1&rel=0';
      f.title = b.getAttribute('aria-label');
      f.allow = 'autoplay; encrypted-media';
      f.allowFullscreen = true;
      var marco = document.createElement('div');
      marco.className = 'dc-video';
      marco.appendChild(f);
      b.replaceWith(marco);
    }, { once: true });
  });

  /* ---------------------------------------------------------
     TIPS ALFA: historias tipo Instagram
     Los datos vienen de js/claves-alfa.js (caTips y caSemanas).
     --------------------------------------------------------- */
  var tips = document.getElementById('claves-alfa');
  if (tips && window.caTips && window.caSemanas) {
    var DURACION = 8000;
    var visor = tips.querySelector('.dc-visor');
    var barras = visor.querySelector('.dc-visor-barras');
    var tx = visor.querySelector('.dc-visor-tx');
    var lista = [], actual = 0, reloj = null, inicio = 0, restante = DURACION, origen = null;

    /* Recordar qué piezas ya vio esta persona (solo en su navegador) */
    function vistos() { try { return JSON.parse(localStorage.getItem('alfaTipsVistos') || '[]'); } catch (e) { return []; } }
    function marcarVisto(id) {
      var v = vistos(); if (v.indexOf(id) === -1) { v.push(id); try { localStorage.setItem('alfaTipsVistos', JSON.stringify(v)); } catch (e) {} }
    }

    function circulo(opc) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'dc-hist' + (opc.semana ? ' semana' : '') + (vistos().indexOf(opc.id) > -1 ? ' visto' : '');
      b.innerHTML = '<span class="dc-hist-aro">' + (opc.img ? '<img src="' + opc.img + '" alt="" loading="lazy">' : '<b>' + opc.numero + '</b>') + '</span>' +
        '<span class="dc-hist-txt">' + (opc.nuevo ? '<span class="dc-hist-nuevo">Nuevo</span><br>' : '') + opc.texto + '</span>';
      b.addEventListener('click', function () { abrir(opc.piezas, 0, b, opc.id); });
      return b;
    }

    /* Piezas nuevas: cada pieza es una historia; la primera de la lista lleva "Nuevo" */
    var filaTips = tips.querySelector('[data-hist="tips"]');
    var todasTips = window.caTips.map(function (t, i) {
      return { id: t.src, img: t.src, titulo: t.titulo, desc: t.desc, tag: i === 0 ? 'Nuevo' : 'Tip ALFA', nuevo: i === 0 };
    });
    todasTips.forEach(function (p, i) {
      filaTips.appendChild(circulo({ id: p.id, img: p.img, texto: p.titulo, nuevo: p.nuevo, piezas: todasTips.slice(i) }));
    });

    /* Claves por semana: cada semana es una historia con sus piezas (lunes y viernes) */
    var filaSem = tips.querySelector('[data-hist="semanas"]');
    window.caSemanas.forEach(function (s) {
      var piezas = s.tarjetas.map(function (t) {
        return { id: t.src, img: t.src, titulo: s.titulo, desc: t.desc, tag: 'Semana ' + s.id + ' · ' + t.dia };
      });
      filaSem.appendChild(circulo({ id: 'semana-' + s.id, numero: s.id, texto: 'Semana ' + s.id, semana: true, piezas: piezas }));
    });

    function mostrar(i) {
      actual = i;
      var p = lista[i];
      visor.querySelector('.dc-visor-img img').src = p.img;
      visor.querySelector('.dc-visor-img img').alt = p.titulo;
      var tag = visor.querySelector('.dc-visor-tag');
      tag.textContent = p.tag; tag.classList.toggle('nuevo', !!p.nuevo);
      visor.querySelector('#dcVisorTitulo').textContent = p.titulo;
      visor.querySelector('.dc-visor-desc').textContent = p.desc;
      tx.scrollTop = 0; tx.classList.remove('cambia'); void tx.offsetWidth; tx.classList.add('cambia');
      barras.innerHTML = lista.map(function (_, j) { return '<i class="' + (j < i ? 'lista' : j === i ? 'actual' : '') + '"></i>'; }).join('');
      barras.style.setProperty('--dur', DURACION + 'ms');
      visor.querySelector('[data-paso="-1"]').disabled = (i === 0);
      visor.querySelector('[data-paso="1"]').disabled = (i === lista.length - 1);
      marcarVisto(p.id);
      programar(DURACION);
    }

    /* Avance automático, con pausa mientras el mouse o el dedo están encima */
    function programar(ms) {
      clearTimeout(reloj); restante = ms; inicio = Date.now();
      reloj = setTimeout(function () { if (actual < lista.length - 1) mostrar(actual + 1); }, ms);
    }
    function pausar() { if (visor.classList.contains('pausa')) return; clearTimeout(reloj); restante -= Date.now() - inicio; visor.classList.add('pausa'); }
    function seguir() { if (!visor.classList.contains('pausa')) return; visor.classList.remove('pausa'); programar(Math.max(restante, 800)); }

    function abrir(piezas, i, boton, id) {
      lista = piezas; origen = boton;
      visor.hidden = false; document.body.style.overflow = 'hidden';
      mostrar(i);
      if (boton) { boton.classList.add('visto'); marcarVisto(id); }
      visor.querySelector('.dc-visor-x').focus();
    }
    function cerrar() {
      visor.hidden = true; document.body.style.overflow = ''; clearTimeout(reloj); visor.classList.remove('pausa');
      if (origen) origen.focus();
    }
    function paso(n) { var j = actual + n; if (j >= 0 && j < lista.length) mostrar(j); }

    visor.querySelector('.dc-visor-x').addEventListener('click', cerrar);
    visor.querySelectorAll('[data-paso]').forEach(function (b) { b.addEventListener('click', function () { paso(+b.dataset.paso); }); });
    visor.querySelector('.dc-visor-zona.ant').addEventListener('click', function () { paso(-1); });
    visor.querySelector('.dc-visor-zona.sig').addEventListener('click', function () { paso(1); });
    visor.addEventListener('click', function (e) { if (e.target === visor) cerrar(); });
    var caja = visor.querySelector('.dc-visor-caja');
    caja.addEventListener('mouseenter', pausar); caja.addEventListener('mouseleave', seguir);
    tx.addEventListener('touchstart', pausar, { passive: true }); tx.addEventListener('scroll', pausar, { passive: true });
    document.addEventListener('keydown', function (e) {
      if (visor.hidden) return;
      if (e.key === 'Escape') cerrar();
      if (e.key === 'ArrowRight') paso(1);
      if (e.key === 'ArrowLeft') paso(-1);
    });
  }