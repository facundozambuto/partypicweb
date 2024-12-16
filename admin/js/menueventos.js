$(document).ready(function () {
  var stringDate = new Date();
  var formattedDate = stringDate.getFullYear() + "/" + (stringDate.getMonth()+1) + "/" + stringDate.getDate() + " " + stringDate.getHours() + ":" + stringDate.getMinutes();
  $(".datePickerAdd").datetimepicker({value: formattedDate, lang:'es', minDate:'-1', todayButton: 1, inline: true});

  loadVenues();
  loadCategories();

  if (window.location.href.indexOf("?venueId=") > -1) {
    var venueId = gup("venueId", document.URL);
    var url = "https://partypic-gyd2dcbgdxd8heaa.brazilsouth-01.azurewebsites.net/api/events/grid?venueId=" + venueId;
    $.cookie('venueId', venueId);
  } else {
    if (window.location.href.indexOf("?eventId=") > -1) {
      var eventId = gup("eventId", document.URL);
      var url = "https://partypic-gyd2dcbgdxd8heaa.brazilsouth-01.azurewebsites.net/api/events/grid?eventId=" + eventId;
      $.cookie('eventId', eventId);
    } else {
      var url = "https://partypic-gyd2dcbgdxd8heaa.brazilsouth-01.azurewebsites.net/api/events/grid";
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
          return "<div class=\"text-center\">" + formatStartDatetime(row.startDatetime) + "</div>";
        },
        "CodigoQRColumn": function(column, row) {
          return "<div class=\"text-center\"><img src="+ row.qrCode +"></div>";
        },
        "NombreSalonColumn": function(column, row) {
          return "<div class=\"text-center\"><a style=\"cursor:pointer !important\" onclick=\"openVenue("+ row.venueId +")\" target=\"blank\">"+getVenueName(row.venueName)+"</a></div>";
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
    grid.find(".command-edit").on("click", function(e) {
      $.removeCookie("eventId");
      var eventId = $(this).data("row-id");
      $.cookie("eventId", eventId);
      $("#editModal").modal('show');
  
      $.ajax({
        url: 'https://partypic-gyd2dcbgdxd8heaa.brazilsouth-01.azurewebsites.net/api/events/' + eventId,
        type: 'GET',
        dataType: 'json',
        data: { eventId: eventId },
        success: function(result) {
          $("#code").val(result.code);
          $("#eventName").val(result.name);
          $("#description").val(result.description);
  
          var dateString = new Date(result.startDatetime);
          var formattedDate = dateString.getFullYear() + "/" + (dateString.getMonth()+1) + "/" + dateString.getDate() + " " + dateString.getHours() + ":" + dateString.getMinutes();
  
          $(".datePickerEdit").datetimepicker({value: formattedDate, lang:'es', minDate:'-1', todayButton: 1, inline: true});
          $("#venueIdDDLEdit").val(result.venueId).change();;
          $("#qrCode").attr('src', result.qrCode);
          $("#enabledDDLEdit").val(result.enabled ? 1 : 0);
          $("#eventId").val(result.eventId);  
          $("#categoryIdDDLEdit").val(result.categoryId).change();
        },
        error: function(xhr, status, error) {
          $("#modalError").modal('show');
          $("#errorMessage").text("Ocurrió un error. Comunicalo al administrador.");
        } 
      }); 
    }).end().find(".command-delete").on("click", function(e) {
      $.removeCookie("eventId");
      var eventId = $(this).data("row-id");
      $.cookie("eventId", eventId);
      $("#deleteModal").modal('show');
    }).end().find(".command-send").on("click", function(e) {
      $.removeCookie("eventId");
      var eventId = $(this).data("row-id");
      $.cookie("eventId", eventId);
      $("#sendModal").modal('show');
    }).end().find(".command-play-slider").on("click", function(e) {
      var eventId = $(this).data("row-id");
      var win = window.open("http://www.partypic.fun/admin/verSlider.html?eventId="+eventId, '_blank');
      win.focus();
    });
  });
  
  var button = $('<button id="addEventBtn" class="btn btn-default pull-left" type="button" title="Agregar un nuevo evento"><span class="glyphicon glyphicon-plus"></span>   Agregar evento</button>');
  $('.col-sm-12.actionBar').append(button);
  $("#addEventBtn").on("click", function() { 
    $('#addForm').trigger("reset");
    $(".datePickerAdd").datetimepicker({lang:'es', minDate:'-1', todayButton: 1, inline: true});
    $('#addingModal').modal('show');
  });
  
  $("#btnCancelSend").on("click", function() {
    $.removeCookie("eventId");
  });
  
  $("#btnConfirmSend").on("click", function(){
    var baseUrl = "https://partypic-gyd2dcbgdxd8heaa.brazilsouth-01.azurewebsites.net/api/events/sendInstructions";
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
        $("#errorMessage").text("Ocurrió un error. Comunicalo al administrador.");
      }
    });
  });
  
  $("#btnCancelDelete").on("click", function() {
    $.removeCookie("eventId");
  });
  
  $("#btnConfirmDelete").on("click", function() {
    var eventId = parseFloat($.cookie("eventId"));
    var baseUrl = 'https://partypic-gyd2dcbgdxd8heaa.brazilsouth-01.azurewebsites.net/api/events/' + eventId;
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
          $("#errorMessage").text("Ocurrió un error. Comunicalo al administrador.");
        }
        $("#modalError").modal('show');
        $("#loadingDivContainer").hide();
      }
    });
  });

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

  checkSubscriptionStatus();
  
  $("#loadingDivContainer").hide();

});

