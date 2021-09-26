$(document).ready(function() {

  getImagesByEventId();

  $("#btnDownload").on("click", function() {
    imageId = parseFloat($.cookie("imageId"));
    profileId = $.cookie("profileId");
    profileName = $.cookie("profileName");
    var blockProfile = false;
    var eventId = gup("eventId", document.URL);
    var baseUrl = "http://local-api.partypic.com/api/images/download?eventId=" + eventId;
    $.ajax({
      url: baseUrl,
      dataType: "json",
      type:'GET',
      data: { imageId:imageId, blockProfile: blockProfile, eventId: eventId, profileId: profileId, profileName: profileName },
      success: downloadSuccessHandler,
      error: function(xhr,status,error) {   
        if (xhr.status === 200) {
          $("#modalSuccess").modal('show');
        } else {
          $("#modalError").modal('show');
          $("#errorMessage").text("Ocurri�� un error. Comunicalo al desarrollador.");
        }
      }
    });
  });

  $("#btnCancelDelete").on("click", function() {
    $.removeCookie("imageId");
  });
    
  $("#btnConfirmDelete").on("click", function() {
    var baseUrl = "http://local-api.partypic.com/api/images/delete";
    var imageId = parseInt($.cookie("imageId"));
    var blockProfile = false;
    var eventId = parseInt(gup("eventId", document.URL));
    $.ajax({
      url: baseUrl,
      dataType: "json",
      type: 'POST',
      data: JSON.stringify({ imageId: imageId, blockProfile: blockProfile, eventId: eventId }),
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
      },
      success: deleteImageHandler,
      error: function(xhr,status,error) {   
        $("#modalError").modal('show');
        $("#errorMessage").text("Ocurri�� un error. Comunicalo al desarrollador.");
      }
    });
  });

  $("#btnCancelDeleteBlock").on("click", function() {
    $.removeCookie("imageId");
    $.removeCookie("profileId");
    $.removeCookie("profileName");
  });
  
  $("#btnConfirmDeleteBlock").on("click", function() {
    
    var imageId = parseFloat($.cookie("imageId"));
    var profileId = $.cookie("profileId");
    var profileName = $.cookie("profileName");
    var blockProfile = true;
    var eventId = parseInt(gup("eventId", document.URL));
    
    var baseUrl = "http://local-api.partypic.com/api/images/delete";
  
    $.ajax({
      url: baseUrl,
      dataType: "json",
      type:'POST',
      data: JSON.stringify({ imageId: imageId, blockProfile: blockProfile, eventId: eventId, profileId: profileId, profileName: profileName }),
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
      },
      success: blockProfileHandler,
      error: function(xhr,status,error) {   
        $("#modalError").modal('show');
        $("#errorMessage").text("Ocurri�� un error. Comunicalo al desarrollador.");
      }
    });
  });
});


function gup(name, url) {
  if (!url) url = location.href
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
}
  
function getImagesByEventId() {
  $("#loadingDivContainer").show();
  var eventId = gup("eventId", document.URL);
  var firstRequest = true;
  var requestTime = '';

  $.ajax({
    url:'http://local-api.partypic.com/api/images?eventId='+ eventId +'&firstRequest='+ firstRequest +'&requestTime='+ requestTime,
    type: 'GET',
    dataType: 'json',
    data: { eventId: eventId },
    success: bindImages,
    error: function(xhr, status, error) {
      $("#modalError").modal('show');
      $("#errorMessage").text("Ocurri�� un error. Comunicalo al desarrollador.");
    }     
  }); 
    
  function bindImages(data) {
    if (data.length > 0) {
      $("#eventName").html(data[0].nombre_evento);
      $("#btnDownload").attr('href', 'http://local-api.partypic.com/api/images/download?eventId=' + data[0].eventId);
      for(i=0;i<data.length;i++) {
        var pictureURL = data[i].path;
        getMeta(pictureURL, data[i]);
      }
      $("#loadingDivContainer").hide();
      $("#images-container").fadeIn(4000);
      $("#eventName").show(4000);
    } else {
      $("#loadingDivContainer").hide();
      $("#errorContainer").show(200);
    }
  }
}
  
function getMeta(pictureURL, data) {
  var dataImg = {
    "height": null,
    "width": null
  };
  $("<img/>", {
    load : function() {
      dataImg.height = this.height;
      dataImg.width = this.width;
      if (dataImg.height > dataImg.width) {
        $("#images-container").append('<div data-profile-img-url="'+data.profileImageUrl+'" data-profile-name="'+data.profileName+'" data-id-profile="'+data.profileId+'" data-id-image="'+data.imageId+'" class="gallery-item text-center" onclick="openGallery(this)"><img width="auto" height="185" style="zoom:1.75" src="'+pictureURL+'" alt="'+data.comment+'" title="'+data.comment+'"/></div>');
      } else {
        $("#images-container").append('<div data-profile-img-url="'+data.profileImageUrl+'" data-profile-name="'+data.profileName+'" data-id-profile="'+data.profileId+'" data-id-image="'+data.imageId+'" class="gallery-item text-center" onclick="openGallery(this)"><img width="185" height="auto" style="zoom:1.75" src="'+pictureURL+'" alt="'+data.comment+'" title="'+data.comment+'"/></div>');
      }
    },
    src: pictureURL
  });
}
  
function deleteImage() {
  $('#myModal').modal('hide');
  $.removeCookie("imageId");
  var imageId = $("#btnDeleteImage").data("image-id");
  $.cookie("imageId", imageId);
  $("#modalDelete").modal('show');
}

function deleteImageHandler(data) {
  if (data.success) {
    $.removeCookie("imageId");
    $('#deleteModal').modal('hide');
    $("#images-container").html("");
    getImagesByEventId();
    $("#modalSuccess").modal('show');
  }    
}
  
function blockProfile() {
  $('#myModal').modal('hide');
  $.removeCookie("imageId");
  $.removeCookie("profileId");
  $.removeCookie("profileName");
  var imageId = $("#btnBlockProfile").data("image-id");
  var profileId = $("#btnBlockProfile").data("user-id");
  var profileName = $("#btnBlockProfile").data("nombre-usuario");
  $.cookie("imageId", imageId);
  $.cookie("profileId", profileId);
  $.cookie("profileName", profileName);
  $("#modalBlock").modal('show');
}

function blockProfileHandler(data) {
  if (data.success) {
    $.removeCookie("imageId");
    $('#modalBlock').modal('hide');
    $("#images-container").html("");
    getImagesByEventId();
    $("#modalSuccess").modal('show');
  }    
}

function downloadSuccessHandler() {
  if (data.success) {
    $("#modalSuccess").modal('show');
  }    
}