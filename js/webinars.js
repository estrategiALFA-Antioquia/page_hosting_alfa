/* =========================================================
   Webinars semanales · Estrategia ALFA (index.html)
   Para publicar una grabación: pegue el ID de YouTube en "video"
   (lo que va después de youtu.be/ o de v= en el enlace).
   ========================================================= */
  (function(){
    var WEBINARS = [
      {fecha:"2026-10-01", titulo:"ALFA: qué es y cómo se implementa", con:"Secretaría de Educación de Antioquia, Banco Mundial y expertos invitados", video:"01WPsBFQjVo",
       desc:"Recorrimos el contexto de las acciones que se adelantan en Antioquia, los ejes de la estrategia y algunos pasos prácticos para fortalecer la lectura y la escritura desde la infancia."},
      {fecha:"2026-10-08", titulo:"Leer no es natural: lo que la ciencia nos enseña", con:"Especialista en ciencia de la lectura, Banco Mundial", video:""},
      {fecha:"2026-10-15", titulo:"ATAL: habilidades precursoras y ruta de aprendizaje", con:"Especialista ATAL y docente invitado", video:""},
      {fecha:"2026-10-22", titulo:"Kalulu: enseñanza fonética y remediación", con:"Especialista Kalulu y docente de segundo grado", video:""},
      {fecha:"2026-10-29", titulo:"El facilitador: acompañar para transformar la práctica", con:"Facilitadoras de CTA y Corpoeducación", video:""},
      {fecha:"2026-11-05", titulo:"EGRA: medir habilidades para orientar la enseñanza", con:"Especialista en evaluación, Banco Mundial, y Secretaría de Educación", video:""},
      {fecha:"2026-11-12", titulo:"Un momento para leer juntos sí cabe en la vida familiar", con:"Primera Dama de Antioquia, docente y familia invitada", video:""},
      {fecha:"2026-11-19", titulo:"Enriqueciendo el material de ATAL a través de la innovación del maestro", con:"CTA y Universidad Católica del Norte", video:""},
      {fecha:"2026-11-25", titulo:"ALFA en territorios rurales, diversos y multigrado", con:"Corpoeducación", video:""},
      {fecha:"2026-12-03", titulo:"Preguntas difíciles sobre alfabetización inicial en Antioquia", con:"Panel de especialistas del Banco Mundial", video:""},
      {fecha:"2026-12-10", titulo:"Lo aprendido y lo que sigue", con:"Secretaría de Educación de Antioquia y Banco Mundial", video:""}
    ];

    var track=document.getElementById('wbTrack'), dotsBox=document.getElementById('wbDots');
    if(!track) return;
    var cards=[], cur=0, hoy=new Date(); hoy.setHours(0,0,0,0);
    var MESES=['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
    function fecha(f){return new Date(f+'T12:00:00');}
    function fechaLarga(f){var t=fecha(f).toLocaleDateString('es-CO',{weekday:'long',day:'numeric',month:'long'});return t.charAt(0).toUpperCase()+t.slice(1);}
    var proximo=-1;
    WEBINARS.forEach(function(w,i){ if(proximo<0 && !w.video && fecha(w.fecha)>=hoy) proximo=i; });

    function mediaHTML(w){
      var d=fecha(w.fecha);
      var poster='<div class="wb-poster"><p class="wb-poster-date">'+d.getDate()+' '+MESES[d.getMonth()]+'</p><p class="wb-poster-title">'+w.titulo+'</p></div>';
      if(!w.video) return poster;
      return poster+'<img src="https://i.ytimg.com/vi/'+w.video+'/hqdefault.jpg" alt="" loading="lazy" onerror="this.style.display=\'none\'">'+
        '<button class="wb-play" aria-label="Reproducir"><svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" style="margin-left:4px"><polygon points="5,3 19,12 5,21"/></svg></button>';
    }

    WEBINARS.forEach(function(w,i){
      var badge = w.video ? '<span class="wb-badge">Grabación disponible</span>'
        : i===proximo ? '<span class="wb-badge next">Próximo webinar</span>'
        : fecha(w.fecha)<hoy ? '<span class="wb-badge soon">Grabación en camino</span>'
        : '<span class="wb-badge soon">Próximamente</span>';
      var c=document.createElement('article'); c.className='wb-card';
      c.innerHTML='<div class="wb-media">'+mediaHTML(w)+'</div><div class="wb-info"><div class="wb-meta">'+badge+'<span class="wb-date">'+fechaLarga(w.fecha)+'</span></div>'+
        '<h3 class="wb-title">'+w.titulo+'</h3><p class="wb-con">Con: '+w.con+'</p>'+(w.desc?'<p class="wb-desc">'+w.desc+'</p>':'')+'</div>';
      c.addEventListener('click',function(e){
        if(i!==cur){ ir(i); return; }
        if(w.video && e.target.closest('.wb-play')){
          c.querySelector('.wb-media').innerHTML='<iframe src="https://www.youtube.com/embed/'+w.video+'?autoplay=1&rel=0" title="'+w.titulo+'" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
        }
      });
      track.appendChild(c); cards.push(c);
      var dot=document.createElement('button'); dot.className='wb-dot'; dot.setAttribute('aria-label','Ir al webinar '+(i+1));
      dot.onclick=function(){ir(i);}; dotsBox.appendChild(dot);
    });

    function pintar(){
      var w=cards[cur].offsetWidth, movil=window.innerWidth<=768, paso=w*(movil?0.82:0.72);
      cards.forEach(function(c,i){
        var d=i-cur, a=Math.abs(d);
        var esc = a===0 ? 1 : (movil ? .86 : .8);
        c.style.transform='translateX(calc(-50% + '+(d*paso)+'px)) scale('+esc+')';
        c.style.transformOrigin='center center';
        c.style.opacity = a===0 ? 1 : a===1 ? .6 : 0;
        c.style.filter = a===0 ? 'none' : 'saturate(.6)';
        c.style.zIndex = 20-a;
        c.style.pointerEvents = a>1 ? 'none' : 'auto';
        c.classList.toggle('is-active',a===0);
        c.setAttribute('aria-hidden', a===0?'false':'true');
      });
      track.style.height=(cards[cur].offsetHeight+10)+'px';
      dotsBox.querySelectorAll('.wb-dot').forEach(function(d,i){d.classList.toggle('on',i===cur);});
    }
    function ir(i){
      if(i<0||i>=cards.length||i===cur) return;
      var w=WEBINARS[cur]; if(w.video){ cards[cur].querySelector('.wb-media').innerHTML=mediaHTML(w); }
      cur=i; pintar();
    }
    document.getElementById('wbPrev').onclick=function(){ir(cur-1);};
    document.getElementById('wbNext').onclick=function(){ir(cur+1);};
    var x0=null;
    track.addEventListener('touchstart',function(e){x0=e.touches[0].clientX;},{passive:true});
    track.addEventListener('touchend',function(e){ if(x0===null)return; var dx=e.changedTouches[0].clientX-x0; if(dx<-40)ir(cur+1); if(dx>40)ir(cur-1); x0=null; });
    window.addEventListener('resize',pintar);

    /* Arranca en la última grabación publicada (o en el próximo webinar si aún no hay grabaciones) */
    var ult=-1; WEBINARS.forEach(function(w,i){ if(w.video) ult=i; });
    cur = ult>=0 ? ult : Math.max(proximo,0);
    pintar(); setTimeout(pintar,300);
  })();