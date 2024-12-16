$(document).ready(function () {
    loadNavBar();
    loadModals();
    getAuthHeader();
    getUserSession();
});

function loadNavBar() {
    $.get('../admin/common/navbar.html', function(data) {
        $('body').prepend(data);
        handlerBurgerBehaviour();
    }).fail(function() {
        console.error('Error al cargar el archivo navbar.html');
    });
}

function loadModals() {
    $.get('../admin/common/modalError.html', function(data) {
        $('body').append(data);
    }).fail(function() {
        console.error('Error al cargar el archivo navbar.html');
    });
    $.get('../admin/common/modalSuccess.html', function(data) {
        $('body').append(data);
    }).fail(function() {
        console.error('Error al cargar el archivo navbar.html');
    });
}

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
        url: 'https://partypic-gyd2dcbgdxd8heaa.brazilsouth-01.azurewebsites.net/api/session/',
        type: 'GET',
        data: {},
        success: function(data) {
            bindUserData(data);
            saveUserDataToLocalStorage(data);
        },
        error: function(xhr, status, error) {
            window.location.href = 'https://www.partypic.com/login.html';
        }
    });
}

function bindUserData(data) {
    $("#spanUserName").append('<strong>' + data.name + '</strong>');
    $("#navUserName").append('<strong>' + data.name + '</strong>');
    $("#navUserEmail").append('<strong>' + data.email + '</strong> <br>');
    $("#mainSpanUserName").append('<strong>' + data.name + '</strong>');

    if (data.roleId == 1) {
        $("#spanUserRole").append('<strong>Administrador</strong>');
    } else if (data.roleId == 2) {
        $("#spanUserRole").append('<strong>Gerente de Salón</strong>');
        $("#menuUsuariosLi").hide();
        $("#menuCategoriasLi").hide();
        $("#menuRolesLi").hide();
        $("#menuPlanesLi").hide();
    }
}

function logOutUser() {
    $.ajax({
        url: 'https://partypic-gyd2dcbgdxd8heaa.brazilsouth-01.azurewebsites.net/api/login/',
        type: 'DELETE',
        data: {},
        success: logOutHandler,
        error: function(xhr, status, error) {
            $("#modalError").modal('show');
            $("#errorMessage").text("Ocurrió un error. Comunicalo al administrador.");
        }
    });
}

function logOutHandler() {
    $.cookie('AppSessionId', '', { path: '/' });

    localStorage.removeItem('userData');
    window.location.href = 'https://www.partypic.com/login.html';
}

function saveUserDataToLocalStorage(data) {
    const userData = {
        userId: data.userId,
        name: data.name,
        email: data.email,
        roleId: data.roleId,
        roleName: getRoleName(data.roleId)
    };

    localStorage.setItem('userData', JSON.stringify(userData));
}

function getUserDataFromLocalStorage() {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
}

function getRoleName(roleId) {
    switch (roleId) {
        case 1:
            return 'Administrador';
        case 2:
            return 'Gerente de Salón';
        default:
            return 'Usuario';
    }
}
