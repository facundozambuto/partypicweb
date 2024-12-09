$(document).ready(function () {
  var grid = $("#grid-command-buttons").bootgrid({
    ajaxSettings: {
      method: "GET",
      cache: false
    },
    ajax: true,
    url: "http://local-api.partypic.com/api/plans/grid",
    formatters: {
      "IDColumn": function (column, row) {
        return "<div class=\"text-center\">" + row.id + "</div>";
      },
      "descriptionColumn": function (column, row) {
        return "<div class=\"text-center\">" + row.description + "</div>";
      },
      "nameColumn": function (column, row) {
        return "<div class=\"text-center\">" + row.name + "</div>";
      },
      "priceColumn": function (column, row) {
        return "<div class=\"text-center\">$" + row.latestPrice + "</div>";
      },
      "createdDatetimeColumn": function (column, row) {
        return "<div class=\"text-center\">" + formatStartDatetime(row.createdDatetime) + "</div>";
      },
      "commands": function (column, row) {
        return "<div class=\"text-center\"> <button type=\"button\" data-tooltip=\"tooltip\" data-placement=\"top\" title=\"Ver histórico de precios\" class=\"btn btn-xs btn-default command-see-prices\" data-row-id=\"" + row.id + "\"><span class=\"fa fa-history\"></span></button> " +
        "<button type=\"button\" data-tooltip=\"tooltip\" data-placement=\"top\" title=\"Editar plan\" data-toggle=\"modal\" data-target=\"#gridSystemModal\" class=\"btn btn-xs btn-default command-edit\" data-row-id=\"" + row.id + "\"><span class=\"fa fa-pencil\"></span></button> " +
          "<button type=\"button\" data-tooltip=\"tooltip\" data-placement=\"top\" title=\"Eliminar plan\" class=\"btn btn-xs btn-default command-delete\" data-row-id=\"" + row.id + "\"><span class=\"fa fa-trash-o\"></span></button></div>";
      },
    }
  }).on("loaded.rs.jquery.bootgrid", function () {

    grid.find(".command-edit").on("click", function (e) {
      $.removeCookie("id");
      var id = $(this).data("row-id");
      $.cookie("id", id);
      $("#editModal").modal('show');

      $.ajax({
        url: 'http://local-api.partypic.com/api/plans/' + id,
        type: 'GET',
        dataType: 'json',
        data: { id: id },
        success: function (result) {
          $("#planDescriptionEdit").val(result.description);
          $("#planNameEdit").val(result.name);
          $("#planPriceEdit").val(result.latestPrice);
          $("#id").val(result.id).change();
        },
        error: function (xhr, status, error) {
          $("#modalError").modal('show');
          $("#errorMessage").text("Ocurrió un error. Comunicalo al administrador.");
        }
      });
    }).end().find(".command-delete").on("click", function (e) {
      $.removeCookie("id");
      var id = $(this).data("row-id");
      $.cookie("id", id);
      $("#deleteModal").modal('show');
    }).end().find(".command-see-prices").on("click", function(e) {
      $.removeCookie("id");
      var id = $(this).data("row-id");
      $.cookie("id", id);
      $("#historicalPricesModal").modal('show');

      $("#historicalPricesModal .modal-content").find(".prices-container").remove();

      $.ajax({
        url: "http://local-api.partypic.com/api/plans/pricehistory/",
        type: "GET",
        dataType: "json",
        data: { planId: id },
        success: function (priceHistories) {
          $("#priceHistoryTitle").text("Histórico de precios para el plan " + priceHistories[0].planName)
          var table = $("<table class='table table-bordered table-hover table-striped'></table>");
          var tableHead = $("<thead><tr><th>Precio</th><th>Inicio</th><th>Fin</th></tr></thead>");
          var tableBody = $("<tbody></tbody>");

          priceHistories.forEach(function (price) {
              var row = $("<tr></tr>");

              if (!price.endDate) {
                  row = $("<tr class='table-success font-weight-bold text-dark'></tr>");
              }

              row.append($("<td></td>").html(`<strong>$${price.price.toFixed(2)}</strong>`));
              row.append($("<td></td>").text(new Date(price.startDate).toLocaleDateString()));
              row.append($("<td></td>").text(price.endDate ? new Date(price.endDate).toLocaleDateString() : "Actual"));

              tableBody.append(row);
          });

          table.append(tableHead);
          table.append(tableBody);

          $("#historicalPricesModal .modal-content").find(".prices-container").remove();
          var container = $("<div class='prices-container p-3'></div>");

          container.css({
              "margin": "15px",
              "padding": "10px",
              "border": "1px solid #dee2e6",
              "border-radius": "5px",
              "background-color": "#f8f9fa"
          });

          container.append(table);
          $("#historicalPricesModal .modal-content").append(container);
        },
        error: function (xhr, status, error) {
            $("#modalError").modal("show");
            $("#errorMessage").text("Ocurrió un error. Comunicalo al administrador.");
        },
      });
    });
  });

  var button = $('<button id="addPlanBtn" class="btn btn-default pull-left" type="button" title="Agregar un nuevo plan"><span class="glyphicon glyphicon-plus"></span>   Agregar Plan</button>');
  $('.col-sm-12.actionBar').append(button);
  $("#addPlanBtn").on("click", function () {
    $('#addForm').trigger("reset");
    $('#addingModal').modal('show');
  });

  $("#btnCancelDelete").on("click", function () {
    $.removeCookie("id");
  });

  $("#btnConfirmDelete").on("click", function () {

    var id = parseFloat($.cookie("id"));
    var baseUrl = 'http://local-api.partypic.com/api/plans/' + id;
    id = parseFloat($.cookie("id"));
    $("#loadingDivContainer").show();
    $.ajax({
      url: baseUrl,
      dataType: "json",
      type: 'DELETE',
      data: { id: id },
      success: deletePlanHandler,
      error: function (xhr, status, error) {
        $("#loadingDivContainer").hide();
        $("#modalError").modal('show');
        $("#errorMessage").text("Ocurrió un error. Comunicalo al administrador.");
      }
    });
  });

  $('#editForm').validate({
    rules: {
      planDescriptionEdit: {
        required: true
      },
      planNameEdit: {
        required: true
      },
      planInitialPriceEdit: {
        required: true
      },
      spam: "required"
    },
    messages: {
      planNameEdit: {
        required: '- Ingresá un nombre de plan - '
      },
      planDescriptionEdit: {
        required: '- Ingresá una descripción de plan - '
      },
      planInitialPriceEdit: {
        required: '- Ingresá un precio inicial de plan - '
      },
    },

    submitHandler: UpdatePlan,
    errorLabelContainer: '#errorsEditContainer'
  });

  $('#addForm').validate({
    rules: {
      planDescriptionAdd: {
        required: true
      },
      planNameAdd: {
        required: true
      },
      planInitialPriceAdd: {
        required: true
      },
      spam: "required"
    },
    messages: {
      planNameAdd: {
        required: '- Ingresá un nombre de plan - '
      },
      planDescriptionAdd: {
        required: '- Ingresá una descripción de plan - '
      },
      planInitialPriceAdd: {
        required: '- Ingresá un precio inicial de plan - '
      },
    },
    submitHandler: AddPlan,
    errorLabelContainer: '#errorsAddContainer'
  });

  $("#loadingDivContainer").hide();
});

