angular.module('myApp').service('loginService', loginService);

	function loginService ($http, $q) {

		var self = this;
		self.UI = null;
		
		self.login = login;
		self.recoverPassword = recoverPassword;
		self.downloadAlbum = downloadAlbum;

		function login(loginEmail, loginPassword) {
			var url = 'http://local-api.partypic.com/api/login?email=' + loginEmail + '&password=' + loginPassword;

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
			var url = 'http://local-api.partypic.com/api/passwordRecover?email=' + recoveryEmail;

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
				'http://local-api.partypic.com/api/images/downloadByEventCode?eventCode=' + eventCode,
				'_blank'
			);

			return true;
		}

		return self;		
	}