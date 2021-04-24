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

  var fecha_string = new Date();
  var fechaFormateada = fecha_string.getFullYear() + "/" + (fecha_string.getMonth()+1) + "/" + fecha_string.getDate() + " " + fecha_string.getHours() + ":" + fecha_string.getMinutes();
  $(".some_class2").datetimepicker({value: fechaFormateada, lang:'es', minDate:'-1', todayButton: 1, inline: true});  

});  

$(document).ready(function(){
  $('[data-tooltip="tooltip"]').tooltip(); 
});

if(window.location.href.indexOf("?id_salon=") > -1) {
  var url = "../admin/BackMenuEventosWithParameter.php";
  var id_salon= gup("id_salon", document.URL);
  $.cookie('id_salon', id_salon);
}
else {
  if(window.location.href.indexOf("?eventId=") > -1) {
    var url = "../admin/BackMenuEventosWithParameterEvent.php";
    var eventId=  gup("eventId", document.URL);
    $.cookie('eventId', eventId);
  }
  else
  {
    var url = "http://local-api.partypic.com/api/events";
  }
}

var grid = $("#grid-command-buttons").bootgrid({
  ajaxSettings: {
      method: "GET",
      cache: false
  },
  
  ajax: true,
  url: url,
  formatters: {
      "IDColumn": function(column, row) {
        return "<div class=\"text-center\">" + row.eventId + "</div>";
      },
      "commands": function(column, row) {
        return "<div class=\"text-center\"> <button type=\"button\" data-tooltip=\"tooltip\" data-placement=\"top\" title=\"Editar evento\" data-toggle=\"modal\" data-target=\"#gridSystemModal\" class=\"btn btn-xs btn-default command-edit\" data-row-id=\"" + row.eventId + "\"><span class=\"fa fa-pencil\"></span></button> " + 
              "<button type=\"button\" data-tooltip=\"tooltip\" data-placement=\"top\" title=\"Eliminar evento\" class=\"btn btn-xs btn-default command-delete\" data-row-id=\"" + row.eventId + "\"><span class=\"fa fa-trash-o\"></span></button><button type=\"button\" data-tooltip=\"tooltip\" data-placement=\"top\" title=\"Reenviar evento por correo\" class=\"btn btn-xs btn-default command-send\" data-row-id=\"" + row.eventId + "\"><span class=\"fa fa-envelope-o\"></span></button>" +
              "<button type=\"button\" data-tooltip=\"tooltip\" data-placement=\"top\" title=\"Ver presentación\" class=\"btn btn-xs btn-default command-play-slider\" data-row-id=\"" + row.eventId + "\"><span class=\"fa fa-play-circle\"></span></button></div>";
      },
      "DescripcionColumn": function(column, row) {
        return "<div class=\"text-center\">" + row.descripcion + "</div>";
      },
      "CodigoColumn": function(column, row) {
        return "<div class=\"text-center\">" + row.code + "</div>";
      },
      "NombreEventoColumn": function(column, row) {
        return "<div class=\"text-center\">" + row.name + "</div>";
      },
      "FechaColumn": function(column, row) {
        return "<div class=\"text-center\">" + row.date + "</div>";
      },
      "CodigoQRColumn": function(column, row) {
        return "<div class=\"text-center\"><img src="+ row.qrCode +"></div>";
      },
      "NombreSalonColumn": function(column, row) {
        return "<div class=\"text-center\"><a style=\"cursor:pointer !important\" onclick=\"verSalon("+ row.venueId +")\" target=\"blank\">"+row.venueName+"</a></div>";
      },
      "VerFotosColumn": function(column, row) {
        return "<div class=\"text-center\"><a style=\"cursor:pointer !important\" href=\"/admin/verFotosEvento.php?eventId="+ row.eventId +"\" target=\"blank\">Ver Imágenes</a></div>";
      },
      "HabilitadoColumn": function(column, row) {
        if(row.habilitado == 1) {
           return "<div data-status=\"habilitado\" class=\"text-center\">Habilitado</div>";
        }
        else {
          return "<div data-status=\"no-habilitado\" class=\"text-center\">No Habilitado</div>";
        }
       
      }
  }
}).on("loaded.rs.jquery.bootgrid", function() {
  changeRowColor();
/* Executes after data is loaded and rendered */
  grid.find(".command-edit").on("click", function(e) {
    $.removeCookie("eventId");
    var eventId = $(this).data("row-id");
    $.cookie("eventId", eventId);
    $("#modalEditar").modal('show');

    $.ajax({
      url:'../endpoints/Get_EventoEdit.php',
      type: 'POST',
      dataType: 'json',
      data: { eventId: eventId},
      success: function(result) {
        $("#codigo").val(result[0].codigo);
        $("#nombre_evento").val(result[0].nombre_evento);
        $("#descripcion").val(result[0].descripcion);

        var fecha_string = new Date(result[0].fecha);
        var fechaFormateada = fecha_string.getFullYear() + "/" + (fecha_string.getMonth()+1) + "/" + fecha_string.getDate() + " " + fecha_string.getHours() + ":" + fecha_string.getMinutes();
        $(".some_class").datetimepicker({value: fechaFormateada, lang:'es', minDate:'-1', todayButton: 1, inline: true});
        $("#id_salon").val(result[0].id_salon);
        $("#codigo_qr").attr('src', result[0].codigo_qr);
        $("#habilitado").val(result[0].habilitado);
        $("#eventId").val(result[0].eventId);  
      },
      error: function(xhr, status, error) {
        $("#modalError").modal('show');
        $("#mensajeError").text("Ocurrió un error. Comunicalo al desarrollador.");
      } 
    }); 
  }).end().find(".command-delete").on("click", function(e) {
    $.removeCookie("eventId");
    var eventId = $(this).data("row-id");
    $.cookie("eventId", eventId);
    $("#modalEliminar").modal('show');
  }).end().find(".command-send").on("click", function(e) {
    $.removeCookie("eventId");
    var eventId = $(this).data("row-id");
    $.cookie("eventId", eventId);
    $("#modalEnviar").modal('show');
  }).end().find(".command-play-slider").on("click", function(e) {
    var eventId = $(this).data("row-id");
    var win = window.open("http://www.partypicok.com/admin/verSlider.php?eventId="+eventId, '_blank');
    win.focus();
  });
});
$("#loadingDivPadre").hide();

