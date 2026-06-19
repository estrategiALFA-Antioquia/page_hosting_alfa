var caSemanas = [
  {
    id: 4,
    titulo: "Confundir \u201cb\u201d y \u201cd\u201d no es dislexia",
    tarjetas: [
      {
        dia: "Lunes 22 jun",
        src: "img/claves_alfa/sem_4/lunes.png",
        desc: "La enseñanza de la lectura se enfrenta también a dificultades vinculadas con el reciclaje neuronal. En los niños de nivel inicial o jardín de infantes, la región visual que debe servir para la lectura no está inactiva. Todavía no responde a las letras, aunque reconoce otras formas, como los objetos o los rostros. Así, la evolución nos jugó una mala pasada: esta región no puede evitar interpretar que las formas simétricas en espejo corresponden a un solo y mismo objeto.\n\n Todos los niños, no sólo los disléxicos, confunden transitoriamente las letras en espejo. La “caja de letras del cerebro” debe desaprender esta semejanza entre las letras en espejo.\n\n El aprendizaje del gesto de escritura parece tener en esto un papel fundamental. En efecto, la experiencia demuestra que los ejercicios sencillos de trazado de letras con el dedo mejoran considerablemente el aprendizaje de la lectura. Además, orienta al niño en el espacio, ayudándolo a comprender que la cadena de letras debe leerse de izquierda a derecha.\n\n Fuente: Dehaene, S. (dir.). (2015). Aprender a leer. De las ciencias cognitivas al aula. Siglo Veintiuno Editores."
      },
      {
        dia: "Viernes 27 jun",
        src: "img/claves_alfa/sem_4/viernes.png",
        desc: "La confusión de las letras en espejo, como “b” y “d”, es una propiedad normal del sistema visual de los niños pequeños antes de que aprendan a leer. Su desaprendizaje requiere esfuerzos. La práctica del gesto de escritura acelera el aprendizaje de la lectura."
      }
    ]
  },
  {
    id: 3,
    titulo: "Un buen lector es un  descifrador experto",
    tarjetas: [
      {
        dia: "Lunes 16 jun",
        src: "img/claves_alfa/sem_3/lunes.png",
        desc: "La escritura es una invención notable, porque permite fijar la palabra sobre un soporte permanente. Es como afirma el proverbio latino: “Las palabras vuelan, pero lo escrito queda”. La escritura se parece a un código secreto que encripta los sonidos, las sílabas o las palabras de una lengua. Como ocurre con cualquier código secreto, descifrarlo requiere aprendizaje. Un buen lector es un descifrador experto.\n\n Nuestra escritura se organiza en un alfabeto: denota cada uno de los sonidos elementales de la lengua hablada, esto es, los fonemas –como el sonido p y el sonido a de la sílaba pa –. En una palabra escrita en español, cada letra o grupo de letras que llamamos “grafema” corresponde a un fonema de la lengua hablada. Además, algunos grafemas pueden pronunciarse de maneras distintas según los contextos en que aparezcan: pensemos en las palabras \u201cgato\u201d y \u201cgenio\u201d o en las palabras \u201crey\u201d y \u201cyo\u201d.\n\n Fuente: Dehaene, S. (dir.). (2015). Aprender a leer. De las ciencias cognitivas al aula. Siglo Veintiuno Editores."
      },
      {
        dia: "Viernes 19 jun",
        src: "img/claves_alfa/sem_3/viernes.png",
        desc: "Todos los buenos lectores saben decodificar a la vez los sonidos y los morfemas de las palabras. Aprender a decodificar la escritura exige aprender dos vías de lectura: el pasaje de las letras a los sonidos y el pasaje de las letras a los significados."
      }
    ]
  },
  {
    id: 2,
    titulo: "Leer no se aprende de forma natural ni solo con el tiempo",
    tarjetas: [
      { 
        dia: "Lunes 9 jun", 
        src: "img/claves_alfa/sem_2/lunes.png",
        desc: "Algunas de las prácticas en torno a la lectura están basadas en creencias que la evidencia científica lleva décadas desmintiendo. Dos de las más comunes: leer es una habilidad natural que se desarrolla por estar en contacto con textos, y que el niño aprenderá cuando esté listo o haya madurado. Ninguna de las dos es cierta.\n\nEl lenguaje oral se adquiere de forma natural en interacción; leer no. El cerebro no está \u201cprogramado\u201d para leer: necesita enseñanza explícita para entender cómo las letras representan los sonidos del habla. Ese aprendizaje no debería retrasarse bajo la idea de \u201cesperar madurez\u201d."
      },
      { 
        dia: "Viernes 13 jun", 
        src: "img/claves_alfa/sem_2/viernes.png",
        desc: "Un niño que recibe esa enseñanza temprana, explícita y sistemática avanza. Un niño al que se le retrasa la instrucción bajo la idea de que \u201caún no está listo\u201d acumula rezago; y ese rezago, si no se interviene, se amplía con cada año que pasa."
      }
    ]
  },
  {
    id: 1,
    titulo: "Lo que sabemos sobre cómo se aprende a leer",
    tarjetas: [
      { 
        dia: "Lunes 2 jun", 
        src: "img/claves_alfa/sem_1/lunes.png",
        desc: "Mucho de lo que falla en el aula no es falta de esfuerzo. Es falta de conocimiento sobre cómo se aprende a leer. Leer requiere instrucción explícita y el método que usas es fundamental. La lectura necesita instrucción, práctica y tiempo."
      },
      { 
        dia: "Viernes 6 jun", 
        src: "img/claves_alfa/sem_1/viernes.png",
        desc: "El lenguaje oral se adquiere de manera natural mediante la interacción humana; la lectura, en cambio, necesita enseñanza explícita. La escritura es una invención de apenas cinco mil años, demasiado reciente para que el cerebro humano esté programado para ella.\n\nPara aprender a leer, el cerebro tiene que reorganizar conexiones neuronales que originalmente servían para otra cosa: reconocer formas y objetos. Ese reciclaje no ocurre espontáneamente, requiere enseñanza explícita y sistemática. Y el factor determinante es el conocimiento que el niño va adquiriendo sobre cómo las letras representan los sonidos del habla."
      }
    ]
  }
];

