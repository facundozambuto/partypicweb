angular.module('myApp').service('loginService', loginService);

	function loginService ($http, $q) {

		var self = this;
		self.UI = null;
		
		self.login = login;
		self.recoverPassword = recoverPassword;
		self.downloadAlbum = downloadAlbum;

		function login(loginEmail, loginPassword) {
			var url = 'https://partypic-gyd2dcbgdxd8heaa.brazilsouth-01.azurewebsites.net/api/login?email=' + loginEmail + '&password=' + loginPassword;

            return $http({ 
					method: 'GET',
			      	url: url
			    }).then(function (response) {
					if (response.data.success) {
						return response.data;
					} else {
						return response.data;
					}
            	});
		}
		
		function recoverPassword(recoveryEmail) {
			var url = 'https://partypic-gyd2dcbgdxd8heaa.brazilsouth-01.azurewebsites.net/api/passwordRecover?email=' + recoveryEmail;

            return $http({ 
					method: 'GET',
			      	url: url,
			    }).then(function (response) {
					if (response.data.success) {
						return response.data;
					} else {
						return response.data;
					}
            	});
		}
		
		function downloadAlbum(eventCode) {
            window.open(
				'https://partypic-gyd2dcbgdxd8heaa.brazilsouth-01.azurewebsites.net/api/images/downloadByEventCode?eventCode=' + eventCode,
				'_blank'
			);

			return true;
		}

		return self;		
	}