$("#btnCancelSend").on("click", function() {
  $.removeCookie("eventId");
});

$("#btnConfirmSend").on("click", function(){
  var base_url = "../endpoints/SendInstrucciones.php";
  eventId = parseFloat($.cookie("eventId"));
  nombre_evento = $.cookie("nombre_evento");
  codigo_qr = $.cookie("codigo_qr");
  $.ajax({
    url: base_url,
    dataType: "json",
    type:'POST',
    data:{eventId:eventId},
    success:envioOK,
    error: function(xhr,status,error) {   
      $("#modalError").modal('show');
      $("#mensajeError").text("Ocurrió un error. Comunicalo al desarrollador.");
    }
  });

  function envioOK(data) {
    if(data.success) {
      $.removeCookie("eventId");
      $('#modalEnviar').modal('hide');
      $("#grid-command-buttons").bootgrid('reload');
      $("#modalSuccess").modal('show');
      changeRowColor();
    }    
  }
});

$("#btnCancelDelete").on("click", function() {
  $.removeCookie("eventId");
});

$("#btnConfirmDelete").on("click", function(){
    
  var base_url = "../endpoints/DeleteEvento.php";
  eventId = parseFloat($.cookie("eventId"));
  $("#loadingDivPadre").show();
  $.ajax({
    url: base_url,
    dataType: "json",
    type:'POST',
    data:{eventId:eventId},
    success:userOK,
    error: function(xhr,status,error) {   
      $("#modalError").modal('show');
      $("#mensajeError").text("Ocurrió un error. Comunicalo al desarrollador.");
      $("#loadingDivPadre").hide();
    }
  });

  function userOK(data) {
    if(data.success) {
      $.removeCookie("eventId");
      $('#modalEliminar').modal('hide');
      $("#grid-command-buttons").bootgrid('reload');
      $("#loadingDivPadre").hide();
      $("#modalSuccess").modal('show');
      changeRowColor();
    }    
  }
});

$(document).ready(function() {  
  $('#editForm').validate({
    rules: {
      nombre_evento: {
        required: true
      },
      descripcion: {
        required: true
      },
      fecha: {
        required: true
      },
      id_salon: {
        required: true
      },
      habilitado: {
        required: true
      },
      spam: "required"
    },     

    messages:  {
        nombre_evento: {
          required: '- Ingresá un nombre para el evento - '
        },
        descripcion: {
          required: '- Ingresá una descripción para el evento - '
        },
        fecha: {
          required: '- Seleccioná una fecha para el evento - '
        },
        id_salon: {
          required: '- Seleccioná un salón para el evento - '
        },
        habilitado: {
          required: '- Seleccioná un estado para el evento - '
        },
    },  

    submitHandler: UpdateEvento,
    errorLabelContainer: '#errors'
  });   
}); 

function UpdateEvento() { 
  var base_url = "../endpoints/UpdateEvento.php";
  var disabled = $("#eventId").removeAttr('disabled');
  var datos = $('#editForm').serialize();
  disabled.attr('disabled','disabled');
  $("#loadingDivPadre").show();

  $.ajax({
    url: base_url,
    dataType: "json",
    type:'POST',
    data:datos,
    success:registroOK,
    error: function(xhr,status,error) {   
      $("#modalError").modal('show');
      $("#mensajeError").text("Ocurrió un error. Comunicalo al desarrollador.");
      $("#loadingDivPadre").hide();
    }
  }); 
  return false;
}

