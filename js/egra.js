/**
 * egra.js — Resultados EGRA · estrategialfa.org
 * Dependencias: Leaflet 1.9.4, PapaParse 5.4
 * Datos: /data/antioquia_slim.geojson, /data/egra_links_completo.csv
 */

var todasLasSedes  = [];
var municipioActivo = null;
var capaMapa       = null;
var mapaLeaflet    = null;
var coberturaPorMunicipio = {};

// ── Colores ───────────────────────────────────────────────────
function colorCalor(pct, sinDatos) {
  if (sinDatos) return '#d0d0d0'; // gris para municipios no en ALFA
  if (pct === 0)   return '#e8f5ee';
  if (pct < 0.25)  return '#b3d9c5';
  if (pct < 0.50)  return '#5dcaa5';
  if (pct < 0.75)  return '#018d38';
  return '#0b5640';
}

// ── Inicialización ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  iniciarMapa();
  cargarCSV();
  registrarFiltros();
  document.getElementById('btnResetMapa').addEventListener('click', limpiarMunicipio);
  // Toggle ayuda
  var btnAyuda = document.getElementById('btnAyuda');
  if (btnAyuda) {
    btnAyuda.addEventListener('click', function () {
      var panel = document.getElementById('panelAyuda');
      panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
      btnAyuda.textContent = panel.style.display === 'none' ? '¿Cómo usar esta página?' : 'Cerrar ayuda';
    });
  }
});

// ── MAPA ──────────────────────────────────────────────────────
function iniciarMapa() {
  mapaLeaflet = L.map('egra-map', {
    zoomControl: true,
    scrollWheelZoom: false,
    attributionControl: false
  });

  fetch('data/antioquia_slim.geojson')
    .then(function (r) { return r.json(); })
    .then(function (geojson) {
      capaMapa = L.geoJSON(geojson, {
        style: function (feature) { return estiloFeature(feature, false); },
        onEachFeature: alRegistrarFeature
      }).addTo(mapaLeaflet);
      mapaLeaflet.fitBounds(capaMapa.getBounds());
    });
}

function sinDatos(codigo) {
  var cob = coberturaPorMunicipio[codigo];
  return !cob || cob.total === 0;
}

function estiloFeature(feature, esActivo) {
  var codigo = feature.properties.mpio_cdgo;
  var noData = sinDatos(codigo);
  var cob    = coberturaPorMunicipio[codigo];
  var pct    = (cob && cob.total > 0) ? cob.conLink / cob.total : 0;
  var fill   = colorCalor(pct, noData);

  if (municipioActivo && codigo !== municipioActivo) {
    return { fillColor: fill, fillOpacity: noData ? 0.2 : 0.3, color: '#fff', weight: 0.5 };
  }
  if (esActivo) {
    return { fillColor: fill, fillOpacity: 1, color: '#fff', weight: 2.5 };
  }
  return { fillColor: fill, fillOpacity: noData ? 0.4 : 0.8, color: '#fff', weight: 1 };
}

function alRegistrarFeature(feature, layer) {
  layer.on({
    mouseover: function (e) {
      var codigo  = feature.properties.mpio_cdgo;
      var nombre  = toTitleCase(feature.properties.mpio_nombre);
      var noData  = sinDatos(codigo);
      var cob     = coberturaPorMunicipio[codigo];
      var pct     = (cob && cob.total > 0) ? Math.round(cob.conLink / cob.total * 100) : 0;
      var total   = cob ? cob.total : 0;
      var conLink = cob ? cob.conLink : 0;

      // Dirección del tooltip según posición en el mapa
      var bounds    = mapaLeaflet.getBounds();
      var latMid    = (bounds.getNorth() + bounds.getSouth()) / 2;
      var lngMid    = (bounds.getEast() + bounds.getWest()) / 2;
      var center    = layer.getBounds ? layer.getBounds().getCenter() : e.latlng;
      var dir       = center.lat > latMid ? 'bottom' : 'top';
      var offset    = center.lng < lngMid ? [60, 0] : [-60, 0];

      var contenido = noData
        ? '<strong style="font-family:Prompt,sans-serif">' + nombre + '</strong><br>' +
          '<span style="font-size:11px;font-family:Prompt,sans-serif;color:#ccc">No incluido en la Estrategia ALFA</span>'
        : '<strong style="font-family:Prompt,sans-serif">' + nombre + '</strong><br>' +
          '<span style="font-size:11px;font-family:Prompt,sans-serif">' +
          conLink + ' de ' + total + ' sedes · ' + pct + '% con informe</span>';

      layer.bindTooltip(contenido, {
        permanent: false,
        direction: dir,
        offset: offset,
        className: 'egra-tooltip'
      }).openTooltip();

      if (codigo !== municipioActivo) {
        e.target.setStyle({ fillOpacity: 1, weight: 2 });
      }
    },
    mouseout: function (e) {
      layer.closeTooltip();
      if (feature.properties.mpio_cdgo !== municipioActivo) {
        e.target.setStyle(estiloFeature(feature, false));
      }
    },
    click: function () {
      var codigo = feature.properties.mpio_cdgo;
      if (sinDatos(codigo)) return; // municipios sin datos no filtrables
      if (municipioActivo === codigo) {
        limpiarMunicipio();
      } else {
        seleccionarMunicipio(codigo, feature.properties.mpio_nombre);
      }
    }
  });
}