var caCur = 0;

function caRender() {
  var s = caSemanas[caCur];
  document.getElementById('ca-grid').innerHTML = s.tarjetas.map(function(t, i) {
    return '<div class="ca-card">'
      + '<div class="ca-img-wrap" onclick="caOpen(' + caCur + ',' + i + ')">'
      + '<img src="' + t.src + '" alt="' + t.dia + '" loading="lazy" />'
      + '<div class="ca-hint"><span>+</span></div>'
      + '</div>'
      + '<div class="ca-body">'
      + '<div class="ca-tag">Semana ' + s.id + '</div>'
      + '<div class="ca-title">' + s.titulo + '</div>'
      + '</div></div>';
  }).join('');
  document.getElementById('ca-prev').disabled = caCur === 0;
  document.getElementById('ca-next').disabled = caCur === caSemanas.length - 1;
  document.getElementById('ca-prev').style.opacity = caCur === 0 ? '0.35' : '1';
  document.getElementById('ca-next').style.opacity = caCur === caSemanas.length - 1 ? '0.35' : '1';
}

function caPrev() { if (caCur > 0) { caCur--; caRender(); } }
function caNext() { if (caCur < caSemanas.length - 1) { caCur++; caRender(); } }

function caOpen(semIdx, tarjIdx) {
  var t = caSemanas[semIdx].tarjetas[tarjIdx];
  var s = caSemanas[semIdx];
  document.getElementById('ca-lb-sem').textContent = 'Semana ' + s.id + ' · ' + s.titulo;
  document.getElementById('ca-lb-desc').textContent = t.desc;
  document.getElementById('ca-lb').style.display = 'flex';
}

function caCloseLB() {
  document.getElementById('ca-lb').style.display = 'none';
}

caRender();