$(document).ready(function(){
  $('[data-tooltip="tooltip"]').tooltip();
 
  getImagesByEventId();

  var trigger = $('.hamburger'),
  overlay = $('.overlay'),
  isClosed = false;
  trigger.click(function () {
    hamburger_cross();      
  });

  $('[data-toggle="offcanvas"]').click(function () {
    $('#wrapper').toggleClass('toggled');
  });
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
        $("#images-container").append('<div data-profile-img-url="'+data.profileImageUrl+'" data-nombre-perfil="'+data.profileName+'" data-id-profile="'+data.profileId+'" data-id-imagen="'+data.imageId+'" class="gallery-item text-center" onclick="abrirGaleria(this)"><img width="auto" height="185" style="zoom:1.75" src="'+pictureURL+'" alt="'+data.comment+'" title="'+data.comment+'"/></div>');
      } else {
        $("#images-container").append('<div data-profile-img-url="'+data.profileImageUrl+'" data-nombre-perfil="'+data.profileName+'" data-id-profile="'+data.profileId+'" data-id-imagen="'+data.imageId+'" class="gallery-item text-center" onclick="abrirGaleria(this)"><img width="185" height="auto" style="zoom:1.75" src="'+pictureURL+'" alt="'+data.comment+'" title="'+data.comment+'"/></div>');
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
  
$("#btnCancelDelete").on("click", function() {
  $.removeCookie("imageId");
});
  
$("#btnConfirmDelete").on("click", function(){
  var baseUrl = "http://local-api.partypic.com/api/images/";
  imageId = parseFloat($.cookie("imageId"));
  var blockUser = false;
  var eventId = gup("eventId", document.URL);

  $.ajax({
    url: baseUrl,
    dataType: "json",
    type:'DELETE',
    data: { imageId: imageId, blockUser: blockUser, eventId: eventId},
    success: deleteImageHandler,
    error: function(xhr,status,error) {   
      $("#modalError").modal('show');
      $("#errorMessage").text("Ocurri�� un error. Comunicalo al desarrollador.");
    }
  });

  function deleteImageHandler(data) {
    if (data.success) {
      $.removeCookie("imageId");
      $('#deleteModal').modal('hide');
      $("#images-container").html("");
      getImagenesByIdEvento();
      $("#modalSuccess").modal('show');
    }    
  }
});
  
function blockUser() {
  $('#myModal').modal('hide');
  $.removeCookie("imageId");
  $.removeCookie("profileId");
  $.removeCookie("profileName");
  var imageId = $("#btnBlockUser").data("image-id");
  var profileId = $("#btnBlockUser").data("user-id");
  var profileName = $("#btnBlockUser").data("nombre-usuario");
  $.cookie("imageId", imageId);
  $.cookie("profileId", profileId);
  $.cookie("profileName", profileName);
  $("#modalBlock").modal('show');
}

$("#btnCancelDeleteBlock").on("click", function() {
  $.removeCookie("imageId");
  $.removeCookie("profileId");
  $.removeCookie("profileName");
});

$("#btnConfirmDeleteBlock").on("click", function() {
  
  imageId = parseFloat($.cookie("imageId"));
  profileId = $.cookie("profileId");
  profileName = $.cookie("profileName");
  var blockUser = false;
  var eventId = gup("eventId", document.URL);
  
  var baseUrl = "http://local-api.partypic.com/api/images/";

  $.ajax({
    url: baseUrl,
    dataType: "json",
    type:'DELETE',
    data:{ imageId:imageId, blockUser: blockUser, eventId: eventId, profileId: profileId, profileName: profileName},
    success: blockUserHandler,
    error: function(xhr,status,error) {   
      $("#modalError").modal('show');
      $("#errorMessage").text("Ocurri�� un error. Comunicalo al desarrollador.");
    }
  });

  function blockUserHandler(data) {
    if (data.success) {
      $.removeCookie("imageId");
      $('#modalBlock').modal('hide');
      $("#images-container").html("");
      getImagesByEventId();
      $("#modalSuccess").modal('show');
    }    
  }
});

$("#btnDownload").on("click", function() {
  imageId = parseFloat($.cookie("imageId"));
  profileId = $.cookie("profileId");
  profileName = $.cookie("profileName");
  var blockUser = false;
  var eventId = gup("eventId", document.URL);
  
  var baseUrl = "http://local-api.partypic.com/api/images/download?eventId=25";

  $.ajax({
    url: baseUrl,
    dataType: "json",
    type:'GET',
    data:{ imageId:imageId, blockUser: blockUser, eventId: eventId, profileId: profileId, profileName: profileName},
    success: test,
    error: function(xhr,status,error) {   
      if (xhr.status === 200) {
        $("#modalSuccess").modal('show');
      } else {
        $("#modalError").modal('show');
        $("#errorMessage").text("Ocurri�� un error. Comunicalo al desarrollador.");
      }
    }
  });

  function test() {
    if (data.success) {
      $("#modalSuccess").modal('show');
    }    
  }
});