function deletePlanHandler(data) {
  if (data.success) {
    $.removeCookie("id");
    $('#deleteModal').modal('hide');
    $("#grid-command-buttons").bootgrid('reload');
    $("#loadingDivContainer").hide();
    $("#modalSuccess").modal('show');
  } else {
    $.removeCookie("id");
    $('#deleteModal').modal('hide');
    $("#loadingDivContainer").hide();
    $("#modalError").modal('show');
    $("#errorMessage").text(data.mensaje);
  }
}

function UpdatePlan() {
  var id = parseFloat($.cookie("id"));
  var baseUrl = 'http://local-api.partypic.com/api/plans/' + id;
  var datos = {
    description: $("#planDescriptionEdit").val(),
    name: $("#planNameEdit").val(),
    price: $("#planPriceEdit").val()
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
    success: updatePlanHandler,
    error: function (xhr, status, error) {
      $("#loadingDivContainer").hide();
      $("#modalError").modal('show');
      $("#errorMessage").text("Ocurrió un error. Comunicalo al administrador.");
    }
  });
  return false;
}

function updatePlanHandler(data) {
  if (data.success) {
    $.removeCookie("id");
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

function AddPlan() {
  var baseUrl = 'http://local-api.partypic.com/api/plans/';
  var datos = {
    description: $("#planDescriptionAdd").val(),
    name: $("#planNameAdd").val(),
    initialPrice: $("#planInitialPriceAdd").val()
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
    success: addPlanHandler,
    error: function (xhr, status, error) {
      $("#loadingDivContainer").hide();
      $("#modalError").modal('show');
      $("#errorMessage").text("Ocurrió un error. Comunicalo al administrador.");
    }
  });

  return false;
}

function addPlanHandler(data) {
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
  return dateString.getDate() + "/" + (dateString.getMonth() + 1) + "/" + dateString.getFullYear();
}