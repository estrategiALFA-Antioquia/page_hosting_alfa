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

  /* Programas: selector de ATAL, Kalulu y Avanza+ */
  var tabs = document.querySelectorAll('#programas .prog-pk');
  if (tabs.length) {
    function mostrar(tab) {
      tabs.forEach(function (t) {
        var activo = (t === tab);
        t.setAttribute('aria-selected', activo ? 'true' : 'false');
        t.tabIndex = activo ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !activo;
      });
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () {
        mostrar(t);
        if (window.innerWidth <= 760) {
          document.getElementById(t.getAttribute('aria-controls'))
            .scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
      t.addEventListener('keydown', function (e) {
        var n = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = tabs[(i + 1) % tabs.length];
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = tabs[(i + tabs.length - 1) % tabs.length];
        if (n) { e.preventDefault(); n.focus(); mostrar(n); }
      });
    });
  }

   /* Principios de ATAL: la ventana no se sale de la pantalla y en celular abre con un toque */
  var seccion = document.getElementById('programas');
  if (seccion) {
    function ajustar(li) {
      var tip = li.querySelector('.prog-tip'); if (!tip) return;
      tip.style.setProperty('--shift', '0px');
      var m = 12, w = tip.offsetWidth, r = li.getBoundingClientRect();
      var cx = r.left + r.width / 2, s = 0;
      if (cx - w / 2 < m) s = m - (cx - w / 2);
      if (cx + w / 2 > window.innerWidth - m) s = (window.innerWidth - m) - (cx + w / 2);
      tip.style.setProperty('--shift', s + 'px');
    }
    seccion.addEventListener('mouseover', function (e) { var li = e.target.closest('.prog-princ li'); if (li) ajustar(li); });
    seccion.addEventListener('focusin', function (e) { var li = e.target.closest('.prog-princ li'); if (li) ajustar(li); });
    seccion.addEventListener('click', function (e) {
      var li = e.target.closest('.prog-princ li');
      seccion.querySelectorAll('.prog-princ li.open').forEach(function (o) { if (o !== li) o.classList.remove('open'); });
      if (li) { ajustar(li); li.classList.toggle('open'); }
    });
  }
 
  /* Quiénes hacemos parte: flechas del carrusel de aliados */
  var eco = document.getElementById('ecoTrack');
  if (eco) {
    var prev = document.getElementById('ecoPrev'), next = document.getElementById('ecoNext');
    function paso() { var c = eco.querySelector('.eco-card'); return c ? c.offsetWidth + 20 : 300; }
    function estado() {
      prev.disabled = eco.scrollLeft < 8;
      next.disabled = eco.scrollLeft + eco.clientWidth > eco.scrollWidth - 8;
    }
    prev.addEventListener('click', function () { eco.scrollBy({ left: -paso(), behavior: 'smooth' }); });
    next.addEventListener('click', function () { eco.scrollBy({ left: paso(), behavior: 'smooth' }); });
    eco.addEventListener('scroll', estado, { passive: true });
    window.addEventListener('resize', estado);
    estado();
  }
})();
