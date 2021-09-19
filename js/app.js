angular.module('myApp', ['ui.bootstrap', 'dataGrid', 'pagination'])
  
  .service('loginService', function () { })
    .controller('MainCtrl', ['$scope', '$timeout', 'loginService', '$filter', 

  function MainCtrl($scope, $timeout, loginService, $filter) {

    $scope.loadingGif = true;
    $scope.showLoginError = false;
    $scope.showRecoveryMessage = false;

    $timeout( function() {
      $scope.loadingGif = false;
    }, 2000 );
    
    $scope.login = function(loginEmail, loginPassword) {
      $scope.loadingGif = true;
      
      $timeout( function() {
        $scope.loadingGif = false;
      }, 2000 );
    
      loginService.login(loginEmail, loginPassword)
        .then(function (response) {
          if (response.success) {
            window.location = '../admin/dashboard.html'
          } else {  
            $scope.showLoginError = true;
          }
        }, function (error) {
          $scope.showLoginError = true;
        });
    };
    
    $scope.downloadAlbum = function(code) {
      $scope.loadingGif = true;

      $timeout( function(){
        $scope.loadingGif = false;
      }, 2000 );
    
      loginService.downloadAlbum(code)
        .then(function (response) {
          if (response.success) {
            window.location = '../verFotosEvento.php?id_evento='+response.id_evento;
          } else {  
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
    
    $scope.recoverPassword = function(recoveryEmail) {
      $scope.loadingGif = true;
      
      $timeout( function(){
        $scope.loadingGif = false;
      }, 2000 );
    
      loginService.recoverPassword(recoveryEmail)
        .then(function (response) {
          if(response.success) {
            $scope.showRecoveryMessage = true;
          } else {  
            $scope.showLoginError = true;
          }
        }, function (error) {
          $scope.showLoginError = true;
        });
     };
}]);
