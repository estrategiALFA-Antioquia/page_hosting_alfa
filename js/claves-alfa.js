// ===== TIPS NUEVOS =====
// Cada tip es una pieza que se envió por el canal con su mensaje.
// Para agregar uno nuevo: copiar un bloque y ponerlo DE PRIMERO en la lista.
// Los que dicen PENDIENTE llevan el texto de la pieza mientras llega el mensaje original.
var caTips = [
  {
    titulo: "Leer y escribir se aprende",
    src: "img/claves_alfa/tips_alfa/leer_escribir_se_aprende.jpg",
    desc: "A diferencia del lenguaje oral, leer y escribir requieren una enseñanza explícita, sistemática y estructurada."
  },
  {
    titulo: "Hay cinco pilares para aprender a leer bien",
    src: "img/claves_alfa/tips_alfa/cinco_pilares.jpg",
    desc: "¡Aprender a leer bien es un proceso que se construye sobre 5 pilares fundamentales!\n\n1. Conciencia fonémica: reconocer los sonidos que componen cada palabra (por ejemplo, saber que sol empieza con /s/).\n\n2. Relación entre letras y sonidos: comprender la correspondencia entre lo que se escucha y lo que se ve escrito (como asociar el sonido /m/ con la letra m).\n\n3. Fluidez: leer con mayor precisión y agilidad para enfocar la energía en el significado de lo que se lee.\n\n4. Vocabulario: ampliar el conocimiento de palabras para entender mejor el texto.\n\n5. Comprensión: el propósito final de la lectura, construir significado, conectar ideas y conversar sobre lo leído."
  },
  {
    titulo: "Las letras representan los sonidos del habla",
    src: "img/claves_alfa/tips_alfa/letras_sonidos.jpg",
    desc: "Enseñar de forma explícita las correspondencias entre letras y sonidos es clave para aprender a leer."
  },
  {
    titulo: "La fluidez facilita la comprensión",
    src: "img/claves_alfa/tips_alfa/fluidez_comprension.jpg",
    desc: "Cuando los estudiantes leen con precisión y soltura, logran liberar su mente de la decodificación para concentrarse en lo más importante: el significado de lo que leen."
  },
  {
    titulo: "Aprender a escribir fortalece la lectura",
    src: "img/claves_alfa/tips_alfa/escribir_fortalece.jpg",
    desc: "Leer y escribir se enseñan de manera conectada y se enriquecen mutuamente."
  },
  {
    titulo: "Confundir \u201cb\u201d y \u201cd\u201d no es dislexia",
    src: "img/claves_alfa/tips_alfa/confundir_b_d.jpg",
    desc: "Que las niñas y niños confundan la \u201cb\u201d y la \u201cd\u201d al iniciar su lectura no es un signo de dislexia, sino un proceso natural del cerebro.\n\nEn esta etapa, la mente tiende a procesar imágenes reflejadas como un mismo objeto (al igual que ocurre con una bicicleta, sin importar hacia dónde apunte).\n\nAl compartir la misma forma con diferente orientación, las letras en espejo suelen parecer idénticas.\n\nLa clave para superar este reto está en la memoria motora: ejercitar la escritura ayuda a afianzar la dirección correcta de cada letra.\n\nDesde la Estrategia Alfabetización Inicial en Antioquia - ALFA, los invitamos a motivar el trazo y la práctica guiada en sus aulas para acompañar este aprendizaje con éxito."
  },
  {
    titulo: "Intenta lo siguiente: traza la \u201cb\u201d en el aire",
    src: "img/claves_alfa/tips_alfa/intenta_trazar_b.jpg",
    desc: "¡Aplica este tip en el aula!\n\nPide a tus estudiantes trazar la \u201cb\u201d en el aire mientras dicen su sonido. El movimiento activa la memoria motora, fijando su dirección correcta y diferenciándola de la \u201cd\u201d.\n\nConfundir letras en espejo es un proceso natural del cerebro, y la escritura a mano es la clave para superarlo."
  }
];

