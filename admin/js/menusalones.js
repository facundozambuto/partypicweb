$(document).ready(function () {
  
  var grid = $("#grid-command-buttons").bootgrid({
    ajaxSettings: {
      method: "GET",
      cache: false
    },
    ajax: true,
    url: "http://local-api.partypic.com/api/venues/grid",
    formatters: {
        "IDColumn": function(column, row) {
          return "<div class=\"text-center\">" + row.venueId+ "</div>";
        },
        "commands": function(column, row) {
          return "<div class=\"text-center\"> <button type=\"button\" data-tooltip=\"tooltip\" data-placement=\"top\" title=\"Editar salón\" data-toggle=\"modal\" data-target=\"#gridSystemModal\" class=\"btn btn-xs btn-default command-edit\" data-row-id=\"" + row.venueId + "\"><span class=\"fa fa-pencil\"></span></button> " + 
                "<button type=\"button\" data-tooltip=\"tooltip\" data-placement=\"top\" title=\"Eliminar salón\" class=\"btn btn-xs btn-default command-delete\" data-row-id=\"" + row.venueId + "\"><span class=\"fa fa-trash-o\"></span></button></div>";
        },
        "nameColumn": function(column, row) {
          return "<div class=\"text-center\">" + row.name + "</div>";
        },
        "userNameColumn": function(column, row) {
          return "<div class=\"text-center\"><a style=\"cursor:pointer !important\" onclick=\"showVenueManager("+ row.userId + ")\" target=\"blank\">" + row.managerName + "</a></div>";
        },
        "phoneColumn": function(column, row) {
          return "<div class=\"text-center\">" + row.phone + "</div>";
        },
        "addressColumn": function(column, row) {
          return "<div class=\"text-center\">" + row.address + "</div>";
        },
        "eventsColumn": function(column, row) {
          return "<div class=\"text-center\"><a style=\"cursor:pointer !important\" href=\"/admin/menueventos.html?venueId="+ row.venueId +"\" target=\"blank\">Ver Eventos</a></div>";
        },
    }
  }).on("loaded.rs.jquery.bootgrid", function() {
  
    grid.find(".command-edit").on("click", function(e) {
      $.removeCookie("venueId");
      var venueId = $(this).data("row-id");
      $.cookie("venueId", venueId);
      $("#editModal").modal('show');
  
      $.ajax({
        url: 'http://local-api.partypic.com/api/venues/' + parseInt(venueId),
        type: 'GET',
        dataType: 'json',
        success: function(result) {
          $("#venueNameEdit").val(result.name);
          $("#venueAddressEdit").val(result.address);
          $("#venuePhoneEdit").val(result.phone);
          $("#userIdEdit").val(result.userId).change();
          $("#venueId").val(result.venueId).change(); 
        },
        error: function(xhr, status, error) {
          $("#modalError").modal('show');
          $("#errorMessage").text("Ocurrió un error. Comunicalo al desarrollador.");
        } 
      }); 
    }).end().find(".command-delete").on("click", function(e) {
      $.removeCookie("venueId");
      var venueId= $(this).data("row-id");
      $.cookie("venueId", venueId);
      $("#deleteModal").modal('show');
    });
  });
  
  loadVenueUsersToSelect();

  $("#btnCancelDelete").on("click", function() {
    $.removeCookie("venueId");
  });

  $("#btnConfirmDelete").on("click", function() {
    var venueId = parseFloat($.cookie("venueId"));
    var baseUrl = 'http://local-api.partypic.com/api/venues/' + venueId;
    venueId = parseFloat($.cookie("venueId"));
    $("#loadingDivContainer").show();
    $.ajax({
      url: baseUrl,
      dataType: "json",
      type:'DELETE',
      data:{venueId:venueId},
      success: deleteVenueHandler,
      error: function(xhr,status,error) {   
        $("#loadingDivContainer").hide();
        $("#modalError").modal('show');
        $("#errorMessage").text("Ocurrió un error. Comunicalo al desarrollador.");
      }
    });
  });

  $('#editForm').validate({
    rules: {
      venueNameEdit: {
        required: true
      },
      venuePhoneEdit: {
        digits: true
      },
      domicilio_salon: {
        required: true
      },
      userId: {
        required: true
      },
      spam: "required"
    },     

    messages:  {
      venueNameEdit: {
          required: '- Ingresá un nombre de salón - '
        },
        venuePhoneEdit: {
          digits: '- Ingresá sólo números enteros para el teléfono - '
        },
        venueAddressEdit: {
          required: '- Ingresá un domicilio para el salón - '
        },
        userId: {
          required: '- Seleccioná un encargado para el salón - '
        },
    },  

    submitHandler: UpdateVenue,
    errorLabelContainer: '#errorsEditContainer'
  });

  var button = $('<button id="addVenueBtn" class="btn btn-default pull-left" type="button" title="Agregar un nuevo salón"><span class="glyphicon glyphicon-plus"></span>   Agregar salón</button>');
  $('.col-sm-12.actionBar').append(button);
  $("#addVenueBtn").on("click", function() { 
    $('#addForm').trigger("reset");
    $('#addingModal').modal('show');
  });

  $('#addForm').validate({
    rules: {
      venueNameAdd: {
        required: true
      },
      venuePhoneAdd: {
        digits: true
      },
      venueAddressAdd: {
        required: true
      },
      userIdDDLAdd: {
        required: true
      },
      spam: "required"
    },     
    messages:  {
      venueNameAdd: {
          required: '- Ingresá un nombre de salón - '
        },
        venuePhoneAdd: {
          digits: '- Ingresá sólo números enteros para el teléfono - '
        },
        venueAddressAdd: {
          required: '- Ingresá un domicilio para el salón - '
        },
        userIdDDLAdd: {
          required: '- Seleccioná un encargado para el salón - '
        },
    },  
    submitHandler: AddVenue,
    errorLabelContainer: '#errorsAddContainer'
  });

  $("#loadingDivContainer").hide();
});  

