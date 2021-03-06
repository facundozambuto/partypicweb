<!DOCTYPE html>

<html class="no-js" lang="es"><!--<![endif]-->
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <title>Party Pic App - Descargar Álbum</title>
    <link rel="shortcut icon" href="../images/favicon.png"/>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Oswald">
    <link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="../css/styleLogin.css">
    <link rel="stylesheet" href="../css/animate.min.css" />
    <link rel="stylesheet" href="../css/gorilla.css" />
    
    <script src="../js/jquery-3.2.1.min.js"></script>
    <script src="../js/angular.min.js"></script>
    <script type="text/javascript" src="../js/bootstrap.min.js"></script>   
    <script type="text/javascript" src="../js/jquery.validate.min.js"></script>
    <script src="../js/gorilla.js"></script>
  </head>
  
  <body>
    <div ng-app="myApp" ng-controller="MainCtrl" class="text-center banner-two overlay-fader" style="height:100%">
      <div class="animate-cloud"></div>
      <div class="animationload" ng-if="loadingGif">
        <img src="../images/animacionLogo.gif" style="margin: auto; position: absolute; top: 0; left: 0; bottom: 0; right: 0;" alt="partypic"/>
      </div>
      <div class="container" ng-if="!loadingGif">
      	<div style="margin:0 auto; color:white; display:inline-block; margin-top:8em; opacity: 0.99;">
		<img src="../images/favicon.png" class="img-responsive" style="margin:0 auto; width:10%; display: inline-block; opactity:0.99">
	  	<img src="../images/logotipoGrisNav.png" class="img-responsive" style="margin:0 auto; display: inline-block; opactity:0.99">
	</div>
        <div id="flip" ng-if="showLoginError === false && showRecoveryMessage === false" style="margin-top:4em">
          <div class="front">
            <div class="col-md-4 col-md-offset-4">
                <div class="login-panel panel panel-info">
                  <div class="panel-heading">
                    <h3 class="panel-title">Descargar Álbum</h3>
                  </div>
                  <div class="panel-body">
                    <form role="form" ng-submit="descargarAlbum(code)">
                      <fieldset>
                          <div class="form-group">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-picture"></i></span>
                            <input class="form-control text-center" ng-model="code" placeholder="Ingresá el códidgo del Álbum a descargar" name="code" type="code" autofocus="" required>
                          </div>
                         <!-- Change this to a button or input when using this as a form -->
                        <input class="btn btn-sm btn-success" type="submit" value="Ir al álbum">
                        <div class="form-group" style="margin-top:2em">
                       </div>
                      </fieldset>
                    </form>
                  </div>
                </div>
            </div>
          </div>
          
        </div>
        <div class="alert alert-dismissible alert-danger" ng-if="showLoginError"  style="margin-top:4em; opacity:0.99">
          <h4>Ups!</h4>
          <p>Los datos proporcionados no son correctos. Intentá de nuevo o comunicate con el administrador.</p>
          <br/>
          <input value="Intentar de nuevo" class="btn btn-sm btn-danger" type="button" ng-click="goBack();"/>
        </div>
        
      </div>
      <a href="../index.php" style="opacity: 0.99">
               Volver a la página principal
        </a>
    </div>
     
    <script src="../js/app.js"></script>
    <script src="../js/insuranceService.js"></script>
    <script src="https://angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.14.3.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-animate.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-aria.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-messages.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angular_material/1.0.0/angular-material.min.js"></script>
    <script src="https://angular-data-grid.github.io/dist/pagination.js"></script>
    <script src="https://angular-data-grid.github.io/dist/JSONToCSVConvertor.js"></script>
    <script src="https://angular-data-grid.github.io/dist/dataGrid.js"></script>
  </body>
</html>