$(function () {
  //Init iconos
  feather.replace();

  //---------- Funciones generales ----------
  function cargarImagen(e, blob) {
    if (blob) {
      var file = blob;
    } else {
      var file = e.target.files[0];
    }
    console.log(file);
    console.log(e);
    // imageType = /image.*/;
    imageType = /image.*video.*/;
    if (!file.type.match(imageType))
      return;
    var nombreImg = Date.now();
    var extension = file.name.split('.');
    extension = extension[extension.length - 1];
    nombreImg = nombreImg + '.' + extension;
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      preview.src = reader.result;
      enviarImg(downloadURL);
    }
  }
  function enviarImg(url, tipo = 2) {
    $('.chat .container').removeClass('emojisVisibles stickersVisibles gifsVisibles');
    var idSala = $('.menuLateral .tab.listaSalas .sala.activa').data('id');
    pushMensaje(idSala, url, tipo);
  }
  const navegador = () => {
    if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) 
   {
       alert('Opera');
   }
   else if(navigator.userAgent.indexOf("Chrome") != -1 )
   {
       alert('Chrome');
   }
   else if(navigator.userAgent.indexOf("Safari") != -1)
   {
       alert('Safari');
   }
   else if(navigator.userAgent.indexOf("Firefox") != -1 ) 
   {
        alert('Firefox');
   }
   else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) //IF IE > 10
   {
     alert('IE'); 
   }  
   else 
   {
      alert('unknown');
   }
   }


  //---------- Acciones del publicador ----------
  //Subir foto/video
  $('.publicador .acciones .accion.foto input').change(function (e) {
    cargarImagen(e);
    $(this).val('');
  })

  //---------- Acciones dentro de una publicacion ----------
  //Menu de la publicacion
  $(document).on('click', '.publicacion .menu', function () {
    $('.social_principal .publicacion .menu').not($(this)).parent().removeClass('blur');
    $('.social_principal .publicacion .menu').not($(this)).children('.contenidoMenu').fadeOut();
    $(this).parent().toggleClass('blur');
    $(this).children('.contenidoMenu').fadeToggle();
  })
  //Comentar publicacion
  $(document).on('click', '.funcComentar', function () {
    var publicacion = $(this).parents('.publicacion');
    var top = publicacion.children('.interaccion').offset().top;
    publicacion.children('.comentarios').slideToggle(function () {
      $('body, html').animate({
        scrollTop: (top - 100)
      })
    })
  })
  //Aparecer reacciones
  $(document).on('contextmenu', '.funcLike', function (e) {
    e.preventDefault();
    if ($(this).find('.interaccionReacciones').length <= 0) {
      var estructura = `<div class="interaccionReacciones">
        <div title="Me gusta" class="icoReacc like" data-reac="reacLike" data-texto="Me gusta"></div>
        <div title="Me encanta" class="icoReacc love" data-reac="reacLove" data-texto="Me encanta"></div>
        <div title="Me divierte" class="icoReacc divierte" data-reac="reacDivierte" data-texto="Me divierte"></div>
        <div title="Me asombra" class="icoReacc sorprende" data-reac="reacSorprende" data-texto="Me asombra"></div>
        <div title="Me entristece" class="icoReacc entristece" data-reac="reacTriste" data-texto="Me entristece"></div>
        <div title="Me enoja" class="icoReacc enoja" data-reac="reacEnoja" data-texto="Me enoja"></div>
        <div title="Me emperra" class="icoReacc emperra" data-reac="reacEmperra" data-texto="Me emperra"></div>
      </div>`;
      $(this).append(estructura);
      $('.interaccionReacciones').fadeIn(function () {
        $(this).addClass('anim');
      }).css('display', 'flex');
    }
  })
  //Reaccionar
  $(document).on('click', '.interaccionReacciones .icoReacc', function (e) {
    e.stopPropagation();
    var clase = $(this).data('reac');
    var texto = $(this).data('texto');
    var agregar = false;
    if (!$(this).parents('.funcLike').hasClass(clase)) {
      agregar = true;
    }
    $(this).parents('.funcLike').removeClass('reacLike reacLove reacDivierte reacSorprende reacTriste reacEnoja reacEmperra');
    if (agregar) {
      $(this).parents('.funcLike').addClass(clase);
      if ($(this).parents('.funcLike').hasClass('reacLike')) {
        $(this).parents('.funcLike').html(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thumbs-up icono"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>${texto}`);
      } else {
        $(this).parents('.funcLike').html(`<div class="ic ${clase}"></div>${texto}`);
      }
    }
    $(this).parent().fadeOut(function () {
      $(this).remove();
    });
  })
  //Ocultar reacciones
  $(document).on('click', function () {
    $('.interaccionReacciones').fadeOut(function () { $(this).remove() });
  })
  //Like
  $(document).on('click', '.funcLike', function () {
    var agregar = false;
    if (!$(this).hasClass('reacLike')) {
      agregar = true;
    }
    if ($(this).is('.reacLove, .reacDivierte, .reacSorprende, .reacTriste, .reacEnoja, .reacEmperra')) {
      agregar = false;
      $(this).html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thumbs-up icono"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>Me gusta');
    }
    $(this).removeClass('reacLike reacLove reacDivierte reacSorprende reacTriste reacEnoja reacEmperra');
    if (agregar) {
      $(this).addClass('reacLike');
      $(this).html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thumbs-up icono"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>Me gusta');
    }
  })

  //---------- Responsives ----------
  $('.menuR').click(function(){
    $('body').toggleClass('shadowLayer');
    $(this).toggleClass('activ');
    $('.social_principal .menuIzq').toggleClass('activ');
  })
  $('.social_responsiveLaunchers .launcherXhat').click(function(){
    $('body').toggleClass('shadowLayer');
    $(this).toggleClass('activ');
    $('.social_principal .menuDer .grupo.chat').toggleClass('activ');
  })
})