function registroOK(data) {
  if(data.success) {
    $.removeCookie("eventId");
    $('#modalEditar').modal('hide');
    $("#grid-command-buttons").bootgrid('reload');
    $("#loadingDivPadre").hide();
    changeRowColor();
    $("#modalSuccess").modal('show');
  }
  else {
    $("#loadingDivPadre").hide();
    $("#modalError").modal('show');
    $("#mensajeError").text(data.mensaje);
  }
}
  
$(document).ready(function(){
  var button = $('<button id="AgregarEvento" class="btn btn-default pull-left" type="button" title="Agregar un nuevo evento"><span class="glyphicon glyphicon-plus"></span>   Agregar evento</button>');
  $('.col-sm-12.actionBar').append(button);
  $("#AgregarEvento").on("click", function() { 
    $('#addForm').trigger("reset");
    $(".some_class2").datetimepicker({lang:'es', minDate:'-1', todayButton: 1, inline: true});
    $('#modalAgregar').modal('show');
  });
});

$(document).ready(function() {
  $('#addForm').validate({
    rules: {
      nombre_evento2: {
        required: true
      },
      descripcion2: {
        required: true
      },
      fecha2: {
        required: true
      },
      id_salon2: {
        required: true
      },
      habilitado2: {
        required: true
      },
      spam: "required"
    },     

    messages:  {
        nombre_evento2: {
          required: '- Ingresá un nombre para el evento - '
        },
        descripcion2: {
          required: '- Ingresá una descripción para el evento - '
        },
        fecha2: {
          required: '- Seleccioná una fecha para el evento - '
        },
        id_salon2: {
          required: '- Seleccioná un salón para el evento - '
        },
        habilitado2: {
          required: '- Seleccioná un estado para el evento - '
        },
    },  

    submitHandler: addEvento,
    errorLabelContainer: '#errors2'
  });
}); 


function addEvento() {
  var base_url = "../endpoints/AgregarEvento.php";
  var datos = $('#addForm').serialize();
  $("#loadingDivPadre").show();
  $.ajax({
    url: base_url,
    dataType: "json",
    type:'POST',
    data:datos,
    success:registroOK2,
    error: function(xhr,status,error) {
      $("#loadingDivPadre").hide();   
      $("#modalError").modal('show');
      $("#mensajeError").text("Ocurrió un error. Comunicalo al desarrollador.");
    }
  });

  return false;
}

function registroOK2(data) {
  if(data.success) {
    var eventId = data.id;
    var base_url = "../endpoints/SendInstrucciones.php";
    $.ajax({
      url: base_url,
      dataType: "json",
      type:'POST',
      data:{eventId:eventId},
      success:InsertYEnvioOK,
      error: function(xhr,status,error) {   
        $("#modalError").modal('show');
        $("#mensajeError").text("Ocurrió un error. Comunicalo al desarrollador.");
      }
    });

    function InsertYEnvioOK(data){
      if(data.success) {
        $('#modalAgregar').modal('hide');
        $("#grid-command-buttons").bootgrid('reload');
        changeRowColor();
        $("#loadingDivPadre").hide();
        $("#modalSuccess").modal('show');
      }
      else {
        $("#loadingDivPadre").hide();
        $("#modalError").modal('show');
        $("#mensajeError").text(data.mensaje);
      }
    }
  }
  else {
    $("#loadingDivPadre").hide();
    $("#modalError").modal('show');
    $("#mensajeError").text(data.mensaje);
  }
}  

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
      $("#mensajeError").text("Ocurrió un error. Comunicalo al desarrollador.");
    } 
    
  }); 
}

function changeRowColor() {
  $('[data-status="habilitado"]').each(function() {
    $(this).parent().parent().addClass('success');
  });
  $('[data-status="no-habilitado"]').each(function() {
    $(this).parent().parent().addClass('danger');
  });   
}

function verSalon(id_salon) {
  $("#modalSalon").modal('show');  
  $.ajax({
    url:'../endpoints/Get_SalonEdit.php',
    type: 'POST',
    dataType: 'json',
    data: {id_salon:id_salon},
    success: function(result) {
      $("#id_salon3").text(id_salon);
      $("#nombre_salon").text(result[0].nombre_salon);
      $("#domicilio_salon").text(result[0].domicilio_salon);
      $("#telefono_salon").text(result[0].telefono_salon);
      $("#nombre_usuario").text(result[0].nombre_usuario);
      $("#telefono_usuario").text(result[0].telefono_usuario);
      $("#celular_usuario").text(result[0].celular_usuario);
      $("#domicilio_usuario").text(result[0].domicilio_usuario);
      $("#cuil_usuario").text(result[0].cuil_usuario);
      $("#email").text(result[0].email);
      $("#email").attr('href','mailto:'+result[0].email);
    },
    error: function(xhr, status, error) {
      $("#modalError").modal('show');
      $("#mensajeError").text("Ocurrió un error. Comunicalo al desarrollador.")
    }   
  });
}

function gup(name, url) {
  if (!url) url = location.href
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( url );
  return results == null ? null : results[1];
}



$.datetimepicker.setLocale('es');