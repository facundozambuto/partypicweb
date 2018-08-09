angular.module('myApp', ['ui.bootstrap', 'dataGrid', 'pagination'])
  
  .service('insuranceService', function () { })
    .controller('MainCtrl', ['$scope', '$timeout', 'insuranceService', '$filter', 

  function MainCtrl($scope, $timeout, insuranceService, $filter) {

    $scope.loadingGif = true;
    $scope.showLoginError = false;
    $scope.showRecoveryMessage = false;

    $timeout( function(){
      $scope.loadingGif = false;
    }, 2000 );
    
    $scope.iniciarSesion = function(loginEmail, loginPassword) {

      $scope.loadingGif = true;
      
      $timeout( function(){
        $scope.loadingGif = false;
      }, 2000 );
    
      insuranceService.iniciarSesion(loginEmail, loginPassword)
      .then(function (respuesta) {

        if(respuesta.success) {
          window.location = '../admin/dashboard.php'
        }
        else {  
          $scope.showLoginError = true;
        }

      }, function (error) {
        $scope.showLoginError = true;
        });

    };
    
    $scope.descargarAlbum = function(code) {

      $scope.loadingGif = true;
      
      $timeout( function(){
        $scope.loadingGif = false;
      }, 2000 );
    
      insuranceService.descargarAlbum(code)
      .then(function (respuesta) {

        if(respuesta.success) {
          window.location = '../verFotosEvento.php?id_evento='+respuesta.id_evento;
        }
        else {  
          $scope.showLoginError = true;
        }

      }, function (error) {
        $scope.showLoginError = true;
        });

    };
    
    $scope.goBack = function() {
      $scope.showLoginError = false;
      $scope.showRecoveryMessage = false;
    }
    
    $scope.recuperarPassword = function(recoveryEmail) {

      $scope.loadingGif = true;
      
      $timeout( function(){
        $scope.loadingGif = false;
      }, 2000 );
    
      insuranceService.recuperarPassword(recoveryEmail)
      .then(function (respuesta) {

        if(respuesta.success) {
          $scope.showRecoveryMessage = true;
        }
        else {  
          $scope.showLoginError = true;
        }

      }, function (error) {
        $scope.showLoginError = true;
        });
     };

  }]);