function successDeleteHandler(data) {
  if(data.success) {
    $.removeCookie("eventId");
    $('#deleteModal').modal('hide');
    $("#grid-command-buttons").bootgrid('reload');
    $("#loadingDivContainer").hide();
    $("#modalSuccess").modal('show');
    changeRowColor();
  }    
}

function envioOK(data) {
  if(data.success) {
    $.removeCookie("eventId");
    $('#sendModal').modal('hide');
    $("#grid-command-buttons").bootgrid('reload');
    $("#modalSuccess").modal('show');
    changeRowColor();
  }    
}

function UpdateEvento() { 
  var eventId = parseFloat($.cookie("eventId"));
  var baseUrl = 'https://partypic-gyd2dcbgdxd8heaa.brazilsouth-01.azurewebsites.net/api/events/' + eventId;
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
      $("#errorMessage").text("Ocurrió un error. Comunicalo al administrador.");
    }
  }); 
  
  return false;
}

function successUpdateHandler(data) {
  if (data.success) {
    $.removeCookie("eventId");
    $('#editModal').modal('hide');
    $("#grid-command-buttons").bootgrid('reload');
    $("#loadingDivContainer").hide();
    changeRowColor();
    $("#modalSuccess").modal('show');
  }  else {
    $("#loadingDivContainer").hide();
    $("#modalError").modal('show');
    $("#errorMessage").text(data.mensaje);
  }
}

function addEvento() {
  var baseUrl = 'https://partypic-gyd2dcbgdxd8heaa.brazilsouth-01.azurewebsites.net/api/events/';
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
      $("#errorMessage").text("Ocurrió un error. Comunicalo al administrador.");
    }
  });

  return false;
}

function successAddHandler(data) {
  if (data.success) {
    var baseUrl = "https://partypic-gyd2dcbgdxd8heaa.brazilsouth-01.azurewebsites.net/api/events/sendInstructions";
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
        $("#errorMessage").text("Ocurrió un error. Comunicalo al administrador.");
      }
    });
  } else {
    $("#loadingDivContainer").hide();
    $("#modalError").modal('show');
    $("#errorMessage").text(data.mensaje);
  }
}

function successInstructionsSendingHandler(data) {
  if (data.success) {
    $('#addingModal').modal('hide');
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

function loadVenues() {
  $.ajax({
    url:'https://partypic-gyd2dcbgdxd8heaa.brazilsouth-01.azurewebsites.net/api/venues',
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
      $("#errorMessage").text("Ocurrió un error. Comunicalo al administrador.");
    }
  });
}

function loadCategories() {
  $.ajax({
    url:'https://partypic-gyd2dcbgdxd8heaa.brazilsouth-01.azurewebsites.net/api/categories',
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
      $("#errorMessage").text("Ocurrió un error. Comunicalo al administrador.");
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

function openVenue(venueId) {
  $("#modalSalon").modal('show');  
  $.ajax({
    url:'https://partypic-gyd2dcbgdxd8heaa.brazilsouth-01.azurewebsites.net/api/venues/venueManager/' + venueId,
    type: 'GET',
    dataType: 'json',
    data: {},
    success: function(result) {
      $("#venueIdTD").text(venueId);
      $("#venueNameTD").text(result.name);
      $("#venueAddressTD").text(result.address);
      $("#venuePhoneTD").text(result.phone);
      $("#venueUserNameTD").text(result.managerName);
      $("#userNameMobilePhoneTD").text(result.managerMobilePhone);
      $("#userNameAddressTD").text(result.managerAddress);
      $("#userCuilTD").text(result.managerCuil);
      $("#email").text(result.managerEmail);
      $("#email").attr('href','mailto:'+result.managerEmail);
    },
    error: function(xhr, status, error) {
      $("#modalError").modal('show');
      $("#errorMessage").text("Ocurrió un error. Comunicalo al administrador.")
    }   
  });
}

function checkSubscriptionStatus() {
  var userSession = getUserDataFromLocalStorage();

  if (userSession && userSession.roleId == 2) {
    $.ajax({
      url:'https://partypic-gyd2dcbgdxd8heaa.brazilsouth-01.azurewebsites.net/api/Subscriptions/mysubs',
      type: 'GET',
      dataType: 'json',
      data: {},
      success: function(result) {
        if (result && result.success && result.subscriptions && result.subscriptions.filter(subscription => subscription.isActive).length > 0) {
            return;
        } else {
          $("#noSubscriptionBanner").show();
          $("#addEventBtn").prop("disabled", true);
          $('button.command-edit').prop("disabled", true);
          $('button.command-delete').prop("disabled", true);
          $('button.command-send').prop("disabled", true);
          $('button.command-play-slider').prop("disabled", true);
        }
      },
      error: function(xhr, status, error) {
        $("#modalError").modal('show');
        $("#errorMessage").text("Ocurrió un error. Comunicalo al administrador.");
      }
    });
  }
}

function gup(name, url) {
  if (!url) url = location.href
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( url );
  return results == null ? null : results[1];
}

function formatStartDatetime(startDatetime) {
  var dateString = new Date(startDatetime);
  return dateString.getDate() + "/" + (dateString.getMonth()+1) + "/" + dateString.getFullYear();
}

$.datetimepicker.setLocale('es');