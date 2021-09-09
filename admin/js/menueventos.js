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
  loadVenues();
  loadCategories();

  var button = $('<button id="AgregarEvento" class="btn btn-default pull-left" type="button" title="Agregar un nuevo evento"><span class="glyphicon glyphicon-plus"></span>   Agregar evento</button>');
  $('.col-sm-12.actionBar').append(button);
  $("#AgregarEvento").on("click", function() { 
    $('#addForm').trigger("reset");
    $(".some_class2").datetimepicker({lang:'es', minDate:'-1', todayButton: 1, inline: true});
    $('#modalAgregar').modal('show');
  });
  
  $('[data-tooltip="tooltip"]').tooltip(); 
});

if (window.location.href.indexOf("?venueId=") > -1) {
  var url = "../admin/BackMenuEventosWithParameter.php";
  var venueId = gup("venueId", document.URL);
  $.cookie('venueId', venueId);
} else {
  if (window.location.href.indexOf("?eventId=") > -1) {
    var url = "../admin/BackMenuEventosWithParameterEvent.php";
    var eventId = gup("eventId", document.URL);
    $.cookie('eventId', eventId);
  } else {
    var url = "http://local-api.partypic.com/api/events/grid";
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
        return "<div class=\"text-center\"><a style=\"cursor:pointer !important\" onclick=\"verSalon("+ row.venueId +")\" target=\"blank\">"+getVenueName(row.venueName)+"</a></div>";
      },
      "CategoryColumn": function(column, row) {
        return "<div class=\"text-center\">" + row.categoryDescription + "</div>";
      },
      "VerFotosColumn": function(column, row) {
        return "<div class=\"text-center\"><a style=\"cursor:pointer !important\" href=\"/admin/verFotosEvento.html?eventId="+ row.eventId +"\" target=\"blank\">Ver Imágenes</a></div>";
      },
      "HabilitadoColumn": function(column, row) {
        if (row.enabled == 1) {
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
      url: 'http://local-api.partypic.com/api/events/' + eventId,
      type: 'GET',
      dataType: 'json',
      data: { eventId: eventId },
      success: function(result) {
        $("#code").val(result.code);
        $("#eventName").val(result.name);
        $("#description").val(result.description);

        var fecha_string = new Date(result.startDatetime);
        var fechaFormateada = fecha_string.getFullYear() + "/" + (fecha_string.getMonth()+1) + "/" + fecha_string.getDate() + " " + fecha_string.getHours() + ":" + fecha_string.getMinutes();
        $(".some_class").datetimepicker({value: fechaFormateada, lang:'es', minDate:'-1', todayButton: 1, inline: true});
        $("#venueIdDDLEdit").val(result.venueId).change();;
        $("#qrCode").attr('src', result.qrCode);
        $("#enabledDDLEdit").val(result.enabled ? 1 : 0);
        $("#eventId").val(result.eventId);  
        $("#categoryIdDDLEdit").val(result.categoryId).change();
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
    var win = window.open("http://local-web.partypic.com/admin/verSlider.html?eventId="+eventId, '_blank');
    win.focus();
  });
});
$("#loadingDivContainer").hide();

$("#btnCancelSend").on("click", function() {
  $.removeCookie("eventId");
});

