  
  $(document).ready(function () {
    var grid = $("#grid-command-buttons").bootgrid({
      ajaxSettings: {
        method: "GET",
        cache: false
      },
      ajax: true,
      url: "http://local-api.partypic.com/api/bannedProfiles/grid",
      formatters: {
          "IDColumn": function(column, row) {
            return "<div class=\"text-center\">" + row.profileId + "</div>";
          },
          "NameColumn": function(column, row) {
            return "<div class=\"text-center\">" + row.userName + "</div>";
          },
          "BannedProfileNameColumn": function(column, row) {
            return "<div class=\"text-center\">" + row.bannedName + "</div>";
          },
          "BanDatetimeColumn": function(column, row) {
            return "<div class=\"text-center\">" + formatStartDatetime(row.banDatetime) + "</div>";
          },
          "EventNameColumn": function(column, row) {
            if (row.eventName == null) {
              return "<div class=\"text-center\"> - </div>"
            } else {
              return "<div class=\"text-center\">" + row.eventName + "</div>";
            }
          },
          "commands": function(column, row) {
            return "<button type=\"button\" data-tooltip=\"tooltip\" data-placement=\"top\" title=\"Quitar bloquedo\" class=\"btn btn-xs btn-default command-delete\" data-row-id=\"" + row.profileId + "\"><span class=\"fa fa-trash-o\"></span></button></div>";
          },
      }
    }).on("loaded.rs.jquery.bootgrid", function() {
    /* Executes after data is loaded and rendered */
      grid.find(".command-delete").on("click", function(e) {
        $.removeCookie("profileId");
        var profileId = $(this).data("row-id");
        $.cookie("profileId", profileId);
        $("#deleteModal").modal('show');
      });
    });
  
    $("#loadingDivContainer").hide();
  
    $("#btnCancelDelete").on("click", function() {
      $.removeCookie("profileId");
    });
  
    $("#btnConfirmDelete").on("click", function(){
      
      profileId = $.cookie("profileId");
  
      var baseUrl = "http://local-api.partypic.com/api/bannedProfiles/" + profileId;
  
      $("#loadingDivContainer").show();
  
      $.ajax({
        url: baseUrl,
        dataType: "json",
        type:'DELETE',
        data:{ },
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json' 
        },
        success: removeBlockHandler,
        error: function(xhr,status,error) {
          $("#loadingDivContainer").hide();   
          $("#modalError").modal('show');
          $("#errorMessage").text("Ocurrió un error. Comunicalo al desarrollador.");
        }
      });
    });
  });  

function removeBlockHandler(data) {
  if(data.success) {
    $.removeCookie("profileId");
    $('#deleteModal').modal('hide');
    $("#grid-command-buttons").bootgrid('reload');
    $("#loadingDivContainer").hide();
    $("#modalSuccess").modal('show');
  } else {
    $.removeCookie("profileId");
    $('#deleteModal').modal('hide');
    $("#loadingDivContainer").hide();
    $("#modalError").modal('show');
    $("#errorMessage").text(data.mensaje);
  }    
}

function formatStartDatetime(datetime) {
  var dateString = new Date(datetime);
  return dateString.getDate() + "/" + (dateString.getMonth()+1) + "/" + dateString.getFullYear();
}