function actualizarEstilosMapa() {
  if (!capaMapa) return;
  capaMapa.eachLayer(function (layer) {
    var esActivo = layer.feature.properties.mpio_cdgo === municipioActivo;
    layer.setStyle(estiloFeature(layer.feature, esActivo));
  });
}

function seleccionarMunicipio(codigo, nombre) {
  municipioActivo = codigo;
  actualizarEstilosMapa();
  filtrarTabla();
  document.getElementById('btnResetMapa').style.display = 'block';
  document.getElementById('btnResetMapa').textContent = '✕ ' + toTitleCase(nombre);
}

function limpiarMunicipio() {
  municipioActivo = null;
  actualizarEstilosMapa();
  document.getElementById('btnResetMapa').style.display = 'none';
  filtrarTabla();
}

// ── CSV ────────────────────────────────────────────────────────
function cargarCSV() {
  Papa.parse('data/egra_links_completo.csv', {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function (resultado) {
      todasLasSedes = resultado.data;
      calcularCobertura();
      actualizarEstilosMapa();
      poblarFiltros();
      filtrarTabla();
      actualizarContadorHero();
    },
    error: function () {
      document.getElementById('tablaBody').innerHTML =
        '<tr><td colspan="5" style="text-align:center;color:#c0392b;padding:24px;">Error al cargar los datos.</td></tr>';
    }
  });
}

function calcularCobertura() {
  coberturaPorMunicipio = {};
  todasLasSedes.forEach(function (s) {
    var cod = s.municipio_id ? s.municipio_id.trim().padStart(5, '0') : '';
    if (!cod) return;
    if (!coberturaPorMunicipio[cod]) coberturaPorMunicipio[cod] = { total: 0, conLink: 0 };
    coberturaPorMunicipio[cod].total++;
    if (s.link_linea_base && s.link_linea_base.trim() !== '') {
      coberturaPorMunicipio[cod].conLink++;
    }
  });
}

function actualizarContadorHero() {
  var conLink = todasLasSedes.filter(function (s) {
    return s.link_linea_base && s.link_linea_base.trim() !== '';
  }).length;
  document.getElementById('statInformes').textContent = conLink.toLocaleString('es-CO');
  document.getElementById('statSedes').textContent    = todasLasSedes.length.toLocaleString('es-CO');
}

// ── FILTROS ────────────────────────────────────────────────────
function poblarFiltros() {
  var subregiones = [...new Set(todasLasSedes.map(function (s) { return s.subregion; }))].sort();
  var operadores  = [...new Set(todasLasSedes.map(function (s) { return s.operador; }))].sort();

  var selSub = document.getElementById('filtroSubregion');
  subregiones.forEach(function (s) {
    var opt = document.createElement('option');
    opt.value = s; opt.textContent = s; selSub.appendChild(opt);
  });

  var selOp = document.getElementById('filtroOperador');
  operadores.forEach(function (o) {
    var opt = document.createElement('option');
    opt.value = o; opt.textContent = o; selOp.appendChild(opt);
  });
}