$("#btnConfirmSend").on("click", function(){
  var baseUrl = "http://local-api.partypic.com/api/events/sendInstructions";
  eventId = parseInt($.cookie("eventId"));

  var datos = {
    eventId: eventId
  };

  $.ajax({
    url: baseUrl,
    dataType: "json",
    type:'POST',
    data: JSON.stringify(datos),
    headers: { 
      'Accept': 'application/json',
      'Content-Type': 'application/json' 
    },
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

$("#btnConfirmDelete").on("click", function() {
    
  var eventId = parseFloat($.cookie("eventId"));
  var baseUrl = 'http://local-api.partypic.com/api/events/' + eventId;
  $("#loadingDivContainer").show();
  $.ajax({
    url: baseUrl,
    dataType: "json",
    type: 'DELETE',
    headers: { 
      'Accept': 'application/json',
      'Content-Type': 'application/json' 
    },
    success: successDeleteHandler,
    error: function(xhr,status,error) {
      if (xhr && xhr.responseJSON && xhr.responseJSON.errors && xhr.responseJSON.errors[0] && xhr.responseJSON.errors[0].description === 'ExistingAsociatedImagesToEventException') {
        $("#errorMessage").text("Existen imágenes asociadas a este evento y por tal razón no se puede eliminar el mismo. Comuníquese con el administrador.");
      } else {
        $("#errorMessage").text("Ocurrió un error. Comunicalo al desarrollador.");
      }
      $("#modalError").modal('show');
      $("#loadingDivContainer").hide();
    }
  });

  function successDeleteHandler(data) {
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
      eventName: {
        required: true
      },
      description: {
        required: true
      },
      startDatetime: {
        required: true
      },
      venueIdDDLEdit: {
        required: true
      },
      enabledDDLEdit: {
        required: true
      },
      categoryDDLEdit: {
        required: true
      },
      spam: "required"
    },     

    messages:  {
      eventName: {
          required: '- Ingresá un nombre para el evento - '
        },
        description: {
          required: '- Ingresá una descripción para el evento - '
        },
        startDatetime: {
          required: '- Seleccioná una fecha para el evento - '
        },
        venueIdDDLEdit: {
          required: '- Seleccioná un salón para el evento - '
        },
        enabledDDLEdit: {
          required: '- Seleccioná un estado para el evento - '
        },
        categoryDDLEdit: {
          required: '- Seleccioná una categoría de evento - '
        },
    },  

    submitHandler: UpdateEvento,
    errorLabelContainer: '#errors'
  });   
}); 

function UpdateEvento() { 
  var eventId = parseFloat($.cookie("eventId"));
  var baseUrl = 'http://local-api.partypic.com/api/events/' + eventId;
  var disabled = $("#eventId").removeAttr('disabled');
  var datos = {
    name: $("#eventName").val(),
    description: $("#description").val(),
    startDatetime: $("#startDatetime").val(),
    venueId: parseInt($("#venueIdDDLEdit").val()),
    enabled: $("#enabledDDLEdit").val() === '1' ? true : false,
    categoryId: parseInt($("#categoryIdDDLEdit").val())
  };

  disabled.attr('disabled','disabled');
  $("#loadingDivContainer").show();

  $.ajax({
    url: baseUrl,
    dataType: "json",
    type: 'PUT',
    data: JSON.stringify(datos),
    headers: { 
      'Accept': 'application/json',
      'Content-Type': 'application/json' 
    },
    success: successUpdateHandler,
    error: function(xhr,status,error) {
      $("#loadingDivContainer").hide();   
      $("#modalError").modal('show');
      $("#errorMessage").text("Ocurrió un error. Comunicalo al desarrollador.");
    }
  }); 
  
  return false;
}

function successUpdateHandler(data) {
  if (data.success) {
    $.removeCookie("eventId");
    $('#modalEditar').modal('hide');
    $("#grid-command-buttons").bootgrid('reload');
    $("#loadingDivContainer").hide();
    changeRowColor();
    $("#modalSuccess").modal('show');
  }
  else {
    $("#loadingDivContainer").hide();
    $("#modalError").modal('show');
    $("#errorMessage").text(data.mensaje);
  }
}
  
$(document).ready(function() {
  
});

$(document).ready(function() {
  $('#addForm').validate({
    rules: {
      eventNameAdd: {
        required: true
      },
      descriptionAdd: {
        required: true
      },
      startDatetimeAdd: {
        required: true
      },
      venueIdDDLAdd: {
        required: true
      },
      enabledDDLAdd: {
        required: true
      },
      categoryIdDDLAdd: {
        required: true
      },
      spam: "required"
    },     

    messages:  {
      eventNameAdd: {
          required: '- Ingresá un nombre para el evento - '
        },
        descriptionAdd: {
          required: '- Ingresá una descripción para el evento - '
        },
        startDatetimeAdd: {
          required: '- Seleccioná una fecha para el evento - '
        },
        venueIdDDLAdd: {
          required: '- Seleccioná un salón para el evento - '
        },
        enabledDDLAdd: {
          required: '- Seleccioná un estado para el evento - '
        },
        categoryIdDDLAdd: {
          required: '- Seleccioná un tipo de evento - '
        },
    },  

    submitHandler: addEvento,
    errorLabelContainer: '#errors2'
  });
}); 


function addEvento() {
  var baseUrl = 'http://local-api.partypic.com/api/events/';
  var datos = {
    name: $("#eventNameAdd").val(),
    description: $("#descriptionAdd").val(),
    startDatetime: $("#startDatetimeAdd").val(),
    venueId: parseInt($("#venueIdDDLAdd").val()),
    enabled: $("#enabledDDLAdd").val() === '1' ? true : false,
    categoryId: parseInt($("#categoryIdDDLAdd").val())
  };
  $("#loadingDivContainer").show();
  $.ajax({
    url: baseUrl,
    dataType: "json",
    type: 'POST',
    data: JSON.stringify(datos),
    headers: { 
      'Accept': 'application/json',
      'Content-Type': 'application/json' 
    },
    success: successAddHandler,
    error: function(xhr,status,error) {
      $("#loadingDivContainer").hide();   
      $("#modalError").modal('show');
      $("#errorMessage").text("Ocurrió un error. Comunicalo al desarrollador.");
    }
  });

  return false;
}

function successAddHandler(data) {
  if (data.success) {
    var baseUrl = "http://local-api.partypic.com/api/events/sendInstructions";
    var eventId = data.eventId;
    var datos = {
      eventId: eventId
    };
  
    $.ajax({
      url: baseUrl,
      dataType: "json",
      type:'POST',
      data: JSON.stringify(datos),
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
      },
      success: successInstructionsSendingHandler,
      error: function(xhr,status,error) {   
        $("#modalError").modal('show');
        $("#errorMessage").text("Ocurrió un error. Comunicalo al desarrollador.");
      }
    });

    function successInstructionsSendingHandler(data){
      if (data.success) {
        $('#modalAgregar').modal('hide');
        $("#grid-command-buttons").bootgrid('reload');
        changeRowColor();
        $("#loadingDivContainer").hide();
        $("#modalSuccess").modal('show');
      } else {
        $("#loadingDivContainer").hide();
        $("#modalError").modal('show');
        $("#errorMessage").text(data.mensaje);
      }
    }
  } else {
    $("#loadingDivContainer").hide();
    $("#modalError").modal('show');
    $("#errorMessage").text(data.mensaje);
  }
}  

function loadVenues() {
  $.ajax({
    url:'http://local-api.partypic.com/api/venues',
    type: 'GET',
    dataType: 'json',
    data: {},
    success: function(result) {
      var venues = result.venues;
      for (i=0;i<venues.length;i++) {
        $("#venueIdDDLEdit").append(
          $("<option>" , {
            text: venues[i].name,
            value: venues[i].venueId
          })
        );
        $("#venueIdDDLAdd").append(
          $("<option>" , {
            text: venues[i].name,
            value: venues[i].venueId
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

function loadCategories() {
  $.ajax({
    url:'http://local-api.partypic.com/api/categories',
    type: 'GET',
    dataType: 'json',
    data: {},
    success: function(result) {
      var categories = result.categories;
      for (i=0;i<categories.length;i++) {
        $("#categoryIdDDLEdit").append(
          $("<option>" , {
            text: categories[i].description,
            value: categories[i].categoryId
          })
        );
        $("#categoryIdDDLAdd").append(
          $("<option>" , {
            text: categories[i].description,
            value: categories[i].categoryId
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

function getVenueName(venueName) {
  if (venueName != '' && venueName != null && venueName != undefined) {
    return venueName;
  }
  return 'NA'
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
    url:'http://local-api.partypic.com/api/venues/' + venueId,
    type: 'GET',
    dataType: 'json',
    data: {},
    success: function(result) {
      $("#venueIdTD").text(venueId);
      $("#venueNameTD").text(result.name);
      $("#venueAddressTD").text(result.address);
      $("#venuePhoneTD").text(result.venuePhone);
      $("#venueUserNameTD").text(result.venueUserName);
      $("#userNamePhoneTD").text(result.userNamePhone);
      $("#userNameMobilePhoneTD").text(result.userNameMobilePhone);
      $("#userNameAddressTD").text(result.userNameAddress);
      $("#userCuilTD").text(result.userCuil);
      $("#email").text(result.email);
      $("#email").attr('href','mailto:'+result.email);
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