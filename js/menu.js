/**
 * menu.js — Desplegables del menú principal · estrategialfa.org
 * Agrega a Sobre ALFA, Docentes, EGRA y Facilitadores un panel con sus secciones.
 * El HTML del menú no cambia: si este archivo no carga, el menú sigue funcionando como siempre.
 * En celular (menos de 992 px) los paneles no se muestran; ver css/menu.css.
 */
(function () {
  'use strict';

  /* Secciones de cada página: [ancla, nombre, descripción] */
  var SECCIONES = {
    'alfa.html': [
      ['objetivos', 'Objetivos', 'Qué busca la estrategia en Antioquia'],
      ['programas', 'Programas', 'ATAL, Kalulu y Avanza+'],
      ['participan', 'Aliados y operadores', 'Quiénes acompañan la estrategia'],
      ['cursos', 'Cursos', 'Cursos virtuales del BID y Banco Mundial']
    ],
    'docentes.html': [
      ['rol', 'Tu rol', 'Qué haces en la estrategia'],
      ['acompanamiento', 'Acompañamiento', 'Las fases con tu facilitador'],
      ['materiales', 'Materiales', 'Libros, guías y tutoriales'],
      ['paneles', 'Paneles', 'Encuentros por subregión'],
      ['podcast', 'Podcast', 'Conversaciones sobre lectura'],
      ['claves-alfa', 'Tips ALFA', 'Ideas cortas para el aula']
    ],
    'egra.html': [
      ['que-es', '¿Qué es EGRA?', 'La prueba, cómo se aplica y el perfil lector'],
      ['como-leer', 'Cómo leer tu informe', 'Video y claves para interpretarlo'],
      ['resultados', 'Resultados por sede', 'Busca el informe de tu sede']
    ],
    'facilitadores.html': [
      ['rol', 'Tu rol', 'Qué haces como facilitador'],
      ['capacitacion', 'Capacitación', 'Grabaciones y presentaciones'],
      ['tangerine', 'Tangerine', 'Instalar, sincronizar y errores'],
      ['faq', 'Preguntas frecuentes', 'Tangerine y prueba EGRA'],
      ['soporte', 'Soporte', 'WhatsApp de ayuda']
    ]
  };

  var FLECHA = '<svg class="mn-flecha" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';

  document.querySelectorAll('header .navbar-nav > li > a').forEach(function (a) {
    var pagina = (a.getAttribute('href') || '').split('#')[0];
    var lista = SECCIONES[pagina];
    if (!lista) return;

    var li = a.parentNode;
    li.classList.add('mn-tiene');
    a.insertAdjacentHTML('beforeend', FLECHA);

    var panel = document.createElement('div');
    panel.className = 'mn-dd' + (lista.length > 5 ? ' mn-dos' : '');
    panel.innerHTML = '<ul>' + lista.map(function (s) {
      return '<li><a class="mn-link" href="' + pagina + '#' + s[0] + '"><b>' + s[1] + '</b><small>' + s[2] + '</small></a></li>';
    }).join('') + '</ul>';
    li.appendChild(panel);

    /* Si el panel se sale de la pantalla por un lado, se corre hacia adentro */
    var acomodar = function () {
      panel.style.removeProperty('--mn-x');
      var r = panel.getBoundingClientRect(), m = 12, x = 0;
      if (r.right > innerWidth - m) x = innerWidth - m - r.right;
      if (r.left + x < m) x = m - r.left;
      if (x) panel.style.setProperty('--mn-x', x + 'px');
    };
    li.addEventListener('mouseenter', acomodar);
    li.addEventListener('focusin', acomodar);

    /* Escape cierra el panel y devuelve el foco al nombre de la página */
    li.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { li.classList.add('mn-cerrado'); a.focus(); }
    });
    li.addEventListener('mouseleave', function () { li.classList.remove('mn-cerrado'); });
    li.addEventListener('focusout', function (e) { if (!li.contains(e.relatedTarget)) li.classList.remove('mn-cerrado'); });
  });
})();