function registrarFiltros() {
  ['filtroSubregion', 'filtroOperador', 'filtroBusqueda', 'filtroDisponibilidad'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) {
      el.addEventListener('change', filtrarTabla);
      el.addEventListener('input',  filtrarTabla);
    }
  });
}

// ── TABLA ─────────────────────────────────────────────────────
function filtrarTabla() {
  var subregion      = document.getElementById('filtroSubregion').value;
  var operador       = document.getElementById('filtroOperador').value;
  var busqueda       = document.getElementById('filtroBusqueda').value.toLowerCase().trim();
  var disponibilidad = document.getElementById('filtroDisponibilidad').value;

  var resultado = todasLasSedes.filter(function (sede) {
    if (municipioActivo) {
      var codCSV = sede.municipio_id.trim().padStart(5, '0');
      if (codCSV !== municipioActivo) return false;
    }
    if (subregion && sede.subregion !== subregion) return false;
    if (operador  && sede.operador  !== operador)  return false;
    if (busqueda) {
      var hay = sede.sede.toLowerCase().includes(busqueda) ||
                sede.institucion_principal.toLowerCase().includes(busqueda) ||
                sede.municipio.toLowerCase().includes(busqueda);
      if (!hay) return false;
    }
    if (disponibilidad === 'disponible' && !(sede.link_linea_base && sede.link_linea_base.trim() !== '')) return false;
    if (disponibilidad === 'proceso'    &&   sede.link_linea_base && sede.link_linea_base.trim() !== '')   return false;
    return true;
  });

  actualizarContexto(resultado);
  renderizarTabla(resultado);
}

function actualizarContexto(sedes) {
  var ctx = document.getElementById('egraContexto');
  if (!municipioActivo || sedes.length === 0) {
    ctx.classList.remove('visible');
    return;
  }
  var s0      = sedes[0];
  var cob     = coberturaPorMunicipio[municipioActivo] || { total: 0, conLink: 0 };
  var pct     = cob.total > 0 ? Math.round(cob.conLink / cob.total * 100) : 0;
  var ops     = [...new Set(sedes.map(function(s){ return s.operador; }))].join(', ');

  document.getElementById('ctxMunicipio').textContent = toTitleCase(s0.municipio);
  document.getElementById('ctxSubregion').textContent = s0.subregion || '—';
  document.getElementById('ctxOperador').textContent  = ops;
  document.getElementById('ctxSedes').textContent     = cob.total;
  document.getElementById('ctxPct').textContent       = pct + '%';
  ctx.classList.add('visible');
}

function renderizarTabla(sedes) {
  var tbody    = document.getElementById('tablaBody');
  var tabla    = document.getElementById('tablaEGRA');
  var contador = document.getElementById('contadorResultados');

  tabla.classList.toggle('municipio-activo', !!municipioActivo);

  contador.textContent = sedes.length.toLocaleString('es-CO') +
    ' sede' + (sedes.length !== 1 ? 's' : '');

  if (sedes.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="egra-empty">No se encontraron sedes con esos filtros.</td></tr>';
    return;
  }

  var html = '';
  sedes.forEach(function (s) {
    html += '<tr>';
    html += '<td class="egra-td-sede">' + escHtml(toTitleCase(s.sede));
    if (!municipioActivo) {
      html += '<span class="egra-td-municipio-sub">' +
        escHtml(toTitleCase(s.municipio)) + ' · ' + escHtml(s.subregion) + '</span>';
    }
    html += '</td>';
    html += '<td>' + escHtml(toTitleCase(s.institucion_principal)) + '</td>';
    html += '<td class="col-municipio">' + escHtml(toTitleCase(s.municipio)) + '</td>';
    html += '<td>' + escHtml(s.operador) + '</td>';
    html += '<td>' + badgeLink(s.link_linea_base) + '</td>';
    html += '</tr>';
  });
  tbody.innerHTML = html;
}

// ── Helpers ───────────────────────────────────────────────────
function badgeLink(link) {
  if (link && link.trim() !== '') {
    return '<a href="' + link + '" target="_blank" class="egra-badge egra-badge-ok">Ver informe</a>';
  }
  return '<span class="egra-badge egra-badge-pending">En proceso</span>';
}

function toTitleCase(str) {
  if (!str) return '';
  return str.toLowerCase().replace(/\b\w/g, function (c) { return c.toUpperCase(); });
}

function escHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
