$(document).ready(function () {
    getAuthHeader();
    handlerBurgerBehaviour();
    getUserSession();
});

function handlerBurgerBehaviour() {
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

    $('[data-tooltip="tooltip"]').tooltip(); 
}

function getUserSession() {
    $.ajax({
        url:'http://local-api.partypic.com/api/session/',
        type: 'GET',
        data: { },
        success: bindUserData,
        error: function(xhr, status, error) {
          $("#modalError").modal('show');
          $("#errorMessage").text("Ocurri�� un error. Comunicalo al desarrollador.");
        }     
    }); 
}

function bindUserData(data) {
    $("#spanUserName").append('<strong>'+data.name+'</strong>');
    $("#navUserName").append('<strong>'+data.name+'</strong>');
    $("#navUserEmail").append('<strong>'+data.email+'</strong> <br>');
    $("#mainSpanUserName").append('<strong>'+data.name+'</strong>');

    if (data.roleId == 1) {
        $("#spanUserRole").append('<strong>Administrador</strong>');
    } else if (data.roleId == 2) {
        $("#spanUserRole").append('<strong>Gerente de Salón</strong>');
    }
}

function logOutUser() {
    $.ajax({
        url:'http://local-api.partypic.com/api/login/',
        type: 'DELETE',
        data: { },
        success: logOutHandler,
        error: function(xhr, status, error) {
          $("#modalError").modal('show');
          $("#errorMessage").text("Ocurri�� un error. Comunicalo al desarrollador.");
        }     
    });
}

function logOutHandler() {
    $.cookie('AppSessionId', '', { path: '/' });
    window.location.href = 'http://local-web.partypic.com/login.html';
}