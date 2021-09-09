  
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
  
  if(window.location.href.indexOf("?venueId=") > -1) {
    var url = "../admin/BackMenuEventosWithParameterEncargado.php";
    var venueId= gup("venueId", document.URL);
    $.cookie('venueId', venueId);
  }
  else {
    if(window.location.href.indexOf("?eventId=") > -1) {
      var url = "../admin/BackMenuEventosWithParameterEventEncargado.php";
      var eventId= gup("eventId", document.URL);
      $.cookie('eventId', eventId);
    }
    else
    {
      var url = "../endpoints/BackMenuEventosEncargado.php";
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
          return "<div class=\"text-center\">" + row.description + "</div>";
        },
        "CodigoColumn": function(column, row) {
          return "<div class=\"text-center\">" + row.code + "</div>";
        },
        "NombreEventoColumn": function(column, row) {
          return "<div class=\"text-center\">" + row.name + "</div>";
        },
        "FechaColumn": function(column, row) {
          return "<div class=\"text-center\">" + row.startDatetime + "</div>";
        },
        "CodigoQRColumn": function(column, row) {
          return "<div class=\"text-center\"><img src="+ row.qrCode +"></div>";
        },
        "NombreSalonColumn": function(column, row) {
          return "<div class=\"text-center\"><a style=\"cursor:pointer !important\" onclick=\"verSalon("+ row.venueId +")\" target=\"blank\">"+row.nombre_salon+"</a></div>";
        },
        "VerFotosColumn": function(column, row) {
          return "<div class=\"text-center\"><a style=\"cursor:pointer !important\" href=\"/admin/verFotosEventoEncargado.php?eventId="+ row.eventId +"\" target=\"blank\">Ver Imágenes</a></div>";
        },
        "HabilitadoColumn": function(column, row) {
          if(row.enabled == 1) {
             return "<div data-status=\"enabled\" class=\"text-center\">Habilitado</div>";
          }
          else {
            return "<div data-status=\"no-enabled\" class=\"text-center\">No Habilitado</div>";
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
        data: {eventId:eventId},
        success: function(result) {
          $("#code").val(result[0].code);
          $("#name").val(result[0].name);
          $("#description").val(result[0].description);

          var fecha_string = new Date(result[0].startDatetime);
          var fechaFormateada = fecha_string.getFullYear() + "/" + (fecha_string.getMonth()+1) + "/" + fecha_string.getDate() + " " + fecha_string.getHours() + ":" + fecha_string.getMinutes();
          $(".some_class").datetimepicker({value: fechaFormateada, lang:'es', minDate:'-1', todayButton: 1, inline: true});
          $("#venueId").val(result[0].venueId);
          $("#qrCode").attr('src', result[0].qrCode);
          $("#enabled").val(result[0].enabled);
          $("#eventId").val(result[0].eventId);  
        },
        error: function(xhr, status, error) {
          $("#modalError").modal('show');
          $("#errorMessage").text("Ocurrió un error. Comunicalo al desarrollador.");
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
      var win = window.open("http://www.partypicok.com/admin/verSliderEncargado.php?eventId="+eventId, '_blank');
      win.focus();
    });
  });
  $("#loadingDivContainer").hide();

  $("#btnCancelSend").on("click", function() {
    $.removeCookie("eventId");
  });

  $("#btnConfirmSend").on("click", function(){
    var base_url = "../endpoints/SendInstrucciones.php";
    eventId = parseFloat($.cookie("eventId"));
    name = $.cookie("name");
    qrCode = $.cookie("qrCode");
  
    $.ajax({
      url: base_url,
      dataType: "json",
      type:'POST',
      data:{eventId:eventId},
      success:envioOK,
      error: function(xhr,status,error) {   
        $("#modalError").modal('show');
        $("#errorMessage").text("Ocurrió un error. Comunicalo al desarrollador.");
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
    $("#loadingDivContainer").show();
    $.ajax({
      url: base_url,
      dataType: "json",
      type:'POST',
      data:{eventId:eventId},
      success:userOK,
      error: function(xhr,status,error) {   
        $("#loadingDivContainer").hide();
        $("#modalError").modal('show');
        $("#errorMessage").text("Ocurrió un error. Comunicalo al desarrollador.");
      }
    });

    function userOK(data) {
      if(data.success) {
        $.removeCookie("eventId");
        $('#modalEliminar').modal('hide');
        $("#grid-command-buttons").bootgrid('reload');
        $("#loadingDivContainer").hide();
        $("#modalSuccess").modal('show');
        changeRowColor();
      }    
    }
  });

  $(document).ready(function() {  
    $('#editForm').validate({
      rules: {
        name: {
          required: true
        },
        description: {
          required: true
        },
        startDatetime: {
          required: true
        },
        venueId: {
          required: true
        },
        enabled: {
          required: true
        },
        spam: "required"
      },     
  
      messages:  {
          name: {
            required: '- Ingresá un nombre para el evento - '
          },
          description: {
            required: '- Ingresá una descripción para el evento - '
          },
          startDatetime: {
            required: '- Seleccioná una startDatetime para el evento - '
          },
          venueId: {
            required: '- Seleccioná un salón para el evento - '
          },
          enabled: {
            required: '- Seleccioná un estado para el evento - '
          },
      },  

      submitHandler: UpdateEvento,
      errorLabelContainer: '#errors'
    });   
  }); 

  function UpdateEvento() { 
    var base_url = "../endpoints/UpdateEventoEncargado.php";
    var disabled = $("#eventId").removeAttr('disabled');
    var datos = $('#editForm').serialize();
    disabled.attr('disabled','disabled');
    $("#loadingDivContainer").show();
    $.ajax({
      url: base_url,
      dataType: "json",
      type:'POST',
      data:datos,
      success:registroOK,
      error: function(xhr,status,error) {
        $("#loadingDivContainer").hide();   
        $("#modalError").modal('show');
        $("#errorMessage").text("Ocurrió un error. Comunicalo al desarrollador.");
      }
    }); 
    return false;
  }
  
  function registroOK(data) {
    if(data.success) {
      $.removeCookie("eventId");
      $('#modalEditar').modal('hide');
      $("#grid-command-buttons").bootgrid('reload');
      changeRowColor();
      $("#loadingDivContainer").hide();
      $("#modalSuccess").modal('show');
    }
    else {
      $("#loadingDivContainer").hide();
      $("#modalError").modal('show');
      $("#errorMessage").text(data.mensaje);
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
            required: '- Seleccioná una startDatetime para el evento - '
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
    var base_url = "../endpoints/AgregarEventoEncargado.php";
    var datos = $('#addForm').serialize();
    $("#loadingDivContainer").show();
    $.ajax({
      url: base_url,
      dataType: "json",
      type:'POST',
      data:datos,
      success:registroOK2,
      error: function(xhr,status,error) {
        $("#loadingDivContainer").hide();   
        $("#modalError").modal('show');
        $("#errorMessage").text("Ocurrió un error. Comunicalo al desarrollador.");
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
        $("#errorMessage").text("Ocurrió un error. Comunicalo al desarrollador.");
      }
    });

    function InsertYEnvioOK(data){
      if(data.success) {
        $('#modalAgregar').modal('hide');
        $("#grid-command-buttons").bootgrid('reload');
        changeRowColor();
        $("#loadingDivContainer").hide();
        $("#modalSuccess").modal('show');
      }
      else {
        $("#loadingDivContainer").hide();
        $("#modalError").modal('show');
        $("#errorMessage").text(data.mensaje);
      }
    }
  }
  else {
    $("#loadingDivContainer").hide();
    $("#modalError").modal('show');
    $("#errorMessage").text(data.mensaje);
  }
}  

$(document).ready(function(){
  cargarSalonesAlSelect();
});
  
function cargarSalonesAlSelect() {   
  $.ajax({
    url:'../endpoints/GetAllSalonesByIdUsuario.php',
    type: 'POST',
    dataType: 'json',
    data: {},
    success: function(result) {
      for(i=0;i<result.length;i++) {
        $("#venueId").append(
          $("<option>" , {
            text: result[i].nombre_salon,
            value: result[i].venueId
          })
        );
          
        $("#id_salon2").append(
          $("<option>" , {
            text: result[i].nombre_salon,
            value: result[i].venueId
          })
        );
      } 
    },
    error: function(xhr, status, error) {
      $("#modalError").modal('show');
      $("#errorMessage").text("Ocurrió un error. Comunicalo al desarrollador.");
    } 
    
  }); 
}

function changeRowColor() {
  $('[data-status="enabled"]').each(function() {
    $(this).parent().parent().addClass('success');
  });
  $('[data-status="no-enabled"]').each(function() {
    $(this).parent().parent().addClass('danger');
  });   
}

function verSalon(venueId) {
  $("#modalSalon").modal('show');  
  $.ajax({
    url:'../endpoints/Get_SalonEdit.php',
    type: 'POST',
    dataType: 'json',
    data: {venueId:venueId},
    success: function(result) {
      $("#id_salon3").text(venueId);
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
      $("#errorMessage").text("Ocurrió un error. Comunicalo al desarrollador.")
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