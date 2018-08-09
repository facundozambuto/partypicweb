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

  var grid = $("#grid-command-buttons").bootgrid({
    ajaxSettings: {
        method: "GET",
        cache: false
    },
    
    ajax: true,
    url: "../endpoints/BackMenuSalones.php",
    formatters: {
        "IDColumn": function(column, row) {
          return "<div class=\"text-center\">" + row.id_salon+ "</div>";
        },
        "commands": function(column, row) {
          return "<div class=\"text-center\"> <button type=\"button\" data-tooltip=\"tooltip\" data-placement=\"top\" title=\"Editar salón\" data-toggle=\"modal\" data-target=\"#gridSystemModal\" class=\"btn btn-xs btn-default command-edit\" data-row-id=\"" + row.id_salon+ "\"><span class=\"fa fa-pencil\"></span></button> " + 
                "<button type=\"button\" data-tooltip=\"tooltip\" data-placement=\"top\" title=\"Eliminar salón\" class=\"btn btn-xs btn-default command-delete\" data-row-id=\"" + row.id_salon+ "\"><span class=\"fa fa-trash-o\"></span></button></div>";
        },
        "NombreColumn": function(column, row) {
          return "<div class=\"text-center\">" + row.nombre_salon + "</div>";
        },
        "NombreUsuarioColumn": function(column, row) {
         return "<div class=\"text-center\"><a style=\"cursor:pointer !important\" onclick=\"verEncargado("+ row.id_usuario+")\" target=\"blank\">"+row.nombre_usuario+"</a></div>";
        },
        "TelefonoColumn": function(column, row) {
          return "<div class=\"text-center\">" + row.telefono_salon + "</div>";
        },
        "DomicilioColumn": function(column, row) {
          return "<div class=\"text-center\">" + row.domicilio_salon + "</div>";
        },
        "EventosColumn": function(column, row) {
          return "<div class=\"text-center\"><a style=\"cursor:pointer !important\" href=\"/admin/menueventos.php?id_salon="+ row.id_salon +"\" target=\"blank\">Ver Eventos</a></div>";
        },
    }
  }).on("loaded.rs.jquery.bootgrid", function() {
  /* Executes after data is loaded and rendered */
    grid.find(".command-edit").on("click", function(e) {
      $.removeCookie("id_salon");
      var id_salon = $(this).data("row-id");
      $.cookie("id_salon", id_salon);
      $("#modalEditar").modal('show');

      $.ajax({
        url:'../endpoints/Get_SalonEdit.php',
        type: 'POST',
        dataType: 'json',
        data: {id_salon:id_salon},
        success: function(result) {
          $("#nombre_salon").val(result[0].nombre_salon);
          $("#domicilio_salon").val(result[0].domicilio_salon);
          $("#telefono_salon").val(result[0].telefono_salon);
          $("#id_usuario").val(result[0].id_usuario);
          $("#id_salon").val(result[0].id_salon);    
        },
        error: function(xhr, status, error) {
          $("#modalError").modal('show');
          $("#mensajeError").text("Ocurrió un error. Comunicalo al desarrollador.");
        } 
      }); 
    }).end().find(".command-delete").on("click", function(e) {
      $.removeCookie("id_salon");
      var id_salon= $(this).data("row-id");
      $.cookie("id_salon", id_salon);
      $("#modalEliminar").modal('show');
    });
  });
  $("#loadingDivPadre").hide();

  $("#btnCancelDelete").on("click", function() {
    $.removeCookie("id_salon");
  });

  $("#btnConfirmDelete").on("click", function(){
      
    var base_url = "../endpoints/DeleteSalon.php";
    id_salon = parseFloat($.cookie("id_salon"));
    $("#loadingDivPadre").show();
    $.ajax({
      url: base_url,
      dataType: "json",
      type:'POST',
      data:{id_salon:id_salon},
      success:userOK,
      error: function(xhr,status,error) {   
        $("#loadingDivPadre").hide();
        $("#modalError").modal('show');
        $("#mensajeError").text("Ocurrió un error. Comunicalo al desarrollador.");
      }
    });

    function userOK(data) {
      if(data.success) {
        $.removeCookie("id_salon");
        $('#modalEliminar').modal('hide');
        $("#grid-command-buttons").bootgrid('reload');
        $("#loadingDivPadre").hide();
        $("#modalSuccess").modal('show');
      }
      else {
        $.removeCookie("id_salon");
        $('#modalEliminar').modal('hide');
        $("#loadingDivPadre").hide();
        $("#modalError").modal('show');
        $("#mensajeError").text(data.mensaje);
      }    
    }
  });

  $(document).ready(function() {  
    $('#editForm').validate({
      rules: {
        nombre_salon: {
          required: true
        },
        telefono_salon: {
          digits: true
        },
        domicilio_salon: {
          required: true
        },
        id_usuario: {
          required: true
        },
        spam: "required"
      },     
  
      messages:  {
          nombre_salon: {
            required: '- Ingresá un nombre de salón - '
          },
          telefono_salon: {
            digits: '- Ingresá sólo números enteros para el teléfono - '
          },
          domicilio_salon: {
            required: '- Ingresá un domicilio para el salón - '
          },
          id_usuario: {
            required: '- Seleccioná un encargado para el salón - '
          },
      },  

      submitHandler: UpdateSalon,
      errorLabelContainer: '#errors'
    });   
  }); 

  function UpdateSalon() { 
    var base_url = "../endpoints/UpdateSalon.php";
    var disabled = $("#id_salon").removeAttr('disabled');
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
        $("#loadingDivPadre").hide();
        $("#modalError").modal('show');
        $("#mensajeError").text("Ocurrió un error. Comunicalo al desarrollador.");
      }
    }); 
    return false;
  }
  
  function registroOK(data) {
    if(data.success) {
      $.removeCookie("id_salon");
      $('#modalEditar').modal('hide');
      $("#grid-command-buttons").bootgrid('reload');
      $("#loadingDivPadre").hide();
      $("#modalSuccess").modal('show');
    }
    else {
      $("#loadingDivPadre").hide();
      $("#modalError").modal('show');
      $("#mensajeError").text(data.mensaje);
    }
  }
  
  $(document).ready(function(){
    var button = $('<button id="AgregarSalon" class="btn btn-default pull-left" type="button" title="Agregar un nuevo salón"><span class="glyphicon glyphicon-plus"></span>   Agregar salón</button>');
    $('.col-sm-12.actionBar').append(button);
    $("#AgregarSalon").on("click", function() { 
      $('#addForm').trigger("reset");
      $('#modalAgregar').modal('show');
    });
  });
  
  $(document).ready(function() {
    $('#addForm').validate({
      rules: {
        nombre_salon2: {
          required: true
        },
        telefono_salon2: {
          digits: true
        },
        domicilio_salon2: {
          required: true
        },
        id_usuario2: {
          required: true
        },
        spam: "required"
      },     
  
      messages:  {
          nombre_salon2: {
            required: '- Ingresá un nombre de salón - '
          },
          telefono_salon2: {
            digits: '- Ingresá sólo números enteros para el teléfono - '
          },
          domicilio_salon2: {
            required: '- Ingresá un domicilio para el salón - '
          },
          id_usuario2: {
            required: '- Seleccioná un encargado para el salón - '
          },
      },  

      submitHandler: AddSalon,
      errorLabelContainer: '#errors2'
    });
  }); 


  function AddSalon() {
    var base_url = "../endpoints/AgregarSalon.php";
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
    $('#modalAgregar').modal('hide');
    $("#grid-command-buttons").bootgrid('reload');
    $("#loadingDivPadre").hide();
    $("#modalSuccess").modal('show');
  }
  else {
    $("#loadingDivPadre").hide();
    $("#modalError").modal('show');
    $("#mensajeError").text(data.mensaje);
  }
}

$(document).ready(function(){
  cargarEncargadosAlSelect();
});
  
function cargarEncargadosAlSelect() {   
  $.ajax({
    url:'../endpoints/GetAllEncargados.php',
    type: 'POST',
    dataType: 'json',
    data: {},
    success: function(result) {
      for(i=0;i<result.length;i++) {
        $("#id_usuario").append(
          $("<option>" , {
            text: result[i].nombre_usuario,
            value: result[i].id_usuario
          })
        );
          
        $("#id_usuario2").append(
          $("<option>" , {
            text: result[i].nombre_usuario,
            value: result[i].id_usuario
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


function verEncargado(id_usuario) {
  $("#modalEncargado").modal('show');  
  $.ajax({
    url:'../endpoints/Get_UsuarioEdit.php',
    type: 'POST',
    dataType: 'json',
    data: {id_usuario:id_usuario},
    success: function(result) {
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