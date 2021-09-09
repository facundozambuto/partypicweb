  
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
    url: "../endpoints/BackMenuBanneadosEncargado.php",
    formatters: {
        "IDColumn": function(column, row) {
          return "<div class=\"text-center\">" + row.id_profile + "</div>";
        },
        "commands": function(column, row) {
          return "<button type=\"button\" data-tooltip=\"tooltip\" data-placement=\"top\" title=\"Quitar bloquedo\" class=\"btn btn-xs btn-default command-delete\" data-row-id=\"" + row.id_profile + "\"><span class=\"fa fa-trash-o\"></span></button></div>";
        },
        "NombreColumn": function(column, row) {
          return "<div class=\"text-center\">" + row.nombre_usuario + "</div>";
        },
        "RolColumn": function(column, row) {
         if(row.rol == "administrador"){
         	row.rol = "Administrador";
         }
         else {
         	row.rol = "Encargado de Salón";
         }
          return "<div class=\"text-center\">" + row.rol + "</div>";
        },
        "NombreBanneadoColumn": function(column, row) {
          return "<div class=\"text-center\">" + row.nombre_banneado + "</div>";
        },
        "FechaColumn": function(column, row) {
          return "<div class=\"text-center\">" + row.fecha_ban + "</div>";
        },
        "NombreSalonColumn": function(column, row) {
          if(row.nombre_salon == null) {
            return "<div class=\"text-center\"> - </div>"
          }
          else {
	    return "<div class=\"text-center\">" + row.nombre_salon + "</div>";
          }
        },
        "NombreEventoColumn": function(column, row) {
          if(row.nombre_evento == null) {
            return "<div class=\"text-center\"> - </div>"
          }
          else {
	    return "<div class=\"text-center\">" + row.nombre_evento + "</div>";
          }
        }
    }
  }).on("loaded.rs.jquery.bootgrid", function() {
  /* Executes after data is loaded and rendered */
    grid.find(".command-delete").on("click", function(e) {
      $.removeCookie("id_profile");
      var id_profile = $(this).data("row-id");
      $.cookie("id_profile", id_profile);
      $("#deleteModal").modal('show');
    });
  });
  $("#loadingDivContainer").hide();

  
  
  $("#btnCancelDelete").on("click", function() {
    $.removeCookie("id_profile");
  });

  $("#btnConfirmDelete").on("click", function(){
      
    var base_url = "../endpoints/DeleteBlocked.php";
    id_profile = parseFloat($.cookie("id_profile"));
    $("#loadingDivContainer").show();

    $.ajax({
      url: base_url,
      dataType: "json",
      type:'POST',
      data:{id_profile:id_profile},
      success:userOK,
      error: function(xhr,status,error) {
        $("#loadingDivContainer").hide();   
        $("#modalError").modal('show');
        $("#errorMessage").text("Ocurrió un error. Comunicalo al desarrollador.");
      }
    });

    function userOK(data) {
      if(data.success) {
        $.removeCookie("id_profile");
        $('#deleteModal').modal('hide');
        $("#grid-command-buttons").bootgrid('reload');
        $("#loadingDivContainer").hide();
        $("#modalSuccess").modal('show');
      }
      else {
        $.removeCookie("id_profile");
        $('#deleteModal').modal('hide');
        $("#loadingDivContainer").hide();
        $("#modalError").modal('show');
        $("#errorMessage").text(data.mensaje);
      }    
    }
  });


