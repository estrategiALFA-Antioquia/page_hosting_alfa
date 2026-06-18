/**
 * egra.js
 * ─────────────────────────────────────────────────────────────
 * Lógica de la página de Resultados EGRA — estrategialfa.org
 *
 * Dependencias (cargadas en egra.html):
 *   - Leaflet 1.9.4  → mapa interactivo
 *   - PapaParse 5.4  → lectura del CSV
 *
 * Archivos de datos (en /data/):
 *   - antioquia_slim.geojson  → geometrías de municipios
 *   - egra_links_completo.csv → sedes con links a PDFs
 * ─────────────────────────────────────────────────────────────
 */

// ── Estado global ────────────────────────────────────────────
var todasLasSedes = [];        // array completo del CSV
var municipioActivo = null;    // código DIVIPOLA seleccionado en el mapa
var capaMapa = null;           // referencia a la capa GeoJSON de Leaflet
var mapaLeaflet = null;        // instancia del mapa

// ── Colores institucionales ──────────────────────────────────
var COLOR_NORMAL   = '#018d38';
var COLOR_HOVER    = '#0b5640';
var COLOR_ACTIVO   = '#3AF9A2';
var COLOR_INACTIVO = '#b3d9c5';

// ── Inicialización ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  iniciarMapa();
  cargarCSV();
  registrarFiltros();
});

// ── MAPA ─────────────────────────────────────────────────────

function iniciarMapa() {
  mapaLeaflet = L.map('egra-map', {
    zoomControl: true,
    scrollWheelZoom: false,
    attributionControl: false
  });

  // Sin tiles de fondo — mapa limpio con solo los polígonos
  fetch('data/antioquia_slim.geojson')
    .then(function (r) { return r.json(); })
    .then(function (geojson) {
      capaMapa = L.geoJSON(geojson, {
        style: estiloNormal,
        onEachFeature: alRegistrarFeature
      }).addTo(mapaLeaflet);

      mapaLeaflet.fitBounds(capaMapa.getBounds());
    });
}

function estiloNormal() {
  return {
    fillColor: COLOR_NORMAL,
    fillOpacity: 0.55,
    color: '#ffffff',
    weight: 1
  };
}

function estiloActivo() {
  return {
    fillColor: COLOR_ACTIVO,
    fillOpacity: 0.85,
    color: '#ffffff',
    weight: 2
  };
}

function estiloInactivo() {
  return {
    fillColor: COLOR_INACTIVO,
    fillOpacity: 0.4,
    color: '#ffffff',
    weight: 0.5
  };
}

function alRegistrarFeature(feature, layer) {
  var nombre = feature.properties.mpio_nombre;

  // Tooltip con el nombre del municipio
  layer.bindTooltip(nombre, {
    permanent: false,
    direction: 'top',
    className: 'egra-tooltip'
  });

  layer.on({
    mouseover: function (e) {
      if (feature.properties.mpio_cdgo !== municipioActivo) {
        e.target.setStyle({ fillOpacity: 0.75 });
      }
    },
    mouseout: function (e) {
      if (feature.properties.mpio_cdgo !== municipioActivo) {
        capaMapa.resetStyle(e.target);
        actualizarEstilosMapa();
      }
    },
    click: function () {
      var codigo = feature.properties.mpio_cdgo;
      if (municipioActivo === codigo) {
        // Clic en el mismo → deseleccionar
        limpiarMunicipio();
      } else {
        seleccionarMunicipio(codigo, nombre);
      }
    }
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
  capaMapa.eachLayer(function (l) { capaMapa.resetStyle(l); });
  document.getElementById('btnResetMapa').style.display = 'none';
  filtrarTabla();
}

function actualizarEstilosMapa() {
  if (!capaMapa) return;
  capaMapa.eachLayer(function (layer) {
    var codigo = layer.feature.properties.mpio_cdgo;
    if (!municipioActivo) {
      layer.setStyle(estiloNormal());
    } else if (codigo === municipioActivo) {
      layer.setStyle(estiloActivo());
    } else {
      layer.setStyle(estiloInactivo());
    }
  });
}

// Botón reset
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('btnResetMapa').addEventListener('click', limpiarMunicipio);
});

// ── CSV ───────────────────────────────────────────────────────

