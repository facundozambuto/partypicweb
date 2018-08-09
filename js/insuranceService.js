angular.module('myApp').service('insuranceService', insuranceService);

	function insuranceService ($http, $q) {

		var self = this;
		self.UI = null;

		// Methods
		
		self.iniciarSesion = iniciarSesion;
		self.recuperarPassword = recuperarPassword;
		self.descargarAlbum = descargarAlbum;

		function iniciarSesion(loginEmail, loginPassword) {
			var url = '../endpoints/IniciarSesion.php';

			var data = {loginEmail: loginEmail, loginPassword: loginPassword};

            return $http({    method: 'POST',
			      url: url,
			      data: data
			    }).then(function (response) {
                if (response.data.success) {
                    return response.data;
                }
                else {
                	return response.data;
                }
            });
		}
		
		function recuperarPassword(recoveryEmail) {
			var url = '../endpoints/RecuperarPassword.php';

			var data = {recoveryEmail: recoveryEmail};

            return $http({    method: 'POST',
			      url: url,
			      data: data
			    }).then(function (response) {
                if (response.data.success) {
                    return response.data;
                }
                else {
                	return response.data;
                }
            });
		}
		
		function descargarAlbum(code) {
			var url = '../endpoints/GetCodigoDeDescarga.php';

			var data = {code: code};

            return $http({    method: 'POST',
			      url: url,
			      data: data
			    }).then(function (response) {
                if (response.data.success) {
                    return response.data;
                }
                else {
                	return response.data;
                }
            });
		}

		return self;		
	}