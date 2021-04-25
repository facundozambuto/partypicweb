$(document).ready(function () {
    var trigger = $('.hamburger'),
    overlay = $('.overlay'),
    isClosed = false;
    trigger.click(function () {
      hamburger_cross();      
    });

    function hamburger_cross() {
      if(isClosed == true) {          
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } 
      else {   
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
    }

    $('[data-toggle="offcanvas"]').click(function () {
      $('#wrapper').toggleClass('toggled');
    });
  });  

  $(document).ready(function(){
    $('[data-tooltip="tooltip"]').tooltip(); 
  
  
  });


  function gup(name, url) {
    if (!url) url = location.href
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
  }

  $(document).ready(function(){
    getImagenesByIdEvento();
  });
  
  function getImagenesByIdEvento() {  
//  $("#loading").show();
    $("#loadingDivPadre").show();
    var id_evento = gup("id_evento", document.URL);
    var first_time = 'si';
    var time_request = '';
  
    $.ajax({
    url:'../endpoints/Get_ImagenesByIdEvento.php',
    type: 'POST',
    dataType: 'json',
    data: {id_evento:id_evento, first_time:first_time, time_request:time_request},
    success: bindearImagenes,
    error: function(xhr, status, error) {
      $("#modalError").modal('show');
      $("#mensajeError").text("Ocurri�� un error. Comunicalo al desarrollador.");
    }     
    }); 
    
    function bindearImagenes(data) {
      if(data.length > 0) {
        $("#nombreEvento").html(data[0].nombre_evento);
        $("#btnDescargaAlbum").attr('href', 'http://www.partypicok.com/imagenes_eventos/DescargarAlbum.php?id_evento=' + data[0].id_evento);
        for(i=0;i<data.length;i++) {
          var urlFoto = data[i].path.replace('/home/josefinaacevedo/public_html','..');
          getMeta(urlFoto, data[i]);
        }
        //$("#loading").fadeOut(4000);
         $("#loadingDivPadre").hide();
        $("#images-container").fadeIn(4000);
        $("#nombreEvento").show(4000);
      }
      else {
        //$("#loading").fadeOut(200);
         $("#loadingDivPadre").hide();
        $("#contenedor-error").show(200);
      }
    }
  }
  
  function getMeta(urlFoto, data){
    var dataImg = {
          "height": null,
          "width": null
        };
    $("<img/>",{
      load : function(){
        
        dataImg.height = this.height;
        dataImg.width = this.width;
        if(dataImg.height > dataImg.width) {
          $("#images-container").append('<div data-profile-img-url="'+data.foto_profile_url+'" data-nombre-perfil="'+data.nombre_profile+'" data-id-profile="'+data.id_profile+'" data-id-imagen="'+data.id_imagen+'" class="gallery-item text-center" onclick="abrirGaleria(this)"><img width="auto" height="185" style="zoom:1.75" src="'+urlFoto+'" alt="'+data.comentario+'" title="'+data.comentario+'"/></div>');
        }
        else {
          $("#images-container").append('<div data-profile-img-url="'+data.foto_profile_url+'" data-nombre-perfil="'+data.nombre_profile+'" data-id-profile="'+data.id_profile+'" data-id-imagen="'+data.id_imagen+'" class="gallery-item text-center" onclick="abrirGaleria(this)"><img width="185" height="auto" style="zoom:1.75" src="'+urlFoto+'" alt="'+data.comentario+'" title="'+data.comentario+'"/></div>');
        }
      },
      src  : urlFoto
    });
  }
  
  
  
  function eliminarImagen() {
    $('#myModal').modal('hide');
    $.removeCookie("id_imagen");
    var id_imagen = $("#btnDeleteImage").data("image-id");
    $.cookie("id_imagen", id_imagen);
    $("#modalEliminar").modal('show');
  }
  
  $("#btnCancelDelete").on("click", function() {
    $.removeCookie("id_imagen");
  });
  
  $("#btnConfirmDelete").on("click", function(){
    
    var base_url = "../endpoints/DeleteImagen.php";
    id_imagen = parseFloat($.cookie("id_imagen"));
    var bloquear = false;
    var id_evento = gup("id_evento", document.URL);

    $.ajax({
      url: base_url,
      dataType: "json",
      type:'POST',
      data:{id_imagen:id_imagen, bloquear:bloquear, id_evento:id_evento},
      success:imagenOK,
      error: function(xhr,status,error) {   
      $("#modalError").modal('show');
      $("#mensajeError").text("Ocurri�� un error. Comunicalo al desarrollador.");
      }
    });

    function imagenOK(data) {
      if(data.success) {
      $.removeCookie("id_imagen");
      $('#modalEliminar').modal('hide');
      $("#images-container").html("");
      getImagenesByIdEvento();
      $("#modalSuccess").modal('show');
      }    
    }
  });
  
  
  function bloquearUsuario() {
    $('#myModal').modal('hide');
    $.removeCookie("id_imagen");
    $.removeCookie("id_profile");
    $.removeCookie("nombre_perfil");
    var id_imagen = $("#btnBlockUser").data("image-id");
    var id_profile = $("#btnBlockUser").data("user-id");
    var nombre_perfil = $("#btnBlockUser").data("nombre-usuario");
    $.cookie("id_imagen", id_imagen);
    $.cookie("id_profile", id_profile);
    $.cookie("nombre_perfil", nombre_perfil);
    $("#modalBloquear").modal('show');
  }
  
  $("#btnCancelDeleteBlock").on("click", function() {
    $.removeCookie("id_imagen");
    $.removeCookie("id_profile");
    $.removeCookie("nombre_perfil");
  });
  
  $("#btnConfirmDeleteBlock").on("click", function(){
    
    var base_url = "../endpoints/DeleteImagen.php";
    id_imagen = parseFloat($.cookie("id_imagen"));
    id_profile = $.cookie("id_profile");
    nombre_perfil = $.cookie("nombre_perfil");
    var bloquear = true;
    var id_evento = gup("id_evento", document.URL);

    $.ajax({
      url: base_url,
      dataType: "json",
      type:'POST',
      data:{id_imagen:id_imagen, bloquear:bloquear, id_evento:id_evento, id_profile:id_profile, nombre_perfil:nombre_perfil},
      success:bloquearOK,
      error: function(xhr,status,error) {   
      $("#modalError").modal('show');
      $("#mensajeError").text("Ocurri�� un error. Comunicalo al desarrollador.");
      }
    });

    function bloquearOK(data) {
      if(data.success) {
      $.removeCookie("id_imagen");
      $('#modalBloquear').modal('hide');
      $("#images-container").html("");
      getImagenesByIdEvento();
      $("#modalSuccess").modal('show');
      }    
    }
  });
  
    




$(document).ready(function(){
  cargarSalonesAlSelect();
});
  
function cargarSalonesAlSelect() {   
  $.ajax({
    url:'../endpoints/GetAllSalones.php',
    type: 'POST',
    dataType: 'json',
    data: {},
    success: function(result) {
      for(i=0;i<result.length;i++) {
        $("#id_salon").append(
          $("<option>" , {
            text: result[i].nombre_salon,
            value: result[i].id_salon
          })
        );
          
        $("#id_salon2").append(
          $("<option>" , {
            text: result[i].nombre_salon,
            value: result[i].id_salon
          })
        );
      } 
    },
    error: function(xhr, status, error) {
      $("#modalError").modal('show');
      $("#mensajeError").text("Ocurri�� un error. Comunicalo al desarrollador.");
    } 
    
  }); 
}
