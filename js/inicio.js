/* =========================================================
   inicio.js — scripts de la página de inicio (index.html)
   Estrategia ALFA
   Cada bloque revisa que su sección exista antes de correr,
   así un error en una parte no daña las demás.
   ========================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;


  /* ---------------------------------------------------------
     1. Video "¿Qué es ALFA?": carga YouTube solo al hacer clic
     --------------------------------------------------------- */
  function initVideo() {
    var box = document.getElementById('alfaVideo');
    if (!box) return;

    var id = box.dataset.youtube;
    var titulo = box.dataset.title || '';

    // Si no existe la miniatura en alta resolución, YouTube devuelve
    // una imagen gris de 120 px; en ese caso usamos la de calidad media.
    var img = box.querySelector('img');
    function revisarMiniatura() {
      if (img.naturalWidth > 0 && img.naturalWidth <= 120) {
        img.src = 'https://img.youtube.com/vi/' + id + '/hqdefault.jpg';
      }
    }
    if (img) {
      img.addEventListener('error', function () {
        img.src = 'https://img.youtube.com/vi/' + id + '/hqdefault.jpg';
      }, { once: true });
      if (img.complete) revisarMiniatura();
      else img.addEventListener('load', revisarMiniatura, { once: true });
    }

    function reproducir() {
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0';
      iframe.title = titulo;
      iframe.allow = 'autoplay; encrypted-media';
      iframe.allowFullscreen = true;
      box.innerHTML = '';
      box.appendChild(iframe);
      box.classList.add('playing');
    }

    box.addEventListener('click', reproducir, { once: true });
    box.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); reproducir(); }
    });
  }


  /* ---------------------------------------------------------
     2. Contador de cifras (estudiantes, instituciones, municipios)
     --------------------------------------------------------- */
  function initContador() {
    var nums = document.querySelectorAll('#que-es-alfa [data-count]');
    if (!nums.length || reduceMotion || !('IntersectionObserver' in window)) return;

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
  }


  /* ---------------------------------------------------------
     3. Carrusel de noticias
     --------------------------------------------------------- */
  function initNoticias() {
    var wrap = document.getElementById('nsWrap');
    var track = document.getElementById('nsTrack');
    if (!wrap || !track) return;

    var pos = 0;

    function visibles() {
      return wrap.offsetWidth < 480 ? 1 : 2;
    }

    function mover(dir) {
      var n = visibles();
      var anchoTarjeta = wrap.offsetWidth / n;
      var max = track.querySelectorAll('.ns-card').length - n;
      pos = Math.max(0, Math.min(pos + dir, max));
      track.style.transform = 'translateX(-' + (pos * anchoTarjeta) + 'px)';
    }

    document.querySelectorAll('.ns-arr[data-dir]').forEach(function (btn) {
      btn.addEventListener('click', function () { mover(+btn.dataset.dir); });
    });

    // Al cambiar el tamaño de la ventana se recalcula la posición
    window.addEventListener('resize', function () { mover(0); });
  }


  /* ---------------------------------------------------------
     4. Logos de aliados que se van turnando
     --------------------------------------------------------- */
  function rotarLogos(selector, intervalo) {
    var logos = document.querySelectorAll(selector);
    if (logos.length < 2) return;
    var i = 0;
    setInterval(function () {
      logos[i].classList.remove('active');
      i = (i + 1) % logos.length;
      logos[i].classList.add('active');
    }, intervalo);
  }


  /* ---------------------------------------------------------
     Arranque
     --------------------------------------------------------- */
  initVideo();
  initContador();
  initNoticias();
  rotarLogos('#alFadeWrap1 .al-fade-logo', 3500);
  rotarLogos('#alFadeWrap2 .al-fade-logo', 4000);
})();
