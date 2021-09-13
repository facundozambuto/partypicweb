$(document).ready(function () {
  var trigger = $('.hamburger'),
  overlay = $('.overlay'),
  isClosed = false;
  trigger.click(function () {
    hamburger_cross();      
  });

  function hamburger_cross() {
    if (isClosed == true) {          
      overlay.hide();
      trigger.removeClass('is-open');
      trigger.addClass('is-closed');
      isClosed = false;
    } else {   
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
  url: "http://local-api.partypic.com/api/categories/grid",
  formatters: {
      "IDColumn": function(column, row) {
        return "<div class=\"text-center\">" + row.categoryId + "</div>";
      },
      "descriptionColumn": function(column, row) {
        return "<div class=\"text-center\">" + row.description + "</div>";
      },
      "createdDatetimeColumn": function(column, row) {
        return "<div class=\"text-center\">" + formatStartDatetime(row.createdDatetime) + "</div>";
      },
      "commands": function(column, row) {
        return "<div class=\"text-center\"> <button type=\"button\" data-tooltip=\"tooltip\" data-placement=\"top\" title=\"Editar salón\" data-toggle=\"modal\" data-target=\"#gridSystemModal\" class=\"btn btn-xs btn-default command-edit\" data-row-id=\"" + row.categoryId + "\"><span class=\"fa fa-pencil\"></span></button> " + 
              "<button type=\"button\" data-tooltip=\"tooltip\" data-placement=\"top\" title=\"Eliminar categoría\" class=\"btn btn-xs btn-default command-delete\" data-row-id=\"" + row.categoryId + "\"><span class=\"fa fa-trash-o\"></span></button></div>";
      },
  }
}).on("loaded.rs.jquery.bootgrid", function() {

  grid.find(".command-edit").on("click", function(e) {
    $.removeCookie("categoryId");
    var categoryId = $(this).data("row-id");
    $.cookie("categoryId", categoryId);
    $("#editModal").modal('show');

    $.ajax({
      url: 'http://local-api.partypic.com/api/categories/ ' + categoryId,
      type: 'GET',
      dataType: 'json',
      data: { categoryId: categoryId },
      success: function(result) {
        $("#categoryDescriptionEdit").val(result.description);
        $("#categoryId").val(result.categoryId).change(); 
      },
      error: function(xhr, status, error) {
        $("#modalError").modal('show');
        $("#errorMessage").text("Ocurrió un error. Comunicalo al desarrollador.");
      } 
    }); 
  }).end().find(".command-delete").on("click", function(e) {
    $.removeCookie("categoryId");
    var categoryId= $(this).data("row-id");
    $.cookie("categoryId", categoryId);
    $("#deleteModal").modal('show');
  });
});

$("#loadingDivContainer").hide();

$("#btnCancelDelete").on("click", function() {
  $.removeCookie("categoryId");
});

$("#btnConfirmDelete").on("click", function() {

  var categoryId = parseFloat($.cookie("categoryId"));
  var baseUrl = 'http://local-api.partypic.com/api/categories/' + categoryId;
  categoryId = parseFloat($.cookie("categoryId"));
  $("#loadingDivContainer").show();
  $.ajax({
    url: baseUrl,
    dataType: "json",
    type:'DELETE',
    data:{ categoryId: categoryId },
    success: deleteCategoryHandler,
    error: function(xhr,status,error) {   
      $("#loadingDivContainer").hide();
      $("#modalError").modal('show');
      $("#errorMessage").text("Ocurrió un error. Comunicalo al desarrollador.");
    }
  });

  function deleteCategoryHandler(data) {
    if (data.success) {
      $.removeCookie("categoryId");
      $('#deleteModal').modal('hide');
      $("#grid-command-buttons").bootgrid('reload');
      $("#loadingDivContainer").hide();
      $("#modalSuccess").modal('show');
    } else {
      $.removeCookie("categoryId");
      $('#deleteModal').modal('hide');
      $("#loadingDivContainer").hide();
      $("#modalError").modal('show');
      $("#errorMessage").text(data.mensaje);
    }    
  }
});

$(document).ready(function() {  
  $('#editForm').validate({
    rules: {
      categoryDescriptionEdit: {
        required: true
      },
      spam: "required"
    },     

    messages:  {
      categoryDescriptionEdit: {
        required: '- Ingresá un nombre para la categoría - '
      }
    },  

    submitHandler: UpdateCategory,
    errorLabelContainer: '#errorsEditContainer'
  });   
}); 

function UpdateCategory() {
  var categoryId = parseFloat($.cookie("categoryId"));
  var baseUrl = 'http://local-api.partypic.com/api/categories/' + categoryId;
  var datos = {
    description: $("#categoryDescriptionEdit").val()
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
    success: updateCategoryHandler,
    error: function(xhr,status,error) {   
      $("#loadingDivContainer").hide();
      $("#modalError").modal('show');
      $("#errorMessage").text("Ocurrió un error. Comunicalo al desarrollador.");
    }
  }); 
  return false;
}

function updateCategoryHandler(data) {
  if (data.success) {
    $.removeCookie("categoryId");
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

$(document).ready(function(){
  var button = $('<button id="addCategoryBtn" class="btn btn-default pull-left" type="button" title="Agregar un nueva categoría"><span class="glyphicon glyphicon-plus"></span>   Agregar Categoría</button>');
  $('.col-sm-12.actionBar').append(button);
  $("#addCategoryBtn").on("click", function() { 
    $('#addForm').trigger("reset");
    $('#addingModal').modal('show');
  });
});

$(document).ready(function() {
  $('#addForm').validate({
    rules: {
      categoryDescriptionAdd: {
        required: true
      },
      spam: "required"
    },     
    messages:  {
      categoryDescriptionAdd: {
        required: '- Ingresá un nombre de salón - '
      },
    },  
    submitHandler: AddCategory,
    errorLabelContainer: '#errorsAddContainer'
  });
}); 


function AddCategory() {
  var baseUrl = 'http://local-api.partypic.com/api/categories/';
  var datos = {
    description: $("#categoryDescriptionAdd").val()
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
    success: addCategoryHandler,
    error: function(xhr,status,error) {
      $("#loadingDivContainer").hide();   
      $("#modalError").modal('show');
      $("#errorMessage").text("Ocurrió un error. Comunicalo al desarrollador.");
    }
  });

  return false;
}

function addCategoryHandler(data) {
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