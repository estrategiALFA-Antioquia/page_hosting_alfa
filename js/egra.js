/**
 * egra.js — Página EGRA · estrategialfa.org
 * Dependencias: Leaflet 1.9.4, PapaParse 5.4
 * Datos: data/antioquia_slim.geojson, data/egra_links_2026.csv
 *        (columnas de links: link_linea_base, link_linea_final)
 *
 * 1. Contenido del perfil lector (etapas, riesgo y actividades)
 * 2. Animaciones y piezas de "¿Qué es EGRA?"
 * 3. Resultados: mapa, filtros y tabla
 */
(function () {
  'use strict';

  /* =========================================================
     1. CONTENIDO DEL PERFIL LECTOR
     Nombres y rangos como aparecen en los informes (primer grado).
     ========================================================= */
  var ACT_ALTO = [
    'Juegos orales con sonidos: decir el primer sonido de una palabra, contarlos, quitar o cambiar uno ("¿qué queda si a <i>mesa</i> le quitamos /m/?").',
    'Enseñar una letra a la vez, con su sonido, forma y nombre, y trazarla en el aire antes de escribirla.',
    'Formar sílabas y palabras con el componedor, con corrección inmediata.',
    'Leerles cuentos cortos en voz alta y hacer preguntas orales: la comprensión oral es la base de la lectora.'
  ];
  var ETAPAS = [
    { n: 'No lector',     ppm: '0 PPM',          h: 14,  bg: '#e3f3ea', fg: '#0b3d25', r: 'alto' },
    { n: 'Emergente',     ppm: '1–10 PPM',       h: 24,  bg: '#c6e8d5', fg: '#0b3d25', r: 'alto' },
    { n: 'Inicial',       ppm: '11–24 PPM',      h: 36,  bg: '#a3dcbd', fg: '#0b3d25', r: 'alto' },
    { n: 'Decodificador', ppm: '25–34 PPM',      h: 52,  bg: '#74cba0', fg: '#0b3d25', r: 'medio', a: [
      'Leer en voz alta listas de sílabas y palabras cortas con patrones conocidos.',
      'Leer palabras inventadas para comprobar que decodifica y no memoriza.',
      'Dictado de palabras y palabras inventadas con las letras aprendidas.'] },
    { n: 'Automatizado',  ppm: '35–49 PPM',      h: 68,  bg: '#3fb17f', fg: '#fff', r: 'medio', meta: true, a: [
      'Lectómetro: lectura cronometrada de textos cortos para que vea su propio progreso.',
      'Releer el mismo texto hasta mejorar la entonación.',
      'Lectura en parejas y preguntas literales: ¿quién es el personaje?, ¿qué pasó primero?'] },
    { n: 'Fluido',        ppm: '50–110 PPM',     h: 84,  bg: '#018d38', fg: '#fff', r: 'bajo', a: [
      'Predecir de qué trata el texto por el título y las ilustraciones, y comprobarlo al leer.',
      'Preguntas como "¿por qué crees que el personaje hizo eso?".',
      'Vocabulario nuevo en contexto y conversaciones guiadas sobre lo leído.'] },
    { n: 'Hiperfluido',   ppm: '111 PPM o más',  h: 100, bg: '#0b5640', fg: '#fff', r: 'bajo', a: [
      'Pausas durante la lectura: "¿qué acabo de leer?".',
      'Explicar con sus propias palabras lo que entendió.',
      'Textos un poco más largos o con más detalles, que pidan leer con atención.'] }
  ];
  var RIESGO = {
    alto:  { t: 'Riesgo alto',  c: '#f28c28', cs: '#fde6d2', tx: '#a4520c', ppm: '0 a 24 PPM',
             q: 'Estos estudiantes necesitan un enfoque intensivo en el principio alfabético, la conciencia fonológica y la decodificación.' },
    medio: { t: 'Riesgo medio', c: '#e8b708', cs: '#fbf1cc', tx: '#7a5d00', ppm: '25 a 49 PPM',
             q: 'Ya decodifican; necesitan práctica diaria para leer con más rapidez, precisión y comprensión literal.' },
    bajo:  { t: 'Riesgo bajo',  c: '#5cc04a', cs: '#e2f4dd', tx: '#2f6b23', ppm: '50 PPM o más',
             q: 'Leen con fluidez; el reto es profundizar la comprensión inferencial y crítica.' }
  };

  /* =========================================================
     2. ¿QUÉ ES EGRA?: animaciones, pestañas, escalera y video
     ========================================================= */

  /* Aparecer al hacer scroll */
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.2 });

  /* Frase de entrada palabra por palabra */
  var frase = document.querySelector('[data-frase]');
  if (frase) {
    var nPal = 0;
    (function partir(nodo) {
      Array.prototype.slice.call(nodo.childNodes).forEach(function (ch) {
        if (ch.nodeType === 3) {
          var f = document.createDocumentFragment();
          ch.textContent.split(/(\s+)/).forEach(function (t) {
            if (!t) return;
            if (/^\s+$/.test(t)) { f.appendChild(document.createTextNode(t)); return; }
            var s = document.createElement('span');
            s.className = 'w'; s.style.setProperty('--w', nPal++); s.textContent = t;
            f.appendChild(s);
          });
          ch.replaceWith(f);
        } else partir(ch);
      });
    })(frase);
  }
  document.querySelectorAll('.eg-rv, [data-frase]').forEach(function (el) { io.observe(el); });

  /* Contadores: si el valor es 0 se muestra "Próximamente" */
  function contar(el, fin) {
    if (!fin) { el.textContent = 'Próximamente'; el.classList.add('pronto'); return; }
    var t0 = null;
    function paso(t) {
      if (!t0) t0 = t;
      var k = Math.min((t - t0) / 1400, 1); k = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(fin * k).toLocaleString('es-CO');
      if (k < 1) requestAnimationFrame(paso);
    }
    requestAnimationFrame(paso);
  }
  document.querySelectorAll('[data-count]').forEach(function (el) { contar(el, +el.dataset.count); });

  /* Botón "Buscar mi sede": baja directo al buscador (en el celular queda debajo del mapa) y lo resalta */
  document.querySelectorAll('[data-buscar]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var c = document.getElementById('filtroBusqueda');
      if (!c) return;
      e.preventDefault();
      var nav = document.querySelector('.eg-nav');
      var y = c.closest('.egra-filters').getBoundingClientRect().top + scrollY - (nav ? nav.offsetHeight : 0) - 16;
      scrollTo({ top: y, behavior: 'smooth' });
      setTimeout(function () {
        c.focus({ preventScroll: true });
        c.classList.remove('resalta'); void c.offsetWidth; c.classList.add('resalta');
      }, 800);
    });
  });

  /* Menú de secciones: marca la sección visible */
  var links = document.querySelectorAll('.eg-nav a');
  var secs = Array.prototype.map.call(links, function (a) { return document.querySelector(a.getAttribute('href')); });
  function marcarNav() {
    var cur = null;
    secs.forEach(function (s) { if (s && s.getBoundingClientRect().top < 140) cur = s.id; });
    links.forEach(function (a) { a.classList.toggle('activo', a.getAttribute('href') === '#' + cur); });
  }
  addEventListener('scroll', marcarNav, { passive: true });
  marcarNav();

  /* Escalera de perfiles y franjas de riesgo */
  var esc = document.getElementById('egEscalera');
  var cols = [], bandas = [];
  if (esc) {
    var barras = document.createElement('div');
    barras.className = 'eg-esc-bars';
    ETAPAS.forEach(function (e, i) {
      var col = document.createElement('div');
      col.className = 'eg-col'; col.dataset.r = e.r;
      col.style.setProperty('--i', i); col.style.setProperty('--rc', RIESGO[e.r].c);
      col.innerHTML = '<span class="eg-col-nm">' + (i + 1) + '. ' + e.n + (e.meta ? '<small>Meta de 1.°</small>' : '') + '</span>' +
                      '<span class="eg-col-bar" data-ppm="' + e.ppm + '"></span>';
      var bar = col.querySelector('.eg-col-bar');
      bar.style.setProperty('--h', e.h + '%'); bar.style.setProperty('--bg', e.bg); bar.style.setProperty('--fg', e.fg);
      barras.appendChild(col); cols.push(col);
    });
    var franjas = document.createElement('div');
    franjas.className = 'eg-bandas';
    ['alto', 'medio', 'bajo'].forEach(function (k, i) {
      var r = RIESGO[k], b = document.createElement('button');
      b.type = 'button'; b.dataset.r = k;
      b.setAttribute('aria-label', r.t + ': ver qué significa y qué actividades ayudan');
      b.style.setProperty('--c', r.c); b.style.setProperty('--cs', r.cs); b.style.setProperty('--t', r.tx); b.style.setProperty('--i', i);
      b.innerHTML = '<b>' + r.t + '</b><small>' + r.ppm + '</small>';
      franjas.appendChild(b); bandas.push(b);
    });
    esc.appendChild(barras); esc.appendChild(franjas);
  }

  /* Ventana emergente: solo se abre desde las franjas de riesgo */
  var pop = document.getElementById('egPop'), popC = document.getElementById('egPopC');
  function lista(acts) { return '<ul class="eg-pop-lista">' + acts.map(function (x) { return '<li><span>' + x + '</span></li>'; }).join('') + '</ul>'; }
  function limpiarFiltro() {
    if (!esc) return;
    esc.classList.remove('filtro');
    cols.concat(bandas).forEach(function (el) { el.classList.remove('vis'); });
  }
  function abrirRiesgo(k) {
    var r = RIESGO[k];
    esc.classList.add('filtro');
    cols.forEach(function (c) { c.classList.toggle('vis', c.dataset.r === k); });
    bandas.forEach(function (b) { b.classList.toggle('vis', b.dataset.r === k); });
    var etapas = ETAPAS.filter(function (e) { return e.r === k; });
    var html = '<p class="eg-pop-tag"><i></i>Nivel de riesgo · ' + r.ppm + '</p><h3>' + r.t + '</h3><p class="eg-pop-q">' + r.q + '</p>';
    if (k === 'alto') {
      /* Las tres etapas de riesgo alto comparten actividades */
      html += '<div class="eg-pop-etapas">' + etapas.map(function (e) { return '<span>' + e.n + '</span>'; }).join('') + '</div>' +
              '<h4 class="eg-pop-sub">Actividades que ayudan</h4>' + lista(ACT_ALTO);
    } else {
      html += '<h4 class="eg-pop-sub">Actividades que ayudan</h4>';
      etapas.forEach(function (e) { html += '<p class="eg-pop-et">' + e.n + ' <small>' + e.ppm + '</small></p>' + lista(e.a); });
    }
    popC.style.setProperty('--rc', r.c); popC.style.setProperty('--rt', r.tx);
    popC.innerHTML = html;
    popC.scrollTop = 0;
    if (!pop.open) pop.showModal();
  }
  if (pop) {
    bandas.forEach(function (b) { b.addEventListener('click', function () { limpiarFiltro(); abrirRiesgo(b.dataset.r); }); });
    pop.querySelector('.eg-pop-x').addEventListener('click', function () { pop.close(); });
    pop.addEventListener('click', function (e) { if (e.target === pop) pop.close(); });
    pop.addEventListener('close', limpiarFiltro);
  }

  /* Pestañas que se deslizan en horizontal */
  var vent = document.querySelector('.eg-vent');
  if (vent) {
    var tabs = document.querySelectorAll('.eg-tabs button'), ind = document.querySelector('.eg-tabs-ind'), progB = document.querySelector('.eg-prog b');
    var pista = vent.querySelector('.eg-pista'), pnls = vent.querySelectorAll('.eg-pnl');
    var navB = document.querySelectorAll('.eg-navx button');
    var nombres = Array.prototype.map.call(tabs, function (b) { return b.textContent.replace(/^\s*\d\s*/, '').trim(); });
    var act = 0;

    var alto = function () { vent.style.height = pnls[act].offsetHeight + 'px'; };
    var ir = function (n, bajar) {
      act = Math.max(0, Math.min(pnls.length - 1, n));
      pista.style.transform = 'translateX(' + (-100 * act) + '%)';
      ind.style.transform = 'translateX(' + (100 * act) + '%)';
      progB.style.transform = 'translateX(' + (100 * act) + '%)';
      tabs.forEach(function (b, i) { b.setAttribute('aria-selected', i === act ? 'true' : 'false'); b.tabIndex = i === act ? 0 : -1; });
      pnls.forEach(function (p, i) { p.classList.toggle('act', i === act); p.inert = i !== act; });
      navB[0].disabled = act === 0; navB[1].disabled = act === pnls.length - 1;
      navB[0].querySelector('span').textContent = nombres[act - 1] || '';
      navB[1].querySelector('span').textContent = nombres[act + 1] || '';
      /* Las barras vuelven a crecer cada vez que se abre la pestaña del perfil */
      if (esc) {
        esc.classList.remove('in');
        if (pnls[act].contains(esc)) setTimeout(function () { esc.classList.add('in'); }, 450);
      }
      alto();
      if (bajar) document.querySelector('.eg-tabs').scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    tabs.forEach(function (b) { b.addEventListener('click', function () { ir(+b.dataset.t); }); });
    /* Flechas del teclado entre pestañas */
    document.querySelector('.eg-tabs').addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      ir(act + (e.key === 'ArrowRight' ? 1 : -1)); tabs[act].focus();
    });
    navB.forEach(function (b) { b.addEventListener('click', function () { ir(act + (+b.dataset.mov), true); }); });
    addEventListener('resize', alto);
    if ('ResizeObserver' in window) pnls.forEach(function (p) { new ResizeObserver(function () { if (p.classList.contains('act')) alto(); }).observe(p); });

    /* Deslizar con el dedo en el celular */
    var x0 = null, y0 = 0, dx = 0, horizontal = false;
    vent.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; dx = 0; horizontal = false; }, { passive: true });
    vent.addEventListener('touchmove', function (e) {
      if (x0 === null) return;
      dx = e.touches[0].clientX - x0;
      if (!horizontal && Math.abs(dx) < Math.abs(e.touches[0].clientY - y0)) return;
      horizontal = true;
      pista.classList.add('arrastra');
      pista.style.transform = 'translateX(calc(' + (-100 * act) + '% + ' + dx + 'px))';
    }, { passive: true });
    vent.addEventListener('touchend', function () {
      pista.classList.remove('arrastra');
      if (horizontal && dx < -60) ir(act + 1); else if (horizontal && dx > 60) ir(act - 1); else ir(act);
      x0 = null;
    });
    ir(0);
  }

  /* Video del celular: se carga al llegar a él. Si no existe el archivo, queda el enlace a Instagram. */
  var video = document.querySelector('.eg-cel-video'), son = document.querySelector('.eg-cel-son');
  if (video) {
    var ctrl = document.querySelector('.eg-cel-ctrl'), pp = ctrl.querySelector('.eg-cel-pp'), barra = ctrl.querySelector('.eg-cel-barra');
    var cargado = false, pausaManual = false;

    var estado = function () {
      ctrl.classList.toggle('pausado', video.paused);
      pp.setAttribute('aria-label', video.paused ? 'Reproducir' : 'Pausar');
    };
    var alternar = function () {
      if (video.paused) { pausaManual = false; video.play().catch(function () {}); }
      else { pausaManual = true; video.pause(); }
    };

    /* Se reproduce al verlo y se pausa al salir, salvo que la persona lo haya pausado */
    var ioVid = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting && !cargado) { cargado = true; video.src = video.dataset.src; video.load(); }
        if (video.hidden) return;
        if (e.isIntersecting) { if (!pausaManual) video.play().catch(function () {}); }
        else video.pause();
      });
    }, { threshold: 0.4 });
    ioVid.observe(video.parentNode);

    video.addEventListener('loadeddata', function () {
      video.hidden = false; son.hidden = false; ctrl.hidden = false;
      /* Con el video ya cargado sobra el enlace a Instagram */
      var ig = document.querySelector('.eg-cel-ig'); if (ig) ig.hidden = true;
      video.play().catch(function () {});
    });
    video.addEventListener('play', estado);
    video.addEventListener('pause', estado);
    video.addEventListener('click', alternar);
    pp.addEventListener('click', alternar);

    /* Barra de avance: se mueve con el video y sirve para devolver o adelantar */
    video.addEventListener('timeupdate', function () {
      if (!video.duration) return;
      var k = video.currentTime / video.duration;
      barra.value = Math.round(k * 1000);
      barra.style.setProperty('--p', (k * 100) + '%');
    });
    barra.addEventListener('input', function () {
      if (!video.duration) return;
      video.currentTime = barra.value / 1000 * video.duration;
      barra.style.setProperty('--p', (barra.value / 10) + '%');
    });

    son.addEventListener('click', function () {
      video.muted = !video.muted;
      son.setAttribute('aria-pressed', video.muted ? 'false' : 'true');
      son.setAttribute('aria-label', video.muted ? 'Activar sonido' : 'Silenciar');
      if (!video.muted && video.paused) { pausaManual = false; video.play().catch(function () {}); }
    });
  }

  /* Video de YouTube: carga el reproductor solo al hacer clic */
  document.querySelectorAll('.eg-yt').forEach(function (b) {
    b.addEventListener('click', function () {
      var marco = document.createElement('div');
      marco.className = 'eg-yt-marco';
      marco.innerHTML = '<iframe src="https://www.youtube.com/embed/' + b.dataset.video + '?autoplay=1&rel=0" title="Cómo leer el informe de resultados EGRA" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
      b.replaceWith(marco);
    });
  });

  /* =========================================================
     3. RESULTADOS: mapa, filtros y tabla
     ========================================================= */
  var CSV_DATOS = 'data/egra_links_2026.csv';
  var todasLasSedes = [];               // sedes con al menos un informe (tabla y cifras)
  var sedesMapa = [];                   // todas las sedes del CSV (denominador del mapa)
  var medicionMapa = 'link_linea_final';
  var municipioActivo = null;
  var capaMapa = null, mapaLeaflet = null;
  var coberturaPorMunicipio = {};
  /* La tabla muestra las sedes de a poco para que cargue rápido en celulares y con mala señal */
  var POR_PAGINA = 30, mostradas = POR_PAGINA, ultimoResultado = [];

  var $ = function (id) { return document.getElementById(id); };
  if (!$('egra-map')) return;
  /* Si no cargaron las librerías (red lenta o bloqueada), se avisa en lugar de dejar la tabla en "Cargando…" */
  if (!window.L || !window.Papa) {
    $('tablaBody').innerHTML = '<tr><td colspan="6" class="egra-error">No se pudo cargar la información. Revisa tu conexión y vuelve a abrir la página.</td></tr>';
    $('contadorResultados').textContent = '';
    return;
  }

  function colorCalor(pct, sinDatos) {
    if (sinDatos) return '#a0a0a0';
    if (pct < 0.60) return '#e8f5ee';
    if (pct < 0.75) return '#b3d9c5';
    if (pct < 0.90) return '#5dcaa5';
    if (pct < 1) return '#018d38';
    return '#0b5640';
  }
  function tieneLink(link) { return !!(link && link.trim() !== ''); }
  function tieneInforme(s) { return tieneLink(s.link_linea_base) || tieneLink(s.link_linea_final); }
  function nombreMedicion() { return medicionMapa === 'link_linea_base' ? 'línea base' : 'línea final'; }
  function codigo(s) { return (s.municipio_id || '').trim().padStart(5, '0'); }
  /* Sin tildes ni mayúsculas, para que "caceres" encuentre "CÁCERES" */
  function normal(t) { return (t || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); }
  function toTitleCase(str) {
    if (!str) return '';
    return str.toLowerCase().replace(/(?:^|\s|-)(\S)/g, function (m, c) { return m.replace(c, c.toUpperCase()); });
  }
  function escHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function sinDatos(cod) { var c = coberturaPorMunicipio[cod]; return !c || c.total === 0; }

  /* ── Mapa ── */
  function estiloFeature(feature, esActivo) {
    var cod = feature.properties.mpio_cdgo, noData = sinDatos(cod), cob = coberturaPorMunicipio[cod];
    var pct = (cob && cob.total > 0) ? cob.conLink / cob.total : 0;
    var fill = colorCalor(pct, noData);
    if (municipioActivo && cod !== municipioActivo) return { fillColor: fill, fillOpacity: noData ? 0.2 : 0.3, color: '#fff', weight: 0.5 };
    if (esActivo) return { fillColor: fill, fillOpacity: 1, color: '#fff', weight: 2.5 };
    return { fillColor: fill, fillOpacity: noData ? 0.4 : 0.8, color: '#fff', weight: 1 };
  }

  function alRegistrarFeature(feature, layer) {
    layer.on({
      mouseover: function (e) {
        var cod = feature.properties.mpio_cdgo, nombre = toTitleCase(feature.properties.mpio_nombre), noData = sinDatos(cod);
        var cob = coberturaPorMunicipio[cod];
        var pct = (cob && cob.total > 0) ? Math.round(cob.conLink / cob.total * 100) : 0;
        var bounds = mapaLeaflet.getBounds(), centro = layer.getBounds ? layer.getBounds().getCenter() : e.latlng;
        var dir = centro.lat > (bounds.getNorth() + bounds.getSouth()) / 2 ? 'bottom' : 'top';
        var offset = centro.lng < (bounds.getEast() + bounds.getWest()) / 2 ? [60, 0] : [-60, 0];
        var contenido = '<strong>' + escHtml(nombre) + '</strong>' + (noData
          ? '<small class="gris">No incluido en la Estrategia ALFA</small>'
          : '<small>' + cob.conLink + ' de ' + cob.total + ' sedes · ' + pct + '% con informe de ' + nombreMedicion() + '</small>');
        layer.bindTooltip(contenido, { permanent: false, direction: dir, offset: offset, className: 'egra-tooltip' }).openTooltip();
        if (cod !== municipioActivo) e.target.setStyle({ fillOpacity: 1, weight: 2 });
      },
      mouseout: function (e) {
        layer.closeTooltip();
        if (feature.properties.mpio_cdgo !== municipioActivo) e.target.setStyle(estiloFeature(feature, false));
      },
      click: function () {
        var cod = feature.properties.mpio_cdgo;
        if (sinDatos(cod)) return;
        if (municipioActivo === cod) limpiarMunicipio();
        else seleccionarMunicipio(cod, feature.properties.mpio_nombre);
      }
    });
  }

  function iniciarMapa() {
    mapaLeaflet = L.map('egra-map', { zoomControl: true, scrollWheelZoom: false, attributionControl: false });
    fetch('data/antioquia_slim.geojson')
      .then(function (r) { return r.json(); })
      .then(function (geojson) {
        capaMapa = L.geoJSON(geojson, { style: function (f) { return estiloFeature(f, false); }, onEachFeature: alRegistrarFeature }).addTo(mapaLeaflet);
        mapaLeaflet.fitBounds(capaMapa.getBounds());
        pintarMapa();
      });
    /* El mapa cambia de tamaño en el celular: Leaflet necesita saberlo */
    addEventListener('resize', function () { mapaLeaflet.invalidateSize(); });
  }

  /* Colorea el mapa: municipio elegido, subregión filtrada o todos */
  function pintarMapa() {
    if (!capaMapa) return;
    var subregion = $('filtroSubregion').value;
    var codigos = null;
    if (subregion && !municipioActivo) {
      codigos = new Set(todasLasSedes.filter(function (s) { return s.subregion === subregion; }).map(codigo));
    }
    capaMapa.eachLayer(function (layer) {
      var cod = layer.feature.properties.mpio_cdgo;
      if (municipioActivo || !codigos) { layer.setStyle(estiloFeature(layer.feature, cod === municipioActivo)); return; }
      var noData = sinDatos(cod), cob = coberturaPorMunicipio[cod];
      var fill = colorCalor((cob && cob.total > 0) ? cob.conLink / cob.total : 0, noData);
      layer.setStyle(codigos.has(cod)
        ? { fillColor: fill, fillOpacity: 1, color: '#fff', weight: 2 }
        : { fillColor: fill, fillOpacity: 0.2, color: '#fff', weight: 0.5 });
    });
  }

  function seleccionarMunicipio(cod, nombre) {
    municipioActivo = cod;
    var sede = todasLasSedes.find(function (s) { return codigo(s) === cod; });
    if (sede) $('filtroSubregion').value = sede.subregion;
    var btn = $('btnMunicipioActivo');
    btn.hidden = false;
    btn.textContent = '✕ ' + toTitleCase(nombre);
    filtrarTabla();
  }

  function limpiarMunicipio() {
    municipioActivo = null;
    $('btnMunicipioActivo').hidden = true;
    $('filtroSubregion').value = '';
    filtrarTabla();
  }

  function limpiarFiltros() {
    municipioActivo = null;
    $('filtroSubregion').value = '';
    $('filtroOperador').value = '';
    $('filtroBusqueda').value = '';
    $('btnMunicipioActivo').hidden = true;
    filtrarTabla();
  }

  /* ── Datos ── */
  function calcularCobertura() {
    coberturaPorMunicipio = {};
    sedesMapa.forEach(function (s) {
      var cod = codigo(s);
      if (!cod || cod === '00000') return;
      if (!coberturaPorMunicipio[cod]) coberturaPorMunicipio[cod] = { total: 0, conLink: 0 };
      coberturaPorMunicipio[cod].total++;
      if (tieneLink(s[medicionMapa])) coberturaPorMunicipio[cod].conLink++;
    });
  }

  function cargarCSV() {
    Papa.parse(CSV_DATOS, {
      download: true, header: true, skipEmptyLines: true,
      complete: function (resultado) {
        sedesMapa = resultado.data.map(function (s) {
          s.operador = (s.operador || '').trim() || 'SIN OPERADOR ASIGNADO';
          s._texto = normal(s.sede + ' ' + s.institucion_principal + ' ' + s.municipio);
          return s;
        });
        todasLasSedes = sedesMapa.filter(tieneInforme);
        calcularCobertura();
        poblarFiltros();
        filtrarTabla();
        contar($('statSedes'), sedesMapa.length);
        contar($('statInformesBase'), todasLasSedes.filter(function (s) { return tieneLink(s.link_linea_base); }).length);
        contar($('statInformesFinal'), todasLasSedes.filter(function (s) { return tieneLink(s.link_linea_final); }).length);
      },
      error: function () {
        $('tablaBody').innerHTML = '<tr><td colspan="6" class="egra-error">No se pudieron cargar los datos. Revisa tu conexión y vuelve a abrir la página.</td></tr>';
        $('contadorResultados').textContent = '';
      }
    });
  }

  /* ── Filtros ── */
  function poblarFiltros() {
    var llenar = function (id, valores) {
      var sel = $(id);
      valores.forEach(function (v) { var o = document.createElement('option'); o.value = v; o.textContent = v; sel.appendChild(o); });
    };
    llenar('filtroSubregion', Array.from(new Set(todasLasSedes.map(function (s) { return s.subregion; }))).sort());
    llenar('filtroOperador', Array.from(new Set(todasLasSedes.map(function (s) { return s.operador; }))).sort());
  }

  function registrarFiltros() {
    $('filtroSubregion').addEventListener('change', function () {
      if (municipioActivo) { municipioActivo = null; $('btnMunicipioActivo').hidden = true; }
      filtrarTabla();
    });
    $('filtroOperador').addEventListener('change', filtrarTabla);
    $('filtroBusqueda').addEventListener('input', filtrarTabla);
    $('btnLimpiar').addEventListener('click', limpiarFiltros);
    $('btnMunicipioActivo').addEventListener('click', limpiarMunicipio);
    $('btnVerMas').addEventListener('click', function () { mostradas += POR_PAGINA; renderizarTabla(ultimoResultado); });

    /* Botones línea base / línea final del mapa */
    var botones = document.querySelectorAll('.egra-map-toggle-btn');
    botones.forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (btn.dataset.medicion === medicionMapa) return;
        medicionMapa = btn.dataset.medicion;
        botones.forEach(function (b) { var a = b === btn; b.classList.toggle('activo', a); b.setAttribute('aria-pressed', a ? 'true' : 'false'); });
        calcularCobertura();
        filtrarTabla();
      });
    });

    /* Ayuda */
    var btnAyuda = $('btnAyuda'), panel = $('panelAyuda');
    btnAyuda.addEventListener('click', function () {
      panel.hidden = !panel.hidden;
      btnAyuda.setAttribute('aria-expanded', panel.hidden ? 'false' : 'true');
      btnAyuda.textContent = panel.hidden ? '¿Cómo usar esta página?' : 'Cerrar ayuda';
    });
  }

  /* ── Tabla ── */
  function filtrarTabla() {
    var subregion = $('filtroSubregion').value, operador = $('filtroOperador').value;
    var busqueda = normal($('filtroBusqueda').value.trim());
    var resultado = todasLasSedes.filter(function (s) {
      if (municipioActivo && codigo(s) !== municipioActivo) return false;
      if (subregion && s.subregion !== subregion) return false;
      if (operador && s.operador !== operador) return false;
      if (busqueda && s._texto.indexOf(busqueda) === -1) return false;
      return true;
    });
    actualizarContexto(resultado);
    mostradas = POR_PAGINA;
    renderizarTabla(resultado);
    pintarMapa();
  }

  function actualizarContexto(sedes) {
    var ctx = $('egraContexto');
    if (!municipioActivo || sedes.length === 0) { ctx.classList.remove('visible'); return; }
    var s0 = sedes[0], cob = coberturaPorMunicipio[municipioActivo] || { total: 0, conLink: 0 };
    var pct = cob.total > 0 ? Math.round(cob.conLink / cob.total * 100) : 0;
    $('ctxMunicipio').textContent = toTitleCase(s0.municipio);
    $('ctxSubregion').textContent = s0.subregion || '—';
    $('ctxOperador').textContent = Array.from(new Set(sedes.map(function (s) { return s.operador; }))).join(', ');
    $('ctxSedes').textContent = cob.total;
    $('ctxPct').textContent = pct + '%';
    $('ctxPctLabel').textContent = 'con informe de ' + nombreMedicion();
    ctx.classList.add('visible');
  }

  function badgeLink(link, textoSinLink) {
    if (tieneLink(link)) return '<a href="' + escHtml(link) + '" target="_blank" rel="noopener" class="egra-badge egra-badge-ok">Ver informe</a>';
    return '<span class="egra-badge egra-badge-pending">' + textoSinLink + '</span>';
  }

  function filaHTML(s) {
    return '<tr>' +
      '<td class="egra-td-sede">' + escHtml(toTitleCase(s.sede)) +
        (municipioActivo ? '' : '<span class="egra-td-municipio-sub">' + escHtml(toTitleCase(s.municipio)) + ' · ' + escHtml(s.subregion) + '</span>') +
      '</td>' +
      '<td class="egra-td-inst">' + escHtml(toTitleCase(s.institucion_principal)) + '</td>' +
      '<td class="col-municipio">' + escHtml(toTitleCase(s.municipio)) + '</td>' +
      '<td class="egra-td-op">' + escHtml(s.operador) + '</td>' +
      '<td class="egra-td-inf" data-l="Línea base">' + badgeLink(s.link_linea_base, 'No evaluada') + '</td>' +
      '<td class="egra-td-inf" data-l="Línea final">' + badgeLink(s.link_linea_final, 'En proceso') + '</td>' +
    '</tr>';
  }

  function renderizarTabla(sedes) {
    ultimoResultado = sedes;
    var total = sedes.length, visibles = Math.min(mostradas, total), btn = $('btnVerMas');
    $('tablaEGRA').classList.toggle('municipio-activo', !!municipioActivo);
    $('contadorResultados').textContent = total > visibles
      ? 'Mostrando ' + visibles + ' de ' + total.toLocaleString('es-CO') + ' sedes'
      : total.toLocaleString('es-CO') + ' sede' + (total !== 1 ? 's' : '');
    if (total === 0) {
      $('tablaBody').innerHTML = '<tr><td colspan="6" class="egra-empty">No se encontraron sedes con esos filtros.</td></tr>';
      btn.hidden = true;
      return;
    }
    $('tablaBody').innerHTML = sedes.slice(0, visibles).map(filaHTML).join('');
    var faltan = total - visibles;
    btn.hidden = faltan <= 0;
    btn.textContent = 'Ver ' + Math.min(POR_PAGINA, faltan) + ' sedes más (quedan ' + faltan.toLocaleString('es-CO') + ')';
  }

  iniciarMapa();
  cargarCSV();
  registrarFiltros();
})();
