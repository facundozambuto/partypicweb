angular.module('myApp', ['ui.bootstrap', 'dataGrid', 'pagination', 'ngCookies'])
  
  .service('loginService', function () { })
    .controller('MainCtrl', ['$scope', '$timeout', 'loginService', '$filter', '$cookies', 

  function MainCtrl($scope, $timeout, loginService, $filter, $cookies) {

    $scope.loadingGif = true;
    $scope.showLoginError = false;
    $scope.showRecoveryMessage = false;
    $scope.showSuccessMessage = false;

    $timeout( function() {
      $scope.loadingGif = false;
    }, 2000 );
    
    $scope.login = function(loginEmail, loginPassword) {
      $scope.loadingGif = true;

      loginService.login(loginEmail, loginPassword)
        .then(function (response) {
          if (response.success) {
            $scope.loadingGif = false;
            $cookies.put('AppSessionId', response.token, { path: '/' });
            window.location = '../admin/dashboard.html';
          } else {
            $scope.loadingGif = false;
            $scope.showLoginError = true;
          }
        }, function (error) {
          $scope.loadingGif = false;
          $scope.showLoginError = true;
        });
    };
    
    $scope.downloadAlbum = function(code) {
      $scope.loadingGif = true;

      if (loginService.downloadAlbum(code)) {
        $scope.showSuccessMessage = true;
      } else { 
        $scope.showLoginError = true;
      }
      $scope.loadingGif = false; 
    };
    
    $scope.goBack = function() {
      $scope.showLoginError = false;
      $scope.showRecoveryMessage = false;
      $scope.showSuccessMessage = false;
    }
    
    $scope.recoverPassword = function(recoveryEmail) {
      $scope.loadingGif = true;
    
      loginService.recoverPassword(recoveryEmail)
        .then(function (response) {
          if(response.success) {
            $scope.loadingGif = false;
            $scope.showRecoveryMessage = true;
          } else { 
            $scope.loadingGif = false;
            $scope.showLoginError = true;
          }
        }, function (error) {
          $scope.loadingGif = false;
          $scope.showLoginError = true;
        });
     };
}]);