function deleteVenueHandler(data) {
  if (data.success) {
    $.removeCookie("venueId");
    $('#deleteModal').modal('hide');
    $("#grid-command-buttons").bootgrid('reload');
    $("#loadingDivContainer").hide();
    $("#modalSuccess").modal('show');
  } else {
    $.removeCookie("venueId");
    $('#deleteModal').modal('hide');
    $("#loadingDivContainer").hide();
    $("#modalError").modal('show');
    $("#errorMessage").text(data.mensaje);
  }    
}

function UpdateVenue() {
  var venueId = parseFloat($.cookie("venueId"));
  var baseUrl = 'http://local-api.partypic.com/api/venues/' + venueId;
  var datos = {
    name: $("#venueNameEdit").val(),
    address: $("#venueAddressEdit").val(),
    phone: $("#venuePhoneEdit").val(),
    userId: parseInt($("#userIdDDLEdit").val())
  };
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
    success: updateVenueHandler,
    error: function(xhr,status,error) {   
      $("#loadingDivContainer").hide();
      $("#modalError").modal('show');
      $("#errorMessage").text("Ocurrió un error. Comunicalo al desarrollador.");
    }
  }); 
  return false;
}

function updateVenueHandler(data) {
  if (data.success) {
    $.removeCookie("venueId");
    $('#editModal').modal('hide');
    $("#grid-command-buttons").bootgrid('reload');
    $("#loadingDivContainer").hide();
    $("#modalSuccess").modal('show');
  } else {
    $("#loadingDivContainer").hide();
    $("#modalError").modal('show');
    $("#errorMessage").text(data.mensaje);
  }
}

function AddVenue() {
  var baseUrl = 'http://local-api.partypic.com/api/venues/';
  var datos = {
    name: $("#venueNameAdd").val(),
    address: $("#venueAddressAdd").val(),
    phone: $("#venuePhoneAdd").val(),
    userId: parseInt($("#userIdDDLAdd").val())
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
    success: addVenueHandler,
    error: function(xhr,status,error) {
      $("#loadingDivContainer").hide();   
      $("#modalError").modal('show');
      $("#errorMessage").text("Ocurrió un error. Comunicalo al desarrollador.");
    }
  });

  return false;
}

function addVenueHandler(data) {
  if (data.success) {
    $('#addingModal').modal('hide');
    $("#grid-command-buttons").bootgrid('reload');
    $("#loadingDivContainer").hide();
    $("#modalSuccess").modal('show');
  } else {
    $("#loadingDivContainer").hide();
    $("#modalError").modal('show');
    $("#errorMessage").text(data.mensaje);
  }
}

function loadVenueUsersToSelect() { 
  $.ajax({
    url:'http://local-api.partypic.com/api/users/venueUsers',
    type: 'GET',
    dataType: 'json',
    data: {},
    success: function(result) {
      for(i=0;i<result.users.length;i++) {
        $("#userIdDDLEdit").append(
          $("<option>" , {
            text: result.users[i].name,
            value: result.users[i].userId
          })
        );
        $("#userIdDDLAdd").append(
          $("<option>" , {
            text: result.users[i].name,
            value: result.users[i].userId
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

function showVenueManager(userId) {
  $("#venueManagerModal").modal('show');  
  $.ajax({
    url:'http://local-api.partypic.com/api/users/' + userId,
    type: 'GET',
    dataType: 'json',
    data: { userId: userId},
    success: function(result) {
      $("#venueManagerName").text(result.name);
      $("#venueManagerPhone").text(result.phone);
      $("#venueManagerMobilePhone").text(result.mobilePhone);
      $("#venueManagerAddress").text(result.address);
      $("#venueManagerCuil").text(result.cuil);
      $("#venueManagerEmail").text(result.email);
      $("#venueManagerEmail").attr('href','mailto:'+result.email);
    },
    error: function(xhr, status, error) {
      $("#modalError").modal('show');
      $("#errorMessage").text("Ocurrió un error. Comunicalo al desarrollador.")
    }   
  });
}