function cargarCSV() {
  Papa.parse('data/egra_links_completo.csv', {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function (resultado) {
      todasLasSedes = resultado.data;
      poblarFiltros();
      filtrarTabla();
      actualizarContadorHero();
    },
    error: function () {
      document.getElementById('tablaBody').innerHTML =
        '<tr><td colspan="7" style="text-align:center; color:#c0392b; padding:24px;">Error al cargar los datos. Verificá que el archivo egra_links_completo.csv esté en la carpeta /data/.</td></tr>';
    }
  });
}

function actualizarContadorHero() {
  var conLink = todasLasSedes.filter(function (s) {
    return s.link_linea_base && s.link_linea_base.trim() !== '';
  }).length;
  document.getElementById('statInformes').textContent = conLink.toLocaleString('es-CO');
  document.getElementById('statSedes').textContent = todasLasSedes.length.toLocaleString('es-CO');
}

// ── FILTROS ───────────────────────────────────────────────────

function poblarFiltros() {
  var subregiones = [...new Set(todasLasSedes.map(function (s) { return s.subregion; }))].sort();
  var operadores  = [...new Set(todasLasSedes.map(function (s) { return s.operador; }))].sort();

  var selSub = document.getElementById('filtroSubregion');
  subregiones.forEach(function (s) {
    var opt = document.createElement('option');
    opt.value = s; opt.textContent = s;
    selSub.appendChild(opt);
  });

  var selOp = document.getElementById('filtroOperador');
  operadores.forEach(function (o) {
    var opt = document.createElement('option');
    opt.value = o; opt.textContent = o;
    selOp.appendChild(opt);
  });
}

function registrarFiltros() {
  ['filtroSubregion', 'filtroOperador', 'filtroBusqueda'].forEach(function (id) {
    document.getElementById(id).addEventListener('change', filtrarTabla);
    document.getElementById(id).addEventListener('input',  filtrarTabla);
  });
}

// ── TABLA ─────────────────────────────────────────────────────

function filtrarTabla() {
  var subregion = document.getElementById('filtroSubregion').value;
  var operador  = document.getElementById('filtroOperador').value;
  var busqueda  = document.getElementById('filtroBusqueda').value.toLowerCase().trim();

  var resultado = todasLasSedes.filter(function (sede) {

    // Filtro por municipio (desde el mapa)
    if (municipioActivo) {
      // municipio_id del CSV puede tener 4 dígitos, el GeoJSON tiene 5 con cero
      var codCSV = sede.municipio_id.trim().padStart(5, '0');
      if (codCSV !== municipioActivo) return false;
    }

    if (subregion && sede.subregion !== subregion) return false;
    if (operador  && sede.operador  !== operador)  return false;

    if (busqueda) {
      var hayMatch =
        sede.sede.toLowerCase().includes(busqueda) ||
        sede.institucion_principal.toLowerCase().includes(busqueda) ||
        sede.municipio.toLowerCase().includes(busqueda);
      if (!hayMatch) return false;
    }

    return true;
  });

  renderizarTabla(resultado);
}

function renderizarTabla(sedes) {
  var tbody = document.getElementById('tablaBody');
  var contador = document.getElementById('contadorResultados');

  contador.textContent = sedes.length.toLocaleString('es-CO') + ' sede' + (sedes.length !== 1 ? 's' : '');

  if (sedes.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="egra-empty">No se encontraron sedes con esos filtros.</td></tr>';
    return;
  }

  var html = '';
  sedes.forEach(function (s) {
    html += '<tr>';
    html += '<td class="egra-td-sede">' + escHtml(toTitleCase(s.sede)) + '</td>';
    html += '<td>' + escHtml(toTitleCase(s.institucion_principal)) + '</td>';
    html += '<td>' + escHtml(toTitleCase(s.municipio)) + '</td>';
    html += '<td>' + escHtml(s.subregion) + '</td>';
    html += '<td>' + escHtml(s.operador) + '</td>';
    html += '<td>' + badgeLink(s.link_linea_base) + '</td>';
    html += '<td>' + badgeNoviembre(s.link_noviembre) + '</td>';
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

function badgeNoviembre(link) {
  if (link && link.trim() !== '') {
    return '<a href="' + link + '" target="_blank" class="egra-badge egra-badge-ok">Ver informe</a>';
  }
  return '<span class="egra-badge egra-badge-soon">Próximamente</span>';
}

function toTitleCase(str) {
  if (!str) return '';
  return str.toLowerCase().replace(/\b\w/g, function (c) { return c.toUpperCase(); });
}

function escHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
