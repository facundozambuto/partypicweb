$(document).ready(function () {
  var grid = $("#grid-command-buttons").bootgrid({
    ajaxSettings: {
      method: "GET",
      cache: false
    },
    ajax: true,
    url: "http://local-api.partypic.com/api/roles/grid",
    formatters: {
        "IDColumn": function(column, row) {
          return "<div class=\"text-center\">" + row.roleId + "</div>";
        },
        "descriptionColumn": function(column, row) {
          return "<div class=\"text-center\">" + row.description + "</div>";
        },
        "createdDatetimeColumn": function(column, row) {
          return "<div class=\"text-center\">" + formatStartDatetime(row.createdDatetime) + "</div>";
        },
        "commands": function(column, row) {
          return "<div class=\"text-center\"> <button type=\"button\" data-tooltip=\"tooltip\" data-placement=\"top\" title=\"Editar rol\" data-toggle=\"modal\" data-target=\"#gridSystemModal\" class=\"btn btn-xs btn-default command-edit\" data-row-id=\"" + row.roleId + "\"><span class=\"fa fa-pencil\"></span></button> " + 
                "<button type=\"button\" data-tooltip=\"tooltip\" data-placement=\"top\" title=\"Eliminar rol\" class=\"btn btn-xs btn-default command-delete\" data-row-id=\"" + row.roleId + "\"><span class=\"fa fa-trash-o\"></span></button></div>";
        },
    }
  }).on("loaded.rs.jquery.bootgrid", function() {
  
    grid.find(".command-edit").on("click", function(e) {
      $.removeCookie("roleId");
      var roleId = $(this).data("row-id");
      $.cookie("roleId", roleId);
      $("#editModal").modal('show');
  
      $.ajax({
        url: 'http://local-api.partypic.com/api/roles/ ' + roleId,
        type: 'GET',
        dataType: 'json',
        data: { roleId: roleId },
        success: function(result) {
          $("#roleDescriptionEdit").val(result.description);
          $("#roleId").val(result.roleId).change(); 
        },
        error: function(xhr, status, error) {
          $("#modalError").modal('show');
          $("#errorMessage").text("Ocurrió un error. Comunicalo al desarrollador.");
        } 
      }); 
    }).end().find(".command-delete").on("click", function(e) {
      $.removeCookie("roleId");
      var roleId= $(this).data("row-id");
      $.cookie("roleId", roleId);
      $("#deleteModal").modal('show');
    });
  });

  var button = $('<button id="addRoleBtn" class="btn btn-default pull-left" type="button" title="Agregar un nuevo rol"><span class="glyphicon glyphicon-plus"></span>   Agregar Rol</button>');
  $('.col-sm-12.actionBar').append(button);
  $("#addRoleBtn").on("click", function() { 
    $('#addForm').trigger("reset");
    $('#addingModal').modal('show');
  });
  
  $("#btnCancelDelete").on("click", function() {
    $.removeCookie("roleId");
  });
  
  $("#btnConfirmDelete").on("click", function() {
  
    var roleId = parseFloat($.cookie("roleId"));
    var baseUrl = 'http://local-api.partypic.com/api/roles/' + roleId;
    roleId = parseFloat($.cookie("roleId"));
    $("#loadingDivContainer").show();
    $.ajax({
      url: baseUrl,
      dataType: "json",
      type:'DELETE',
      data:{ roleId: roleId },
      success: deleteRoleHandler,
      error: function(xhr,status,error) {   
        $("#loadingDivContainer").hide();
        $("#modalError").modal('show');
        $("#errorMessage").text("Ocurrió un error. Comunicalo al desarrollador.");
      }
    });
  });
  
  $('#editForm').validate({
    rules: {
      roleDescriptionEdit: {
        required: true
      },
      spam: "required"
    },     

    messages:  {
      roleDescriptionEdit: {
        required: '- Ingresá un nombre para el rol - '
      }
    },  

    submitHandler: UpdateRole,
    errorLabelContainer: '#errorsEditContainer'
  });

  $('#addForm').validate({
    rules: {
      roleDescriptionAdd: {
        required: true
      },
      spam: "required"
    },     
    messages:  {
      roleDescriptionAdd: {
        required: '- Ingresá un nombre de role - '
      },
    },  
    submitHandler: AddRole,
    errorLabelContainer: '#errorsAddContainer'
  });

  $("#loadingDivContainer").hide();
});

function deleteRoleHandler(data) {
  if (data.success) {
    $.removeCookie("roleId");
    $('#deleteModal').modal('hide');
    $("#grid-command-buttons").bootgrid('reload');
    $("#loadingDivContainer").hide();
    $("#modalSuccess").modal('show');
  } else {
    $.removeCookie("roleId");
    $('#deleteModal').modal('hide');
    $("#loadingDivContainer").hide();
    $("#modalError").modal('show');
    $("#errorMessage").text(data.mensaje);
  }    
}

function UpdateRole() {
  var roleId = parseFloat($.cookie("roleId"));
  var baseUrl = 'http://local-api.partypic.com/api/roles/' + roleId;
  var datos = {
    description: $("#roleDescriptionEdit").val()
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
    success: updateRoleHandler,
    error: function(xhr,status,error) {   
      $("#loadingDivContainer").hide();
      $("#modalError").modal('show');
      $("#errorMessage").text("Ocurrió un error. Comunicalo al desarrollador.");
    }
  }); 
  return false;
}

function updateRoleHandler(data) {
  if (data.success) {
    $.removeCookie("roleId");
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


function AddRole() {
  var baseUrl = 'http://local-api.partypic.com/api/roles/';
  var datos = {
    description: $("#roleDescriptionAdd").val()
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
    success: addRoleHandler,
    error: function(xhr,status,error) {
      $("#loadingDivContainer").hide();   
      $("#modalError").modal('show');
      $("#errorMessage").text("Ocurrió un error. Comunicalo al desarrollador.");
    }
  });

  return false;
}

function addRoleHandler(data) {
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

function formatStartDatetime(dateTime) {
  var dateString = new Date(dateTime);
  return dateString.getDate() + "/" + (dateString.getMonth()+1) + "/" + dateString.getFullYear();
}