var caSemanas = [
      {
    id: 13,
    titulo: "Principio de transferencia de lo explícito a lo implícito",
    tarjetas: [
      {
        dia: "Lunes 24 ago",
        src: "img/claves_alfa/sem_13/lunes.png",
        desc: "🔍 Leer una palabra empieza siendo un trabajo lento y consciente: el estudiante la descifra letra por letra. Con mucha práctica, descifrar se vuelve automático, y solo entonces le queda atención libre para entender lo que lee. Ese salto se logra leyendo mucho y releyendo lo ya conocido, no explicando más.\n\n ✅ Prueba esto esta semana: deje que cada estudiante repita una lectura corta y a su alcance varias veces (en clase o en casa), en lugar de darle siempre un texto nuevo. Releer lo que ya dominan es justo lo que automatiza."
      },
      {
        dia: "Viernes 28 ago",
        src: "img/claves_alfa/sem_13/viernes.png",
        desc: "Al principio, leer una palabra cuesta esfuerzo. El estudiante mira cada letra, recuerda qué sonido le corresponde y va uniendo los sonidos hasta reconocer la palabra. Es un trabajo lento, consciente y deliberado: está aplicando, una por una, las reglas que le enseñaron. Con la práctica repetida, ese mismo proceso se vuelve rutinario, hasta que reconocer la palabra deja de costar. A eso lo llamamos automatizar la lectura.\n\n Automatizar importa por una razón muy concreta. Mientras el estudiante gasta toda su atención en descifrar cada palabra, le queda muy poca para pensar en lo que el texto dice. Cuando descifrar deja de exigir esfuerzo, esa atención queda libre para lo que de verdad importa: entender. Por eso un estudiante que todavía va letra por letra puede llegar a pronunciar un texto sin entender casi nada: toda su atención se le va en las letras y le queda muy poco para el sentido."
      }
    ]
  },

    {
    id: 12,
    titulo: "Principio de aprendizaje activo",
    tarjetas: [
      {
        dia: "Lunes 17 ago",
        src: "img/claves_alfa/sem_12/lunes.png",
        desc: "🔍 Esta semana el principio es simple: leer y escribir van juntos. Cada vez que tus estudiantes trazan una letra, están reforzando también su capacidad de leerla.\n\n ✅  Prueba esto: cuando introduzcas una letra o dígrafo nuevo esta semana, no te quedes solo en la lectura. Pide a las niñas y niños que la tracen en el aire, en papel o con letras móviles. Luego dicta palabras sencillas que la contengan y observa quién la escribe correctamente: ese niño ya entendió el código.\n\n Un detalle clave: si un estudiante escribe 'baca' en lugar de 'vaca', corrígelo de inmediato. Una ortografía incorrecta memorizada es difícil de desaprender."
      },
      {
        dia: "Viernes 21 ago",
        src: "img/claves_alfa/sem_12/viernes.png",
        desc: "El gesto motor importa. Trazar la letra con la mano agrega un código motor al repertorio mental de letras, lo que facilita recordar cómo suena cada una. Por eso Dehaene recomienda practicar escritura todos los días, en estrecha asociación con la lectura, usando dictados, letras móviles y composición de palabras a partir de imágenes. Siempre con grafía correcta: una ortografía incorrecta memorizada es difícil de desaprender."
      }
    ]
  },
  {
    id: 11,
    titulo: "Principio de progresión racional",
    tarjetas: [
      {
        dia: "Lunes 10 ago",
        src: "img/claves_alfa/sem_11/lunes.png",
        desc: "🔍 En la progresión que ya vienes siguiendo, las letras están ordenadas de las más fáciles a las más difíciles: primero las que suenan siempre igual y aparecen en más palabras, y después las irregulares y los dígrafos (ch, ll, qu). Ese orden tiene una razón.\n\n ✅ Prueba esto: fíjate si el grafema de esta semana es de los fáciles o de los difíciles. Si es de los difíciles (una letra irregular o un dígrafo), no lo pases rápido: dale más días y más ejemplos antes de avanzar al siguiente."
      },
      {
        dia: "Viernes 14 ago",
        src: "img/claves_alfa/sem_11/viernes.jpeg",
        desc: "El orden de enseñanza de los grafemas debe seguir una progresión racional, priorizando los más frecuentes y aquellos cuya correspondencia entre grafema y fonema es más regular. También conviene comenzar con consonantes fáciles de pronunciar de forma aislada y con estructuras silábicas simples (CV y VC), antes de avanzar hacia estructuras más complejas"
      }
    ]
  },
  {
    id: 10,
    titulo: "Conciencia fonémica",
    tarjetas: [
      {
        dia: "Lunes 3 ago",
        src: "img/claves_alfa/sem_10/lunes.png",
        desc: "🔍 El código alfabético no es obvio para quien empieza: las letras representan sonidos y se leen de izquierda a derecha. La investigación muestra que hay que enseñarlo de forma explícita, una regla a la vez.\n\n ✅ Prueba esto esta semana: usa letras móviles para formar sílabas, cambiar el orden de las letras, practicar b/d y leer cada combinación de izquierda a derecha."
      },
      {
        dia: "Viernes 7 ago",
        src: "img/claves_alfa/sem_10/viernes.png",
        desc: "Cuando tus estudiantes leen \u201csol\u201d, ¿decodifican de verdad cada grafema o reconocen la palabra de memoria? Ponlos a leer una palabra corta que no hayan visto escrita: ahí se nota quién domina las reglas y quién todavía adivina. ¿A quiénes viste adivinar, y qué vas a reforzar con ellos la semana que viene?"
      }
    ]
  },
  {
    id: 9,
    titulo: "Conciencia fonémica",
    tarjetas: [
      {
        dia: "Lunes 27 jul",
        src: "img/claves_alfa/sem_9/lunes.png",
        desc: "🔍 La conciencia fonémica es la habilidad de identificar y manipular los sonidos del habla, y es el predictor más poderoso del éxito lector. Se trabaja solo en voz alta, sin cuaderno ni lápiz.\n\n ✅ Prueba esto esta semana: tres minutos al inicio de cada clase, solo oral. Pídeles a tus estudiantes que identifiquen el primer sonido de palabras cortas como \u201csol\u201d, \u201cmar\u201d o \u201cala\u201d, y confirma en voz alta: \u201csí, el primer sonido de 'sol' es /s/.\u201d Un ejercicio bien hecho vale más que varios a la carrera."
      },
      {
        dia: "Viernes 31 jul",
        src: "img/claves_alfa/sem_9/viernes.png",
        desc: "Antes de que un niño pueda leer una sola letra, necesita poder identificar y manipular los sonidos del lenguaje hablado. A esa habilidad la llamamos conciencia fonémica, y es el predictor más poderoso del éxito lector en lenguas como el español. No es una actividad de lectura: es una actividad de escucha. Se trabaja sin libros, sin cuadernos, sin lápiz.\n\n De tus estudiantes, ¿quiénes pueden separar una palabra en sus sonidos sin ayuda y quiénes todavía no? En este momento del año, esa diferencia es uno de los mejores indicadores de quién leerá fluido en diciembre. ¿Qué vas a hacer diferente la semana que viene con los que todavía no pueden?"
      }
    ]
  },
            {
    id: 8,
    titulo: "Tus estudiantes no parten del mismo punto",
    tarjetas: [
      {
        dia: "Lunes 20 jul",
        src: "img/claves_alfa/sem_8/lunes.png",
        desc: "🔍 El aprendizaje de la lectura empieza antes de llegar a la escuela. A ese proceso se le llama alfabetización emergente, y sus bases son tres: el lenguaje oral (la capacidad de comprender y producir lenguaje hablado, incluyendo vocabulario y gramática), la conciencia fonológica (la capacidad de identificar y manipular las unidades del habla: palabras, sílabas y fonemas, independientemente de su significado) y los conceptos de lo impreso (el conocimiento de las convenciones del texto escrito: dirección de la lectura, partes del libro, distinción entre letra, palabra y texto). La brecha entre quienes llegan con estas bases y quienes no es visible desde el primer día.\n\n ✅ Prueba esta semana: con cinco estudiantes, haz tres observaciones rápidas. Pídele a cada uno que te cuente algo que hizo ayer y escucha qué tan fluido es su relato y qué vocabulario usa. Luego pídeles que palmeen las sílabas de su nombre y te digan el primer sonido, no la primera letra. Por último, muéstrales un libro y pregúntales dónde se empieza a leer. Los que no puedan con alguna de las tres: ahí empieza la enseñanza."
      },
      {
        dia: "Viernes 24 jul",
        src: "img/claves_alfa/sem_8/viernes.png",
        desc: "Esa diferencia no la produce la escuela, pero la recibe cada año desde el primer día.\n\n El aprendizaje de la lectura y la escritura inicia antes de llegar a la escuela: en eso consiste la alfabetización emergente. Al llegar, se inicia el aprendizaje formal, en el que se introduce el código escrito que permitirá a los estudiantes acceder a los textos del aula y del mundo que los rodea. Para que ese arranque funcione, los niños necesitan llegar con tres habilidades desarrolladas: lenguaje oral —que incluye vocabulario—, conciencia fonológica y conceptos de impresión. Cuando alguna de estas bases falta, el docente necesita saberlo para partir de donde el niño está, no de donde quisiera que estuviera.\n\n La conciencia fonológica es la habilidad que mejor anticipa si un niño aprenderá a leer con éxito en los primeros años. Empieza mucho antes de la escuela: palmotear sílabas en una canción, notar que \u201cmamá\u201d y \u201cmesa\u201d empiezan igual, identificar el primer sonido de una palabra. Hay niños que llegan a primero habiéndolo hecho cientos de veces, y hay niños que nunca lo han hecho. \n\n El docente no puede recuperar esos cinco años. Pero sí puede tomarse los primeros días para saber en qué punto está cada estudiante y organizar la enseñanza desde ahí, antes de que la brecha se agrande."
      }
    ]
  },
          {
    id: 7,
    titulo: "Lo que le pida a las familias cambia lo que pasa en el aula",
    tarjetas: [
      {
        dia: "Lunes 13 jul",
        src: "img/claves_alfa/sem_7/lunes.png",
        desc: "🔍 La evidencia sobre participación familiar tiene un hallazgo incómodo: pedirle a las familias que revisen tareas y supervisen el cuaderno tiene, en la mayoría de los estudios, efectos nulos o negativos sobre el aprendizaje. Lo que sí produce la diferencia es la lectura compartida, la conversación cotidiana con vocabulario variado y la colaboración directa entre tú y las familias de tus estudiantes. El problema casi nunca es la familia. Casi siempre es el pedido. \n\n ✅ Prueba esto esta semana: en el próximo contacto con familias, cambia el pedido. En lugar de “revisa que haga la tarea”, di: Esta semana, en cualquier momento del día, pregúntale a tu hijo qué aprendió hoy y escucha la respuesta completa. Una instrucción, sin materiales, menos de cinco minutos."
      },
      {
        dia: "Viernes 17 jul",
        src: "img/claves_alfa/sem_7/viernes.png",
        desc: "¿Cómo involucras actualmente a las familias de tus estudiantes en el proceso lector? ¿Les pides que supervisen tareas o que conversen, lean juntos, cuenten historias? La respuesta dice mucho sobre qué estás obteniendo con esa estrategia y qué podrías obtener si cambias el pedido."
      }
    ]
  },
        {
    id: 6,
    titulo: "El método importa y la escuela puede marcar la diferencia",
    tarjetas: [
      {
        dia: "Lunes 6 jul",
        src: "img/claves_alfa/sem_6/lunes.png",
        desc: "🔍 Cuando un niño no aprende a leer, la causa no está en su familia ni en su barrio. Está en la calidad de la enseñanza que recibe. Y esa enseñanza depende del método, que no es un detalle, es la clave.\n\n ✅ Prueba esta semana: revisa cómo presentas una letra nueva. ¿Partes del sonido o del nombre? ¿Sigues una progresión definida? Esa sola pregunta te dice mucho sobre el método que estás usando."
      },
      {
        dia: "Viernes 10 jul",
        src: "img/claves_alfa/sem_6/viernes.png",
        desc: "¿Alguna vez has atribuido las dificultades lectoras de un estudiante a su familia o su entorno? ¿Qué cambiarías en tu práctica si asumieras que la enseñanza en el aula es el factor decisivo?"
      }
    ]
  },


    {
    id: 5,
    titulo: "Leer mal no siempre es dislexia",
    tarjetas: [
      {
        dia: "Lunes 29 jun",
        src: "img/claves_alfa/sem_5/lunes.png",
        desc: "Algunos niños experimentan dificultades considerables para aprender a leer. ¿Todos los niños que leen mal son disléxicos? No. Para empezar, antes de hablar de dislexia, hay que asegurarse de que el niño no sufre un déficit sensorial. Los pequeños casi no se quejan, y muchas veces los casos de disminución auditiva no se detectan, al igual que sucede con los problemas de visión. Los especialistas no hablan de dislexia hasta que se descartan los problemas periféricos –esto es, sensoriales–, o bien un déficit de la inteligencia global o una educación de calidad o cantidad insuficiente. \n\n De todos modos, la dislexia es una enfermedad real. Está presente en todos los contextos socioeconómicos, incluso en los más favorecidos. También aparece en todos los países, a pesar de que su impacto práctico sea más evidente en las lenguas alfabéticas más opacas –como el inglés y, aunque en menor medida, el francés– que en las de grafías transparentes, como la propia del español.\n\n Fuente: Dehaene, S. (dir.). (2015). Aprender a leer. De las ciencias cognitivas al aula. Siglo Veintiuno Editores."
      },
      {
        dia: "Viernes 3 jul",
        src: "img/claves_alfa/sem_5/viernes.png",
        desc: "La dislexia es una anomalía neurobiológica temprana, que a menudo tiene un origen genético. Los niños disléxicos presentan una desorganización y una subactivación de las regiones del lóbulo temporal del hemisferio izquierdo del cerebro que sustentan la lectura. Sin embargo, casi siempre una enseñanza paciente e intensiva de las correspondencias entre grafemas y fonemas permite compensar gran parte del déficit. En todos los casos, es fundamental descartar la posibilidad de una disminución auditiva o de un déficit visual antes de hablar de dislexia. \n\n Fuente: Dehaene, S. (dir.). (2015). Aprender a leer. De las ciencias cognitivas al aula. Siglo Veintiuno Editores."
      }
    ]
  },
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

// ===== LÓGICA =====
// Ambas series se muestran de a 2 tarjetas por página.
function caPaginas(lista, porPag) {
  var p = []; for (var i = 0; i < lista.length; i += porPag) p.push(lista.slice(i, i + porPag)); return p;
}
var caTipsItems = caTips.map(function(t) { return { src: t.src, titulo: t.titulo, tag: '', meta: '', desc: t.desc, head: t.titulo }; });
var caClavesItems = [];
caSemanas.forEach(function(s) {
  s.tarjetas.forEach(function(t) {
    caClavesItems.push({ src: t.src, titulo: s.titulo, tag: 'Semana ' + s.id, meta: t.dia, desc: t.desc,
      head: 'Semana ' + s.id + ' · ' + s.titulo + ' · ' + t.dia });
  });
});
var caGrupos = { tips: caPaginas(caTipsItems, 2), claves: caPaginas(caClavesItems, 2) };
var caGrupoAct = 'tips', caCur = 0;

function caGrupo(g, btn) {
  caGrupoAct = g; caCur = 0;
  document.querySelectorAll('.ca-gtab').forEach(function(b) { b.classList.remove('active'); });
  if (btn) btn.classList.add('active');
  caRender();
}

function caRender() {
  var pags = caGrupos[caGrupoAct], pag = pags[caCur];
  document.getElementById('ca-grid').innerHTML = pag.map(function(t, i) {
    return '<div class="ca-card">'
      + '<div class="ca-img-wrap" onclick="caOpen(' + i + ')">'
      + '<img src="' + t.src + '" alt="' + t.titulo + '" loading="lazy" />'
      + '<div class="ca-hint"><span>+</span></div>'
      + '</div>'
      + '<div class="ca-body">'
      + (t.tag ? '<div class="ca-tag">' + t.tag + '</div>' : '')
      + '<div class="ca-title">' + t.titulo + '</div>'
      + (t.meta ? '<div class="ca-day">' + t.meta + '</div>' : '')
      + '</div></div>';
  }).join('');
  var last = pags.length - 1;
  document.getElementById('ca-arrows').style.display = last > 0 ? 'flex' : 'none';
  document.getElementById('ca-prev').disabled = caCur === 0;
  document.getElementById('ca-next').disabled = caCur === last;
  document.getElementById('ca-prev').style.opacity = caCur === 0 ? '0.35' : '1';
  document.getElementById('ca-next').style.opacity = caCur === last ? '0.35' : '1';
}

function caPrev() { if (caCur > 0) { caCur--; caRender(); } }
function caNext() { if (caCur < caGrupos[caGrupoAct].length - 1) { caCur++; caRender(); } }

function caOpen(i) {
  var t = caGrupos[caGrupoAct][caCur][i];
  document.getElementById('ca-lb-sem').textContent = t.head;
  document.getElementById('ca-lb-desc').textContent = t.desc;
  document.getElementById('ca-lb').style.display = 'flex';
}
function caCloseLB() { document.getElementById('ca-lb').style.display = 'none'; }
document.addEventListener('keydown', function(e) { if (e.key === 'Escape') caCloseLB(); });

caRender();